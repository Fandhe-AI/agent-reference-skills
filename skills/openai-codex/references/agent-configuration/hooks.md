# Hooks

Extensibility framework that lets you run scripts or MCP tools during the agentic loop — logging/analytics, blocking accidental secret pastes, auto-summarizing chats into persistent memories, validating a turn before it stops, or customizing prompting per directory. Hooks are enabled by default.

## Signature / Usage

```json
// ~/.codex/hooks.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "/usr/bin/python3 \"$(git rev-parse --show-toplevel)/.codex/hooks/pre_tool_use_policy.py\"",
            "statusMessage": "Checking Bash command"
          }
        ]
      }
    ]
  }
}
```

Equivalent inline TOML in `config.toml`:

```toml
[[hooks.PreToolUse]]
matcher = "^Bash$"

[[hooks.PreToolUse.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/pre_tool_use_policy.py"'
timeout = 30
statusMessage = "Checking Bash command"
```

MCP tool hook:

```json
{
  "type": "mcp_tool",
  "server": "scanner",
  "tool": "scan_patch",
  "input": { "patch": "${tool_input.command}" },
  "timeout": 30,
  "statusMessage": "Scanning edited files"
}
```

Background command hook:

```toml
[[hooks.PostToolUse.hooks]]
type = "command"
command = "python3 ~/.codex/hooks/post_tool_use.py"
async = true
timeout = 120
```

Managed hooks in `requirements.toml`:

```toml
allow_managed_hooks_only = true

[features]
hooks = true

[hooks]
managed_dir = "/enterprise/hooks"
windows_managed_dir = 'C:\enterprise\hooks'

[[hooks.PreToolUse]]
matcher = "^Bash$"

[[hooks.PreToolUse.hooks]]
type = "command"
command = "python3 /enterprise/hooks/pre_tool_use_policy.py"
command_windows = 'py -3 C:\enterprise\hooks\pre_tool_use_policy.py'
timeout = 30
statusMessage = "Checking managed Bash command"
```

## Options / Props

Events (when hooks run):

| When | Hooks |
|------|-------|
| During a turn | `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `UserPromptSubmit`, `SubagentStop`, `Stop` |
| When you interrupt an active turn | `Interrupt` (doesn't run for subagents) |
| When a session or subagent starts | `SessionStart`, `SubagentStart` |
| When the main thread ends | `SessionEnd` (doesn't run for subagents) |

Handler fields:

| Name | Type | Description |
|------|------|-------------|
| `matcher` | regex string | Filters when a hook fires. `"*"`, `""`, or omitted matches every occurrence. Ignored for `UserPromptSubmit`, `Stop`, `Interrupt`. |
| `type` | `"command"` \| `"mcp_tool"` | `command` and `mcp_tool` handlers are supported; `prompt` and `agent` handlers are parsed but skipped. |
| `command` | string | Shell command (runs with the session `cwd`). |
| `commandWindows` | string | Windows-only override. In TOML, `command_windows` or `commandWindows`. |
| `timeout` | number (seconds) | Default `600`. `SessionEnd` and `Interrupt` default to `1` and support up to `3`. |
| `statusMessage` | string | Optional message shown while the hook runs. |
| `async` | boolean | Run a command hook in the background (see Notes). |
| `additionalContextLimit` | number | Approximate token threshold before oversized `additionalContext` is spilled to disk. Default `2500`; `0` passes full output. |
| `description` | string | Optional top-level metadata in `hooks.json`; doesn't change which hooks run. |

MCP tool hook fields: `type` (`mcp_tool`), `server` (required, already-connected MCP server), `tool` (required), `input` (optional JSON object of argument templates, default `{}`), `timeout` (default `600`), `statusMessage`.

Matcher filters by event:

| Event | What `matcher` filters | Notes |
|-------|------------------------|-------|
| `PermissionRequest` | tool name | `Bash`, `apply_patch` (also `Edit` / `Write`), MCP tool names |
| `PreToolUse` / `PostToolUse` | tool name | See Tool coverage |
| `PreCompact` / `PostCompact` | compaction trigger | `manual` or `auto` |
| `SessionStart` | start source | `startup`, `resume`, `clear`, `compact`, `fork` |
| `SessionEnd` | end reason | Currently only `other` |
| `SubagentStart` / `SubagentStop` | subagent type | `agent_type` |

Tool coverage (`PreToolUse` / `PostToolUse`):

| Tool path | Pre | Post | Notes |
|-----------|-----|------|-------|
| Shell commands | Yes | Yes | Match as `Bash` |
| Unified exec (`exec_command`) | Yes | Yes | Match as `Bash`; a later `write_stdin` poll can deliver the original command's `PostToolUse` |
| `apply_patch` | Yes | Yes | Match as `apply_patch`, `Edit`, or `Write` |
| MCP tools | Yes | Yes | e.g. `mcp__filesystem__read_file` |
| Other local function tools | Yes | Yes | e.g. `update_plan`; `spawn_agent` also matches `Agent` |
| Hosted tools (e.g. `WebSearch`) | No | No | Don't use the local function-tool hook path |

Common input fields (one JSON object on `stdin`):

| Field | Type | Meaning |
|-------|------|---------|
| `session_id` | string | Current Codex session id (subagent hooks use the parent session id) |
| `transcript_path` | string \| null | Path to the session transcript; format isn't a stable interface |
| `cwd` | string | Working directory for the session |
| `hook_event_name` | string | Current hook event name |
| `model` | string | Codex-specific extension. Active model slug |
| `permission_mode` | string | On `SessionStart`, `PreToolUse`, `PermissionRequest`, `PostToolUse`, `UserPromptSubmit`, `SubagentStart`, `SubagentStop`, `Stop`, `Interrupt`: `default`, `acceptEdits`, `plan`, `dontAsk`, or `bypassPermissions` |
| `turn_id` | string | Codex-specific extension on turn-scoped hooks |

Event-specific input fields:

| Event | Fields |
|-------|--------|
| `SessionStart` | `source` |
| `SessionEnd` | `reason` (`other`) |
| `SubagentStart` | `turn_id`, `agent_id`, `agent_type`, `permission_mode` |
| `PreToolUse` | `turn_id`, `tool_name`, `tool_use_id`, `tool_input` |
| `PermissionRequest` | `turn_id`, `tool_name`, `tool_input`, `tool_input.description` (human-readable approval reason, when available) |
| `PostToolUse` | `turn_id`, `tool_name`, `tool_use_id`, `tool_input`, `tool_response` |
| `PreCompact` / `PostCompact` | `turn_id`, `trigger` (`manual` / `auto`) |
| `UserPromptSubmit` | `turn_id`, `prompt` |
| `SubagentStop` | `turn_id`, `agent_id`, `agent_type`, `agent_transcript_path`, `stop_hook_active`, `last_assistant_message` |
| `Stop` | `turn_id`, `stop_hook_active`, `last_assistant_message` |
| `Interrupt` | `turn_id`, `permission_mode` |

Common output fields (`SessionStart`, `PreCompact`, `PostCompact`, `UserPromptSubmit`, `SubagentStop`, `Stop`; `SubagentStart` accepts `systemMessage` and hook-specific context only):

| Field | Effect |
|-------|--------|
| `continue` | If `false`, marks that hook run as stopped |
| `stopReason` | Recorded as the reason for stopping |
| `systemMessage` | Surfaced as a warning in the UI or event stream |
| `suppressOutput` | Parsed today but not yet implemented |

## Notes

- How hooks run: matching hooks from multiple files all run; multiple matching command hooks for the same event launch concurrently. Non-managed hooks must be reviewed and trusted before they run.
- Discovery: `hooks.json` or inline `[hooks]` tables next to active config layers — `~/.codex/hooks.json`, `~/.codex/config.toml`, `<repo>/.codex/hooks.json`, `<repo>/.codex/config.toml` — plus plugin-bundled hooks. Higher-precedence layers don't replace lower-precedence hooks. A layer containing both `hooks.json` and inline `[hooks]` is merged with a startup warning; prefer one representation per layer. Project-local hooks load only when the project `.codex/` layer is trusted (user and system hooks still load).
- Review and trust: trust is recorded against the hook's current hash, so new or changed hooks are skipped until trusted. Use `/hooks` in the CLI to inspect sources, review, trust, or disable individual non-managed hooks. Managed hooks (system, MDM, cloud, `requirements.toml`) are trusted by policy and can't be disabled from the user hook browser. For one-off automation that vets hooks externally, pass `--dangerously-bypass-hook-trust`.
- For repo-local hooks, resolve paths from the git root instead of a relative `.codex/hooks/...` (Codex may start from a subdirectory).
- Turn hooks off with `[features] hooks = false` (`codex_hooks` is a deprecated alias); admins can force hooks off with `[features].hooks = false` in `requirements.toml`, or pin `[features].hooks = true` to enforce managed hooks, or set `allow_managed_hooks_only = true` to skip user, project, session, and plugin hooks.
- Managed hooks: `managed_dir` is used on macOS and Linux, `windows_managed_dir` on Windows. Codex doesn't distribute the scripts; enterprise tooling must install and update them. Use absolute script paths under the managed directory. When managed policy and remote hooks are enabled, Work Cloud with local access and dots use admin-managed remote MCP hooks (`mcp_tool` handlers in Global `requirements.toml`); command/shell, prompt, and agent handlers, local-configuration/plugin hooks, environment-scoped hooks, and `SessionEnd` MCP hooks are not supported with cloud orchestration. A `PreToolUse` callback error, timeout, or malformed response can fail the hook without blocking the tool; MCP hooks don't provide a complete Compliance API audit trail.
- Plugin-bundled hooks: Codex looks for `hooks/hooks.json` in the plugin root; a `hooks` entry in `.codex-plugin/plugin.json` (a `./`-prefixed path, array of paths, inline hooks object, or array of objects) overrides the default and must stay inside the plugin root. Plugin hook commands receive `PLUGIN_ROOT` and `PLUGIN_DATA` (Codex-specific extensions), plus `CLAUDE_PLUGIN_ROOT` and `CLAUDE_PLUGIN_DATA` for compatibility. Enabling a plugin doesn't automatically trust its hooks.
- MCP tool hooks: use `${field.nested}` to read a dotted field from the hook event; a placeholder filling an entire value keeps its JSON type, inside a larger string it renders as text; objects and arrays expand recursively. Hooks use an existing MCP connection (don't start or reconnect servers); errors, missing servers, and unavailable tools don't block. They run synchronously, don't request tool approval or trigger other hooks, the shorter hook or server timeout applies, `SessionStart` MCP hooks may run before the server is ready, and `SessionEnd` doesn't support them.
- Large hook output: each model-visible hook-output message is limited to roughly 2,500 tokens; more is saved under `<temp_dir>/hook_outputs/<session_id>/<uuid>.txt` and replaced with a head-and-tail preview ("spilling"). `additionalContextLimit` applies only to `additionalContext` (tool feedback and continuation prompts keep the default). Avoid returning secrets in hook output; avoid `0` unless the hook enforces a strict cap.
- Background hooks (`async: true`): same input, matcher, trust review, timeout, and large-output handling as synchronous hooks; output is delivered at the next safe point (the next model request in an active turn, otherwise the next user turn) and doesn't start a new turn. They can't block, approve, rewrite, or control the triggering operation. Limits: up to eight concurrently per session, may finish out of order, unfinished ones are cancelled at session end, and `SessionEnd` hooks always run synchronously.
- `SessionStart`: plain `stdout` is added as developer context; JSON `hookSpecificOutput.additionalContext` likewise. After compaction of a root session, hooks matching `source: "compact"` run before the next model request (also for mid-turn automatic compaction); `continue: false` ends the turn. A forked thread uses `source: "fork"`; resuming with supplied history still uses `resume`.
- `SessionEnd`: runs for the main thread when you archive/delete an open conversation, when Codex closes normally, or after 30 minutes idle with no connected client; not for subagents. Switching conversations or `thread/unsubscribe` doesn't end the session. Output is advisory.
- `SubagentStart`: `continue: false` is parsed but doesn't stop the subagent from starting.
- `PreToolUse`: deny with `hookSpecificOutput.permissionDecision: "deny"` + `permissionDecisionReason`, the older `{"decision":"block","reason":...}`, or exit code `2` with the reason on `stderr`. Add model-visible context via `hookSpecificOutput.additionalContext`. Rewrite with `permissionDecision: "allow"` + `updatedInput` (for Bash and `apply_patch` it must include a string `command`; for MCP/local function tools it replaces the arguments object). `permissionDecision: "ask"`, legacy `decision: "approve"`, `continue: false`, `stopReason`, `suppressOutput` are parsed but unsupported: the hook run is marked failed and the tool call continues. Plain `stdout` is ignored.
- `PermissionRequest`: runs when Codex is about to ask for approval (not for commands that need none). Return `hookSpecificOutput.decision.behavior` = `allow` or `deny` (+ `message`). Any `deny` wins; otherwise `allow` skips the prompt; no decision falls back to the normal approval flow. Don't return `updatedInput`, `updatedPermissions`, or `interrupt` (reserved; fail closed).
- `PostToolUse`: runs after supported tools including non-zero Bash exits; can't undo side effects. `decision: "block"` (or exit `2`) replaces the tool result with the feedback and continues; `continue: false` replaces the result with feedback or stop text. `updatedMCPToolOutput` and `suppressOutput` are parsed but unsupported. In code mode, a `PreToolUse` block rejects the tool promise before it runs, `updatedInput` runs with the rewritten input, a blocking `PostToolUse` rejects the promise after the tool ran, and `continue: false` doesn't reject the nested promise.
- `PreCompact` / `PostCompact`: `continue: false` stops before / after compacting.
- `UserPromptSubmit`: plain `stdout` or `additionalContext` adds developer context; block with `{"decision":"block","reason":...}` or exit `2`.
- `SubagentStop` and `Stop` expect JSON on `stdout` when exiting `0` (plain text is invalid). `decision: "block"` continues the flow, and for `Stop` automatically creates a continuation prompt using `reason` as new user prompt text. `continue: false` from any matching hook takes precedence over continuation decisions.
- `Interrupt`: runs when you interrupt an active turn on the main thread; not for idle threads or subagents; 1–3 second timeout; can't prevent the interruption or restart the turn; output is exit `0` with nothing, or JSON `{"systemMessage": "..."}`; plain text is invalid.
- Tool hooks are a guardrail, not a complete enforcement boundary; some specialized tool paths opt out of the default hook path. Exit `0` with no output is success.
- Schemas: the generated schemas live in the Codex GitHub repository (`codex-rs/hooks/schema/generated`); the `main` branch schemas may include fields not in the current release, so use this page as the release behavior reference.
- Shell wrappers with only plain words joined by `&&`/`||`/`;`/`|` are split per-command before `PreToolUse`/`PostToolUse` evaluation; scripts using redirection, substitution, env vars, wildcards, or control flow run as one opaque `["bash", "-lc", "<script>"]` call.
- Inline `[hooks]` tables are also summarized in the config category — see `../config/config-advanced.md`; this page is the full lifecycle/event/matcher/schema reference.
- **Codex hook event names (`PreToolUse`, `PostToolUse`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `Stop`, `SubagentStart`, `SubagentStop`, `PreCompact`, `PostCompact`) are identical to Claude Code's hook events, and Codex even sets `CLAUDE_PLUGIN_ROOT`/`CLAUDE_PLUGIN_DATA` for plugin compatibility — but the two systems are not interchangeable.** Codex hooks live in `~/.codex/hooks.json` / inline `[hooks]` in `config.toml`; Claude Code hooks are configured in `.claude/settings.json`. Wire formats, plugin manifests, and trust models differ despite the shared event vocabulary.

## Related

- [Rules](./rules.md)
- [Subagents](./subagents.md)
- Advanced Configuration (`../config/config-advanced.md`)
