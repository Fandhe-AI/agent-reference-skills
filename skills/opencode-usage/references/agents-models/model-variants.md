---
source: https://opencode.ai/docs/models/#variants
---

# Model Variants

Variants are named options for one model, often used for reasoning effort or token budgets.

## Signature / Usage

Add `#variant` when selecting one for a run, session, agent, or command:

```bash
opencode run --model openai/gpt-6.1-sol#high "Review this migration plan"
```

Variant names come from the selected model's current catalog metadata. Names such as `low`, `high`, and `max` are not available for every model, and an unknown variant produces a model-resolution error.

Define new variants, or replace catalog variants with the same ID, in the model's `variants` array:

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "openai": {
      "models": {
        "gpt-6.1-sol": {
          "settings": {
            "reasoningEffort": "medium",
          },
          "variants": [
            {
              "id": "fast",
              "settings": {
                "reasoningEffort": "low",
              },
            },
            {
              "id": "deep",
              "settings": {
                "reasoningEffort": "high",
                "reasoningSummary": "auto",
              },
            },
          ],
        },
      },
    },
  },
}
```

Each variant can contain `settings`, `headers`, and `body`. Its values are applied after provider and model values.

To replace a model's reasoning variants, describe its reasoning controls in `capabilities.reasoning`, using the [models.dev](https://models.dev) v2 shape. OpenCode builds the variants for the model's package from them:

```jsonc
// opencode.jsonc
{
  "providers": {
    "openai": {
      "models": {
        "gpt-6.1-sol": {
          "capabilities": {
            "reasoning": {
              "supported": true,
              "effort": ["low", "medium", "high"],
            },
          },
        },
      },
    },
  },
}
```

## Options / Props

`capabilities.reasoning` fields:

| Field | Purpose |
| --- | --- |
| `supported` | Whether the model reasons. `false`, or `true` without controls, adds no variants. |
| `toggle` | Adds a `none` variant that turns reasoning off. |
| `effort` | Effort levels to offer. `default` keeps the provider default and adds no variant. |
| `budget` | Optional `min` and `max` thinking tokens. Ignored when `effort` is set. |

## Notes

- Variants listed in `variants` are applied on top of the ones built from `capabilities.reasoning`.
- The root `model` setting does not retain a variant; select variants per session, run, agent, or command.

## Related

- [Models](./models.md)
- [Model options and aliases](./model-options-aliases.md)
- [Reasoning and prompt caching](./model-reasoning-caching.md)
