---
source: https://ai-sdk.dev/docs/ai-sdk-ui/error-handling
---

# Error Handling and warnings

Warnings surface unsupported features, compatibility modes, and deprecations; each AI SDK UI hook also returns an `error` object and accepts an `onError` callback.

## Signature / Usage

```tsx
import { useChat } from '@ai-sdk/react';
import { APICallError, EmptyResponseBodyError } from 'ai';

export default function Page() {
  const {
    /* ... */
  } = useChat({
    // handle error:
    onError: error => {
      if (APICallError.isInstance(error)) {
        console.error('Request failed with status:', error.statusCode);
      } else if (EmptyResponseBodyError.isInstance(error)) {
        console.error('The server returned no response body.');
      } else {
        console.error(error);
      }
    },
  });
}
```

Render the error and offer a retry:

```tsx
const { messages, sendMessage, error, regenerate } = useChat();

{error && (
  <>
    <div>An error occurred.</div>
    <button type="button" onClick={() => regenerate()}>
      Retry
    </button>
  </>
)}
```

Alternatively replace the failed message with a custom submit handler (`setMessages(messages => messages.at(-1)?.role === 'assistant' ? messages.slice(0, -2) : messages.slice(0, -1))`), removing both the partial assistant response and its user message when the response had started streaming.

### Warnings

Warnings use Node.js `process.emitWarning` when available and `console.warn` in browser/edge runtimes. All include "AI SDK Warning". Turn off or customize:

```ts
globalThis.AI_SDK_LOG_WARNINGS = false;

globalThis.AI_SDK_LOG_WARNINGS = ({ warnings, provider, model }) => {
  // Handle warnings your own way
};
```

Custom handlers receive every warning, including repeated deprecations. If multiple AI SDK versions are loaded they share `globalThis.AI_SDK_LOG_WARNINGS`; accept a union of each version's `LogWarningsFunction` parameter types (for AI SDK 5 use `Experimental_LogWarningsFunction` and `Array.isArray` to handle its warning array).

```ts
import type { LogWarningsFunction as LogWarningsFunctionV7 } from 'ai';
import type { LogWarningsFunction as LogWarningsFunctionV6 } from 'ai-v6';

type LoggerOptions =
  | Parameters<LogWarningsFunctionV7>[0]
  | Parameters<LogWarningsFunctionV6>[0];
```

#### Deprecation codes

| Code | Deprecated usage / replacement |
| --- | --- |
| `AISDK_DEP_GENERATE_OBJECT` | Use `generateText` with `output` instead of `generateObject`. |
| `AISDK_DEP_STREAM_OBJECT` | Use `streamText` with `output` instead of `streamObject`. |
| `AISDK_DEP_EXPERIMENTAL_GENERATE_SPEECH` | Use `generateSpeech` instead of `experimental_generateSpeech`. |
| `AISDK_DEP_EXPERIMENTAL_TRANSCRIBE` | Use `transcribe` instead of `experimental_transcribe`. |
| `AISDK_DEP_TOOL_RESULT_*` | Use `file` with tagged `data` instead of legacy tool-result content types. |
| `AISDK_DEP_UI_MESSAGE_RAW_INPUT` | Use `input` instead of `rawInput` in UI tool parts. |
| `AISDK_DEP_IMAGE_CONTENT_PART` | Use `file` with an image `mediaType` instead of `image` message parts. |

## Options / Props

### Client error classes

AI SDK-created client errors use exported error classes with marker-based `.isInstance()` guards:

| Error class | AI SDK UI failure |
| --- | --- |
| `APICallError` | A chat transport or completion request returns a non-successful HTTP response. |
| `EmptyResponseBodyError` | A successful chat transport or completion response has no body. |
| `UIMessageStreamError` | A completion data stream reports an error or a UI message stream contains invalid chunks. |
| `InvalidArgumentError` | An invalid stream protocol or message ID is used. |
| `UnsupportedFunctionalityError` | A `FileList` is used in an environment that does not support it. |

## Notes

- Default logger emits each deprecation code once per loaded SDK instance. In Node.js these are `DeprecationWarning` with a stable `AISDK_DEP_*` code in `warning.code` (via `process.on('warning', handler)`); browser/edge console messages include the code in brackets. `--throw-deprecation`, `--no-deprecation`, `--trace-deprecation` affect all `DeprecationWarning`s and only the default Node.js logger.
- Show a generic error message such as "Something went wrong." to avoid leaking server information.
- For AI SDK UI requests, `APICallError.requestBodyValues` is `undefined` so prompts and messages are not copied into client-facing errors; response text remains available as `message` and `responseBody`.
- Errors thrown by custom fetch implementations, callbacks, and stream parsers propagate unchanged.
- To inject test errors, throw in the route handler: `export async function POST(req: Request) { throw new Error('This is a test error'); }`.

## Related

- [useChat](./use-chat.md)
- [useCompletion](./use-completion.md)
- [Transport](./transport.md)
