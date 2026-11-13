---
source: https://opencode.ai/docs/mcp-servers/#server-instructions
---

# MCP servers: Server instructions, Input requests, Session context

How MCP server instructions reach the system prompt, how elicitation is shown, and the session ID sent with tool calls.

## Signature / Usage

### Server instructions

When a server returns instructions during initialization, OpenCode adds them to the system prompt:

```text
<mcp_instructions>
  <server name="sentry">
    Search for an existing issue before creating a new one.
  </server>
</mcp_instructions>
```

For servers that use Code Mode, OpenCode adds a line that says where the agent can find the server's tools.

A server's instructions are omitted when the agent's permissions deny every one of its tools. When they deny `execute`, the server's tools are listed directly and its instructions are kept without the Code Mode line.

### Input requests

Servers can ask for input during a call through MCP elicitation. OpenCode shows the request as a form, or as a link to open for URL requests:

```text
sentry is requesting input
```

Dismissing the form cancels the request.

### Context

For calls made on behalf of a session, OpenCode sends the session ID in `CallToolRequest.params._meta["ai.opencode/sessionID"]`. This applies to direct tools and Code Mode over stdio and Streamable HTTP:

```json
{
  "method": "tools/call",
  "params": {
    "name": "lookup",
    "arguments": { "query": "example" },
    "_meta": { "ai.opencode/sessionID": "ses_..." }
  }
}
```

The ID is request metadata, not a tool argument, so it is absent from the model-visible schema. Treat it as an opaque correlation value.

## Options / Props

| Rule | Behavior |
| --- | --- |
| Identity | It identifies the invoking OpenCode session, not the MCP transport session. |
| Presence | It can be absent for calls without session context. |
| Security | Do not use it by itself for authentication or authorization. |
| Privacy | Remote servers receive the raw ID and may log or retain it. |

## Notes

- Elicitation and `_meta` are MCP protocol concepts; see `mcp-spec`.

## Related

- [mcp-permissions-names.md](./mcp-permissions-names.md)
- [mcp-overview.md](./mcp-overview.md)
