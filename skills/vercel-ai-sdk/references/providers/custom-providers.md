---
source: https://ai-sdk.dev/providers/openai-compatible-providers/custom-providers
---

# Writing a Custom Provider

Create your own npm provider package that leverages `@ai-sdk/openai-compatible`, so users get an easy way to use the provider's models.

## Signature / Usage

File structure:

```bash
packages/example/
├── src/
│   ├── example-chat-settings.ts       # Chat model types and settings
│   ├── example-completion-settings.ts # Completion model types and settings
│   ├── example-embedding-settings.ts  # Embedding model types and settings
│   ├── example-image-settings.ts      # Image model types and settings
│   ├── example-provider.ts            # Main provider implementation
│   ├── example-provider.test.ts       # Provider tests
│   └── index.ts                       # Public exports
├── package.json
├── tsconfig.json
├── tsdown.config.ts                   # Build configuration
└── README.md
```

Model ids (completion, embedding, image settings are implemented similarly):

```ts
export type ExampleChatModelId =
  | 'example/chat-model-1'
  | 'example/chat-model-2'
  | (string & {});
```

Main provider implementation (abridged: shows the factory wiring; the official page also defines `ExampleProviderSettings` with `apiKey`, `baseURL`, `headers`, `queryParams`, `fetch`, and the `ExampleProvider` interface with call signature plus `chatModel` / `completionModel` / `embeddingModel` / `imageModel`):

```ts
import {
  OpenAICompatibleChatLanguageModel,
  OpenAICompatibleCompletionLanguageModel,
  OpenAICompatibleEmbeddingModel,
  OpenAICompatibleImageModel,
} from '@ai-sdk/openai-compatible';
import {
  FetchFunction,
  loadApiKey,
  withoutTrailingSlash,
} from '@ai-sdk/provider-utils';

export function createExample(
  options: ExampleProviderSettings = {},
): ExampleProvider {
  const baseURL = withoutTrailingSlash(
    options.baseURL ?? 'https://api.example.com/v1',
  );
  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'EXAMPLE_API_KEY',
      description: 'Example API key',
    })}`,
    ...options.headers,
  });

  const getCommonModelConfig = (modelType: string): CommonModelConfig => ({
    provider: `example.${modelType}`,
    url: ({ path }) => {
      const url = new URL(`${baseURL}${path}`);
      if (options.queryParams) {
        url.search = new URLSearchParams(options.queryParams).toString();
      }
      return url.toString();
    },
    headers: getHeaders,
    fetch: options.fetch,
  });

  const createChatModel = (
    modelId: ExampleChatModelId,
    settings: ExampleChatSettings = {},
  ) => {
    return new OpenAICompatibleChatLanguageModel(
      modelId,
      settings,
      getCommonModelConfig('chat'),
    );
  };

  const provider = (
    modelId: ExampleChatModelId,
    settings?: ExampleChatSettings,
  ) => createChatModel(modelId, settings);

  provider.completionModel = createCompletionModel;
  provider.chatModel = createChatModel;
  provider.embeddingModel = createEmbeddingModel;
  provider.imageModel = createImageModel;

  return provider;
}

// Export default instance
export const example = createExample();
```

Public exports (`index.ts`):

```ts
export { createExample, example } from './example-provider';
export type {
  ExampleProvider,
  ExampleProviderSettings,
} from './example-provider';
```

Usage after publishing:

```ts
import { example } from '@company-name/example';
import { generateText } from 'ai';

const { text } = await generateText({
  model: example('example/chat-model-1'),
  prompt: 'Hello, how are you?',
});
```

## Notes

- The official `package.json` example lists dependencies `@ai-sdk/openai-compatible` (`^0.0.7`), `@ai-sdk/provider` (`^1.0.2`), `@ai-sdk/provider-utils` (`^2.0.4`); these version numbers are stale illustrations in the source, not the pinned versions of this skill (see the pin in SKILL.md).
- Internal API: import from `@ai-sdk/openai-compatible/internal`, for example `import { convertToOpenAICompatibleChatMessages } from '@ai-sdk/openai-compatible/internal';`. See the official GitHub repository (`packages/openai-compatible/src/internal/index.ts`) for the latest exports.
- Model classes in the example return `LanguageModelV4` / `EmbeddingModelV4` / `ImageModelV4` from `@ai-sdk/provider`.

## Related

- [OpenAI Compatible Providers](./openai-compatible-providers.md)
- [customProvider](./custom-provider.md)
