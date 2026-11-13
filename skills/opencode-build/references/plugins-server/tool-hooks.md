---
source: https://opencode.ai/docs/build/plugins/server/#hooks
---

# Tool Hooks

Inspect or replace tool input before execution, and inspect results or failures after execution.

## Signature / Usage

Inspect or replace tool input before execution.

```ts
await ctx.tool.hook("execute.before", (event) => {
  if (event.tool === "read") console.log(event.input)
})
```

Inspect successful results or failures after execution.

```ts
await ctx.tool.hook("execute.after", (event) => {
  if (event.status === "completed") event.result = { ...event.result, metadata: { observed: true } }
  if (event.status === "error") console.error(event.error.message)
})
```

### Reference

```ts
interface ToolHooks {
  "execute.before": ToolExecuteBefore
  "execute.after": ToolExecuteCompleted | ToolExecuteFailed
}

interface ToolHookContext {
  hook<Name extends keyof ToolHooks>(
    name: Name,
    callback: (event: ToolHooks[Name]) => Promise<void> | void,
  ): Promise<Registration>
}
```

## Notes

- The official docs do not list the fields of `ToolExecuteBefore`, `ToolExecuteCompleted`, or `ToolExecuteFailed`; the examples use `event.tool`, `event.input`, `event.status`, `event.result`, and `event.error.message`.
- V1 `tool.execute.before` / `tool.execute.after` migrate here.
- OpenCode plugin hooks are distinct from Claude Code PreToolUse / PostToolUse hooks (anthropic-claude-code-extend).

## Related

- [Tool API](./tool-api.md)
- [Shell hooks](./shell-hooks.md)
- [Migrate plugins from V1](./migrate-v1.md)
