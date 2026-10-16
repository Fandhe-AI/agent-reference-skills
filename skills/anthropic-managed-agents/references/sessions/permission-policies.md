<!-- source: https://platform.claude.com/docs/en/managed-agents/permission-policies / last verified: 2026-10-17 -->

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
| `auto` | policy | The server evaluates each call and runs it, denies it, or pauses for your approval; no toolset uses it by default |
| `default_config.permission_policy` | object | Applies to every tool in a toolset |
| `configs[].permission_policy` | object | Overrides the default for an individual tool (agent toolset) or MCP tool (by MCP tool name) |

## Let the server evaluate each call with `auto`

Set `permission_policy` to `{"type": "auto"}` in a toolset's `default_config` or a `configs` entry; the agent toolset and MCP toolsets both accept it. The server evaluates each call from the tool, the call's input, and the session's content so far, so two calls to the same tool can be treated differently. Outcomes:

- **Runs:** the server determines the call is safe; it runs as under `always_allow`.
- **Denied:** the server evaluates the call as high-risk; the tool does not run. The agent receives an error tool result `Permission to use {tool_name} has been denied.` with `is_error: true`. The session keeps running, and your client cannot override the denial.
- **Pauses for approval:** the server reaches no determination; the session pauses as under `always_ask`.

```json
{
  "type": "agent_toolset_20260401",
  "default_config": { "permission_policy": { "type": "auto" } },
  "configs": [{ "name": "bash", "permission_policy": { "type": "always_ask" } }]
}
```

What you post in `user.message` events counts as your intent and can lead the server to allow a call it would otherwise deny; it does not read intent from a tool result, a fetched webpage, an MCP server's response, or a message between session threads. If you relay untrusted end-user input in `user.message` events, the server reads it as your intent too. `auto` is not a human checkpoint: a call judged safe runs before anyone sees it, and its effects might not be reversible. Use `always_ask` on tools whose calls a person must review.

## See how each call was evaluated

Under any policy, each `agent.tool_use` and `agent.mcp_tool_use` event carries `evaluated_permission` (`"allow"`, `"ask"`, or `"deny"`). Most events also carry an `evaluation` object whose `type` names the policy that produced the outcome; under `auto` it also records the server's determination, plus a `reason_code` when the outcome is `ask` or `deny`.

| `evaluation` | Top-level `evaluated_permission` | Meaning |
|--------------|----------------------------------|---------|
| `{"type": "always_allow"}` | `"allow"` | Resolved policy is `always_allow`; the call ran. |
| `{"type": "always_ask"}` | `"ask"` | Resolved policy is `always_ask`; the call paused for approval. |
| `{"type": "auto", "evaluated_permission": {"type": "allow"}}` | `"allow"` | Under `auto`, judged safe; ran. |
| `{"type": "auto", "evaluated_permission": {"type": "ask", "reason_code": "indeterminate"}}` | `"ask"` | Under `auto`, no determination; paused for approval. |
| `{"type": "auto", "evaluated_permission": {"type": "deny", "reason_code": "high_risk"}}` | `"deny"` | Under `auto`, evaluated as high-risk; denied. |

`evaluation` is absent when the agent names a tool that is not enabled in the session (the server denies without evaluating a policy: `evaluated_permission: "deny"` and no `evaluation`), and on events recorded before `evaluation` was introduced (read `"allow"` as `always_allow` and `"ask"` as `always_ask`). A `reason_code` is for your client to branch on and audit, not text to show end users. Tolerate an `evaluation.type` or `reason_code` you don't recognize. `agent.custom_tool_use` events carry neither field.

## Notes

- On an `always_ask` tool call: an `agent.tool_use`/`agent.mcp_tool_use` event fires, then `session.status_idle` with `stop_reason.type: "requires_action"` and blocking event IDs in `stop_reason.event_ids`. Respond with `user.tool_confirmation` events (`tool_use_id`, `result: "allow"|"deny"`, optional `deny_message`) — several can be sent in one request.
- Policies are set on the agent's `tools` config at creation or update; running sessions keep the config they were created with, updates apply to sessions created afterward.
- Permission policies do not apply to custom tools — the caller decides whether to execute before returning `user.custom_tool_result`.

## Related

- [Tools](./tools.md)
- [MCP connector](./mcp-connector.md)
