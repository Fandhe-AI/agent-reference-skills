---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/provider-registry
---

# createProviderRegistry

Creates a registry of multiple providers whose models are accessed by ids in the format `providerId:modelId`.

## Signature / Usage

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createProviderRegistry } from 'ai';

export const registry = createProviderRegistry({
  // register provider with prefix and default setup:
  anthropic,

  // register provider with prefix and custom setup:
  openai: createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }),
});
```

Import: `import { createProviderRegistry } from "ai"`

In TypeScript, registry model IDs are inferred from the registered provider IDs; when a provider exposes literal model ID types, editors can suggest combined `providerId:modelId` values.

Custom separator:

```ts
const registry = createProviderRegistry(
  {
    anthropic,
    openai,
  },
  { separator: ' > ' },
);

const model = registry.languageModel('anthropic > claude-3-opus-20240229');
```

## Options / Props

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| providers | `Record<string, Provider>` | The unique identifier for the provider. It should be unique within the registry. |
| options | object (optional) | Optional configuration for the registry. |

`Provider` members:

| Name | Type | Description |
| --- | --- | --- |
| languageModel | `(id: string) => LanguageModel` | Returns a language model by its id. |
| embeddingModel | `(id: string) => EmbeddingModel<string>` | Returns a text embedding model by its id. |
| imageModel | `(id: string) => ImageModel` | Returns an image model by its id. |
| transcriptionModel | `(id: string) => TranscriptionModel` (optional) | Returns a transcription model by its id. |
| speechModel | `(id: string) => SpeechModel` (optional) | Returns a speech model by its id. |
| rerankingModel | `(id: string) => RerankingModel` (optional) | Returns a reranking model by its id. |
| videoModel | `(id: string) => VideoModelV4` (optional) | Returns a video model by its id. |
| files | `() => FilesV4` (optional) | Returns the provider files API interface. |
| skills | `() => SkillsV4` (optional) | Returns the provider skills API interface. |

`options`:

| Name | Type | Description |
| --- | --- | --- |
| separator | string (optional) | Custom separator between provider and model IDs. Defaults to ":". |
| languageModelMiddleware | `LanguageModelMiddleware \| LanguageModelMiddleware[]` (optional) | Middleware to wrap all language models obtained from the registry. |
| imageModelMiddleware | `ImageModelMiddleware \| ImageModelMiddleware[]` (optional) | Middleware to wrap all image models obtained from the registry. |

Returns a `Provider` instance with:

| Name | Type | Description |
| --- | --- | --- |
| languageModel | `(id: string) => LanguageModel` | By id (format: providerId:modelId). |
| embeddingModel | `(id: string) => EmbeddingModel<string>` | By id (format: providerId:modelId). |
| imageModel | `(id: string) => ImageModel` | By id (format: providerId:modelId). |
| transcriptionModel | `(id: string) => TranscriptionModel` | By id (format: providerId:modelId). |
| speechModel | `(id: string) => SpeechModel` | By id (format: providerId:modelId). |
| rerankingModel | `(id: string) => RerankingModel` | By id (format: providerId:modelId). |
| videoModel | `(id: string) => VideoModelV4` | By id (format: providerId:modelId). |
| files | `(providerId: string) => FilesV4` | Provider files API interface by provider id. |
| skills | `(providerId: string) => SkillsV4` | Provider skills API interface by provider id. |

## Notes

- Experimental decision models: the inferred return type also exposes `decisionModel('providerId:modelId')`, returning `Experimental_DecisionModelV4`. The provider must expose a `decisionModel` factory. Language and image middleware do not wrap decision models. `ProviderRegistryProvider` remains a stable interface; use the inferred return type or `Experimental_DecisionProviderRegistry` to retain experimental decision access.
- Unavailable decision capabilities or models throw `NoSuchModelError` with `modelType: 'decisionModel'`; unknown registry providers throw `NoSuchProviderError`. These are structural extensions, not added to the stable `ProviderV4` contract. Direct decision string IDs default to Gateway when no default provider is configured.
- Video models are used with `experimental_generateVideo`.

## Related

- [Provider & Model Management](./provider-management.md)
- [customProvider](./custom-provider.md)
