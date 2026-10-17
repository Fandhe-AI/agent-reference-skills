---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-completion
---

# useCompletion

Creates text completion capabilities: streams text completions from your AI provider, manages the state for input, and updates the UI as new content is received.

## Signature / Usage

```tsx
import { useCompletion } from '@ai-sdk/react';
// Svelte: import { Completion } from '@ai-sdk/svelte'
// Vue:    import { useCompletion } from '@ai-sdk/vue'
// Angular: import { Completion } from '@ai-sdk/angular'
```

## Options / Props

Type parameter: `BODY` (`object`) is the type of the additional request body passed through the hook options or the `complete` function. Defaults to `object`.

| Name | Type | Description |
| --- | --- | --- |
| api | `string = '/api/completion'` | The API endpoint called to generate text. A relative path (starting with `/`) or an absolute URL. |
| id | `string` | A unique identifier for the completion. If not provided, a random one will be generated. When provided, `useCompletion` hooks with the same `id` share state across components. |
| initialInput | `string` | An optional string for the initial prompt input. |
| initialCompletion | `string` | An optional string for the initial completion result. |
| onFinish | `(prompt: string, completion: string) => void` | Called when the completion stream ends. |
| onError | `(error: Error) => void` | Called when the stream encounters an error. |
| headers | `Record<string, string> \| Headers` | Headers to be passed to the API endpoint. |
| body | `BODY` | Additional body object to be passed to the API endpoint. |
| credentials | `'omit' \| 'same-origin' \| 'include'` | Credentials mode for the request. Defaults to same-origin. |
| streamProtocol | `'text' \| 'data'` (Optional) | Type of stream to be used. Defaults to `data`. If `text`, the stream is treated as a text stream. |
| fetch | `FetchFunction` (Optional) | A custom fetch function for the API call. Defaults to the global fetch function. |
| throttle | `number` (Optional) | React only. Custom throttle wait time in milliseconds for the completion and data updates. Default is undefined, which disables throttling. |

## Returns

| Name | Type | Description |
| --- | --- | --- |
| completion | `string` | The current text completion. |
| complete | `(prompt: string, options?: { headers?: Record<string, string> \| Headers, body?: BODY }) => Promise<string \| null \| undefined>` | Executes text completion for the provided prompt. Returns the completion result when finished. |
| error | `undefined \| Error` | The error thrown during the completion process, if any. |
| setCompletion | `(completion: string) => void` | Updates the `completion` state. |
| stop | `() => void` | Aborts the current API request. |
| input | `string` | The current value of the input field. |
| setInput | `React.Dispatch<React.SetStateAction<string>>` | Updates the input value. |
| handleInputChange | `(event: any) => void` | Handler for the `onChange` event of the input field. |
| handleSubmit | `(event?: { preventDefault?: () => void }) => void` | Form submission handler that automatically resets the input field and appends a user message. |
| isLoading | `boolean` | Whether a fetch operation is currently in progress. |

## Notes

- With either protocol, `useCompletion` only exposes text content via the `completion` field; non-text parts (e.g. `data-*` parts) emitted by the server are ignored. Use `useChat` for those parts.
- `useCompletion` only supports the `text` and `data` stream parts of the data stream protocol.

## Related

- [Stream Protocols](./stream-protocol.md)
- [useChat](./use-chat.md)
- [Error Handling](./error-handling.md)
