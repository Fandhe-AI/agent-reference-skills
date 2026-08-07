<!-- source: https://code.claude.com/docs/en/hooks-guide.md / last verified: 2026-08-07 -->

# Block edits to protected files with a PreToolUse hook

Prevent Claude from modifying sensitive files (`.env`, `package-lock.json`, `.git/`) by running a script before every `Edit`/`Write` call; the script exits 2 to block, and Claude receives the reason as feedback.

```bash .claude/hooks/protect-files.sh
#!/bin/bash
# protect-files.sh

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Normalize Windows backslash separators so the patterns below match
FILE_PATH="${FILE_PATH//\\//}"

PROTECTED_PATTERNS=(".env" "package-lock.json" ".git/")

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2
  fi
done

exit 0
```

```json .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      }
    ]
  }
}
```

## Notes

- Make the script executable first: `chmod +x .claude/hooks/protect-files.sh`.
- Exit codes: `0` = no objection, normal permission flow applies; `2` = block, stderr becomes Claude's feedback; any other code = action proceeds but shows a non-blocking hook-error notice.
- `PreToolUse` hooks fire before any permission-mode check in every mode, including `bypassPermissions` — a `deny` from a hook cannot be bypassed by the user's permission mode.
- For structured JSON control (`allow`/`deny`/`ask`) instead of exit codes, print `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": "..."}}` to stdout and exit 0; don't mix exit 2 with JSON output.
- This is a Claude Code CLI feature. For the Agent SDK, see anthropic-agent-sdk. For the Claude API side, see anthropic-api-tools-mcp.
