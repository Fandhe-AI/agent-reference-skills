# MCP and Connectors

Use remote MCP servers and OpenAI-maintained connectors for popular services to give models new capabilities in the Responses API.

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

The API retrieves available tools via the `mcp_list_tools` output item before the model decides which tools to use.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `server_url` | string | Required for remote MCP servers (any public Model Context Protocol server). |
| `connector_id` | string | Used instead of `server_url` for OpenAI-maintained connectors (Dropbox, Gmail, Google Calendar, Google Drive, Microsoft Teams, Outlook Calendar, Outlook Email, SharePoint). |
| `authorization` | string | OAuth access token. Required by some remote servers and all connectors. Not stored by the Responses API. |
| `require_approval` | `"never"` \| `"always"` \| object | Controls when tool calls need explicit approval. `"always"` requires an `mcp_approval_response` for every call; a filtered object can exempt specific tools. |
| `allowed_tools` | string[] | Restricts which tools the model can access, reducing cost/latency for servers exposing many functions. |
| `defer_loading` | boolean | When `true`, the model can search MCP servers by label/description without immediately loading all function definitions, saving tokens. |

## Notes

- Eight built-in connectors are available: Dropbox, Gmail, Google Calendar, Google Drive, Microsoft Teams, Outlook Calendar, Outlook Email, SharePoint. Each requires a `connector_id` and an OAuth access token.
- To prevent leakage of sensitive tokens, the Responses API does not store the value passed in `authorization`.
- A malicious server can exfiltrate sensitive data from anything that enters the model's context. Only connect to official, trusted servers, require approvals for sensitive actions, and log/review data shared with third-party servers.
- Verify URL domains before using them from tool outputs; treat user-provided content as a prompt-injection risk.

## Related

- [Agents SDK MCP Integration](./agents-sdk-integration.md)
- [MCP in Realtime Sessions](./realtime-sessions.md)
- [Secure MCP Tunnel](./secure-mcp-tunnel.md)
