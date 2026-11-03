---
source: https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/
---

# Transport

Streamable HTTP is the transport for remote MCP servers built with the Agents SDK; stdio is for local servers.

## Signature / Usage

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

### Transports

| Transport | Use |
|-----------|-----|
| stdio | Standard in/out, local MCP connections |
| Streamable HTTP | Single HTTP endpoint with bidirectional messaging; the standard for remote connections (introduced March 2025) |

### State without protocol sessions

The stateless handler has no MCP session. Keep cross-request data in a Durable Object, D1, KV, or R2, keyed by the authenticated user rather than an MCP session ID.

## Notes

- SSE was previously used for remote MCP and is deprecated in favor of Streamable HTTP. `createMcpHandler` serves Streamable HTTP only.
- To require OAuth, wrap the handler in `OAuthResourceServer`; the full setup is in [Authorization](./authorization.md).
- Distance lines: the transport specification is mcp-spec; Claude Code transport flags are anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [createMcpHandler API](./handler-api.md)
- [Authorization](./authorization.md)
- [Test a Remote MCP Server](./test-remote-mcp-server.md)
