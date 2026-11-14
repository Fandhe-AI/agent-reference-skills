# MCP Tools and Connectors in Realtime Sessions

The Realtime API can attach tools to a session: function tools (your application executes them) and MCP tools or legacy connectors (the Realtime API itself executes them against a remote server). Tool configuration uses the same event surface over a WebRTC data channel or a WebSocket.

## Signature / Usage

```typescript
const event = {
  type: "session.update",
  session: {
    type: "realtime",
    model: "gpt-realtime-2.1",
    output_modalities: ["text"],
    tools: [
      {
        type: "mcp",
        server_label: "openai_docs",
        server_url: "https://developers.openai.com/mcp",
        allowed_tools: ["search_openai_docs", "fetch_openai_doc"],
        require_approval: "never",
      },
    ],
  },
};

ws.send(JSON.stringify(event));
```

Add tools at the session level with `session.tools` in `session.update` (available for the full session) or at the response level with `response.tools` in `response.create` (one turn only). Approve or reject an approval request with `conversation.item.create`:

```typescript
function approveMcpRequest(approvalRequestId: string) {
  const event = {
    type: "conversation.item.create",
    item: {
      type: "mcp_approval_response",
      approval_request_id: approvalRequestId,
      approve: true,
    },
  };

  ws.send(JSON.stringify(event));
}
```

To reject, set `approve` to `false` and optionally include a `reason`.

## Options / Props

Realtime MCP tool shape:

| Name | Type | Description |
|------|------|-------------|
| `type` | `"mcp"` | Tool type |
| `server_label` | string | Stable handle for the tool definition in the current session; later `session.update` / `response.create` events can send only the same `server_label` to reuse the earlier definition |
| `server_url` | string | Remote MCP server URL; one of `server_url` or `connector_id` is required |
| `connector_id` | string | Legacy built-in connector (e.g. `connector_googlecalendar`) instead of `server_url`. Deprecated for models released after September 1, 2026; use `server_url` (remote MCP) or `tunnel_id` (local MCP through Secure MCP Tunnel, as named in the official notice). Existing models retain connector support |
| `authorization` | string | OAuth access token, required by connectors and some remote servers |
| `headers` | object | Additional HTTP headers sent to the server |
| `allowed_tools` | string[] | Narrows the tool surface exposed to the model |
| `require_approval` | `"never"` \| `"always"` \| object | Controls when a call needs an explicit `mcp_approval_response` |
| `server_description` | string | Optional description of the server |

Tool types: `function` (your client or server receives a call and returns `function_call_output`), `mcp` with `server_url` (Realtime API calls the remote server), `mcp` with `connector_id` (Realtime API calls the legacy connector with the authorization you provide).

## Notes

- Source: https://developers.openai.com/api/docs/guides/realtime-mcp (fetched 2026-11-14). The official page is titled "Realtime with tools".
- The official examples for regular remote MCP tools use `gpt-realtime-2.1`; the legacy connector example uses `gpt-realtime-1.5`, which predates the September 1, 2026 cutoff. In Realtime, use built-in connectors for read actions, pass the user's OAuth token in `authorization`, and narrow with `allowed_tools`.
- Realtime MCP flow: send `session.update` or `response.create` with an `mcp` tool; the server emits `mcp_list_tools.in_progress` (tools not yet loaded can't be called; wait for `mcp_list_tools.completed`, and check the `conversation.item.done` event with `item.type` `mcp_list_tools` for imported names; failure emits `mcp_list_tools.failed`); the model's call emits `response.mcp_call_arguments.delta` / `.done`; if approval is required a conversation item `mcp_approval_request` is added and your client must answer with `mcp_approval_response`; then `response.mcp_call.in_progress`, and `response.output_item.done` with `item.type` `mcp_call` on success or `response.mcp_call.failed` on failure.
- `response.done` can arrive before its MCP calls finish. After the response is done and all of its MCP calls finish, send another `response.create` so the model uses the results; the Realtime API doesn't create these follow-up responses automatically.
- Common failures: `mcp_list_tools.failed` (check `server_url` / `connector_id`, authentication, connectivity, `allowed_tools` names); `response.mcp_call.failed`; `mcp_approval_request` with no matching response (call can't continue); a turn started while listing is in progress (only already-loaded tools are eligible); `tool_choice: "required"` with no available tools; validation failures before import (duplicate `server_label` in the same `tools` array, both `server_url` and `connector_id`, neither on initial creation, invalid `connector_id`, or both `authorization` and `headers.Authorization` — for connectors don't send `headers.Authorization` at all).

## Related

- [MCP and Connectors](./mcp-and-connectors.md)
- [Agents SDK MCP Integration](./agents-sdk-integration.md)
