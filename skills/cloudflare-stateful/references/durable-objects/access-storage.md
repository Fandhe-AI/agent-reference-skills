---
source: https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/
---

# Access Durable Objects Storage

Each Durable Object has private, transactional, strongly consistent storage reached through `ctx.storage`. This page covers creating a SQLite-backed class, initializing state from storage, removing storage, typed SQL results, indexes, and SQL in Durable Objects vs D1.

## Signature / Usage

Create a SQLite-backed class with `new_sqlite_classes` in a migration:

```jsonc
{
	"migrations": [
		{
			"tag": "v1", // Should be unique for each entry
			"new_sqlite_classes": [ // Array of new classes
				"MyDurableObject"
			]
		}
	]
}
```

```toml
[[migrations]]
tag = "v1"
new_sqlite_classes = [ "MyDurableObject" ]
```

Initialize instance variables from storage:

```ts
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
	value: number;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);

		// `blockConcurrencyWhile()` ensures no requests are delivered until
		// initialization completes.
		ctx.blockConcurrencyWhile(async () => {
			// After initialization, future reads do not need to access storage.
			this.value = (await ctx.storage.get("value")) || 0;
		});
	}

	async getCounterValue() {
		return this.value;
	}
}
```

Remove all storage:

```ts
export class MyDurableObject extends DurableObject<Env> {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
	}

	// Clears Durable Object storage
	async clearDo(): Promise<void> {
		// If you've configured a Durable Object alarm
		await this.ctx.storage.deleteAlarm();

		// This will delete all the storage associated with this Durable Object instance
		// This will also delete the Durable Object instance itself
		await this.ctx.storage.deleteAll();
	}
}
```

Typed SQL results:

```ts
type User = {
	id: string;
	name: string;
	email_address: string;
	version: number;
};
```

```ts
// The type parameter is passed between angle brackets before the function argument:
const result = this.ctx.storage.sql
	.exec<User>(
		"SELECT id, name, email_address, version FROM users WHERE id = ?",
		user_id,
	)
	.one();
// result will now have a type of "User"
```

Adapted (not in the official docs): the official `raw<UserRow>()` snippet calls `sql.exec(...)` on an undefined `sql` variable; it is `this.ctx.storage.sql` here. See Notes.

```ts
// Or, if you are using raw() to convert results into an array, define an array type:
type UserRow = [
	id: string,
	name: string,
	email_address: string,
	version: number,
];

// ... and then pass it as the type argument to the raw() method:
let cursor = this.ctx.storage.sql
	.exec(
		"SELECT id, name, email_address, version FROM users WHERE id = ?",
		user_id,
	)
	.raw<UserRow>();

for (let row of cursor) {
	// row is of type UserRow
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `new_sqlite_classes` | `string[]` | — | Migration key listing new classes that use the SQLite storage backend. Gives access to `ctx.storage.sql`. |
| `tag` | `string` | — | Migration identifier; must be unique per entry. |
| `sql.exec<T>(query, ...bindings)` | generic | — | `T` must be a Record of column name to `SqlStorageValue` (`ArrayBuffer \| string \| number \| null`). Not validated at runtime. |
| `cursor.raw<T>()` | generic | — | `T` is an array/tuple type of column values. |

## Notes

- In-memory state lasts only while the object stays in memory; inactive objects can be evicted. Persist anything that must survive code deployments to storage.
- Default code update strategy is `deferred` with `max_delay` of 300 s: active objects may keep running current code until they hibernate or hit the delay; on the new version a fresh isolate is created and in-memory state is discarded. Deferral is best effort; Cloudflare can reset an object before `max_delay`.
- A Durable Object ceases to exist if its storage is empty when it shuts down. If you ever wrote to storage (including setting alarms) you must call `storage.deleteAll()` (and `deleteAlarm()` if an alarm is configured); deleting keys or dropping tables is not enough as metadata may remain. `deleteAll()` ensures the object is not billed for storage.
- Corrected from the official docs: the `raw<UserRow>()` example used a bare `sql` variable and a stale comment (`row is of type User`).
- Typed results: providing a type parameter does not validate the result; properties missing from your type are silently dropped in TypeScript.
- Indexes reduce rows read but add at least one row written when updating an indexed column.
- SQL in Durable Objects vs D1: D1 is a managed database accessed over the network (HTTP API, schema management, import/export, query insights, Smart Placement); SQLite in Durable Objects is a lower-level compute-with-storage block that is Workers-only and requires a front-end Worker plus the object, colocated with the database. SQL query pricing and limits are intended to be identical. D1, KV and R2 are covered by the cloudflare-storage skill; Drizzle ORM for Durable Object SQLite is in the drizzle skill.
- Storage billing for SQLite-backed objects was scheduled for January 2026 (target January 7, 2026, no earlier). New KV-backed namespaces are no longer supported for accounts without an existing one.

## Related

- [SQLite-backed storage API](./sqlite-storage-api.md)
- [Migrations](./migrations.md)
- [In-memory state](./in-memory-state.md)
- [Code updates](./code-updates.md)
- [Pricing](./pricing.md)
