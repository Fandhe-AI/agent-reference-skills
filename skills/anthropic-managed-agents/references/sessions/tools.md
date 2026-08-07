<!-- source: https://platform.claude.com/docs/en/managed-agents/tools / last verified: 2026-08-07 -->

# Tools

Built-in tools Claude uses autonomously within a session, plus custom user-defined tools your application executes and returns results for. To give the agent MCP server tools, use the MCP connector instead.

## Signature / Usage

```python
agent = client.beta.agents.create(
    name="Coding Assistant",
    model="claude-opus-5",
    tools=[
        {
            "type": "agent_toolset_20260401",
            "configs": [{"name": "web_fetch", "enabled": False}],
        },
    ],
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `bash` / `read` / `write` / `edit` / `glob` / `grep` / `web_fetch` / `web_search` | tool name | Built-in `agent_toolset_20260401` tools, all enabled by default |
| `default_config.enabled` | boolean | Set `false` to disable every tool by default, then opt in individual tools via `configs` |
| `configs[].{name, enabled, permission_policy}` | array | Per-tool overrides |
| `type: "custom"` tool | object | `name`, `description`, `input_schema` (JSON Schema) — model emits a structured call, your app executes it, and returns a `user.custom_tool_result` |

## Notes

- Tool output over 100,000 characters (~25k tokens) is auto-written to a sandbox file; the model gets a truncated preview and the file path.
- Custom tool best practices: write 3-4 sentence descriptions explaining what/when/when-not; consolidate related operations into one tool with an `action` parameter; namespace tool names by resource (`db_query`); return only high-signal, stable identifiers in responses.
- Scope: the Managed Agents agent toolset and custom tool definitions. For Messages API tool use definitions, see the anthropic-api-tools-mcp skill.
- On self-hosted sandbox sessions, the self-hosted worker can serve custom tools or wrap an MCP server reachable only from your network (see `self-hosted-sandboxes.md`).

## Related

- [Permission policies](./permission-policies.md)
- [MCP connector](./mcp-connector.md)
