# BullMQ — Relay example: Live job progress

ワーカーがジョブ進捗を retained message として publish し、ユーザーが見ている API サーバーだけがそのジョブのトピックを subscribe して SSE で配信する例。

## Signature / Usage

### Worker

```typescript
import { Relay, Worker } from 'bullmq';

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
  if (job) {
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
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/examples/live-job-progress.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/examples/live-job-progress

## Related

- [overview.md](./overview.md)
- [retained-messages.md](./retained-messages.md)
- [topics-and-patterns.md](./topics-and-patterns.md)
