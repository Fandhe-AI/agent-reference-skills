---
source: https://opencode.ai/docs/config/#mcp
---

# Config: MCP, Skills, Commands, Instructions, References, Plugins, Providers

Config keys that connect OpenCode to MCP servers, skills, commands, instruction files, references, plugins, and providers.

## Signature / Usage

### MCP

Configure local and remote Model Context Protocol servers. Global
`mcp.timeout` values apply to servers defined in configuration files; each
server's `timeout` overrides them.

```jsonc
{
  "mcp": {
    "servers": {
      "playwright": {
        "type": "local",
        "command": ["bunx", "@playwright/mcp"],
      },
    },
  },
}
```

See the [MCP guide](https://opencode.ai/docs/mcp-servers/) for remote servers, OAuth, environment variables, and timeouts.

### Skills

Add directories or URLs that OpenCode should search for agent skills.

```jsonc
{
  "skills": ["./team-skills", "https://example.com/.well-known/skills/"],
}
```

See the [skills guide](https://opencode.ai/docs/skills/) for skill structure and automatic discovery under `.opencode/skills/`.

### Commands

Define reusable slash commands as named prompt templates.

```jsonc
{
  "commands": {
    "review": {
      "description": "Review the current changes",
      "template": "Review the current diff for correctness and missing tests.",
    },
  },
}
```

See the [commands guide](https://opencode.ai/docs/commands/) for arguments, models, agents, and file-based commands.

### Instructions

Declare additional instruction files, globs, or HTTP(S) URLs. OpenCode loads
them alongside discovered `AGENTS.md` files.

```jsonc
{
  "instructions": ["CONTRIBUTING.md", "docs/guidelines/*.md"],
}
```

See the [instructions guide](https://opencode.ai/docs/instructions/) for project instructions and `AGENTS.md`.

### References

Make local directories or Git repositories available as named supporting
context.

```jsonc
{
  "references": {
    "docs": {
      "path": "../product-docs",
      "description": "Product behavior and terminology",
    },
    "effect": {
      "repository": "Effect-TS/effect",
      "branch": "main",
    },
  },
}
```

See the [references guide](https://opencode.ai/docs/references/) for shorthand, visibility, and path resolution.

### Plugins

Load plugins from packages or local plugin directories. Use the object form when a plugin
accepts options.

```jsonc
{
  "plugins": [
    "opencode-example-plugin",
    {
      "package": "./plugins/local",
      "options": {
        "enabled": true,
      },
    },
  ],
}
```

See the [plugins guide](https://opencode.ai/docs/plugins/) for plugin loading and configuration.

### Providers

Configure providers and add or override their models, request settings,
headers, and model variants.

```jsonc
{
  "providers": {
    "openai": {
      "models": {
        "gpt-6.1-sol-custom": {
          "modelID": "gpt-6.1-sol",
          "name": "GPT-6.1 Sol Custom",
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

Provider `settings.transport: "websocket"` selects its session WebSocket.

See the [providers guide](https://opencode.ai/docs/providers/) for credentials, custom endpoints, provider packages, the WebSocket transport, and model configuration.

## Notes

- MCP: the protocol specification is covered by `mcp-spec`; Claude Code / Codex MCP configuration is covered by other skills.
- OpenCode skills are distinct from Claude Code Agent Skills (anthropic-claude-code-extend) and Codex skills (openai-codex).
- OpenCode commands and plugins are distinct from Claude Code (anthropic-claude-code-extend) equivalents.
- Instructions (`AGENTS.md`) are distinct from the Codex AGENTS.md (openai-codex).

## Related

- [instructions.md](./instructions.md)
- [references.md](./references.md)
- [config-access-control.md](./config-access-control.md)
