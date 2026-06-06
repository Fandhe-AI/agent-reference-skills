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
```

## Notes

- `HGETALL` returns `null` if the key does not exist
- `HMSET` is deprecated in Redis 4.0; use `HSET` with multiple fields instead
- `HDEL` returns the count of fields that were actually deleted (ignores non-existent fields)

## Related

- [Commands: String](./commands-string.md)
- [Commands: JSON](./commands-json.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
