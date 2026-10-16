# Going to Production

Crucial considerations and tips for a robust deployment of a BullMQ-based application to production.

## Signature / Usage

### Persistence

Since BullMQ is based on Redis, persistence needs to be configured manually. Many hosting solutions do not offer persistence by default. Enabling AOF (Append Only File) is recommended; usually 1 second per write is enough for most applications. Persistence affects performance, so benchmark it.

```
# redis.conf
appendonly yes
appendfsync everysec
```

### Max memory policy

BullMQ cannot work properly if Redis evicts keys arbitrarily. Configure `maxmemory-policy` to `noeviction`; this is the only setting that guarantees correct behavior of the queues.

```
# redis.conf
maxmemory-policy noeviction
```

### Automatic reconnections

A connection between BullMQ and Redis cannot be guaranteed to stay online; it must recover as fast as possible without human intervention. By default BullMQ uses ioredis, where the most relevant options are `retryStrategy`, `maxRetriesPerRequest` and `enableOfflineQueue`. Operations on the `Queue` class should fail quickly on a temporal disconnection, whereas `Worker`s should wait indefinitely without raising any exception.

`retryStrategy` determines the retry function; retries continue forever until reconnection. For ioredis connections created inside BullMQ the strategy is exponential backoff with a minimum of 1 second and a maximum of 20 seconds, and can be overridden by passing custom ioredis options:

```ts
retryStrategy: function (times: number) {
  return Math.max(Math.min(Math.exp(times), 20000), 1000);
}
```

`maxRetriesPerRequest` limits how many times a failed request is retried. For `Worker`s using ioredis it must be `null`. It defaults to `null` when instantiating a `Worker`, but can be overridden by passing an existing ioredis instance or a different value; in both cases BullMQ outputs a warning that should be addressed.

`enableOfflineQueue`: ioredis has a small offline queue for commands issued while disconnected. Disable it for `Queue` instances so calls fail quickly; leave it enabled for `Worker`s so they wait until reconnection.

#### node-redis or Bun adapters in production

With `createNodeRedisClient` or `createBunRedisClient` the same principle applies: producers fail quickly when Redis is unavailable, consumers keep retrying. For node-redis, configure reconnect and request behavior on the raw client (for example `socket.reconnectStrategy`, connect timeout, command timeout). BullMQ's Bun adapter includes automatic reconnect handling with exponential backoff for unexpected disconnects. Test these scenarios before production: Redis unavailable at service startup, transient network disconnect while workers process jobs, graceful shutdown while workers have active jobs.

### Log errors

Attach an `error` handler to help debug connection issues and prevent "unhandled errors".

```typescript
worker.on('error', err => {
  // Log your error.
});

queue.on('error', err => {
  // Log your error.
});
```

### Monitoring and alerts

In production you will want to know when jobs start failing, when workers stop, or when jobs pile up faster than workers can process them. Build this with queue and worker events, built-in metrics, Prometheus or OpenTelemetry, or use a dashboard with built-in monitors and alerts. The guide "How to monitor and manage BullMQ queues" (https://bullmq.io/articles/guides/monitoring-bullmq-queues/) compares the options.

### Gracefully shut down workers

Close workers properly on server restart to minimize stalled jobs. If a worker is killed without waiting for its jobs, they are marked stalled and processed automatically when new workers come online (about 30 seconds by default). Listen for both `SIGINT` (Ctrl+C) and `SIGTERM` (sent by system daemons, orchestrators like Kubernetes, or process managers like PM2).

```typescript
const gracefulShutdown = async signal => {
  console.log(`Received ${signal}, closing server...`);
  await worker.close();
  // Other asynchronous closings
  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
```

### Auto-job removal

By default all completed or failed jobs are kept forever. Configure a maximum number of jobs to keep (see Auto removal of jobs):

```typescript
const queue = new Queue('myQueue', {
  defaultJobOptions: {
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 5000 },
  },
});
```

### Unhandled exceptions and rejections

Node.js breaks on unhandled exceptions by default. Handle them gracefully somewhere in your service:

```typescript
process.on('uncaughtException', function (err) {
  // Handle the error safely
  logger.error(err, 'Uncaught exception');
});

process.on('unhandledRejection', (reason, promise) => {
  // Handle the error safely
  logger.error({ promise, reason }, 'Unhandled Rejection at: Promise');
});
```

## Options / Props

| Option | Recommended for Queue | Recommended for Worker | Description |
|--------|-----------------------|------------------------|-------------|
| `retryStrategy` | custom | custom | Function computing the retry interval |
| `maxRetriesPerRequest` | default | `null` | Max retries per failed request |
| `enableOfflineQueue` | `false` | `true` (default) | Whether commands are queued while offline |

## Notes

- Persistence has some effect on performance; run benchmarks to be sure it is acceptable.
- Setting `maxRetriesPerRequest` to anything other than `null` on a Worker can let Redis command exceptions break the worker.
- Graceful shutdown does not guarantee jobs are never stalled, as a job may take longer than the grace period for the server to restart.
- The job `data` field is stored in clear text. Avoid storing sensitive data in the job; if unavoidable, encrypt the sensitive part before adding it to the queue.

## Related

- [Architecture](./architecture.md)
- [Troubleshooting](./troubleshooting.md)
- [Rate limiting](./rate-limiting.md)
- [Redis compatibility](./redis-compatibility/redis-compatibility.md)
- [AWS MemoryDB](./redis-hosting/aws-memorydb.md)
