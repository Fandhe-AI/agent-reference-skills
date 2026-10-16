# PostgreSQL Backend

BullMQ ships with an optional PostgreSQL backend that runs the exact same `Queue` / `Worker` / `QueueEvents` / `FlowProducer` API on PostgreSQL instead of Redis. You select it by passing the `createPostgresBackend` factory. The Redis backend remains the default and the most battle-tested option. Choose PostgreSQL when you would rather not operate a separate Redis instance, or when you want your jobs to live alongside (and in the same database as) your relational data.

## Signature / Usage

### Requirements

- **PostgreSQL 13 or newer** (14+ recommended). The backend checks the server version on first connect and throws `UnsupportedPostgresVersionError` when the server is older than the minimum. You can bypass the check with `skipVersionCheck: true` (at your own risk).
- The **`pg`** (node-postgres) package installed in your project. It is an optional peer dependency, so Redis-only users never need it. It is loaded lazily, only when you actually use the PostgreSQL backend: run `npm install pg` explicitly.

### Usage

Pass `createPostgresBackend` as the last constructor argument.

```typescript
import { Queue, createPostgresBackend } from 'bullmq';

const queue = new Queue('my-queue', opts, createPostgresBackend);
```

| Class | Constructor |
|---|---|
| `Queue` | `new Queue(name, opts, createPostgresBackend)` |
| `Worker` | `new Worker(name, processor, opts, createPostgresBackend)` |
| `QueueEvents` | `new QueueEvents(name, opts, createPostgresBackend)` |
| `FlowProducer` | `new FlowProducer(opts, createPostgresBackend)` |

TypeScript infers the backend and connection types from the factory (when you don't pass any type arguments).

```typescript
import { Queue, Worker, createPostgresBackend } from 'bullmq';

const opts = {
  connection: 'postgres://user:password@localhost:5432/mydb',
};

const queue = new Queue('my-queue', opts, createPostgresBackend);

const worker = new Worker(
  'my-queue',
  async job => {
    // ... process the job exactly as you would with the Redis backend
  },
  opts,
  createPostgresBackend,
);
```

### Typed jobs and event results (v6.3.9+)

The backend and connection type parameters come after the job type parameters. TypeScript infers them from the factory only when you don't pass any type arguments. Once you write `Queue<MyData, MyResult>`, the remaining parameters use their Redis defaults, so the PostgreSQL factory and connection are rejected:

```typescript
// Error: the backend defaults to RedisQueueBackend
new Queue<MyData, MyResult>('my-queue', opts, createPostgresBackend);
```

To keep job types, list every type argument explicitly. Each class puts the backend at a different position:

```typescript
import {
  JobProgress,
  Queue,
  QueueEvents,
  Worker,
  createPostgresBackend,
  PostgresConnectionOptions,
  PostgresQueueBackend,
} from 'bullmq';

const queue = new Queue<
  MyData,
  MyResult,
  string,
  MyData,
  MyResult,
  string,
  PostgresQueueBackend,
  PostgresConnectionOptions
>('my-queue', opts, createPostgresBackend);

const worker = new Worker<
  MyData,
  MyResult,
  string,
  PostgresQueueBackend,
  JobProgress,
  PostgresConnectionOptions
>('my-queue', async job => job.data.value * 2, opts, createPostgresBackend);

const events = new QueueEvents<
  MyResult,
  PostgresQueueBackend,
  PostgresConnectionOptions
>('my-queue', opts, createPostgresBackend);
```

`withBackend` does the same thing more concisely. It returns `Queue`, `Worker`, `QueueEvents`, `QueueEventsProducer`, and `FlowProducer` constructors with the backend and connection types already set, which use the factory automatically. You only write the job type arguments:

```typescript
import { createPostgresBackend, withBackend } from 'bullmq';

const { Queue, Worker, QueueEvents } = withBackend(createPostgresBackend);

const queue = new Queue<MyData, MyResult>('my-queue', opts);
const worker = new Worker<MyData, MyResult>(
  'my-queue',
  async job => job.data.value * 2,
  opts,
);
const events = new QueueEvents<MyResult>('my-queue', opts);
```

The returned classes extend the regular ones, so `instanceof Queue` still holds. Connection options are required. `withBackend` does not change the process-wide default backend.

### Using it everywhere by default

If your whole application uses PostgreSQL, register it once as the process-wide default backend and drop the per-instance argument.

```javascript
import { setDefaultBackendFactory, createPostgresBackend, Queue } from 'bullmq';

setDefaultBackendFactory(createPostgresBackend);

// Every class now defaults to the PostgreSQL backend:
const queue = new Queue('my-queue', {
  connection: 'postgres://user:password@localhost:5432/mydb',
});
```

This JavaScript example changes runtime behavior only. TypeScript cannot infer types from a process-wide setting: use `withBackend(createPostgresBackend)` or pass `createPostgresBackend` to each constructor to infer PostgreSQL connection types.

## Connection Options

The `connection` option is forwarded to node-postgres and may be any of:

| Form | Type | Description |
|------|------|-------------|
| Connection string | `string` | `postgres://user:pass@host:5432/db` |
| Pool config object | object | Any `pg.PoolConfig` field (`host` / `port` / `user` / `password` / `database` / `max` for pool size), optionally carrying the BullMQ-specific `schema` / `skipVersionCheck` |
| Existing pool | `pg.Pool` | An already-constructed `pg.Pool` |

```typescript
// 1. A connection string
{ connection: 'postgres://user:pass@localhost:5432/mydb' }

// 2. A node-postgres pool config
{
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'mydb',
    max: 10,           // pool size
    schema: 'bullmq',  // custom schema
  }
}

// 3. An already-constructed pg.Pool
import { Pool } from 'pg';
const pool = new Pool({ connectionString: 'postgres://…' });
({ connection: pool });
```

When BullMQ builds the pool for you (from a string or config), it owns and closes that pool on `close()`. When you pass your own `pg.Pool`, BullMQ uses it as-is and does not close it; its lifecycle is yours.

## Schema

All BullMQ objects live in a single PostgreSQL schema (namespace), which defaults to `bullmq`. This keeps BullMQ's tables cleanly separated from the rest of your database.

```typescript
{
  connection: {
    connectionString: 'postgres://...',
    schema: 'jobs',
  }
}
```

## Migrations

Connections do not apply migrations automatically. Initialize or upgrade the schema explicitly from one deployment step:

```typescript
import { Pool } from 'pg';
import { runMigrations } from 'bullmq';

const pool = new Pool({
  connectionString: 'postgres://localhost:5432/mydb',
});
const client = await pool.connect();
try {
  await runMigrations(client);
} finally {
  client.release();
  await pool.end();
}
```

- **Idempotent**: running it again is a no-op.
- **Concurrency-safe**: a transaction-scoped advisory lock (namespaced per schema) serializes concurrent starters, so many workers or instances booting at once still migrate exactly once.

Schema compatibility is scoped to BullMQ major versions. The migration ledger records the minimum client major required by the schema. The initial migration split is a same-major exception; future schema migrations are breaking changes and require a new BullMQ major version. A client older than the recorded major fails with `SchemaVersionMismatchError`. Schema downgrades are not supported.

## How it works

The PostgreSQL backend maps BullMQ's primitives onto PostgreSQL features:

- Jobs and their state live in regular tables inside the schema. State transitions run as SQL functions within transactions, giving the same atomicity guarantees the Lua scripts provide on Redis.
- The blocking wait-for-job primitive (the Redis `BZPOPMIN`) is implemented with `LISTEN` / `NOTIFY`: producers `NOTIFY` a channel and each worker blocks on a dedicated `LISTEN` connection until it is woken (or a timeout elapses).
- Each backend uses a `pg.Pool` for regular, short-lived queries plus one dedicated, long-lived `LISTEN` connection.
- The `pg.Pool` size (`max`) bounds how many concurrent queries a single backend can run; the dedicated `LISTEN` connection is separate and does not consume a pool slot. Size your server's `max_connections` for the number of concurrent workers, queues and queue-events you run.

## Performance Characteristics

- Per-operation latency is comparable to Redis when the database is on a low-latency network (same host / same datacenter).
- Job-processing throughput is usually lower than Redis (often around ~1.5–2× fewer jobs/s on similar setups), but this is workload-dependent. PostgreSQL performs durable transactional writes by default (WAL + MVCC + `fsync`).
- Bulk enqueues (`addBulk`, flows) come much closer to Redis, because many jobs are inserted per transaction.

The actual numbers depend heavily on your hardware, your PostgreSQL configuration and where the database lives relative to your workers, so benchmark with your own workload before committing to capacity figures.

### Indicative numbers

The figures below are a rough illustration measured on an Apple Silicon laptop (M-series, ~12 cores) with PostgreSQL running locally, trivial no-op jobs and default (durable) settings. They exist only to give an order of magnitude; real workloads with meaningful payloads and processors will differ, and the Redis column is the same machine for context, not a formal benchmark.

| Operation | PostgreSQL | Redis (same machine) |
| --- | --- | --- |
| `add()`, one at a time | ~7,000 jobs/s | ~7,500 jobs/s |
| `add()`, concurrently (`Promise.all`) | ~15,000 jobs/s | ~38,000 jobs/s |
| `addBulk()`, batched + concurrent | ~45,000 jobs/s | ~52,000 jobs/s |
| Processing, 1 worker (concurrency 1) | ~2,300 jobs/s | ~6,000 jobs/s |
| Processing, concurrency 8–32 | ~11,000 jobs/s | ~18,000 jobs/s |

- Sequential `add()` and batched `addBulk()` are close to Redis; the durable write is amortized (per round-trip, or across the batch).
- Concurrent throughput (many parallel adds, or high-concurrency processing) is where Redis's in-memory model pulls ahead, leaving PostgreSQL in the ~1.5–2× range for processing.

## Optimization Tips

- Keep the database close: co-locate PostgreSQL and workers (same host / AZ) to minimize round-trip latency.
- Size the pool (`max`) and the server's `max_connections` for your concurrency, covering all workers, queues and queue-events plus their dedicated `LISTEN` connections.
- Consider `synchronous_commit = off` (or `local`) if your durability requirements allow it; it removes the per-commit `fsync` wait and can improve processing throughput, at the cost of possibly losing the most recent commits on a crash.
- Use `removeOnComplete` / `removeOnFail` so finished jobs don't accumulate; large tables mean more index maintenance and vacuum work.

## Notes

- Figures in "Indicative numbers" come from the official BullMQ v6.3.15 docs ([docs/gitbook/guide/postgresql.md @ v6.3.15](https://github.com/taskforcesh/bullmq/blob/v6.3.15/docs/gitbook/guide/postgresql.md)).
- Migration (v6.0 → v6.1): automatic migrations on first connect were removed; call `runMigrations` explicitly from a deployment step (see Migrations)
- The backend implements the full datastore-agnostic API (queues, workers, flows, job schedulers, rate limiting, prioritization, delayed jobs, deduplication, metrics and events), so application code is identical across backends. Redis-specific concerns (Redis Cluster, `maxmemory-policy`, etc.) don't apply; the relevant knob on PostgreSQL is `max_connections`.
- `getBackend()` always returns the currently configured backend. Redis-only escape hatches (raw Redis `client`, `redisVersion`, and similar) exist only when the backend is Redis.
- The `schema` option is only honored when BullMQ builds the pool for you. When you pass an already-constructed `pg.Pool`, configure your pool's `search_path` yourself so it includes BullMQ's schema (`bullmq` by default, or your custom schema); otherwise unqualified BullMQ queries will not resolve to BullMQ's tables.
- Prefer the default schema and use a dedicated database for BullMQ when possible; custom schemas are supported but add operational complexity.
- For breaking changes when implementing your own `IQueueBackend`, see [Migrate from v5 to v6](../migrations/migrate-from-v5-to-v6.md)

## Related

- [Connections](../connections.md)
- [Migrate from v5 to v6](../migrations/migrate-from-v5-to-v6.md)
- [Architecture](../architecture.md)
- [PostgreSQL (official, v6.3.15)](https://docs.bullmq.io/guide/postgresql)
