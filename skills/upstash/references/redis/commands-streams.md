# Stream Commands

Redis stream operations in `@upstash/redis`: append entries, read ranges, consumer groups, acknowledgement, claiming, and trimming.

## Signature / Usage

```ts
const result = await redis.xadd("mystream", "*", { name: "John Doe", age: 30 });
const result = await redis.xrange("mystream", "-", "+");
const result = await redis.xrevrange("mystream", "+", "-", 2);
const result = await redis.xread("mystream", "0-0");
const result = await redis.xgroup("mystream", {
  type: "CREATE",
  group: "mygroup",
  id: "$",
  options: { MKSTREAM: true }
});
const result = await redis.xreadgroup("mygroup", "consumer1", "mystream", ">", {
  count: 5
});
const result = await redis.xack("mystream", "mygroup", "1638360173533-0");
const result = await redis.xpending("mystream", "mygroup", "-", "+", 5, {
  idleTime: 10000
});
const result = await redis.xautoclaim(
  "mystream",
  "mygroup",
  "consumer1",
  60000,
  "0-0",
  { count: 5, justId: true }
);
const result = await redis.xtrim("mystream", {
  strategy: "MAXLEN",
  threshold: 100,
  exactness: "~"
});
const result = await redis.xackdel("mystream", "mygroup", "KEEPREF", "1638360173533-0");
const result = await redis.xdelex("mystream", "KEEPREF", "1638360173533-0");
```

## Options / Props

| Command | Signature | Returns |
|---------|-----------|---------|
| `XADD` | `xadd(key, id, entries, { nomkStream?, trim?: { type: "MAXLEN" \| "MINID", threshold, comparison: "~" \| "=", limit? } })`; id `*` auto-generates, or an explicit ID such as `1526919030474-55` | ID of the new entry |
| `XRANGE` | `xrange(key, start, end, count?)` | Object of entries keyed by ID |
| `XREVRANGE` | `xrevrange(key, end, start, count?)` (highest ID first) | Object of entries in reverse order |
| `XREAD` | `xread(key \| keys[], id \| ids[], options?)`; `$` reads only new messages | Per-stream arrays, or `null` when no data |
| `XREADGROUP` | `xreadgroup(group, consumer, key \| keys[], id \| ids[], { count?, NOACK? })`; `>` reads never-delivered messages | Per-stream arrays, or `null` |
| `XGROUP` | `xgroup(key, { type: "CREATE" \| "CREATECONSUMER" \| "DELCONSUMER" \| "DESTROY" \| "SETID", group, ... })` | `"OK"`, or `1` / `0`, pending count, etc. depending on the subcommand |
| `XINFO` | `xinfo(key, { type: "GROUPS" })` or `{ type: "CONSUMERS", group }` | Group / consumer info arrays |
| `XLEN` | `xlen(key)` | Entry count (`0` if the stream does not exist) |
| `XACK` | `xack(key, group, id \| ids[])` | Number acknowledged |
| `XPENDING` | `xpending(key, group, start, end, count, { idleTime?, consumer? })` | Pending message details |
| `XCLAIM` | `xclaim(key, group, consumer, minIdleTime, id \| ids[], { justId? ... })` | Claimed messages (or IDs with `justId`) |
| `XAUTOCLAIM` | `xautoclaim(key, group, consumer, minIdleTime, start, { count?, justId? })` | Next start ID, claimed messages, deleted IDs |
| `XDEL` | `xdel(key, id \| ids[])` | Number deleted |
| `XTRIM` | `xtrim(key, { strategy: "MAXLEN" \| "MINID", threshold, exactness: "~" \| "=", limit? })`; `limit` only with `~` | Number removed |
| `XDELEX` | `xdelex(key, option?, ...ids)`; option `KEEPREF` / `DELREF` / `ACKED` goes before the IDs | Array of per-ID results |
| `XACKDEL` | `xackdel(key, group, option, ...ids)` | Array of per-ID results: `1` deleted, `-1` not found, `2` kept (with `ACKED` when another group has not acknowledged) |

## Notes

- `XDELEX` and `XACKDEL` are available in Redis 8.2.0 and later (official pages) and were added in December 2025 (Upstash Redis changelog); `KEEPREF` deletes entries but keeps their references in other consumer groups' pending lists
- Blocking reads (`XREAD` / `XREADGROUP` with `BLOCK`) are not supported over REST (see the REST API page)
- Streams can also be indexed and searched with Redis Search (see Searchable Streams)
- `XADD` ID formats: `*` (auto), `<ms>-<seq>` (explicit), `<ms>-*` (auto sequence for a given millisecond, Redis 8+); `options.nomkStream` prevents creating a missing stream and `options.trim` takes `{ type, threshold, comparison, limit? }`
- `XCLAIM`: Upstash Redis does not support the `IDLE`, `TIME`, `RETRYCOUNT`, `FORCE` and `LASTID` options, so the SDK's `idleMS`, `retryCount`, `force` and `lastId` options fail with an error (`timeMS` is ignored without `idleMS`)
- The option shapes in the table are summarized from the official argument lists; check the official page for rarely used nested fields
- Source: https://upstash.com/docs/redis/sdks/ts/commands/stream/xadd, /xrange, /xrevrange, /xread, /xreadgroup, /xgroup, /xinfo, /xlen, /xack, /xpending, /xclaim, /xautoclaim, /xdel, /xtrim, /xdelex, /xackdel (fetched 2026-11-14; no version pin on the site)

## Related

- [Redis Search: Searchable Streams](./search-streams.md)
- [REST API](./rest-api.md)
- [Commands: Generic](./commands-generic.md)
