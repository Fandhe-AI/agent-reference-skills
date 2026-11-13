---
source: https://opencode.ai/docs/agents/#options
---

# Agent Options

Per-agent fields accepted in Markdown frontmatter or an `agents` configuration entry.

## Signature / Usage

### Description

`description` explains the agent's purpose. Add it to subagents because OpenCode shows it to the model choosing which agent to launch:

```yaml
description: Reviews database migrations for safety
```

### Mode

`mode` accepts `primary`, `subagent`, or `all`. When omitted on a new custom agent, it defaults to `primary`:

```yaml
mode: all
```

### Model

`model` uses `provider/model` with an optional `#variant`:

```yaml
model: anthropic/claude-sonnet-5-5#high
```

JSON configuration also accepts the expanded form:

```jsonc
{
  "agents": {
    "reviewer": {
      "model": {
        "providerID": "anthropic",
        "model": "claude-sonnet-5-5",
        "variant": "high",
      },
    },
  },
}
```

- A subagent uses its configured model, or inherits the parent session's model when none is configured.
- A session stores its selected model separately. Selecting a primary agent by ID does not change that model.

### System

`system` sets the agent's system prompt. A non-empty value replaces the provider's base prompt for that agent:

```jsonc
{
  "agents": {
    "reviewer": { "system": "Review only. Do not modify files." },
  },
}
```

Project instructions, skills, references, and other instruction sources are still added. In a Markdown agent, put this text in the document body instead of a `system` frontmatter field.

### Permissions

`permissions` is an ordered list of matching rules:

```jsonc
{
  "agents": {
    "reviewer": {
      "permissions": [
        { "action": "*", "resource": "*", "effect": "deny" },
        { "action": "read", "resource": "src/**", "effect": "allow" },
      ],
    },
  },
}
```

The last matching rule wins, so put broad rules before exceptions.

For `read`, `edit`, and `external_directory` resources, OpenCode expands `~` and `$HOME`:

```jsonc
{ "action": "read", "resource": "~/notes/**", "effect": "allow" }
```

Shell resources remain raw command text and do not expand those values.

### Steps

`steps` sets a positive maximum number of model steps:

```yaml
steps: 8
```

On the final step, OpenCode removes tools and asks the model to summarize in text. New user input resets the allowance.

### Hidden

`hidden` removes an agent from normal listings, interactive discovery, and the subagent catalog:

```yaml
hidden: true
```

This controls visibility, not security. Use permissions to restrict behavior.

### Color

`color` sets the agent's UI color using a six-digit hex value:

```yaml
color: "#ff6b6b"
```

### Disabled

`disabled` removes a built-in or custom agent at that point in configuration loading:

```jsonc
{
  "agents": {
    "plan": { "disabled": true },
  },
}
```

### Request

`request` accepts per-agent header and JSON body overlays:

```jsonc
{
  "agents": {
    "reviewer": {
      "request": {
        "headers": { "x-agent": "reviewer" },
        "body": { "temperature": 0.1 },
      },
    },
  },
}
```

## Options / Props

| Field | Meaning |
| --- | --- |
| `action` | Tool or permission action. Wildcards are supported. |
| `resource` | Path, command, agent ID, or other value matched by the action. Wildcards are supported. |
| `effect` | `allow`, `ask`, or `deny`. |

Common permission actions:

| Action | Covers |
| --- | --- |
| `shell` | Shell commands |
| `edit` | Edit, write, and patch tools |
| `subagent` | Child agents |
| `read`, `glob`, `grep` | Local discovery tools |
| `webfetch`, `websearch` | Web tools |
| `skill` | Skill loading |

## Notes

- The V2 session runner preserves `request` values but does not yet send them with model requests. Configure active request settings on the provider, model, or model variant instead.
- Do not use legacy top-level fields such as `temperature`, `top_p`, `prompt`, `permission`, `tools`, `disable`, or `maxSteps` in new V2 agent configuration.
- OpenCode agents and permissions are distinct from Claude Code subagents and permissions (anthropic-claude-code, anthropic-claude-code-extend, anthropic-claude-code-admin).

## Related

- [Agents](./agents.md)
- [Models](./models.md)
- [Skills](./skills.md)
