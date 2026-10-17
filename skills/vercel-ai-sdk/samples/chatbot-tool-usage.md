---
source: https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-tool-usage
---

# Chatbot Tool Usage

Server-side tools, automatically executed client-side tools (`onToolCall`), and user-confirmation tools with `useChat` and typed tool parts.

```ts
// ai/tools.ts
import { tool, InferUITools, UIDataTypes, UIMessage } from 'ai';
import { z } from 'zod';

export const tools = {
  // server-side tool with execute function:
  getWeatherInformation: tool({
    description: 'show the weather in a given city to the user',
    inputSchema: z.object({ city: z.string() }),
    execute: async ({}: { city: string }) => {
      const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
      return weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
    },
  }),
  // client-side tool that starts user interaction:
  askForConfirmation: tool({
    description: 'Ask the user for confirmation.',
    inputSchema: z.object({
      message: z.string().describe('The message to ask for confirmation.'),
    }),
    outputSchema: z.string(),
  }),
  // client-side tool that is automatically executed on the client:
  getLocation: tool({
    description:
      'Get the user location. Always ask for confirmation before using this tool.',
    inputSchema: z.object({}),
    outputSchema: z.string(),
  }),
};

export type MyUIMessage = UIMessage<
  never,
  UIDataTypes,
  InferUITools<typeof tools>
>;
```

```tsx
// app/api/chat/route.ts
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from 'ai';
__PROVIDER_IMPORT__;
import { tools } from '@/ai/tools';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: __MODEL__,
    messages: await convertToModelMessages(messages),
    tools,
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
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';
import { useState } from 'react';
import type { MyUIMessage } from '@/ai/tools';

export default function Chat() {
  const { messages, sendMessage, addToolOutput } = useChat<MyUIMessage>({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),

    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,

    // run client-side tools that are automatically executed:
    async onToolCall({ toolCall }) {
      // Check if it's a dynamic tool first for proper type narrowing
      if (toolCall.dynamic) {
        return;
      }

      if (toolCall.toolName === 'getLocation') {
        const cities = ['New York', 'Los Angeles', 'Chicago', 'San Francisco'];

        // No await - avoids potential deadlocks
        addToolOutput({
          tool: 'getLocation',
          toolCallId: toolCall.toolCallId,
          output: cities[Math.floor(Math.random() * cities.length)],
        });
      }
    },
  });
  const [input, setInput] = useState('');

  return (
    <>
      {messages?.map(message => (
        <div key={message.id}>
          <strong>{`${message.role}: `}</strong>
          {message.parts.map(part => {
            switch (part.type) {
              // render text parts as simple text:
              case 'text':
                return part.text;

              // for tool parts, use the typed tool part names:
              case 'tool-askForConfirmation': {
                const callId = part.toolCallId;

                switch (part.state) {
                  case 'input-streaming':
                    return (
                      <div key={callId}>Loading confirmation request...</div>
                    );
                  case 'input-available':
                    return (
                      <div key={callId}>
                        {part.input.message}
                        <div>
                          <button
                            onClick={() =>
                              addToolOutput({
                                tool: 'askForConfirmation',
                                toolCallId: callId,
                                output: 'Yes, confirmed.',
                              })
                            }
                          >
                            Yes
                          </button>
                          <button
                            onClick={() =>
                              addToolOutput({
                                tool: 'askForConfirmation',
                                toolCallId: callId,
                                output: 'No, denied',
                              })
                            }
                          >
                            No
                          </button>
                        </div>
                      </div>
                    );
                  case 'approval-requested':
                    return <div key={callId}>Approval requested.</div>;
                  case 'approval-responded':
                    return <div key={callId}>Approval response received.</div>;
                  case 'output-available':
                    return (
                      <div key={callId}>Confirmation result: {part.output}</div>
                    );
                  case 'output-error':
                    return <div key={callId}>Error: {part.errorText}</div>;
                  case 'output-denied':
                    return <div key={callId}>Tool call denied.</div>;
                }
                break;
              }

              case 'tool-getLocation': {
                const callId = part.toolCallId;

                switch (part.state) {
                  case 'input-streaming':
                    return (
                      <div key={callId}>Preparing location request...</div>
                    );
                  case 'input-available':
                    return <div key={callId}>Getting location...</div>;
                  case 'approval-requested':
                    return <div key={callId}>Approval requested.</div>;
                  case 'approval-responded':
                    return <div key={callId}>Approval response received.</div>;
                  case 'output-available':
                    return <div key={callId}>Location: {part.output}</div>;
                  case 'output-error':
                    return (
                      <div key={callId}>
                        Error getting location: {part.errorText}
                      </div>
                    );
                  case 'output-denied':
                    return <div key={callId}>Location request denied.</div>;
                }
                break;
              }

              case 'tool-getWeatherInformation': {
                const callId = part.toolCallId;

                switch (part.state) {
                  // example of pre-rendering streaming tool inputs:
                  case 'input-streaming':
                    return (
                      <pre key={callId}>{JSON.stringify(part, null, 2)}</pre>
                    );
                  case 'input-available':
                    return (
                      <div key={callId}>
                        Getting weather information for {part.input.city}...
                      </div>
                    );
                  case 'approval-requested':
                    return <div key={callId}>Approval requested.</div>;
                  case 'approval-responded':
                    return <div key={callId}>Approval response received.</div>;
                  case 'output-available':
                    return (
                      <div key={callId}>
                        Weather in {part.input.city}: {part.output}
                      </div>
                    );
                  case 'output-error':
                    return (
                      <div key={callId}>
                        Error getting weather for {part.input.city}:{' '}
                        {part.errorText}
                      </div>
                    );
                  case 'output-denied':
                    return <div key={callId}>Weather request denied.</div>;
                }
                break;
              }
            }
          })}
          <br />
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input value={input} onChange={e => setInput(e.target.value)} />
      </form>
    </>
  );
}
```

```tsx
// client-side tool error: record an output-error instead of an output
// ...
    async onToolCall({ toolCall }) {
      // Check if it's a dynamic tool first for proper type narrowing
      if (toolCall.dynamic) {
        return;
      }

      if (toolCall.toolName === 'getLocation') {
        try {
          const location = await getLocation();

          // No await - avoids potential deadlocks
          addToolOutput({
            tool: 'getLocation',
            toolCallId: toolCall.toolCallId,
            output: location,
          });
        } catch (err) {
          addToolOutput({
            tool: 'getLocation',
            toolCallId: toolCall.toolCallId,
            state: 'output-error',
            errorText: 'Unable to get the user location',
          });
        }
      }
    },
// ...
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; replace them with your provider import and model.
- Modified from the official example: useChat is typed with a shared UIMessage type built from InferUITools so tool part input/output are typed (see references/ui/infer-ui-tools.md). The tools move to `ai/tools.ts` (wrapped in `tool()`); the client-side tools `askForConfirmation` and `getLocation` have no `execute`, so they declare `outputSchema: z.string()` to give `part.output` and `addToolOutput` a type.
- Always check `if (toolCall.dynamic)` first in `onToolCall`, and call `addToolOutput` without `await` to avoid deadlocks. The last block is an excerpt of the page's error-handling example (`getLocation` is an application function there).
- Tool parts are named `tool-{toolName}`; dynamic tools use a generic `dynamic-tool` part. `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls` re-submits once all results are present.
- Server-side multi-step is `stopWhen: isStepCount(5)` when every tool has `execute`. Tool errors are masked by default ("An error occurred"); customize with `onError` on `toUIMessageStream`. Approval flows are in `chatbot-tool-execution-approval.md`.
