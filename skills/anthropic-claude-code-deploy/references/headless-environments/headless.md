<!-- source: https://code.claude.com/docs/en/headless.md / last verified: 2026-11-14 -->

# Run Claude Code programmatically

Non-interactive `claude -p` mode for scripts, CI/CD, and the Agent SDK: structured output, streaming, auto-approved tools, and conversation continuation.

## Signature / Usage

```bash
claude -p "Find and fix the bug in auth.py" --allowedTools "Read,Edit,Bash"

# Faster startup: skip auto-discovery of hooks/skills/plugins/MCP/CLAUDE.md
claude --bare -p "Summarize README.md" --allowedTools "Read"

# Structured JSON output
claude -p "Summarize this project" --output-format json

# JSON Schema-constrained output
claude -p "Extract the main function names from auth.py" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}},"required":["functions"]}'

# Streaming
claude -p "Explain recursion" --output-format stream-json --verbose --include-partial-messages

# Session-wide permission baseline, and no prompts in unattended runs
claude -p "Apply the lint fixes" --permission-mode acceptEdits
claude -p "Update the dependency pins and run the tests" --permission-mode auto --permission-prompts none

# Continue a conversation
claude -p "Now focus on the database queries" --continue
claude -p "Continue that review" --resume "$session_id"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `-p`, `--print` | flag | Runs non-interactively; Claude Code rejects `--bg`, and rejects `--cloud` with a task description (error names the conflict). `--cloud` with a session ID and `-p` queues a message into that cloud session and exits |
| `--bare` | flag | Skips hooks/skills/custom commands/subagents/plugins/MCP/auto memory/CLAUDE.md discovery for deterministic CI runs; never reads OAuth/keychain, so set `ANTHROPIC_API_KEY` (or `apiKeyHelper` in `--settings`). Bedrock, Google Cloud's Agent Platform, and Foundry still read their own credentials |
| `--output-format` | `text` \| `json` \| `stream-json` | Response shape; `json` includes `total_cost_usd` and per-model cost |
| `--json-schema` | JSON Schema string | Constrains `--output-format json` to a schema; result lands in `structured_output` (field is absent if the run ends without valid structured output) |
| `--allowedTools` | permission rule list | Pre-approves specific tools, e.g. `"Bash(git diff *),Read,Edit"`; trailing ` *` is prefix matching |
| `--permission-mode` | `auto` \| `dontAsk` \| `acceptEdits` \| ... | Session-wide baseline instead of per-tool allowlisting |
| `--permission-prompts none` | flag | Denies anything that would prompt (unless a `PermissionRequest` hook allows it) and tells Claude not to retry; requires v2.1.259+ |
| `--continue` / `--resume` | flag / session ID or `.jsonl` path | Continues the most recent or a specific conversation |
| `--append-system-prompt` | string | Adds instructions while keeping the default system prompt |
| `--forward-subagent-text` | flag | Emits subagent text/thinking blocks in the stream, not just tool_use/tool_result (also `CLAUDE_CODE_FORWARD_SUBAGENT_TEXT`) |
| `--settings`, `--mcp-config`, `--agents`, `--plugin-dir`, `--plugin-url`, `--append-system-prompt-file` | flags | The ways to load context in bare mode |

## Notes

- Exit code 0 on success, non-zero on failure; an invalid flag is reported on stderr before the run starts, while a failure inside the run (such as missing authentication) is printed as the result on stdout.
- Piped stdin capped at 10MB; write large inputs to a file and reference the path instead. If stdin can't be read, Claude Code warns on stderr and continues with the command-line prompt.
- `--bare` is the recommended mode for scripted and SDK calls and will become the default for `-p` in a future release. Without it, a `-p` session runs the project's `.claude/settings.json` hooks and connects its `.mcp.json` servers even in an untrusted folder (no trust dialog, no per-server approval prompt).
- Source: https://code.claude.com/docs/en/headless.md, fetched 2026-11-14

### Bare mode limits

- Hooks passed via `--settings`, or in a flag-loaded plugin's `hooks/hooks.json` or `hooks` manifest key, still don't run; don't use bare mode for a run that needs them.
- Only MCP servers supplied on the command line connect; an interactive session also skips the automatic IDE connection unless `--ide` is passed.
- No system reminders (including the skills list), no background commands or background subagents (a command at its timeout stops instead of moving to the background).
- Before v2.1.286 these limits held only partly. A directory named with `--add-dir` loads its `.claude/skills/` but not `.claude/commands/` or `.claude/agents/`.

### Background tasks at exit

- After Claude's turn finishes and stdin closes, `claude -p` waits for background commands, subagents and workflows, Monitor watches, and pending self-paced `/loop` wakeups.
- Unless a main-conversation background command is still running, Claude Code stops remaining work after 10 minutes of continuous idle waiting and drops its partial result. Change the cap with `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS`; `0` waits without a cap. A Monitor watch times out five minutes after Claude starts it by default.
- A background command the main conversation started is awaited until it exits or hits its time limit, then Claude takes one more turn. Reaching `--max-budget-usd` stops the remaining background work.
- With `text` output each turn's result is printed (before v2.1.295 only the last); `json` prints the last turn's result. After five seconds of waiting, stderr (if a terminal) gets a `Waiting for background work to finish` line.
- A subagent's long command that moved to the background can outlive the run (exit 0 before it finishes); raise `BASH_DEFAULT_TIMEOUT_MS`, e.g. `BASH_DEFAULT_TIMEOUT_MS=300000 claude -p "<prompt>"`, and for a background subagent command over 10 minutes also raise the 10-minute cap.
- `claude -p` doesn't wait for MCP work in the background: MCP tasks on a remote server keep going (resume the session to follow them); calls moved by automatic backgrounding lose their result.

### SIGTERM and working directory

- SIGTERM leaves the in-progress turn unfinished with no recorded result, kills the Bash process tree, runs `SessionEnd` hooks, starts no new tool call or model request, and exits 143. To end the turn instead, send SIGINT or call the Agent SDK's `interrupt()` first.
- A running command is recorded as killed; a pending permission prompt stays unanswered (via the Agent SDK, input ends first and the prompt is cancelled). On resume the interrupted turn is left as is; set `CLAUDE_CODE_RESUME_INTERRUPTED_TURN=1` to continue it.
- If the working directory is deleted mid-session the session keeps running; a `stream-json` warning is emitted each turn and shell commands fail until the directory exists again.

### Permissions in `-p`

- Listing `Bash` in `--allowedTools` is dropped as a broad allow rule in a run that starts in auto mode (auto mode evaluates each command instead). `Read`/`Edit` listing does not cover reads from network paths.
- In Manual mode, a call that needs approval is denied unless a `PermissionRequest` hook or `--permission-prompt-tool` approves it. From v2.1.302, `claude -p` starts in Manual mode when nothing sets a permission mode.
- `dontAsk` denies every call that would prompt (locked-down CI), but read-only commands, working-directory reads, and `--allowedTools` / `permissions.allow` matches still run; `AskUserQuestion`, org-`ask` connector tools, `requiresUserInteraction` MCP tools, and network-path reads are denied even when an allow rule matches. An installed mod can still approve some calls.
- `acceptEdits` auto-approves file writes and common filesystem commands (`mkdir`, `touch`, `mv`, `cp`); other shell commands and network requests still need an allow entry.
- `--permission-prompts none` removes tools that need a person (such as `AskUserQuestion`), cancels unanswered MCP elicitations, and with `stream-json` reports denials as `permission_denied` system messages and `permission_denials` in the result.
- In `-p`, user-invoked skills and custom commands work (`/skill-name` in the prompt); terminal-only built-ins such as `/login` don't. `/model`, `/effort`, `/fast`, `/color`, `/rename` take an argument; `/config key=value` changes a setting; `/mcp` alone prints a status summary; `/output-style <style>` needs v2.1.269+.

### Streaming events

- With `--output-format stream-json --verbose --include-partial-messages` the last line is a `result` message; a slow consumer gets up to 30 seconds for queued output to drain. `json` output reports whole-conversation cost on `--continue`/`--resume`; both cost figures are client-side estimates.
- Subagent and forked-skill messages carry `parent_tool_use_id` (`null` for the main conversation). A forked skill started with `/<skill-name>` as the prompt carries a `forked-command-` prefixed value and its messages arrive together after it finishes. Minimum versions: Skill-tool forked skill `tool_use`/`tool_result` v2.1.86+, its first `user` message and text/thinking blocks v2.1.265+; nested subagents/forks v2.1.275+; prompt-started forked skill v2.1.287+.
- `system/api_retry` event fields: `type` (`"system"`), `subtype` (`"api_retry"`), `attempt`, `max_retries`, `retry_delay_ms`, `error_status` (integer or null), `no_response` (optional, `waited_ms` / `retry_wait_ms`, v2.1.261+), `error` (`authentication_failed`, `oauth_org_not_allowed`, `account_on_hold`, `billing_error`, `rate_limit`, `overloaded`, `invalid_request`, `model_not_found`, `server_error`, `max_output_tokens`, `cloud_credential_error`, `unknown`), `uuid`, `session_id`. From v2.1.246, when a `401`/`403` rejects an `apiKeyHelper` credential, the first two retries are quiet (no event) but count toward `attempt`.
- `system/init` is first unless preceded by `plugin_install` events (with `CLAUDE_CODE_SYNC_PLUGIN_INSTALL`) or `hook_started` / `hook_progress` / `hook_response` events for `SessionStart` / `Setup` hooks. It carries an optional `capabilities` string array (e.g. `interrupt_receipt_v1`) for feature detection.
- CI gating fields in `system/init`: `plugins` (`name`, `path`), `plugin_errors` (`plugin`, `type`, `message`, plus `path` for a failed `--plugin-dir`, v2.1.283+; key omitted when empty), `mcp_servers` (`name`, `status`), `mcp_server_errors` (`name`, `type` such as `unknown_type` / `url_missing_type` / `invalid_config` / `reserved_name`, `message`; key omitted when empty). With `--mcp-config` and `-p`, Claude Code waits for pending servers up to `MCP_TIMEOUT` (30 seconds default; v2.1.221+); a remote server with a cached tool list skips the wait and shows `pending`. Skipped config entries print a stderr warning only in an interactive terminal; otherwise they appear only in `mcp_server_errors`.
- `system/plugin_install` event (with `CLAUDE_CODE_SYNC_PLUGIN_INSTALL`): `status` is `started` / `installed` / `failed` / `completed` (`started`/`completed` bracket the overall install), plus optional `name` and `error`, `uuid`, `session_id`.

### Continuing sessions

- On v2.1.257+, `--continue` opens a finished background session but not one still running. `--resume` finds the session ID in any project on the machine and also accepts an absolute path to a session `.jsonl` transcript.
- If `--json-schema` isn't a valid JSON Schema, `claude` exits with `Error: --json-schema is not a valid JSON Schema`; `format` keywords are accepted but treated as annotations.

## Related

- [cloud-environments.md](./cloud-environments.md)
- [devcontainer.md](./devcontainer.md)
