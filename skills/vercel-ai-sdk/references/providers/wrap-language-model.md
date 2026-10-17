---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/wrap-language-model
---

# wrapLanguageModel

Enhances the behavior of a language model by wrapping it with middleware.

## Signature / Usage

```ts
import { wrapLanguageModel, gateway } from 'ai';

const wrappedLanguageModel = wrapLanguageModel({
  model: gateway('openai/gpt-6-astra'),
  middleware: yourLanguageModelMiddleware,
});
```

Import: `import { wrapLanguageModel } from "ai"`

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| model | `LanguageModelV4` | The original `LanguageModelV4` instance to be wrapped. |
| middleware | `LanguageModelV4Middleware \| LanguageModelV4Middleware[]` | The middleware to apply. When multiple middlewares are provided, the first middleware transforms the input first, and the last middleware is wrapped directly around the model. |
| modelId | string | Optional custom model ID to override the original model's ID. |
| providerId | string | Optional custom provider ID to override the original model's provider. |

Returns a new `LanguageModelV4` instance with middleware applied.

## Notes

- This wraps a language model; it is not HTTP middleware as in hono / fastify / nextjs-app / go-echo.

## Related

- [Language Model Middleware](./middleware.md)
- [LanguageModelV4Middleware](./language-model-middleware.md)
- [wrapImageModel](./wrap-image-model.md)
