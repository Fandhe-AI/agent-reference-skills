---
source: https://opencode.ai/docs/cli/web/
---

# Server

Run the web UI and background server with `opencode serve` / `pair` / `service`.

## Signature / Usage

### Pair a browser or app

Prints one-time links, plus a QR code of the first one. Links expire after 5 minutes and work once.

```bash
opencode pair
```

```bash
opencode pair --url https://dev.example.com
```

Pair from anywhere through an OpenTunnel remote address.

```bash
opencode pair --remote
```

Accept without a prompt, for example in a script without a terminal.

```bash
opencode pair --remote --yes
```

### Over SSH

```bash
ssh -L 49374:127.0.0.1:49374 my-server
```

### Background service

```bash
opencode service start
opencode service restart
opencode service status
opencode service stop
```

```bash
opencode service get hostname
opencode service set hostname 0.0.0.0
opencode service unset hostname
```

```bash
opencode service set port 49374
opencode service set password "a-long-secret"
opencode service set cors https://app.example.com,https://other.example.com
opencode service set env OPENCODE_LOG_LEVEL DEBUG
```

Disable the shared service, then return to automatic use (Source: https://opencode.ai/docs/cli/).

```bash
opencode service set disabled true
opencode service unset disabled
```

Turn remote access off:

```bash
opencode service set remote false
```

### Private or specific server

```bash
opencode --standalone
opencode --server http://localhost:4096
```

### Foreground server

```bash
opencode serve
```

```bash
opencode serve --hostname 0.0.0.0 --port 4096
```

Allow a browser client from another origin.

```bash
opencode serve --cors https://app.example.com
```

### Authentication

```bash
OPENCODE_PASSWORD="a-long-secret" opencode serve --port 4096
OPENCODE_PASSWORD="a-long-secret" opencode --server http://127.0.0.1:4096
```

Other HTTP clients use Basic auth. The username is always `opencode`.

```bash
curl -u opencode:a-long-secret http://127.0.0.1:4096/api/info
```

## Notes

- Default port: 49374 on macOS, Linux, and WSL; 28894 on Windows. Print the current address with `opencode service status`.
- Changing a setting stops the background server; run `opencode service start` to apply it.
- `opencode pair --remote` exposes the server to the internet (end-to-end encrypted, password required). Use it only when intended; `--yes` skips the confirmation.
- `--hostname 0.0.0.0` listens on every network interface; set a strong password and restrict network access.
- Replace `a-long-secret` with your own password; do not commit it or leave it in shell history on shared hosts.
- Pairing requires the shared service and is unavailable while it is disabled.

## Related

- cli.md
- network.md
- troubleshooting.md
- https://opencode.ai/docs/cli/web/
