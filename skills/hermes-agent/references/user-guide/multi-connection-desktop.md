# Connecting Desktop to Many Hermes Instances

Register every Hermes backend you own (local runtime, remote gateways on LAN or VPS, SSH hosts, Hermes Cloud instances) in one desktop app and use the agents on all of them side by side. Each registered gateway dials its own backends and WebSockets on demand; background agents keep streaming while you look at another gateway.

## Signature / Usage

Everything lives on **Settings -> Gateways** (Cmd/Ctrl+, then Gateways; the plug button on the sidebar profile rail; or Cmd/Ctrl+K then "Gateways"). Add a connection: **Add connection** -> pick kind -> fill fields -> **Save connection** -> **Test** and wait for "Reachable".

Plugin SDK surface (feature-detected; absent on older Desktop builds):

```js
host.connections()                       // registered connection list (labels, kinds, primary; never token bytes)
host.agents()                            // union roster, one row per (gateway, profile) with @name-device handle
host.ensureAgent(connectionId, profile)  // activate an agent's gateway
host.warmAgent(connectionId, profile)    // fire-and-forget socket pre-warm
```

## Options / Props

Connection kinds:

| Kind | What it is | Auth |
|---|---|---|
| Local | The Hermes runtime managed by this app | automatic |
| Remote gateway | A Hermes gateway reachable over HTTP(S) (LAN, Tailscale, internet) | session token or OAuth |
| SSH | A Hermes install reached over SSH; the app opens the tunnel and starts the dashboard | SSH key + adopted token |
| Hermes Cloud | A hosted instance discovered through your Hermes Cloud account | portal sign-in |

Fields: **Name** (required, unique case-insensitively, max 64 chars); Remote gateway: **Gateway URL** (e.g. `http://homelab.lan:9119`) and **Authentication** (Session token or OAuth); SSH: **SSH host** (`user@host:22`) and optional **Hermes path** (e.g. `/opt/hermes/bin/hermes`).

## Notes

- Union roster: handles disambiguate as `@name-device` (for example `@research-homelab`) when a profile name exists on several gateways. Enumeration is over REST; sockets are lazy; SSH connections are connect-on-demand. Opening an agent dials its own gateway; each (connection, profile) pair gets its own backend and socket.
- One connection is always **Primary** (registry fallback; **Make primary** does not switch the current workspace). The local entry is app-managed and cannot be removed. **At startup, return to Sessions on the last-used gateway** is off by default.
- **Test** probes both the HTTP and WebSocket legs. Duplicates are rejected on save: one local entry; remote/cloud deduplicated on normalized URL; SSH on normalized `user@host:port` plus remote profile. First launch of a registry-capable build imports legacy single-connection settings (a colliding name gets a suffix such as `Homelab 2`).
- Sessions sidebar: hierarchy is gateway -> profile -> sessions; Sessions show one active `(gateway, profile)` at a time. The fleet profile rail condenses past thirteen squares. Settings, files, memory, cron, and messaging are scoped to the active `(gateway, profile)`. The Capabilities page has a **Configuring** selector that edits another machine's skills/toolsets/MCP servers without switching workspace.
- **Update all instances** (Settings -> Gateways) dispatches `hermes update` to every eligible connection in parallel; Hermes Cloud entries are skipped ("Managed by Hermes Cloud"); Docker/Nix backends refuse per row.
- Security: session and OAuth tokens are stored as owner-only (0600) files in the Electron main process; optional **Encrypt saved secrets with the OS keychain**; `connections.json` holds labels/URLs/hosts only.
- The remote backend must be a running `hermes serve` process; the app does not start it (except SSH connections).
- Troubleshooting: "Connection test failed" means the backend is unreachable at that URL; HTTP passing but WebSocket failing usually means a proxy, firewall, or origin guard blocking `/api/ws`; "Update Hermes Desktop to chat with agents on other connections" means the app predates the multi-connection stack.

## Related

- [desktop.md](./desktop.md)
- [bot-mode.md](./bot-mode.md)
- [multi-profile-gateways.md](./multi-profile-gateways.md)
- [profiles.md](./profiles.md)
