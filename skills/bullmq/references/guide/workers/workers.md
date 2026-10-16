# Workers

Workers are the instances that perform jobs added to the queue. A worker is equivalent to a "message" receiver in a traditional message queue. If the process function succeeds, the job moves to "completed"; if it throws, the job automatically moves to "failed". Failed jobs can be automatically retried (see Retrying failing jobs).

## Signature / Usage

A worker is instantiated with the `Worker` class; the work is performed in the process function, which is asynchronous (`async` or returning a promise).

```typescript
import { Worker, Job } from 'bullmq';

const worker = new Worker(queueName, async (job: Job) => {
  // Optionally report some progress
  await job.updateProgress(42);

  // Optionally sending an object as progress
  await job.updateProgress({ foo: 'bar' });

  // Do something with job
  return 'some value';
});
```

The processor can also receive an optional third parameter for job cancellation support:

```typescript
const worker = new Worker(
  queueName,
  async (job: Job, token?: string, signal?: AbortSignal) => {
    // signal can be used to detect when a job has been cancelled
    return 'some value';
  },
);
```

When a worker instance is created, it launches the processor immediately. To decide when the processor starts, pass `autorun: false` and call `run()`:

```typescript
const worker = new Worker(
  queueName,
  async (job: Job) => {
    await job.updateProgress(42);
    return 'some value';
  },
  { autorun: false },
);

worker.run();
```

### Events

A processor can optionally return a value, retrievable via the job's `returnvalue` property or the `completed` event:

```typescript
worker.on('completed', (job: Job, returnvalue: any) => {
  // Do something with the return value.
});

worker.on('progress', (job: Job, progress: number | object) => {
  // Do something with the progress.
});

worker.on('failed', (job: Job | undefined, error: Error, prev: string) => {
  // Do something with the failure.
});

worker.on('error', err => {
  // log the error
  console.error(err);
});
```

Global events from any worker are available through `QueueEvents`:

```typescript
import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('Paint');

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  // Called every time a job is completed by any worker.
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  // Called whenever a job is moved to failed by any worker.
});

queueEvents.on('progress', ({ jobId, data }) => {
  // jobId received a progress event
});
```

### Pause and resume

```typescript
// Pause the worker (by default waits for active jobs to finish)
await worker.pause();

// Pause immediately without waiting for currently processing jobs
await worker.pause(true);

// Resume the worker (returns Promise<void> since v6, so await it)
await worker.resume();
```

### TypeScript typings

Specify the job data and return value types using generics:

```typescript
const worker = new Worker<MyData, MyReturn>(queueName, async (job: Job) => {});
```

By default the job progress is typed as `string | boolean | number | object` (v6.2.0+). To report progress with a specific shape, specify a progress type so that `updateProgress` and the `progress` event are type-safe:

```typescript
import { Worker, RedisQueueBackend } from 'bullmq';

type MyProgress = { percentage: number; message: string };

const worker = new Worker<
  MyData,
  MyReturn,
  string,
  RedisQueueBackend,
  MyProgress
>(queueName, async job => {
  // progress is checked against MyProgress
  await job.updateProgress({ percentage: 42, message: 'halfway' });
});

worker.on('progress', (job, progress) => {
  console.log(progress.percentage, progress.message);
});
```

## Options / Props

Commonly used worker options:

| Name | Type | Description |
|------|------|-------------|
| `concurrency` | `number` | Number of jobs processed in parallel (default: 1) |
| `autorun` | `boolean` | Start the processor on creation (default: `true`) |
| `connection` | `ConnectionOptions` | Redis connection settings |
| `removeOnComplete` | `KeepJobs` | Automatic removal of completed jobs |
| `removeOnFail` | `KeepJobs` | Automatic removal of failed jobs |
| `stalledInterval` | `number` | Interval of the stalled-job check (ms) |
| `maxStalledCount` | `number` | Allowed number of stalls |
| `lockDuration` | `number` | Job lock duration (ms) |
| `useWorkerThreads` | `boolean` | Use worker threads for sandboxed processors |

## Notes

- Always attach an `error` listener to the worker. If the error handler is missing, the worker may stop processing jobs when an error is emitted, because Node.js raises an unhandled exception.
- The progress type must be JSON-serializable, as progress is persisted in the queue's backend. Sandboxed processors always receive the default progress type, since the value crosses a process boundary.
- `Worker#resume()` became asynchronous in v6 and returns `Promise<void>`; always `await` it (it was synchronous in v5 and earlier).

## Related

- [Connections](../connections.md)
- [Concurrency](./concurrency.md)
- [Stalled Jobs](./stalled-jobs.md)
- [Sandboxed Processors](./sandboxed-processors.md)
