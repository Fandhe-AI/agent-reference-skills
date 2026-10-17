---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat
---

# useChat

Creates a conversational user interface for a chatbot: streams chat messages from your AI provider, manages chat state, and updates the UI as new messages are received.

## Signature / Usage

```tsx
import { useChat } from '@ai-sdk/react';
// Svelte: import { Chat } from '@ai-sdk/svelte'
// Vue:    import { useChat } from '@ai-sdk/vue'
// Angular: import { Chat } from '@ai-sdk/angular'

const { messages, sendMessage, status } = useChat();
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| chat | `Chat<UIMessage>` | Optional. An existing Chat instance to use. If provided, other parameters are ignored. |
| transport | `ChatTransport` | Optional. The transport to use for sending messages. Defaults to `DefaultChatTransport` with `/api/chat` endpoint. |
| transport (DefaultChatTransport).api | `string = '/api/chat'` | Optional. The API endpoint for chat requests. |
| transport (DefaultChatTransport).resumeStreamIsReplay | `boolean` | Optional. Defaults to true. Resets the interrupted response on the first resumed start chunk and rebuilds it from the replay. Set to false for endpoints that only send the remaining chunks of the same response. |
| transport (DefaultChatTransport).credentials | `RequestCredentials` | Optional. The credentials mode for fetch requests. |
| transport (DefaultChatTransport).headers | `Record<string, string> \| Headers` | Optional. HTTP headers to send with requests. |
| transport (DefaultChatTransport).body | `object` | Optional. Extra body object to send with requests. |
| transport (DefaultChatTransport).fetch | `FetchFunction` | Optional. Custom fetch implementation. Use it as middleware to intercept requests, or to provide a custom fetch for e.g. testing. |
| transport (DefaultChatTransport).prepareSendMessagesRequest | `PrepareSendMessagesRequest` | Optional. A function to customize the request before chat API calls. Receives `options` (`PrepareSendMessageRequestOptions`) with `id` (chat ID), `messages` (`UIMessage[]`), `requestMetadata` (`unknown`), `body`, `credentials`, `headers`, `api` (defaults to the transport's `/api/chat`), `trigger` (`'submit-message' \| 'regenerate-message'`), `messageId` (`string \| undefined`). |
| transport (DefaultChatTransport).prepareReconnectToStreamRequest | `PrepareReconnectToStreamRequest` | Optional. A function to customize the request before the reconnect API call. Receives `options` (`PrepareReconnectToStreamRequestOptions`) with `id`, `requestMetadata`, `body`, `credentials`, `headers`, `api` (defaults to the transport's API endpoint combined with the chat ID: `/api/chat/{chatId}/stream`). |
| id | `string` | Optional. A unique identifier for the chat. If not provided, a random one will be generated. |
| messages | `UIMessage[]` | Optional. Initial chat messages to populate the conversation with. |
| messageMetadataSchema | `FlexibleSchema` | Optional. Schema for validating message metadata. |
| dataPartSchemas | `UIDataTypesToSchemas` | Optional. Schemas for validating data parts in messages. |
| generateId | `IdGenerator` | Optional. A function to generate unique IDs for messages and the chat. If not provided, the default AI SDK `generateId` is used. |
| onToolCall | `({toolCall: ToolCall}) => void \| Promise<void>` | Optional. Invoked when a tool call is received. You must call `addToolOutput` to provide the tool result. |
| sendAutomaticallyWhen | `(options: { messages: UIMessage[] }) => boolean \| PromiseLike<boolean>` | Optional. Called when the stream is finished or a tool call is added to determine if the current messages should be resubmitted. The `lastAssistantMessageIsCompleteWithToolCalls` helper covers common scenarios. |
| onFinish | `(options: OnFinishOptions) => void` | Optional. Called when the assistant response has finished streaming. `OnFinishOptions`: `message` (`UIMessage`, the response), `messages` (`UIMessage[]`, all including the response), `isAbort` (aborted by client), `isDisconnect` (server disconnected, e.g. network error), `isError` (errors during streaming stopped the response early), `finishReason` (optional `'stop' \| 'length' \| 'content-filter' \| 'tool-calls' \| 'error' \| 'other'`, undefined if not provided by the model). |
| onError | `(error: Error) => void` | Optional. Called when an error is encountered. |
| onData | `(dataPart: DataUIPart) => void` | Optional. Called when a data part is received. |
| throttle | `number` | Optional. React and Vue only. Custom throttle wait time in milliseconds for reactive chat message updates. Positive values reduce UI update frequency without delaying stream processing or callbacks, and the latest messages are published before a ready or error status. Default is undefined, which disables throttling. |
| resume | `boolean` | Optional. Whether to automatically resume an ongoing chat generation stream on mount and after the page becomes visible again following a network disconnect. Defaults to false. |

## Returns

| Name | Type | Description |
| --- | --- | --- |
| id | `string` | The id of the chat. |
| messages | `UIMessage[]` | The current array of chat messages. Each `UIMessage` has `id` (`string`), `role` (`'system' \| 'user' \| 'assistant'`), `parts` (`UIMessagePart[]`, use for rendering), `metadata` (optional `unknown`). |
| status | `'submitted' \| 'streaming' \| 'ready' \| 'error'` | "ready" (idle), "submitted" (request sent), "streaming" (receiving response), or "error" (request failed). |
| error | `Error \| undefined` | The error object if an error occurred. |
| sendMessage | `(message?: { text: string; files?: FileList \| FileUIPart[]; metadata?; messageId?: string } \| CreateUIMessage, options?: ChatRequestOptions) => Promise<void>` | Sends a new message and triggers an API call for the assistant response. If a `messageId` is provided, the message is replaced (useful for editing). When replacing with a `CreateUIMessage`, provide its `id` to assign a new ID. If no message is provided, resubmits the current messages (useful after adding tool outputs). `ChatRequestOptions`: `headers` (`Record<string, string> \| Headers`), `body` (`object`), `metadata` (`unknown`), all optional. |
| regenerate | `(options?: { messageId?: string } & ChatRequestOptions) => Promise<void>` | Regenerates the last assistant message or a specific message. |
| stop | `() => void` | Aborts the current streaming response from the assistant. |
| clearError | `() => void` | Clears the error state. |
| resumeStream | `() => void` | Resumes an interrupted streaming response. Useful when a network error occurs during streaming. |
| addToolOutput | `(options: { tool: string; toolCallId: string; output: unknown } \| { tool: string; toolCallId: string; state: "output-error", errorText: string }) => void` | Adds a tool result to the chat. If `sendAutomaticallyWhen` is configured, it may trigger an automatic submission. |
| addToolApprovalResponse | `(options: { id: string; approved: boolean; reason?: string }) => void \| PromiseLike<void>` | Responds to a tool approval request. The `id` should match the approval id from the tool call. If `sendAutomaticallyWhen` is configured, it may trigger an automatic submission. |
| addToolResult | `(options: { tool: string; toolCallId: string; output: unknown } \| { tool: string; toolCallId: string; state: "output-error", errorText: string }) => void` | Deprecated. Use `addToolOutput` instead. |
| setMessages | `(messages: UIMessage[] \| ((messages: UIMessage[]) => UIMessage[])) => void` | Updates the messages state locally without triggering an API call. Useful for optimistic updates. |

## Notes

- `useChat` was significantly updated in AI SDK 5.0: it uses a transport-based architecture and no longer manages input state internally (see the 5.0 migration guide).
- `addToolResult` is deprecated; use `addToolOutput`.
- React: `messages`, `status`, and `error` describe the snapshot for the current render. The underlying `Chat` updates as stream chunks are processed; React may batch updates, and `throttle` can delay message rendering without delaying stream processing or callbacks. Status and error updates include the latest messages.
- Each `useChat({ chat })` call subscribes independently. Consumers sharing a `Chat` can display different message snapshots when using different throttle intervals. A functional `setMessages` updater receives the Chat's latest messages, which may be newer than those in the current render.
- Import differs per framework: `useChat` from `@ai-sdk/react` / `@ai-sdk/vue`, `Chat` from `@ai-sdk/svelte` / `@ai-sdk/angular`.

## Related

- [Transport](./transport.md)
- [UIMessage](./ui-message.md)
- [Error Handling](./error-handling.md)
- [convertToModelMessages](./convert-to-model-messages.md)
- [Message Metadata](./message-metadata.md)
