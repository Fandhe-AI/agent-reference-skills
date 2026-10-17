---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/default-settings-middleware
---

# defaultSettingsMiddleware

Applies default settings to language model calls to establish consistent default parameters across invocations.

## Signature / Usage

```ts
import { defaultSettingsMiddleware } from 'ai';

const middleware = defaultSettingsMiddleware({
  settings: {
    temperature: 0.7,
    maxOutputTokens: 1000,
    // other settings...
  },
});
```

```ts
import { streamText, wrapLanguageModel, defaultSettingsMiddleware } from 'ai';
import { gateway } from '@ai-sdk/gateway';

// Create a model with default settings
const modelWithDefaults = wrapLanguageModel({
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
});

// Use the model - default settings will be applied
const result = await streamText({
  model: modelWithDefaults,
  prompt: 'Your prompt here',
  // These parameters will override the defaults
  temperature: 0.8,
});
```

Import: `import { defaultSettingsMiddleware } from "ai"`

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| settings | object | Default parameter values to apply to language model calls. Can include any valid `LanguageModelV4CallOptions` properties and optional provider metadata. |

Returns a middleware object that merges the default settings with the parameters of each call, lets explicitly provided parameters take precedence, and merges provider metadata objects.

## Notes

- The official usage example pairs `gateway('anthropic/claude-sonnet-4.5')` with `providerOptions.openai`; provider options are keyed by the actual provider, so this page uses an OpenAI model (as in the Provider Management guide).
- To apply default system instructions, use `defaultInstructionsMiddleware`.

## Related

- [defaultInstructionsMiddleware](./default-instructions-middleware.md)
- [Language Model Middleware](./middleware.md)
