---
source: https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database-vpc/
---

# Connect to a private database using Workers VPC (Recommended)

Connect Hyperdrive to a private database through a TCP VPC Service and Cloudflare Tunnel, without Access applications or service tokens.

## Signature / Usage

Create a TCP VPC Service (set `--app-protocol` to `postgresql` or `mysql`):

```sh
npx wrangler vpc service create my-postgres-db \
  --type tcp \
  --tcp-port 5432 \
  --app-protocol postgresql \
  --tunnel-id <YOUR_TUNNEL_ID> \
  --ipv4 <YOUR_DATABASE_IP>
```

```sh
npx wrangler vpc service create my-mysql-db \
  --type tcp \
  --tcp-port 3306 \
  --app-protocol mysql \
  --tunnel-id <YOUR_TUNNEL_ID> \
  --ipv4 <YOUR_DATABASE_IP>
```

Create the Hyperdrive configuration from the service ID:

```sh
npx wrangler hyperdrive create <YOUR_CONFIG_NAME> \
  --service-id <YOUR_VPC_SERVICE_ID> \
  --database <DATABASE_NAME> \
  --user <DATABASE_USER> \
  --password <DATABASE_PASSWORD> \
  --scheme postgresql
```

```sh
npx wrangler hyperdrive create <YOUR_CONFIG_NAME> \
  --service-id <YOUR_VPC_SERVICE_ID> \
  --database <DATABASE_NAME> \
  --user <DATABASE_USER> \
  --password <DATABASE_PASSWORD> \
  --scheme mysql
```

Certificate whose chain is publicly trusted (or Cloudflare Origin CA) but whose hostname does not match:

Adapted (not in the official docs): heading text narrowed from "Self-signed certificate" because `verify_ca` still validates the chain; see Notes.

```sh
npx wrangler vpc service create my-postgres-db \
  --type tcp \
  --tcp-port 5432 \
  --app-protocol postgresql \
  --tunnel-id <YOUR_TUNNEL_ID> \
  --ipv4 <YOUR_DATABASE_IP> \
  --cert-verification-mode verify_ca
```

Binding and Worker config:

```jsonc
{
	// required for database drivers to function
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<your-hyperdrive-id-here>"
		}
	]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--service-id` | string | Workers VPC Service ID; replaces `--origin-host`, `--origin-port`, `--connection-string`, `--access-client-id`, `--access-client-secret` (conflicts with them) |
| `--cert-verification-mode` | `verify_full` (default) / `verify_ca` / `disabled` | TLS verification on the VPC Service; `verify_ca` skips only the hostname check (chain still validated against trusted CAs), `disabled` skips verification (dev/test only) |
| `--hostname` | string | DNS name instead of `--ipv4` |

## Notes

- Flow: Worker -> Hyperdrive -> VPC Service -> Cloudflare Tunnel (`cloudflared` in the private network) -> private database.
- Prerequisites: a database configured for TLS/SSL, a Cloudflare Tunnel in a network that can reach it, and the **Connectivity Directory Admin** role.
- Workers VPC defaults to `verify_full` (certificate chain and hostname). Corrected from the official docs: the official page says Hyperdrive "does not verify the origin server certificate by default", but the TLS pages ([tls-ssl-certificates](./tls-ssl-certificates.md), [supported-databases-and-features](./supported-databases-and-features.md)) state the Hyperdrive default `require`/`REQUIRED` validates the server certificate against WebPKI (without CA pinning or hostname checks). Workers VPC trusts only publicly trusted certificates and Cloudflare Origin CA certificates; uploading a custom CA is not supported yet. Adapted from the official docs: the official page suggests `verify_ca` for self-signed certificates, but `verify_ca` skips only the hostname check and still validates the chain, so with no custom CA trusted it cannot accept an arbitrary self-signed or private-CA certificate. Use `verify_ca` only when the chain is publicly trusted or Origin CA but the hostname does not match; for self-signed or private-CA certificates the remaining option is `disabled` (development/testing only, no certificate verification). Custom CA upload with `--ca-certificate-id` is documented in [tls-ssl-certificates](./tls-ssl-certificates.md) for Hyperdrive's own origin connection, not for Workers VPC Services. Use `wrangler vpc service update` to change an existing service.
- To move an existing configuration to a VPC Service, run `wrangler hyperdrive update` with `--service-id`.
- Minimum driver versions: `pg` 8.16.3 or later, `mysql2` 3.13.0 or later (with `disableEval: true`); the official text writes `>` but states 8.16.3 / 3.13.0 as the minimum.
- Workers VPC is not covered by this skill; see https://developers.cloudflare.com/workers-vpc/. Wrangler `vpc` commands: see the cloudflare-wrangler skill.

## Related

- [Connect to a private database using Tunnel](./connect-private-database-tunnel.md)
- [Firewall and networking configuration](./firewall-and-networking.md)
- [Getting started](./get-started.md)
