<!-- source: https://code.claude.com/docs/en/plugins.md / last verified: 2026-08-07 -->

# Create plugins

Create custom plugins to extend Claude Code with skills, agents, hooks, and MCP servers, shareable across projects and teams.

## Signature / Usage

```bash
mkdir my-first-plugin
mkdir my-first-plugin/.claude-plugin
# my-first-plugin/.claude-plugin/plugin.json
# {
#   "name": "my-first-plugin",
#   "description": "A greeting plugin to learn the basics",
#   "version": "1.0.0",
#   "author": { "name": "Your Name" }
# }

mkdir -p my-first-plugin/skills/hello
# my-first-plugin/skills/hello/SKILL.md
# ---
# description: Greet the user with a friendly message
# ---
# Greet the user warmly and ask how you can help them today.

claude --plugin-dir ./my-first-plugin
# /my-first-plugin:hello
```

## Options / Props

| Directory / File | Location | Purpose |
| --- | --- | --- |
| `.claude-plugin/plugin.json` | Plugin root | Manifest: name, description, version, author (optional) |
| `skills/` | Plugin root | Skills as `<name>/SKILL.md` directories |
| `commands/` | Plugin root | Skills as flat Markdown files (legacy; prefer `skills/`) |
| `agents/` | Plugin root | Custom agent definitions |
| `hooks/` | Plugin root | Event handlers in `hooks.json` |
| `.mcp.json` | Plugin root | MCP server configurations |
| `.lsp.json` | Plugin root | LSP server configurations |
| `monitors/` | Plugin root | Background monitor configurations in `monitors.json` |
| `bin/` | Plugin root | Executables added to the Bash tool's `PATH` |
| `settings.json` | Plugin root | Default settings (only `agent` and `subagentStatusLine` keys) |

## Notes

- Standalone (`.claude/`) configuration is best for personal/project-specific work; plugins are best for sharing, versioned releases, and reuse. Plugin skills are always namespaced (`/plugin-name:hello`).
- Only `plugin.json` goes inside `.claude-plugin/`; all other component directories (`commands/`, `agents/`, `skills/`, `hooks/`, etc.) must be at the plugin root, never inside `.claude-plugin/` and never under `~/.claude/`.
- `claude plugin init <name>` scaffolds a plugin under `~/.claude/skills/<name>/` that auto-loads as `<name>@skills-dir` with no marketplace or install step.
- A plugin with exactly one skill can place `SKILL.md` directly at the plugin root instead of using `skills/`.
- Test locally with `claude --plugin-dir ./my-plugin` (repeatable, also accepts `.zip`) or `claude --plugin-url <zip-url>` for a hosted archive. Run `/reload-plugins` after edits.
- To submit a plugin to the community marketplace, run `claude plugin validate ./your-plugin` first, then use the claude.ai or Console submission form. The official marketplace (`claude-plugins-official`) is curated separately by Anthropic; there is no application process for it.
- Migrating from `.claude/` to a plugin: copy `commands/`, `agents/`, `skills/` into the plugin root, move hook config from `settings.json` into `hooks/hooks.json`, then remove the originals from `.claude/` (project/user `agents/` definitions override same-named plugin agents until removed; namespaced skills coexist with the original).
- Loading a plugin from the SDK is a distinct integration surface; for details see the Agent SDK plugin-loading docs (`anthropic-agent-sdk`).

## Related

- [Plugins reference](./plugins-reference.md)
- [Discover and install plugins](./discover-plugins.md)
- [Create and distribute a plugin marketplace](./plugin-marketplaces.md)
