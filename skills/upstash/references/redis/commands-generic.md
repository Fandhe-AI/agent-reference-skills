# Generic Commands

Key management, expiry, scanning, and pub/sub commands that apply across all Redis data types.

## Signature / Usage

```ts
// Key existence and deletion
await redis.exists("key1", "key2")      // returns count of existing keys
await redis.del("key1", "key2")         // delete keys

// TTL / Expiry
await redis.expire("key", 60)           // seconds
await redis.pexpire("key", 1000)        // milliseconds
await redis.expireat("key", unixSec)    // Unix timestamp (seconds)
const ttl = await redis.ttl("key")      // -1 = no TTL, -2 = key missing
const pttl = await redis.pttl("key")    // milliseconds remaining

// Type and rename
const type = await redis.type("key")    // "string" | "list" | "set" | etc.
await redis.rename("old", "new")
await redis.renamenx("old", "new")      // rename only if new key doesn't exist

// SCAN — cursor-based iteration (avoids blocking KEYS)
const [cursor, keys] = await redis.scan(0, { match: "user:*", count: 100 })

// Pub/Sub
const listeners = await redis.publish("channel", "message")
// SUBSCRIBE is available via the REST API

// Lua scripting
const result = await redis.eval("return KEYS[1]", ["mykey"], [])
await redis.evalsha(sha1, ["mykey"], [])

// Server management
await redis.flushdb()      // delete all keys in current DB
await redis.dbsize()       // count of keys
await redis.ping()         // health check
await redis.info()         // server info
```

```ts
await redis.persist("key");
const tenMinutesFromNow = Date.now() + 10 * 60 * 1000;
await redis.pexpireat("key", tenMinutesFromNow);
const key = await redis.randomkey();
await redis.touch("key1", "key2", "key3");
await redis.unlink("key1", "key2");
const keys = await redis.keys("prefix*");
```

## Notes

- Prefer `SCAN` over `KEYS` in production — `KEYS` blocks the server while iterating
- `FLUSHDB` / `FLUSHALL` delete all keys permanently; `redis.flushall()` is synchronous and `redis.flushall([{ async: true }])` is asynchronous (the options are wrapped in an array)
- `redis.echo("hello world")` returns the message; `PING` / `ECHO` are the only Connection commands supported over REST. `redis.clientSetinfo("LIB-NAME", "redis-js")` fails on Upstash with `ERR Command "CLIENT" is not allowed in REST`
- Source: https://upstash.com/docs/redis/sdks/ts/commands/server/flushall, /flushdb, /auth/echo, /connection/client_setinfo (fetched 2026-11-14; no version pin on the site)
- `DEL` returns the count of keys actually deleted
- `EXPIRE` returns `1` if the timeout was set, `0` if the key does not exist
- Lua scripts run atomically; access keys via `KEYS` array and args via `ARGV` array
- `SUBSCRIBE`/`PSUBSCRIBE` keep a connection open; use REST API `/subscribe` endpoint or a dedicated TCP client for long-lived subscriptions

### Additional commands (official TypeScript SDK command pages)

- `PERSIST key`: removes the timeout; returns `1` if removed, `0` if the key is missing or has no timeout
- `PEXPIREAT key unixmilli`: expiry at a Unix timestamp in milliseconds; `1` if applied, `0` if the key does not exist
- `RANDOMKEY`: a random key, or `null` when the database is empty
- `TOUCH ...keys`: alters the last access time of keys; returns how many were touched
- `UNLINK ...keys`: removes keys, ignoring missing ones; returns how many were unlinked
- `SCAN cursor { match, count, type }`: the cursor is a string in the official page (start with `"0"`; a returned cursor of `"0"` ends the scan); `type` filters by `string`, `hash`, `set`, `zset`, `list`, `stream`
- `KEYS` can block the database and returns an error for databases with more than 100,000 entries; prefer `SCAN`
- `PEXPIRE` / `EXPIRE` / `EXPIREAT` return `1` when the timeout was set, `0` otherwise
- Source: https://upstash.com/docs/redis/sdks/ts/commands/generic/persist, /pexpireat, /randomkey, /touch, /unlink, /scan, /keys, /expire (fetched 2026-11-14; no version pin on the site)

## Related

- [Commands: String](./commands-string.md)
- [Pipelining & Transactions](./pipelining-transactions.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
