<!-- source: https://code.claude.com/docs/en/sessions / last verified: 2026-10-16 -->
# Manage sessions

A session is a saved conversation tied to a project directory, stored locally as JSONL so you can resume, branch, or switch between tasks. This page covers the CLI; the desktop app, Claude Code on the web, and the VS Code extension each keep their own session history.

## Signature / Usage

```bash
claude --continue                 # resume the most recent session in this directory
claude --resume                   # open the interactive session picker
claude --resume <name>            # resume a named session directly
claude --resume <session-id>      # resume by ID, searches this project then every project
claude --from-pr <number>         # session picker filtered to sessions linked to a PR

/resume [<name>]                  # switch conversation from inside a session
/branch [<name>]                  # copy the conversation and switch into the copy
claude --continue --fork-session  # branch from the CLI
/rename <name>                    # rename the current session
/export [<file>]                  # copy or save the rendered transcript
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--continue` | flag | Resumes the most recent session in the current directory, including a background session that has finished (opening finished background sessions requires v2.1.257+) |
| `--resume [name\|id]` | flag/arg | Opens the session picker, or resumes a specific session directly (a still-running background session is opened through `claude attach`; before v2.1.285 Claude Code refused) |
| `--from-pr <number>` | flag | Opens the session picker filtered to sessions linked to that pull request |
| `--fork-session` | flag | Combine with `--continue`/`--resume` to branch into a new session ID |
| `-n <name>` | flag | Set a session name at startup |
| `--no-session-persistence` | flag | Suppresses transcript writes for one non-interactive `claude -p` run |

## Notes

- What a resumed session restores: conversation history, model (unless retired/disallowed/pinned by flag), agent (with tool restrictions), permission mode (restored from a terminal `--continue`, `--resume <session-id>`, or `--resume <name>` that matches one session, without `-p`; `bypassPermissions` is never restored; a session that ended in plan mode resumes in plan mode, including non-interactive `-p` runs under the conditions below and the VS Code panel, which require v2.1.246 or later), active goal, and unexpired scheduled tasks. Flags like `--mcp-config`, `--settings`, `--plugin-dir`, `--fallback-model`, and `--add-dir` are **not** restored and must be passed again.
- Resuming a running background session: `claude --resume <session>` runs `claude attach` on it in the same terminal; a prompt passed on the command line goes to the session as its next turn first (Claude Code prints `Sent your prompt to the background session (<id>); opening it…`). It doesn't open the session (exits with status 1 and prints the `claude attach <id>` command) when the command line has piped or redirected input or output, flags that configure the session (`--permission-mode`, `--model`, `--settings`), flags that read the output (`--output-format json`, `--json-schema`), or flags that limit or rewind the run (`--max-turns`, `--max-budget-usd`), or when agent view is turned off; add `--fork-session` to resume a copy instead. A prompt starting with `/` or `!`, or any prompt while the session waits on your answer, isn't sent. `/resume` inside a session moves your current conversation to the background and attaches this terminal. Before v2.1.285 Claude Code refused and told you to run `claude attach <id>` or `claude stop <id>`.
- Resuming in plan mode with `-p`: `claude -p --resume` / `--continue` resumes in plan mode only when you pass `--permission-prompt-tool` (and not `--permission-prompts none`), don't pass `--permission-mode`, `--dangerously-skip-permissions`, or `--fork-session`, the run isn't started through channels, and no deny rule removes the `ExitPlanMode` tool.
- Name the project directory yourself: set `CLAUDE_CODE_PROJECT_DIR_NAME` alongside `CLAUDE_CONFIG_DIR` (for example `CLAUDE_CONFIG_DIR=/srv/tenant-a CLAUDE_CODE_PROJECT_DIR_NAME=work claude`) to choose the `<project>` directory name that session's transcripts and auto memory are stored under; ignored when `CLAUDE_CONFIG_DIR` is unset. Requires v2.1.234 or later.
- Resuming a session inactive for over an hour and above 100,000 tokens (Pro/Max) offers a dialog: **Resume from summary** (runs `/compact`), **Resume full session as-is**, or **Don't ask me again**.
- The session picker defaults to the current worktree plus directories added with `/add-dir`; widen with `Ctrl+W` (all worktrees) or `Ctrl+A` (all projects).
- `/clear` saves the previous conversation; resume it with `/resume` or the rewind menu's previous-session entry.
- Transcripts are stored as JSONL at `~/.claude/projects/<project>/<session-id>.jsonl`. The entry format is internal and can change between releases — use `/export` or the script interfaces (`claude -p --output-format json`, `claude -p --resume`, hook `transcript_path`, or the Agent SDK) instead of parsing JSONL directly.
- Agent SDK session persistence (mirroring transcripts to S3/Redis/custom backends, resuming across hosts) is a separate topic — see the `anthropic-agent-sdk` skill.

## Related

- [Worktrees](./worktrees.md): run isolated parallel sessions on separate branches
- [Checkpointing](./checkpointing.md): rewind code and conversation to an earlier point
- [Remote Control](./remote-control.md): continue a local session from another device
