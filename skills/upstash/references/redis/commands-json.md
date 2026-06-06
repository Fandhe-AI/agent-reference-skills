# JSON Commands

Redis JSON commands for storing and manipulating JSON documents within Redis keys. Uses JSONPath (`$`) syntax for nested access.

## Signature / Usage

```ts
// JSON.SET — store a JSON document at a path
await redis.json.set("user:1", "$", { name: "Alice", scores: [10, 20] })
await redis.json.set("user:1", "$.name", "Bob")  // update nested field

// JSON.GET — retrieve JSON document or a nested value
const doc = await redis.json.get("user:1")
const name = await redis.json.get("user:1", { path: "$.name" })

// JSON.DEL — delete a path (or whole key if $ path)
await redis.json.del("user:1", "$.scores")

// JSON.ARRAPPEND — append to a JSON array at path
await redis.json.arrappend("user:1", "$.scores", 30, 40)
// returns array of new lengths

// JSON.ARRLEN — get array length at path
const len = await redis.json.arrlen("user:1", "$.scores")

// JSON.NUMINCRBY — increment numeric field
await redis.json.numincrby("user:1", "$.scores[0]", 5)

// JSON.TYPE — get type of value at path
const type = await redis.json.type("user:1", "$")

// JSON.MGET — get JSON values from multiple keys at same path
const vals = await redis.json.mget(["user:1", "user:2"], "$")
```

## Notes

- JSONPath root is `$`; use dot notation for nested fields: `$.address.city`
- Commands return arrays of values (one per matched path); `$` returns one-element arrays
- Works natively with Redis Search — use `json.set` to index documents for full-text search
- `JSON.SET` creates the key if it does not exist; use `NX` or `XX` option to control behavior

## Related

- [Commands: String](./commands-string.md)
- [Redis Search: Getting Started](./search-getting-started.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
