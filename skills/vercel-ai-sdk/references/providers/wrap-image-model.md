---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/wrap-image-model
---

# wrapImageModel

Enhances the behavior of an image model by wrapping it with middleware.

## Signature / Usage

```ts
import { generateImage, wrapImageModel } from 'ai';
import { openai } from '@ai-sdk/openai';

const model = wrapImageModel({
  model: openai.image('gpt-image-2.5-sunburst'),
  middleware: yourImageModelMiddleware,
});

const { image } = await generateImage({
  model,
  prompt: 'Santa Claus driving a Cadillac',
});
```

Import: `import { wrapImageModel } from "ai"`

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| model | `ImageModelV4` | The original `ImageModelV4` instance to be wrapped. |
| middleware | `ImageModelV4Middleware \| ImageModelV4Middleware[]` | The middleware to apply. When multiple middlewares are provided, the first middleware transforms the input first, and the last middleware is wrapped directly around the model. |
| modelId | string | Optional custom model ID to override the original model's ID. |
| providerId | string | Optional custom provider ID to override the original model's provider. |

Returns a new `ImageModelV4` instance with middleware applied. The wrapped model preserves the original model's `supportsFileInputs` and `supportsMaskInputs` capabilities by default. Middleware can override them with `overrideSupportsFileInputs` and `overrideSupportsMaskInputs`; returning `undefined` from an override intentionally marks that capability as unknown.

```ts
const model = wrapImageModel({
  model: originalModel,
  middleware: {
    specificationVersion: 'v4',
    overrideSupportsFileInputs: () => true,
    overrideSupportsMaskInputs: () => false,
  },
});
```

## Related

- [wrapLanguageModel](./wrap-language-model.md)
- [Language Model Middleware](./middleware.md)
