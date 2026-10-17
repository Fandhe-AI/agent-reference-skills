---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/default-instructions-middleware
---

# defaultInstructionsMiddleware

Applies default instructions to language model calls that do not already contain a system message; call-level `instructions` take precedence.

## Signature / Usage

```ts
function defaultInstructionsMiddleware(options: {
  instructions: Instructions;
}): LanguageModelMiddleware;
```

```ts
import {
  defaultInstructionsMiddleware,
  generateText,
  wrapLanguageModel,
} from 'ai';

const model = wrapLanguageModel({
  model: yourModel,
  middleware: defaultInstructionsMiddleware({
    instructions: 'You are a concise technical assistant.',
  }),
});

const overriddenResult = await generateText({
  model,
  instructions: 'Explain concepts for a complete beginner.',
  prompt: 'Explain HTTP caching.',
});
```

Provider options on default instructions via `SystemModelMessage`:

```ts
const model = wrapLanguageModel({
  model: yourModel,
  middleware: defaultInstructionsMiddleware({
    instructions: {
      role: 'system',
      content: 'You are a concise technical assistant.',
      providerOptions: {
        anthropic: {
          cacheControl: { type: 'ephemeral' },
        },
      },
    },
  }),
});
```

Import: `import { defaultInstructionsMiddleware } from "ai"`

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| instructions | `string \| SystemModelMessage \| Array<SystemModelMessage>` | Default instructions to prepend when a call does not already contain a system message. |

Returns a `LanguageModelMiddleware` that prepends the configured instructions to calls without a system message, preserves instruction-level `providerOptions`, leaves calls containing any system message unchanged, and applies to both non-streaming and streaming calls.

## Notes

- Provides defaults, not enforced instructions. Any system message in the normalized prompt suppresses the defaults.
- Only use `allowSystemInMessages` with trusted message histories, because an untrusted system message could override the configured defaults.
- The official example uses a `__MODEL__` placeholder for the model; `yourModel` is substituted here.

## Related

- [Language Model Middleware](./middleware.md)
- [defaultSettingsMiddleware](./default-settings-middleware.md)
