<!-- source: https://code.claude.com/docs/en/agent-sdk/hooks.md / last verified: 2026-08-07 -->

# PreToolUse Hook to Block a Tool Call

Register a `PreToolUse` hook that inspects a tool's input and denies the call before it runs.

```typescript
import { query, HookCallback, PreToolUseHookInput } from "@anthropic-ai/claude-agent-sdk";

const protectEnvFiles: HookCallback = async (input, toolUseID, { signal }) => {
  const preInput = input as PreToolUseHookInput;
  const toolInput = preInput.tool_input as Record<string, unknown>;
  const fileName = (toolInput?.file_path as string)?.split("/").pop();

  if (fileName === ".env") {
    return {
      hookSpecificOutput: {
        hookEventName: preInput.hook_event_name,
        permissionDecision: "deny",
        permissionDecisionReason: "Cannot modify .env files"
      }
    };
  }
  return {};
};

for await (const message of query({
  prompt: "Create a .env file",
  options: { hooks: { PreToolUse: [{ matcher: "Write|Edit", hooks: [protectEnvFiles] }] } }
})) {
  console.log(message);
}
```

```python
async def protect_env_files(input_data, tool_use_id, context):
    file_name = input_data["tool_input"].get("file_path", "").split("/")[-1]
    if file_name == ".env":
        return {
            "hookSpecificOutput": {
                "hookEventName": input_data["hook_event_name"],
                "permissionDecision": "deny",
                "permissionDecisionReason": "Cannot modify .env files",
            }
        }
    return {}

options = ClaudeAgentOptions(
    hooks={"PreToolUse": [HookMatcher(matcher="Write|Edit", hooks=[protect_env_files])]}
)
```

## Notes

- `matcher` is compared against the tool name (`Write|Edit` here); `*`/empty matches all, otherwise it's treated as regex.
- All matching hooks for an event run in parallel; for permission decisions the most restrictive result wins (`deny` beats `defer` beats `ask` beats `allow`).
- `SessionStart`/`SessionEnd` are not available as Python SDK callback hooks; use shell-command hooks in `.claude/settings.json` instead (loaded when the matching `settingSources` entry is enabled).
- This is programmatic `options.hooks`. The Claude Code CLI's own shell-command hooks (configured in `.claude/settings.json`, invoked from the terminal) are documented under anthropic-claude-code-extend — SDK sessions can still load those shell-command hooks via `settingSources`.
