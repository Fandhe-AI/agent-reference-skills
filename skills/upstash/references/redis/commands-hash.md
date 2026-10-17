# Hash Commands

Redis hash operations for storing and retrieving field-value maps within a single key.

## Signature / Usage

```ts
// HSET — set one or more fields
await redis.hset("user:1", { name: "Alice", age: 30 })

// HGET — get a single field
const name = await redis.hget<string>("user:1", "name")

// HGETALL — get all fields and values
const user = await redis.hgetall<{ name: string; age: number }>("user:1")

// HMGET — get multiple fields
const [name, age] = await redis.hmget("user:1", "name", "age")

// HDEL — delete one or more fields
const removed = await redis.hdel("user:1", "field1", "field2")
// returns count of actually deleted fields

// HEXISTS — check if field exists
const exists = await redis.hexists("user:1", "name")

// HLEN — number of fields
const count = await redis.hlen("user:1")

// HKEYS / HVALS — list all field names or values
const keys = await redis.hkeys("user:1")
const vals = await redis.hvals("user:1")

// HINCRBY / HINCRBYFLOAT — increment numeric field
await redis.hincrby("user:1", "age", 1)
await redis.hincrbyfloat("user:1", "score", 1.5)

// Hash field expiration (April 2025). `fields` is string | number | (string | number)[]
// option (optional): "NX" | "XX" | "GT" | "LT"
await redis.hexpire("my-key", "my-field", 1)               // key, fields, seconds, option?
await redis.hexpireat("my-key", "my-field", Math.floor(Date.now() / 1000) + 10) // Unix seconds
await redis.hpexpire("my-key", "my-field", 1000)           // milliseconds
await redis.hpexpireat("my-key", "my-field", Date.now() + 1000) // Unix milliseconds
const expSecs = await redis.hexpiretime("my-key", "my-field")   // number[] Unix seconds
const expMs = await redis.hpexpiretime("my-key", "my-field")    // Unix milliseconds
const ttlSecs = await redis.httl("my-key", "my-field")          // number[] remaining seconds
const ttlMs = await redis.hpttl("my-key", "my-field")           // number[] remaining milliseconds
const persisted = await redis.hpersist("my-key", "my-field")    // number[]

// HGETDEL / HGETEX / HSETEX (December 2025)
const got = await redis.hgetdel("user:123", "name", "email")    // { name, email } | null; atomic get + delete
const ex = await redis.hgetex("user:123", { ex: 60 }, "name", "email") // options: ex | px | exat | pxat | persist: true (mutually exclusive); {} = no change
await redis.hsetex("user:123", { conditional: "FNX", expiration: { ex: 3600 } }, { name: "John" }) // returns number of fields set
```

## Notes

- Hash field expiration commands were added in April 2025; `HGETDEL`, `HGETEX`, `HSETEX` in December 2025 (Upstash Redis changelog)
- `HGETALL` returns `null` if the key does not exist
- `HMSET` is deprecated in Redis 4.0; use `HSET` with multiple fields instead
- The TS SDK page words `FNX`/`FXX` as hash existence, but the command page https://upstash.com/docs/redis/commands/hash/hsetex defines them per field (`FNX`: none of the given fields exist, `FXX`: all of them exist)
- `HDEL` returns the count of fields that were actually deleted (ignores non-existent fields)

### Hash field expiration

| Command | Arguments | Description |
|---------|-----------|-------------|
| `hexpire` | `key, fields, seconds, option?` | Set TTL in seconds for field(s) |
| `hexpireat` | `key, fields, timestamp, option?` | Set expiration as Unix timestamp in seconds |
| `hpexpire` | `key, fields, milliseconds, option?` | Set TTL in milliseconds |
| `hpexpireat` | `key, fields, timestamp, option?` | Set expiration as Unix timestamp in milliseconds |
| `hexpiretime` | `key, fields` | Absolute expiration as Unix timestamp in seconds |
| `hpexpiretime` | `key, fields` | Absolute expiration as Unix timestamp in milliseconds |
| `httl` | `key, fields` | Remaining TTL in seconds |
| `hpttl` | `key, fields` | Remaining TTL in milliseconds |
| `hpersist` | `key, fields` | Remove expiration from field(s) |

`option` (set commands): `NX` set only if the field has no expiration; `XX` only if it already has one; `GT` only if the new TTL is greater than the current; `LT` only if it is less.

Return values (`number[]`, one per field): set commands return `-2` (field or key missing), `0` (condition not met), `1` (set), `2` (called with 0 or a past time). Get commands (`hexpiretime`, `hpexpiretime`, `httl`, `hpttl`) return `-2` (missing) or `-1` (no expiration). `hpersist` returns `-2`, `-1` (no expiration set) or `1` (removed). Source types `hpexpiretime` as a single `integer`; the others as `number[]`.

### HGETDEL / HGETEX / HSETEX

| Command | Arguments | Returns |
|---------|-----------|---------|
| `hgetdel` | `key, ...fields` | `Record<string, TValue \| null> \| null`; values are returned and the fields deleted atomically; missing fields are `null`, `null` if hash or all fields are missing |
| `hgetex` | `key, options, ...fields` | Same shape as `hgetdel`. `options`: exactly one of `ex` (seconds), `px` (ms), `exat` (Unix seconds), `pxat` (Unix ms), `persist: true`; pass `{}` to read without changing expiration |
| `hsetex` | `key, options, fields` | Number of fields set (`0` if the condition is not met). `options.conditional`: `FNX` (only if none of the given fields exist) / `FXX` (only if all of them exist), case-insensitive. `options.expiration`: `ex`, `px`, `exat`, `pxat`, or `keepttl: true`. Pass `undefined` for no options |

## Related

- [Commands: String](./commands-string.md)
- [Commands: JSON](./commands-json.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
