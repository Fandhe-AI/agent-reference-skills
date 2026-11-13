---
source: https://opencode.ai/docs/build/plugins/migrate-v1/
---

# Add a Custom Tool

Register a model-callable tool with a synchronous `ctx.tool.transform` editor.

```ts
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "greeting",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.add({
        name: "greeting",
        description: "Create a greeting",
        input: {
          type: "object",
          properties: { name: { type: "string" } },
          required: ["name"],
          additionalProperties: false,
        },
        async execute(input) {
          return { content: `Hello ${(input as { name: string }).name}!` }
        },
      })
    })
  },
})
```

## Notes

- Tool input schemas are JSON Schema; `execute` returns structured content such as `{ content: string }`.
- Keep the transform callback synchronous, cheap, and free of one-time side effects. Load external data before registering and call `ctx.tool.reload()` when it changes.
- Example taken from the V1 migration guide (V2 version). In `execute(input, context)`, `context.signal` can be passed to cancellable work such as `fetch`.
- OpenCode plugins and tools are distinct from Claude Code plugins and MCP tools (anthropic-claude-code-extend); the MCP protocol itself is `mcp-spec`.
