<!-- source: https://code.claude.com/docs/en/network-config.md / last verified: 2026-08-07 -->

# Enterprise network configuration

Configure Claude Code for enterprise environments with proxy servers, custom Certificate Authorities (CA), and mutual Transport Layer Security (mTLS) authentication.

## Signature / Usage

```bash
# Proxy
export HTTPS_PROXY=https://proxy.example.com:8080
export NO_PROXY="localhost,192.168.1.1,example.com,.example.com"

# Custom CA
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem

# mTLS
export CLAUDE_CODE_CLIENT_CERT=/path/to/client-cert.pem
export CLAUDE_CODE_CLIENT_KEY=/path/to/client-key.pem
export CLAUDE_CODE_CLIENT_KEY_PASSPHRASE="your-passphrase"

claude --debug   # verify config loaded, log at ~/.claude/debug/<session-id>.txt
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `HTTPS_PROXY` / `HTTP_PROXY` / `NO_PROXY` | env var | Standard proxy configuration; Claude Code does not support SOCKS proxies |
| `CLAUDE_CODE_CERT_STORE` | env var | Comma-separated: `bundled`, `system` (default `bundled,system`) |
| `NODE_EXTRA_CA_CERTS` | env var | Path to custom CA certificate |
| `CLAUDE_CODE_CLIENT_CERT` / `CLAUDE_CODE_CLIENT_KEY` / `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` | env var | mTLS client certificate/key |
| `CLAUDE_ENABLE_STREAM_WATCHDOG` / `CLAUDE_ENABLE_BYTE_WATCHDOG` | env var | Force streaming idle watchdogs on/off |
| `CLAUDE_STREAM_IDLE_TIMEOUT_MS` / `CLAUDE_BYTE_STREAM_IDLE_TIMEOUT_MS` | env var | Watchdog timeout tuning |
| `API_FORCE_IDLE_TIMEOUT` | env var | Force body idle timeout on/off for all providers |

## Notes

- All variables can also be set in `settings.json`; set before launch, since a running session doesn't pick up later shell changes.
- In cloud sessions, `CLAUDE_CODE_CLIENT_CERT`/`CLAUDE_CODE_CLIENT_KEY`/`NODE_EXTRA_CA_CERTS`/`NODE_TLS_REJECT_UNAUTHORIZED`/`CLAUDE_CODE_OAUTH_SCOPES` from a settings file `env` block are ignored (hosting environment manages the connection).
- In Claude Desktop sessions where the app manages the provider connection, these variables and proxy vars are read only from managed settings and `~/.claude/settings.json`, not repository settings (requires v2.1.217+ for this scoping).
- Required network access includes `api.anthropic.com`, `claude.ai`, `claude.com`, `platform.claude.com`, `mcp-proxy.anthropic.com`, `downloads.claude.ai`, `storage.googleapis.com`, `bridge.claudeusercontent.com`, `raw.githubusercontent.com`, `code.claude.com`, plus optional Datadog telemetry hosts disabled via `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`.
- Background agents (agent view supervisor) don't inherit shell exports; deliver proxy/mTLS/`processWrapper` variables via `settings.json`/managed settings, not shell `export`.

## Related

- [corporate-launcher](./corporate-launcher.md)
- [admin-setup](./admin-setup.md)
- [server-managed-settings](./server-managed-settings.md)
