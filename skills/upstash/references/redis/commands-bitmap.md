# Bitmap Commands

Bit-level operations on string values: count, position, get/set a single bit, and bitwise operations between keys.

## Signature / Usage

```ts
const bits = await redis.bitcount("key");
const bits = await redis.bitcount("key", 5, 10);
await redis.bitpos("key", 1);
await redis.bitpos("key", 1, 5, 20);
const bit = await redis.getbit("key", 4);
const originalBit = await redis.setbit("key", 4, 1);
await redis.bitop("and", "destKey", "sourceKey1", "sourceKey2");
await redis.bitop("not", "destKey", "sourceKey");
```

## Options / Props

| Command | Arguments | Returns |
|---------|-----------|---------|
| `BITCOUNT` | `key`, optional `start` and `end` (give both or neither) | Number of set bits |
| `BITPOS` | `key`, `bit` (`0 \| 1`), optional `start`, `end` | Index of the first matching bit |
| `GETBIT` | `key`, `offset` | Bit at the offset |
| `SETBIT` | `key`, `offset`, `value` (`0 \| 1`) | The original bit at the offset |
| `BITOP` | `operation` (`and`, `or`, `xor`, `not`, `diff`, `diff1`, `andor`, `one`), `destinationKey`, `...sourceKeys` | Size of the string stored in the destination |

## Notes

- `not` accepts exactly one source key
- `diff`, `diff1`, `andor` and `one` were added in December 2025 and correspond to Redis 8.2+ (the official page labels the DIFF example "Redis 8.2+"): `DIFF` sets a bit when it is set in all source bitmaps (per the changelog wording), `DIFF1` when set in the first key but not in the others, `ANDOR` when set in X and in one or more of Y1, Y2, ..., `ONE` when set in exactly one source key
- Binary results can contain invalid UTF-8; see the REST API page for how responses are encoded (base64 option)
- Source: https://upstash.com/docs/redis/sdks/ts/commands/bitmap/bitcount, /bitpos, /getbit, /setbit, /bitop and https://upstash.com/docs/redis/overall/changelog (fetched 2026-11-14; no version pin on the site)

## Related

- [Commands: String](./commands-string.md)
- [REST API](./rest-api.md)
