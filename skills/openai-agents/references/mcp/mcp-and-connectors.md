# MCP and Connectors

Use remote MCP servers, Secure MCP Tunnel, and (legacy) OpenAI-maintained connectors to give models new capabilities in the Responses API. Tool calls can be allowed automatically or restricted with explicit approval.

## Signature / Usage

```bash
curl https://api.openai.com/v1/responses \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{
  "model": "gpt-6-astra",
    "tools": [
      {
        "type": "mcp",
        "server_label": "openai_docs",
        "server_description": "Search and read the public OpenAI documentation.",
        "server_url": "https://developers.openai.com/mcp",
        "require_approval": "never"
      }
    ],
    "input": "Search the OpenAI docs for Responses API streaming and return the relevant links."
  }'
```

The API first lists the server's tools (an `mcp_list_tools` output item), then the model may call them (an `mcp_call` item):

```json
{
  "id": "mcp_68a6102d8948819c9b1490d36d5ffa4a0679e572a900e618",
  "type": "mcp_call",
  "approval_request_id": null,
  "arguments": "{\"query\":\"Responses API streaming\",\"limit\":1}",
  "error": null,
  "name": "search_openai_docs",
  "output": "{\"hits\":[{\"url\":\"https://developers.openai.com/api/docs/guides/streaming-responses\"}]}",
  "server_label": "openai_docs"
}
```

With approvals required, the output contains an `mcp_approval_request`; answer it in a new Response by appending an `mcp_approval_response` item (with `previous_response_id`):

```json
{
  "id": "mcpr_682d498e3bd4819196a0ce1664f8e77b04ad1e533afccbfa",
  "type": "mcp_approval_request",
  "arguments": "{\"query\":\"Responses API streaming\",\"limit\":1}",
  "name": "search_openai_docs",
  "server_label": "openai_docs"
}
```

```json
{
  "type": "mcp_approval_response",
  "approve": true,
  "approval_request_id": "mcpr_682d498e3bd4819196a0ce1664f8e77b04ad1e533afccbfa"
}
```

Deferring a server's functions (with tool search):

```json
{
    "type": "mcp",
    "server_label": "openai_docs",
    "server_description": "Search and read the public OpenAI documentation.",
    "server_url": "https://developers.openai.com/mcp",
    "defer_loading": true,
    "require_approval": "never"
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `server_label` | string | Label identifying the server |
| `server_description` | string | Description of the server |
| `server_url` | string | Required for remote MCP servers (any public server implementing MCP) |
| `tunnel_id` | string | Used instead of `server_url` to connect to a local MCP server through Secure MCP Tunnel |
| `connector_id` | string | Legacy; deprecated for models released after September 1, 2026 (use `server_url` or `tunnel_id`). Existing models retain connector support. Used instead of `server_url` for OpenAI-maintained connectors |
| `authorization` | string | OAuth access token. Required by some remote servers and all connectors |
| `require_approval` | `"never"` \| `"always"` \| object | Controls when tool calls need explicit approval. `"always"` requires an `mcp_approval_response` for every call; a filtered object can exempt specific tools |
| `allowed_tools` | string[] | Imports only these tools, reducing cost and latency for servers exposing many tools |
| `defer_loading` | boolean | With tool search, the model can find the server by label/description while function definitions load only when needed |

### Legacy connectors

`connector_id` values: Dropbox `connector_dropbox`, Gmail `connector_gmail`, Google Calendar `connector_googlecalendar`, Google Drive `connector_googledrive`, Microsoft Teams `connector_microsoftteams`, Outlook Calendar `connector_outlookcalendar`, Outlook Email `connector_outlookemail`, SharePoint `connector_sharepoint`.

## Notes

- Source: https://developers.openai.com/api/docs/guides/tools-connectors-mcp (fetched 2026-11-14).
- Remote MCP servers can be any server on the public Internet implementing a remote MCP server; Secure MCP Tunnel connects a local or private server without exposing it publicly (client: openai/tunnel-client releases). The Responses API works with servers supporting Streamable HTTP or HTTP/SSE transport.
- The MCP tool is available in most recent models (check model compatibility). You pay only for tokens used importing tool definitions or making tool calls; no per-call fee.
- While the `mcp_list_tools` item is present in context the API does not refetch the tool list each turn; keep it in context for latency. Failed calls populate the `error` field (MCP protocol errors, tool execution errors, connectivity errors).
- By default OpenAI requests approval before data is shared with a connector or remote MCP server. Each approval applies to one tool call. Skip approvals only once you trust the server.
- Legacy connectors remain supported for existing models; the official legacy-connector examples use `gpt-5.2`, which predates the cutoff. Connectors require an OAuth access token in `authorization`; OAuth client registration and authorization are handled by your application. The official guide notes services with official remote MCP servers (e.g. GitHub at `https://api.githubcopilot.com/mcp/`) can use `server_url` instead.
- The Responses API does not store the value passed in `authorization`.
- Risks: connectors and remote MCP servers can expose sensitive data; servers are unverified third parties; prompt injection (e.g. web content instructing the model to place CRM data in a URL) — run public web search and private lookups in separate requests; use `require_approval` and `allowed_tools` for sensitive actions; don't trust URLs in tool outputs; prefer official servers hosted by the provider (e.g. `mcp.stripe.com`); log data sent to MCP servers (with `store=true`, logged via the API for 30 days unless Zero Data Retention). Servers may change tool behavior unexpectedly. Report malicious servers to `security@openai.com`.
- The MCP tool is compatible with Zero Data Retention and Data Residency, but data sent to an MCP server is subject to that server's own retention and residency policies.
- For Agents API sessions, MCP connections (from the managed service or from your sandbox) are covered in the `agents-api` category, not here.

## Related

- [Agents SDK MCP Integration](./agents-sdk-integration.md)
- [MCP in Realtime Sessions](./realtime-sessions.md)
- [Secure MCP Tunnel](./secure-mcp-tunnel.md)
