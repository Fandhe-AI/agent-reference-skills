<!-- source: https://platform.claude.com/docs/en/managed-agents/mcp-connector / last verified: 2026-10-17 -->

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
- MCP tool output handling: output over 100,000 characters (~25k tokens) is auto-written to a file in the sandbox; the model receives a truncated preview with the file path and can read the full content from there.
- With a `limited` environment, session creation fails with a 400 error when the agent declares an MCP server whose host is not in the environment's `allowed_hosts`. Setting `allow_mcp_servers` to `true` in the environment's networking turns this check off.
- Authentication is supplied at session creation via `vault_ids`; credentials match by normalized `mcp_server_url` (scheme/host lowercased, default ports and trailing slashes stripped). No match falls back to unauthenticated connection.
- Session creation does not validate MCP connectivity/credentials up front (it only checks each declared server's host against the environment's networking, see above); failures surface as `session.error` events and the session still starts. The event carries the affected server's `mcp_server_name` and a `retry_status`; the connection is retried on the next `session.status_idle` to `session.status_running` transition. You can block further interaction, trigger a credential rotation, or let the session continue without that server's tools.

| Error type | Meaning |
|------------|---------|
| `mcp_connection_failed_error` | The MCP server could not be reached (network error, timeout, or non-authentication HTTP failure). |
| `mcp_authentication_failed_error` | Authentication failed: the server rejected the credential from the attached vault, required authentication when no matching credential was configured, or an OAuth token refresh failed. |
- Scope: MCP connections made from a Managed Agents session. For the Messages API MCP connector, see the anthropic-api-tools-mcp skill.

## Related

- [Permission policies](./permission-policies.md)
- [Tools](./tools.md)
- [Authenticate with vaults](../environments/vaults.md)
