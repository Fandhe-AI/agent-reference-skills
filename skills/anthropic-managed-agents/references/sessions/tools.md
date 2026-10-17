<!-- source: https://platform.claude.com/docs/en/managed-agents/tools / last verified: 2026-10-17 -->

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

### Restricting web search and web fetch

The `web_search` and `web_fetch` `configs` entries also accept one domain list each: `allowed_domains` (the tool can reach only these hosts) or `blocked_domains` (the tool can never reach these hosts), plus a cap on fetched content (`max_content_tokens` on `web_fetch`) and a search location (`user_location` on `web_search`). Each tool carries its own list.

```json
{"type": "agent_toolset_20260401", "configs": [
  {"type": "web_search", "name": "web_search", "allowed_domains": ["docs.example.com", "arxiv.org"]},
  {"type": "web_fetch", "name": "web_fetch", "blocked_domains": ["ads.example.com"], "max_content_tokens": 50000}
]}
```

These tools run on Anthropic's servers, not in the sandbox; see Web search and fetch restrictions for details.

### Config entry types in the SDKs

The Python, TypeScript, Go, Java, C#, Ruby, and PHP SDKs type each `configs` entry per tool, as a union with one member per built-in tool, discriminated by `type`. In Go, Java, C#, and PHP you construct entries from typed values rather than plain dictionaries or hashes. You can omit `type` when you construct an entry, because the server infers it from `name`; responses always include it. This typing does not change the serialized JSON.

## Notes

- Tool output over 100,000 characters (~25k tokens) is auto-written to a sandbox file; the model gets a truncated preview and the file path.
- A custom tool's name can't start with `mcp__` or `ant__`, or match the name of a built-in agent tool; such a request returns a 400 error. An agent that already has a custom tool whose name starts with `ant__` accepts an update only if the update sends `tools` without that name. A new session is refused with 400 if such a tool is on its agent (after overrides) or on an agent in the `predefined_agents` list of `subagents` or `workflows`. Existing sessions aren't affected.
- Custom tool best practices: write 3-4 sentence descriptions explaining what/when/when-not; consolidate related operations into one tool with an `action` parameter; namespace tool names by resource (`db_query`); return only high-signal, stable identifiers in responses.
- Scope: the Managed Agents agent toolset and custom tool definitions. For Messages API tool use definitions, see the anthropic-api-tools-mcp skill.
- On self-hosted sandbox sessions, the self-hosted worker can serve custom tools or wrap an MCP server reachable only from your network (see `self-hosted-sandboxes.md`).

## Related

- [Permission policies](./permission-policies.md)
- [MCP connector](./mcp-connector.md)
- [Web search and fetch restrictions](./tools-web-restrictions.md)
