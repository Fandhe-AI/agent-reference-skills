# Connecting Desktop to Many Hermes Instances

Register every Hermes backend you own (local runtime, remote gateways on LAN or VPS, SSH hosts, Hermes Cloud instances) in one desktop app and use the agents on all of them side by side. Every registered gateway is connected all the time: Desktop dials each one at startup, keeps the connection open and redials it if it drops, so background agents keep streaming whichever gateway you are looking at.

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

- Official-page discrepancy (kept verbatim above): this page says `hermes gateway ensure` attaches to the profile's running gateway or installs and starts a persistent per-profile gateway, whereas the Desktop page says `ensure` never installs a service and attaches or starts a detached daemon; see desktop.md. Verify with `hermes gateway ensure --help` on the installed version before relying on either.
- Union roster: handles disambiguate as `@name-device` (for example `@research-homelab`) when a profile name exists on several gateways. Every registered gateway, SSH included, connects when Desktop starts and stays connected: its default profile holds one open connection for the life of the window and is redialed every 30 seconds while down; an unreachable gateway reports per-row. With a remote primary, **This device** is kept connected too when Hermes is installed here. Opening an agent dials its own gateway; each (connection, profile) pair gets its own socket and Desktop caches the dialed gateway descriptor. Desktop never spawns or reaps a remote gateway; for a local profile the first open runs `hermes gateway ensure` (attach, or install and start a persistent per-profile gateway: systemd/launchd service or detached daemon) which keeps running after the app closes until `hermes gateway stop`.
- One connection is always **Primary** (registry fallback; **Make primary** does not switch the current workspace). The local entry is app-managed and cannot be removed. **At startup, return to Sessions on the last-used gateway** is off by default.
- **Test** probes both the HTTP and WebSocket legs. In the Webapp, **Test** on an SSH row opens the managed tunnel the gateway uses, which starts (or reuses) `hermes serve` on the remote machine without cleaning it up afterwards; it stops when you remove the connection or stop the gateway, or after the remote idle timeout (`dashboard.ssh_isolated_idle_grace_s`, 15 minutes by default) while no client is connected and no work is running. Duplicates are rejected on save: one local entry; remote/cloud deduplicated on normalized URL; SSH on normalized `user@host:port` plus remote profile. First launch of a registry-capable build imports legacy single-connection settings once (a colliding name gets a suffix such as `Homelab 2`); old files are not read again, so a removed connection stays removed (also in the Webapp), and removing one clears its sign-in credentials and cookie session.
- Sessions sidebar: hierarchy is gateway -> profile -> sessions. With **All profiles** selected the Sessions list shows every registered gateway's sessions at once (group by **Gateway & profile**); opening one talks to its own gateway directly, and a new chat runs on exactly one `(gateway, profile)`. Picking a gateway is instant (already connected, no confirmation, sessions on the one you leave keep running); **This device** asks for confirmation only when Hermes is not installed on this computer. In the fleet profile rail only the selected profile is highlighted; right-click on another gateway's square offers **Open**, **Color**, **Rename**, **Edit SOUL.md**, **Delete** (v0.22.2: **Switch to** and dimmed "at rest" squares). The fleet profile rail condenses past thirteen squares. Settings, files, memory, cron, and messaging are scoped to the active `(gateway, profile)`. The Capabilities page has a **Configuring** selector that edits another machine's skills/toolsets/MCP servers without switching workspace.
- **Update all instances** (Settings -> Gateways) dispatches `hermes update` to every eligible connection in parallel; Hermes Cloud entries are skipped ("Managed by Hermes Cloud"); Docker/Nix backends refuse per row.
- Security: the saved list is `gateway-connections.json` in the Hermes home (labels, URLs, SSH hosts, each connection's session token and extra headers); sign-in (OAuth) credentials are in `gateway-connection-tokens.json` next to it. Both are owner-only (0600) files shared by the Electron main process and the Webapp's server; secrets are plain text in them and not run through the OS keychain (a secret an older build encrypted with the keychain is decrypted once on import; one that will not decrypt is kept and listed in `importNotices`). The first launch copies `connections.json`, `connection.json` and `native-oauth-tokens.json` from the app's user-data directory; those old files stay untouched. The renderer and plugins never see token bytes.
- The remote backend must be a running `hermes serve` process; the app does not start it (except SSH connections, where the app opens the tunnel and starts the dashboard when Desktop launches).
- Troubleshooting: "Connection test failed" means the backend is unreachable at that URL; HTTP passing but WebSocket failing usually means a proxy, firewall, or origin guard blocking `/api/ws`; "Update Hermes Desktop to chat with agents on other connections" means the app predates the multi-connection stack.
- A remote gateway missing from the roster is down or unreachable; the roster lists it with the error and Desktop keeps redialing it (v0.22.2: SSH connections showed *connect-on-demand* until first use).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/multi-connection-desktop (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Migration (v0.22 -> v0.23): connections are no longer lazy / connect-on-demand (v0.22.2) but always connected; the optional "Encrypt saved secrets with the OS keychain" setting no longer applies, since tokens moved from the app's user-data `connections.json` / `native-oauth-tokens.json` to plain-text 0600 files in the Hermes home (`gateway-connections.json`, `gateway-connection-tokens.json`); Desktop no longer pools per-profile backends with idle reaping.

## Related

- [desktop.md](./desktop.md)
- [bot-mode.md](./bot-mode.md)
- [multi-profile-gateways.md](./multi-profile-gateways.md)
- [profiles.md](./profiles.md)
