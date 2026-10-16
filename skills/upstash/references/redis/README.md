# Redis

| Name | Description | Path |
|------|-------------|------|
| Commands: Array (AR*) | Commands for a sparse, index-addressed array of string values under unsigned integer indexes (`0` to `18446744073709551614`), with an append cursor and fixed-size ring support. | [commands-array.md](./commands-array.md) |
| Commands: Functions (FCALL / FUNCTION *) | Commands for loading Lua function libraries once and invoking the registered functions by name, atomically on the server. | [commands-functions.md](./commands-functions.md) |
| Generic Commands | Key management, expiry, scanning, and pub/sub commands that apply across all Redis data types. | [commands-generic.md](./commands-generic.md) |
| Hash Commands | Redis hash operations for storing and retrieving field-value maps within a single key. | [commands-hash.md](./commands-hash.md) |
| JSON Commands | Redis JSON commands for storing and manipulating JSON documents within Redis keys. Uses JSONPath (`$`) syntax for nested access. | [commands-json.md](./commands-json.md) |
| List Commands | Redis list operations for ordered collections with head/tail push and pop. | [commands-list.md](./commands-list.md) |
| Set Commands | Redis set operations for unordered collections of unique members. | [commands-set.md](./commands-set.md) |
| String Commands | Core Redis string operations for key-value storage, atomic counters, and bulk get/set. | [commands-string.md](./commands-string.md) |
| Commands: Vector (VECTOR.* / redis.vector) | Upstash Redis extension commands for storing embeddings and running approximate nearest-neighbour search inside Redis. | [commands-vector.md](./commands-vector.md) |
| Sorted Set Commands | Redis sorted set operations for ordered collections where each member has a numeric score. | [commands-zset.md](./commands-zset.md) |
| Command Compatibility | Upstash Redis supports the Redis client protocol up to version 8.4 and gradually adds changes introduced in later versions. Over 200 commands are implemented across all major data types. | [compatibility.md](./compatibility.md) |
| Connection & Authentication | How to obtain credentials and connect to an Upstash Redis database from various clients and environments. | [connection-auth.md](./connection-auth.md) |
| Deployment Environments | Platform-specific configuration for `@upstash/redis` across Node.js, Cloudflare Workers, Fastly, and Deno/edge runtimes. | [deployment.md](./deployment.md) |
| Durability | Upstash Redis uses always-on persistence backed by cloud block storage (AWS EBS). Data is written to both memory and block storage on every write. | [durability.md](./durability.md) |
| Eviction | Upstash Redis supports an optional eviction policy that automatically removes keys when the database reaches its size limit. | [eviction.md](./eviction.md) |
| Global Replication | Multi-region Upstash Redis that automatically replicates data across selected AWS regions. Read commands are routed to the nearest replica; writes go to the primary region. | [global-replication.md](./global-replication.md) |
| Pipelining & Transactions | Batch multiple Redis commands into a single HTTP request to reduce network roundtrips. Pipelining is non-atomic; transactions (`multi()`) are atomic. | [pipelining-transactions.md](./pipelining-transactions.md) |
| Python SDK — Pipelining & Transactions | Batch multiple Redis commands into a single HTTP request using the Python SDK. Pipelines are non-atomic; transactions are atomic. | [py-pipelining.md](./py-pipelining.md) |
| upstash-redis — Python SDK Overview | Connectionless, HTTP-based Redis client for Python, designed for serverless and serverful environments. Requires Python 3.8+. Supports both synchronous and asynchronous operation. | [py-sdk-overview.md](./py-sdk-overview.md) |
| Replication | Upstash Redis automatically replicates data across multiple instances within a region for high availability and read scalability. Available on all paid plans. | [replication.md](./replication.md) |
| REST API | HTTP-based interface for Upstash Redis. Translates Redis commands into REST endpoints. Useful for edge runtimes, browsers, and any environment that supports HTTP but not TCP. | [rest-api.md](./rest-api.md) |
| Redis Search — node-redis / ioredis Adapters | Use Redis Search with an existing node-redis or ioredis client via the `@upstash/search-redis` and `@upstash/search-ioredis` adapter packages, without switching to `@upstash/redis`. | [search-adapters.md](./search-adapters.md) |
| Redis Search — Aggregations | Compute analytics metrics and bucket groupings over indexed documents. Aggregations run in two phases: optional filtering, then computation. | [search-aggregations.md](./search-aggregations.md) |
| Redis Search — Getting Started | Step-by-step guide to creating a search index, indexing documents, and running queries with Upstash Redis Search. | [search-getting-started.md](./search-getting-started.md) |
| Redis Search — Index Management | Create, describe, list, and drop indexes; manage aliases; count matches; wait for indexing; and how document writes keep the index in sync. | [search-index-management.md](./search-index-management.md) |
| Redis Search — Introduction | Full-text search built into Upstash Redis, powered by Tantivy (Rust-based). Enables searching through Redis data without a separate search service. | [search-introduction.md](./search-introduction.md) |
| Redis Search — Query Operators | Boolean and comparison operators for filtering documents in Upstash Redis Search queries. | [search-query-operators.md](./search-query-operators.md) |
| Redis Search — Querying | Queries are JSON filters run with `SEARCH.QUERY` / `index.query()`. Covers response format, smart matching, multi-value fields, pagination, sorting, output control, score functions, and highlighting. | [search-querying.md](./search-querying.md) |
| Redis Search — Schema Definition | Every search index requires a schema describing the structure of searchable documents. The `s` schema builder from `@upstash/redis` defines field types and options. | [search-schema-definition.md](./search-schema-definition.md) |
| Redis Search — Searchable Streams | Index and search individual Redis stream entries: each entry becomes a separate search document whose ID is the stream entry ID. | [search-streams.md](./search-streams.md) |
| Security | Upstash Redis security features: TLS encryption, ACL, IP allowlisting, encryption at rest, and private connectivity options. | [security.md](./security.md) |
| @upstash/redis — TypeScript SDK Overview | HTTP/REST-based Redis client for TypeScript, built on the Upstash REST API. Connectionless by design — ideal for serverless, edge, and WebAssembly environments where TCP is unavailable. | [ts-sdk-overview.md](./ts-sdk-overview.md) |
</content>
