---
source: https://ai-sdk.dev/docs/foundations/provider-options
---

# Provider Options

Provider options pass provider-specific configuration beyond the standard settings shared by all providers, via the `providerOptions` property on functions like `generateText` and `streamText`.

## Signature / Usage

```ts
const result = await generateText({
  model: openai('gpt-6-astra'),
  prompt: 'Explain quantum entanglement.',
  providerOptions: {
    openai: {
      reasoningEffort: 'low',
    },
  },
});
```

OpenAI reasoning effort with type safety:

```ts
import {
  openai,
  type OpenAILanguageModelResponsesOptions,
} from '@ai-sdk/openai';
import { generateText } from 'ai';

const result = await generateText({
  model: openai('gpt-6-astra'),
  prompt: 'Invent a new holiday and describe its traditions.',
  providerOptions: {
    openai: {
      reasoningEffort: 'low', // 'low' | 'medium' | 'high' | 'xhigh' | 'max'
    } satisfies OpenAILanguageModelResponsesOptions,
  },
});
```

Anthropic thinking:

```ts
import { anthropic, AnthropicLanguageModelOptions } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const { text, reasoning, reasoningText } = await generateText({
  model: anthropic('claude-opus-4-20250514'),
  prompt: 'How many people will live in the world in 2040?',
  providerOptions: {
    anthropic: {
      thinking: { type: 'enabled', budgetTokens: 12000 },
    } satisfies AnthropicLanguageModelOptions,
  },
});
```

Gateway routing combined with provider options:

```ts
import type { AnthropicLanguageModelOptions } from '@ai-sdk/anthropic';
import type { GatewayProviderOptions } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-sonnet-4',
  prompt: 'Explain quantum computing',
  providerOptions: {
    // Gateway-specific: control routing
    gateway: {
      order: ['vertex', 'anthropic'],
    } satisfies GatewayProviderOptions,
    // Provider-specific: enable reasoning
    anthropic: {
      thinking: { type: 'enabled', budgetTokens: 12000 },
    } satisfies AnthropicLanguageModelOptions,
  },
});
```

## Options / Props

OpenAI (`providerOptions.openai`):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `reasoningEffort` | `'none'` \| `'minimal'` \| `'low'` \| `'medium'` \| `'high'` \| `'xhigh'` \| `'max'` | `'medium'` (Balanced) | Amount of internal reasoning; `'none'` is GPT-5.1 models only; `'xhigh'` / `'max'` on supported models |
| `reasoningSummary` | `'auto'` \| `'detailed'` \| `null` | `'detailed'` when `reasoningEffort` is not `'none'` (Responses provider) | `'auto'` condensed summary; `'detailed'` comprehensive; `null` omits summaries |
| `textVerbosity` | `'low'` \| `'medium'` \| `'high'` | `'medium'` | Length and detail of the text response, independent of reasoning |

Anthropic (`providerOptions.anthropic`):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `thinking` | `{ type: 'enabled', budgetTokens: number }` | — | Dedicated thinking phase; `budgetTokens` is the upper limit of reasoning tokens |
| `effort` | `'low'` \| `'medium'` \| `'high'` | `'high'` | Reasoning depth without a token budget; affects thinking, text responses, and function calls |
| `speed` | `'fast'` \| `'standard'` | — | For `claude-opus-4-6`, `'fast'` enables approximately 2.5x faster output token speeds |

## Notes

- Options are namespaced by provider name (`openai`, `anthropic`); options for several providers can be in the same call and only those matching the active provider are used.
- For reasoning effort prefer the portable top-level `reasoning` parameter; use provider-specific options only for features like exact token budgets.
- Supported effort levels vary by model; an unsupported effort results in an error.
- Thinking is supported on `claude-opus-4-20250514`, `claude-sonnet-4-20250514`, and `claude-sonnet-4-5-20250929`.
- With the AI Gateway, use the underlying provider name (e.g. `openai`, `anthropic`) as the key, not `gateway`; gateway-specific options (routing, fallbacks) go under `gateway` in the same call.
- Each provider exports an options type (`OpenAILanguageModelResponsesOptions`, `AnthropicLanguageModelOptions`) for use with `satisfies`.
- Message-level and message-part-level application is described in Prompts.

## Related

- [Prompts](./prompts.md)
- [Providers and Models](./providers-and-models.md)
- [Choosing a Provider](./choosing-a-provider.md)
