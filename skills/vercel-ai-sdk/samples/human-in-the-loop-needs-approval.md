---
source: https://ai-sdk.dev/cookbook/next/human-in-the-loop
---

# Human-in-the-Loop with needsApproval

Pause a tool until the user approves with the tool-level `needsApproval` property, including conditional approval and a denial instruction.

```ts
// app/api/chat/route.ts
import {
  convertToModelMessages,
  streamText,
  tool,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-6-astra'),
    messages: await convertToModelMessages(messages),
    tools: {
      getWeatherInformation: tool({
        description: 'show the weather in a given city to the user',
        inputSchema: z.object({ city: z.string() }),
        needsApproval: true,
        execute: async ({ city }) => {
          const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy'];
          return weatherOptions[
            Math.floor(Math.random() * weatherOptions.length)
          ];
        },
      }),
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

```tsx
// app/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithApprovalResponses,
} from 'ai';
import { useState } from 'react';

export default function Chat() {
  const { messages, sendMessage, addToolApprovalResponse } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
  });
  const [input, setInput] = useState('');

  return (
    <div>
      <div>
        {messages?.map(m => (
          <div key={m.id}>
            <strong>{`${m.role}: `}</strong>
            {m.parts?.map((part, i) => {
              if (part.type === 'text') {
                return <div key={i}>{part.text}</div>;
              }
              if (part.type === 'tool-getWeatherInformation') {
                switch (part.state) {
                  case 'approval-requested':
                    return (
                      <div key={part.toolCallId}>
                        Get weather information for {part.input.city}?
                        <div>
                          <button
                            onClick={() =>
                              addToolApprovalResponse({
                                id: part.approval.id,
                                approved: true,
                              })
                            }
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              addToolApprovalResponse({
                                id: part.approval.id,
                                approved: false,
                              })
                            }
                          >
                            Deny
                          </button>
                        </div>
                      </div>
                    );
                  case 'output-available':
                    return (
                      <div key={part.toolCallId}>
                        Weather in {part.input.city}: {part.output}
                      </div>
                    );
                  case 'output-denied':
                    return (
                      <div key={part.toolCallId}>
                        Weather request for {part.input.city} was denied.
                      </div>
                    );
                }
              }
            })}
            <br />
          </div>
        ))}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
```

```ts
// dynamic approval: only payments over $1000 need approval
// app/api/chat/route.ts
import {
  convertToModelMessages,
  streamText,
  tool,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-6-astra'),
    messages: await convertToModelMessages(messages),
    tools: {
      processPayment: tool({
        description: 'Process a payment',
        inputSchema: z.object({
          amount: z.number(),
          recipient: z.string(),
        }),
        needsApproval: async ({ amount }) => amount > 1000,
        execute: async ({ amount, recipient }) => {
          return `Payment of $${amount} to ${recipient} processed.`;
        },
      }),
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

```ts
// handling denial: stop the model from retrying
const result = streamText({
  model: openai('gpt-6-astra'),
  messages: await convertToModelMessages(messages),
  instructions:
    'When a tool execution is not approved by the user, do not retry it. ' +
    'Inform the user that the action was not performed.',
  tools: {
    // ...
  },
});
```

## Notes

- This cookbook page uses the tool-level `needsApproval` property (`true` or an async predicate such as `amount > 1000`). The newer chatbot guide marks `needsApproval` as deprecated in favour of `toolApproval` on `streamText` (see `chatbot-tool-execution-approval.md`); check the installed version before copying.
- Modified from the official example: the page passes `messages` (UI messages) directly to `streamText`; the two route examples here convert them with `await convertToModelMessages(messages)`.
- Server flow: an approval-required call sends an `approval-requested` tool part with `approval.id`; after `addToolApprovalResponse` and the auto re-submit, an approved tool runs `execute`, a denied one gives the model the denial.
- Durable human-in-the-loop with workflows is in `references/workflow-harnesses/workflow-agent-guide.md`.
