---
source: https://developers.cloudflare.com/workers/wrangler/commands/vpc/
---

# VPC

Manage Workers VPC services using Wrangler. VPC services allow your Workers to connect to private services on your network through Cloudflare Tunnels.

## Signature / Usage

```sh
npx wrangler vpc service create <NAME>
npx wrangler vpc service delete <SERVICE-ID>
npx wrangler vpc service get <SERVICE-ID>
npx wrangler vpc service list
npx wrangler vpc service update <SERVICE-ID>
```

## Options / Props

### `vpc service create`

Create a new VPC service

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `<NAME>` | string | yes | The name of the VPC service |
| `--type` | string | yes | The type of the VPC service |
| `--tcp-port` | number | no | TCP port number |
| `--app-protocol` | string | no | Application protocol for the TCP service |
| `--http-port` | number | no | HTTP port (default: 80) |
| `--https-port` | number | no | HTTPS port number (default: 443) |
| `--ipv4` | string | no | IPv4 address for the host [conflicts with --ipv6] |
| `--ipv6` | string | no | IPv6 address for the host [conflicts with --ipv4] |
| `--hostname` | string | no | Hostname for the host |
| `--resolver-ips` | string | no | Comma-separated list of resolver IPs |
| `--tunnel-id` | string | yes | UUID of the Cloudflare tunnel |
| `--cert-verification-mode` | string | no | TLS certificate verification mode for the connection to the origin |

### `vpc service delete`

Delete a VPC service

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `<SERVICE-ID>` | string | yes | The ID of the service to delete |

### `vpc service get`

Get a VPC service

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `<SERVICE-ID>` | string | yes | The ID of the VPC service |

### `vpc service list`

List VPC services. No command-specific flags.

### `vpc service update`

Update a VPC service

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `<SERVICE-ID>` | string | yes | The ID of the VPC service to update |
| `--name` | string | yes | The name of the VPC service |
| `--type` | string | yes | The type of the VPC service |
| `--tcp-port` | number | no | TCP port number |
| `--app-protocol` | string | no | Application protocol for the TCP service |
| `--http-port` | number | no | HTTP port (default: 80) |
| `--https-port` | number | no | HTTPS port number (default: 443) |
| `--ipv4` | string | no | IPv4 address for the host [conflicts with --ipv6] |
| `--ipv6` | string | no | IPv6 address for the host [conflicts with --ipv4] |
| `--hostname` | string | no | Hostname for the host |
| `--resolver-ips` | string | no | Comma-separated list of resolver IPs |
| `--tunnel-id` | string | yes | UUID of the Cloudflare tunnel |
| `--cert-verification-mode` | string | no | TLS certificate verification mode for the connection to the origin |

## Notes

- Each command also accepts the global flags; see the global flags page.
- The official page does not enumerate valid values for `--type`, `--app-protocol`, or `--cert-verification-mode`.

## Related

- [Global flags](./global-flags.md)
- [Tunnel](./tunnel.md)
