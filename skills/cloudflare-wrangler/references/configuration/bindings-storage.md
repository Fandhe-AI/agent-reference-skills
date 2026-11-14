---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#bindings
---

# Storage Bindings (D1, KV, R2, Hyperdrive, Vectorize)

Configuration keys for binding D1 databases, KV namespaces, R2 buckets, Hyperdrive configurations and Vectorize indexes to a Worker.

## Signature / Usage

```jsonc
{
	"d1_databases": [
		{ "binding": "<BINDING_NAME>", "database_name": "<DATABASE_NAME>", "database_id": "<DATABASE_ID>" },
	],
	"kv_namespaces": [{ "binding": "<BINDING_NAME1>", "id": "<NAMESPACE_ID1>" }],
	"r2_buckets": [{ "binding": "<BINDING_NAME1>", "bucket_name": "<BUCKET_NAME1>" }],
	// required for database drivers to function
	"compatibility_flags": ["nodejs_compat_v2"],
	"hyperdrive": [{ "binding": "<BINDING_NAME>", "id": "<ID>" }],
	"vectorize": [{ "binding": "<BINDING_NAME>", "index_name": "<INDEX_NAME>" }],
}
```

```toml
# required for database drivers to function
compatibility_flags = [ "nodejs_compat_v2" ]

[[d1_databases]]
binding = "<BINDING_NAME>"
database_name = "<DATABASE_NAME>"
database_id = "<DATABASE_ID>"

[[kv_namespaces]]
binding = "<BINDING_NAME1>"
id = "<NAMESPACE_ID1>"

[[r2_buckets]]
binding = "<BINDING_NAME1>"
bucket_name = "<BUCKET_NAME1>"

[[hyperdrive]]
binding = "<BINDING_NAME>"
id = "<ID>"

[[vectorize]]
binding = "<BINDING_NAME>"
index_name = "<INDEX_NAME>"
```

## Options / Props

### D1 databases (`d1_databases`)

| Name | Type | Description |
|------|------|-------------|
| `binding` | `string` required | Binding name used to refer to the D1 database. Must be a valid JavaScript variable name, for example `MY_DB` or `productionDB`. |
| `database_name` | `string` required | Human-readable name of the database, set when you first create it. |
| `database_id` | `string` required | The ID of the database. Available from `wrangler d1 create` or `wrangler d1 list`. |
| `preview_database_id` | `string` optional | Preview ID. If provided, `wrangler dev` uses this ID; otherwise it uses `database_id`. Recommended with `wrangler dev --remote` to avoid using your production database. |
| `migrations_dir` | `string` optional | Directory containing migration files. By default `wrangler d1 migrations create` creates a folder named `migrations`. Use this to point at a different folder (for example in a mono-repo). |
| `migrations_pattern` | `string` optional | Glob pattern (relative to your Wrangler config file) used to discover migration files. Defaults to `migrations/*.sql`. Opt in to nested layouts produced by ORMs like Drizzle (for example `migrations/*/migration.sql`). When set, `migrations_dir` must also be set and the pattern must start with `migrations_dir`. Each migration is recorded in the migrations table as a path relative to `migrations_dir`. |

### KV namespaces (`kv_namespaces`)

| Name | Type | Description |
|------|------|-------------|
| `binding` | `string` required | Binding name used to refer to the KV namespace. |
| `id` | `string` required | The ID of the KV namespace. |
| `preview_id` | `string` optional | Preview ID. **Required** when using `wrangler dev --remote` (but not required with remote bindings). If developing locally, optional; `wrangler dev` uses `id` otherwise. |

### R2 buckets (`r2_buckets`)

| Name | Type | Description |
|------|------|-------------|
| `binding` | `string` required | Binding name used to refer to the R2 bucket. |
| `bucket_name` | `string` optional | The name of this R2 bucket. |
| `jurisdiction` | `string` optional | The jurisdiction where this R2 bucket is located, if specified. |
| `remote` | `boolean` optional | Connect this binding to the deployed bucket during local development. Defaults to `false`. |
| `local_dev` | `object` optional | Settings that apply only to local development. |
| `local_dev.experimental_s3_credentials` | `object` optional | Serve this local bucket through the experimental S3-compatible endpoint at `/cdn-cgi/local/r2/s3`. Requires Wrangler 4.115.0 or later. Ignored when `remote` is `true`. |
| `local_dev.experimental_s3_credentials.accessKeyId` | `string` required | An access key ID you choose for local AWS Signature Version 4 authentication. |
| `local_dev.experimental_s3_credentials.secretAccessKey` | `string` required | A secret access key you choose for local AWS Signature Version 4 authentication. These local credentials do not grant access to deployed R2 buckets. |
| `preview_bucket_name` | `string` optional | Preview name. If provided, `wrangler dev` uses it; otherwise `bucket_name`. Required when using `wrangler dev --remote` (not required with remote bindings). |

### Hyperdrive (`hyperdrive`)

| Name | Type | Description |
|------|------|-------------|
| `binding` | `string` required | The binding name. |
| `id` | `string` required | The ID of the Hyperdrive configuration. |

### Vectorize indexes (`vectorize`)

| Name | Type | Description |
|------|------|-------------|
| `binding` | `string` required | Binding name used to refer to the bound index from Worker code. |
| `index_name` | `string` required | The name of the index to bind. |

## Notes

- In the default local development mode, data is written to local storage instead of the preview or production database/namespace/bucket.
- The Hyperdrive example sets `compatibility_flags = ["nodejs_compat_v2"]`, noted as required for database drivers to function.
- Binding runtime APIs (D1, KV, R2, Hyperdrive, Vectorize) belong to cloudflare-storage; this page documents only the configuration keys.
- Bindings are non-inheritable and must be redefined in each environment (see [environments.md](./environments.md)).
- KV, R2, D1 can be auto-provisioned; see [automatic-provisioning.md](./automatic-provisioning.md).

### Release-note-only (D1)

- `jurisdiction` on a D1 binding without a `database_id` creates the database in that jurisdiction during automatic provisioning, for example `{"d1_databases":[{"binding":"DB","jurisdiction":"eu"}]}` (wrangler 4.159.0; not yet on the official configuration page). Source: https://github.com/cloudflare/workers-sdk/releases/tag/wrangler%404.159.0

- Source: https://developers.cloudflare.com/workers/wrangler/configuration/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

## Related

- [top-level-keys.md](./top-level-keys.md)
- [automatic-provisioning.md](./automatic-provisioning.md)
- [environments.md](./environments.md)
