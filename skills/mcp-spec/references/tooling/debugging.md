---
source: https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging
---

# Debugging

Guide to debugging tools and approaches for MCP servers and integrations.

## Signature / Usage

Three levels of debugging tools:

1. **MCP Inspector**: interactive, transport-agnostic testing UI (stdio or Streamable HTTP); invoke tools, prompts, resources and watch the notification stream. First stop.
2. **Server logging**: structured logs to stderr (stdio transport) or via OpenTelemetry (all transports). Protocol logging (`notifications/message`) is deprecated as of protocol version `2026-07-28`.
3. **Client developer tools**: most MCP clients expose logs and connection state.

Local stdio servers must not log to stdout; stderr is captured by the host. Viewing Claude Desktop logs:

```bash
# macOS
tail -n 20 -F ~/Library/Logs/Claude/mcp*.log
```

```powershell
# Windows
type "$env:AppData\Claude\logs\mcp*.log"
```

## Options / Props

Common stdio configuration problems (examples use `claude_desktop_config.json`):

| Issue | Guidance |
| --- | --- |
| Working directory | May be undefined (like `/` on macOS) when launched via client config; use absolute paths in configuration and `.env` files |
| Environment variables | stdio servers inherit only a limited, platform-dependent subset; set an `env` key to provide your own |
| Server startup | Check path issues (executable path, missing files, permissions; try absolute `command`), configuration errors (invalid JSON, missing fields, type mismatches), environment problems |
| Connection problems | Check client logs; verify server process is running; test standalone with Inspector; verify protocol compatibility |

```json
{
  "mcpServers": {
    "myserver": {
      "command": "mcp-server-myapp",
      "env": {
        "MYAPP_API_KEY": "some_key"
      }
    }
  }
}
```

## Notes

- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): `notifications/message` protocol logging. It remains available during the deprecation window.
- MCP defines eight RFC 5424 severity levels (`debug` through `emergency`). Clients opt in per request by setting `io.modelcontextprotocol/logLevel` in the request `_meta`; servers must not send `notifications/message` for requests that omit it.
- Protocol compatibility check: call `server/discover` to see supported protocol versions. An `UnsupportedProtocolVersionError` (`-32022`) lists the server's supported versions in its `data` field.
- Every request must carry `io.modelcontextprotocol/protocolVersion` and `io.modelcontextprotocol/clientCapabilities` in `_meta` (clients should also include `io.modelcontextprotocol/clientInfo`); a request missing either required field is rejected with `-32602`. A missing needed capability yields `MissingRequiredClientCapabilityError` (`-32021`).
- For Streamable HTTP servers stderr is not captured by the client; use server-side log aggregation or OpenTelemetry, and curl or browser DevTools Network panel.
- Claude Desktop: enable DevTools by creating `developer_settings.json` containing `{"allowDevTools": true}` (macOS: `~/Library/Application Support/Claude/developer_settings.json`; Windows: `%APPDATA%\Claude\developer_settings.json`), then `Command-Option-I` (macOS) or `Ctrl+Alt+I` (Windows). Log directories: macOS `~/Library/Logs/Claude`, Windows `%APPDATA%\Claude\logs`.
- Testing changes: configuration or server code changes require restarting the client (for Claude Desktop, fully quit and reopen).
- Sanitize logs and protect credentials when debugging.
- Claude Desktop configuration here is `claude_desktop_config.json`; Claude Code's `.mcp.json` is covered by anthropic-claude-code-extend.

## Related

- [MCP Inspector](./inspector.md)
- [Client Best Practices](./client-best-practices.md)
