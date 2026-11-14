<!-- source: https://code.claude.com/docs/en/agent-sdk/todo-tracking.md / last verified: 2026-11-14 -->

# Todo Lists

Todo tracking provides a structured way to manage tasks and display progress to users. As of TypeScript Agent SDK 0.3.142 and Claude Code v2.1.142, sessions use the structured Task tools (`TaskCreate`, `TaskUpdate`, `TaskGet`, `TaskList`) instead of `TodoWrite`. The Python SDK inherits this from the launched Claude Code CLI version, not the pip package version.

## Signature / Usage

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

try {
  for await (const message of query({
    prompt: "Create a static website with a home page, an about page, and a shared stylesheet, and track progress with todos",
    // Keeps the Task tools on models where Claude Code otherwise doesn't provide them.
    options: { maxTurns: 15, permissionMode: "acceptEdits", env: { ...process.env, CLAUDE_CODE_ENABLE_TODO_TOOLS: "1" } },
  })) {
    if (message.type !== "assistant") continue;
    for (const block of message.message.content) {
      if (block.type !== "tool_use") continue;
      if (block.name === "TaskCreate") {
        const input = block.input as { subject: string };
        console.log(`+ ${input.subject}`);
      } else if (block.name === "TaskUpdate") {
        const input = block.input as {
          taskId?: string;
          id?: string;
          task_id?: string;
          status?: string;
        };
        const taskId = input.taskId ?? input.id ?? input.task_id;
        if (taskId && input.status) console.log(`  ${taskId} -> ${input.status}`);
      }
    }
  }
} catch (error) {
  // A single-shot query() throws after yielding an error result.
  console.log(`Session ended with an error: ${error}`);
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `env.CLAUDE_CODE_ENABLE_TODO_TOOLS` | `"1"` | Opts a session in to the task-tracking tools on models that don't have them by default. |
| `env.CLAUDE_CODE_ENABLE_TASKS` | `"0"` | Where the tools are available, provides `TodoWrite` instead of the four Task tools. |
| `allowedTools` / `allowed_tools`, `tools` | string[] | Naming a task-tracking tool in `allowedTools`, or listing it in `tools` (which restricts the session's built-in tools to the ones named), also opts a session in. |
| `TaskCreate` input | `{ subject, description, activeForm?, metadata? }` | Adds one task item. |
| `TaskUpdate` input | `{ taskId, status?, subject?, description?, activeForm?, addBlocks?, addBlockedBy?, owner?, metadata? }` | Patches one item by `taskId`; `status` is `pending`/`in_progress`/`completed`, or `deleted` to remove. |

## Notes

- Model availability (Claude Code v2.1.268+, bundled by TypeScript Agent SDK from v0.3.268): `TodoWrite`, `TaskCreate`, `TaskGet`, `TaskUpdate`, and `TaskList` are available by default only on Claude Opus 4.7, Claude Sonnet 4.6, Claude Haiku 4.5, and earlier models. On every other model, including model IDs Claude Code doesn't recognize, they aren't available unless you opt in. Wherever available, Claude Code provides the four Task tools, or `TodoWrite` instead when `CLAUDE_CODE_ENABLE_TASKS=0`.
- Task system messages (`SDKTaskNotificationMessage` in TypeScript, `TaskNotificationMessage` in Python) report background tasks such as backgrounded commands and subagents; todo activity itself appears as `tool_use` blocks in assistant messages.
- Todo lifecycle: created (`pending`) → activated (`in_progress`) → completed, or removed via `TaskUpdate` with `status: "deleted"`.
- Claude creates todos for multi-step work (3+ actions), user-provided task lists, non-trivial operations, or explicit requests; it may skip todos for short/single-step requests.
- Migrating from `TodoWrite` to Task tools: match `block.name === "TaskCreate"` or `"TaskUpdate"` instead of `"TodoWrite"`. The assigned task ID is not in the `TaskCreate` input — it comes back in the matching `tool_result` as `{ task: { id, subject } }`.
- Read `TaskUpdate` input fields defensively: the streamed `tool_use` input is the raw model output, and Claude Code repairs some key names (`id`/`task_id` → `taskId`, `active_form` → `activeForm`) only before execution, not in the stream.
- To render a complete list under Task tools, watch for a `TaskList` tool result in the stream or accumulate `TaskCreate` results and `TaskUpdate` inputs into a map keyed by task ID.
- Opt-in on models without the tools by default: name a tool in `allowedTools` / `allowed_tools`, list it in `tools`, or set `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` in `env` (as the usage example does). In TypeScript `env` replaces the subprocess environment, so spread `...process.env`; in Python `env` is merged over the inherited environment. Without opt-in on those models you see no `tool_use` blocks for them. Opt a session in only when your application reads those tool calls.
- If `pathToClaudeCodeExecutable` (TypeScript) or `cli_path` (Python) points at your own Claude Code install, you get whichever tools that install provides under its own defaults.
- The assigned task ID arrives on the user message carrying the `tool_result` block, in its `tool_use_result` field (`TaskCreateOutput`, `{ task: { id, subject } }`; a plain dict in Python). Pair each `tool_result` with its `tool_use` by `tool_use_id`. Claude can read the list back with `TaskList` and one task's details with `TaskGet`. Task progress displays can show `activeForm` for `in_progress` items instead of `subject`.
- A monitoring log of `TaskCreate` subjects can't match updates back to creates because the assigned IDs aren't in the `TaskCreate` input.
- After an `error_max_turns` result, single-shot `query()` raises an error including `Reached maximum number of turns`; wrap the loop in a try block.
- Source: https://code.claude.com/docs/en/agent-sdk/todo-tracking.md (fetched 2026-11-14)

## Related

- [streaming-output](./streaming-output.md)
- [streaming-vs-single-mode](./streaming-vs-single-mode.md)
