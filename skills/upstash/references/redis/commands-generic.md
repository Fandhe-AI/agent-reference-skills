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

## Notes

- Prefer `SCAN` over `KEYS` in production — `KEYS` blocks the server while iterating
- `DEL` returns the count of keys actually deleted
- `EXPIRE` returns `1` if the timeout was set, `0` if the key does not exist
- Lua scripts run atomically; access keys via `KEYS` array and args via `ARGV` array
- `SUBSCRIBE`/`PSUBSCRIBE` keep a connection open; use REST API `/subscribe` endpoint or a dedicated TCP client for long-lived subscriptions

## Related

- [Commands: String](./commands-string.md)
- [Pipelining & Transactions](./pipelining-transactions.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
