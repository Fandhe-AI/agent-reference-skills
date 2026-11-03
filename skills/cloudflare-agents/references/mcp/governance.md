---
source: https://developers.cloudflare.com/agents/model-context-protocol/protocol/governance/
---

# MCP governance

Control which MCP servers an organization uses and enforce access policies with Cloudflare Access MCP server portals.

## Signature / Usage

Governance is configured in Cloudflare Access (an MCP server portal), not in code. The source page contains no code. The snippet below is the remote MCP server entry point that a portal would front.

Snippet taken from https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/

```ts
import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";

function createServer() {
	return new McpServer({ name: "My MCP Server", version: "1.0.0" });
}

export default {
	fetch(request, env, ctx) {
		return createMcpHandler(createServer)(request, env, ctx);
	},
} satisfies ExportedHandler;
```

### What a portal governs

| Control | Meaning |
|---------|---------|
| Identity | Which users or groups may access specific MCP servers |
| Conditions | Required security posture, for example device health or location |
| Scope | Which tools within an MCP server are authorized |

Cloudflare Access logs MCP server requests and tool executions made through the portal.

## Notes

- "Shadow MCP" means unmanaged local MCP servers run against sensitive internal resources. Cloudflare recommends remote MCP servers over local installations so administrators can audit and control them.
- Distance lines: the protocol spec is the mcp-spec skill; Claude Code MCP configuration is anthropic-claude-code-extend; the Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk. The MCP server portal product is documented at https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/.

## Related

- [Build a Remote MCP server](./remote-mcp-server.md)
- [Authorization](./authorization.md)
