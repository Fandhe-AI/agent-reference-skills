# Dev Server MCP

Model Context Protocol server built into the Inngest dev server, giving AI assistants (Claude Code, Cursor) direct access to registered functions, events, run status, and offline documentation search.

## Signature / Usage

```bash
# Start the dev server (MCP is automatically available)
inngest dev
# MCP endpoint: http://127.0.0.1:8288/mcp

# Claude Code
claude mcp add --transport http inngest-dev http://127.0.0.1:8288/mcp
```

```json
// Cursor: .cursor/mcp.json
{
  "mcpServers": {
    "inngest-dev": { "url": "http://127.0.0.1:8288/mcp" }
  }
}
```

## Options / Props

**Event management**

| Tool | Description |
|------|-------------|
| `send_event` | Send an event to trigger functions; params `name` (required), `data`, `user`, `eventIdSeed` |
| `list_functions` | List all registered functions with triggers |
| `invoke_function` | Execute a function synchronously and wait for its result; params `functionId` (required), `data`, `user`, `timeout` |

**Execution monitoring**

| Tool | Description |
|------|-------------|
| `get_run_status` | Get step-by-step execution detail for a run; param `runId` (required) |
| `poll_run_status` | Monitor multiple runs until completion; params `runIds` (required), `timeout`, `pollInterval` |

**Documentation**

| Tool | Description |
|------|-------------|
| `grep_docs` | Regex search over embedded Inngest documentation; params `pattern` (required), `limit` |
| `read_doc` | Read a full documentation file by path |
| `list_docs` | Overview of available documentation by category and SDK |

## Notes

- Runs entirely locally alongside `inngest dev`; no external dependencies, API keys, or internet connection required.
- A 500ms delay is built in after sending an event before runs become queryable.
- Pair with agent plugins/skills for the full write-test-debug loop: skills teach the agent *how* to write Inngest code, MCP lets it *interact* with the running dev server.

## Related

- [AI Development Tools](./ai-dev-tools.md)
- [Agent Plugins and Skills](./agent-skills.md)
