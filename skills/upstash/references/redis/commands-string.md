# String Commands

Core Redis string operations for key-value storage, atomic counters, and bulk get/set.

## Signature / Usage

```ts
// SET — store a value with optional expiration
await redis.set("key", "value")
await redis.set("key", "value", { ex: 60 })    // expire in 60 seconds
await redis.set("key", "value", { nx: true })   // only set if not exists

// GET — retrieve a value
const val = await redis.get<string>("key")

// MGET / MSET — bulk operations (single billing command)
const [a, b] = await redis.mget("key1", "key2")
await redis.mset({ key1: { a: 1 }, key2: "value2", key3: true })

// INCR / DECR — atomic counters
await redis.incr("counter")
await redis.incrby("counter", 5)
await redis.decr("counter")
await redis.decrby("counter", 3)

// APPEND — append to existing string
await redis.append("key", " world")

// STRLEN — get string length
const len = await redis.strlen("key")

// SETEX / SETNX / PSETEX
await redis.setex("key", 60, "value")   // set with seconds TTL
await redis.setnx("key", "value")       // set if not exists
await redis.psetex("key", 1000, "value") // set with milliseconds TTL
```

```ts
await redis.getdel<MyType>("key");
await redis.incrbyfloat("key", 4.5);
const length = await redis.setrange("key", 5, "redis");
const oldValue = await redis.getset("key", "new-value");
```

## Options / Props

| Option (SET) | Type | Description |
|------|------|-------------|
| `ex` | `number` | Expire in seconds |
| `px` | `number` | Expire in milliseconds |
| `exat` | `number` | Expire at Unix timestamp (seconds) |
| `pxat` | `number` | Expire at Unix timestamp (milliseconds) |
| `nx` | `boolean` | Only set if key does not exist |
| `xx` | `boolean` | Only set if key already exists |
| `keepTtl` | `boolean` | Retain the existing TTL |
| `get` | `boolean` | Return the old value before setting |

## Notes

- `MGET` and `MSET` count as a single command for billing regardless of number of keys
- Values are automatically serialized/deserialized as JSON (disable with `automaticDeserialization: false`)
- `GETSET` is deprecated in Redis 6.2; prefer `SET key value GET` option
- `SUBSTR` is an alias for `GETRANGE`

### Additional commands (official TypeScript SDK command pages)

- `GETDEL key`: returns the value and deletes the key (`null` if missing)
- `INCRBYFLOAT key incrementBy`: float increment; a missing key starts at `0`; errors if the value is not numeric (e.g. `set("key", 6)` then `incrbyfloat("key", 4.5)` returns `10.5`)
- `MSETNX`: sets multiple keys only if none exist (counts as a single command for billing); returns whether all keys were set. The example on the official page is written in Python syntax, so it is not reproduced
- `SETRANGE key offset value`: overwrites part of the string at a zero-based offset; returns the length afterwards (`"helloworld"` + `setrange("key", 5, "redis")` gives length `10`, value `"helloredis"`)
- `SET` options per the official page: `get`, `ex`, `px`, `exat`, `pxat`, `keepTtl`, `nx`, `xx`; non-string values are converted with `JSON.stringify`
- Source: https://upstash.com/docs/redis/sdks/ts/commands/string/getdel, /incrbyfloat, /msetnx, /setrange, /getset, /set, /mset, /mget (fetched 2026-11-14; no version pin on the site)

## Related

- [Commands: Hash](./commands-hash.md)
- [Commands: Key Expiry & Generic](./commands-generic.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
