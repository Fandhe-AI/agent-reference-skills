# Redis

| Name | Description | Path |
|------|-------------|------|
| TypeScript SDK Overview | HTTP/REST Redis client for TS; installation, initialization, `Redis.fromEnv()` | [ts-sdk-overview.md](./ts-sdk-overview.md) |
| Python SDK Overview | HTTP/REST Redis client for Python; sync and async usage, `Redis.from_env()` | [py-sdk-overview.md](./py-sdk-overview.md) |
| Connection & Authentication | Credentials, environment variables, TLS, token types, multi-client connection strings | [connection-auth.md](./connection-auth.md) |
| REST API | HTTP endpoint format, authentication, pipelining, transactions, response format | [rest-api.md](./rest-api.md) |
| Pipelining & Transactions | Batch commands with `pipeline()` (non-atomic) and `multi()` (atomic) | [pipelining-transactions.md](./pipelining-transactions.md) |
| Python SDK — Pipelining & Transactions | Python-specific pipelining and transaction patterns, method chaining | [py-pipelining.md](./py-pipelining.md) |
| Commands: String | GET, SET, MGET, MSET, INCR, DECR, APPEND, SETEX, SETNX and options | [commands-string.md](./commands-string.md) |
| Commands: Hash | HSET, HGET, HGETALL, HDEL, HMGET, HKEYS, HINCRBY and more | [commands-hash.md](./commands-hash.md) |
| Commands: List | LPUSH, RPUSH, LPOP, RPOP, LRANGE, LLEN, LINDEX, LMOVE and more | [commands-list.md](./commands-list.md) |
| Commands: Set | SADD, SREM, SMEMBERS, SISMEMBER, SUNION, SINTER, SDIFF and more | [commands-set.md](./commands-set.md) |
| Commands: Sorted Set | ZADD, ZRANGE, ZRANK, ZSCORE, ZREM, ZINCRBY, ZPOPMIN/MAX and options | [commands-zset.md](./commands-zset.md) |
| Commands: JSON | JSON.SET, JSON.GET, JSON.DEL, JSON.ARRAPPEND, JSON.NUMINCRBY (JSONPath `$`) | [commands-json.md](./commands-json.md) |
| Commands: Generic | Key expiry, SCAN, DEL, TYPE, Pub/Sub PUBLISH, Lua EVAL, FLUSHDB | [commands-generic.md](./commands-generic.md) |
| Global Replication | Multi-region setup; read routing to nearest replica; zero-downtime region management | [global-replication.md](./global-replication.md) |
| Replication | Single-leader replication within a region; round-robin reads; Prod Pack multi-AZ | [replication.md](./replication.md) |
| Redis Search: Introduction | Full-text search built into Upstash Redis, powered by Tantivy; overview and concepts | [search-introduction.md](./search-introduction.md) |
| Redis Search: Getting Started | Create index, index JSON documents, run queries and counts | [search-getting-started.md](./search-getting-started.md) |
| Redis Search: Query Operators | `$must`, `$should`, `$mustNot`, `$boost`, comparison operators (`$lt`, `$gt`, etc.) | [search-query-operators.md](./search-query-operators.md) |
| Redis Search: Aggregations | Metric (`$avg`, `$sum`, `$count`) and bucket (`$terms`, `$histogram`) aggregations | [search-aggregations.md](./search-aggregations.md) |
| Deployment Environments | Node.js, Cloudflare Workers, Fastly, Deno/edge — platform-specific setup | [deployment.md](./deployment.md) |
| Security | TLS, ACL, IP allowlisting, encryption at rest, VPC Peering, PrivateLink | [security.md](./security.md) |
| Durability | Always-on block storage persistence; memory + EBS dual-layer; no AOF/RDB modes | [durability.md](./durability.md) |
| Eviction | Optimistic-Volatile eviction policy; TTL-priority random key removal for cache use | [eviction.md](./eviction.md) |
| Command Compatibility | 200+ supported commands; Redis protocol up to 8.2; unsupported items roadmap | [compatibility.md](./compatibility.md) |
