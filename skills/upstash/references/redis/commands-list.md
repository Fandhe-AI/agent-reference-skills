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

```ts
const index = await redis.lpos("key", "b");
const index = await redis.lpos("key", "b", { rank: 2 });
const length = await redis.lpushx("key", "d");
const length = await redis.rpushx("key", "d");
```

## Notes

- `LRANGE` with `-1` as the end index returns up to the last element
- `LPUSH` / `RPUSH` accept multiple values; they are pushed in argument order
- Blocking variants (`BLPOP`, `BRPOP`) are supported for queue patterns
- Lists are ordered by insertion — use Sorted Sets for priority ordering

### Additional commands (official TypeScript SDK command pages)

- `LPOS key element { rank, count, maxLen }`: index of the matching element, or an array of indexes when `count` is set; `rank` picks the n-th match
- `LPUSHX` / `RPUSHX key ...elements`: push at the head / tail only if the list exists; return the new length, or `0` if the list did not exist
- Source: https://upstash.com/docs/redis/sdks/ts/commands/list/lpos, /lpushx, /rpushx (fetched 2026-11-14; no version pin on the site)

## Related

- [Commands: String](./commands-string.md)
- [Commands: Sorted Set](./commands-zset.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
