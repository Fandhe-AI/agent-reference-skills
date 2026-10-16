<!-- source: https://code.claude.com/docs/en/statusline.md / last verified: 2026-10-16 -->

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
| `workspace.repo.host`, `.owner`, `.name` | Repository identity parsed from the `origin` remote (e.g. `"github.com"`, `"anthropics"`, `"claude-code"`). Absent outside a git repository or when no `origin` remote is configured. For a gitlab.com project nested in subgroups, `owner` is the full namespace path with slashes (`"group/subgroup"`); before v2.1.260, `workspace.repo` was absent for these projects |
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
| `rate_limits.spend_limit.used_percentage`, `.resets_at` | Only behind a Claude apps gateway: how much of your spend limit you have used (0 to 100, above 100 once exceeded) and when its period resets (Unix epoch seconds). Present with every response once `spend_limit` is. Requires v2.1.251+ |
| `rate_limits.spend_limit.used_usd`, `.limit_usd`, `.period` | Estimated spend and limit in US dollars and the limit's period (`daily`, `weekly`, or `monthly`). Read from the gateway about every five minutes, so they can lag `used_percentage`; optional (absent if `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` is set). Requires v2.1.284+ on both Claude Code and the gateway |
| `prompt_cache` | Prompt cache statistics for the main conversation (subagent requests not counted): `warm`, `caching_observed`, `ttl` (`"5m"` / `"1h"`), `expires_at`, `requests`, `misses`, `expected_rebuilds`, `hit_ratio` (0 to 1), `cache_write_tokens`, `miss_recache_tokens`, `last_miss_at`, `recache_tokens_if_cold`, plus `last_miss_cause` (`causes` array such as `tools_changed`, `system_prompt_changed`, `ttl_expired_5m`, `likely_server_side`; `null` until the first miss) and `miss_causes` (counts per cause), both v2.1.260+. Absent until the first API response. Requires v2.1.251+. Same statistics as the `/usage` command's `Prompt cache (main)` line |
| `session_id`, `session_name` | Session identity; `session_name` absent unless custom-named or AI-titled |
| `prompt_id` | UUID of current prompt (absent until first input; v2.1.196+) |
| `transcript_path`, `version` | Transcript file path, Claude Code version |
| `output_style.name` | Current output style |
| `vim.mode` | `NORMAL`/`INSERT`/`VISUAL`/`VISUAL LINE` when vim mode enabled |
| `agent.name` | Set with `--agent` or agent settings |
| `pr.number`, `.url`, `.review_state` | Open PR for current branch (absent once merged/closed). With a GitLab remote, Claude Code fills these from the branch's open merge request, so `pr.number` is the merge request number (v2.1.234+) |
| `pr.kind` | `mr` when `pr` describes a GitLab merge request; absent for GitHub pull requests. For a merge request `review_state` is `approved` when GitLab reports it mergeable, `pending` for any other open state, `draft` for a draft. Requires v2.1.234+ |
| `worktree.name`, `.path`, `.branch`, `.original_cwd`, `.original_branch` | Present only during `--worktree` sessions |

`context_window.used_percentage` is calculated from `input_tokens + cache_creation_input_tokens + cache_read_input_tokens` only (not output tokens).

## Examples

Common patterns (Bash/Python/Node.js snippets in the source): context-window progress bar, git status with ANSI colors, cost/duration tracking, multi-line output, OSC 8 clickable links (e.g. to a GitHub repo), rate-limit display, and caching slow `git` calls to a temp file keyed by `session_id` (not PID, which changes per invocation).

### Subagent status lines

```json
{ "subagentStatusLine": { "type": "command", "command": "~/.claude/subagent-statusline.sh" } }
```

Renders a custom row per subagent shown in the agent panel. Receives base hook fields + `columns` + a `tasks` array (`id`, `name`, `type`, `status`, `description`, `label`, `startTime`, `model`, `effort`, `contextWindowSize`, `tokenCount`, `tokenSamples`, `cwd`, `agentType` (subagent type the task runs as, such as `Explore` or a custom `code-reviewer`, same value hooks receive as `agent_type`; requires v2.1.293+)). Write one JSON line per row to override: `{"id": "<task id>", "content": "<row body>"}`; omit `id` to keep default rendering, emit empty `content` to hide the row.

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
