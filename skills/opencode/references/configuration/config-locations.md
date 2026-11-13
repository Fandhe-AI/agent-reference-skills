---
source: https://opencode.ai/docs/config/#locations
---

# Config: Format and Locations

Create `opencode.jsonc` in your project to configure OpenCode. JSON and JSONC are supported; files are merged by location and precedence.

## Signature / Usage

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-5-5",
}
```

You can also ask OpenCode to update this file for you.

### Format

OpenCode supports JSON and JSONC. Use JSONC when you want comments or trailing commas.

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  // Use this model by default.
  "model": "anthropic/claude-sonnet-5-5",
}
```

### Locations

Put managed, machine-wide settings in the system configuration directory:

| Platform | Directory                               |
| -------- | --------------------------------------- |
| macOS    | `/Library/Application Support/opencode` |
| Linux    | `/etc/opencode`                         |
| Windows  | `%ProgramData%\opencode`                |

The system directory works like the global directory. Besides
`opencode.json(c)`, it loads `agents/`, `commands/`, `skills/`, and `plugins/`
for every user on the machine:

```text
/etc/opencode/
├── opencode.json
├── agents/review.md
├── commands/release.md
└── skills/deploy/SKILL.md
```

On macOS, OpenCode also reads managed preferences that MDM tools deploy for the
`ai.opencode.managed` domain. A user-specific profile replaces the
machine-wide one:

```text
/Library/Managed Preferences/<user>/ai.opencode.managed.plist
/Library/Managed Preferences/ai.opencode.managed.plist
```

Managed settings have the highest precedence, so users and projects cannot
override the values they set, and managed preferences override the system
directory. Settings alone cannot stop users from adding providers, MCP servers,
agents, or plugins; use [policies](https://opencode.ai/docs/policies/#precedence) in managed
configuration to enforce restrictions.

Put user settings for every project in the global configuration:

```text
~/.config/opencode/opencode.json(c)
```

Put project settings in either of these files:

```text
/home/user/projects/my-app/opencode.json(c)
/home/user/projects/my-app/.opencode/opencode.json(c)
```

OpenCode searches from the current directory to the filesystem root. It first
merges direct `opencode.json(c)` files from the farthest directory to the
closest, then merges files inside `.opencode` directories in the same order.
This means every discovered `.opencode` config overrides every direct config.
Use one form throughout a directory tree unless you need that behavior.

For example, start OpenCode from `/home/user/projects/acme/packages/web`:

```text
/etc/opencode/opencode.json
~/.config/opencode/opencode.json

/home/user/projects/acme/
├── opencode.json
└── packages/
    └── web/
        ├── opencode.json
        └── src/
```

OpenCode applies these files from lowest to highest precedence:

1. `~/.config/opencode/opencode.json`
2. `/home/user/projects/acme/opencode.json`
3. `/home/user/projects/acme/packages/web/opencode.json`
4. `/etc/opencode/opencode.json`

The package config overrides matching settings from the repository config,
which overrides the global config. The system config overrides all of them.
Settings that do not conflict are preserved. [Policies](https://opencode.ai/docs/policies/#precedence)
from global and project files evaluate in the reverse order, and system
policies outrank all of them.

## Notes

- Managed settings cannot by themselves stop users from adding providers, MCP servers, agents, or plugins; use policies.
- OpenCode config (`opencode.jsonc`) is distinct from Claude Code settings (anthropic-claude-code) and Codex `config.toml` (openai-codex).

## Related

- [config-schema.md](./config-schema.md)
- [config-variables.md](./config-variables.md)
