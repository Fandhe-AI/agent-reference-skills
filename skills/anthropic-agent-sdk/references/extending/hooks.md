<!-- source: https://code.claude.com/docs/en/agent-sdk/hooks / last verified: 2026-08-07 -->

# Intercept and Control Agent Behavior with Hooks

Callback functions that run your code in response to agent events (tool calls, session lifecycle, subagent activity) to block, log, transform, or approve operations.

## Signature / Usage

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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `matcher` | string | Pattern matched against tool name (or other event-specific field); `\|`/`,`-separated exact list, `*`/empty = all, else regex |
| `hooks` | HookCallback[] | Callback functions to run when matched |
| `timeout` | number | Seconds; defaults 600s most events, 30s `UserPromptSubmit`, 10s `MessageDisplay` |
| `permissionDecision` | `"allow"\|"deny"\|"ask"\|"defer"` | Set in `hookSpecificOutput` for `PreToolUse`; `deny` > `defer` > `ask` > `allow` |
| `updatedInput` | object | Replaces tool input in `hookSpecificOutput` (pair with `allow` or `ask`; ignored with `defer`) |
| `additionalContext` | string | `PostToolUse` — appends info to the tool result |
| `updatedToolOutput` | any | Replaces a tool's output before Claude sees it |
| `async` / `async_` | true | Signals async mode: agent continues without waiting (side effects only) |
| `systemMessage` | string | Message shown to the user (not the model) |
| `continue` / `continue_` | boolean | Whether the agent keeps running after this hook |

Key hook events (TypeScript-only unless noted "Yes/Yes"): `PreToolUse` (Yes/Yes), `PostToolUse` (Yes/Yes), `PostToolUseFailure` (Yes/Yes), `UserPromptSubmit` (Yes/Yes), `Stop` (Yes/Yes), `SubagentStart`/`SubagentStop` (Yes/Yes), `PreCompact` (Yes/Yes), `PermissionRequest` (Yes/Yes), `Notification` (Yes/Yes); `SessionStart`/`SessionEnd`, `PostCompact`, `PermissionDenied`, `Setup`, and many more are TypeScript-only.

## Notes

- Hooks passed in `options.hooks` combine with shell-command hooks from settings files (`.claude/settings.json`) when the matching `settingSources` entry is enabled.
- `SessionStart`/`SessionEnd` aren't available as Python SDK callback hooks (Python's `HookEvent` type omits them); use shell command hooks in settings files instead.
- All matching hooks for an event run in parallel; for permission decisions the most restrictive result wins (`deny` beats everything).
- This is Claude Agent SDK (library) programmatic hooks (`options.hooks`, `HookCallback`). The Claude Code CLI's own hooks (shell-command hooks configured in `.claude/settings.json`, invoked from the terminal) are documented under anthropic-claude-code-extend — SDK sessions can still load those shell-command hooks via `settingSources`.

## Related

- [Custom Tools](./custom-tools.md)
- [Subagents](./subagents.md)
