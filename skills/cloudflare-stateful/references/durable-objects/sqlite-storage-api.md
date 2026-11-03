---
source: https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/
---

# SQLite-backed Durable Object Storage

Storage API (`ctx.storage`) for SQLite-backed Durable Objects: SQL API, point-in-time recovery (PITR), synchronous and asynchronous KV API, alarms, transactions. Storage is private to its object and transactional/strongly consistent.

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

```ts
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
  sql: SqlStorage;
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;

    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS artist(
        artistid    INTEGER PRIMARY KEY,
        artistname  TEXT
      );
      INSERT INTO artist (artistid, artistname) VALUES
        (123, 'Alice'),
        (456, 'Bob'),
        (789, 'Charlie');
    `);
  }
}
```

Cursor results (`this.sql` is `ctx.storage.sql`):

```ts
  // Return array of row objects: [{"artistid":123,"artistname":"Alice"},{"artistid":456,"artistname":"Bob"},{"artistid":789,"artistname":"Charlie"}]
  let resultsArray1 = this.sql.exec("SELECT * FROM artist;").toArray();
  // OR
  let resultsArray2 = Array.from(this.sql.exec("SELECT * FROM artist;"));
  // OR
  let resultsArray3 = [...this.sql.exec("SELECT * FROM artist;")]; // JavaScript spread syntax
```

Adapted (not in the official docs): `columnNames` is a plain `string[]`, so the official `.columnNames.toArray()` throws; it is read directly. See Notes.

```ts
  // Returns [[123,"Alice"],[456,"Bob"],[789,"Charlie"]]
  let cursor = this.sql.exec("SELECT * FROM artist;");
  let resultsArray = cursor.raw().toArray();

  // Returns ["artistid","artistname"]
  let columnNameArray = this.sql.exec("SELECT * FROM artist;").columnNames;
```

```ts
  // returns error
  this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;").one();

  // returns { artistid: 123, artistname: 'Alice' }
  let oneRow = this.sql.exec("SELECT * FROM artist WHERE artistname = ?;", "Alice").one()
```

Consume cursors before any `await`:

```ts
// ✅ Safe: cursor is fully consumed before any await
const rows = this.ctx.storage.sql.exec("SELECT * FROM users").toArray();
const result = await fetch("https://example.com", { method: "POST", body: JSON.stringify(rows) });
```

Adapted (not in the official docs): the official PITR snippet uses `DAYS_MS` against a constant named `DAY_MS` and does not await the promises returned by `getBookmarkForTime` / `onNextSessionRestoreBookmark`. See Notes.

```ts
const DAY_MS = 24*60*60*1000;
// restore to 2 days ago
const bookmark = await ctx.storage.getBookmarkForTime(Date.now() - 2 * DAY_MS);
await ctx.storage.onNextSessionRestoreBookmark(bookmark);
// then typically restart the object to complete the recovery
ctx.abort();
```

## Options / Props

### Feature support by storage backend

| Name | Type | Default | Description |
|------|------|---------|-------------|
| SQL API | SQLite-backed: yes / KV-backed: no | — | `ctx.storage.sql` |
| PITR API | SQLite-backed: yes / KV-backed: no | — | Restore to any point in the past 30 days |
| Synchronous KV API | SQLite-backed: yes / KV-backed: no | — | `ctx.storage.kv` |
| Asynchronous KV API | both | — | `ctx.storage.get/put/delete/list` |
| Alarms API | both | — | `getAlarm` / `setAlarm` / `deleteAlarm` |

### SQL API (`ctx.storage.sql`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exec(query, ...bindings)` | `(string, ...any[]) => SqlStorageCursor` | — | Runs SQL; `?` placeholders bind to `bindings`. With multiple `;`-separated statements, bindings apply to the last statement and the cursor is for the last statement. Cannot run `BEGIN TRANSACTION` / `SAVEPOINT`. |
| `databaseSize` | `number` | — | Current SQLite database size in bytes. |

### `SqlStorageCursor`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `next()` | `() => { done, value }` | — | Next row per the JS Iterator protocol. |
| `toArray()` | `() => object[]` | — | Remaining rows as row objects. |
| `one()` | `() => object` | — | The row if there is exactly one; throws on zero or more than one. |
| `raw()` | `() => Iterator` | — | Iterator over the same results with rows as arrays; supports `next()` and `toArray()`. Combinable with the cursor. |
| `columnNames` | `string[]` | — | Column names in the order of the `raw()` row arrays. |
| `rowsRead` | `number` | — | Rows read so far; the final value is used for SQL billing. |
| `rowsWritten` | `number` | — | Rows written so far; the final value is used for SQL billing. |

### PITR API

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getCurrentBookmark()` | `Promise<string>` | — | Bookmark for the current point in time. |
| `getBookmarkForTime(timestamp)` | `(number \| Date) => Promise<string>` | — | Bookmark for approximately the given time, which must be within the last 30 days. |
| `onNextSessionRestoreBookmark(bookmark)` | `(string) => Promise<string>` | — | On next restart, restore storage to the bookmark; returns a bookmark for the moment before recovery so it can be undone. Typically follow with `ctx.abort()`. |

### Synchronous KV API (`ctx.storage.kv`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `get(key)` | `(string) => any \| undefined` | — | Value or `undefined`. |
| `put(key, value)` | `(string, any) => void` | — | Value can be any structured-clone type. |
| `delete(key)` | `(string) => boolean` | — | `true` if the key existed. |
| `list(options?)` | `(object?) => Iterable<[string, any]>` | — | Ascending by UTF-8 key; with no options loads everything into memory. |

### `list` options (sync and async)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `start` | `string` | — | Inclusive start key. |
| `startAfter` | `string` | — | Exclusive start key; not with `start`. |
| `end` | `string` | — | Exclusive end key. |
| `prefix` | `string` | — | Only keys beginning with the prefix. |
| `reverse` | `boolean` | — | Descending order; does not change the meaning of `start`/`end`. |
| `limit` | `number` | — | Max pairs returned. |
| `allowConcurrency` | `boolean` | — | Async API only. Same as for `get()`. |
| `noCache` | `boolean` | — | Async API only. Same as for `get()`. |

### Asynchronous KV API (`ctx.storage`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `get(key, options?)` | `Promise<any>` | — | Value, or `undefined`. |
| `get(keys, options?)` | `Promise<Map<string, any>>` | — | Up to 128 keys; missing keys omitted. |
| `put(key, value, options?)` | `Promise` | — | Stores a value. |
| `put(entries, options?)` | `Promise` | — | Up to 128 key-value pairs. |
| `delete(key, options?)` | `Promise<boolean>` | — | `true` if the key existed. |
| `delete(keys, options?)` | `Promise<number>` | — | Up to 128 keys; returns the count deleted. |
| `list(options?)` | `Promise<Map<string, any>>` | — | Ascending by UTF-8 key. |
| `deleteAll(options?)` | `Promise` | — | Deletes all data (SQL and KV data, atomically, on SQLite). |
| `transactionSync(callback)` | `any` | — | SQLite only. Runs `callback` in a transaction; rolls back on exception; callback must be synchronous. |
| `transaction(closure(txn))` | `Promise` | — | Legacy; with SQLite the `txn` object is obsolete and operations on `ctx.storage` count as part of the transaction. `txn.rollback()` discards changes. |
| `sync()` | `Promise` | — | Resolves when pending writes (including `allowUnconfirmed` ones) are on disk. |
| `getAlarm(options?)` | `Promise<number \| null>` | — | Alarm time in ms since epoch, or `null`. Options as `get()` without `noCache`. |
| `setAlarm(scheduledTime, options?)` | `Promise` | — | `Date` or ms since epoch. A time at or before `Date.now()` schedules immediate async execution without cancelling a running handler. May be delayed by up to a minute during maintenance/failover. |
| `deleteAlarm(options?)` | `Promise` | — | Deletes the alarm; does not cancel a running handler. Options as `put()` without `noCache`. |
| `sql` | `SqlStorage` (readonly) | — | The SQL API. |

### Read/write options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `allowConcurrency` | `boolean` | — | `get`/`list`/`getAlarm`: opt out of pausing I/O event delivery during a storage operation. |
| `noCache` | `boolean` | — | `get`/`list`/`put`/`delete`: hint to not keep the key in the in-memory cache; never changes semantics. |
| `allowUnconfirmed` | `boolean` | — | `put`/`delete`/`deleteAll`/`setAlarm`/`deleteAlarm`: do not hold outgoing network messages until writes are flushed to disk. Combine with `sync()` for selective confirmation. |

## Notes

- Corrected from the official docs: `.columnNames.toArray()` is wrong because `columnNames` is a `string[]`; the PITR snippet used undefined `DAYS_MS` (constant is `DAY_MS`) and did not await the Promise-returning bookmark methods.
- SQL API is only allowed on SQLite-backed classes and errors on KV-backed classes. KV API methods on SQLite-backed objects store data in a hidden table `__cf_kv`, visible when listing tables but not accessible via SQL.
- Cloudflare recommends SQLite for all new namespaces; creating new KV-backed namespaces is no longer supported for accounts without an existing KV-backed namespace. SQLite storage billing was scheduled for January 2026 (target January 7, 2026, no earlier); see the pricing page.
- Cursors held across an `await` have no snapshot isolation: fully consume them synchronously (`.toArray()`) before the next `await`.
- Numeric columns are subject to JavaScript's 52-bit number precision; large `int64` values can lose precision.
- Every row update of an index counts as an additional row written; writes to SQLite virtual tables also count. Supported extensions include FTS5 (including `fts5vocab`), JSON, and math functions.
- PITR bookmarks are lexically comparable strings (e.g. `0000007b-0000b26e-00001538-0c3e87bb37b3db5cc52eedb93cd3b96b`). PITR is not supported in local development, because no durable log is stored locally; local development tooling is in cloudflare-wrangler.
- Write behaviour: multiple `put`/`delete` calls without an intervening `await` are coalesced atomically. Awaiting `put()` applies backpressure (and disables coalescing); an unawaited flood of writes could exceed the 128 MB isolate memory limit.
- `deleteAll()` also deletes an active alarm for compatibility dates `2026-02-24` or later (or with the `delete_all_deletes_alarm` flag); earlier, call `deleteAlarm()` separately.
- On a KV-backed object, `put()` throws `RangeError` when the serialized value exceeds 128 KiB (131072 bytes).
- Using Drizzle ORM on top of Durable Object SQLite is covered by the drizzle skill; D1, Workers KV and R2 are covered by cloudflare-storage.

## Related

- [Legacy KV-backed storage API](./legacy-kv-storage-api.md)
- [Access storage](./access-storage.md)
- [Alarms](./alarms.md)
- [Limits](./limits.md)
- [Pricing](./pricing.md)
- [DurableObjectState](./state.md)
