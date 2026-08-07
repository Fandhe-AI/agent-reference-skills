# Hooks

Extensibility framework that lets you inject your own scripts into the agentic loop — logging/analytics, blocking accidental secret pastes, auto-summarizing chats, validating a turn before it stops, or customizing prompting per directory. Hooks are enabled by default.

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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `PreToolUse` / `PostToolUse` | event | Before/after a tool call (Bash, `apply_patch`, MCP tools, other local function tools). `PreToolUse` can deny or rewrite (`updatedInput`) a supported call; `PostToolUse` can't undo side effects but can replace the model-visible result. |
| `PermissionRequest` | event | Runs when Codex is about to ask for approval; can `allow`/`deny` the request or defer to the normal approval prompt. |
| `SessionStart` / `SessionEnd` | event | Session begins (`startup`/`resume`/`clear`/`compact`) / ends (main thread only, not subagents). |
| `SubagentStart` / `SubagentStop` | event | A subagent starts/stops; `matcher` filters on `agent_type`. |
| `UserPromptSubmit` | event | Before a user prompt is sent; can add context or block it. |
| `PreCompact` / `PostCompact` | event | Before/after Codex compacts the chat (`matcher` on `manual`/`auto`). |
| `Stop` | event | The turn is about to end; `decision: "block"` continues the turn with `reason` as a new prompt. |
| `matcher` | regex string | Filters when a hook fires (tool name, compaction trigger, subagent type, etc., depending on event). `"*"`, `""`, or omitted matches every occurrence. |
| `type` | `"command"` | Only supported handler type today; `prompt` and `agent` are parsed but skipped. |
| `command` / `commandWindows` | string | Shell command to run; `commandWindows` (or `command_windows` in TOML) overrides on Windows. |
| `timeout` | number (seconds) | Default `600`; `SessionEnd` defaults to `1`, max `3`. |
| `additionalContextLimit` | number | Approximate token threshold before oversized `additionalContext` is spilled to disk (`hook_outputs/<session_id>/<uuid>.txt`) and replaced with a preview. Default `2500`; `0` passes full output. |

## Notes

- Codex discovers hooks next to active config layers: `~/.codex/hooks.json`, `~/.codex/config.toml`, `<repo>/.codex/hooks.json`, `<repo>/.codex/config.toml`, plus managed `requirements.toml` (`[hooks]`, `managed_dir`) and plugin-bundled `hooks/hooks.json`. Project-local hooks load only when the project `.codex/` layer is trusted.
- Before a non-managed command hook runs, Codex requires you to review and trust its exact definition (hash-based); use `/hooks` in the CLI to inspect, trust, or disable hooks. Managed hooks (system/MDM/cloud/`requirements.toml`) are trusted by policy and can't be disabled from the user browser.
- Turn hooks off with `[features] hooks = false` (`codex_hooks` is a deprecated alias); pin `[features].hooks = true` in `requirements.toml` to force-enable managed hooks, or `allow_managed_hooks_only = true` to skip all non-managed hook sources.
- Shell wrappers with only plain words joined by `&&`/`||`/`;`/`|` are split per-command before `PreToolUse`/`PostToolUse` evaluation; scripts using redirection, substitution, env vars, wildcards, or control flow run as one opaque `["bash", "-lc", "<script>"]` call.
- Inline `[hooks]` tables as a `config.toml` surface (with an example `PreToolUse` block) are also summarized in the config category — see `../config/config-advanced.md`; this page is the full lifecycle/event/matcher/schema reference.
- **Codex hook event names (`PreToolUse`, `PostToolUse`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `Stop`, `SubagentStart`, `SubagentStop`, `PreCompact`, `PostCompact`) are identical to Claude Code's hook events, and Codex even sets `CLAUDE_PLUGIN_ROOT`/`CLAUDE_PLUGIN_DATA` for plugin compatibility — but the two systems are not interchangeable.** Codex hooks live in `~/.codex/hooks.json` / inline `[hooks]` in `config.toml`; Claude Code hooks are configured in `.claude/settings.json`. Wire formats, plugin manifests, and trust models differ despite the shared event vocabulary.

## Related

- [Rules](./rules.md)
- [Subagents](./subagents.md)
- Advanced Configuration (`../config/config-advanced.md`)
