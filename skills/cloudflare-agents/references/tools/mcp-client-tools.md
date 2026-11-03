---
source: https://developers.cloudflare.com/agents/tools/mcp/
---

# MCP client tools

Connect an agent, as an MCP client, to external Model Context Protocol servers and pass the discovered tools into model calls.

## Signature / Usage

Adapted (not in the official docs): `stopWhen: stepCountIs(5)` is added; without it the AI SDK stops after one step, so the model never sees the tool results it requested. See Notes.

```ts
import { Agent } from "agents";
import { generateText, stepCountIs } from "ai";
import { createAI } from "agents/models/ai-sdk";

export class ToolAgent extends Agent<Env> {
	async onStart() {
		await this.addMcpServer("github", "https://mcp.github.com/mcp");
	}

	async onRequest(request: Request) {
		const ai = createAI({ binding: this.env.AI });

		const response = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Use available tools to summarize the latest issue activity.",
			tools: this.mcp.getAITools(),
			stopWhen: stepCountIs(5),
		});

		return new Response(response.text);
	}
}
```

Custom transport headers for servers that require bearer tokens or Cloudflare Access headers:

```ts
await this.addMcpServer("internal", this.env.MCP_SERVER_URL, {
	transport: {
		headers: {
			Authorization: `Bearer ${this.env.MCP_TOKEN}`,
			"CF-Access-Client-Id": this.env.CF_ACCESS_CLIENT_ID,
			"CF-Access-Client-Secret": this.env.CF_ACCESS_CLIENT_SECRET,
		},
	},
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `addMcpServer(name, url, options?)` | method | — | Connects to a remote MCP server. If the server requires OAuth, returns an authentication state and authorization URL. |
| `options.transport.headers` | object | — | Custom headers sent to the MCP server (bearer token, Cloudflare Access headers). |
| `this.mcp.getAITools()` | method | — | Returns the connected servers' tools in AI SDK form for `generateText` / `streamText`. |

## Notes

- Corrected from the official docs: the example omitted `stopWhen`, and AI SDK `generateText` / `streamText` stop after a single step by default, so a tool call is executed but no answer is generated from its result; `stopWhen: stepCountIs(5)` (an example limit) lets the model continue after tool results.
- Connections are persisted in the agent's SQL storage.
- Public MCP servers need no binding configuration. Keep server URLs, API tokens, and OAuth settings in environment variables or secrets (never in tool arguments, prompts, or source). Add local `.dev.vars` to `.gitignore`.
- Tool descriptions and results from an external MCP server are untrusted input to the model; connect only to servers you trust and require approval for tools with side effects (see [Code Mode with MCP](./codemode-mcp.md) for durable approvals).
- Scope: this page is the client side (agent consumes tools). The MCP protocol itself is covered by the mcp-spec skill; AI SDK `tool()` semantics are in vercel-ai-sdk. Building an MCP server is documented in [overview.md](../mcp/overview.md) and [remote-mcp-server.md](../mcp/remote-mcp-server.md)
- Client API reference: [client-api.md](../mcp/client-api.md)

## Related

- [Code Mode with MCP](./codemode-mcp.md)
- [AI SDK model provider](../models/ai-sdk.md)
