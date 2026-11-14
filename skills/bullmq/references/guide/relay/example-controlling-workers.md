# BullMQ — Relay example: Controlling workers

Changing the concurrency or pausing a fleet of workers at runtime through a retained settings topic, without redeploying.

## Signature / Usage

### Every worker

```typescript
import { Relay, Worker } from 'bullmq';

interface WorkerSettings {
  concurrency: number;
  paused: boolean;
}

const connection = { host: 'redis.internal', port: 6379 };
const relay = new Relay({ connection });

const worker = new Worker('emails', processEmail, {
  connection,
  concurrency: 10,
  autorun: false,
});

async function apply(settings: WorkerSettings) {
  worker.concurrency = settings.concurrency;
  if (settings.paused && !worker.isPaused()) {
    await worker.pause(); // waits for the active jobs to finish
  } else if (!settings.paused && worker.isPaused()) {
    await worker.resume();
  }
}

let applying = Promise.resolve();
let initialApplication: Promise<void> | undefined;
await relay.subscribe('workers.emails.settings', message => {
  const next = applying.then(() => apply(message.data as WorkerSettings));
  initialApplication ??= next;
  applying = next.catch(err =>
    logger.error(err, 'could not apply worker settings'),
  );
});

await initialApplication;
await applying;
if (!worker.isRunning()) {
  void worker.run().catch(err => logger.error(err, 'could not start worker'));
}
```

### Changing the settings

```typescript
const result = await relay.publish(
  'workers.emails.settings',
  { concurrency: 2, paused: false },
  { retain: 7 * 24 * 60 * 60 * 1000 },
);
console.log(`applied by ${result.endpoints} workers`);
```

### Targeting some workers

```typescript
const region = process.env.REGION; // e.g. 'eu-west-1'

await relay.subscribe('workers.emails.settings', onSettings); // all workers
await relay.subscribe(`workers.emails.regions.${region}.settings`, onSettings);
```

## Notes

- Scenario: a queue is processed by many workers on many machines and you want to change concurrency or pause them without redeploying; workers started later apply the current settings from the retained message. The publish result tells you how many workers received the change.
- These are live settings: a retained message expires, so keep defaults in the worker code (or your database) and republish if a setting must last.
- `worker.pause()` waits for the active jobs to finish; `worker.pause(true)` stops fetching new jobs without waiting. To stop specific running jobs rather than whole workers, see example-cancelling-jobs-on-other-workers.md.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/examples/controlling-workers.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/examples/controlling-workers

### Re-applying settings after a recovery

Adapted (not in the official docs): the example above relies on the retained message, which is not delivered again when a node recovers; this handler re-reads the latest settings from your source of truth (`loadSettings` is a placeholder for your own storage) and applies them through the same ordered chain.

```typescript
relay.on('recovered', () => {
  applying = applying
    .then(async () => apply(await loadSettings()))
    .catch(err => logger.error(err, 'could not re-apply worker settings'));
});
```

- Adapted from the official example: a worker disconnected for longer than `leaseDuration` while the settings changed would otherwise keep running with stale `concurrency` / `paused` until the next publish, because retained messages are not redelivered after a recovery.

## Related

- [overview.md](./overview.md)
- [retained-messages.md](./retained-messages.md)
- [topics-and-patterns.md](./topics-and-patterns.md)
- [Example: controlling workers (official, v6.7.6)](https://docs.bullmq.io/guide/relay/examples/controlling-workers)
