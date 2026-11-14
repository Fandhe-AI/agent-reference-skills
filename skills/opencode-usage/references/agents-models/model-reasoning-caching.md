---
source: https://opencode.ai/docs/models/#reasoning
---

# Reasoning Field and Prompt Caching

Settings for OpenAI-compatible reasoning fields, Anthropic-style prompt-cache breakpoints, and cache lifetime.

## Signature / Usage

### Reasoning

For an OpenAI-compatible model that streams reasoning in a custom assistant-message field, set `compatibility.reasoningField`:

```jsonc
// opencode.jsonc
{
  "providers": {
    "local": {
      "models": {
        "reasoner": {
          "compatibility": {
            "reasoningField": "reasoning_content",
          },
        },
      },
    },
  },
}
```

OpenCode recognizes `reasoning`, `reasoning_content`, and `reasoning_text`, and also accepts another provider-specific string. It reads streamed reasoning from that field and restores the field when sending prior assistant messages back to the model. See [Model compatibility](./model-compatibility.md) for the related `requireReasoning` field.

### Prompt caching

OpenCode places prompt-cache breakpoints automatically on routes that are known to need them, such as Anthropic. When Claude models are served through an OpenAI-compatible proxy such as LiteLLM, OpenCode cannot tell that they need Anthropic-style `cache_control` breakpoints. Set `compatibility.cacheFormat` on those Claude models:

```jsonc
// opencode.jsonc
{
  "providers": {
    "litellm": {
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": { "baseURL": "https://litellm.example.com/v1" },
      "models": {
        "claude-sonnet-5-5": {
          "compatibility": { "cacheFormat": "anthropic" },
        },
        "claude-opus-5-5": {
          "compatibility": { "cacheFormat": "anthropic" },
        },
        // Other models on the same proxy cache automatically and need no setting.
        "gpt-6.1-sol": {},
      },
    },
  },
}
```

OpenCode then marks the last tool definition, the system prompt, and the latest message with `cache_control: { "type": "ephemeral" }`, which uses the endpoint's default five-minute cache lifetime. Use `"alibaba"` for Alibaba Model Studio models, which accept the same markers but ignore them on tool definitions. Set `compatibility.cacheFormat` on the provider instead when every model it serves accepts the same format.

### Cache lifetime

OpenCode doesn't send a cache lifetime by default, so each provider uses its own default, such as five minutes on Anthropic. Set `settings.cache.ttl` on a provider or model to request a different one. A model setting overrides the provider setting.

```jsonc
// opencode.jsonc
{
  "providers": {
    "anthropic": {
      "settings": { "cache": { "ttl": "1h" } },
      "models": {
        "claude-haiku-5-5": { "settings": { "cache": { "ttl": "5m" } } },
      },
    },
  },
}
```

`ttl` takes a number and a unit: `ms`, `s`, `m`, `h` or `d`, such as `"5m"`, `"1h"` or `"24h"`. OpenCode sends it as given, so use a value the provider accepts:

| API | Where the lifetime goes |
| --- | --- |
| Anthropic Messages | `cache_control.ttl` on each cache marker. Anthropic accepts `"5m"` and `"1h"`. |
| Bedrock Converse | `ttl` on each `cachePoint`. Older Claude models that only cache for five minutes ignore `"1h"`. |
| OpenAI Chat and Responses | `"24h"` goes to `prompt_cache_retention`; other values go to `prompt_cache_options.ttl`. |

Providers that cache automatically without markers, such as Gemini, ignore it. A longer lifetime usually costs more to write: Anthropic charges 2× the input price for a one-hour cache write and 1.25× for a five-minute one.

[Warming](https://opencode.ai/docs/warming/) can use the lifetime to time its requests with `interval: "auto"`.

## Related

- [Model compatibility](./model-compatibility.md)
- [Models](./models.md)
- [Model options and aliases](./model-options-aliases.md)
