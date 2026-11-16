---
source: https://docs.cloud.google.com/memorystore/docs/valkey/supported-commands
---

# Supported commands

Valkey commands that Memorystore for Valkey supports (both cluster modes, plus extra Cluster Mode Enabled commands) and the commands it blocks with a `NOPERM` error. The source lists one command per line in alphabetical order; here the supported and blocked commands are grouped by data type or family (`A|B` is subcommand `B` of the parent command `A`).

## Signature / Usage

### Supported for Cluster Mode Enabled and Cluster Mode Disabled

- Strings/bits: `APPEND`, `BITCOUNT`, `BITFIELD`, `BITFIELD_RO`, `BITOP`, `BITPOS`, `DECR`, `DECRBY`, `GET`, `GETBIT`, `GETDEL`, `GETEX`, `GETRANGE`, `GETSET`, `INCR`, `INCRBY`, `INCRBYFLOAT`, `LCS`, `MGET`, `MSET`, `MSETNX`, `PSETEX`, `SET`, `SETBIT`, `SETEX`, `SETNX`, `SETRANGE`, `STRLEN`, `SUBSTR`
- Keys: `COPY`, `DEL`, `DUMP`, `EXISTS`, `EXPIRE`, `EXPIREAT`, `EXPIRETIME`, `KEYS`, `OBJECT|ENCODING`, `OBJECT|FREQ`, `OBJECT|HELP`, `OBJECT|IDLETIME`, `OBJECT|REFCOUNT`, `PERSIST`, `PEXPIRE`, `PEXPIREAT`, `PEXPIRETIME`, `PTTL`, `RANDOMKEY`, `RENAME`, `RENAMENX`, `RESTORE`, `SCAN`, `SORT`, `SORT_RO`, `TOUCH`, `TTL`, `TYPE`, `UNLINK`
- Lists: `BLMOVE`, `BLMPOP`, `BLPOP`, `BRPOP`, `BRPOPLPUSH`, `LINDEX`, `LINSERT`, `LLEN`, `LMOVE`, `LMPOP`, `LPOP`, `LPOS`, `LPUSH`, `LPUSHX`, `LRANGE`, `LREM`, `LSET`, `LTRIM`, `RPOP`, `RPOPLPUSH`, `RPUSH`, `RPUSHX`
- Hashes: `HDEL`, `HEXISTS`, `HGET`, `HGETALL`, `HINCRBY`, `HINCRBYFLOAT`, `HKEYS`, `HLEN`, `HMGET`, `HMSET`, `HRANDFIELD`, `HSCAN`, `HSET`, `HSETNX`, `HSTRLEN`, `HVALS`
- Sets: `SADD`, `SCARD`, `SDIFF`, `SDIFFSTORE`, `SINTER`, `SINTERCARD`, `SINTERSTORE`, `SISMEMBER`, `SMEMBERS`, `SMISMEMBER`, `SMOVE`, `SPOP`, `SRANDMEMBER`, `SREM`, `SSCAN`, `SUNION`, `SUNIONSTORE`
- Sorted sets: `BZMPOP`, `BZPOPMAX`, `BZPOPMIN`, `ZADD`, `ZCARD`, `ZCOUNT`, `ZDIFF`, `ZDIFFSTORE`, `ZINCRBY`, `ZINTER`, `ZINTERCARD`, `ZINTERSTORE`, `ZLEXCOUNT`, `ZMPOP`, `ZMSCORE`, `ZPOPMAX`, `ZPOPMIN`, `ZRANDMEMBER`, `ZRANGE`, `ZRANGEBYLEX`, `ZRANGEBYSCORE`, `ZRANGESTORE`, `ZRANK`, `ZREM`, `ZREMRANGEBYLEX`, `ZREMRANGEBYRANK`, `ZREMRANGEBYSCORE`, `ZREVRANGE`, `ZREVRANGEBYLEX`, `ZREVRANGEBYSCORE`, `ZREVRANK`, `ZSCAN`, `ZSCORE`, `ZUNION`, `ZUNIONSTORE`
- Geo: `GEOADD`, `GEODIST`, `GEOHASH`, `GEOPOS`, `GEORADIUS`, `GEORADIUS_RO`, `GEORADIUSBYMEMBER`, `GEORADIUSBYMEMBER_RO`, `GEOSEARCH`, `GEOSEARCHSTORE`
- HyperLogLog: `PFADD`, `PFCOUNT`, `PFMERGE`
- Streams: `XACK`, `XADD`, `XAUTOCLAIM`, `XCLAIM`, `XDEL`, `XGROUP|CREATE`, `XGROUP|CREATECONSUMER`, `XGROUP|DELCONSUMER`, `XGROUP|DESTROY`, `XGROUP|HELP`, `XGROUP|SETID`, `XINFO|CONSUMERS`, `XINFO|GROUPS`, `XINFO|HELP`, `XINFO|STREAM`, `XLEN`, `XPENDING`, `XRANGE`, `XREAD`, `XREADGROUP`, `XREVRANGE`, `XTRIM`
- Pub/Sub: `PSUBSCRIBE`, `PUBLISH`, `PUBSUB|CHANNELS`, `PUBSUB|HELP`, `PUBSUB|NUMPAT`, `PUBSUB|NUMSUB`, `PUBSUB|SHARDCHANNELS`, `PUBSUB|SHARDNUMSUB`, `PUNSUBSCRIBE`, `SPUBLISH`, `SSUBSCRIBE`, `SUBSCRIBE`, `SUNSUBSCRIBE`, `UNSUBSCRIBE`
- Scripting: `EVAL`, `EVAL_RO`, `EVALSHA`, `EVALSHA_RO`, `FCALL`, `FCALL_RO`, `FUNCTION|DELETE`, `FUNCTION|DUMP`, `FUNCTION|FLUSH`, `FUNCTION|HELP`, `FUNCTION|KILL`, `FUNCTION|LIST`, `FUNCTION|LOAD`, `FUNCTION|RESTORE`, `FUNCTION|STATS`, `SCRIPT|DEBUG`, `SCRIPT|EXISTS`, `SCRIPT|FLUSH`, `SCRIPT|HELP`, `SCRIPT|KILL`, `SCRIPT|LOAD`
- Transactions: `DISCARD`, `EXEC`, `MULTI`, `UNWATCH`, `WATCH`
- Connection/server: `AUTH`, `CLIENT|CACHING`, `CLIENT|GETNAME`, `CLIENT|GETREDIR`, `CLIENT|HELP`, `CLIENT|ID`, `CLIENT|INFO`, `CLIENT|KILL`, `CLIENT|LIST`, `CLIENT|REPLY`, `CLIENT|SETNAME`, `CLIENT|TRACKING`, `CLIENT|TRACKINGINFO`, `COMMAND|COUNT`, `COMMAND|DOCS`, `COMMAND|GETKEYS`, `COMMAND|GETKEYSANDFLAGS`, `COMMAND|HELP`, `COMMAND|INFO`, `COMMAND|LIST`, `CONFIG|HELP`, `DBSIZE`, `ECHO`, `FLUSHALL`, `FLUSHDB`, `HELLO`, `INFO`, `LATENCY|DOCTOR`, `LATENCY|GRAPH`, `LATENCY|HELP`, `LATENCY|HISTOGRAM`, `LATENCY|HISTORY`, `LATENCY|LATEST`, `LATENCY|RESET`, `LOLWUT`, `MEMORY|DOCTOR`, `MEMORY|HELP`, `MEMORY|MALLOC-STATS`, `MEMORY|PURGE`, `MEMORY|STATS`, `MEMORY|USAGE`, `MODULE|HELP`, `MONITOR`, `PING`, `QUIT`, `RESET`, `ROLE`, `SELECT`, `SLOWLOG|HELP`, `TIME`, `WAIT`

### Additional commands for Cluster Mode Enabled instances

As listed in the source, one command per line:

```text
ASKING
CLUSTER | COUNT-FAILURE-REPORTS
CLUSTER | COUNTKEYSINSLOT
CLUSTER | GETKEYSINSLOT
CLUSTER | HELP
CLUSTER | INFO
CLUSTER | KEYSLOT
CLUSTER | LINKS
CLUSTER | MYID
CLUSTER | NODES
CLUSTER | REPLICAS
CLUSTER | SHARDS
CLUSTER | SLOTS
READONLY
READWRITE
```

### Blocked commands (return a `NOPERM` error)

- `ACL|DELUSER`, `ACL|DRYRUN`, `ACL|GETUSER`, `ACL|LIST`, `ACL|LOAD`, `ACL|LOG`, `ACL|SAVE`, `ACL|SETUSER`, `ACL|USERS`, `ACL|CAT`, `ACL|GENPASS`, `ACL|HELP`, `ACL|WHOAMI`
- `BGREWRITEAOF`, `BGSAVE`, `DEBUG`, `FAILOVER`, `LASTSAVE`, `MIGRATE`, `MOVE`, `PFDEBUG`, `PFSELFTEST`, `PSYNC`, `REPLCONF`, `REPLICAOF`, `RESTORE-ASKING`, `SAVE`, `SHUTDOWN`, `SLAVEOF`, `SWAPDB`, `SYNC`, `XSETID`
- `CLIENT|NO-EVICT`, `CLIENT|PAUSE`, `CLIENT|UNBLOCK`, `CLIENT|UNPAUSE`
- `CLUSTER|ADDSLOTS`, `CLUSTER|ADDSLOTSRANGE`, `CLUSTER|BUMPEPOCH`, `CLUSTER|DELSLOTS`, `CLUSTER|DELSLOTSRANGE`, `CLUSTER|FAILOVER`, `CLUSTER|FLUSHSLOTS`, `CLUSTER|FORGET`, `CLUSTER|MEET`, `CLUSTER|REPLICATE`, `CLUSTER|RESET`, `CLUSTER|SAVECONFIG`, `CLUSTER|SET-CONFIG-EPOCH`, `CLUSTER|SETSLOT`
- `CONFIG|GET`, `CONFIG|RESETSTAT`, `CONFIG|REWRITE`, `CONFIG|SET`
- `MODULE|LIST`, `MODULE|LOAD`, `MODULE|LOADEX`, `MODULE|UNLOAD`
- `SLOWLOG|GET`, `SLOWLOG|LEN`, `SLOWLOG|RESET`

## Notes

- Memorystore for Valkey supports all Valkey 7.2 commands except the blocked ones above, which return `NOPERM`. For example, `CONFIG SET` and `SLOWLOG GET` are blocked (the best-practices page nevertheless recommends `SLOWLOG` for finding slow commands).
- `FLUSHALL` and `FLUSHDB` are supported and destructive: they delete data. Try them on a disposable instance first.
- Formatting note: the source lists `PUBSUB` and `SLOWLOG` subcommands with inconsistent spacing around `|`; they are normalized in the grouped lists. The grouping by data type is editorial; the command sets match the source (274 supported in both modes, 15 additional for Cluster Mode Enabled, 61 blocked).
- Memorystore for Valkey on Google Cloud: managed Valkey, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/supported-commands (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-best-practices.md](./general-best-practices.md)
- [troubleshoot-issues.md](./troubleshoot-issues.md)
