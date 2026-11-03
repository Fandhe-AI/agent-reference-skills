---
source: https://developers.cloudflare.com/hyperdrive/reference/wrangler-commands/
---

# Wrangler commands

Wrangler commands for creating, updating, listing, getting, and deleting Hyperdrive configurations.

## Signature / Usage

```sh
npx wrangler hyperdrive create <NAME>
npx wrangler hyperdrive update <ID>
npx wrangler hyperdrive get <ID>
npx wrangler hyperdrive list
npx wrangler hyperdrive delete <ID>
npx wrangler hyperdrive planetscale signature
```

## Options / Props

`hyperdrive create <NAME>` (`<NAME>` string, required) and `hyperdrive update <ID>` (`<ID>` string, required) flags:

| Name | Type | Description |
|------|------|-------------|
| `--name` | string | (`update` only) Give your config a new name |
| `--connection-string` | string | The connection string for the database you want Hyperdrive to connect to - ex: protocol://user:password@host:port/database |
| `--service-id` | string | The Workers VPC Service ID of the origin database |
| `--origin-host` (alias `--host`) | string | The host of the origin database |
| `--origin-port` (alias `--port`) | number | The port number of the origin database |
| `--origin-scheme` (alias `--scheme`) | string | The scheme used to connect to the origin database (`create` default: postgresql) |
| `--database` | string | The name of the database within the origin database |
| `--origin-user` (alias `--user`) | string | The username used to connect to the origin database |
| `--origin-password` (alias `--password`) | string | The password used to connect to the origin database |
| `--access-client-id` | string | The Client ID of the Access token to use when connecting to the origin database |
| `--access-client-secret` | string | The Client Secret of the Access token to use when connecting to the origin database |
| `--caching-disabled` | boolean | Disables the caching of SQL responses |
| `--max-age` | number | Specifies max duration for which items should persist in the cache, cannot be set when caching is disabled |
| `--swr` | number | Indicates the number of seconds cache may serve the response after it becomes stale, cannot be set when caching is disabled |
| `--ca-certificate-id` (alias `--ca-certificate-uuid`) | string | Sets custom CA certificate when connecting to origin database. Must be valid UUID of already uploaded CA certificate. |
| `--mtls-certificate-id` (alias `--mtls-certificate-uuid`) | string | Sets custom mTLS client certificates when connecting to origin database. Must be valid UUID of already uploaded public/private key certificates. |
| `--sslmode` | string | Sets sslmode for connecting to database. For PostgreSQL: 'require, verify-ca, verify-full'. For MySQL: 'REQUIRED, VERIFY_CA, VERIFY_IDENTITY'. |
| `--origin-connection-limit` | number | The (soft) maximum number of connections that Hyperdrive may establish to the origin database |
| `--binding` | string | (`create` only) The binding name of this resource in your Worker |
| `--update-config` | boolean | (`create` only) Automatically update your config file with the newly added resource |

`hyperdrive delete <ID>`, `hyperdrive get <ID>`: `<ID>` string, required, the ID of the Hyperdrive config. `hyperdrive list` takes no arguments.

Global flags: `--v` (alias `--version`), `--cwd`, `--config` (alias `--c`), `--env` (alias `--e`), `--env-file`, `--install-skills` (default false), `--profile`.

## Notes

- `hyperdrive planetscale signature` is experimental: generates a signed authorization for creating a Cloudflare-billed PlanetScale database (see [planetscale](./planetscale.md)).
- Wrangler installation and global flags in general: see the cloudflare-wrangler skill.

## Related

- [Getting started](./get-started.md)
- [Rotating database credentials](./rotate-credentials.md)
- [TLS/SSL certificates](./tls-ssl-certificates.md)
- [Tune connection pooling](./tune-connection-pool.md)
