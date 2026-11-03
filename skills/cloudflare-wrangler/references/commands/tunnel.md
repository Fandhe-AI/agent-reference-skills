---
source: https://developers.cloudflare.com/workers/wrangler/commands/tunnel/
---

# Tunnel

Manage Cloudflare Tunnels directly from Wrangler. Create, run, and manage tunnels that securely connect your local services to Cloudflare's network — no public IPs required.

## Signature / Usage

### `tunnel create`

Create a new remotely managed Cloudflare Tunnel.

```txt
wrangler tunnel create <NAME>
```

- `NAME` `string` required
  - A name for your tunnel. Must be unique within your account.

Tunnels created via Wrangler are always **remotely managed** — configure them in the Cloudflare dashboard (https://dash.cloudflare.com/?to=/:account/tunnels) or via the API.

After creation, use `wrangler tunnel run` with the tunnel ID to start the tunnel.

```sh
npx wrangler tunnel create my-app
```

```sh
Creating tunnel "my-app"
Created tunnel.
ID: f70ff985-a4ef-4643-bbbc-4a0ed4fc8415
Name: my-app

To run this tunnel, configure its ingress rules in the Cloudflare dashboard, then run:
   wrangler tunnel run f70ff985-a4ef-4643-bbbc-4a0ed4fc8415
```

### `tunnel delete`

Delete a Cloudflare Tunnel from your account.

```txt
wrangler tunnel delete <TUNNEL> [OPTIONS]
```

- `TUNNEL` `string` required
  - The name or UUID of the tunnel to delete.
- `--force` `boolean` optional
  - Skip the confirmation prompt.

Caution: Deleting a tunnel is permanent and cannot be undone. Any active connections through the tunnel will be terminated.

```sh
npx wrangler tunnel delete f70ff985-a4ef-4643-bbbc-4a0ed4fc8415
```

```sh
Are you sure you want to delete tunnel "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415"? This action cannot be undone. (y/n)
Deleting tunnel f70ff985-a4ef-4643-bbbc-4a0ed4fc8415
Tunnel deleted.
```

### `tunnel info`

Display details about a Cloudflare Tunnel, including its ID, name, status, and creation time.

```txt
wrangler tunnel info <TUNNEL>
```

- `TUNNEL` `string` required
  - The name or UUID of the tunnel to inspect.

```sh
npx wrangler tunnel info f70ff985-a4ef-4643-bbbc-4a0ed4fc8415
```

```sh
Getting tunnel details
ID: f70ff985-a4ef-4643-bbbc-4a0ed4fc8415
Name: my-app
Status: healthy
Created: 2025-01-15T10:30:00Z
Type: cfd_tunnel
```

### `tunnel list`

List all Cloudflare Tunnels in your account.

```txt
wrangler tunnel list
```

The output includes the tunnel ID, name, status, and creation date for each tunnel. Only non-deleted tunnels are shown.

```sh
npx wrangler tunnel list
```

```sh
Listing Cloudflare Tunnels

ID                                   Name       Status    Created
f70ff985-a4ef-4643-bbbc-4a0ed4fc8415 my-app     healthy   2025-01-15T10:30:00Z
550e8400-e29b-41d4-a716-446655440000 api-tunnel inactive  2025-01-10T15:45:00Z
```

### `tunnel run`

Run a Cloudflare Tunnel using the cloudflared daemon. This starts a persistent connection between your local machine and Cloudflare's network.

```txt
wrangler tunnel run [TUNNEL] [OPTIONS]
```

- `TUNNEL` `string` optional
  - The name or UUID of the tunnel to run. Required unless `--token` is provided.
- `--token` `string` optional
  - A tunnel token to use directly. Skips API authentication.
- `--log-level` `string` (default: info) optional
  - Log level for `cloudflared`. Does not affect Wrangler logs (controlled by `WRANGLER_LOG`). One of: `debug`, `info`, `warn`, `error`, `fatal`.

Named tunnels are **remotely managed** — configure ingress rules (which local services to expose) in the Cloudflare dashboard or via the API before running the tunnel.

There are two ways to run a tunnel:

**By tunnel name or ID** (fetches the token via the API):

```sh
npx wrangler tunnel run my-app
```

**By token** (no API authentication needed — useful for CI/CD or remote servers):

```sh
npx wrangler tunnel run --token eyJhIjoiNGE2MjY...
```

Note: The tunnel token is passed to `cloudflared` via the `TUNNEL_TOKEN` environment variable rather than CLI arguments, preventing it from appearing in process listings.

Press `Ctrl+C` to stop the tunnel. Wrangler will send a graceful shutdown signal to `cloudflared` before exiting.

### `tunnel quick-start`

Start a free, temporary tunnel without a Cloudflare account using Quick Tunnels. This is useful for quick demos, testing webhooks, or sharing local development servers.

```txt
wrangler tunnel quick-start <URL>
```

- `URL` `string` required
  - The local URL to expose (for example, `http://localhost:8080`).

The tunnel is assigned a random `*.trycloudflare.com` subdomain and lasts for the duration of the process.

```sh
npx wrangler tunnel quick-start http://localhost:8080
```

```sh
Starting quick tunnel to http://localhost:8080...
Your tunnel URL: https://random-words-here.trycloudflare.com
```

Note: Quick tunnels are anonymous and temporary — they do not appear in your account's tunnel list and cannot be configured. For production use, create a named tunnel with `wrangler tunnel create`.

## Options / Props

The following global flags work on every command (as listed on this page):

| Flag | Type | Description |
| --- | --- | --- |
| `--help` | boolean | Show help. |
| `--config` | string | Path to your Wrangler configuration file. (not supported by Pages) |
| `--cwd` | string | Run as if Wrangler was started in the specified directory instead of the current working directory. |

## Notes

- All `wrangler tunnel` commands are **experimental** and may change without notice.
- Wrangler manages the `cloudflared` binary automatically. On first use, Wrangler will prompt you to download `cloudflared` to a local cache directory. You can skip this by installing `cloudflared` yourself and adding it to your `PATH`, or by setting the `CLOUDFLARED_PATH` environment variable to point to an existing binary.
- The "(not supported by Pages)" text on `--config` is verbatim from the official page, which does not scope it further; `wrangler pages` commands list `--config` on their own page.
- This page lists a three-flag global set (`--help`, `--config`, `--cwd`), which differs from the seven-flag block on most other command pages.

## Related

- [VPC](./vpc.md)
- [Global flags](./global-flags.md)
