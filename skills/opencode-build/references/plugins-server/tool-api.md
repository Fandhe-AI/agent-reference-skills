---
source: https://opencode.ai/docs/build/plugins/server/#tools
---

# Tools (API)

Read registered tools and register, update, and remove tools with a synchronous transform.

## Signature / Usage

Read the tools currently registered, after every transform, outside of a transform callback. Each tool has an `id` containing its effective name.

```ts
const tools = await ctx.tool.list()
const read = tools.find((tool) => tool.id === "read")
```

Register, update, and remove tools with a synchronous transform, including in Promise plugins. Load external data before registering or reloading. A later valid registration overrides the same effective tool name.

```ts
const registration = await ctx.tool.transform((editor) => {
  editor.namespace({
    name: "acme",
    description: "Customer account tools",
  })
  editor.add({
    name: "greeting",
    description: "Create a greeting",
    input: {
      type: "object",
      properties: { name: { type: "string" } },
      required: ["name"],
      additionalProperties: false,
    },
    options: { namespace: "acme", codemode: true },
    execute: async (input, context) => {
      await context.progress({ status: "greeting" })
      return { content: `Hello ${(input as { name: string }).name}!` }
    },
  })
})
```

Promise tool executors receive `context.signal`. Pass it to cancellable work such as `fetch` so stopping the Session also stops the underlying operation.

```ts
execute: async ({ url }, context) => {
  const response = await fetch(url, { signal: context.signal })
  return { content: await response.text() }
}
```

### Freeform tool input

A direct tool with exactly one required string field can let the model write that string without a JSON wrapper. Set `freeform` to `{ type: "text" }`, `{ type: "regex", pattern }`, or `{ type: "lark", grammar }`.

```ts
editor.add({
  name: "ticket",
  description: "Look up a ticket by ID",
  options: { codemode: false },
  input: Schema.Struct({ id: Schema.String }),
  freeform: { type: "regex", pattern: "OPS-[0-9]+" },
  execute: async ({ id }) => ({ content: await lookup(id) }),
})
```

If the selected model's API lists `regex` in models.dev, the model can write `OPS-42` directly. Otherwise Core omits **only** `freeform`: the model still has the `ticket` tool and calls it with `{"id":"OPS-42"}`. Missing or empty format lists mean no freeform support. The executor receives `{ id }` either way.

Inside Code Mode (`codemode: true`), a freeform tool takes its string directly, as in `await tools.ticket("OPS-42")`. `await tools.ticket({ id: "OPS-42" })` also works.

### Reload, update, remove, dispose

Call `reload()` after changing source data captured by the callback. Reload replays the active transforms without changing their order; it does not rerun plugin setup.

```ts
await ctx.tool.reload()
```

Use `list()` and `get()` to inspect tools currently in the editor. Tools have an `id` containing their effective name, and `get()` returns `undefined` when that ID is not present. Use `update` and `remove` with the effective tool name, including its namespace (`acme_greeting` above). Dots in namespaces and unsupported characters in tool names become `_`. Missing names are ignored; creating a tool requires `add` with a complete definition. Updates preserve the name and namespace. Assign new schemas or options to replace them rather than mutating nested values. Invalid updates are logged and leave the previous definition intact.

```ts
await ctx.tool.transform((editor) => {
  editor.update("acme_greeting", (tool) => {
    tool.description = "Greet the user by name"
  })
  editor.remove("acme_obsolete")
})
```

Updates and removals replay in order with additions, including after MCP catalog refreshes. Disposing their registration removes those changes and rebuilds from the remaining transforms.

Dispose a registration to remove its transform and rebuild from the remaining transforms, revealing any earlier definition it overrode. Disposal is idempotent, and unloading the plugin also disposes its registrations.

```ts
await registration.dispose()
```

Each model request captures a stable, executable tool snapshot. Later transforms, reloads, and disposal affect future snapshots, not the definitions, Code Mode namespace descriptions, or executors already captured. Executors that close over mutable plugin data still observe that data; capture a value inside the transform when it must remain tied to that definition.

### Reference

Schemas: [`Tool.Content`](https://opencode.ai/docs/api/#schema-Tool.Content), [`Tool.TextContent`](https://opencode.ai/docs/api/#schema-Tool.TextContent), [`Tool.FileContent`](https://opencode.ai/docs/api/#schema-Tool.FileContent)

```ts
interface ToolContext {
  list(): Promise<readonly (ToolInfo & { readonly id: string })[]>
  transform(callback: (editor: ToolEditor) => void): Promise<Registration>
  reload(): Promise<void>
}

interface ToolEditor {
  list(): readonly (ToolInfo & { readonly id: string })[]
  get(id: string): (ToolInfo & { readonly id: string }) | undefined
  namespace(namespace: { name: string; description: string }): void
  add(tool: ToolInfo): void
  update(id: string, update: (tool: Types.Mutable<ToolInfo>) => void): void
  remove(id: string): void
}
```

## Options / Props

Fields of a tool definition passed to `editor.add`, as shown in the examples:

| Name | Type | Description |
| --- | --- | --- |
| `name` | — | Tool name; combined with the namespace into the effective name (`acme_greeting`). |
| `description` | — | Tool description. |
| `input` | JSON Schema (also `Schema.Struct(...)` in the freeform example) | Input schema. |
| `options` | — | `{ namespace, codemode }` in the examples. |
| `freeform` | `{ type: "text" }`, `{ type: "regex", pattern }`, or `{ type: "lark", grammar }` | Lets the model write the single required string field without a JSON wrapper. |
| `execute` | — | Executor receiving the input and a context (`signal`, `progress`); returns `{ content }`. |

## Notes

- The freeform example uses `Schema.Struct` without an import in the official docs; it is transcribed as written.
- OpenCode tools are distinct from Claude Code tools and MCP tool definitions (anthropic-claude-code-extend).

## Related

- [Tool hooks](./tool-hooks.md)
- [Permission API](./permission-api.md)
- [Transforms](./transforms.md)
