# MCP Connections

An MCP server publishes tool definitions and runs tool calls. The Agents API discovers the tools, calls the server, and returns results to the agent without your application handling each call.

## Signature / Usage

Connect from OpenAI (works with or without an environment):

```json
{
  "type": "mcp",
  "server_label": "openai_docs",
  "transport": {
    "type": "http",
    "server_url": "https://developers.openai.com/mcp"
  },
  "connection_origin": "service",
  "required": true
}
```

Start a server over stdio in the environment:

```json
{
  "type": "mcp",
  "server_label": "customer_lookup",
  "transport": {
    "type": "stdio",
    "command": "/workspace/mcp-demo/bin/python",
    "args": ["/workspace/lookup_mcp.py", "stdio"],
    "cwd": "/workspace"
  },
  "required": true
}
```

## Options / Props

| Connection | Where it runs | Requires an environment |
|------------|---------------|-------------------------|
| HTTP with `connection_origin: "service"` (default) | OpenAI | No |
| HTTP with `connection_origin: "environment"` | Your session's environment | Yes |
| stdio | A process in your session's environment | Yes |

| Field | Description |
|-------|-------------|
| `transport.authorization` / `transport.headers` | Inline HTTP credentials for one session; encrypted and omitted from the returned session |
| `vault_ids` | Attach a vault of reusable credentials (OpenAI-origin connections only); `credential_id` selects one when several match the URL |
| `transport.env_vars` | Names of environment-supplied values for stdio credentials |
| `allowed_tools` | Limit which tools the agent can discover and call |
| `required` | `true` fails the turn if the server cannot initialize (optional by default) |

## Notes

- For environment-origin servers set `environment.type` to `self_hosted` or `openai_hosted`; for self-hosted, connect the executor first. A localhost URL then refers to the session's environment. Omitting `connection_origin` makes OpenAI connect.
- stdio: `command` and an absolute `cwd` are required; `args` optional; omit `connection_origin`. For OpenAI-hosted stdio MCPs, omit the network policy or set it to `enabled`; `disabled` and `restricted` are not supported.
- Use one source for `Authorization` (inline or a matching vault credential); other headers can accompany vault auth. Environment-origin HTTP does not use vault credentials. Self-hosted sessions do not accept inline `transport.env` values. Stdio env values can be read by code in the environment.
- Keep secrets out of reusable agent definitions, plugin archives, and logs; use a trusted proxy or server to keep credentials from agent-generated code.
- Troubleshooting: inspect the error in `agent.session.turn.failed` (and MCP process logs for stdio). Check URL and `connection_origin`, executor connection and network, credentials / vault URL match, executable and dependencies, and an existing absolute `cwd`.
- Distinct from MCP consumption in the Agents SDK (see this skill's `mcp` category): here the Agents API service or environment makes the connection.
- Source: https://developers.openai.com/api/docs/guides/agents-api/tools/mcp (fetched 2026-10).

## Related

- [Vaults](./vaults.md)
- [Plugins](./plugins.md)
- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Security](./sandbox-security.md)
