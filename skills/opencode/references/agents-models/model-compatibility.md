---
source: https://opencode.ai/docs/models/#compatibility
---

# Model Compatibility

`compatibility` describes request and response quirks of the API a model is served through, such as which field carries reasoning or whether the endpoint accepts `prompt_cache_key`.

## Signature / Usage

Each model is served through one API, and a field only takes effect when that API reads it. Other fields are ignored.

```jsonc
// opencode.jsonc
{
  "providers": {
    "local": {
      "compatibility": { "streamUsage": false },
      "models": {
        "reasoner": {
          "compatibility": { "reasoningField": "reasoning_content", "maxTokensField": "max_tokens" },
        },
      },
    },
  },
}
```

Provider `compatibility` applies to every model of that provider. A model's own `compatibility` overrides it field by field: OpenCode starts from the values [models.dev](https://models.dev) publishes for the model's API (`reasoningField`, `maxTokensField`, and `mediaInput`), then applies the model's configuration. Unset fields keep the provider package's built-in default or detection. `supportsThinkingBlockBinding` and `supportsEffortUpdates` are model-only.

## Options / Props

| Field | What it does | Read by | Values and default |
| --- | --- | --- | --- |
| `reasoningField` | Assistant-message field that carries reasoning. Checked first when reading streamed reasoning and used when sending prior reasoning back. | OpenAI Chat | Any field name except `role`, `content`, `refusal`, or `tool_calls`. Unset uses the field seen in the stream, else `reasoning_content`. |
| `requireReasoning` | Sends the reasoning field on every prior assistant message, as an empty string when there was no reasoning. | OpenAI Chat | `true` or `false`. Defaults to `true` when `reasoningField` is set or the model is DeepSeek, otherwise `false`. |
| `maxTokensField` | Body field that carries the output token limit. | OpenAI Chat | `max_completion_tokens` or `max_tokens`. Unset detects `max_tokens` for providers that need it, such as DeepSeek, Moonshot, Together AI, Z.AI, and Cerebras, otherwise `max_completion_tokens`. |
| `requireFinishReason` | Treats a stream that ends without `finish_reason` as an incomplete response error. `false` accepts it as finished. | OpenAI Chat | `true` or `false`. Defaults to `true`. |
| `requireAssistantAfterTool` | Inserts an assistant message between a tool result and the next user message, for endpoints that reject that order. | OpenAI Chat | `true` or `false`. Defaults to `true` for Mistral-family model IDs, otherwise `false`. |
| `supportsPromptCacheKey` | Whether the endpoint accepts the `prompt_cache_key` body field. | OpenAI Chat, OpenAI Responses, Mistral | `true` or `false`. OpenAI Chat only sends the key when `true`, which some provider packages set by default. Other APIs send it unless `false`. |
| `streamUsage` | Requests token usage in the stream with `stream_options.include_usage`. | OpenAI Chat | `true` or `false`. Defaults to `true`. |
| `cacheFormat` | Prompt-cache marker syntax the endpoint accepts. Overrides the provider's automatic breakpoint placement. `alibaba` skips tool definitions. | Every API with prompt-cache markers, including OpenAI Chat, Anthropic Messages, and Bedrock Converse | `anthropic` or `alibaba`. Unset uses the provider default. See [Reasoning field and prompt caching](./model-reasoning-caching.md). |
| `supportsThinkingBlockBinding` | Asks the API to drop thinking blocks whose earlier context changed instead of rejecting the request. | Anthropic Messages, Bedrock Converse | `true` or `false`. Unset detects Claude 5.1 and later. |
| `supportsEffortUpdates` | Sends reasoning effort changes as per-message updates, which keep the prompt cache. Otherwise the effort changes for the whole request. | Anthropic Messages, OpenAI Responses | `true` or `false`. Unset detects Claude Opus 5, Claude 5.1 and later, and GPT-6 and later. |
| `mediaInput` | Where images and other media go in a decision request. | System One | `assets` (images referenced from the state), `state` (inline in the state), or `root` (top-level `images`, `audio`, and `videos` lists). Unset uses the provider default. |

## Related

- [Reasoning field and prompt caching](./model-reasoning-caching.md)
- [Provider model entries](./provider-packages-models.md)
- [Models](./models.md)
