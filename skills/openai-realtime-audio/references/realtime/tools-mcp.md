# Realtime with tools

Attach function tools, remote MCP servers, or built-in connectors to a Realtime session so the model can look up data, take actions, or call services during a live conversation.

## Signature / Usage

```javascript
const event = {
  type: "session.update",
  session: {
    type: "realtime",
    model: "gpt-realtime-2.1",
    tools: [
      {
        type: "function",
        name: "lookup_order",
        description: "Look up an order by its order number.",
        parameters: {
          type: "object",
          properties: { order_number: { type: "string" } },
          required: ["order_number"],
        },
      },
      {
        type: "mcp",
        server_label: "openai_docs",
        server_url: "https://developers.openai.com/mcp",
        allowed_tools: ["search_openai_docs", "fetch_openai_doc"],
        require_approval: "never",
      },
    ],
    tool_choice: "auto",
  },
};
ws.send(JSON.stringify(event));
```

## Options / Props

| Tool type | Use when | Who executes it |
|------|-------------|------|
| `function` | Your app owns business logic / private system access | Your client/server (returns `function_call_output`) |
| `mcp` with `server_url` | Model should call tools on a remote MCP server | The Realtime API itself |
| `mcp` with `connector_id` | Built-in connector (e.g. `connector_googlecalendar`) | The Realtime API itself, using `authorization` you provide |

| MCP field | Description |
|------|-------------|
| `server_label` | Stable handle; later events can reuse it without resending the full definition |
| `server_url` / `connector_id` | Exactly one required |
| `authorization` / `headers` | Auth for the remote server (don't set both `authorization` and `headers.Authorization` for connectors) |
| `allowed_tools` | Narrow the imported tool surface |
| `require_approval` | `"never"` or require an `mcp_approval_request`/`mcp_approval_response` round trip |

| Server event | Meaning |
|------|-------------|
| `mcp_list_tools.in_progress` / `.completed` / `.failed` | MCP tool import lifecycle |
| `response.mcp_call_arguments.delta` / `.done` | Streaming MCP call arguments |
| `response.mcp_call.in_progress` / `.failed` | MCP call execution status |
| `conversation.item.done` with `item.type: "mcp_approval_request"` | Approval needed before the tool runs |

## Notes

- Add tools at the session level (`session.tools` in `session.update`) for the whole session, or at the response level (`response.tools` in `response.create`) for a single turn.
- Function tools require your app to send back a `function_call_output` conversation item + `response.create`; MCP tools are executed by the Realtime API and never round-trip through your client.
- Remote MCP servers don't automatically see the full conversation, but can see any data sent in the tool call — keep `allowed_tools` narrow and require approval for sensitive actions.

## Related

- [Conversations](./conversations.md)
- [Voice agents](./voice-agents.md)
