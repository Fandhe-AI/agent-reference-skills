---
source: https://developers.cloudflare.com/agents/model-context-protocol/guides/test-remote-mcp-server/
---

# Test a Remote MCP Server

Test a remote MCP server with MCP Inspector, the Workers AI Playground, Claude Code, Cursor, or Windsurf.

## Signature / Usage

```sh
npx @modelcontextprotocol/inspector
```

1. In the inspector, enter the server URL (for example `http://localhost:8788/mcp`) and select **Connect**.
2. If the server requires authentication, select **Open Auth settings** > **Quick OAuth Flow**, authenticate, then select **Connect**.
3. Select **List tools** to see what the server exposes.

### Other clients

Claude Code (this is the consuming side; it adds your deployed server as a client):

```sh
claude mcp add --transport http my-server https://my-mcp-server.my-account.workers.dev/mcp
```

Run `claude mcp list` to verify. Cursor (`.cursor/mcp.json` or `~/.cursor/mcp.json`):

Adapted (not in the official docs): `https://` instead of the source's `http://` for the deployed `workers.dev` URL. See Notes.

```json
{
	"mcpServers": {
		"my-server": {
			"url": "https://my-mcp-server.my-account.workers.dev/mcp"
		}
	}
}
```

Windsurf (`mcp_config.json`):

Adapted (not in the official docs): `https://` instead of the source's `http://` for the deployed `workers.dev` URL. See Notes.

```json
{
	"mcpServers": {
		"my-server": {
			"serverUrl": "https://my-mcp-server.my-account.workers.dev/mcp"
		}
	}
}
```

The Workers AI Playground (https://playground.ai.cloudflare.com/) accepts the server URL and lists its tools after you connect.

## Notes

- Adapted from the official docs: the source Cursor and Windsurf examples use `http://` for a `workers.dev` URL. Workers are served over HTTPS; use `https://` for deployed servers and reserve `http://` for `localhost`.
- The inspector prints a `MCP_PROXY_AUTH_TOKEN` in its URL. Treat it as a secret: do not log or share it.
- Remote, authorized connections are an evolving part of the MCP specification; not all MCP clients support them yet.
- Distance lines: `claude mcp add` is the Claude Code consuming side, covered by anthropic-claude-code-extend; the protocol spec is mcp-spec; the Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Build a Remote MCP server](./remote-mcp-server.md)
- [Transport](./transport.md)
