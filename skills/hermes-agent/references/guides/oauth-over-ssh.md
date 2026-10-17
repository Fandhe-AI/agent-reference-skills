# OAuth over SSH / Remote Hosts

Complete loopback-redirect OAuth (Spotify, remote MCP servers) when Hermes runs on a remote machine, container, or behind a jump box.

## Signature / Usage

The listener binds `127.0.0.1:<port>` on the remote host, so forward that port from your laptop:

```bash
# Local machine, separate terminal
ssh -N -L 43827:127.0.0.1:43827 user@remote-host

# Remote SSH session
hermes spotify login --no-browser
```

Hermes prints the authorize URL and a `Waiting for callback on http://127.0.0.1:<port>/callback` line; open the URL on your laptop browser.

MCP servers: `hermes mcp login <server>`, then either paste the redirect URL (or the `?code=...&state=...` portion) at the prompt, or use `ssh -N -L <port>:127.0.0.1:<port> user@remote-host`.

Jump box:

```bash
ssh -N -L 43827:127.0.0.1:43827 -J jump-user@jump-host user@final-host
```

Older OpenSSH:

```bash
ssh -N \
    -o "ProxyCommand=ssh -W %h:%p jump-user@jump-host" \
    -L 43827:127.0.0.1:43827 \
    user@final-host
```

## Options / Props

| Provider | Loopback port | Tunnel needed? |
|----------|---------------|----------------|
| Spotify | `43827` (default) | Yes, when Hermes is remote |
| MCP servers (`auth: oauth`) | auto-picked per server | Yes (or paste redirect URL) |
| `xai-oauth` | n/a | No, device code |
| `anthropic` (Claude Pro/Max) | n/a | No, paste-the-code |
| `openai-codex` | n/a (device code default); `1455` with `--browser` / `auth.codex_login_flow: browser` | Only for the browser PKCE flow |
| `minimax`, `nous-portal` | n/a | No, device code |
| `openrouter` (`--type oauth`) | OS-assigned, local only | No; over SSH Hermes uses the headless paste-the-code flow |

## Notes

- Auth servers validate `redirect_uri` against a loopback allowlist (`http://127.0.0.1:<exact-port>/callback`); binding `0.0.0.0` or another port would be rejected, so use the tunnel.
- Desktop Skills -> MCP receives the callback on your computer and relays it, so no tunnel or `dashboard.public_url` is needed there.
- Pitfall: editing `~/.hermes/config.yaml` to add an OAuth MCP server in a running session triggers a 30s MCP reload that is too short for interactive OAuth; use `hermes mcp login <server>` from a fresh terminal (waits 5 min).
- mosh / tmux roaming does not carry `-L`; open a separate plain SSH session for the tunnel. With `ControlMaster=auto`, restart the master (`ssh -O exit user@remote-host`) if the tunnel does not come up.
- `bind [127.0.0.1]:43827: Address already in use`: find the process with `lsof -iTCP:43827 -sTCP:LISTEN` and kill it.
- Callback timeout: confirm the tunnel is alive and the port matches the latest `Waiting for callback on ...` line (Hermes may auto-bump).
- Tokens are written under the Linux user that ran `hermes auth add ...`; authenticate as the user that runs the gateway / service (`sudo -u hermes -i`).
- Source: https://hermes-agent.nousresearch.com/docs/guides/oauth-over-ssh (pinned to v0.22.2)

## Related

- [xai-grok-oauth](./xai-grok-oauth.md)
- [manage-hermes-cloud-with-mcp](./manage-hermes-cloud-with-mcp.md)
- [desktop-native-signin](./desktop-native-signin.md)
