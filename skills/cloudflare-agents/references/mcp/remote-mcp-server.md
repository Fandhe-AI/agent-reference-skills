---
source: https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/
---

# Build a Remote MCP server

Deploy a remote MCP server on Workers over Streamable HTTP, with or without OAuth.

## Signature / Usage

Create from the template, run locally, then deploy:

```sh
npm create cloudflare@latest -- remote-mcp-server-authless --template=cloudflare/ai/demos/remote-mcp-authless
cd remote-mcp-server-authless
npm start
npx wrangler@latest deploy
```

When prompted, answer `No` to the AGENTS.md, git, and deploy questions (test before deploying). The local endpoint is `http://localhost:8788/mcp`; the deployed one is `https://remote-mcp-server-authless.your-account.workers.dev/mcp`.

Test locally with the inspector, then connect a client:

```sh
npx @modelcontextprotocol/inspector@latest
claude mcp add --transport http math https://remote-mcp-server-authless.your-account.workers.dev/mcp
```

### How the server works

The template builds the server with `createMcpHandler` from the Agents SDK. The handler is stateless: each request gets a fresh `McpServer` from a factory, so no Durable Object or session is needed. Persist data in KV, D1, a Durable Object, or R2.

### Add authentication

1. Build an authorization server Worker with `OAuthAuthorizationServer` (its `/authorize` page signs users in).
2. Wrap the MCP `createMcpHandler` in an `OAuthResourceServer`, which validates each token over a Service Binding.

MCP clients discover the authorization server from the `401` response. Tools read the signed-in user with `getMcpAuthContext()`.

## Notes

- Opening `/mcp` in a browser does nothing useful: the endpoint expects MCP protocol messages from an MCP client.
- An authless server accepts any client. Do not expose tools with side effects or private data without adding OAuth.
- `claude mcp add` is the Claude Code consuming side (anthropic-claude-code-extend).
- Existing `McpAgent` servers: see [Migrate to MCP SDK v2](./migrate-to-mcp-sdk-v2.md) and [McpAgent (deprecated)](./agent-api.md).
- Distance lines: the protocol spec is mcp-spec; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Authorization](./authorization.md)
- [Tools](./tools.md)
- [Test a Remote MCP Server](./test-remote-mcp-server.md)
- [createMcpHandler API](./handler-api.md)
