---
source: https://opencode.ai/docs/build/plugins/server/#mcp
---

# MCP

List MCP servers and manage them through transforms.

## Signature / Usage

```ts
const servers = await ctx.mcp.list()
```

Plugins manage MCP servers only through transforms. Use `editor.set` to add or replace a server, `editor.update` to change its configuration, and `editor.remove` to remove it. Inspect configuration with `editor.list` and `editor.get`.

```ts
await ctx.mcp.transform((editor) => {
  const servers = editor.list()
  const docs = editor.get("docs")
  editor.set("docs", { type: "remote", url: "https://mcp.example.com" })
  editor.update("docs", (server) => {
    server.disabled = false
  })
  editor.remove("legacy")
})
```

Set `disabled: true` in a transform to disable a server and disconnect it, or `disabled: false` to enable it and allow OpenCode to connect. OpenCode reconciles server lifecycle from the transformed configuration.

Call `reload()` after external state used by a transform changes to reapply transforms and reconcile the servers.

```ts
await ctx.mcp.reload()
```

### Reference

Schemas: [`Mcp.Server`](https://opencode.ai/docs/api/#schema-Mcp.Server), [`Mcp.LocalConfigEncoded`](https://opencode.ai/docs/api/#schema-Mcp.LocalConfigEncoded), [`Mcp.RemoteConfigEncoded`](https://opencode.ai/docs/api/#schema-Mcp.RemoteConfigEncoded)

```ts
interface MCPContext {
  list(input?: McpListInput, requestOptions?: RequestOptions): Promise<McpListOutput>
  transform(callback: (editor: MCPEditor) => void): Promise<Registration>
  reload(): Promise<void>
}

interface MCPEditor {
  list(): readonly (readonly [string, McpServerConfig])[]
  get(name: string): McpServerConfig | undefined
  set(name: string, config: McpServerConfig): void
  update(name: string, update: (config: McpServerConfig) => void): void
  remove(name: string): void
}
```

## Notes

- The MCP protocol specification is covered by the `mcp-spec` skill; Claude Code and Codex MCP configuration are covered by anthropic-claude-code-extend and openai-codex.
- This page covers a plugin managing MCP servers inside OpenCode, not the protocol.

## Related

- [Transforms](./transforms.md)
- [Tool API](./tool-api.md)
