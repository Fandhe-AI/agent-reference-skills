# MCP Config Reference

Reference for Hermes Agent `mcp_servers` configuration keys, tool filtering, OAuth, and tool naming (Hermes as MCP client).

## Signature / Usage

```yaml
mcp_servers:
  <server_name>:
    command: "..."      # stdio servers
    args: []
    env: {}

    # OR
    url: "..."          # HTTP servers
    headers: {}

    ssl_verify: true                  # bool or path to a CA bundle (PEM)
    client_cert: "/path/to/cert.pem"  # mTLS
    enabled: true
    timeout: 120
    connect_timeout: 60
    supports_parallel_tool_calls: false
    tools:
      include: []
      exclude: []
      resources: true
      prompts: true
```

Reload after changes with `/reload-mcp`.

## Options / Props

| Key | Type | Applies to | Meaning |
|-----|------|-----------|---------|
| `command` / `args` / `env` | string / list / mapping | stdio | Executable, arguments, subprocess environment |
| `url` / `headers` | string / mapping | HTTP | Remote endpoint and request headers |
| `ssl_verify` | bool or string | HTTP | `true` (default) system CAs, `false` disables verification (insecure), or path to a PEM CA bundle |
| `client_cert` | string or list | HTTP | mTLS cert. String = PEM with cert + key; `[cert, key]`; `[cert, key, password]` |
| `client_key` | string | HTTP | Private key path when `client_cert` is a string |
| `enabled` | bool | both | Skip the server entirely when false |
| `timeout` | number | both | Tool call timeout in seconds (default 300) |
| `connect_timeout` | number | both | Initial connection timeout in seconds (default 60) |
| `protocol` | string | both | `auto` (default), `stateless`, or `legacy` handshake negotiation |
| `supports_parallel_tool_calls` | bool | both | Allow tools from this server to run concurrently |
| `skip_preflight` | bool | HTTP | Bypass the content-type probe (default false) |
| `transport` | string | HTTP | `sse` to use SSE instead of Streamable HTTP |
| `keepalive_interval` | number | both | Liveness ping cadence in seconds (floor 5; HTTP default 180; stdio off unless set) |
| `lazy` | bool | both | Register tools from the schema cache at startup, connect on first call (default false; needs one prior live connect) |
| `idle_timeout_seconds` / `max_lifetime_seconds` | number | stdio | Recycle the server after idle time / age (`0` disables); may live under `lifecycle:` |
| `tools` | mapping | both | Filtering and utility-tool policy |
| `auth` | string | HTTP | `oauth` enables OAuth 2.1 with PKCE |
| `sampling` / `elicitation` | mapping | both | Server-initiated LLM requests / user-input requests (`elicitation.enabled` default true, `timeout` default 300) |
| `trust` | string | both | `full` (default) or `untrusted`; untrusted servers require approval for every tool without `readOnlyHint: true`. Unrecognized values are treated as `untrusted` |

`tools` keys:

| Key | Type | Meaning |
|-----|------|---------|
| `include` | string or list | Whitelist of server-native tools (exact names or fnmatch globs) |
| `exclude` | string or list | Blacklist (same semantics) |
| `resources` | bool-like | Enable `list_resources` + `read_resource` |
| `prompts` | bool-like | Enable `list_prompts` + `get_prompt` |

Variable interpolation in string values: `${VAR}` / `${env:VAR}` (resolved from the profile's secret scope, then process env), plus `${userHome}`, `${workspaceFolder}`, `${workspaceFolderBasename}`, `${pathSeparator}` / `${/}`.

OAuth (`auth: oauth`) optional keys under `oauth:`: `client_metadata_url`, `cimd` (`false` forces DCR), `user_agent`, `flow` (`device`), `client_id`, `client_secret`, `token_endpoint_auth_method`, `scope`, `timeout` (default 300).

```bash
hermes mcp login protected_api --flow device   # RFC 8628 device-code login
```

Add-to-Hermes deep link: `hermes://mcp/install?name=NAME&config=BASE64` (`name` matches `^[A-Za-z0-9._-]{1,64}$`, config is base64url JSON, max 32KB; the desktop app always asks for confirmation).

## Notes

- If both `include` and `exclude` are set, `include` wins. If filtering removes every native tool and no utility tools register, no empty MCP toolset is created.
- Utility tools register only when the server actually exposes resources / prompts capability.
- Tool names become `mcp__<server>__<tool>`; non letter/digit/underscore characters in server and tool names become `_`. Write `include` / `exclude` filters with the original MCP tool name, not the sanitized one.
- An unset `${VAR}` in a remote server's `url` or `headers` fails the connect closed instead of sending the literal placeholder.
- OAuth tokens persist to `~/.hermes/mcp-tokens/<server>.json` (named profiles use `~/.hermes/profiles/<name>/mcp-tokens/`). Hermes pins the CIMD callback to ports `27890`-`27894` unless the flow reverts to a random port.
- `ssl_verify: false` should not be used with real services.
- Source pin: Hermes Agent docs at release tag v0.22.2.

## Related

- [Toolsets Reference](./toolsets-reference.md)
- [Tools Reference](./tools-reference.md)
