---
source: https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging
---

# Debugging Logs

Commands to check MCP server logs in Claude Desktop and enable DevTools.

## Check logs (macOS)

```bash
tail -n 20 -F ~/Library/Logs/Claude/mcp*.log
```

Logs are written to `~/Library/Logs/Claude` on macOS and `%APPDATA%\Claude\logs` on Windows. They record connection events, configuration issues, runtime errors, and message exchanges.

## Check logs (Windows)

```powershell
type "$env:AppData\Claude\logs\mcp*.log"
```

## Enable Chrome DevTools (macOS)

> **Warning**: This overwrites `developer_settings.json` (`>` redirect). Any existing settings are lost, so check its contents first.

```bash
echo '{"allowDevTools": true}' > ~/Library/Application\ Support/Claude/developer_settings.json
```

Open DevTools with `Command-Option-I` (macOS).

## Enable Chrome DevTools (Windows)

> **Warning**: This overwrites `developer_settings.json`. Check any existing settings first.

```powershell
'{"allowDevTools": true}' | Set-Content "$env:AppData\Claude\developer_settings.json"
```

Open DevTools with `Ctrl+Alt+I` (Windows).

## Notes

- Source: tag `2026-07-28` raw (`docs/docs/2026-07-28/tools/debugging.mdx`), fetched 2026-10-16.
- For servers using the Streamable HTTP transport, stderr is not captured by the client. The source says to check with curl or the browser DevTools Network panel, but gives no specific command.
- stdio servers must not write logs to stdout (it interferes with the protocol). Write to stderr instead.
- Protocol-level logging via `notifications/message` is Deprecated in 2026-07-28.
