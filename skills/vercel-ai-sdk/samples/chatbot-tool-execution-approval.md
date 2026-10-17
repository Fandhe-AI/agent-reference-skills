---
source: https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-tool-usage
---

# Chatbot Tool Execution Approval

Require user approval before a server-side tool runs, with `toolApproval` on `streamText` and `addToolApprovalResponse` in `useChat`.

```ts
// ai/tools.ts
import { tool, InferUITools, UIDataTypes, UIMessage } from 'ai';
import { z } from 'zod';

export const tools = {
  getWeather: tool({
    description: 'Get the weather in a location',
    inputSchema: z.object({
      city: z.string(),
    }),
    execute: async ({ city }) => {
      const weather = await fetchWeather(city);
      return weather;
    },
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
} from 'ai';
__PROVIDER_IMPORT__;
import { tools } from '@/ai/tools';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: __MODEL__,
    messages: await convertToModelMessages(messages),
    tools,
    toolApproval: {
      getWeather: 'user-approval',
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
import type { MyUIMessage } from '@/ai/tools';

export default function Chat() {
  const { messages, addToolApprovalResponse } = useChat<MyUIMessage>();

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.parts.map(part => {
            if (part.type === 'tool-getWeather') {
              switch (part.state) {
                case 'approval-requested': {
                  if (part.approval.isAutomatic) {
                    return (
                      <div key={part.toolCallId}>
                        Checking approval for {part.input.city}...
                      </div>
                    );
                  }

                  return (
                    <div key={part.toolCallId}>
                      <p>Get weather for {part.input.city}?</p>
                      {part.approval.requestReason && (
                        <p>{part.approval.requestReason}</p>
                      )}
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
                  );
                }
                case 'approval-responded':
                  return (
                    <div key={part.toolCallId}>
                      Weather request for {part.input.city} was
                      {part.approval.isAutomatic ? ' automatically' : ''}{' '}
                      {part.approval.approved ? 'approved' : 'denied'}.
                      {part.approval.reason
                        ? ` Reason: ${part.approval.reason}`
                        : ''}
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
                      {part.approval.reason
                        ? ` Reason: ${part.approval.reason}`
                        : ''}
                    </div>
                  );
              }
            }
            // Handle other part types...
          })}
        </div>
      ))}
    </>
  );
}
```

```tsx
// auto-submit after approval
import { useChat } from '@ai-sdk/react';
import { lastAssistantMessageIsCompleteWithApprovalResponses } from 'ai';
import type { MyUIMessage } from '@/ai/tools';

const { messages, addToolApprovalResponse } = useChat<MyUIMessage>({
  sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
});
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; `fetchWeather` is an application placeholder. `toolApproval` on `streamText` enables approval; the older `needsApproval` property on tools is deprecated.
- Modified from the official example: the page passes `messages` (UI messages from `useChat`) straight to `streamText`; this version converts them with `await convertToModelMessages(messages)`, as the other `chatbot-tool-usage` examples do.
- Modified from the official example: useChat is typed with a shared UIMessage type built from InferUITools so tool part input/output are typed (see references/ui/infer-ui-tools.md). The tool is moved to `ai/tools.ts` so route and page share it.
- Call `addToolApprovalResponse` only for manual approvals; automatic approvals/denials arrive with `part.approval.isAutomatic === true`. If nothing happens after approving, call `sendMessage` manually or set `sendAutomaticallyWhen` (last block).
- For sensitive tools the official page adds `experimental_toolApprovalSecret: process.env.TOOL_APPROVAL_SECRET` to `streamText` so the server verifies it issued the approval (experimental).
- Agent-level approval concepts: `references/agents/tool-approvals.md`; this is the `useChat` UI side only.
