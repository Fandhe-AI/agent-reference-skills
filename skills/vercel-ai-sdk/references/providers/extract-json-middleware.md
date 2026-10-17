---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/extract-json-middleware
---

# extractJsonMiddleware

Extracts JSON from text content by stripping markdown code fences and other formatting; useful with `Output.object()` when models wrap JSON in code blocks.

## Signature / Usage

```ts
import {
  generateText,
  wrapLanguageModel,
  extractJsonMiddleware,
  Output,
} from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: wrapLanguageModel({
    model: yourModel,
    middleware: extractJsonMiddleware(),
  }),
  output: Output.object({
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        steps: z.array(z.string()),
      }),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});

console.log(result.output);
```

Custom transform:

```ts
import { extractJsonMiddleware } from 'ai';

const middleware = extractJsonMiddleware({
  transform: text =>
    text
      .replace(/^PREFIX/, '')
      .replace(/SUFFIX$/, '')
      .trim(),
});
```

Import: `import { extractJsonMiddleware } from "ai"`

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| transform | `(text: string) => string` (optional) | Custom transform applied to text content. Receives the raw text and returns the transformed text. If not provided, the default transform strips markdown code fences. |

## Notes

- Processes both `generateText` and `streamText` responses. With streaming it buffers the initial content to detect a fence prefix, strips it, keeps a small suffix buffer for the closing fence, and strips any trailing fence at stream end. With a custom `transform`, it buffers all content and applies the transform at the end.
- Works with `partialOutputStream` from `streamText` when `output: Output.object(...)` is used.

## Related

- [Language Model Middleware](./middleware.md)
- [wrapLanguageModel](./wrap-language-model.md)
