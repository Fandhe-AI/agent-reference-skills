# BullMQ — Relay: Backends (Redis and PostgreSQL)

Relay の Redis / PostgreSQL バックエンド（キー構造・テーブル・Redis Cluster・クリーンアップ・接続）とカスタムバックエンド（`IRelayBackend`）。

## Signature / Usage

Redis (default):

```typescript
import { Relay } from 'bullmq';

const relay = new Relay({
  connection: { host: 'redis.internal', port: 6379 },
  prefix: 'bull', // default
  namespace: 'default', // default
});
```

Redis Cluster:

```typescript
const relay = new Relay({ connection: cluster, namespace: 'orders' });
```

PostgreSQL:

```typescript
import { Relay, createPostgresRelayBackend } from 'bullmq';

const relay = new Relay({
  connection: {
    connectionString: process.env.DATABASE_URL,
    schema: 'bullmq', // default
  },
  backend: createPostgresRelayBackend,
});
```

Custom backend:

```typescript
const relay = new Relay({
  connection,
  backend: options => new MyBackend(options),
});
```

## Options / Props

Redis keys (`…` is `{prefix}::relay:{<namespace>}`):

| Key | Type | Content |
| --- | --- | --- |
| `…:layout` | Hash | Data layout version |
| `…:nodes` | Sorted set | Node ids, scored by lease deadline (ms since epoch) |
| `…:started` | Sorted set | Node ids, scored by registration time |
| `…:{nodeId}:node` | Hash | A node's info, last heartbeat, backlog and dropped messages (its lease) |
| `…:{nodeId}:inbox` | Stream | A node's inbox |
| `…:subs` | Sorted set | Subscription index: by node, by pattern, subscribed patterns and wildcards |
| `…:cleanup` | Sorted set | Removed nodes whose subscriptions are still being pruned |
| `…:retained` | Sorted set | Topics with a retained message, scored by expiry |
| `…:{topic}:ret` | Hash | A topic's retained message |
| `…:mid` | String | Message id counter, started at the server time in microseconds |
| `{prefix}::relay:namespaces` | Sorted set | Namespaces in use, scored by how long (for dashboards) |

PostgreSQL tables:

| Table | Content |
| --- | --- |
| `relay_node` | Registered nodes, their lease, info and stats |
| `relay_subscription` | Subscriptions (removed with their node) |
| `relay_inbox` | Undelivered messages (removed with their node) |
| `relay_retained` | Retained messages |

## Notes

- All the logic is implemented inside the datastore (Lua scripts on Redis, SQL functions on PostgreSQL) behind the `IRelayBackend` interface; both backends behave identically (the same test suite runs against each).
- Redis: works with ioredis, node-redis, Bun's Redis client and Valkey GLIDE, with Redis 6.2+ and compatible servers (Valkey, Dragonfly). Queues still run on Redis 5.0; only the relay needs 6.2 and checks it at startup. An existing client instance can be passed as `connection`: the relay duplicates it for blocking inbox reads and leaves it open on close.
- Redis inboxes are streams read with `XREAD BLOCK`; consumed entries are removed on every heartbeat and each inbox keeps at most `inboxMaxLength` unread entries. The empty segment after the prefix keeps relay keys out of queue keys (`{prefix}:{queue name}:…`), and relay keys end with a fixed word no queue key uses.
- Every Redis key expires on its own; when the last node closes only retained messages (and the message id counter) remain until they expire. Nodes refuse to join a namespace with an incompatible data layout (`RelayErrorCode.IncompatibleLayout`), so rolling upgrades never mix layouts silently.
- Redis Cluster: the namespace is a hash tag in the key names, so all keys of a namespace are in one hash slot; no configuration is needed. All traffic of a namespace goes to one shard, so the namespace is the unit of scale. If the prefix has a hash tag of its own it takes precedence and every namespace shares the prefix's slot.
- PostgreSQL: `connection` takes the same options as the queue PostgreSQL backend (connection string, `pg` pool configuration or an existing `pg.Pool`). The `0004_relay` migration only adds `relay_*` objects, so it is compatible with instances still running an older BullMQ 6 release.
- PostgreSQL cleanup: rows do not expire by themselves; every sweep removes expired nodes and expired retained messages of every namespace. Publishers send `NOTIFY` to wake nodes; a node that misses one still reads its inbox after `blockTimeout` (default 5 seconds). Each node uses the pool plus one dedicated `LISTEN` connection (account for it in `max_connections`; an existing `pg.Pool` needs `max >= 2`).
- PostgreSQL throughput: every listening node receives every `NOTIFY` of the namespace (it reads its inbox only when the notification is for it). This fits typical deployments; for very large fleets with heavy traffic the official docs recommend Redis.
- A custom backend implements `IRelayBackend` (register a node, renew its lease, sweep, subscribe, remove a subscription, publish, read the inbox; each atomic, plus the read-only getters). The official suite `tests/relay.test.ts` (harness `tests/utils/relay.ts`) is the recommended check.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/backends.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/backends

## Related

- [getting-started.md](./getting-started.md)
- [nodes-and-failures.md](./nodes-and-failures.md)
- [../postgresql-backend/postgresql-backend.md](../postgresql-backend/postgresql-backend.md)
- [../redis-compatibility/redis-compatibility.md](../redis-compatibility/redis-compatibility.md)
