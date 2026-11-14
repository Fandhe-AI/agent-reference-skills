---
source: https://opencode.ai/docs/models/
---

# Models

Choose a model for the current session with `/models`. OpenCode lists models from [models.dev](https://models.dev), provider integrations, and your configuration.

## Signature / Usage

```text
/models
```

The selector only shows enabled models whose provider is available in the current project. Connect providers in [Providers](./providers.md).

### Select

Pick an entry from `/models` instead of guessing its provider or model ID. The selection applies to the current session and does not change your configuration.

```text
anthropic/claude-sonnet-5-5
```

Availability is project-specific:

- The model must be enabled.
- Its provider must be available in the current project.
- Credentials and configuration from another project do not carry over automatically.

### Runs

Use `--model` to choose a model for one command-line run without changing the configured default:

```bash
opencode run --model anthropic/claude-sonnet-5-5 "Refactor parseToken"
```

Agents and commands can also choose their own model. See [Agents](./agents.md) and [Commands](./commands.md).

### Defaults

Set `model` in `opencode.json` or `opencode.jsonc` to choose the default for new work:

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-5-5",
}
```

The configured model becomes the catalog default when it is enabled and its provider is available. Otherwise, OpenCode falls back to the newest available supported model.

- A model already selected for a session takes precedence over the configured default.
- Switching a session's model does not rewrite the config file.
- The root `model` currently retains only the default provider and model, not a variant.

See [Config](https://opencode.ai/docs/config/) for configuration locations and precedence.

### Free models

Set `OPENCODE_DISABLE_FREE_MODELS=1` (or `true`) on the server process to hide [free OpenCode models](https://opencode.ai/docs/console/models/#free-models):

```bash
OPENCODE_DISABLE_FREE_MODELS=1 opencode serve
```

For the shared background server:

```bash
opencode service set env OPENCODE_DISABLE_FREE_MODELS 1
```

Free means an `opencode` or `opencode-go` model with no input price. These models disappear from the catalog and defaults; explicitly selecting one fails with `Model unavailable`. Signed out, the `opencode` provider is absent until you connect an OpenCode Console account or set `OPENCODE_API_KEY`, which restores its paid models.

### References

Model selectors use `provider/model` with an optional `#variant`:

```text
openai/gpt-6.1-sol
openai/gpt-6.1-sol#high
openrouter/anthropic/claude-sonnet-5.5#high
```

Use catalog IDs rather than provider display names. Root, agent, and command `model` fields accept the string form above or an expanded object:

```jsonc
{
  "model": {
    "providerID": "openrouter",
    "model": "anthropic/claude-sonnet-5.5",
  },
}
```

The expanded form is useful for generated or programmatic configuration.

### Caveats

Keep these rules in mind when configuring models:

```jsonc
{
  "model": "openai/gpt-6.1-sol"
}
```

- A selector object uses `model`; a provider catalog entry uses `modelID` for the ID sent to the provider.
- Although the root selection shape accepts a variant, the V2 catalog default does not retain it. Select variants for a session, run, agent, or command instead.
- Model options are provider-specific. Another provider package may ignore or reject them.
- Catalog data, credentials, and configuration are location-scoped. A model available in one project may be unavailable in another.
- Configuration files normally reload automatically. A model request already in progress keeps the settings it started with.

## Options / Props

Selector parts:

| Part | Rule |
| --- | --- |
| Provider | Ends at the first `/`; cannot contain `/` or `#`. |
| Model | May contain additional `/` characters; cannot contain `#`. |
| Variant | Follows `#` when present. |
| Casing | Provider and model IDs are case-sensitive. |

## Related

- [Model variants](./model-variants.md)
- [Model options and aliases](./model-options-aliases.md)
- [Reasoning and prompt caching](./model-reasoning-caching.md)
- [Model compatibility](./model-compatibility.md)
- [Local models](./local-models.md)
- [Providers](./providers.md)
