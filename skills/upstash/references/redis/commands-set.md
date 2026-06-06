# Set Commands

Redis set operations for unordered collections of unique members.

## Signature / Usage

```ts
// SADD — add members; returns count of newly added
await redis.sadd("tags", "a", "b", "c")  // 3
await redis.sadd("tags", "a", "b")        // 0 (already exist)

// SREM — remove members
await redis.srem("tags", "a")

// SMEMBERS — get all members
const members = await redis.smembers("tags")

// SISMEMBER — check membership (boolean)
const exists = await redis.sismember("tags", "b")

// SMISMEMBER — check multiple memberships
const results = await redis.smismember("tags", "a", "b", "z")

// SCARD — count members
const count = await redis.scard("tags")

// SPOP — remove and return a random member
const member = await redis.spop<string>("tags")

// SRANDMEMBER — return random member(s) without removing
const rand = await redis.srandmember<string>("tags")
const rands = await redis.srandmember<string>("tags", 3)

// Set operations
const union = await redis.sunion("set1", "set2")
const inter = await redis.sinter("set1", "set2")
const diff  = await redis.sdiff("set1", "set2")

// Store results of set operations into a new key
await redis.sunionstore("dest", "set1", "set2")
await redis.sinterstore("dest", "set1", "set2")
await redis.sdiffstore("dest", "set1", "set2")

// SMOVE — atomically move member between sets
await redis.smove("src", "dst", "member")
```

## Notes

- Sets do not preserve insertion order; use Sorted Sets for ordered unique collections
- `SRANDMEMBER` with a negative count may return duplicate members

## Related

- [Commands: Sorted Set](./commands-zset.md)
- [Commands: Generic](./commands-generic.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
