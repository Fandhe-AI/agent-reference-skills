# MCP Tools and Connectors in Realtime Sessions

The Realtime API can integrate MCP tools and OpenAI-managed connectors, allowing models to access remote services during a live conversation. Unlike function tools, MCP tools are executed by the Realtime API itself.

## Signature / Usage

```json
{
  "type": "mcp",
  "server_label": "cats",
  "server_url": "https://example.com/mcp",
  "allowed_tools": ["search", "fetch"],
  "require_approval": "never"
}
```

Send via `session.update` for full-session availability, or `response.create` for a single-turn tool.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `server_label` | string | Stable identifier for the tool within the session; can be reused alone in later calls to avoid resending the full tool object. |
| `server_url` | string | Remote MCP server URL. Mutually exclusive with `connector_id`. |
| `tunnel_id` | string | Connects to a local MCP server through Secure MCP Tunnel (named in the official deprecation notice as the replacement for `connector_id` for local servers). |
| `connector_id` | string | Legacy built-in connector (e.g. Google Calendar) instead of a custom remote server. Deprecated for models released after September 1, 2026; use `server_url` (remote MCP) or `tunnel_id` (local MCP via Secure MCP Tunnel). Existing models retain connector support. |
| `authorization` | string | OAuth token, required by connectors and some remote servers. |
| `headers` | object | Additional HTTP headers sent to the server. |
| `allowed_tools` | string[] | Restricts the tool surface exposed to the model. |
| `require_approval` | `"never"` \| `"always"` \| object | Controls when a call needs an explicit `mcp_approval_response`. |
| `server_description` | string | Optional human-readable description of the server. |

## Notes

- The official examples for regular remote MCP tools use `gpt-realtime-2.1`; the legacy connector example uses `gpt-realtime-1.5`, which predates the September 1, 2026 cutoff.
- Key lifecycle events: `mcp_list_tools.in_progress` / `.completed` / `.failed` (tool import status), `response.mcp_call_arguments.done` (final arguments before execution), `response.mcp_call.in_progress` / `.failed` (execution status), `mcp_approval_request` (requires an `mcp_approval_response`).
- Common failure scenarios: authentication failures, connectivity problems, tool name mismatches, duplicate server labels, conflicting authorization methods, and calling tools before loading completes.

## Related

- [MCP and Connectors](./mcp-and-connectors.md)
- [Agents SDK MCP Integration](./agents-sdk-integration.md)
