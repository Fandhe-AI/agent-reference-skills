---
source: https://opencode.ai/docs/providers/#packages
---

# Provider Packages and Model Entries

The `package` field selects the runtime that communicates with a provider; a provider's `models` map adds or overrides models.

## Signature / Usage

### Packages

Use the compatible runtime for APIs that implement the OpenAI request format.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "acme": {
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": {
        "baseURL": "https://llm.acme.example/v1",
      },
      "models": {
        "qwen3-coder": {},
      },
    },
  },
}
```

Native package options include:

- `@opencode/ai/providers/openai`
- `@opencode/ai/providers/openai/chat`
- `@opencode/ai/providers/openai/responses`
- `@opencode/ai/providers/openai-compatible`
- `@opencode/ai/providers/openai-compatible/responses`
- `@opencode/ai/providers/anthropic`
- `@opencode/ai/providers/anthropic-compatible`
- `@opencode/ai/providers/google`
- `@opencode/ai/providers/google-vertex`
- `@opencode/ai/providers/google-vertex/gemini`
- `@opencode/ai/providers/google-vertex/chat`
- `@opencode/ai/providers/google-vertex/responses`
- `@opencode/ai/providers/google-vertex/messages`
- `@opencode/ai/providers/azure`
- `@opencode/ai/providers/azure/chat`
- `@opencode/ai/providers/azure/responses`
- `@opencode/ai/providers/amazon-bedrock`
- `@opencode/ai/providers/amazon-bedrock/mantle`
- `@opencode/ai/providers/amazon-bedrock/mantle/chat`
- `@opencode/ai/providers/amazon-bedrock/mantle/messages`
- `@opencode/ai/providers/amazon-bedrock/mantle/responses`
- `@opencode/ai/providers/openrouter`
- `@opencode/ai/providers/xai`

You can also use an npm package such as `@acme/opencode-provider` or an absolute `file://` URL for a local package.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "acme": {
      "package": "@acme/opencode-provider",
      "models": { "acme-coder": {} },
    },
  },
}
```

### Models

Add or override models in a provider's `models` map. The map key is the model ID used by OpenCode; `modelID` changes the ID sent to the provider.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "openai/coding",
  "providers": {
    "openai": {
      "models": {
        "coding": {
          "modelID": "gpt-6.1-sol",
          "name": "GPT-6.1 Sol Coding",
        },
      },
    },
  },
}
```

## Options / Props

Model entry fields:

| Field | Purpose |
| --- | --- |
| `modelID` | Model or deployment ID sent to the provider. |
| `name` | Display name. |
| `family` | Model family used for grouping related models. |
| `type` | What the model produces, such as `chat`, `image` or `decision`. Defaults to `chat`; only chat models are offered for sessions. |
| `releaseDate` | Release date as `YYYY-MM-DD` or `YYYY-MM`. |
| `package` | Runtime override for this model. |
| `settings` | Model-level OpenCode controls and package-specific JSON settings. |
| `headers` | Additional string-valued request headers. |
| `body` | Additional JSON request body fields. |
| `capabilities` | Tool support, accepted input and output media types, temperature support, and reasoning controls. |
| `compatibility` | API quirks for this model, overriding the provider's. See [Model compatibility](./model-compatibility.md). |
| `variants` | Named variants with their own `settings`, `headers`, and `body`. |
| `cost` | Input, output, and optional cache pricing per million tokens. |
| `limit` | Context, input, and output token limits. |
| `disabled` | Removes the model from selection when `true`. |

## Notes

- See [Models](./models.md) for selection, defaults, capabilities, limits, costs, and variants.

## Related

- [Providers](./providers.md)
- [Model options and aliases](./model-options-aliases.md)
- [Model variants](./model-variants.md)
- [Model compatibility](./model-compatibility.md)
