<!-- source: https://code.claude.com/docs/en/agent-view / last verified: 2026-08-07 -->

# Agent view

Dispatch and manage many background Claude Code sessions from a single terminal screen. Research preview; requires Claude Code v2.1.139+.

## Signature / Usage

```bash
claude agents                                  # open agent view
claude --bg "your task description"            # dispatch from shell
claude --bg --name "session-name" "task"
claude --bg --model opus "task"
claude agents --json                            # list sessions as JSON
claude attach <id>
claude stop <id>
claude rm <id>
```

From inside a session: `/background` or `/bg` moves the current conversation to background; `/fork` (v2.1.212+) copies it to a new background session.

## Options / Props

| Session state | Meaning |
|---|---|
| Working | Actively running tools / generating |
| Needs input | Waiting for answer/permission/action |
| Idle | Ready for next prompt |
| Completed | Task finished successfully |
| Failed | Ended with error |
| Stopped | Stopped manually |

| Keyboard shortcut | Action |
|---|---|
| `↑`/`↓` | Navigate rows |
| `Space` | Open peek panel |
| `Enter` / `→` | Attach to full session |
| `←` | Return to shell/agent view |
| `Ctrl+T` | Pin session |
| `Ctrl+R` | Rename session |
| `Ctrl+X` | Stop session (twice to delete) |
| `Ctrl+S` | Toggle grouping by state/directory |

| CLI flag | Purpose |
|---|---|
| `--permission-mode`, `--model`, `--effort` | Configure dispatched sessions |
| `--settings`, `--mcp-config`, `--add-dir` | Settings/MCP/extra directories for agent view |

## Notes

- Background sessions automatically move into isolated git worktrees under `.claude/worktrees/` before editing files. Disable with `{"worktree": {"bgIsolation": "none"}}` in `.claude/settings.json`.
- Dispatch prefixes: `@agent-name` (run specific subagent), `@repo-name` (target directory), `/<command>`, `! <command>` (shell as background job), `Shift+Enter` (dispatch and attach immediately).
- Sessions run locally, persist across sleep, but stop on shutdown; managed by a supervisor process (`claude daemon status` / `claude daemon stop --any`).
- Commit changes before deleting sessions that edited files — worktrees are deleted with the session.
- Multiple agents consume rate-limit quota proportionally.

## Related

- [agents.md](./agents.md)
- [sub-agents.md](./sub-agents.md)
