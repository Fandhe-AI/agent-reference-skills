---
source: https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/
---

# Cloudflare's own MCP servers

Managed remote MCP servers run by Cloudflare, reachable over Streamable HTTP at `/mcp` with OAuth.

## Signature / Usage

Add to an MCP client configuration:

```json
{
	"mcpServers": {
		"cloudflare-api": {
			"url": "https://mcp.cloudflare.com/mcp"
		}
	}
}
```

The client is redirected to Cloudflare to authorize via OAuth and choose permissions. For CI/CD, pass a Cloudflare API token (user or account token) as a bearer token in the `Authorization` header.

### Cloudflare API MCP server

`https://mcp.cloudflare.com/mcp` covers the whole Cloudflare API (over 2,500 endpoints) and the developer documentation through three tools: `search()` and `execute()` to find and call API endpoints, and `docs()` to search documentation. It uses the search-and-execute Code Mode pattern; generated code runs in an isolated Dynamic Worker sandbox.

| Approach | Tools | Token cost |
|----------|-------|------------|
| Native MCP (full schemas) | 2,594 | ~1,170,000 |
| Native MCP (required params only) | 2,594 | ~244,000 |
| Code Mode | 2 | ~1,000 |

### Product-specific servers (optional)

| Server | Description | URL |
|--------|-------------|-----|
| Documentation | Up-to-date Cloudflare reference | `https://docs.mcp.cloudflare.com/mcp` |
| Container | Sandbox development environment | `https://containers.mcp.cloudflare.com/mcp` |
| Browser Run | Fetch pages, convert to markdown, screenshots | `https://browser.mcp.cloudflare.com/mcp` |
| Digital Experience Monitoring | Insight on critical applications | `https://dex.mcp.cloudflare.com/mcp` |
| Cloudflare One CASB | SaaS misconfiguration checks | `https://casb.mcp.cloudflare.com/mcp` |
| Agents SDK Documentation | Token-efficient Agents SDK docs search | `https://agents.cloudflare.com/mcp` |

### Cloudflare Skills plugin

The source also describes installing the `cloudflare/skills` GitHub plugin (bundles these MCP servers with contextual skills and slash commands). Claude Code installs it from the plugin marketplace:

```txt
/plugin marketplace add cloudflare/skills
```

Other agents use `npx skills add https://github.com/cloudflare/skills` or copy skill folders into the agent's skills directory.

## Notes

- Three different things are called "skills" nearby: (1) the `cloudflare/skills` GitHub plugin above, installed into coding agents; (2) the Agents SDK runtime feature documented in the Agent skills (agents SDK) category (`../agent-skills/overview.md`); (3) this repository's reference skills installed with its own CLI. They are independent.
- Treat API tokens as secrets: use a token with only the permissions needed and keep it in a secret store, not in committed MCP config.
- The servers support the MCP 2026-07-28 specification and stateless requests from 2025 Streamable HTTP clients.
- Distance lines: the protocol spec is mcp-spec; connecting these servers from Claude Code is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Build a Code Mode MCP server](./build-codemode-mcp-server.md)
- [Cloudflare Community MCP Server](./community-mcp-server.md)
- [Test a Remote MCP Server](./test-remote-mcp-server.md)
