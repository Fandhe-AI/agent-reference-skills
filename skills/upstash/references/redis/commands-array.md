# Commands: Array (AR*)

Commands for a sparse, index-addressed array of string values under unsigned integer indexes (`0` to `18446744073709551614`), with an append cursor and fixed-size ring support.

## Signature / Usage

```ts
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

await redis.arset("readings", 0, 21.5, 21.7);          // newly occupied slots: 2
await redis.arget<{ temperature: number }>("readings", 7);
await redis.arscan("my-array", 0, 1000, { limit: 10 });
await redis.argrep("my-array", "-", "+", {
  predicates: [{ glob: "error:*" }],
  limit: 10,
});
await redis.arop("my-array", 0, 999, "SUM");
await redis.arring("recent", 3, "a", "b", "c");         // "2" (index of last write, string in TS)
await redis.arlastitems("recent", 3);                   // ["a", "b", "c"] in write order
```

```redis
ARSET <key> <index> <value> [<value> ...]
ARMSET <key> <index> <value> [<index> <value> ...]
ARGET <key> <index>
ARMGET <key> <index> [<index> ...]
ARGETRANGE <key> <start> <end>
ARSCAN <key> <start> <end> [LIMIT <limit>]
ARGREP <key> <start> <end> <EXACT <value> | MATCH <substring> | GLOB <pattern> | RE <regex>> [...] [AND | OR] [NOCASE] [WITHVALUES] [LIMIT <limit>]
ARDEL <key> <index> [<index> ...]
ARDELRANGE <key> <start> <end> [<start> <end> ...]
ARCOUNT <key>
ARLEN <key>
ARINSERT <key> <value> [<value> ...]
ARRING <key> <size> <value> [<value> ...]
ARLASTITEMS <key> <count> [REV]
ARNEXT <key>
ARSEEK <key> <index>
AROP <key> <start> <end> <SUM | MIN | MAX | AND | OR | XOR | USED | MATCH <value>>
ARINFO <key> [FULL]
```

## Options / Props

| Command | Purpose | Reply |
|---------|---------|-------|
| `ARSET` | Write consecutive values from an index | Integer: newly occupied slots only (overwrites count `0`) |
| `ARMSET` | Write index-value pairs atomically; last value wins for a repeated index | Integer: newly occupied slots |
| `ARGET` | Read one slot | Value, or null for an empty slot or missing key |
| `ARMGET` | Read several slots, positional | Array with null for empty slots |
| `ARGETRANGE` | Read an inclusive range, one element per index | Array with nulls; `start > end` reverses order; range over 1,000,000 indexes is rejected |
| `ARSCAN` | List occupied slots in an inclusive range, ascending | Array of `[index, value]`; `LIMIT` must be > 0; `start` must not exceed `end` |
| `ARGREP` | Search values by predicates | Array of indexes, or `[index, value]` pairs with `WITHVALUES` |
| `ARDEL` | Empty slots (leaves holes) | Integer: slots that held a value |
| `ARDELRANGE` | Empty occupied slots in one or more inclusive ranges | Integer: total removed |
| `ARCOUNT` | Number of occupied slots (`0` for missing key) | Integer |
| `ARLEN` | Highest occupied index plus one (`0` for missing key) | Integer, or big number above signed 64-bit |
| `ARINSERT` | Append after the cursor; cursor moves to the last value | Integer: index of last value written |
| `ARRING` | Append to a ring of `<size>` slots, wrapping to `0` | Integer: index of last value written |
| `ARLASTITEMS` | Read the most recent values, oldest first (`REV` for newest first) | Array of values / nulls |
| `ARNEXT` | Index the next append will use (`0` if missing or never appended) | Integer, or null when cursor is at the highest index |
| `ARSEEK` | Move the append cursor | `1` moved, `0` key does not exist |
| `AROP` | Server-side reduction over a range | `SUM` / `MIN` / `MAX` bulk string; `AND` / `OR` / `XOR` / `USED` / `MATCH` integer |
| `ARINFO` | Layout inspection (`len`, `count`, `slice-size`, `slices`, `directory-size`, `super-dir-entries`, `next-insert-index`; with `FULL`: `dense-slices`, `sparse-slices`, `avg-dense-size`, `avg-dense-fill`, `avg-sparse-size`) | Flat array (RESP2) / map (RESP3) |

`ARGREP` predicates: `EXACT` (whole value), `MATCH` (substring), `GLOB` (`*` and `?`), `RE` (regex). `OR` is the default combiner; `AND` requires all predicates; `NOCASE` applies to every predicate; `-` / `+` bound the whole index range.

## Notes

- Sparse: writing a distant index does not allocate intermediate slots, and deleting never shifts values. `ARCOUNT` (occupied slots) and `ARLEN` (highest index + 1) agree only for a densely filled array.
- The append cursor tracks appends only. `ARINSERT` / `ARRING` advance it, `ARNEXT` reads it, `ARSEEK` moves it; `ARSET` / `ARMSET` and deletions never move it, so a freed index is not reused by a later append. In the TypeScript SDK docs: to append after positional writes, use `ARSEEK` with the length from `ARLEN`.
- Removing the last remaining value deletes the key.
- `ARRING` with a different size reshapes the ring: the most recent values that fit are relaid from index `0`, older ones dropped. More values than `<size>` in one call keeps only the last `<size>`.
- Limits and errors: `ERR invalid array index` (out-of-range index in `ARSET`), `ERR insert index overflow` (`ARINSERT`), `ERR range exceeds maximum of 1000000 items` (`ARGETRANGE`), `ERR no such key` (`ARINFO`). `ARGREP` allows at most 250 predicates; a regex is at most 2048 bytes and backreferences (`\1` to `\9`) are unsupported. `ARMSET` / `ARDELRANGE` need an even number of arguments after the key.
- `AROP`: `SUM` / `MIN` / `MAX` / `AND` / `OR` / `XOR` skip non-numeric values (bitwise ops use 64-bit integers, fractions truncated) and reply null when nothing is usable; `USED` and `MATCH` always reply with an integer.
- TypeScript SDK: `arget<TData>()` returns `TData | null` with automatic deserialization (default `string`); `arring` returns the index as a string in TypeScript and an integer in Python. `index` accepts `number | string`.
- Python SDK shape for `ARGREP`: `redis.argrep("my-array", "-", "+", glob="error:*", limit=10)`.
- Use an array when data has a natural numeric key (sequence number, bucketed timestamp); a list would force a scan and a hash stores the index as a string.
- Source: https://upstash.com/docs/redis/commands/array/overview and each `array/*` command page, plus /redis/sdks/ts/commands/array/{arset,arget,arring} (fetched 2026-10; no version pin on the site).

## Related

- [Commands: List](./commands-list.md)
- [Commands: Hash](./commands-hash.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
