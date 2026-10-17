---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/custom-provider
---

# customProvider

Maps ids to any model: custom model configurations, alias names, and an optional fallback provider. Can expose language, embedding, image, transcription, speech, reranking, video, files, and skills capabilities.

## Signature / Usage

```ts
import { openai } from '@ai-sdk/openai';
import { customProvider } from 'ai';

// custom provider with different model settings:
export const myOpenAI = customProvider({
  languageModels: {
    // replacement model with custom settings:
    'gpt-6-astra': wrapLanguageModel({
      model: openai('gpt-6-astra'),
      middleware: defaultSettingsMiddleware({
        settings: {
          providerOptions: {
            openai: {
              reasoningEffort: 'high',
            },
          },
        },
      }),
    }),
  },
  fallbackProvider: openai,
});
```

Import: `import { customProvider } from "ai"`

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| languageModels | `Record<string, LanguageModel>` (optional) | Language models, keys are model IDs. |
| embeddingModels | `Record<string, EmbeddingModel>` (optional) | Text embedding models. |
| imageModels | `Record<string, ImageModel>` (optional) | Image models. |
| transcriptionModels | `Record<string, TranscriptionModel>` (optional) | Transcription models. |
| speechModels | `Record<string, SpeechModel>` (optional) | Speech models. |
| rerankingModels | `Record<string, RerankingModel>` (optional) | Reranking models. |
| videoModels | `Record<string, VideoModel>` (optional) | Video models. |
| files | `FilesV4` (optional) | A files API interface to expose through the custom provider. |
| skills | `SkillsV4` (optional) | A skills API interface to expose through the custom provider. |
| fallbackProvider | `Provider` (optional) | Fallback provider used when a requested model or capability is not found in the custom provider. |

Returns a `Provider` instance with:

| Name | Type | Description |
| --- | --- | --- |
| languageModel | `(id: string) => LanguageModel` | By custom provider model ID. |
| embeddingModel | `(id: string) => EmbeddingModel` | By custom provider model ID. |
| imageModel | `(id: string) => ImageModel` | By custom provider model ID. |
| transcriptionModel | `(id: string) => TranscriptionModel` | By custom provider model ID. |
| speechModel | `(id: string) => SpeechModel` | By custom provider model ID. |
| rerankingModel | `(id: string) => RerankingModel` | By custom provider model ID. |
| videoModel | `(id: string) => VideoModelV4` | By custom provider model ID. |
| files | `() => FilesV4` (optional) | Files API interface, when configured directly or inherited from the fallback provider. |
| skills | `() => SkillsV4` (optional) | Skills API interface, when configured directly or inherited from the fallback provider. |

## Notes

- Experimental decision models: pass `decisionModels: Record<string, Experimental_DecisionModel>` to define aliases for decision model instances or string IDs. The returned provider adds `decisionModel(alias): Experimental_DecisionModelV4`. String aliases resolve through Gateway by default, or an explicitly configured default provider with a `decisionModel` method. Unknown aliases use the fallback provider's decision factory when available; model failures and unsupported questions do not trigger substitution.
- Unavailable decision capabilities or models throw `NoSuchModelError` with `modelType: 'decisionModel'`; these are structural extensions, not added to the stable `ProviderV4` contract.
- The official reference page still shows `EmbeddingModel<string>`; the generic was removed in AI SDK 6 (see migration guide 6.0), and in ai@7.0.142 `EmbeddingModel` is non-generic (the custom provider / registry return `EmbeddingModelV4`).
- The official example omits the imports of `wrapLanguageModel` / `defaultSettingsMiddleware` (both exported from `ai`).

## Related

- [Provider & Model Management](./provider-management.md)
- [createProviderRegistry](./provider-registry.md)
- [defaultSettingsMiddleware](./default-settings-middleware.md)
