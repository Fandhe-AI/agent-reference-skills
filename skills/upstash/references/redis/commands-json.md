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

```ts
const index = await redis.json.arrindex("key", "$.path.to.array", "a");
const length = await redis.json.arrinsert("key", "$.path.to.array", 2, "a", "b");
const element = await redis.json.arrpop("key", "$.path.to.array");
const firstElement = await redis.json.arrpop("key", "$.path.to.array", 0);
const length = await redis.json.arrtrim("key", "$.path.to.array", 2, 10);
await redis.json.clear("key", "$.my.key");
await redis.json.forget("key", "$.path.to.value");
await redis.json.merge("key", "$.path.to.value", {"new": "value"})
await redis.json.mset(
  { key: "profile:1", path: "$", value: { name: "Ada" } },
  { key: "profile:2", path: "$", value: { name: "Grace" } },
);
const newValue = await redis.json.nummultby("key", "$.path.to.value", 2);
const keys = await redis.json.objkeys("key", "$.path");
const lengths = await redis.json.objlen("key", "$.path");
await redis.json.strappend("key", "$.path.to.str", "abc");
await redis.json.strlen("key", "$.path.to.str");
const bool = await redis.json.toggle("key", "$.path.to.bool");
```

## Notes

- JSONPath root is `$`; use dot notation for nested fields: `$.address.city`
- Commands return arrays of values (one per matched path); `$` returns one-element arrays
- Works natively with Redis Search — use `json.set` to index documents for full-text search
- `JSON.ARRAPPEND`: to append a string element wrap the quoted string in an additional set of single quotes, e.g. `'"silver"'` (official note)
- Source: https://upstash.com/docs/redis/sdks/ts/commands/json/arrappend (fetched 2026-11-14; no version pin on the site)
- `JSON.SET` creates the key if it does not exist; use `NX` or `XX` option to control behavior

### Additional commands (official TypeScript SDK command pages)

- `JSON.ARRINDEX key path value [start] [stop]`: first index of the value (`-1` if not found)
- `JSON.ARRINSERT key path index ...values`: inserts before the index (shifts right); returns new array lengths
- `JSON.ARRPOP key [path] [index]`: removes and returns an element (the last one by default)
- `JSON.ARRTRIM key path start stop`: keeps only the inclusive range; returns new lengths
- `JSON.CLEAR key path`: clears containers (arrays / objects) and sets numbers to `0`; returns how many values were cleared
- `JSON.FORGET key path`: deletes a path (same effect as `JSON.DEL`); returns how many paths were deleted
- `JSON.MERGE key path value`: merges the value into the JSON at the path; returns `"OK"`
- `JSON.MSET ...{ key, path, value }`: sets multiple values at multiple paths in multiple keys; returns `"OK"`
- `JSON.NUMMULTBY key path number`, `JSON.OBJKEYS key path`, `JSON.OBJLEN key path`, `JSON.STRAPPEND key path value`, `JSON.STRLEN key path`, `JSON.TOGGLE key path`: return per-path arrays (new values, keys, lengths, or the toggled boolean)
- Source: https://upstash.com/docs/redis/sdks/ts/commands/json/arrindex, /arrinsert, /arrpop, /arrtrim, /clear, /forget, /merge, /mset, /nummultby, /objkeys, /objlen, /strappend, /strlen, /toggle (fetched 2026-11-14; no version pin on the site)

## Related

- [Commands: String](./commands-string.md)
- [Redis Search: Getting Started](./search-getting-started.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
