<!-- source: https://code.claude.com/docs/en/agent-sdk/permissions.md , https://code.claude.com/docs/en/agent-sdk/user-input.md / last verified: 2026-10-17 -->

# Permission Modes, Tool Allowlists, and canUseTool

Pair `allowedTools` with a `permissionMode` for a locked-down agent, and use the `canUseTool` callback to handle approval requests that no static rule resolves.

```typescript
const options = {
  allowedTools: ["Read", "Glob", "Grep"],
  permissionMode: "dontAsk"
};
```

```python
from claude_agent_sdk import ClaudeAgentOptions
from claude_agent_sdk.types import PermissionResultDeny


async def handle_tool_request(tool_name, input_data, context):
    # Prompt the user here, then return PermissionResultAllow or PermissionResultDeny
    return PermissionResultDeny(message="User declined")


options = ClaudeAgentOptions(can_use_tool=handle_tool_request)
```

```typescript
import type { CanUseTool } from "@anthropic-ai/claude-agent-sdk";

const handleToolRequest: CanUseTool = async (toolName, input, options) => {
  // options includes { signal: AbortSignal, suggestions?: PermissionUpdate[] }
  // Prompt the user here, then return allow or deny
  return { behavior: "deny", message: "User declined" };
};

const options = { canUseTool: handleToolRequest };
```

## Notes

- Evaluation order: hooks → deny rules → ask rules (from `settings.json`) → permission mode → allow rules → `canUseTool` callback. A hook `allow` does not skip the deny/ask rules below it.
- `dontAsk`: anything not pre-approved is denied outright, `canUseTool` is never called. `acceptEdits`: auto-approves `Edit`/`Write` and filesystem commands (`mkdir`, `touch`, `rm`, `rmdir`, `mv`, `cp`, `sed`) within the working directory. `bypassPermissions`: approves everything except explicit `ask` rules — does NOT respect `allowedTools` as a restriction, so unlisted tools still run; requires `allowDangerouslySkipPermissions: true` in TypeScript and cannot run as root on Unix.
- `canUseTool` fires only when nothing earlier in the flow (hooks, deny/ask rules, permission mode, allow rules) has already resolved the call; an auto-approved tool never reaches it. It also fires for the `AskUserQuestion` tool when Claude needs clarification, not just for tool approval.
- TypeScript: passing `canUseTool` with `permissionMode: 'bypassPermissions'` or with a bare `allowedTools` entry such as `"Read"` makes the SDK emit a Node.js process warning once at query construction, with code `CLAUDE_SDK_CAN_USE_TOOL_SHADOWED`. Entries with a specifier such as `Bash(ls *)` and `acceptEdits` do not trigger it. To gate every tool call regardless of mode and rules, use a `PreToolUse` hook.
- `plan` mode: file edits are never auto-approved, even when an allow rule matches, and prompt through `canUseTool`. On Claude Code v2.1.212 or later, shell commands that modify files, such as `touch` and `rm`, reach `canUseTool` the same way.
- Subagents inherit the parent's permission mode; an `AgentDefinition.permissionMode` can override it except when the parent uses `bypassPermissions`, `acceptEdits`, or `auto` (those apply unconditionally to every subagent).
