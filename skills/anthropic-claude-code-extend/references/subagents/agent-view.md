<!-- source: https://code.claude.com/docs/en/agent-view / last verified: 2026-10-17 -->

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
| `Ctrl+T` | Pin / unpin session |
| `Ctrl+R` | Rename session |
| `Ctrl+X` | Stop session (press again within two seconds to delete) |
| `Ctrl+S` | Toggle grouping by state/directory |
| `PgUp` / `PgDn` | Move up or down by a screenful of rows |
| `Home` / `End` | Jump to the first or last row |
| `Shift+Enter` | Insert a newline in the dispatch input (v2.1.248+) |
| `Ctrl+Enter` | Dispatch and attach immediately, in terminals where the `?` overlay lists `ctrl+enter to start and open` |
| `Ctrl+F` | Find sessions by name, with the `n:` filter (v2.1.288) |
| `Alt+↑` / `Alt+↓` | Jump to the previous or next group header |
| `Ctrl+G` | Open the dispatch prompt in `$VISUAL` / `$EDITOR` |
| `Ctrl+J` | Insert a newline in the dispatch input |
| `Alt+1`..`Alt+9` | Attach to session 1–9 in the focused session's directory |
| `Tab` | On an empty input, browse all subagents; otherwise apply the highlighted suggestion |
| `Shift+↑` / `Shift+↓` | Reorder the selected session |
| `?` | Show shortcuts |

Shortcuts with an action in the `Agents` keybindings context follow `keybindings.json`; `Ctrl+G` follows the `Chat` context's `chat:externalEditor` binding. Filters typed in the dispatch input: `a:<name>` (agent), `s:<state>` (e.g. `s:blocked`), `n:<text>` (name or first prompt; v2.1.287+), `o:<text>` (result), a PR/MR number or URL.

State icon shapes: `✻` / animated `✽` = process running or needs your input; `∙` = process exited (replying or attaching restarts it from the saved conversation); `✢` = a `/loop` session sleeping between iterations.

| Shell command | Purpose |
|---|---|
| `claude agents --cwd <path>` | Open agent view scoped to sessions started under `<path>` |
| `claude agents --json [--all] [--cwd <path>]` | Print sessions as a JSON array; `--all` also includes completed background sessions |
| `claude attach <id\|name>` / `claude logs <id\|name>` | Attach / print recent output; a partial session name works in place of the ID (v2.1.290+; attach by name only while the process runs) |
| `claude stop <id>` (alias `claude kill`) | Stop a session |
| `claude respawn <id>` / `claude respawn --all` | Restart a session (or every running session), e.g. to pick up an updated binary; resumes a saved conversation |
| `claude rm <id>` | Remove a session and a worktree Claude created for it when safe to delete |
| `claude rm <id> --discard-unpushed <commit>@<worktree-id>` | Delete a session refused over unpushed commits, discarding worktree, branch and commits; pass the exact value the refusal printed (v2.1.260+) |
| `claude rm <id> --force-remove-worktree <worktree-id>` | Delete a session whose worktree git or the `WorktreeRemove` hook couldn't remove; the branch stays (v2.1.268+) |
| `claude daemon status` / `claude daemon logs` | Print supervisor state / follow `~/.claude/daemon.log` |
| `claude daemon stop --any [--keep-workers]` | Stop the supervisor and its sessions; `--keep-workers` leaves background sessions running for the next supervisor |

JSON entry fields: `cwd`, `kind` (`interactive` / `background`), `startedAt` always; `id`, `state` for background sessions; `pid`, `status` (`busy` / `waiting` / `idle`) while the process is alive; `waitingFor` when `status` is `waiting` (`permission prompt`, `input needed`, `sandbox request`, `worker request`, `dialog open`); `sessionId`, `name` when set. `state` is one of `working`, `blocked` (needs something from you), `done` (turn finished, ready for your next prompt), `failed`, `stopped`. The files under `~/.claude/jobs/<id>/` are not a stable interface.

| CLI flag | Purpose |
|---|---|
| `--permission-mode`, `--model`, `--effort` | Configure dispatched sessions |
| `--settings`, `--mcp-config`, `--add-dir` | Settings/MCP/extra directories for agent view |

## Notes

- Background sessions automatically move into isolated git worktrees under `.claude/worktrees/` before editing files. Disable with `{"worktree": {"bgIsolation": "none"}}` in `.claude/settings.json`.
- Dispatch prefixes: `@agent-name` (run specific subagent), `@repo-name` (target directory), `/<command>`, `! <command>` (shell as background job), `Ctrl+Enter` (dispatch and attach immediately; `Shift+Enter` inserts a newline).
- Each background session has `CLAUDE_JOB_DIR` set to its `~/.claude/jobs/<id>` directory; write temporary files to `$CLAUDE_JOB_DIR/tmp`. Run `/status` to check the `Session kind` row (`background job · attached`, `background job · unattended`, or `interactive`).
- Sessions run locally, persist across sleep, but stop on shutdown; managed by a supervisor process (`claude daemon status` / `claude daemon stop --any`).
- Commit changes before deleting sessions that edited files — worktrees are deleted with the session.
- Multiple agents consume rate-limit quota proportionally.

## Related

- [agents.md](./agents.md)
- [sub-agents.md](./sub-agents.md)
