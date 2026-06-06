# List Commands

Redis list operations for ordered collections with head/tail push and pop.

## Signature / Usage

```ts
// LPUSH / RPUSH — prepend or append elements
await redis.lpush("queue", "a", "b", "c")  // ["c","b","a"]
await redis.rpush("queue", "x", "y")        // ["c","b","a","x","y"]

// LPOP / RPOP — remove and return from head or tail
const head = await redis.lpop<string>("queue")
const tail = await redis.rpop<string>("queue")

// LRANGE — get a range of elements (0-indexed, inclusive)
const items = await redis.lrange<string>("queue", 0, -1)  // all elements

// LLEN — number of elements
const len = await redis.llen("queue")

// LINDEX — get element by index
const el = await redis.lindex<string>("queue", 0)

// LINSERT — insert before or after a pivot element
await redis.linsert("queue", "BEFORE", "pivot", "newval")

// LSET — set element at index
await redis.lset("queue", 0, "newval")

// LREM — remove N occurrences of a value
await redis.lrem("queue", 1, "a")

// LTRIM — trim list to a range
await redis.ltrim("queue", 0, 9)  // keep first 10 elements

// LMOVE — atomically move element between lists
await redis.lmove("src", "dst", "LEFT", "RIGHT")
```

## Notes

- `LRANGE` with `-1` as the end index returns up to the last element
- `LPUSH` / `RPUSH` accept multiple values; they are pushed in argument order
- Blocking variants (`BLPOP`, `BRPOP`) are supported for queue patterns
- Lists are ordered by insertion — use Sorted Sets for priority ordering

## Related

- [Commands: String](./commands-string.md)
- [Commands: Sorted Set](./commands-zset.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
