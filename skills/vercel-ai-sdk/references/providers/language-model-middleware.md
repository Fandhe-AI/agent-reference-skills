---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/language-model-v2-middleware
---

# LanguageModelV4Middleware

Interface for language model middleware: intercepts and modifies calls to the language model (guardrails, RAG, caching, logging) in a model-agnostic way.

## Signature / Usage

```ts
import { LanguageModelV4Middleware } from "ai"
```

```ts
import type { LanguageModelV4Middleware } from '@ai-sdk/provider';

export const yourCacheMiddleware: LanguageModelV4Middleware = {
  specificationVersion: 'v4',

  wrapGenerate: async ({ doGenerate, params }) => {
    const result = await doGenerate();
    return result;
  },
};
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| specificationVersion | `'v4'` | The specification version of the middleware. Must be "v4". |
| transformParams | `({ type: "generate" \| "stream", params: LanguageModelV4CallOptions, model: LanguageModelV4 }) => PromiseLike<LanguageModelV4CallOptions>` (optional) | Transforms the parameters before they are passed to the language model. |
| wrapGenerate | `({ doGenerate: () => PromiseLike<LanguageModelV4GenerateResult>, doStream: () => PromiseLike<LanguageModelV4StreamResult>, params: LanguageModelV4CallOptions, model: LanguageModelV4 }) => PromiseLike<LanguageModelV4GenerateResult>` (optional) | Wraps the generate operation. Receives both doGenerate and doStream functions. |
| wrapStream | `({ doGenerate, doStream, params, model }) => PromiseLike<LanguageModelV4StreamResult>` (optional) | Wraps the stream operation. Receives both doGenerate and doStream functions (same argument shape as wrapGenerate). |
| overrideProvider | `(options: { model: LanguageModelV4 }) => string` (optional) | Override the provider ID of the model. |
| overrideModelId | `(options: { model: LanguageModelV4 }) => string` (optional) | Override the model ID of the model. |
| overrideSupportedUrls | `(options: { model: LanguageModelV4 }) => PromiseLike<Record<string, RegExp[]>> \| Record<string, RegExp[]>` (optional) | Override the supported URLs for the model. |

## Notes

- Experimental: "Language model middleware is an experimental feature." (warning on the official page).
- The page file and URL keep the old `language-model-v2-middleware` name; the title and types are `LanguageModelV4Middleware`.
- Language model wrapping, not HTTP middleware (hono / fastify / nextjs-app / go-echo).

## Related

- [Language Model Middleware](./middleware.md)
- [wrapLanguageModel](./wrap-language-model.md)
