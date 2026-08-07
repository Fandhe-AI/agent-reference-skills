<!-- source: https://code.claude.com/docs/en/agent-sdk/user-input.md / last verified: 2026-08-07 -->

# Handle approvals and user input

Surface Claude's tool-approval requests and clarifying questions (`AskUserQuestion`) to users via the `canUseTool` callback, then return their decisions to the SDK.

## Signature / Usage

```typescript
canUseTool: async (toolName, input) => {
  console.log(`Claude wants to use ${toolName}`);
  const approved = await askUser("Allow this action?");
  if (approved) {
    return { behavior: "allow", updatedInput: input };
  }
  return { behavior: "deny", message: "User declined" };
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `toolName` (arg 1) | string | Tool Claude wants to use, e.g. `"Bash"`, `"Write"`, `"AskUserQuestion"` |
| `input` (arg 2) | object | Tool-specific parameters (e.g. `Bash`: `command`, `description`, `timeout`) |
| `options` (TS) / `context` (Python) (arg 3) | object | Includes `suggestions` (`PermissionUpdate[]`) and a cancellation signal |
| Allow response | `{ behavior: "allow", updatedInput }` / `PermissionResultAllow(updated_input=...)` | Tool runs with (possibly modified) input |
| Deny response | `{ behavior: "deny", message }` / `PermissionResultDeny(message=...)` | Tool blocked; Claude sees the message and may adjust |

## Notes

- The callback fires only when nothing earlier in the permission evaluation flow resolved the call; auto-approved tools (via allow rule, `acceptEdits`, `bypassPermissions`) never reach it. Use a `PreToolUse` hook for checks that must apply to every call regardless.
- `AskUserQuestion` triggers the same callback with `toolName === "AskUserQuestion"`; input contains a `questions` array (1-4 questions, 2-4 options each) with `question`, `header` (≤12 chars), `options[].{label,description}`, `multiSelect`.
- Response to `AskUserQuestion` must include the original `questions` array plus an `answers` object mapping each question text to the selected option label(s); optional `response` field for freeform replies not tied to a specific question.
- "Approve and remember": echo a `suggestions` entry with `destination: "localSettings"` back as `updatedPermissions` to persist the rule to `.claude/settings.local.json`.
- In Python, `can_use_tool` requires streaming mode; a finite prompt generator closes the input stream before the callback can run unless a hook or in-process MCP server keeps it open.
- `AskUserQuestion` is not currently available in subagents spawned via the `Agent` tool.
- TypeScript-only: `toolConfig.askUserQuestion.previewFormat` (`"markdown"` or `"html"`) adds a `preview` field to each option for visual mockups; `<script>`/`<style>`/`<!DOCTYPE>` are rejected before the callback runs.

## Related

- [Configure permissions](./permissions.md)
