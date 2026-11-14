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

Adapted (not in the official docs): lexicographic range bounds in the `zlexcount` / `zremrangebylex` calls carry the required `[` (inclusive) prefix; the official examples pass bare `"two"`, `"alpha"` and `"omega"`.

```ts
const values = await redis.zdiffstore("destination", 2, "key1", "key2");
const res = await redis.zinterstore("destination", 2, ["key1", "key2"]);
const res = await redis.zinterstore(
    "destination",
    2,
    ["key1", "key2"],
    { weights: [2, 3] },
);
const res = await redis.zunionstore("destination", 2, ["key1", "key2"]);
const elements = await redis.zlexcount("key", "[two", "+");
const scores = await redis.zmscore("key", ["m2", "m4"])
await redis.zremrangebylex("key", "[alpha", "[omega")
await redis.zremrangebyrank("key", 4, 20)
await redis.zremrangebyscore("key", 2, 5)
const [newCursor, members] = await redis.zscan("key", 0, { match: "a*", count: 1});
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

- Adapted from the official docs: lexicographic bounds must start with `[` (inclusive) or `(` (exclusive), or be `-` / `+`; the official `zlexcount` / `zremrangebylex` examples omit the prefix and would be rejected by Redis
- Members are sorted from lowest to highest score by default
- `ZRANGE` with `REV` flag (Redis 6.2+) returns members in reverse order
- Use sorted sets for leaderboards, priority queues, and time-series indexing by timestamp

### Additional commands (official TypeScript SDK command pages)

- `ZDIFFSTORE destination numkeys ...keys`, `ZINTERSTORE` / `ZUNIONSTORE destination numkeys keys [{ aggregate?, weight? \| weights? }]`: store the difference / intersection / union; return the number of elements in the result
- `ZLEXCOUNT key min max`: count by lexicographic range (`-` / `+` disable the bound)
- `ZMSCORE key members[]`: scores of several members
- `ZREMRANGEBYLEX` / `ZREMRANGEBYRANK` / `ZREMRANGEBYSCORE key min max`: remove members in a lex / rank / score range; return the number removed
- `ZSCAN key cursor { match, count }`: returns `[newCursor, members]`; a returned cursor of `0` means the iteration is complete
- Source: https://upstash.com/docs/redis/sdks/ts/commands/zset/zdiffstore, /zinterstore, /zunionstore, /zlexcount, /zmscore, /zremrangebylex, /zremrangebyrank, /zremrangebyscore, /zscan (fetched 2026-11-14; no version pin on the site)

## Related

- [Commands: Set](./commands-set.md)
- [Commands: Generic](./commands-generic.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
