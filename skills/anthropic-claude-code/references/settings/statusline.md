<!-- source: https://code.claude.com/docs/en/statusline.md / last verified: 2026-08-07 -->

# Customize your status line

A customizable bar at the bottom of Claude Code that runs a shell script you configure. It receives JSON session data on stdin and displays whatever the script prints stdout — context usage, costs, git status, or anything else.

## Signature / Usage

```json ~/.claude/settings.json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 2
  }
}
```

Or generate one from natural language: `/statusline show model name and context percentage with a progress bar`.

Minimal script (`~/.claude/statusline.sh`, then `chmod +x`):

```bash
#!/bin/bash
input=$(cat)
MODEL=$(echo "$input" | jq -r '.model.display_name')
DIR=$(echo "$input" | jq -r '.workspace.current_dir')
PCT=$(echo "$input" | jq -r '.context_window.used_percentage // 0' | cut -d. -f1)
echo "[$MODEL] 📁 ${DIR##*/} | ${PCT}% context"
```

## Options / Props

| Field | Description |
| --- | --- |
| `type` | `"command"` — run the shell command in `command` |
| `command` | Script path or inline shell command (runs in a shell) |
| `padding` | Extra horizontal spacing in characters, default `0`, in addition to built-in interface spacing |
| `refreshInterval` | Re-run the command every N seconds (min `1`) in addition to event-driven updates; needed for time-based data or when background subagents change git state while idle |
| `hideVimModeIndicator` | `true` suppresses the built-in `-- INSERT --` text when the script already renders `vim.mode` |

Disable: `/statusline delete` (or `clear`/`remove it`), or delete the `statusLine` key manually.

## How status lines work

Claude Code pipes JSON to the script's stdin; the script prints to stdout. Runs once at session start/resume, then again on: a new assistant message, `/compact` finishing, permission mode change, vim mode toggle, or a `refreshInterval` tick. Debounced at 300ms; an in-flight script is cancelled if a new trigger fires. Multi-line output (`echo` per line), ANSI color codes, and OSC 8 hyperlinks are all supported. Read `COLUMNS`/`LINES` env vars for terminal size (stdout is captured, so `tput cols` doesn't work). Runs locally, consumes no API tokens.

## Available data (JSON fields on stdin)

| Field | Description |
| --- | --- |
| `model.id`, `model.display_name` | Current model |
| `cwd`, `workspace.current_dir` | Current working directory |
| `workspace.project_dir` | Directory Claude Code was launched from |
| `workspace.added_dirs` | Dirs added via `/add-dir` |
| `workspace.git_worktree` | Worktree name (absent in main tree) |
| `workspace.repo.host/owner/name` | Parsed from `origin` remote |
| `cost.total_cost_usd` | Estimated session cost (resets on `/clear`) |
| `cost.total_duration_ms`, `cost.total_api_duration_ms` | Wall-clock / API-wait time |
| `cost.total_lines_added`, `cost.total_lines_removed` | Lines changed |
| `context_window.total_input_tokens`, `.total_output_tokens` | Current context usage (not cumulative, since v2.1.132) |
| `context_window.context_window_size` | 200000 default, or 1000000 for extended-context models |
| `context_window.used_percentage`, `.remaining_percentage` | Pre-calculated, input-tokens-only |
| `context_window.current_usage` | `{input_tokens, output_tokens, cache_creation_input_tokens, cache_read_input_tokens}`; `null` before first API call and right after `/compact` |
| `exceeds_200k_tokens` | Fixed 200k threshold regardless of actual window size |
| `fast_mode` | Whether fast mode is on |
| `effort.level` | `low`/`medium`/`high`/`xhigh`/`max` (ultracode reports as `xhigh`); absent if unsupported |
| `thinking.enabled` | Extended thinking on/off |
| `rate_limits.five_hour`/`.seven_day` `.used_percentage`/`.resets_at` | Pro/Max subscription rate limits, present only after first API response |
| `session_id`, `session_name` | Session identity; `session_name` absent unless custom-named or AI-titled |
| `prompt_id` | UUID of current prompt (absent until first input; v2.1.196+) |
| `transcript_path`, `version` | Transcript file path, Claude Code version |
| `output_style.name` | Current output style |
| `vim.mode` | `NORMAL`/`INSERT`/`VISUAL`/`VISUAL LINE` when vim mode enabled |
| `agent.name` | Set with `--agent` or agent settings |
| `pr.number`, `.url`, `.review_state` | Open PR for current branch (absent once merged/closed) |
| `worktree.name`, `.path`, `.branch`, `.original_cwd`, `.original_branch` | Present only during `--worktree` sessions |

`context_window.used_percentage` is calculated from `input_tokens + cache_creation_input_tokens + cache_read_input_tokens` only (not output tokens).

## Examples

Common patterns (Bash/Python/Node.js snippets in the source): context-window progress bar, git status with ANSI colors, cost/duration tracking, multi-line output, OSC 8 clickable links (e.g. to a GitHub repo), rate-limit display, and caching slow `git` calls to a temp file keyed by `session_id` (not PID, which changes per invocation).

### Subagent status lines

```json
{ "subagentStatusLine": { "type": "command", "command": "~/.claude/subagent-statusline.sh" } }
```

Renders a custom row per subagent shown in the agent panel. Receives base hook fields + `columns` + a `tasks` array (`id`, `name`, `type`, `status`, `description`, `label`, `startTime`, `model`, `effort`, `contextWindowSize`, `tokenCount`, `tokenSamples`, `cwd`). Write one JSON line per row to override: `{"id": "<task id>", "content": "<row body>"}`; omit `id` to keep default rendering, emit empty `content` to hide the row.

### Windows configuration

Runs through Git Bash if installed, else PowerShell. Use forward slashes in `command` paths (Git Bash treats unquoted backslashes as escapes). To run a PowerShell script explicitly: `"command": "powershell -NoProfile -File C:/Users/username/.claude/statusline.ps1"`.

## Notes

- Status line only runs after workspace trust is accepted for the directory (it executes a shell command, same trust gate as hooks); `claude --debug` logs `Status line command skipped: workspace trust not accepted` otherwise.
- `disableAllHooks: true` also disables the status line.
- Scripts that exit non-zero or hang leave the status line blank/stale; a slow script blocks updates until it completes or is cancelled by the next trigger.
- Test with mock input: `echo '{"model":{"display_name":"Opus"},...}' | ./statusline.sh`.
- Community projects `ccstatusline` and `starship-claude` provide pre-built configurations.

## Related

- [model-config.md](./model-config.md): `effort.level` and `fast_mode` semantics shown in the status line
- [terminal-config.md](./terminal-config.md): OSC 8 hyperlink support (`FORCE_HYPERLINK`) and color theme matching
