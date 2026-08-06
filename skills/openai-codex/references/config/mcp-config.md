# Model Context Protocol (MCP server configuration)

Connect Codex to MCP servers to give it access to third-party documentation and developer tools (browser, Figma, GitHub, etc). Configuration is stored in `config.toml` and shared across the ChatGPT desktop app, Codex CLI, and IDE extension.

## Signature / Usage

```bash
# Add a STDIO MCP server via CLI
codex mcp add <server-name> --env VAR1=VALUE1 --env VAR2=VALUE2 -- <stdio server-command>

# Example: Context7 docs server
codex mcp add context7 -- npx -y @upstash/context7-mcp

# List / manage
codex mcp list
codex mcp login <server-name>   # OAuth login for a server
```

```toml
# ~/.codex/config.toml or .codex/config.toml (project-scoped, trusted only)
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
env_vars = ["LOCAL_TOKEN"]

[mcp_servers.context7.env]
MY_ENV_VAR = "MY_ENV_VALUE"
```

Each server is a `[mcp_servers.<server-name>]` table. In the TUI, `/mcp` lists active servers.

## Supported server types

- **STDIO servers**: run as a local process, support environment variables.
- **Streamable HTTP servers**: accessed at a URL; support bearer token auth, OAuth, and ChatGPT session auth for trusted first-party servers.
- **Server instructions**: Codex reads the MCP `instructions` field from server initialization and uses it as server-wide guidance. Server authors should keep the first 512 characters self-contained.

## Options / Props

### STDIO servers

| Name | Type | Description |
|------|------|-------------|
| `command` | string (required) | Command that starts the server. |
| `args` | array<string> | Arguments passed to the server. |
| `env` | map<string,string> | Environment variables set for the server. |
| `env_vars` | array<string \| {name, source}> | Env vars to allow/forward. String entries and `source = "local"` read Codex's local environment; `source = "remote"` reads a remote executor environment (requires remote MCP stdio). |
| `cwd` | string | Working directory to start the server from. |
| `experimental_environment` | `remote` | Start the stdio server through a remote executor environment when available. |

```toml
env_vars = ["LOCAL_TOKEN", { name = "REMOTE_TOKEN", source = "remote" }]
```

### Streamable HTTP servers

| Name | Type | Description |
|------|------|-------------|
| `url` | string (required) | Server address. |
| `auth` | `oauth` \| `chatgpt` | Auth to try after configured bearer tokens/headers. `oauth` (default) uses stored MCP OAuth credentials. `chatgpt` uses the current ChatGPT session for the trusted first-party ChatGPT origin, falling back to stored OAuth. |
| `bearer_token_env_var` | string | Env var name for a bearer token sent in `Authorization`. |
| `http_headers` | map<string,string> | Static header values. |
| `env_http_headers` | map<string,string> | Header values pulled from environment variables. |

If no credential source resolves, Codex can connect without authentication. Run `codex mcp login <server-name>` to start MCP OAuth login separately.

### Common to both transports

| Name | Type | Description |
|------|------|-------------|
| `startup_timeout_sec` | number | Server start timeout. Default `10`. |
| `tool_timeout_sec` | number | Tool run timeout. Default `60`. |
| `enabled` | boolean | Set `false` to disable a server without deleting it. |
| `required` | boolean | Set `true` to fail startup if this enabled server can't initialize. |
| `enabled_tools` | array<string> | Tool allow list. |
| `disabled_tools` | array<string> | Tool deny list, applied after `enabled_tools`. |
| `default_tools_approval_mode` | `auto` \| `prompt` \| `writes` \| `approve` | Default approval behavior for this server's tools. `writes` prompts only for tools not marked read-only. |
| `tools.<tool>.approval_mode` | `auto` \| `prompt` \| `writes` \| `approve` | Per-tool approval override. |

Top-level OAuth callback overrides:

```toml
mcp_oauth_callback_port = 5555
mcp_oauth_callback_url = "https://devbox.example.internal/callback"
```

`mcp_oauth_callback_port` fixes the local callback port (ephemeral if unset). `mcp_oauth_callback_url` sets a base callback URL for the OAuth `redirect_uri`; Codex appends a server-specific callback ID, so register the full derived URI with the OAuth provider, not just the base host/path. If the MCP server advertises `scopes_supported`, Codex prefers those scopes over `config.toml`-configured ones.

## Config examples

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"
http_headers = { "X-Figma-Region" = "us-east-1" }
```

```toml
[mcp_servers.chrome_devtools]
url = "http://localhost:3000/mcp"
enabled_tools = ["open", "screenshot"]
disabled_tools = ["screenshot"] # applied after enabled_tools
default_tools_approval_mode = "prompt"
startup_timeout_sec = 20
tool_timeout_sec = 45
enabled = true

[mcp_servers.chrome_devtools.tools.open]
approval_mode = "approve"
```

### Plugin-provided MCP servers

Installed plugins can bundle MCP servers in their plugin manifest; the plugin launches them, so user config cannot set transport (`command`/`url`). User config still controls on/off state and tool policy under `plugins.<plugin>.mcp_servers.<server>`.

```toml
[plugins."sample@test".mcp_servers.sample]
enabled = true
default_tools_approval_mode = "prompt"
enabled_tools = ["read", "search"]

[plugins."sample@test".mcp_servers.sample.tools.search]
approval_mode = "approve"
```

## Configure without editing TOML directly

- **ChatGPT desktop app**: Settings > MCP servers > Add server (STDIO or Streamable HTTP) > Restart. `/mcp` in the composer lists connected servers.
- **Codex CLI**: `codex mcp add`, `codex mcp list`, `codex mcp login <server-name>`, `codex mcp --help`. In the TUI, `/mcp` lists active servers.
- **IDE extension**: gear menu > MCP servers > Add server > Restart extension.
- **ChatGPT web**: doesn't read local Codex config; use **Plugins** in ChatGPT Work to install plugin-bundled connectors/remote MCP tools instead.

## Examples of useful MCP servers

- OpenAI Docs MCP — search/read OpenAI developer docs.
- Context7 — up-to-date developer documentation.
- Figma (Local / Remote) — access Figma designs.
- Playwright — control/inspect a browser.
- Chrome Developer Tools — control/inspect Chrome.
- Sentry — access Sentry logs.
- GitHub — manage issues/PRs beyond `git`.

## Notes

- This page documents OpenAI Codex's MCP **client** configuration (Codex connecting out to MCP servers), distinct from OpenAI API / Agents SDK MCP usage (`openai-agents` skill), which covers building/consuming MCP from the Agents SDK side.
- For the full key list (types, defaults) alongside every other `config.toml` key, see [Configuration Reference](./config-reference.md).

## Related

- [Config basics](./config-basics.md)
- [Advanced Configuration](./config-advanced.md)
- [Configuration Reference](./config-reference.md)
