---
source: https://developers.cloudflare.com/durable-objects/reference/durable-object-class-migrations-legacy/
---

# Durable Object class migrations (legacy)

The legacy Wrangler `migrations` array creates, renames, deletes and transfers Durable Object classes. It remains fully supported for existing Workers; new Workers should use the declarative `exports` field. A Worker cannot use `migrations` and Durable Object entries in `exports` together (Workflow entries in `exports` can coexist).

## Signature / Usage

Create (SQLite backend) with a binding:

```jsonc
{
	// Creating a new Durable Object class
	"durable_objects": {
		"bindings": [
			{
				"name": "DURABLE_OBJECT_A",
				"class_name": "DurableObjectAClass"
			}
		]
	},
	// Add the lines below for a Create migration.
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				"DurableObjectAClass"
			]
		}
	]
}
```

```toml
[[durable_objects.bindings]]
name = "DURABLE_OBJECT_A"
class_name = "DurableObjectAClass"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "DurableObjectAClass" ]
```

Create with key-value storage (existing key-value accounts only):

```toml
[[migrations]]
tag = "v1"
new_classes = [ "MyDurableObject" ]
```

Delete:

```jsonc
{
	// Remove the binding for the DeprecatedObjectClass DO
	"migrations": [
		{
			"tag": "v3", // Should be unique for each entry
			"deleted_classes": [ // Array of deleted classes
				"DeprecatedObjectClass"
			]
		}
	]
}
```

Rename:

```jsonc
{
	"durable_objects": {
		"bindings": [
			{
				"name": "MY_DURABLE_OBJECT",
				// Update the binding to the new class name.
				"class_name": "UpdatedName"
			}
		]
	},
	// Renaming classes
	"migrations": [
		{
			"tag": "v3",
			"renamed_classes": [ // Array of rename directives
				{
					"from": "OldName",
					"to": "UpdatedName"
				}
			]
		}
	]
}
```

Transfer (destination Worker's configuration):

```jsonc
{
	// destination worker
	"durable_objects": {
		"bindings": [
			{
				"name": "MY_DURABLE_OBJECT",
				"class_name": "TransferredClass"
			}
		]
	},
	// Transferring class
	"migrations": [
		{
			"tag": "v4",
			"transferred_classes": [
				{
					"from": "DurableObjectExample",
					"from_script": "OldWorkerScript",
					"to": "TransferredClass"
				}
			]
		}
	]
}
```

Per-environment migrations:

```jsonc
{
  // top-level default migrations
  "migrations": [
    { "tag": "v1", "new_sqlite_classes": ["MyDurableObject"] },
  ],
  "env": {
    "staging": {
      // migration override for staging
      "migrations": [
        { "tag": "v1-staging", "new_sqlite_classes": ["MyDurableObject"] },
      ],
    },
  },
}
```

## Options / Props

### Migration entry fields

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | `string` | — | Migration identifier; treated as a unique name that determines which migrations were applied. Once set, all future deployments must include a tag. |
| `new_sqlite_classes` | `string[]` | — | Create migration: new classes using the SQLite backend. |
| `new_classes` | `string[]` | — | Create migration: new classes using the key-value backend (existing key-value accounts only). |
| `deleted_classes` | `string[]` | — | Delete migration: classes to delete with all their stored data. |
| `renamed_classes` | `{ from, to }[]` | — | Rename migration: move stored objects between classes in the same Worker code. `from` is the old name, `to` the new name. |
| `transferred_classes` | `{ from, from_script, to }[]` | — | Transfer migration: move stored objects between classes in different Workers. `from` source class, `from_script` source Worker script, `to` destination class. |

## Notes

- Migration steps: edit the Wrangler configuration, then run `npx wrangler deploy`. Migrations apply at deployment and each can be applied once per environment.
- Updating the code of an existing class does not require a migration; it is your responsibility to keep new code backwards compatible with stored data.
- Delete migration: removes all objects of the class and their data. Remove the binding and code references first, copy important data elsewhere; not needed for renamed or transferred classes.
- Rename or Transfer: the destination class must be exported by the deployed Worker and must not be created beforehand (the migration creates it). Afterwards, bindings to the original class forward to the destination, but Workers bound to the updated class must update their binding configuration on their next deployment. Use Rename for same code file, Transfer for different Workers.
- Environment-level `migrations` override top-level ones; an environment inherits top-level migrations if it has none.
- You cannot enable the SQLite backend on an existing deployed class; `new_sqlite_classes` on a later migration for an already deployed class fails. Free plan: SQLite only; Paid: key-value only for accounts that already have a key-value namespace. Delete all key-value namespaces before downgrading.
- Migrations are atomic and cannot be gradually deployed; new Worker versions containing new migrations cannot be uploaded (`wrangler versions upload`).
- TOML inline tables do not allow line breaks, though the surrounding inline array may.
- To move to the declarative flow, see the exports migration page. Wrangler configuration details are in the cloudflare-wrangler skill.

## Related

- [Class exports (declarative)](./migrations.md)
- [Environments](./environments.md)
- [Access storage](./access-storage.md)
- [Legacy KV storage API](./legacy-kv-storage-api.md)
