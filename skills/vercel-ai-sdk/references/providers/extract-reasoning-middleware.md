---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/extract-reasoning-middleware
---

# extractReasoningMiddleware

Extracts delimited reasoning sections from generated text and exposes them separately from the main text content.

## Signature / Usage

```ts
import { extractReasoningMiddleware } from 'ai';

const middleware = extractReasoningMiddleware({
  tagName: 'reasoning',
  separator: '\n',
});
```

For models that emit non-XML delimiters, pass literal `opening` and `closing` strings (Gemma 4's raw thought-channel output uses a newline in its opening delimiter):

```ts
const middleware = extractReasoningMiddleware({
  tagName: { opening: '<|channel>thought\n', closing: '<channel|>' },
});
```

Import: `import { extractReasoningMiddleware } from "ai"`

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| tagName | `string \| { opening: string; closing: string }` | An XML tag name without angle brackets (e.g. "think" for `<think>` / `</think>`), or an object containing non-empty literal opening and closing delimiters. |
| separator | string (optional) | Separator between reasoning and text sections. Defaults to "\n". |
| startWithReasoning | boolean (optional) | Starts with reasoning tokens. Set to true when the response always starts with reasoning and the opening delimiter is omitted. Defaults to false. |

Returns a middleware object that processes both streaming and non-streaming responses, extracts content between the delimiters as reasoning, removes the delimiters and reasoning from the main text, emits reasoning content parts separately from text content parts, and keeps text sections separated by `separator`. Works with `LanguageModelV4StreamPart` for streaming.

## Notes

- Custom delimiters must be non-empty. They are matched literally (including characters such as `|`) and can span multiple streaming chunks. Empty reasoning blocks are removed from the answer text as well.
- Use it when the server returns these markers in text; providers that already return reasoning separately do not need it.

## Related

- [Language Model Middleware](./middleware.md)
- [wrapLanguageModel](./wrap-language-model.md)
