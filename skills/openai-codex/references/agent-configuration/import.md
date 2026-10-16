# Import from another agent

The import flow brings instructions, settings, skills, plugins, projects, and recent work from another agent into the ChatGPT desktop app or Codex CLI. The desktop app can import from Claude Code, Claude Cowork, or Cursor; Codex CLI can import from Claude Code or Cursor.

## Signature / Usage

```text
# Codex CLI
/import
```

1. Start a local Codex CLI session and type `/import`.
2. Choose **Claude Code** or **Cursor**.
3. Select the supported setup, project files, and recent chats to import.
4. Review the imported configuration and continue working in Codex.

Desktop app: open **Settings > Import** (or **General** > **Import other agent setup** if the Import section isn't available yet), select **Import**, choose agents, then choose items on **Select items to import**.

## Options / Props

| Imported item | Destination |
|---------------|-------------|
| Instruction files | `AGENTS.md` |
| `settings.json` | `config.toml` |
| Skills | Skills |
| Plugins | Plugins |
| Existing project folders | Projects using the same folders |
| Project memories from Claude Code | Memories |
| Chats from the last 30 days | ChatGPT chats |
| MCP server configuration | Codex MCP configuration |
| Hooks | Codex hooks |
| Slash commands | Skills |
| Subagents | Codex subagents |

## Notes

- Importing doesn't change or delete your existing agent setup. The flow checks user-level setup (files on your machine) and project-level setup (files in selected repositories and folders).
- Desktop app: after import a status card appears in the lower-left corner; select **Finish** on flagged plugins or connections to complete setup. Turn on automatic updates in **Settings > Import** to keep imported work in sync; import history is available in the same section.
- Codex CLI imports up to 50 chats from the last 30 days. `/import` isn't available during a running task, in a remote session, or while connected to a local app-server daemon.
- Review after importing: tool restrictions or permissions in imported skills and agents; MCP servers with custom authentication, headers, environment variables, or transports (you may need to sign in again); hooks whose behavior may differ; plugins or marketplaces needing manual follow-up; prompt templates that depend on arguments, shell interpolation, or file-path placeholders.
- Source: https://learn.chatgpt.com/docs/import (retrieved 2026-10).

## Related

- [AGENTS.md](./agents-md.md)
- [Hooks](./hooks.md)
- [Subagents](./subagents.md)
- [Memories](./memories.md)
