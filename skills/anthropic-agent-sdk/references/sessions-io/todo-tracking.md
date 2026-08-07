<!-- source: https://code.claude.com/docs/en/agent-sdk/todo-tracking.md / last verified: 2026-08-07 -->

# Todo Lists

Todo tracking provides a structured way to manage tasks and display progress to users. As of TypeScript Agent SDK 0.3.142 and Claude Code v2.1.142, sessions use the structured Task tools (`TaskCreate`, `TaskUpdate`, `TaskGet`, `TaskList`) instead of `TodoWrite`. The Python SDK inherits this from the launched Claude Code CLI version, not the pip package version.

## Signature / Usage

```typescript
for await (const message of query({
  prompt: "Optimize my React app performance and track progress with todos",
  // Re-enable TodoWrite instead of Task tools
  options: { maxTurns: 15, env: { ...process.env, CLAUDE_CODE_ENABLE_TASKS: "0" } }
})) {
  if (message.type === "assistant") {
    for (const block of message.message.content) {
      if (block.type === "tool_use" && block.name === "TodoWrite") {
        const todos = block.input.todos;
        // todos: [{ content, status, activeForm }, ...]
      }
    }
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `env.CLAUDE_CODE_ENABLE_TASKS` | `"0"` | Re-enables the legacy `TodoWrite` tool for monitoring instead of the default Task tools. |
| `TaskCreate` input | `{ subject, description, activeForm?, metadata? }` | Adds one task item. |
| `TaskUpdate` input | `{ taskId, status?, subject?, description?, activeForm?, addBlocks?, addBlockedBy?, owner?, metadata? }` | Patches one item by `taskId`; `status` is `pending`/`in_progress`/`completed`, or `deleted` to remove. |

## Notes

- Todo lifecycle: created (`pending`) → activated (`in_progress`) → completed, or removed via `TaskUpdate` with `status: "deleted"`.
- Claude creates todos for multi-step work (3+ actions), user-provided task lists, non-trivial operations, or explicit requests; it may skip todos for short/single-step requests.
- Migrating from `TodoWrite` to Task tools: match `block.name === "TaskCreate"` or `"TaskUpdate"` instead of `"TodoWrite"`. The assigned task ID is not in the `TaskCreate` input — it comes back in the matching `tool_result` as `{ task: { id, subject } }`.
- Read `TaskUpdate` input fields defensively: the streamed `tool_use` input is the raw model output, and Claude Code repairs some key names (`id`/`task_id` → `taskId`, `active_form` → `activeForm`) only before execution, not in the stream.
- To render a complete list under Task tools, watch for a `TaskList` tool result in the stream or accumulate `TaskCreate` results and `TaskUpdate` inputs into a map keyed by task ID.

## Related

- [streaming-output](./streaming-output.md)
- [streaming-vs-single-mode](./streaming-vs-single-mode.md)
