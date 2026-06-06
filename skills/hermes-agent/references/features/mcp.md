# MCP (Model Context Protocol)

MCP lets Hermes connect to external tool servers — GitHub, databases, file systems, APIs — without requiring native integrations. Hermes can also expose itself as an MCP server for other agents.

## Server Types

| Type | Transport | When to Use |
|------|-----------|-------------|
| Stdio | stdin/stdout subprocess | Locally installed servers, low-latency needs |
| HTTP | Remote endpoint with static headers or OAuth 2.1 | Externally hosted or organisation-internal servers |

## Curated Catalog

Hermes ships a reviewed catalog of MCP servers (disabled by default). Install selectively:

```bash
hermes mcp              # interactive picker
hermes mcp install n8n  # install by name
hermes mcp configure linear  # reconfigure existing
```

Entries are stored in `optional-mcps/` in the hermes-agent repository and require Nous staff review via PR.

## Configuration

MCP servers are defined in `~/.hermes/config.yaml` under `mcp_servers`.

| Parameter | Applies To | Description |
|-----------|-----------|-------------|
| `command` / `args` | stdio | Executable and arguments |
| `url` / `headers` | HTTP | Endpoint URL and auth headers |
| `auth: oauth` | HTTP | OAuth 2.1 authentication; tokens cached at `~/.hermes/mcp-tokens/<server>.json` |
| `env` | stdio only | Environment variables (filtered for security) |
| `enabled` | both | Toggle connectivity |
| `timeout` / `connect_timeout` | both | Timing controls |
| `tools` | both | Per-server filtering rules |
| `supports_parallel_tool_calls` | both | Enable concurrent tool execution |

## Tool Registration & Naming

Hermes prefixes MCP tools to prevent name collisions:

```
mcp_<server_name>_<tool_name>
# e.g. mcp_filesystem_read_file
```

## Tool Filtering

```yaml
# Whitelist — expose only these tools
tools:
  include: [read_file, list_directory]

# Blacklist — hide dangerous operations
tools:
  exclude: [delete_file]

# Disable resource/prompt wrappers
tools:
  resources: false
  prompts: false
```

The `include` list takes precedence when both `include` and `exclude` are specified.

## Dynamic Tool Discovery

Servers can notify Hermes of runtime capability changes via `notifications/tools/list_changed`. Hermes automatically re-fetches and updates the tool registry without manual intervention.

## Parallel Tool Calls

```yaml
mcp_servers:
  my_server:
    supports_parallel_tool_calls: true  # Enable concurrent execution
```

## Sampling

MCP servers can request LLM inference through Hermes.

| Option | Description |
|--------|-------------|
| `max_rpm` | Rate limit on sampling requests |
| `max_tokens_cap` | Maximum tokens per request |
| `max_tool_rounds` | Depth limit on tool-loop calls |
| model override | Per-server model selection |

Sampling is enabled by default; disable it per server in config.

## Hermes as MCP Server

Hermes can expose itself as an MCP server, making its messaging capabilities available to other MCP-compatible agents (Claude Code, Cursor, etc.).

```bash
hermes mcp serve
```

**Exposed tools:** conversation listing, message reading, event polling, message sending, permission management.

**Event system:** supports polling and long-polling for near-real-time message awareness.

**Current limitations:** stdio transport only; text-only sends; no media attachment support.

## Related

- [Tools](./tools.md)
- [Skills](./skills.md)
