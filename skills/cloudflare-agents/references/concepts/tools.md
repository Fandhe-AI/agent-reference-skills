---
source: https://developers.cloudflare.com/agents/concepts/tools/
---

# Tools

Tools let models retrieve information, process data, and perform actions. Tool design involves three independent choices: model interface, execution location, and tool source.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/agents/runtime/capabilities/mcp-client-manager/ (passing MCP tools directly to a model):

```ts
const { text } = await generateText({
	model,
	prompt: await request.text(),
	tools: this.mcp.getAITools(),
	stopWhen: stepCountIs(5),
});
```

## Options / Props

Model interface:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Direct tool calls | interface | — | Model receives individual tool definitions; each result returns to the model before the next call. Use for simple tasks with a small known tool set. |
| Code Mode | interface | — | Model receives one code tool and writes JavaScript against typed tool interfaces; intermediate results stay in the sandbox. Use for composition, dependent calls, filtering, branching, repeatable logic, or tool discovery. |

Execution location:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Worker | location | — | API calls, SQL, server-side bindings and secrets (server-side tools in chat agents). |
| Browser | location | — | Geolocation, clipboard, local storage, other browser APIs (client-side tools). |
| Another Agent | location | — | A chat-capable Agent executes as a retained, streaming tool (agents as tools). |

## Notes

- Interface and location are independent: tools in each location can be exposed directly or through Code Mode. With Code Mode, generated code runs in a sandbox and its calls cross the boundary to the tool implementation (server tools in the host Worker, browser-owned tools in the parent page, agent tools delegated to another Agent).
- Code Mode supports progressive discovery (search connectors, request detailed types only for needed methods) and saving successful programs as snippets.
- MCP describes the source and transport of a tool, not how the model invokes it. Pass MCP tools directly via the Agents MCP client, or expose them inside Code Mode via MCP connectors. An MCP server can also expose Code Mode itself (a `code` tool, or `search` and `execute`).
- Approval policy is independent of location and source: direct tools use the human-in-the-loop approval pattern; the durable Code Mode runtime can pause generated code before an annotated connector method runs, replay completed calls from the execution log, apply the approved action, and continue.
- Callables (client-invoked methods) are for app clients, tools are for actions the model chooses.
- Tool pages for workspace, sandbox, browser, web, AI Search, payments, Code Mode are in the `tools/` category: see [codemode-overview.md](../tools/codemode-overview.md), [sandbox.md](../tools/sandbox.md), [browser.md](../tools/browser.md), [filesystem.md](../tools/filesystem.md), [ai-search.md](../tools/ai-search.md), [payments-overview.md](../tools/payments-overview.md).

## Related

- [MCPClientManager](../runtime/mcp-client-manager.md)
- [WebSockets](../runtime/websockets.md)
- [Agent patterns](./agentic-patterns.md)
