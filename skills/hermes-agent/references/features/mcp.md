# MCP (Model Context Protocol)

MCP lets Hermes connect to external tool servers — GitHub, databases, file systems, APIs — without requiring native integrations. Hermes can also expose itself as an MCP server for other agents.

## Server Types

| Type | Transport | When to Use |
|------|-----------|-------------|
| Stdio | stdin/stdout subprocess | Locally installed servers, low-latency needs |
| HTTP | Remote endpoint with static headers or OAuth 2.1 | Externally hosted or organisation-internal servers |

## Curated Catalog

Hermes ships a curated catalog of Nous-approved MCP servers (disabled by default). Install selectively:

```bash
hermes mcp                   # interactive picker (default)
hermes mcp catalog           # plain-text list, scriptable
hermes mcp install deepwiki  # install a catalog entry by name
hermes mcp configure linear  # reconfigure existing
```

Entries are stored in `optional-mcps/` in the hermes-agent repository; presence there means Nous approval (no community submission tier). You can also ask in chat ("add the Linear MCP"): the agent calls `manage_connections` with an `mcp: true` target and a setup card appears (desktop dialog, TUI callout, or CLI panel; no card in messaging apps). The card shows setup fields (secrets masked), then the authorization link for OAuth entries (Hermes never opens the browser itself); the server config, tokens, and setup values are saved together only after the server accepts the token and the first connection returns, and the agent can use the tools in the same turn.

Catalog entries can require an API key (written to `~/.hermes/.env`), remote OAuth (`auth: oauth`), or third-party OAuth via `hermes auth <provider>`. The third-party n8n bridge is no longer available for catalog installation; existing installs keep working as custom entries.

In Hermes Desktop (v0.22.0) the Connectors page replaces the MCP tab and lists hosted apps (via the Nous tool gateway) and MCP servers together; `hermes connectors` manages hosted connector accounts.

`hermes mcp add <name> --preset codex` wires up the Codex CLI's MCP server (`codex mcp-server` over stdio; requires `codex` on PATH). Other `hermes mcp` subcommands: `login <name>` forces re-authentication for an OAuth server, `test <name>` reports the actual HTTP status and body on rejection.

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
| `cwd` | stdio | Working directory for the server process (default: pinned session working directory, else Hermes process directory) |
| `client_cert` / `client_key` | HTTP | mTLS client certificate: combined PEM path, or `[cert, key]` / `[cert, key, password]`; `~` expanded |
| `identity_header` | HTTP/SSE | `{name, value_from: static\|profile, value}` sent on every request; explicit `headers` entry of the same name wins; ignored with a warning on stdio |
| `lazy` | both | `true` registers tools from the on-disk schema cache and starts/connects on first tool call (default `false`; needs one prior live connect) |
| `idle_timeout_seconds` / `max_lifetime_seconds` | stdio | Recycle a server after idle / total age (`0` = never, default); restarts transparently on next call |
| `sampling` / `elicitation` | both | Per-server sampling and elicitation settings (see below) |

```yaml
mcp_servers:
  internal_api:
    url: "https://mcp.internal.example.com/mcp"
    client_cert: ["~/.certs/mcp-client.crt", "~/.certs/mcp-client.key", "${MCP_KEY_PASSWORD}"]
    identity_header: {name: "X-User-Id", value_from: "profile"}
```

## Tool Registration & Naming

Hermes prefixes MCP tools to prevent name collisions:

```
mcp_<server_name>_<tool_name>
# e.g. mcp_filesystem_read_file
```

Each server with at least one registered tool also creates a runtime toolset `mcp-<server>`. Utility tools (`list_resources`, `read_resource`, `list_prompts`, `get_prompt`, registered per server as e.g. `mcp_github_list_resources`) are capability-aware: they exist only if the session supports resources/prompts and your config allows them. If everything is filtered out, no empty toolset is created for that server.

Tool results: invisible Unicode TAG characters (U+E0000-U+E007F) are stripped from results, resources, and descriptions; vendor `_meta` is passed to the model but protocol-reserved prefixes are dropped; `ImageContent` is saved to the image cache and reported as `MEDIA:/path/to/image.png` (and attached when the main model can see images; downscaled to `vision.embed_target_bytes`, up to 4 per result).

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

Sampling is enabled by default; disable it per server in config. Full per-server keys: `enabled` (true), `model`, `max_tokens_cap` (4096), `timeout` (30 s), `max_rpm` (10), `max_tool_rounds` (5), `allowed_models` (empty = any), `log_level` (`info`).

## Elicitation

MCP servers can ask the user for structured input mid-tool-call (`elicitation/create`, mcp Python SDK >= 1.11.0). Form-mode requests go through Hermes' approval surface (CLI/TUI prompt, or buttons on gateway platforms); URL-mode requests are declined as unsupported. Enabled by default:

```yaml
mcp_servers:
  my_server:
    elicitation:
      enabled: true    # default: true
      timeout: 300     # seconds (default: 300)
```

## Runtime behavior

- Discovery connects at most 4 servers at a time per pass (`mcp.discovery_concurrency: 4`, `0` = unlimited); each wave keeps a 120 s budget and the whole pass is capped at 300 s.
- Lazy start (`lazy: true`): tools appear immediately from the on-disk tool-schema cache (written on every live connect) and the server is started on first call; banners show it as `lazy`. (Added v0.20.0.)
- `/reload-mcp` reloads MCP config; a running gateway also watches `config.yaml` and connects or tears down servers within about a minute, retrying failed first connects on a 30 s doubling cooldown up to 10 min.
- Expired OAuth tokens in the background never open a browser; the server parks with a warning in `gateway.log` and you re-authorize with `hermes mcp login <server>`.

## Security model

- Stdio servers receive only the explicitly configured `env` plus a safe baseline, not your full shell environment.
- Per-server filtering is also a security control: disable dangerous tools, expose a minimal whitelist, or disable resource/prompt wrappers.

## Troubleshooting

- Server not connecting: verify MCP deps (`cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['mcp'], explicit=True)"`, already included in the standard install), `node --version`, `npx --version`. The `agent.log` startup summary names every server that failed with its connect error.
- Remote HTTP server rejects the connection: `hermes mcp test <name>`; a 400/405 on `initialize` often means SSE only (set `transport: sse`), 401/403 a bad token or grant, an HTML body a URL that is not an MCP endpoint; `hermes logs --level debug` shows the endpoint used.
- Tools not appearing: the server failed to connect, discovery failed, filters excluded the tools, the capability does not exist, or `enabled: false`.

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
