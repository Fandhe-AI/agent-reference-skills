<!-- source: https://code.claude.com/docs/en/agent-sdk/user-input.md / last verified: 2026-11-14 -->

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
| `updatedPermissions` (allow) | `PermissionUpdate[]` | "Approve and remember": echo `suggestions` entries (e.g. `destination === "localSettings"`) to persist rules. Python needs `claude-agent-sdk` 0.1.80+ |
| `answers` (AskUserQuestion allow) | `Record<string, string \| string[]>` | Keys are the `question` text, values the selected option `label` (array, or labels joined with `", "`, for multi-select; user's own text for free-text answers) |
| `response` (AskUserQuestion allow) | string | Optional freeform reply that is not an answer to a specific question; Claude then receives "The user responded: …" instead of the per-question answer list |
| `toolConfig.askUserQuestion.previewFormat` | `"markdown"` \| `"html"` | TypeScript only. Unset (default): no `preview` field and Claude does not generate previews. `"markdown"`: ASCII art / fenced code blocks. `"html"`: styled `<div>` fragment. Applies to every question in the session |

## Notes

- The callback fires only when nothing earlier in the permission evaluation flow resolved the call; auto-approved tools (via allow rule, `acceptEdits`, `bypassPermissions`) never reach it. Use a `PreToolUse` hook for checks that must apply to every call regardless.
- `AskUserQuestion` triggers the same callback with `toolName === "AskUserQuestion"`; input contains a `questions` array (1-4 questions, 2-4 options each) with `question`, `header` (≤12 chars), `options[].{label,description}`, `multiSelect`.
- When allowing, `updatedInput` (TypeScript) / `updated_input` (Python) can be omitted: the tool runs with the input Claude requested. Before v2.1.207, Claude Code rejected an allow result that omitted it and denied the call with a validation error.
- TypeScript: skip the always-allow choice for a request whose canUseTool options carry `suppressAlwaysAllowRule: true`. Requires TypeScript Agent SDK v0.3.268 or later; the Python `context` doesn't carry it.
- Response to `AskUserQuestion` must include the original `questions` array plus an `answers` object mapping each question text to the selected option label(s); optional `response` field for freeform replies not tied to a specific question.
- "Approve and remember": echo a `suggestions` entry with `destination: "localSettings"` back as `updatedPermissions` to persist the rule to `.claude/settings.local.json`.
- In Python, `can_use_tool` requires streaming mode; a finite prompt generator closes the input stream before the callback can run unless a hook or in-process MCP server keeps it open.
- `AskUserQuestion` is not currently available in subagents spawned via the `Agent` tool.
- Option previews (TypeScript): with `previewFormat` set, Claude includes `preview` on options where a visual comparison helps (layouts, color schemes) and omits it for yes/no or text-only choices, so check for `undefined` before rendering. The SDK rejects `<script>`, `<style>`, and `<!DOCTYPE>` in HTML previews before the callback runs.
- Claude generates the questions and options; you cannot add your own questions to this flow. For free-text answers, show an extra "Other" choice and use the user's text (not the word "Other") as the `answers` value. If you pass a `tools` array, include `AskUserQuestion` or Claude cannot ask clarifying questions. Clarifying questions are common in `plan` mode.
- The callback can stay pending indefinitely and execution stays paused. If a user may take longer than your process can stay running, register a `PreToolUse` hook that returns the `defer` decision instead, so the process can exit and resume later from the persisted session. A `PermissionRequest` hook can send external notifications (Slack, email, push) while Claude waits for approval.
- In some configurations (such as `dontAsk` mode) Claude Code never calls the callback; the permission evaluation flow lists them.
- Limits: each `AskUserQuestion` call has 1-4 questions with 2-4 options each. To redirect Claude entirely, use streaming input to send a new instruction.
- Source: https://code.claude.com/docs/en/agent-sdk/user-input (fetched 2026-11-14)

## Related

- [Configure permissions](./permissions.md)
