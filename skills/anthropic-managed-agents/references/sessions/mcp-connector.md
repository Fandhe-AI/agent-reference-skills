<!-- source: https://platform.claude.com/docs/en/managed-agents/mcp-connector / last verified: 2026-08-07 -->

# MCP connector

Connect Model Context Protocol (MCP) servers to a Managed Agents agent, giving it access to external tools, data sources, and services. Server declaration (agent creation) and authentication (session creation, via vaults) are separate steps, keeping secrets out of reusable agent definitions.

## Signature / Usage

```python
agent = client.beta.agents.create(
    name="GitHub Assistant",
    model="claude-opus-5",
    mcp_servers=[{"type": "url", "name": "github", "url": "https://api.githubcopilot.com/mcp/"}],
    tools=[
        {"type": "agent_toolset_20260401"},
        {"type": "mcp_toolset", "mcp_server_name": "github"},
    ],
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mcp_servers[].type` | string | Must be `"url"` |
| `mcp_servers[].name` | string | Unique per agent (1-255 chars); referenced by `mcp_toolset.mcp_server_name` |
| `mcp_servers[].url` | string | Remote MCP server endpoint (up to 2,048 chars) |
| `tools[].{type:"mcp_toolset"}.default_config` / `.configs` | object / array | Same shape as the built-in agent toolset; enable/disable and set `permission_policy` per MCP tool |

## Notes

- An agent can declare up to 20 MCP servers; every `mcp_servers` entry must have a matching `mcp_toolset`, and vice versa (dangling entries are rejected).
- MCP tool output over 100,000 characters (~25k tokens) is auto-written to a sandbox file with a truncated preview returned to the model.
- Authentication is supplied at session creation via `vault_ids`; credentials match by normalized `mcp_server_url` (scheme/host lowercased, default ports and trailing slashes stripped). No match falls back to unauthenticated connection.
- Session creation does not validate MCP connectivity/credentials up front; failures surface as `session.error` events (`mcp_connection_failed_error` or `mcp_authentication_failed_error`) and retry on the next idle→running transition.
- Scope: MCP connections made from a Managed Agents session. For the Messages API MCP connector, see the anthropic-api-tools-mcp skill.

## Related

- [Permission policies](./permission-policies.md)
- [Tools](./tools.md)
- [Authenticate with vaults](../environments/vaults.md)
