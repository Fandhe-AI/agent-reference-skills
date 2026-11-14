---
source: https://developers.cloudflare.com/workers/previews/resources/
---

# Preview Resources and Isolation

Which Preview resources are shared, which are isolated, D1 migration workflow, and invocation limitations.

## Signature / Usage

Durable Objects with `ctx.exports` (recommended; needs `enable_ctx_exports`, default for `compatibility_date` 2025-11-17+). The migration alone gives automatic Preview isolation:

```jsonc
{
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"migrations": [
		{ "tag": "v1", "new_classes": ["Counter"] }
	],
	"previews": {}
}
```

```toml
# Set this to today's date
compatibility_date = "2026-11-03"
previews = { }

[[migrations]]
tag = "v1"
new_classes = [ "Counter" ]
```

With an `env` binding (declare it in `previews` too):

```jsonc
{
	"durable_objects": {
		"bindings": [
			{ "name": "COUNTER", "class_name": "Counter" }
		]
	},
	"migrations": [
		{ "tag": "v1", "new_classes": ["Counter"] }
	],
	"previews": {
		"durable_objects": {
			"bindings": [
				{ "name": "COUNTER", "class_name": "Counter" }
			]
		}
	}
}
```

```toml
[[durable_objects.bindings]]
name = "COUNTER"
class_name = "Counter"

[[migrations]]
tag = "v1"
new_classes = [ "Counter" ]

[[previews.durable_objects.bindings]]
name = "COUNTER"
class_name = "Counter"
```

Containers (container config under `previews.containers`; no `env` binding):

```ts
const container = ctx.exports.MyContainer.getByName("tenant-a");
return container.fetch(request);
```

```jsonc
{
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"migrations": [
		{ "tag": "v1", "new_sqlite_classes": ["MyContainer"] }
	],
	"containers": [
		{
			"class_name": "MyContainer",
			"image": "./Dockerfile",
			"max_instances": 10,
			"instance_type": "basic"
		}
	],
	"previews": {
		"containers": [
			{
				"class_name": "MyContainer",
				"image": "./Dockerfile",
				"max_instances": 10,
				"instance_type": "basic"
			}
		]
	}
}
```

```toml
# Set this to today's date
compatibility_date = "2026-11-03"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "MyContainer" ]

[[containers]]
class_name = "MyContainer"
image = "./Dockerfile"
max_instances = 10
instance_type = "basic"

[[previews.containers]]
class_name = "MyContainer"
image = "./Dockerfile"
max_instances = 10
instance_type = "basic"
```

With an `env` container binding:

```ts
const container = env.MY_CONTAINER.getByName("tenant-a");
return container.fetch(request);
```

```jsonc
{
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"migrations": [
		{ "tag": "v1", "new_sqlite_classes": ["MyContainer"] }
	],
	"containers": [
		{
			"class_name": "MyContainer",
			"image": "./Dockerfile",
			"max_instances": 10,
			"instance_type": "basic"
		}
	],
	"durable_objects": {
		"bindings": [
			{ "name": "MY_CONTAINER", "class_name": "MyContainer" }
		]
	},
	"previews": {
		"containers": [
			{
				"class_name": "MyContainer",
				"image": "./Dockerfile",
				"max_instances": 10,
				"instance_type": "basic"
			}
		],
		"durable_objects": {
			"bindings": [
				{ "name": "MY_CONTAINER", "class_name": "MyContainer" }
			]
		}
	}
}
```

Container cleanup after deleting a Preview:

```sh
npx wrangler preview delete --name "feature-login" --skip-confirmation
npx wrangler containers list
```

```sh
npx wrangler containers delete <APPLICATION_ID>
```

```sh
WORKER_NAME="my-worker"
PREVIEW_NAME="feature-login"
PREFIX="${WORKER_NAME}_${PREVIEW_NAME}_"

npx wrangler preview delete --name "$PREVIEW_NAME" --skip-confirmation

npx wrangler containers list --json \
	| jq -r --arg prefix "$PREFIX" '.[] | select(.name | startswith($prefix)) | .id' \
	| while read -r app_id; do
		npx wrangler containers delete "$app_id"
	done
```

D1 migrations (shared staging database in `wrangler.jsonc`, plus `wrangler.preview-migrations.jsonc`):

```jsonc
{
	"previews": {
		"d1_databases": [
			{
				"binding": "DB",
				"database_name": "preview-shared-db",
				"database_id": "<PREVIEW_DATABASE_ID>",
			},
		],
	},
}
```

```jsonc
{
	"d1_databases": [
		{
			"binding": "PREVIEW_DB",
			"database_name": "preview-shared-db",
			"database_id": "<PREVIEW_DATABASE_ID>",
			"migrations_dir": "migrations",
		},
	],
}
```

```sh
npx wrangler d1 migrations apply PREVIEW_DB --remote --config wrangler.preview-migrations.jsonc
```

```sh
npx wrangler preview --name feature-login
```

## Options / Props

Binding isolation:

| Resource or `previews` field | How it behaves | To isolate one Preview |
| --- | --- | --- |
| Durable Objects | Automatically provisions a new Durable Object namespace and storage for each Preview. | Automatic. |
| Containers | Automatically provisions a new container app and container instances for each Preview. | Automatic. |
| `kv_namespaces` | Binds by `id`. Same `id` shares data. | Bind to a different KV namespace. |
| `d1_databases` | Binds by `database_id`. Same `database_id` shares rows. | Bind to a different D1 database. |
| `r2_buckets` | Binds by `bucket_name`. Same name shares objects. | Bind to a different R2 bucket. |
| `queues.producers` | Binds a producer to a queue by name. Same name sends to the same queue. | Bind to a different queue. |
| `vectorize` | Binds by `index_name`. Must be created manually before deploying. | Bind to a different index. |
| `hyperdrive` | Binds by `id`. Must be created manually. True isolation needs a separate config pointing at a separate database or schema. | Bind to a different Hyperdrive config. |
| `analytics_engine_datasets` | Writes to the `dataset` name; created implicitly by writes. | Bind to a different dataset name. |
| `pipelines` | Binds by `pipeline` ID. Same stream shares destination. | Bind to a different stream. |
| `workflows` | Binds to an existing Workflow; uses that Workflow's deployed code, bindings, and instances. | Bind to a dedicated non-production Workflow. |
| `secrets_store_secrets` | Binds by `store_id` and `secret_name`. | Bind to a different store or secret name. |
| `dispatch_namespaces` | Binds by `namespace`. | Bind to a different namespace. |
| `mtls_certificates` | Binds by `certificate_id`. | Bind to a different certificate. |
| `vpc_services` | Binds by `service_id`. | Bind to a different service. |
| `ratelimits` | Rate Limiting binding; runtime binding name comes from `name`, not `binding`. | Use a different `namespace_id`. |
| `send_email` | Send Email binding; runtime name from `name`. Delivery requires valid Email Routing. | Not applicable. |

Durable Object access patterns:

| Access pattern | Preview configuration | Result |
| --- | --- | --- |
| `ctx.exports` | Class and migration only | Recommended. Separate namespace automatically. |
| `env` binding | Class, migration, and a Preview binding | Use when your code needs `env.COUNTER`. |

D1 per-branch override:

| File | Binding to update |
| --- | --- |
| `wrangler.jsonc` | `previews.d1_databases` |
| `wrangler.preview-migrations.jsonc` | Top-level `d1_databases` |

## Notes

- Two Previews bound to the same account-level resource ID or name share its data; bind a different resource to isolate.
- Durable Objects: state persists across deployments within a Preview and is deleted when the Preview is deleted. Using `env.COUNTER` / `env.MY_CONTAINER` without declaring the binding in `previews` can yield a **1101 error**.
- Containers: generated app name includes Worker, Preview, and class names (e.g. `my-worker_feature-login_MyContainer`). Preview container config is not inherited; declare in top-level `containers` and `previews.containers`. Deleting a Preview removes its record and DO namespace, but the container app can remain in `wrangler containers list`; delete leftovers by ID. Do not delete container apps by Worker name alone. Container support in Previews is partial; verify the process starts. Review IDs before using the automated cleanup pattern broadly.
- D1: set `migrations_dir` in `wrangler.preview-migrations.jsonc` (default `migrations`); both files must point to the same physical database; run the migration command once per shared `database_id`; apply migrations before `wrangler preview`.
- Limitations: service bindings from a Preview reach only the production bound Worker (use `ctx.exports` to stay within the Preview). Workflow bindings do not create Workflows (a new name fails with `workflow.not_found`; Previews bound to one Workflow share instances; automatic per-Preview provisioning is planned). Previews can produce to Queues but cannot consume (one consumer per queue); messages to a production queue can be consumed by production. Cron Triggers target production (test via a function callable from `scheduled()` and a test route). Production routes, custom domains, and Queue consumers are not taken over by Previews; use Preview URLs.
- The `env` container binding example now uses `env.MY_CONTAINER.getByName("tenant-a")` instead of `getContainer()` from `@cloudflare/containers` (cloudflare-docs change "Replace @cloudflare/containers with ctx.container").
- Source: https://developers.cloudflare.com/workers/previews/resources/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

## Related

- [previews-configuration.md](./previews-configuration.md)
- [previews-overview.md](./previews-overview.md)
- [bindings-durable-objects.md](../configuration/bindings-durable-objects.md)
- [containers.md](../configuration/containers.md)
