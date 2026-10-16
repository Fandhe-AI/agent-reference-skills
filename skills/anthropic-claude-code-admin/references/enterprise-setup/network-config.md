<!-- source: https://code.claude.com/docs/en/network-config.md / last verified: 2026-10-16 -->

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
| `HTTPS_PROXY` / `HTTP_PROXY` / `NO_PROXY` | env var | Standard proxy configuration; lowercase variants also work and the first one set wins in the order `https_proxy`, `HTTPS_PROXY`, `http_proxy`, `HTTP_PROXY`; Claude Code does not support SOCKS proxies. WebSocket connections to `localhost`, `::1`, `127.0.0.0/8` never go through the proxy |
| `CLAUDE_CODE_CERT_STORE` | env var | Comma-separated: `bundled`, `system` (default `bundled,system`) |
| `NODE_EXTRA_CA_CERTS` | env var | Path to custom CA certificate |
| `CLAUDE_CODE_CLIENT_CERT` / `CLAUDE_CODE_CLIENT_KEY` / `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` | env var | mTLS client certificate/key |
| `CLAUDE_ENABLE_STREAM_WATCHDOG` / `CLAUDE_ENABLE_BYTE_WATCHDOG` | env var | Force streaming idle watchdogs on/off |
| `CLAUDE_STREAM_IDLE_TIMEOUT_MS` / `CLAUDE_BYTE_STREAM_IDLE_TIMEOUT_MS` | env var | Watchdog timeout tuning (idle values below 5 min are raised to 5 min; byte-level capped at 30 min; `CLAUDE_BYTE_STREAM_IDLE_TIMEOUT_MS` clamped to 10 s–30 min and takes precedence for the byte-level watchdog) |
| `CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS` | env var | Sets the first-byte deadline directly; unset, it follows the byte-level watchdog's timeout |
| `CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK` | env var | `1` opts Amazon Bedrock into the byte-level watchdog / first-byte deadline (replaces the body idle timeout on Bedrock) |
| `API_FORCE_IDLE_TIMEOUT` | env var | Force body idle timeout on/off for all providers |

## Notes

- All variables can also be set in `settings.json`; set before launch, since a running session doesn't pick up later shell changes.
- In cloud sessions, `CLAUDE_CODE_CLIENT_CERT`/`CLAUDE_CODE_CLIENT_KEY`/`NODE_EXTRA_CA_CERTS`/`NODE_TLS_REJECT_UNAUTHORIZED`/`CLAUDE_CODE_OAUTH_SCOPES` from a settings file `env` block are ignored (hosting environment manages the connection).
- In Claude Desktop sessions where the app manages the provider connection, these variables and proxy vars are read only from managed settings and `~/.claude/settings.json`, not repository settings (requires v2.1.217+ for this scoping).
- Streaming watchdogs: four independent timers abort a quiet streaming response. First-byte deadline (no response headers; 180 s on the direct Anthropic API, 300 s elsewhere, plus 1 s per 32KB of request body; direct API and Claude Platform on AWS but not via `ANTHROPIC_BASE_URL` / `ANTHROPIC_AWS_BASE_URL` gateways; opt-in on Bedrock with `CLAUDE_ENABLE_BYTE_WATCHDOG_BEDROCK=1`; not on Agent Platform or Foundry); event-level watchdog (300 s, every provider); byte-level watchdog (180 s direct API; 300 s on Claude Platform on AWS, Bedrock, Claude apps gateway and custom `ANTHROPIC_BASE_URL`); body idle timeout (5 min, providers not covered by the byte-level watchdog, unless `API_FORCE_IDLE_TIMEOUT` changes it). `CLAUDE_ENABLE_BYTE_WATCHDOG=0` also turns off the first-byte deadline.
- Required network access includes `api.anthropic.com`, `claude.ai`, `claude.com`, `platform.claude.com`, `mcp-proxy.anthropic.com`, `downloads.claude.ai`, `storage.googleapis.com` (plugin install counts and metadata shown in `/plugin`; also the native installer/auto-updater before 2.1.116), `registry.npmjs.org` (plugin installs, `npx`-launched MCP servers, npm/bun installs of Claude Code), `*.frame.claudeusercontent.com` (Artifact content reads; drop with `"enableArtifact": false` or `CLAUDE_CODE_DISABLE_ARTIFACT=1`), `bridge.claudeusercontent.com`, `github.com` (cloning plugin marketplaces, including the official one), `raw.githubusercontent.com`, `*-review.googlesource.com` (Gerrit change lookup, optional), `formulae.brew.sh` (Homebrew update checks only), `code.claude.com`, plus optional Datadog telemetry hosts `http-intake.logs.us5.datadoghq.com` (telemetry events, direct Anthropic API only) and `browser-intake-us5-datadoghq.com` (error reports) disabled via `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`. On Bedrock, Agent Platform, Foundry, or a signed-in Claude apps gateway session, model traffic and auth go to the provider/gateway, but WebFetch still calls `api.anthropic.com` for its domain safety check unless `skipWebFetchPreflight: true`.
- Organization IP allowlists: route `bridge.claudeusercontent.com` through the same proxy egress as `claude.ai` and `api.anthropic.com` (e.g. same Zscaler app segment or Netskope policy); otherwise add a dedicated (not shared) proxy egress address to the organization's IP allowlist, or Claude in Chrome can't connect. GitHub: for GitHub Enterprise Cloud IP restrictions, enable IP allow list inheritance for installed GitHub Apps and add Anthropic's outbound IP addresses; GitHub Enterprise Server behind a firewall needs Anthropic's outbound IPs allowlisted for Anthropic-hosted sessions (self-hosted environments reach it from inside your network).
- Desktop and claude.ai load additional Anthropic CDN hosts (`assets-proxy.anthropic.com`, other `*.claudeusercontent.com` origins); allowing `claude.ai` while blocking them gives a blank page. MCP Apps widgets load from `*.claudemcpcontent.com` (keep the wildcard). Artifacts may also request `fonts.googleapis.com` / `fonts.gstatic.com` (optional) and `cdnjs.cloudflare.com`, `cdn.jsdelivr.net`, `cdn.tailwindcss.com`, `code.jquery.com`, `unpkg.com` (libraries; no fallback if blocked).
- A proxy URL may carry basic-auth credentials (`http://user:pass@host:port`); for NTLM, Kerberos, etc. use an LLM gateway that supports the method. Claude Code stops launch if it can't parse the proxy URL (e.g. missing `http://`).
- Sessions with `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` ignore CA-bundle, tool-proxy, git TLS and git config variables such as `SSL_CERT_FILE` in settings (under Claude Desktop, only in project settings) (v2.1.300, changelog).
- mTLS files are re-read when settings apply and on a connection-level API failure (v2.1.232+); OTLP exporters keep the certificate loaded at first use (restart to rotate). `CLAUDE_CODE_DISABLE_MTLS_RELOAD_ON_STALE_CONNECTION=1` turns the re-read off. The system certificate store needs a runtime with `tls.getCACertificates` (native installer always; npm installs need Node 22.15+).
- Background agents (agent view supervisor) don't inherit shell exports; deliver proxy/mTLS/`processWrapper` variables via `settings.json`/managed settings, not shell `export`.

## Related

- [corporate-launcher](./corporate-launcher.md)
- [admin-setup](./admin-setup.md)
- [server-managed-settings](./server-managed-settings.md)
