---
source: https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/
---

# Durable Object class exports

The `exports` field of the Wrangler configuration is the declarative way to manage Durable Object class lifecycle: create, delete, rename and transfer classes. It replaces the imperative legacy `migrations` array; a Worker uses one or the other.

## Signature / Usage

Define a class:

```jsonc
{
	"durable_objects": {
		"bindings": [
			{
				"name": "MY_DURABLE_OBJECT",
				"class_name": "MyDurableObject",
			},
		],
	},
	"exports": {
		"MyDurableObject": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

```toml
[[durable_objects.bindings]]
name = "MY_DURABLE_OBJECT"
class_name = "MyDurableObject"

[exports.MyDurableObject]
type = "durable-object"
storage = "sqlite"
```

Delete a class (permanently removes its data):

```jsonc
{
  "exports": {
    "OldDurableObject": {
      "type": "durable-object",
      "state": "deleted"
    }
  }
}
```

Rename a class:

```jsonc
{
	"exports": {
		"OldName": {
			"type": "durable-object",
			"state": "renamed",
			"renamed_to": "NewName"
		},
		"NewName": {
			"type": "durable-object",
			"storage": "sqlite"
		}
	}
}
```

Alias for a zero-downtime rename (deploy 1, keep `exports` unchanged):

```ts
import { DurableObject } from "cloudflare:workers";

export class NewName extends DurableObject {
  // ...
}
export { NewName as OldName };
```

Transfer a class between Workers: the target declares `expecting-transfer`, then the source commits with `transferred`.

```jsonc
{
  "exports": {
    "MyDO": {
      "type": "durable-object",
      "state": "expecting-transfer",
      "storage": "sqlite",
      "transfer_from": "source-worker"
    }
  }
}
```

```jsonc
{
  "exports": {
    "MyDO": {
      "type": "durable-object",
      "state": "transferred",
      "transferred_to": "target-worker"
    }
  }
}
```

Per-environment overrides:

```jsonc
{
	// top-level exports apply to the default environment
	"exports": {
		"MyDO": { "type": "durable-object", "storage": "sqlite" }
	},
	"env": {
		"staging": {
			// override for the staging environment
			"exports": {
				"MyDO": { "type": "durable-object", "storage": "sqlite" }
			}
		}
	}
}
```

Migrating from the legacy array (`new_sqlite_classes` becomes a `sqlite` entry):

```jsonc
{
	"exports": {
		"ChatRoom": { "type": "durable-object", "storage": "sqlite" }
	}
}
```

## Options / Props

### `exports` entry fields

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | — | Required. `"durable-object"` for class entries. |
| `state` | `string` | `"created"` | One of `"created"`, `"deleted"`, `"renamed"`, `"transferred"`, `"expecting-transfer"`. |
| `storage` | `string` | — | Required for `created` and `expecting-transfer`: `"sqlite"` (recommended; only valid for new namespaces) or `"legacy-kv"` (only existing key-value namespaces). Forbidden on tombstone states. |
| `renamed_to` | `string` | — | Required for `renamed`. Valid JavaScript identifier, different from the source name, and a live entry in the same map. |
| `transferred_to` | `string` | — | Required for `transferred`. Target Worker name. |
| `transfer_from` | `string` | — | Required for `expecting-transfer`. Source Worker name. |

### Allowed fields per `state`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `created` (default) | state | — | Required: `storage`. Forbidden: `renamed_to`, `transferred_to`, `transfer_from`. |
| `deleted` | state | — | Required: none. Forbidden: `storage`, `renamed_to`, `transferred_to`, `transfer_from`. |
| `renamed` | state | — | Required: `renamed_to`. Forbidden: `storage`, `transferred_to`, `transfer_from`. |
| `transferred` | state | — | Required: `transferred_to`. Forbidden: `storage`, `renamed_to`, `transfer_from`. |
| `expecting-transfer` | state | — | Required: `storage`, `transfer_from`. Forbidden: `renamed_to`, `transferred_to`. |

### Error scenarios

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `provisioned_class_missing_from_config` | error | — | Namespace exists, code still exports the class, but no `exports` entry. Add a live entry or a tombstone. |
| `config_export_not_in_code` | error | — | Live entry for a class the code does not export. Add the class or use a tombstone. |
| `config_references_nonexistent_class` | error | — | Live entry for a class neither in code nor provisioned. |
| `orphaned_provisioned_namespace` | error | — | Namespace neither in code nor declared. Add a tombstone or restore code and entry. |
| `invalid_export` | error | — | Structurally invalid entry (e.g. `legacy-kv` for a new namespace, or a class mapping to more than one namespace). |
| `tombstone_delete_class_still_in_code` | error | — | `deleted` tombstone while the class is still exported. Remove it from code first. |
| `tombstone_delete_blocked_by_external_bindings` | error | — | Another Worker binds the namespace. Redeploy those Workers without the binding first. |
| `tombstone_renamed_to_occupied` | error | — | `renamed_to` collides with an existing namespace. Delete it in a prior deploy. |
| `transferred_pending_not_found` | error | — | No matching `expecting-transfer` on the target. Deploy the target first. |
| `transferred_target_missing` | error | — | Target Worker does not exist. |
| `transferred_target_mismatch` | error | — | `transferred_to` differs from the pending transfer's target. |
| `transferred_source_in_dispatch_namespace` | error | — | Source is in a dispatch namespace; cross-dispatch transfer unsupported. |
| `transferred_target_in_dispatch_namespace` | error | — | Target is in a dispatch namespace; unsupported. |
| `phase_one_transfer_after_commit_mismatch` | error | — | Namespace was transferred from a different source. Remove the `expecting-transfer` entry. |
| `phase_one_transfer_target_class_provisioned` | error | — | Target already owns a namespace for the class. |
| `phase_one_transfer_duplicate` | error | — | Another `expecting-transfer` hint is in flight for the class. |
| `phase_one_transfer_source_missing` | error | — | Source Worker named by `transfer_from` does not exist. |
| `phase_one_transfer_source_namespace_missing` | error | — | Source Worker has no namespace for the class. |
| `phase_one_transfer_source_in_dispatch_namespace` | error | — | Source in a dispatch namespace; unsupported. |
| `phase_one_transfer_target_in_dispatch_namespace` | error | — | Target in a dispatch namespace; unsupported. |
| `storage_type_mismatch` | error | — | Declared `storage` differs from the provisioned backend; backends cannot change in place. |
| `free_tier_requires_sqlite` | error | — | Plan supports only SQLite-backed namespaces but `legacy-kv` was requested. |

## Notes

- Deploy reconciliation compares your code (exported classes), the `exports` configuration, and provisioned namespaces. A class that appears only in code is ignored until declared; Cloudflare does not provision implicitly.
- Deleting a class destroys its namespace and all data permanently (no Trash). Preconditions: the class must not be in code, and no other Worker in the account may bind to it (`tombstone_delete_blocked_by_external_bindings`). Remove the class from code and its binding, then deploy a `deleted` tombstone.
- Rename: needs a `renamed` tombstone for the old name and a live entry for the new name. To avoid downtime use three deploys: (1) alias the new class under the old name in code (`export { NewName as OldName };`), leave `exports` unchanged; (2) add the `renamed` tombstone and new live entry (a `tombstone_class_still_in_code` info notice is expected); (3) remove the alias. The old tombstone then becomes stale and is listed as removable.
- Transfer (same account, same dispatch-namespace context) is a four-deploy flow: source live; target `expecting-transfer` (do not add a binding on the target yet); source `transferred` tombstone (atomic handoff; if the source still needs the class, point its binding at `script_name` of the target); target adds the binding with a normal live entry. A pending transfer is cancelled by redeploying the target without the entry. A target can hold one pending hint per class.
- Storage backends: `sqlite` is the recommended and only path for new namespaces (SQL, PITR, higher per-object storage limit). `legacy-kv` only for already provisioned key-value namespaces. Workers Free: SQLite only. Workers Paid: SQLite; key-value only for accounts with an existing key-value namespace. Delete all key-value namespaces before downgrading to Free. Storage type is immutable once provisioned.
- Reconciliation output: `wrangler deploy` prints a `Durable Object exports reconciliation` block (Created / Updated / Deleted / Renamed / Transferred / Transfer pending, warnings, info, and "Safe to remove from `exports`"). Stale tombstones (no state change) produce `stale_tombstone` notices on every deploy until removed; `referencing_scripts` lists other Workers still bound to the source class.
- Constraints: `exports` Durable Object entries are mutually exclusive with `migrations` (Workflow entries may coexist). `wrangler versions upload` does not apply lifecycle changes and fails fast if `exports` entries are present; use `wrangler deploy`. Gradual deployments are not supported with `exports`; rollbacks cannot cross a lifecycle change. Once deployed with `exports`, a Worker cannot return to `migrations`.
- Migrating from `migrations`: find each class's backend (`new_sqlite_classes` becomes `sqlite`, `new_classes` becomes `legacy-kv`), replace the array with an `exports` map, remove `migrations`, deploy. No data migration happens. There is no `tag` equivalent.
- Wrangler config schema, `wrangler deploy` flags and environments are documented in cloudflare-wrangler.
- Source examples elsewhere on this site still show the legacy `migrations` array with `new_sqlite_classes`; it remains supported for older Workers (see the legacy migrations page).

## Related

- [Legacy class migrations](./class-migrations-legacy.md)
- [Environments](./environments.md)
- [Get started](./get-started.md)
- [Access storage](./access-storage.md)
