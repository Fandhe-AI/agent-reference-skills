<!-- source: https://code.claude.com/docs/en/agent-sdk/hooks / last verified: 2026-11-14 -->

# Intercept and Control Agent Behavior with Hooks

Callback functions that run your code in response to agent events (tool calls, session lifecycle, subagent activity) to block, log, transform, or approve operations.

## Signature / Usage

```typescript
import { query, HookCallback, PreToolUseHookInput } from "@anthropic-ai/claude-agent-sdk";

const protectEnvFiles: HookCallback = async (input, toolUseID, { signal }) => {
  const preInput = input as PreToolUseHookInput;
  const toolInput = preInput.tool_input as Record<string, unknown>;
  const filePath = toolInput?.file_path as string;
  const fileName = filePath?.split("/").pop();

  if (fileName?.toLowerCase() === ".env") {
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
    file_path = input_data["tool_input"].get("file_path", "")
    file_name = file_path.split("/")[-1]
    if file_name.lower() == ".env":
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

### Block the action when a callback fails

On most events a callback that throws, returns output that fails validation, or returns nothing (a path with no `return`) lets the action go ahead; the app receives an `SDKInformationalMessage` whose `tag` is `hook_callback_failed` (Python: read `tag` from `SystemMessage.data`). Set `onFailure: "block"` (Python `on_failure="block"`) on the matcher to block instead. Requires TypeScript Agent SDK v0.3.317+ or Python Agent SDK v0.2.177+.

```typescript
import type { Options } from "@anthropic-ai/claude-agent-sdk";

const options: Options = {
  hooks: {
    PreToolUse: [{ matcher: "Bash", hooks: [checkPolicy], onFailure: "block" }]
  }
};
```

```python
options = ClaudeAgentOptions(
    hooks={
        "PreToolUse": [
            HookMatcher(matcher="Bash", hooks=[check_policy], on_failure="block")
        ]
    }
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `matcher` | string | Pattern matched against tool name (or other event-specific field); `\|`/`,`-separated exact list, `*`/empty = all, else regex. Follows the settings-file matcher rules. MCP tools use `mcp__<server>__<action>` |
| `hooks` | HookCallback[] | Required. Callback functions to run when matched |
| `timeout` | number | Seconds; defaults 600s most events, 30s `UserPromptSubmit` / `PreModelSwitch` / `PostModelSwitch`, 10s `MessageDisplay`; `SessionEnd` runs under a 1.5s shutdown budget by default |
| `onFailure` (`on_failure`) | `"continue"` \| `"block"` | What a failed callback does; `"block"` blocks the action (TS v0.3.317+ / Python v0.2.177+) |
| `permissionDecision` | `"allow"\|"deny"\|"ask"\|"defer"` | Set in `hookSpecificOutput` for `PreToolUse`; `deny` > `defer` > `ask` > `allow`. `"defer"` ends the turn with a result whose `stop_reason` is `"tool_deferred"` so the call can be resumed later |
| `updatedInput` | object | Replaces tool input in `hookSpecificOutput` (pair with `allow` or `ask`; ignored with `defer`) |
| `additionalContext` | string | `PostToolUse` — appends info to the tool result |
| `updatedToolOutput` | any | Replaces a tool's output before Claude sees it; works for built-in and MCP tools in both SDKs (older `updatedMCPToolOutput` replaces MCP tool output only) |
| `async` / `async_` | true | Signals async mode: agent continues without waiting (side effects only) |
| `asyncTimeout` | number | Optional timeout in milliseconds for the background operation (returned with `async`) |
| `classifierContext` | string | `PostToolUse` only, TypeScript only (SDK v0.3.236+): short note about the tool result for the auto mode permission classifier |
| `systemMessage` | string | Message shown to the user (not the model) |
| `continue` / `continue_` | boolean | Whether the agent keeps running after this hook |

Hook events available in both SDKs: `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `UserPromptSubmit`, `Stop`, `SubagentStart`, `SubagentStop`, `PreCompact`, `PermissionRequest`, `Notification`.

TypeScript-only events: `PostToolBatch`, `UserPromptExpansion`, `MessageDisplay`, `StopFailure`, `PostCompact`, `PreModelSwitch`, `PostModelSwitch`, `PermissionDenied`, `SessionStart`, `SessionEnd`, `Setup`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `Elicitation`, `ElicitationResult`, `ConfigChange`, `InstructionsLoaded`, `WorktreeCreate`, `WorktreeRemove`, `CwdChanged`, `FileChanged`, `DirectoryAdded`.

## Notes

- Hooks passed in `options.hooks` combine with shell-command hooks from settings files (`.claude/settings.json`) when the matching `settingSources` entry is enabled.
- `SessionStart`/`SessionEnd` aren't available as Python SDK callback hooks (Python's `HookEvent` type omits them); use shell command hooks in settings files instead.
- The `.env` example matcher `Write|Edit` covers only those tools: a Bash command that writes `.env` does not trigger it (use sandbox configuration to block Bash writes). On Windows `file_path` uses backslashes, so the example's `split("/")` check allows `C:\project\.env`.
- With a `Bash` matcher, callbacks also run on `PreToolUse` and `PermissionRequest` for Monitor commands on Claude Code v2.1.314+; they can deny but not approve those.
- `onFailure: "block"` exceptions: `Stop`, `SubagentStop`, `TaskCompleted` and `TeammateIdle` ignore it; for `PermissionRequest` the block counts only if it arrives before your `canUseTool` callback answers; for `PostToolUse` the tool has already run, so Claude receives the failure as feedback. A timeout with `"block"` also blocks `PreCompact`, `Elicitation` and `WorktreeCreate`. The query fails at startup (no prompt sent) if Claude Code does not honor the option (error includes `does not honor`) or the running session did not register your hooks (`did not register your hooks`).
- `Notification` also fires `plugin_notification` when a mod calls `$.ui.notify`. The first time a `Stop` or `SessionStart` callback times out in the main session, an `SDKInformationalMessage` is added to the stream.
- `updatedInput` must sit inside `hookSpecificOutput` (not top level) together with `hookEventName`; always return a new object rather than mutating `tool_input`.
- All matching hooks for an event run in parallel; for permission decisions the most restrictive result wins (`deny` beats everything).
- Timeout behavior by event (the callback is cancelled and its output discarded; the session continues):
  - `PreToolUse`: the tool call is not run and Claude receives a tool result saying the hook did not respond before its timeout (before v2.1.210 it was reported as a user rejection). An explicit deny from another `PreToolUse` hook takes precedence.
  - `PostToolUse` / `PostToolUseFailure`: the tool result is kept and the turn continues.
  - `UserPromptSubmit` / `UserPromptExpansion`: the prompt is blocked with a message naming the hook and the timeout, and the session continues (before v2.1.208 the query ended with `error_during_execution`).
  - `Stop` / `SubagentStop`: counts as no decision (before v2.1.273 it counted as a failed hook run and the decisions of other hooks on the event were discarded).
  - `SessionStart`: counts as no output.
  - `PreModelSwitch`: the model switch is blocked.
  - Other events (`Notification`, `PreCompact`, `PostModelSwitch`, ...): the failure is logged and execution continues.
  - If you interrupt the query while a `PreToolUse` callback is pending, the pending tool call is cancelled (before v2.1.208 it could still proceed).
- `Notification` hooks in SDK sessions: `permission_prompt` fires once a permission request has waited about six seconds on the `canUseTool` callback (TypeScript SDK v0.3.233+ / Python SDK v0.2.139+); `elicitation_complete` and `elicitation_response` also fire. Types such as `idle_prompt`, `auth_success`, `elicitation_dialog` come from interactive UI that SDK sessions don't run.
- `systemMessage` is shown to the user, not the model. On Claude Code v2.1.227+ it can surface in the message stream as an `SDKInformationalMessage` (depends on the event); before v2.1.227 hook output was surfaced in the stream only for `SessionStart` and `Setup`.
- This is Claude Agent SDK (library) programmatic hooks (`options.hooks`, `HookCallback`). The Claude Code CLI's own hooks (shell-command hooks configured in `.claude/settings.json`, invoked from the terminal) are documented under anthropic-claude-code-extend — SDK sessions can still load those shell-command hooks via `settingSources`.
- Source: https://code.claude.com/docs/en/agent-sdk/hooks (fetched 2026-11-14)

## Related

- [Custom Tools](./custom-tools.md)
- [Subagents](./subagents.md)
