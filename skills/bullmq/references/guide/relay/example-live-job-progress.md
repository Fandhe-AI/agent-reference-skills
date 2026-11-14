# BullMQ — Relay example: Live job progress

Workers publish job progress as retained messages; only the API servers with a viewer subscribe to that job's topics and relay the updates to browsers over Server-Sent Events.

## Signature / Usage

### Worker

Adapted (not in the official docs): the `failed` handler publishes the terminal `failed` status only when the job has no retry left (`UnrecoverableError` or `attemptsMade` reached `opts.attempts`), because the worker's `failed` event also fires for failed attempts that will be retried; the rest of the snippet is verbatim.

```typescript
import { Relay, UnrecoverableError, Worker } from 'bullmq';

const connection = { host: 'redis.internal', port: 6379 };
const relay = new Relay({ connection });

const HOUR = 60 * 60 * 1000;

const topic = (jobId: string, kind: 'progress' | 'status') =>
  `jobs.transcode.${jobId}.${kind}`;

const worker = new Worker(
  'transcode',
  async job => {
    const chunks = await splitVideo(job.data.videoUrl);
    for (const [index, chunk] of chunks.entries()) {
      await transcode(chunk);
      const progress = Math.round(((index + 1) / chunks.length) * 100);
      await relay.publish(topic(job.id!, 'progress'), progress, {
        retain: HOUR,
      });
    }
    return { url: await mergeChunks(chunks) };
  },
  { connection },
);

worker.on('completed', (job, result) => {
  void relay.publish(
    topic(job.id!, 'status'),
    { state: 'completed', url: result.url },
    { retain: 24 * HOUR },
  ).catch(console.error);
});

worker.on('failed', (job, err) => {
  // Publish a terminal status only when no retry is left.
  const isFinal =
    job &&
    (err instanceof UnrecoverableError ||
      job.attemptsMade >= (job.opts.attempts ?? 1));
  if (job && isFinal) {
    void relay.publish(
      topic(job.id!, 'status'),
      { state: 'failed', reason: err.message },
      { retain: 24 * HOUR },
    ).catch(console.error);
  }
});
```

### API server

```typescript
import express from 'express';
import { Relay, RelaySubscription } from 'bullmq';

const relay = new Relay({ connection: { host: 'redis.internal', port: 6379 } });
const app = express();

app.get('/videos/:jobId/events', async (req, res) => {
  let closed = false;
  const subscriptions: RelaySubscription[] = [];
  const unsubscribe = (subscription: RelaySubscription) => {
    void subscription.unsubscribe().catch(console.error);
  };
  const cleanup = () => {
    closed = true;
    subscriptions.splice(0).forEach(unsubscribe);
  };
  res.once('close', cleanup);
  res.once('error', cleanup);

  try {
    const { jobId } = req.params;
    const authorized =
      /^\d+$/.test(jobId) && (await userCanSeeJob(req.user, jobId));
    if (closed) return;
    if (!authorized) return res.sendStatus(404);

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    const send = (event: string, data: unknown) => {
      if (!closed) {
        res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
      }
    };

    // Exact topics deliver retained values first, showing the current state.
    for (const kind of ['progress', 'status']) {
      const subscription = await relay.subscribe(
        `jobs.transcode.${jobId}.${kind}`,
        m => send(kind, m.data),
      );
      if (closed) {
        unsubscribe(subscription);
        return;
      }
      subscriptions.push(subscription);
    }
  } catch (err) {
    console.error(err);
    if (!closed) res.end();
    cleanup();
  }
});
```

### Browser

```typescript
const events = new EventSource(`/videos/${jobId}/events`);
events.addEventListener(
  'progress',
  e => (progressBar.value = JSON.parse(e.data)),
);
events.addEventListener('status', e => showResult(JSON.parse(e.data)));
```

## Notes

- Scenario: users upload videos, workers transcode them, and each video page shows a live progress bar; the browser is connected to one of the API servers (Server-Sent Events) while the job runs on any worker. Exact-topic subscriptions deliver the retained value first, so opening the page shows the current progress at once.
- Why the Relay: only API servers with a viewer receive updates, and only for watched jobs (with `QueueEvents` every API server would read every event of the queue); it works the same with any number of API servers and workers.
- Validate and authorize the job id before building a topic from it (see Values in topics in topics-and-patterns.md). Publish when the percentage changes or at most a few times per second. Keep calling `job.updateProgress()` as well if you also need the progress on the job itself (for example for `queue.getJob(id)`).
- Adapted from the official example: the `failed` handler (see the note above the worker snippet). It relies on `job.attemptsMade` counting the attempt that just failed; a retried job keeps its previous retained status until it completes or fails for good.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/examples/live-job-progress.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/examples/live-job-progress

### Refreshing viewers after a recovery

Adapted (not in the official docs): retained messages are not delivered again when the API server's relay node recovers, so a status published while it was disconnected (for example a job that completed) would never reach clients that are still connected. `activeStreams` and `sendCurrentState` are placeholders for your own bookkeeping of open SSE responses and a lookup of the job's current state (for example from the queue or your database).

```typescript
relay.on('recovered', () => {
  for (const stream of activeStreams) {
    void sendCurrentState(stream).catch(console.error);
  }
});
```

- Adapted from the official example: the official API server code does not handle the `'recovered'` event; this is an addition for correctness after a lease expiry.

## Related

- [overview.md](./overview.md)
- [retained-messages.md](./retained-messages.md)
- [topics-and-patterns.md](./topics-and-patterns.md)
- [Example: live job progress (official, v6.7.6)](https://docs.bullmq.io/guide/relay/examples/live-job-progress)
