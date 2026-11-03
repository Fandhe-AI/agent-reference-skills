---
source: https://developers.cloudflare.com/agents/model-context-protocol/
---

# Model Context Protocol (MCP) on Cloudflare

Build and deploy remote MCP servers on Workers, and connect Cloudflare Agents to external MCP servers as an MCP client.

## Signature / Usage

Remote connections use Streamable HTTP for transport and OAuth for authorization; local connections use stdio.

Snippet taken from https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/

```ts
import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({
		name: "My MCP Server",
		version: "1.0.0",
	});

	server.registerTool(
		"hello",
		{
			description: "Returns a greeting message",
			inputSchema: { name: z.string().optional() },
		},
		async ({ name }) => {
			return {
				content: [{ text: `Hello, ${name ?? "World"}!`, type: "text" }],
			};
		},
	);

	return server;
}

export default {
	fetch(request, env, ctx) {
		return createMcpHandler(createServer)(request, env, ctx);
	},
} satisfies ExportedHandler;
```

### Terminology

| Term | Meaning |
|------|---------|
| Agents | AI assistants or applications that need external capabilities |
| MCP clients | Clients embedded in agents; each instance has a single connection to one MCP server |
| MCP servers | Applications that expose tools, prompts, and resources |

### Best practices

- Keep tool definitions out of the context window: expose a large API through a small search-and-execute interface (Code Mode) instead of one tool per operation.
- Use granular authorization: give each operation its own scopes and return an `insufficientScope()` challenge when a token lacks one (step-up authorization).
- Declare accurate `inputSchema` and `outputSchema` for every tool, and return `structuredContent` that matches `outputSchema`; strict clients reject mismatching results.

## Notes

- Distance lines: the protocol specification itself is the mcp-spec skill; consuming MCP from Claude Code is anthropic-claude-code-extend; the Claude API MCP connector is anthropic-api-tools-mcp; MCP in the OpenAI Agents SDK is openai-agents; publishing MCP apps to ChatGPT is openai-apps-sdk. This category covers building and publishing MCP servers on Workers and connecting as a client from a Cloudflare Agent.
- `createMcpHandler` is the current server API. `McpAgent` is deprecated and feature-frozen (see [McpAgent (deprecated)](./agent-api.md)).

## Related

- [Build a Remote MCP server](./remote-mcp-server.md)
- [createMcpHandler API](./handler-api.md)
- [MCP Client API](./client-api.md)
- [Authorization](./authorization.md)
- [Tools](./tools.md)
