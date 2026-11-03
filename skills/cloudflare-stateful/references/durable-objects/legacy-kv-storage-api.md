---
source: https://developers.cloudflare.com/durable-objects/api/legacy-kv-storage-api/
---

# KV-backed Durable Object Storage (Legacy)

Storage API for legacy KV-backed Durable Objects (asynchronous KV API and alarms only). New namespaces should use SQLite-backed storage.

## Signature / Usage

```js
export class Counter extends DurableObject {
	constructor(ctx, env) {
		super(ctx, env);
	}

	async increment() {
		let value = (await this.ctx.storage.get("value")) || 0;
		value += 1;
		await this.ctx.storage.put("value", value);
		return value;
	}
}
```

## Options / Props

### Methods (`ctx.storage`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `get(key, options?)` | `Promise<any>` | — | Value or `undefined`. |
| `get(keys, options?)` | `Promise<Map<string, any>>` | — | Up to 128 keys; missing keys omitted; sorted by UTF-8. |
| `put(key, value, options?)` | `Promise` | — | Throws `RangeError` if the serialized value exceeds 128 KiB (131072 bytes). |
| `put(entries, options?)` | `Promise` | — | Up to 128 key-value pairs. |
| `delete(key, options?)` | `Promise<boolean>` | — | `true` if the key existed. |
| `delete(keys, options?)` | `Promise<number>` | — | Up to 128 keys; count deleted. |
| `list(options?)` | `Promise<Map<string, any>>` | — | Ascending by UTF-8 key; loads everything into memory without options. |
| `getAlarm(options?)` | `Promise<number \| null>` | — | Alarm time in ms since epoch, or `null`. |
| `setAlarm(scheduledTime, options?)` | `Promise` | — | `Date` or ms since epoch. |
| `deleteAlarm(options?)` | `Promise` | — | Does not cancel a running handler. |
| `deleteAll(options?)` | `Promise` | — | Can fail partway and leave a subset undeleted on KV-backed objects. |
| `transaction(closure(txn))` | `Promise` | — | Legacy explicit transaction; use `txn.get/put/delete/list` and `txn.rollback()`. |
| `sync()` | `Promise` | — | Resolves when pending writes are on disk. |

### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `allowConcurrency` | `boolean` | — | `get`/`list`/`getAlarm`: allow concurrent events during the storage operation. |
| `noCache` | `boolean` | — | `get`/`list`/`put`/`delete`: do not retain in the in-memory cache. |
| `allowUnconfirmed` | `boolean` | — | `put`/`delete`/`deleteAll`/`setAlarm`/`deleteAlarm`: do not hold outgoing messages until writes are flushed. |
| `start` | `string` | — | `list`: inclusive start key. |
| `startAfter` | `string` | — | `list`: exclusive start key; not with `start`. |
| `end` | `string` | — | `list`: exclusive end key. |
| `prefix` | `string` | — | `list`: key prefix. |
| `reverse` | `boolean` | — | `list`: descending order. |
| `limit` | `number` | — | `list`: max pairs. |

## Notes

- Not available on KV-backed classes: SQL API, PITR API, synchronous KV API (`ctx.storage.kv`). `transactionSync` is SQLite only.
- Creating new namespaces with the KV storage backend is no longer supported for accounts without an existing KV-backed namespace; a migration path to SQLite is planned.
- `deleteAll()` also deletes an active alarm for compatibility dates `2026-02-24` or later (or with `delete_all_deletes_alarm`); earlier dates need a separate `deleteAlarm()`.
- Multiple `put`/`delete` calls without an intervening `await` are coalesced atomically. Awaiting `put()` applies backpressure and disables coalescing.
- Differences from SQLite-backed: see the SQLite-backed storage page, which documents the shared KV/alarm semantics in full.

## Related

- [SQLite-backed storage API](./sqlite-storage-api.md)
- [Legacy class migrations](./class-migrations-legacy.md)
- [Alarms](./alarms.md)
