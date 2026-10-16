# Connections

A connection to a Redis instance is required to work with a Queue. By default BullMQ creates connections with ioredis, and the options you pass to BullMQ are passed to the ioredis constructor. If you provide no options, it defaults to `localhost` and port 6379.

BullMQ can also use other Redis clients through its Redis client adapter interface. The package includes adapters for ioredis, node-redis, and Bun's built-in Redis client. You can provide your own adapter by implementing the `IRedisClient` interface.

Every class consumes at least one Redis connection, but connections can be reused in some situations. Classes that need blocking Redis commands, such as `Worker` and `QueueEvents`, create duplicated connections internally, so the client or adapter must support `duplicate()`.

## Signature / Usage

```typescript
import { Queue, Worker } from 'bullmq';

// Create a new connection in every instance
const myQueue = new Queue('myqueue', {
  connection: {
    host: 'myredis.taskforce.run',
    port: 32856,
  },
});

const myWorker = new Worker('myqueue', async job => {}, {
  connection: {
    host: 'myredis.taskforce.run',
    port: 32856,
  },
});
```

### Reusing an ioredis connection

```typescript
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

// Reuse the ioredis instance in 2 different producers
const producerConnection = new IORedis();
const myFirstQueue = new Queue('myFirstQueue', { connection: producerConnection });
const mySecondQueue = new Queue('mySecondQueue', { connection: producerConnection });

// Reuse the ioredis instance in 2 different consumers (maxRetriesPerRequest: null is required)
const workerConnection = new IORedis({ maxRetriesPerRequest: null });
const myFirstWorker = new Worker('myFirstWorker', async job => {}, {
  connection: workerConnection,
});
const mySecondWorker = new Worker('mySecondWorker', async job => {}, {
  connection: workerConnection,
});
```

Even when the ioredis instance is reused, a worker creates the duplicated connection it needs internally for blocking commands.

For backwards compatibility BullMQ still accepts a raw `IORedis` instance via the `connection` option. Internally the instance is wrapped in a transparent proxy that exposes `IRedisClient`: it adds `runCommand` for Lua script dispatch and structured-options forms of `hset`, `set`, `zrange`, `zrevrange`, `xadd`, `xread`, `xtrim`, and `scan` (the native ioredis varargs forms keep working). `pipeline()` and `multi()` return augmented transactions, and `duplicate()` returns another wrapped proxy. Every other property is forwarded to your underlying instance, which is never mutated.

### Using node-redis

BullMQ does not create node-redis clients directly. Create the raw client in your application and wrap it with `createNodeRedisClient` before passing it to BullMQ. Install `redis` v5 or newer; BullMQ declares `redis >= 5.0.0` as a peer dependency for this adapter.

```typescript
import { Queue, Worker, createNodeRedisClient } from 'bullmq';
import { createClient } from 'redis';

const rawClient = createClient({
  url: 'redis://localhost:6379',
});

const connection = createNodeRedisClient(rawClient);

const myQueue = new Queue('myqueue', { connection });
const myWorker = new Worker('myqueue', async job => {}, { connection });
```

### Using Bun's Redis client

Bun has a built-in Redis client. Wrap it with `createBunRedisClient` before passing it to BullMQ. BullMQ does not instantiate Bun's client for you. The `RedisClient` class is provided by the Bun runtime; run this code with `bun run ...`, not plain Node.js.

```typescript
import { RedisClient } from 'bun';
import { Queue, Worker, createBunRedisClient } from 'bullmq';

const rawClient = new RedisClient('redis://localhost:6379');
const connection = createBunRedisClient(rawClient);

const myQueue = new Queue('myqueue', { connection });
const myWorker = new Worker('myqueue', async job => {}, { connection });
```

When you share a single wrapped connection across many Queues and Workers, close it through the wrapper returned by `createBunRedisClient` (for example `connection.disconnect()` or `await connection.quit()`) once every Queue/Worker has been closed. Do not call `close()` on the raw Bun `RedisClient` directly: the wrapper cannot flag that shutdown as intentional, so in-flight commands reject with `ConnectionClosedError` and the wrapper attempts to reconnect.

```typescript
// Graceful shutdown
await myWorker.close();
await myQueue.close();
connection.disconnect(); // or: await connection.quit();
```

### Using Valkey Glide

Valkey Glide has a different API than ioredis/node-redis. Wrap the Glide client with `createValkeyGlideClient` before passing it to BullMQ.

```typescript
import { GlideClusterClient } from '@valkey/valkey-glide';
import { Queue, Worker, createValkeyGlideClient } from 'bullmq';

const rawClient = await GlideClusterClient.createClient({
  addresses: [{ host: 'localhost', port: 6379 }],
});

const connection = createValkeyGlideClient(rawClient);

const myQueue = new Queue('myqueue', { connection });
const myWorker = new Worker('myqueue', async job => {}, { connection });
```

### Creating clients globally

To have BullMQ create a non-ioredis client whenever it needs a new Redis connection, set `RedisConnection.clientFactory` during application startup. The factory receives the merged connection options and must return an `IRedisClient`.

```typescript
import { Queue, RedisConnection, createNodeRedisClient } from 'bullmq';
import { createClient } from 'redis';

RedisConnection.clientFactory = opts => {
  const rawClient = createClient({
    socket: {
      host: opts.host,
      port: opts.port,
    },
    username: opts.username,
    password: opts.password,
    database: opts.db,
  });

  return createNodeRedisClient(rawClient);
};

const myQueue = new Queue('myqueue', {
  connection: {
    host: 'myredis.taskforce.run',
    port: 32856,
  },
});
```

The same works with Bun's Redis client:

```typescript
import { RedisClient } from 'bun';
import { Queue, RedisConnection, createBunRedisClient } from 'bullmq';

RedisConnection.clientFactory = opts => {
  const host = opts?.host ?? 'localhost';
  const port = opts?.port ?? 6379;
  const rawClient = new RedisClient(`redis://${host}:${port}`);

  return createBunRedisClient(rawClient);
};
```

### Custom Redis clients

Any Redis client can be used if it is adapted to BullMQ's `IRedisClient` interface. The adapter is responsible for exposing the Redis commands BullMQ uses, connection lifecycle methods, events, `duplicate()`, Lua script registration through `defineCommand()`, and pipelines or transactions through `multi()` and `pipeline()`. For most applications, prefer a built-in adapter:

- `createIORedisClient` for ioredis `Redis` and `Cluster` instances.
- `createNodeRedisClient` for node-redis clients.
- `createBunRedisClient` for Bun's built-in Redis client.
- `createValkeyGlideClient` for Valkey Glide clients.

When using another Redis client through an adapter, configure that client's retry and reconnect behavior according to its own documentation so that worker connections can keep retrying.

### The queue backend

While the `IRedisClient` adapter abstracts the low-level driver (ioredis, node-redis, Bun), the high-level classes (`Queue`, `Worker`, `FlowProducer`, `QueueEvents`, ...) are datastore-agnostic and talk to a backend that implements the `IQueueBackend` contract. The backend owns the connection(s) and implements every queue operation ("add job", "move to active", "extend lock", the blocking "wait for next job", ...). The default is the Redis backend (`RedisQueueBackend`), so you normally never interact with this layer directly.

#### Accessing the current backend

The high-level classes no longer expose a `client` getter. `getBackend()` returns the actual backend in use (Redis, PostgreSQL, or a custom backend). With the default Redis backend you can still reach the raw Redis client:

```typescript
import { Queue, RedisClient } from 'bullmq';

const queue = new Queue('myqueue', {
  connection: { host: 'localhost', port: 6379 },
});

// By default BullMQ uses the Redis backend, so getBackend() exposes
// Redis-specific escape hatches.
const client: RedisClient = await queue.getBackend().client;

await client.set('some-key', 'some-value');
```

The Redis backend also exposes `redisVersion`, `databaseType` and the underlying `connection`. For a `Worker`, `getBackend().blockingClient` returns the dedicated blocking connection's client used by the blocking wait-for-job primitive.

#### Providing a custom backend (v6.3.9+)

All high-level classes depend only on the `IQueueBackend` interface and receive a backend factory that builds it. The default factory is `createRedisBackend`; inject your own as the last constructor argument to back BullMQ with a different datastore or a mock in tests. When passing a backend factory, supply an options object with a `connection` accepted by that factory. Options can only be omitted for the default Redis backend, without an explicit factory or custom backend/connection type arguments.

```typescript
import { Queue, BackendFactory } from 'bullmq';

const myBackendFactory: BackendFactory = (name, opts, options) => {
  // return an object implementing IQueueBackend
};

const queue = new Queue('myqueue', { connection: {} }, myBackendFactory);
```

The classes are generic over the backend type, so `getBackend()` returns the concrete type produced by the factory you provide (the default being `RedisQueueBackend`). Give a custom factory the type `BackendFactory<MyBackend, MyConnectionOptions>` so its connection options are checked too.

To specify job types with a custom backend, either list every type argument (the backend and connection types come after the job types) or bind the backend with `withBackend` and write only the job types:

```typescript
import { withBackend } from 'bullmq';
import { createMyBackend } from './my-backend';

const { Queue, Worker } = withBackend(createMyBackend);
const queue = new Queue<MyData, MyResult>('myqueue', opts);
const worker = new Worker<MyData, MyResult>('myqueue', processor, opts);
```

The returned constructors extend the regular classes and use `createMyBackend` automatically. See "Typed jobs and event results" in the PostgreSQL backend page for why this is needed and for the explicit type-argument form.

#### Built-in PostgreSQL backend

BullMQ ships with a ready-made PostgreSQL backend (`createPostgresBackend`) that runs the full `Queue` / `Worker` / `QueueEvents` / `FlowProducer` API on PostgreSQL instead of Redis. See the PostgreSQL backend page for requirements, connection options, schema and migrations.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `host` | `string` | Redis hostname (default: `localhost`) |
| `port` | `number` | Redis port (default: `6379`) |
| `password` | `string` | Redis authentication password |
| `db` | `number` | Redis database number |
| `maxRetriesPerRequest` | `number \| null` | How many times ioredis retries a failing command before throwing. Must be `null` for Workers |

## Notes

- `maxRetriesPerRequest`: tells ioredis how many times to retry a failed command before throwing. With `null`, commands are retried until Redis is reachable again, so workers keep processing as long as a working connection exists. If you create an ioredis client manually, BullMQ throws if this is not `null` when it is passed to a Worker.
- Producer vs consumer: a plain `Queue` used for adding jobs, pausing, getters etc. usually has different requirements than a Worker. For a producer behind an HTTP endpoint, leave `maxRetriesPerRequest` at its default (currently 20) or set it low (for example 1) so the caller gets an error quickly. Inside a Worker processor, adding jobs happens in the background, so the same connection can be shared.
- Do not use ioredis's `keyPrefix` option: it is not compatible with BullMQ, which provides its own key prefixing through the `prefix` option.
- Redis must have `maxmemory-policy=noeviction`, otherwise automatic key removal causes unexpected errors in BullMQ.
- Redis connections have low overhead; unless your service provider imposes hard limits, you do not need to worry about reusing connections.
- v6: `ioredis` is no longer a direct dependency of BullMQ but an optional peer dependency (as are `redis`, `pg`, `bullmq-otel`); install `ioredis` explicitly when using Redis.
- Anything reached through `getBackend()` is outside the datastore-agnostic contract and may differ between backends; prefer the high-level `Queue` / `Worker` / `FlowProducer` API.
- Building a production-grade custom backend is substantial work: implement the full `IQueueBackend` contract with correct atomicity, locking, timing and event semantics, and validate with the adapter-conformance and full BullMQ test suites.

## Related

- [PostgreSQL Backend](./postgresql-backend/postgresql-backend.md)
- [Architecture](./architecture.md)
- [Going to production](./going-to-production.md)
