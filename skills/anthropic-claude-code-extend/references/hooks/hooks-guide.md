<!-- source: https://code.claude.com/docs/en/hooks-guide / last verified: 2026-10-17 -->

# Automate actions with hooks (guide)

Task-oriented walkthrough for hooks: deterministic control so certain actions always happen instead of relying on the LLM to choose to run them. For full event schemas and JSON formats, see `hooks.md`.

## Signature / Usage

Desktop notification when Claude needs input (`~/.claude/settings.json`):

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          { "type": "command", "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'" }
        ]
      }
    ]
  }
}
```

Auto-format after edits (`.claude/settings.json`):

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write" }] }
    ]
  }
}
```

## Options / Props

`Notification` matcher values: `permission_prompt` (the prompt has waited about six seconds), `idle_prompt` (Claude finished responding about 60 seconds ago and you haven't typed since), `auth_success`, `elicitation_dialog`, `elicitation_url_dialog` (an MCP server asks you to open a browser URL and you haven't typed for about six seconds), `elicitation_complete`, `elicitation_response`, `agent_needs_input`, `agent_completed`, `quota_auto_resume_fired`, `quota_auto_resume_stale`, `quota_auto_resume_disabled` (the last three require v2.1.234+; they report Claude Code continuing, waiting for `Enter`, or ending its wait after a claude.ai usage limit pause).

Worked examples in this guide: notify on input needed, auto-format after `Edit|Write`, block edits to protected files (`PreToolUse` + exit 2 script), re-inject context after compaction (`SessionStart` with `compact` matcher), audit config changes (`ConfigChange`), reload env on `SessionStart`/`CwdChanged`/`FileChanged` via `CLAUDE_ENV_FILE`, auto-approve specific `PermissionRequest` prompts (e.g. `ExitPlanMode`).

Prompt-based hooks (`type: "prompt"`): sends the hook input to a Claude model (Haiku by default) for a yes/no `{"ok": bool, "reason": "..."}` decision — use for judgment calls instead of deterministic shell logic. On `ok: false`: on `Stop` / `SubagentStop` the reason is fed back to Claude and it keeps working, unless the response also sets `"impossible": true` (the condition can never be satisfied), in which case Claude Code allows the stop; on `PreToolUse` the call is denied and by default the turn ends (since v2.1.210; before that the reason was returned to Claude as the tool error), while `continueOnBlock: true` returns the reason to Claude as the tool error so it can continue; on `PostToolUse` by default the turn ends and `continueOnBlock: true` feeds the reason back; on `PostToolBatch`, `UserPromptSubmit` and `UserPromptExpansion` the turn ends.

Agent-based hooks (`type: "agent"`, experimental): spawns a subagent with tool access (read files, run commands) before returning the same `ok`/`reason` shape; default timeout 60s, up to 50 tool-use turns. No `impossible` field; on `ok: false` they behave like a prompt hook with `continueOnBlock: true`.

## Notes

- Command hooks communicate only through stdout/stderr/exit code — they can't trigger `/` commands or tool calls directly.
- `PostToolUse` hooks can't undo actions since the tool already ran.
- `PreToolUse` hooks fire before any permission-mode check in every mode including `bypassPermissions`/`dontAsk` — a `deny` from a hook can't be bypassed by the user's permission mode, but an `allow` from a hook can't loosen deny rules or force-skip a required MCP `requiresUserInteraction` prompt either.
- JSON output requires exiting 0; if the JSON also carries `if` validation issues on exit 2, stderr is used as the blocking reason (v2.1.214+).
- Hook timeouts vary by type (override per hook with `timeout` in seconds): `command` / `http` / `mcp_tool` 10 minutes, lowered to 30 seconds for `UserPromptSubmit`, `PreModelSwitch` and `PostModelSwitch` and to 10 seconds for `MessageDisplay`; `prompt` 30 seconds; `agent` 60 seconds; `SessionEnd` hooks of any type share a 1.5-second budget that rises to match a longer per-hook `timeout`, up to 60 seconds.
- A mod's `tool.check` handler can approve a call that your `PreToolUse` hook blocked, unless the hook is in managed settings (see the mods pages of the Claude Code plugins docs).
- Stop hooks: the 8-consecutive-continuation cap can be raised with `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` when a hook legitimately needs more iterations; guard against loops by checking `stop_hook_active`.
- Shell-form command hooks that source a profile with unconditional `echo` can corrupt the JSON on stdout — guard profile echoes with an interactive-shell check (`[[ $- == *i* ]]`).
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use, see anthropic-api-tools-mcp.

## Related

- [hooks.md](./hooks.md) — full event schema reference, decision-control tables, HTTP/MCP hook fields
