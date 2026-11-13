---
source: https://opencode.ai/docs/providers/
---

# Custom OpenAI-Compatible Provider

Add a provider whose API is not in the catalog, defining credential, package, endpoint, and first model together.

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "acme": {
      "name": "Acme",
      "env": ["ACME_API_KEY"],
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": {
        "baseURL": "https://llm.acme.example/v1",
      },
      "models": {
        "qwen3-coder": {
          "name": "Qwen 3 Coder",
        },
      },
    },
  },
}
```

Override the endpoint of a catalog provider (for a proxy):

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "anthropic": {
      "settings": {
        "baseURL": "https://llm-proxy.example.com/anthropic",
      },
    },
  },
}
```

## Notes

- The `providers` key is the provider ID used in model references, such as `acme/qwen3-coder`.
- `settings` is package-specific; a field only has an effect when the selected package supports it.
- For a gateway with its own model inventory, the `models` key becomes the selectable model ID and `modelID` changes the ID sent upstream.
- Connect catalog providers with `/connect`, then pick a model with `/models`.
