# Sorted Set Commands

Redis sorted set operations for ordered collections where each member has a numeric score.

## Signature / Usage

```ts
// ZADD — add members with scores
await redis.zadd("leaderboard",
  { score: 100, member: "alice" },
  { score: 200, member: "bob" },
)

// ZADD with options
await redis.zadd("leaderboard", { nx: true }, { score: 300, member: "carol" })
await redis.zadd("leaderboard", { incr: true }, { score: 10, member: "alice" })

// ZRANGE — get members by rank (0-indexed)
const top = await redis.zrange<string>("leaderboard", 0, -1)
// with scores
const withScores = await redis.zrange("leaderboard", 0, -1, { withScores: true })

// ZRANK / ZREVRANK — get rank (0 = lowest score)
const rank = await redis.zrank("leaderboard", "alice")
const revRank = await redis.zrevrank("leaderboard", "alice")

// ZSCORE — get score of a member
const score = await redis.zscore("leaderboard", "alice")

// ZREM — remove members
await redis.zrem("leaderboard", "alice", "bob")

// ZCARD — count members
const count = await redis.zcard("leaderboard")

// ZCOUNT — count members within score range
const inRange = await redis.zcount("leaderboard", 100, 200)

// ZINCRBY — increment score
await redis.zincrby("leaderboard", 50, "alice")

// ZPOPMIN / ZPOPMAX — remove and return lowest/highest scored members
const lowest = await redis.zpopmin<string>("leaderboard")
const highest = await redis.zpopmax<string>("leaderboard")

// ZRANGEBYSCORE — get members within score range
const range = await redis.zrangebyscore("leaderboard", 100, 200)
```

## Options / Props

| Option (ZADD) | Description |
|------|-------------|
| `nx` | Only add new members; do not update existing |
| `xx` | Only update existing members; do not add new |
| `ch` | Return count of added + updated members (instead of only added) |
| `incr` | Increment score by given value (single member only) |
| `gt` | Update only if new score > current score |
| `lt` | Update only if new score < current score |

## Notes

- Members are sorted from lowest to highest score by default
- `ZRANGE` with `REV` flag (Redis 6.2+) returns members in reverse order
- Use sorted sets for leaderboards, priority queues, and time-series indexing by timestamp

## Related

- [Commands: Set](./commands-set.md)
- [Commands: Generic](./commands-generic.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
