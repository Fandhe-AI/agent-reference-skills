---
source: https://ai-sdk.dev/docs/ai-sdk-ui/reading-ui-message-streams
---

# Reading UI Message Streams

`UIMessage` streams are useful outside chat: terminal UIs, custom client-side stream processing, or React Server Components. `readUIMessageStream` transforms a stream of `UIMessageChunk` objects into an `AsyncIterableStream` of `UIMessage` objects as they are constructed.

## Signature / Usage

```tsx
import { readUIMessageStream, streamText, toUIMessageStream } from 'ai';

async function main() {
  const result = streamText({
    model,
    prompt: 'Write a short story about a robot.',
  });

  for await (const uiMessage of readUIMessageStream({
    stream: toUIMessageStream({ stream: result.stream }),
  })) {
    console.log('Current message state:', uiMessage);
  }
}
```

### Resuming conversations

Pass the `message` option to resume from a previous message state:

```tsx
for await (const uiMessage of readUIMessageStream({
  stream: toUIMessageStream({ stream: result.stream }),
  message: lastMessage, // Resume from this message
})) {
  console.log('Resumed message:', uiMessage);
}
```

## Notes

- The official tool-call example switches on `part.type` values `'text'`, `'tool-call'`, and `'tool-result'` (with `part.args` / `part.result`) on `uiMessage.parts`; verify these against the `UIMessage` part types (`tool-<name>` / `dynamic-tool` parts in the UIMessage reference) before relying on them.

## Related

- [readUIMessageStream](./read-ui-message-stream.md)
- [UIMessage](./ui-message.md)
- [Stream Protocols](./stream-protocol.md)
