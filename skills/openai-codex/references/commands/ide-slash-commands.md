# Codex IDE extension slash commands

Slash commands let you control Codex without leaving the composer: check status, switch between local and cloud mode, or send feedback.

## Signature / Usage

```text
1. In the Codex composer, type `/`.
2. Select a command from the list, or keep typing to filter (for example, `/status`).
3. Press Enter.
```

## Options / Props

| Slash command | Description |
|---------------|-------------|
| `/approve` | Approve one retry of a recent automatic-review denial, when automatic review is active. |
| `/cloud` | Run the chat in the cloud, when cloud execution is available. |
| `/cloud-environment` | Choose the cloud environment for the chat. |
| `/compact` | Compact the current chat's context. |
| `/fast` | Turn a catalog-provided Fast service tier on or off, when available. |
| `/feedback` | Open the feedback dialog to submit feedback and optionally include logs. |
| `/fork` | Copy a local chat into a new local chat. |
| `/goal` | Set a persistent goal for Codex to work toward. |
| `/ide-context` | Turn automatic IDE context on or off. |
| `/init` | Generate an `AGENTS.md` scaffold for the current project. |
| `/local` | Run the chat in your local workspace. |
| `/mcp` | Open MCP status to view connected servers. |
| `/memories` | Configure whether the chat can use or generate memories, when Memories is available. |
| `/model` | Choose the model for the current chat. |
| `/personality` | Choose how Codex responds, when the current model supports personalities. |
| `/plan` | Toggle plan mode for multi-step planning. |
| `/project` | Choose a project for new chats. |
| `/reasoning` | Choose the reasoning effort for the current chat. |
| `/review` | Start code review mode to review uncommitted changes or compare against a base branch. |
| `/side` | Start a temporary side chat without interrupting the main chat. |
| `/status` | Show the chat ID, context usage, and rate limits. |
| `/worktree` | Run the chat in a new Git worktree. |

## Notes

- This is the IDE extension set; it differs from the Codex CLI list (for example `/cloud`, `/cloud-environment`, `/local`, `/personality`, `/project`, `/reasoning`, `/ide-context` appear here, while `/permissions`, `/resume`, `/diff` etc. are CLI commands).
- Source: https://learn.chatgpt.com/docs/developer-commands?surface=ide (fetched 2026-10).

## Related

- [ide-commands.md](./ide-commands.md)
- [cli-slash-commands.md](./cli-slash-commands.md)
