---
source: https://opencode.ai/docs/config/#schema
---

# Config: Schema, Shell, Model, Agent, Updates, Username

The complete configuration schema is at opencode.ai/config.json. Basic top-level keys: `shell`, `model`, `default_agent`, `update`, `username`.

## Signature / Usage

### Schema

The complete OpenCode configuration schema is available at
[opencode.ai/config.json](https://opencode.ai/config.json).

Add the `$schema` field to your configuration file to enable validation and
autocomplete in editors that support JSON Schema:

```json
{
  "$schema": "https://opencode.ai/config.json"
}
```

Use the schema as the source of truth for available fields, accepted values,
and nested configuration shapes.

### Shell

Set the shell used by the terminal and shell tools.

```jsonc
{
  "shell": "/bin/zsh",
}
```

### Model

Set the default model in `provider/model` format. The root default currently
does not retain a `#variant`; agent and command model references can select one.

```jsonc
{
  "model": "anthropic/claude-sonnet-5-5",
}
```

See the [models guide](https://opencode.ai/docs/models/) for model selection and local models.

### Agent

Choose the primary agent used when a session does not select one explicitly.

```jsonc
{
  "default_agent": "build",
}
```

See the [agents guide](https://opencode.ai/docs/agents/) for built-in and custom
agents.

### Updates

Control update checks from the global config. Set `update` to `"disable"` to
skip them, `"notify"` to show available updates before installing them, or
`"auto"` to install updates automatically. When omitted, `update` defaults to `"notify"`.

Automatic installation does not restart a running server. Restart it manually to activate the installed update.
Project-level values are ignored.

```jsonc
{
  "update": "notify",
}
```

### Username

Set a username. OpenCode accepts this field but does not display it in
conversations.

```jsonc
{
  "username": "alice",
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shell` | — | Shell used by the terminal and shell tools |
| `model` | `provider/model` | Default model; `#variant` is not retained at the root |
| `default_agent` | — | Primary agent used when a session does not select one |
| `update` | `"disable"` / `"notify"` / `"auto"` | Update behavior; default `"notify"`; global config only |
| `username` | — | Accepted but not displayed in conversations |

## Related

- [config-locations.md](./config-locations.md)
- [config-access-control.md](./config-access-control.md)
