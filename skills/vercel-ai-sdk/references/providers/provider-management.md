---
source: https://ai-sdk.dev/docs/ai-sdk-core/provider-management
---

# Provider & Model Management

Manage multiple providers and models in a central place and access models through simple string ids, using custom providers (`customProvider`) and a provider registry (`createProviderRegistry`).

## Signature / Usage

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { createProviderRegistry, gateway } from 'ai';

export const registry = createProviderRegistry({
  // register provider with prefix and default setup using gateway:
  gateway,

  // register provider with prefix and direct provider import:
  anthropic,
  openai,
});
```

```ts
import { generateText } from 'ai';
import { registry } from './registry';

const { text } = await generateText({
  model: registry.languageModel('openai:gpt-6-astra'), // default separator
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

## Custom providers

- With custom providers, you can pre-configure model settings, provide model name aliases, and limit the available models.
- The provider registry lets you mix multiple providers and access them through simple string ids.
- You can mix and match custom providers, the provider registry, and middleware.

Model name alias (update the model version in one place):

```ts
import { customProvider, gateway } from 'ai';

// custom provider with alias names:
export const anthropic = customProvider({
  languageModels: {
    opus: gateway('anthropic/claude-opus-5.5'),
    sonnet: gateway('anthropic/claude-sonnet-5.5'),
    haiku: gateway('anthropic/claude-haiku-5.5'),
  },
  fallbackProvider: gateway,
});
```

Custom model settings (wrap with `defaultSettingsMiddleware`):

```ts
import {
  gateway,
  customProvider,
  defaultSettingsMiddleware,
  wrapLanguageModel,
} from 'ai';

export const openai = customProvider({
  languageModels: {
    'gpt-6-astra': wrapLanguageModel({
      model: gateway('openai/gpt-6-astra'),
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
  fallbackProvider: gateway,
});
```

Limit available models: omit `fallbackProvider` (the official example defines `languageModels` and `embeddingModels: { embedding: gateway.embeddingModel('openai/text-embedding-3-small') }` with the comment `// no fallback provider`).

Files and skills interfaces:

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { customProvider, uploadFile, uploadSkill } from 'ai';

// custom provider with files interface:
const myOpenAI = customProvider({
  languageModels: {
    'gpt-6-luna': openai.responses('gpt-6-luna'),
  },
  files: openai.files(),
});

// custom provider with skills interface:
const myAnthropic = customProvider({
  languageModels: {
    sonnet: anthropic('claude-sonnet-5-5'),
  },
  skills: anthropic.skills(),
});

// usage:
await uploadFile({
  api: myOpenAI.files!(),
  data: fileData,
  filename: 'image.png',
});
await uploadSkill({
  api: myAnthropic.skills!(),
  files: skillFiles,
  displayTitle: 'My Skill',
});
```

If no `files` or `skills` option is set but a `fallbackProvider` is configured, the custom provider inherits those interfaces from the fallback.

## Provider registry

By default, the registry uses `:` as the separator between provider and model IDs. Custom separator:

```ts
export const customSeparatorRegistry = createProviderRegistry(
  {
    gateway,
    anthropic,
    openai,
  },
  { separator: ' > ' },
);
```

Accessors on the registry (provider id becomes the prefix of the model id: `providerId:modelId`):

```ts
registry.languageModel('openai:gpt-6-astra');
registry.embeddingModel('openai:text-embedding-3-small');
registry.imageModel('openai:dall-e-3');
registry.videoModel('fal:luma-dream-machine/ray-2'); // used with experimental_generateVideo
registry.files('openai'); // provider files interface, use with uploadFile
registry.skills('anthropic'); // provider skills interface, use with uploadSkill
```

## Combining custom providers, registry, and middleware

The official page shows a single `registry.ts` that combines: a pass-through `gateway` and `xai`, an OpenAI-compatible provider (`createOpenAICompatible({ name, apiKey, baseURL })`), `customProvider` aliases with `fallbackProvider: anthropic`, a reasoning alias built with `wrapLanguageModel` + `defaultSettingsMiddleware` (`providerOptions.anthropic.thinking` validated with `satisfies AnthropicLanguageModelOptions`), a `groq` provider limited to two models without fallback, and `{ separator: ' > ' }`. Usage:

```ts
const model = registry.languageModel('anthropic > reasoning');
```

## Global provider configuration

AI SDK 5 introduced a global provider so a model can be a plain model ID string. By default the global provider is the Vercel AI Gateway. Set your own:

```ts
import { openai } from '@ai-sdk/openai';

// Initialize once during startup:
globalThis.AI_SDK_DEFAULT_PROVIDER = openai;
```

```ts
import { streamText } from 'ai';

const result = await streamText({
  model: 'gpt-6-astra', // Uses OpenAI provider without prefix
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

## Notes

- Experimental decision models: custom providers accept `decisionModels` aliases, and registries expose `decisionModel('provider:model')`. These return model instances for `experimental_decide`. Direct string IDs use Gateway by default, or an explicitly configured default provider with a `decisionModel` method. Registry middleware for language and image models does not apply to decision.
- Model IDs in the official examples (for example `gpt-6-astra`) are copied as written in the source.
- Distinct from HTTP middleware in hono / fastify / nextjs-app / go-echo: registry and custom provider concern which language model is resolved, not the HTTP request pipeline.

## Related

- [createProviderRegistry](./provider-registry.md)
- [customProvider](./custom-provider.md)
- [Language Model Middleware](./middleware.md)
- [wrapLanguageModel](./wrap-language-model.md)
