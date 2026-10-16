# Events

All classes in BullMQ emit events that inform on the lifecycles of the jobs running in the queue. Every class is an `EventEmitter` and emits different events.

## Signature / Usage

```typescript
import { Queue, Worker, QueueEvents } from 'bullmq';

const myQueue = new Queue('Paint');

myQueue.on('waiting', (job: Job) => {
  // Job is waiting to be processed.
});

const myWorker = new Worker('Paint');

myWorker.on('drained', () => {
  // Queue is drained, no more jobs left
});

myWorker.on('completed', (job: Job) => {
  // job has completed
});

myWorker.on('failed', (job: Job) => {
  // job has failed
});
```

The events above are local to the workers that actually completed the jobs. To listen to all events emitted by all workers in one place, use the `QueueEvents` class:

```typescript
import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('Paint');

queueEvents.on('completed', ({ jobId }) => {
  // Called every time a job is completed in any worker.
});

queueEvents.on(
  'progress',
  ({ jobId, data }: { jobId: string; data: number | object }) => {
    // jobId received a progress event
  },
);
```

### Real-time updates

Local `Worker` / `Queue` listeners only see events in the current process. `QueueEvents` is the usual building block for real-time updates across workers: dashboards, websockets, SSE, or another service that must react while jobs run.

```typescript
import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('Paint', { connection });

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  sendToDashboard({ type: 'completed', jobId, returnvalue });
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  sendToDashboard({ type: 'failed', jobId, failedReason });
});

queueEvents.on(
  'progress',
  ({ jobId, data }: { jobId: string; data: number | object }) => {
    sendToDashboard({ type: 'progress', jobId, data });
  },
);
```

Publish progress from the worker with `job.updateProgress(...)` (number or object). This pairs well with working with batches when one job represents many items, or when you want a live bar for a long job:

```typescript
await job.updateProgress({ completed: 3, total: 10 });
```

Close `QueueEvents` on shutdown so its Redis connection is released:

```typescript
await queueEvents.close();
```

### Manual trim events

To trim events manually, use the `trimEvents` method:

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('paint');

await queue.trimEvents(10); // leaves 10 events
```

## Options / Props

Common events (see the Worker Listener, Queue Listener and QueueEvents Listener API references for the full list):

| Name | Type | Description |
|------|------|-------------|
| `waiting` | event | A job is waiting to be processed |
| `completed` | event | A job completed successfully |
| `failed` | event | A job failed with an error |
| `progress` | event | A job's progress was updated |
| `drained` | event | The queue has no more jobs waiting |
| `error` | event | An error occurred in the Worker |

## Notes

- `QueueEvents` is implemented using Redis streams, which guarantees events are delivered and not lost during disconnections (unlike standard pub-sub).
- The event stream is auto-trimmed so its size does not grow too much. By default it keeps ~10,000 events; configure with the `streams.events.maxLen` option.
- For jobs processed with BullMQ Pro batches, worker-local `completed` / `failed` listeners see the wrapper batch job. Use `QueueEvents` / `QueueEventsPro` when you need per-job lifecycle events.

## Related

- [Create custom events](./create-custom-events.md)
- [Working with batches](../queues/batches.md)
