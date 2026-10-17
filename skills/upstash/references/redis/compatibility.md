# Command Compatibility

Upstash Redis supports the Redis client protocol up to version 8.4 and gradually adds changes introduced in later versions. Over 200 commands are implemented across all major data types.

## Signature / Usage

Commands are also reachable over the REST API by passing the command name and arguments, separated by `/`, in the same order as the Redis protocol:

```shell
curl REST_URL/COMMAND/arg1/arg2/../argN
```

## Notes

- Source: https://upstash.com/docs/redis/overall/compatibility (Redis protocol 8.4, command families, connectivity) and https://upstash.com/docs/redis/overall/changelog ("Recent additions" dates) (fetched 2026-10; no version pin on the site).
- The `Usage` snippet is taken from https://upstash.com/docs/redis/features/restapi ("API Semantics").

### Upstash command families (extensions)
- **Search**: indexes JSON, hash, string, and stream keys through `SEARCH.*` commands (`SEARCH.CREATE`, `DROP`, `DESCRIBE`, `WAITINDEXING`, `QUERY`, `COUNT`, `AGGREGATE`, `ALIASADD`, `ALIASDEL`, `LISTALIASES`). Separate from, and incompatible with, the `FT.*` commands of the RediSearch module
- **Vector**: stores embeddings and answers nearest-neighbour queries through `VECTOR.*` commands (separate from the Upstash Vector product)
- **Array**: commands for sparse, index-addressed data, including range operations, scans, and fixed-size rings (September 2026)
- Extension commands are reachable from any client through its generic command interface and from the REST API; SDK command references (e.g. `@upstash/redis`) may cover a smaller set of typed helpers

### Recent additions (Upstash Redis changelog)
- April 2025: hash field expiration (`HEXPIRE`, `HPEXPIRE`, `HEXPIREAT`, `HPEXPIREAT`, `HTTL`, `HPTTL`, `HEXPIRETIME`, `HPEXPIRETIME`, `HPERSIST`)
- December 2025: Redis Functions (`FCALL`, `FCALL_RO`, `FUNCTION DELETE` / `FLUSH` / `KILL` / `LIST` / `LOAD` / `STATS`); `HGETDEL`, `HGETEX`, `HSETEX`; `XDELEX`, `XACKDEL`; `BITOP DIFF` / `DIFF1` / `ANDOR` / `ONE`
- March 2026: Redis Search (`SEARCH.*`)
- September 2026: Vector, Array commands, expanded Search (searchable streams, multi-value text and keyword fields, composite aggregations), `MSETEX`, `SDIFFCARD`, `SUNIONCARD`

### Supported Command Categories
- **Strings**: GET, SET, MGET, MSET, INCR, DECR, APPEND, STRLEN, SETEX, SETNX, GETRANGE, and more
- **Lists**: LPUSH, RPUSH, LPOP, RPOP, LRANGE, LLEN, LINDEX, BLPOP, BRPOP, and more
- **Sets**: SADD, SREM, SMEMBERS, SISMEMBER, SCARD, SUNION, SINTER, SDIFF, and more
- **Sorted Sets**: ZADD, ZRANGE, ZRANK, ZSCORE, ZREM, ZCARD, ZINCRBY, ZPOPMIN, ZPOPMAX, and more
- **Hashes**: HSET, HGET, HGETALL, HDEL, HMGET, HKEYS, HVALS, HINCRBY, and more
- **JSON**: JSON.SET, JSON.GET, JSON.DEL, JSON.ARRAPPEND, JSON.NUMINCRBY, and more
- **Streams**: XADD, XREAD, XRANGE, XLEN, and more
- **HyperLogLog**: PFADD, PFCOUNT, PFMERGE
- **Geo**: GEOADD, GEODIST, GEOPOS, GEOSEARCH
- **Pub/Sub**: PUBLISH, SUBSCRIBE, PSUBSCRIBE, UNSUBSCRIBE
- **Scripting**: EVAL, EVALSHA, SCRIPT LOAD
- **Transactions**: MULTI, EXEC, WATCH, DISCARD
- **Functions**: FCALL, FCALL_RO, FUNCTION LOAD, FUNCTION LIST, FUNCTION DELETE, FUNCTION FLUSH, FUNCTION KILL, FUNCTION STATS
- **Server**: ACL, FLUSHDB, DBSIZE, MONITOR, SCAN, INFO, PING

### Connectivity
- Both **native Redis TCP** and **HTTPS REST API** are supported
- Integration-tested with major clients: node-redis, ioredis, Jedis, Lettuce, go-redis, redis-py

### Unsupported Commands
- Most unsupported items are on the Upstash roadmap
- Lua scripting over the REST API is documented in the EVAL command reference
- Contact support@upstash.com for information on specific commands

## Related

- [REST API](./rest-api.md)
- [Commands: Vector](./commands-vector.md)
- [Commands: Array](./commands-array.md)
- [Commands: Functions](./commands-functions.md)
- [Search: Introduction](./search-introduction.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [Python SDK Overview](./py-sdk-overview.md)
