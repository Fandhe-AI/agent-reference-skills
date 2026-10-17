---
source: https://ai-sdk.dev/docs/ai-sdk-ui/message-metadata
---

# Message Metadata

Message metadata attaches custom information (timestamps, model information, token usage, user context) at the message level. It differs from data parts, which are part of the message content.

## Signature / Usage

Define a typed `UIMessage`:

```tsx
import { UIMessage } from 'ai';
import { z } from 'zod';

// Define your metadata schema
export const messageMetadataSchema = z.object({
  createdAt: z.number().optional(),
  model: z.string().optional(),
  totalTokens: z.number().optional(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

// Create a typed UIMessage
export type MyUIMessage = UIMessage<MessageMetadata>;
```

Send metadata from the server with the `messageMetadata` callback of `toUIMessageStream`:

```ts
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import type { MyUIMessage } from '@/types';

export async function POST(req: Request) {
  const { messages }: { messages: MyUIMessage[] } = await req.json();

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages, // pass this in for type-safe return objects
      messageMetadata: ({ part }) => {
        // Send metadata when streaming starts
        if (part.type === 'start') {
          return {
            createdAt: Date.now(),
            model: 'your-model-id',
          };
        }

        // Send additional metadata when streaming completes
        if (part.type === 'finish') {
          return {
            totalTokens: part.totalUsage.totalTokens,
          };
        }
      },
    }),
  });
}
```

Read it on the client through `message.metadata`:

```tsx
const { messages } = useChat<MyUIMessage>({
  transport: new DefaultChatTransport({
    api: '/api/chat',
  }),
});

// message.metadata?.createdAt, message.metadata?.totalTokens
```

## Notes

- To get a type-safe metadata return object in `messageMetadata`, pass `originalMessages` typed to your UIMessage type.
- For arbitrary data that changes during generation, use data parts instead.
- Common uses: timestamps, model information, token usage, user context, performance metrics, quality indicators (finish reason, confidence scores).

## Related

- [UIMessage](./ui-message.md)
- [useChat](./use-chat.md)
- [Stream Protocols](./stream-protocol.md)
