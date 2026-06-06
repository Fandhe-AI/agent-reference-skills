# Command Compatibility

Upstash Redis supports the Redis client protocol up to version 8.2. Over 200 commands are implemented across all major data types.

## Notes

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
- **Functions**: FCALL, FUNCTION LOAD
- **Server**: ACL, FLUSHDB, DBSIZE, MONITOR, SCAN, INFO, PING

### Connectivity
- Both **native Redis TCP** and **HTTPS REST API** are supported
- Integration-tested with major clients: node-redis, ioredis, Jedis, Lettuce, go-redis, redis-py

### Unsupported Commands
- Most unsupported commands are on the Upstash roadmap
- Contact support@upstash.com for information on specific commands

## Related

- [REST API](./rest-api.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
- [Python SDK Overview](./py-sdk-overview.md)
