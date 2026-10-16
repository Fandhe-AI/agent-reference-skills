# Architecture

An overview of how BullMQ is implemented on top of Redis. From the moment a producer calls `add` on a `Queue` instance, a job enters a lifecycle where it is in different states until its completion or failure (technically a failed job can be retried and get a new lifecycle).

## Signature / Usage

When a job is added to a queue it can be in one of three states:

| State | Description |
|-------|-------------|
| `wait` | A waiting list, where all jobs must enter before they can be processed |
| `prioritized` | A job with higher priority is processed first |
| `delayed` | The job is waiting for some timeout or to be promoted. Not processed directly; placed at the beginning of the waiting list, or in a prioritized set, and processed as soon as a worker is idle |

The next state is `active`: a set of jobs currently being processed in the `process` function. A job can be active for an unlimited amount of time until the process completes or an exception is thrown, so that it ends in `completed` or `failed`.

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('myQueue');

// wait
await queue.add('myJob', { data: 'value' });

// delayed
await queue.add('delayedJob', { data: 'value' }, { delay: 5000 });

// prioritized
await queue.add('priorityJob', { data: 'value' }, { priority: 1 });
```

```
add() -> wait / prioritized / delayed
                  |
               active
                  |
        completed / failed
```

### FlowProducer lifecycle

A job can also be added with the `add` method of a `FlowProducer`. When added by a flow producer the job is in `wait`, `prioritized` or `delayed` when there are no children, or in `waiting-children`: the job waits for all its children to complete and is not processed directly. As soon as the last child is marked completed, it is placed at the waiting list, at the delayed set (if `delay` is provided) or at the prioritized set (if `delay` is 0 and `priority` is greater than 0).

```typescript
import { FlowProducer } from 'bullmq';

const flowProducer = new FlowProducer();

await flowProducer.add({
  name: 'parentJob',
  queueName: 'parentQueue',
  data: {},
  children: [
    { name: 'childJob1', queueName: 'childQueue', data: { step: 1 } },
    { name: 'childJob2', queueName: 'childQueue', data: { step: 2 } },
  ],
});
```

```
add() -> waiting-children -> wait -> active -> completed / failed
```

### Backend architecture (v6+)

Since BullMQ v6, high-level classes such as `Queue` / `Worker` / `FlowProducer` depend only on the `IQueueBackend` interface rather than on Redis internals. Each class receives a `BackendFactory` that builds the `IQueueBackend`. The default is the Redis-based `RedisQueueBackend`; passing the PostgreSQL backend (`createPostgresBackend`) runs queue/worker operations on PostgreSQL.

```typescript
const myBackendFactory: BackendFactory = (name, opts, options) => {
  // return an object implementing IQueueBackend
};

const queue = new Queue('myqueue', { connection: {} }, myBackendFactory);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `priority` | `number` | `1` to `2^21 - 1` (2,097,151); lower number = higher priority. `0` means no explicit priority |
| `delay` | `number` | Milliseconds before the job moves to `wait` / `prioritized` |

## Notes

- Prioritized jobs use values from `1` to `2^21 - 1` (2,097,151), where a lower number is always a higher priority. This follows the Unix `nice` convention. A `priority` of `0` means no explicit priority is set, but since those jobs are always processed before any prioritized job, `0` can effectively be seen as the highest priority of all.
- `waiting-children` is a separate state used only by flows (`FlowProducer`): the parent job is not processed directly and moves to `wait`, `delayed` or `prioritized` once its last child completes. `failed` also results from a job stalling or the processor throwing.
- Active jobs hold a lock so other workers do not process the same job; the lock is renewed periodically by the worker (default lock duration 30 seconds).
- Redis must be configured with `maxmemory-policy=noeviction` (Redis backend).
- Migration (v5 → v6): the `Connection` class parameter formerly injectable as the third constructor argument was replaced by the optional `BackendFactory` argument (the `connection` option itself still takes `{ host, port }` etc.). APIs exposing Redis internals such as `Queue#client`, `Queue#redisVersion`, `Queue#databaseType`, `Worker#blockingClient` and `FlowProducer#client` were removed; reach the raw Redis client through `getBackend()` (a `RedisQueueBackend`).

## Related

- [Going to production](./going-to-production.md)
- [Architecture (official, v6.3.15)](https://docs.bullmq.io/guide/architecture)
- [Parallelism and concurrency](./parallelism-and-concurrency.md)
- [Troubleshooting](./troubleshooting.md)
