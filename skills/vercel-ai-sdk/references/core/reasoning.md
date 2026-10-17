---
source: https://ai-sdk.dev/docs/ai-sdk-core/reasoning
---

# Reasoning

The AI SDK provides a top-level `reasoning` parameter on `generateText` and `streamText` that controls the model's internal "reasoning" (or "thinking") phase across providers with a single, portable setting.

## Signature / Usage

```ts
import { generateText } from 'ai';

const { text, reasoning, reasoningText } = await generateText({
  model: 'anthropic/claude-sonnet-5.5',
  reasoning: 'medium',
  prompt: 'How many people will live in the world in 2040?',
});
```

Streaming works the same way:

```ts
import { streamText } from 'ai';

const result = streamText({
  model: 'google/gemini-3.8-flash',
  reasoning: 'high',
  prompt: 'Explain the Riemann hypothesis in simple terms.',
});

for await (const part of result.stream) {
  if (part.type === 'reasoning-delta') {
    process.stdout.write(part.text);
  } else if (part.type === 'text-delta') {
    process.stdout.write(part.text);
  }
}
```

## Options / Props

| Value | Behavior |
| --- | --- |
| `'provider-default'` | Use the provider's default reasoning behavior (default when omitted) |
| `'none'` | Disable reasoning |
| `'minimal'` | Bare-minimum reasoning |
| `'low'` | Fast, concise reasoning |
| `'medium'` | Balanced reasoning |
| `'high'` | Thorough reasoning |
| `'xhigh'` | Extra-high reasoning |
| `'max'` | Maximum reasoning |

### Precedence rules

Provider-specific settings take precedence over the corresponding fields derived from `reasoning`. Partial configurations may still use portable reasoning to fill missing fields; summary and display settings can be used alongside it.

```ts
const { text } = await generateText({
  model: openai.responses('gpt-6-astra'),
  reasoning: 'low', // ignored because providerOptions.openai.reasoningEffort is set
  providerOptions: {
    openai: {
      reasoningEffort: 'high', // this wins
    },
  },
  prompt: 'Explain quantum entanglement.',
});
```

### Migrating from providerOptions

Before (Anthropic):

```ts
providerOptions: {
  anthropic: {
    thinking: { type: 'adaptive' },
    effort: 'high',
  },
},
```

After:

```ts
reasoning: 'high',
```

Older Anthropic model: `thinking: { type: 'enabled', budgetTokens: 12000 }` becomes `reasoning: 'medium'`. Google: `thinkingConfig: { thinkingLevel: 'high', includeThoughts: true }` becomes `reasoning: 'high'` plus `providerOptions: { google: { thinkingConfig: { includeThoughts: true } } }`. OpenAI: `{ reasoningEffort: 'high', reasoningSummary: 'auto' }` becomes `reasoning: 'high'` plus `providerOptions: { openai: { reasoningSummary: 'auto' } }`.

## Notes

- Supported by providers including OpenAI, Anthropic, Google, xAI, Groq, DeepSeek, Moonshot AI, Fireworks, Amazon Bedrock, Mistral, Cohere, Alibaba, Open Responses, OpenAI Compatible, and Perplexity. Each provider translates the value to its native reasoning API.
- Providers with a distinct native maximum tier (supported OpenAI, Anthropic, DeepSeek, Moonshot AI models) receive `'max'` directly. Amazon Bedrock preserves `'max'` for its Anthropic and OpenAI effort mappings, while Amazon Nova 2 maps `'xhigh'` and `'max'` to `'high'` with a compatibility warning. Providers whose highest native tier is lower coerce `'max'` to their closest supported tier and emit a compatibility warning when their adapter supports warning propagation. OpenAI-compatible and Open Responses endpoints receive `'max'` directly.
- Some providers use a numeric token budget instead of an enum. In those cases `'max'` maps to 95% of the model's maximum output tokens by default, subject to the provider's minimum and maximum reasoning budget limits.
- Maximum reasoning can substantially increase token usage, latency, cost, and the chance of reaching request or output limits.
- Providers and models that do not support reasoning configuration emit an `unsupported` warning and ignore the parameter.
- To enforce an exact token budget (e.g. exactly 12000 tokens), keep using `providerOptions` instead of the top-level `reasoning` parameter.
- The official Reasoning page's streaming example uses the pre-v5 `part.type === 'reasoning'` / `part.textDelta`; this page follows the v7 stream part shape (`reasoning-delta` / `text-delta` with `part.text`) shown in Generating Text and the v7 migration guide.

## Related

- [Settings](./settings.md)
- [generateText](./generate-text.md)
- [streamText](./stream-text.md)
