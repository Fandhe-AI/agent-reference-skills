---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/direct-chat-transport
---

# DirectChatTransport

A transport that communicates directly with an Agent in-process, without HTTP. Useful for server-side rendering, testing without network, and single-process applications. It invokes the agent's `stream()` method and converts the result to a UI message stream.

## Signature / Usage

```tsx
import { useChat } from '@ai-sdk/react';
import { DirectChatTransport, ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({
  model,
  instructions: 'You are a helpful assistant.',
});

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DirectChatTransport({ agent }),
  });

  // ... render chat UI
}
```

Import: `import { DirectChatTransport } from "ai"`.

## Options / Props

Constructor parameters:

| Name | Type | Description |
| --- | --- | --- |
| agent | `Agent` (required) | The Agent instance used for generating responses. Called with `stream()` for each message. |
| options | `CALL_OPTIONS` | Optional. Agent-specific call options defined when creating the agent. |
| originalMessages | `UIMessage[]` | Optional. If provided, persistence mode is assumed and a message ID is provided for the response message (generated with `generateMessageId`, or reused from the last message when it is an assistant message). |
| generateMessageId | `IdGenerator` | Optional. Generates a message ID for the response message. If not provided, no message ID is set (unless original messages are provided and the last is an assistant message). |
| messageMetadata | `(options: { part: TextStreamPart }) => METADATA \| undefined` | Optional. Extracts message metadata sent to the client. Called on `start` and `finish` events. |
| onStepEnd | `UIMessageStreamOnStepEndCallback` | Optional. Called after each step is converted to UI message parts. Receives messages, isContinuation, and the accumulated responseMessage, including step metadata. |
| onStepFinish | `UIMessageStreamOnStepFinishCallback` | Optional. Deprecated alias for `onStepEnd`. |
| sendReasoning | `boolean` | Optional. Send reasoning parts to the client. Defaults to true. |
| sendSources | `boolean` | Optional. Send source parts to the client. Defaults to false. |
| sendFinish | `boolean` | Optional. Send the finish event to the client. Set to false when using additional `streamText` calls that send additional data. Defaults to true. |
| sendStart | `boolean` | Optional. Send the message start event. Set to false when the start event has already been sent. Defaults to true. |
| onError | `(error: unknown) => string` | Optional. Process an error, e.g. to log it. Defaults to `() => 'An error occurred.'`. Return the error message to include in the data stream. |

### `sendMessages()`

Validates and converts UI messages to model messages, calls the agent's `stream()`, and returns `Promise<ReadableStream<UIMessageChunk>>`.

```ts
const stream = await transport.sendMessages({
  chatId: 'chat-123',
  trigger: 'submit-message',
  messages: [...],
  abortSignal: controller.signal,
});
```

| Name | Type | Description |
| --- | --- | --- |
| chatId | `string` | Unique identifier for the chat session. |
| trigger | `'submit-message' \| 'regenerate-message'` | New message or regeneration. |
| messageId | `string \| undefined` | ID of the message to regenerate, or undefined for new messages. |
| messages | `UIMessage[]` | UI messages representing the conversation history. |
| abortSignal | `AbortSignal \| undefined` | Signal to abort the request. |
| headers | `Record<string, string> \| Headers` | Optional. Ignored by DirectChatTransport. |
| body | `object` | Optional. Ignored by DirectChatTransport. |
| metadata | `unknown` | Optional. Ignored by DirectChatTransport. |

### `reconnectToStream()`

Always returns `Promise<null>`; direct transport does not support reconnection since there is no persistent server-side stream.

## Notes

- `onStepFinish` is a deprecated alias for `onStepEnd`.
- Agent here means the AI SDK `Agent` interface (`ToolLoopAgent`). For other agent frameworks see openai-agents, anthropic-agent-sdk, anthropic-managed-agents, and hermes-agent.

## Related

- [Transport](./transport.md)
- [ToolLoopAgent](../agents/tool-loop-agent.md)
- [Agent](../agents/agent.md)
- [WebSocketChatTransport](./websocket-chat-transport.md)
