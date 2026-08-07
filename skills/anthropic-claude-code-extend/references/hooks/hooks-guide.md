<!-- source: https://code.claude.com/docs/en/hooks-guide / last verified: 2026-08-07 -->

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

`Notification` matcher values: `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog`, `elicitation_complete`, `elicitation_response`, `agent_needs_input`, `agent_completed`.

Worked examples in this guide: notify on input needed, auto-format after `Edit|Write`, block edits to protected files (`PreToolUse` + exit 2 script), re-inject context after compaction (`SessionStart` with `compact` matcher), audit config changes (`ConfigChange`), reload env on `SessionStart`/`CwdChanged`/`FileChanged` via `CLAUDE_ENV_FILE`, auto-approve specific `PermissionRequest` prompts (e.g. `ExitPlanMode`).

Prompt-based hooks (`type: "prompt"`): sends the hook input to a Claude model (Haiku by default) for a yes/no `{"ok": bool, "reason": "..."}` decision — use for judgment calls instead of deterministic shell logic. `continueOnBlock: true` feeds a `PreToolUse`/`PostToolUse` deny reason back to Claude to continue rather than ending the turn.

Agent-based hooks (`type: "agent"`, experimental): spawns a subagent with tool access (read files, run commands) before returning the same `ok`/`reason` shape; default timeout 60s, up to 50 tool-use turns.

## Notes

- Command hooks communicate only through stdout/stderr/exit code — they can't trigger `/` commands or tool calls directly.
- `PostToolUse` hooks can't undo actions since the tool already ran.
- `PreToolUse` hooks fire before any permission-mode check in every mode including `bypassPermissions`/`dontAsk` — a `deny` from a hook can't be bypassed by the user's permission mode, but an `allow` from a hook can't loosen deny rules or force-skip a required MCP `requiresUserInteraction` prompt either.
- JSON output requires exiting 0; if the JSON also carries `if` validation issues on exit 2, stderr is used as the blocking reason (v2.1.214+).
- Shell-form command hooks that source a profile with unconditional `echo` can corrupt the JSON on stdout — guard profile echoes with an interactive-shell check (`[[ $- == *i* ]]`).
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use, see anthropic-api-tools-mcp.

## Related

- [hooks.md](./hooks.md) — full event schema reference, decision-control tables, HTTP/MCP hook fields
