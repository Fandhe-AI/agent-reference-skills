---
source: https://developers.cloudflare.com/hyperdrive/configuration/local-development/
---

# Local development

Use `wrangler dev` with `localConnectionString` (direct connection, no caching) or `wrangler dev --remote` (deployed Hyperdrive with pooling and caching).

## Signature / Usage

```sh
# Your configured Hyperdrive binding is "HYPERDRIVE"
export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="postgres://user:password@your-database-host:5432/database"
npx wrangler dev
```

```jsonc
{
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "c020574a-5623-407b-be0c-cd192bab9545",
			"localConnectionString": "postgres://user:password@localhost:5432/databasename"
		}
	]
}
```

Remote session:

```sh
npx wrangler dev --remote
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>` | env var | Local/remote connection string for the binding; takes precedence over `localConnectionString` |
| `localConnectionString` | string | Connection string in the Wrangler configuration file |

## Notes

- With `localConnectionString`, the Worker runs locally and connects directly to the database (local or remote over TLS); Hyperdrive pooling and caching do not take effect. Specify the SSL/TLS mode if required, for example `postgres://user:password@remote-host.example.com:5432/database?sslmode=require` or `mysql://user:password@remote-host.example.com:3306/database?sslMode=required`.
- The env-var approach is recommended to avoid committing credentials. Unset with `unset CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>`.
- `wrangler dev --remote` runs the Worker in Cloudflare's production environment with the deployed Hyperdrive configuration; `localConnectionString` is not used, and database writes affect production data.
- Release notes: remote DB support in local dev added 2025-12-04; the older `WRANGLER_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>` variable was introduced 2024-03-19.
- `wrangler dev` options in general: see the cloudflare-wrangler skill.

## Related

- [Getting started](./get-started.md)
- [How Hyperdrive works](./how-hyperdrive-works.md)
- [Query caching](./query-caching.md)
