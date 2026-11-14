# BullMQ — Relay example: Cancelling jobs on other workers

The API server publishes on a `jobs.<queue>.cancel` topic and each worker subscribes to it and aborts the running job with `worker.cancelJob()`.

## Signature / Usage

### Every worker

```typescript
import { Relay, UnrecoverableError, Worker } from 'bullmq';

const connection = { host: 'redis.internal', port: 6379 };
const relay = new Relay({ connection });

const worker = new Worker(
  'exports',
  async (job, token, signal) => {
    try {
      for (const page of await listPages(job.data)) {
        if (signal?.aborted) {
          throw new UnrecoverableError(`cancelled: ${signal.reason}`);
        }
        await exportPage(page, { signal }); // pass it to fetch, streams, etc.
      }
    } catch (err) {
      if (signal?.aborted) {
        throw new UnrecoverableError(`cancelled: ${signal.reason}`);
      }
      throw err;
    }
  },
  { connection },
);

await relay.subscribe('jobs.exports.cancel', message => {
  const { jobId, reason } = message.data as { jobId: string; reason: string };
  // Only the worker running the job finds it; the others return false.
  worker.cancelJob(jobId, reason);
});
```

### Several queues in one process

```typescript
const workers = new Map<string, Worker>([
  ['exports', exportsWorker],
  ['reports', reportsWorker],
]);

await relay.subscribe('jobs.*.cancel', message => {
  // message.topic is e.g. 'jobs.exports.cancel'
  const queueName = decodeURIComponent(message.topic.split('.')[1]);
  const { jobId, reason } = message.data as { jobId: string; reason: string };
  workers.get(queueName)?.cancelJob(jobId, reason);
});
```

### Requesting a cancellation

```typescript
import { Relay } from 'bullmq';

const relay = new Relay({ connection });

export async function cancelExport(
  jobId: string,
  reason = 'cancelled by user',
): Promise<boolean> {
  const { endpoints } = await relay.publish('jobs.exports.cancel', {
    jobId,
    reason,
  });
  return endpoints > 0;
}
```

## Notes

- Scenario: a user cancels a long-running export; the request reaches one API server while the job runs on any worker. `worker.cancelJob(jobId)` only reaches jobs run by that `Worker` instance, so every worker subscribes to the cancellation topic of its queue. The processor must observe the `AbortSignal` (third argument) and throw an `UnrecoverableError` so the cancelled job is not retried.
- `decodeURIComponent` reverses the encoding of queue names that need it. A process with a wildcard subscription also receives requests for queues it does not run and ignores them; use one subscription per queue if that traffic matters.
- `publish()` returning `endpoints > 0` means the request reached at least one worker inbox, not that the worker running the job received it or cancelled it.
- Limitations: only running jobs are cancelled (a request for a job not running when workers receive it has no effect); cancellation is cooperative; a job can finish first; there is no confirmation; a worker removed after exceeding `leaseDuration` misses the request.
- Compared with broadcasting over Redis pub/sub: a reconnecting worker does not miss the request (it waits in the inbox), and it works with every Redis client and with PostgreSQL. See ../workers/cancelling-jobs.md for ways to react to the signal.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/examples/cancelling-jobs-on-other-workers.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/examples/cancelling-jobs-on-other-workers

## Related

- [overview.md](./overview.md)
- [retained-messages.md](./retained-messages.md)
- [topics-and-patterns.md](./topics-and-patterns.md)
- [Example: cancelling jobs on other workers (official, v6.7.6)](https://docs.bullmq.io/guide/relay/examples/cancelling-jobs-on-other-workers)
