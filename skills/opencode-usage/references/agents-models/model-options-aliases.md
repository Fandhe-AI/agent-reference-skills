---
source: https://opencode.ai/docs/models/#options
---

# Model Options and Aliases

Provider and model entries can customize requests with `settings`, `headers`, and `body`. `modelID` gives an API model a friendlier catalog ID.

## Signature / Usage

### Options

```jsonc
// opencode.jsonc
{
  "providers": {
    "openai": {
      "settings": {
        "baseURL": "https://api.example.com/v1",
      },
      "headers": {
        "X-Team": "platform",
      },
      "models": {
        "gpt-6.1-sol": {
          "settings": {
            "reasoningEffort": "high",
          },
          "body": {
            "store": false,
          },
        },
      },
    },
  },
}
```

OpenCode applies provider values first, model values second, and the selected variant last.

- Nested `settings` and `body` objects are merged.
- Later arrays and scalar values replace earlier values.
- Header names are matched case-insensitively.
- Options are provider-specific and may be ignored or rejected by another provider package.

### Aliases

Use `modelID` to give an API model a friendlier catalog ID:

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "openai/coding-default",
  "providers": {
    "openai": {
      "models": {
        "coding-default": {
          "modelID": "gpt-6.1-sol",
          "name": "Coding default",
          "capabilities": {
            "tools": true,
            "freeform": ["text", "lark"],
            "input": ["text", "image"],
            "output": ["text"],
          },
          "limit": {
            "context": 200000,
            "output": 32000,
          },
        },
      },
    },
  },
}
```

Here, `openai/coding-default` is the selectable reference and `gpt-6.1-sol` is sent to the provider. For a model that is not already in the catalog, OpenCode assumes:

- JSON tool support, text and image input, and text output. No freeform tool input unless `capabilities.freeform` lists the format.
- A 200,000-token context limit and 32,000-token output limit.
- An unspecified input limit.

OpenCode recognizes `text`, `regex`, and `lark`. Other format names from models.dev are ignored without dropping the model or its tools. If a proxy in front of a catalog model rejects freeform tools, set `capabilities.freeform` to `[]` on that model.

These are fallback assumptions, not detected capabilities. Set accurate `capabilities` and `limit` values when known; explicit values replace the fallbacks. Add `disabled: true` to hide a model from the available catalog:

```jsonc
// opencode.jsonc
{
  "providers": {
    "openai": {
      "models": {
        "legacy-model": {
          "disabled": true,
        },
      },
    },
  },
}
```

## Options / Props

| Field | Purpose |
| --- | --- |
| `settings` | Provider-package options such as `baseURL` or `reasoningEffort`. |
| `headers` | Additional HTTP request headers. |
| `body` | Provider-specific request body fields. |

## Related

- [Models](./models.md)
- [Model variants](./model-variants.md)
- [Provider model entries](./provider-packages-models.md)
- [Provider requests](./provider-requests.md)
