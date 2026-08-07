<!-- source: https://platform.claude.com/docs/en/managed-agents/permission-policies / last verified: 2026-08-07 -->

# Permission policies

Control whether server-executed tools (built-in agent toolset and MCP toolset) run automatically or wait for approval. Custom tools are executed by your application and are not governed by permission policies.

## Signature / Usage

```json
{
  "type": "agent_toolset_20260401",
  "default_config": { "permission_policy": { "type": "always_ask" } },
  "configs": [
    { "name": "bash", "permission_policy": { "type": "always_ask" } }
  ]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `always_allow` | policy | Executes automatically with no confirmation; default for the agent toolset |
| `always_ask` | policy | Session pauses and waits for approval; default for MCP toolsets |
| `default_config.permission_policy` | object | Applies to every tool in a toolset |
| `configs[].permission_policy` | object | Overrides the default for an individual tool (agent toolset) or MCP tool (by MCP tool name) |

## Notes

- On an `always_ask` tool call: an `agent.tool_use`/`agent.mcp_tool_use` event fires, then `session.status_idle` with `stop_reason.type: "requires_action"` and blocking event IDs in `stop_reason.event_ids`. Respond with `user.tool_confirmation` events (`tool_use_id`, `result: "allow"|"deny"`, optional `deny_message`) — several can be sent in one request.
- Policies are set on the agent's `tools` config at creation or update; running sessions keep the config they were created with, updates apply to sessions created afterward.
- Permission policies do not apply to custom tools — the caller decides whether to execute before returning `user.custom_tool_result`.

## Related

- [Tools](./tools.md)
- [MCP connector](./mcp-connector.md)
