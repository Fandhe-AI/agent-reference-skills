---
source: https://developers.cloudflare.com/workers/wrangler/commands/hyperdrive/
---

# Hyperdrive

Manage Hyperdrive database configurations using Wrangler.

## Signature / Usage

```sh
npx wrangler hyperdrive create <NAME>
npx wrangler hyperdrive delete <ID>
npx wrangler hyperdrive get <ID>
npx wrangler hyperdrive list
npx wrangler hyperdrive planetscale signature
npx wrangler hyperdrive update <ID>
```

## Options / Props

### `hyperdrive create`

Create a Hyperdrive config

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the Hyperdrive config |
| `--connection-string` | string | — | The connection string for the database you want Hyperdrive to connect to - ex: protocol://user:password@host:port/database |
| `--service-id` | string | — | The Workers VPC Service ID of the origin database |
| `--origin-host` | string (alias `--host`) | — | The host of the origin database |
| `--origin-port` | number (alias `--port`) | — | The port number of the origin database |
| `--origin-scheme` | string (alias `--scheme`) | postgresql | The scheme used to connect to the origin database |
| `--database` | string | — | The name of the database within the origin database |
| `--origin-user` | string (alias `--user`) | — | The username used to connect to the origin database |
| `--origin-password` | string (alias `--password`) | — | The password used to connect to the origin database |
| `--access-client-id` | string | — | The Client ID of the Access token to use when connecting to the origin database |
| `--access-client-secret` | string | — | The Client Secret of the Access token to use when connecting to the origin database |
| `--caching-disabled` | boolean | — | Disables the caching of SQL responses |
| `--max-age` | number | — | Specifies max duration for which items should persist in the cache, cannot be set when caching is disabled |
| `--swr` | number | — | Indicates the number of seconds cache may serve the response after it becomes stale, cannot be set when caching is disabled |
| `--ca-certificate-id` | string (alias `--ca-certificate-uuid`) | — | Sets custom CA certificate when connecting to origin database. Must be valid UUID of already uploaded CA certificate. |
| `--mtls-certificate-id` | string (alias `--mtls-certificate-uuid`) | — | Sets custom mTLS client certificates when connecting to origin database. Must be valid UUID of already uploaded public/private key certificates. |
| `--sslmode` | string | — | Sets sslmode for connecting to database. For PostgreSQL: 'require, verify-ca, verify-full'. For MySQL: 'REQUIRED, VERIFY_CA, VERIFY_IDENTITY'. |
| `--origin-connection-limit` | number | — | The (soft) maximum number of connections that Hyperdrive may establish to the origin database |
| `--binding` | string | — | The binding name of this resource in your Worker |
| `--update-config` | boolean | — | Automatically update your config file with the newly added resource |

### `hyperdrive delete`

Delete a Hyperdrive config

| Flag | Type | Description |
| --- | --- | --- |
| `<ID>` | string (required) | The ID of the Hyperdrive config |

### `hyperdrive get`

Get a Hyperdrive config

| Flag | Type | Description |
| --- | --- | --- |
| `<ID>` | string (required) | The ID of the Hyperdrive config |

### `hyperdrive list`

List Hyperdrive configs. No command-specific flags.

### `hyperdrive planetscale signature`

Experimental. Generate a signed authorization for creating a Cloudflare-billed PlanetScale database. No command-specific flags.

### `hyperdrive update`

Update a Hyperdrive config

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<ID>` | string (required) | — | The ID of the Hyperdrive config |
| `--name` | string | — | Give your config a new name |
| `--connection-string` | string | — | The connection string for the database you want Hyperdrive to connect to - ex: protocol://user:password@host:port/database |
| `--service-id` | string | — | The Workers VPC Service ID of the origin database |
| `--origin-host` | string (alias `--host`) | — | The host of the origin database |
| `--origin-port` | number (alias `--port`) | — | The port number of the origin database |
| `--origin-scheme` | string (alias `--scheme`) | — | The scheme used to connect to the origin database |
| `--database` | string | — | The name of the database within the origin database |
| `--origin-user` | string (alias `--user`) | — | The username used to connect to the origin database |
| `--origin-password` | string (alias `--password`) | — | The password used to connect to the origin database |
| `--access-client-id` | string | — | The Client ID of the Access token to use when connecting to the origin database |
| `--access-client-secret` | string | — | The Client Secret of the Access token to use when connecting to the origin database |
| `--caching-disabled` | boolean | — | Disables the caching of SQL responses |
| `--max-age` | number | — | Specifies max duration for which items should persist in the cache, cannot be set when caching is disabled |
| `--swr` | number | — | Indicates the number of seconds cache may serve the response after it becomes stale, cannot be set when caching is disabled |
| `--ca-certificate-id` | string (alias `--ca-certificate-uuid`) | — | Sets custom CA certificate when connecting to origin database. Must be valid UUID of already uploaded CA certificate. |
| `--mtls-certificate-id` | string (alias `--mtls-certificate-uuid`) | — | Sets custom mTLS client certificates when connecting to origin database. Must be valid UUID of already uploaded public/private key certificates. |
| `--sslmode` | string | — | Sets sslmode for connecting to database. For PostgreSQL: 'require, verify-ca, verify-full'. For MySQL: 'REQUIRED, VERIFY_CA, VERIFY_IDENTITY'. |
| `--origin-connection-limit` | number | — | The (soft) maximum number of connections that Hyperdrive may establish to the origin database |

## Notes

- To manage mTLS client certificates and CA chain certificates used by Hyperdrive, see the certificates commands page.
- `hyperdrive update` has no `--binding` / `--update-config` flags; `hyperdrive create` has no `--name` flag (name is positional).
- Hyperdrive binding usage in Workers code is covered by the cloudflare-storage skill.
- Each command also accepts the global flags; see the global flags page.

## Related

- [Certificates](./certificates.md)
- [VPC](./vpc.md)
- [Global flags](./global-flags.md)
