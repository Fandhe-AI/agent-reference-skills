<!-- source: https://code.claude.com/docs/en/agent-sdk/permissions.md / last verified: 2026-08-07 -->

# Permission Modes, Tool Allowlists, and canUseTool

Pair `allowedTools` with a `permissionMode` for a locked-down agent, and use the `canUseTool` callback to handle approval requests that no static rule resolves.

```typescript
const options = {
  allowedTools: ["Read", "Glob", "Grep"],
  permissionMode: "dontAsk"
};
```

```python
async def handle_tool_request(tool_name, input_data, context):
    # Prompt user and return allow or deny
    ...


options = ClaudeAgentOptions(can_use_tool=handle_tool_request)
```

```typescript
async function handleToolRequest(toolName, input, options) {
  // options includes { signal: AbortSignal, suggestions?: PermissionUpdate[] }
  // Prompt user and return allow or deny
}

const options = { canUseTool: handleToolRequest };
```

## Notes

- Evaluation order: hooks → deny rules → ask rules (from `settings.json`) → permission mode → allow rules → `canUseTool` callback. A hook `allow` does not skip the deny/ask rules below it.
- `dontAsk`: anything not pre-approved is denied outright, `canUseTool` is never called. `acceptEdits`: auto-approves `Edit`/`Write` and filesystem commands (`mkdir`, `touch`, `rm`, `rmdir`, `mv`, `cp`, `sed`) within the working directory. `bypassPermissions`: approves everything except explicit `ask` rules — does NOT respect `allowedTools` as a restriction, so unlisted tools still run; requires `allowDangerouslySkipPermissions: true` in TypeScript and cannot run as root on Unix.
- `canUseTool` fires only when nothing earlier in the flow (hooks, deny/ask rules, permission mode, allow rules) has already resolved the call; an auto-approved tool never reaches it. It also fires for the `AskUserQuestion` tool when Claude needs clarification, not just for tool approval.
- Subagents inherit the parent's permission mode; an `AgentDefinition.permissionMode` can override it except when the parent uses `bypassPermissions`, `acceptEdits`, or `auto` (those apply unconditionally to every subagent).
