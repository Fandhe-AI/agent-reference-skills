---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects
---

# Durable Objects Bindings, Exports and Migrations

Keys for binding Durable Objects (`durable_objects.bindings`), declaring exported classes and their lifecycle (`exports`), and the legacy `migrations` array.

## Signature / Usage

```jsonc
{
	"durable_objects": {
		"bindings": [
			{
				"name": "<BINDING_NAME>",
				"class_name": "<CLASS_NAME>",
			},
		],
	},
	"exports": {
		"MyDurableObject": {
			"type": "durable-object",
			"storage": "sqlite",
		},
		"OldClass": {
			"type": "durable-object",
			"state": "deleted",
		},
		"OldName": {
			"type": "durable-object",
			"state": "renamed",
			"renamed_to": "NewName",
		},
		"NewName": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

```toml
[[durable_objects.bindings]]
name = "<BINDING_NAME>"
class_name = "<CLASS_NAME>"

[exports.MyDurableObject]
type = "durable-object"
storage = "sqlite"

[exports.OldName]
type = "durable-object"
state = "renamed"
renamed_to = "NewName"
```

## Options / Props

### `durable_objects.bindings`

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` required | The name of the binding used to refer to the Durable Object. |
| `class_name` | `string` required | The exported class name of the Durable Object. |
| `script_name` | `string` optional | The Worker where the Durable Object is defined, if external to this Worker. Works in local and remote development. In local development you must run the external Worker in a separate process (`wrangler dev`). In remote development the appropriate remote binding must be used. |
| `environment` | `string` optional | The environment of the `script_name` to bind to. |

### `exports` (Durable Object entries, keyed by class name)

| Name | Type | Description |
|------|------|-------------|
| `type` | `string` required | Set to `"durable-object"`. |
| `state` | `string` optional | Lifecycle state: `"created"` (default, a live class), `"deleted"`, `"renamed"`, `"transferred"`, or `"expecting-transfer"`. |
| `storage` | `string` conditional | Required when `state` is `"created"` or `"expecting-transfer"`. `"sqlite"` (recommended; required for new namespaces) or `"legacy-kv"` (only for existing key-value-backed namespaces). |
| `renamed_to` | `string` conditional | Required when `state` is `"renamed"`. Destination class name, which must also appear as a live entry in the same `exports` map. |
| `transferred_to` | `string` conditional | Required when `state` is `"transferred"`. Name of the target Worker that will receive the namespace. |
| `transfer_from` | `string` conditional | Required when `state` is `"expecting-transfer"`. Name of the source Worker. |
| `container` | `string` optional | Attaches a Container to this Durable Object. Must match the `name` of an entry in the top-level `containers` array, and requires `storage` to be `"sqlite"`. Only allowed when `state` is `"created"` or `"expecting-transfer"`. Use this instead of setting `class_name` on the Container entry. |

### `migrations` (legacy)

| Name | Type | Description |
|------|------|-------------|
| `tag` | `string` required | A unique identifier for this migration. |
| `new_sqlite_classes` | `string[]` optional | New Durable Object classes with the SQLite storage backend. |
| `new_classes` | `string[]` optional | New classes with the legacy key-value storage backend. |
| `renamed_classes` | `{from: string, to: string}[]` optional | Classes being renamed. |
| `deleted_classes` | `string[]` optional | Classes being removed. |
| `transferred_classes` | `{from: string, from_script: string, to: string}[]` optional | Classes being transferred from another Worker. |

```jsonc
{
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": [
				// Array of new classes
				"DurableObjectExample",
			],
		},
		{
			"tag": "v2", // Should be unique for each entry
			"renamed_classes": [
				// Array of rename directives
				{
					"from": "DurableObjectExample",
					"to": "UpdatedName",
				},
			],
			"deleted_classes": [
				// Array of deleted class names
				"DeprecatedClass",
			],
		},
	],
}
```

## Notes

- `migrations` is the legacy imperative configuration; for new Workers prefer the declarative `exports` field. `migrations` and Durable Object entries in `exports` are mutually exclusive.
- Durable Object runtime APIs and migration semantics are documented by cloudflare-workers / Durable Objects docs, not here.
- `exports` also declares Workflows; see [bindings-workflows.md](./bindings-workflows.md).

## Related

- [containers.md](./containers.md)
- [bindings-workflows.md](./bindings-workflows.md)
- [top-level-keys.md](./top-level-keys.md)
