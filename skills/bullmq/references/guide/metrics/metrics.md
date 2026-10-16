# Metrics

BullMQ provides simple metrics gathering to track the performance of your queues. Workers count the number of jobs they have processed per minute (completed or failed) and store this data in a list inside Redis so it can be queried later.

## Signature / Usage

Enable metrics on the worker settings by specifying how many data points to keep (counters of jobs processed in 1 minute intervals):

```typescript
import { Worker, MetricsTime } from 'bullmq';

const myWorker = new Worker('Paint', {
  connection,
  metrics: {
    maxDataPoints: MetricsTime.ONE_WEEK * 2,
  },
});
```

Query the metrics with `getMetrics` on the `Queue` class, for completed or failed jobs:

```typescript
import { Queue } from 'bullmq';
const myQueue = new Queue('Paint', {
  connection,
});

const metrics = await queue.getMetrics('completed', 0, MetricsTime.ONE_WEEK * 2);

/* Returns a Metrics object:
{
    data: number[];
    count: number;
    meta: {
      count: number;
      prevTS: number;
      prevCount: number;
    };
  }
*/
```

`getMetrics` also accepts `start` and `end` arguments (`0` and `-1` by default) that can be used to implement pagination.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `maxDataPoints` | `number` | Maximum number of 1-minute data points to keep. Use `MetricsTime` constants |

Response fields:

| Field | Description |
|-------|-------------|
| `data` | Array where every position is 1 minute and holds the number of jobs completed (or failed) in that minute |
| `meta.count` | Total number of completed or failed jobs since the queue started processing jobs |
| `meta.prevTS` | Used internally by the metrics system; do not use |
| `meta.prevCount` | Used internally by the metrics system; do not use |

## Notes

- Use the same `metrics` setting on all your workers to get consistent metrics.
- Metrics are aggregated in 1 minute intervals; the recommended 2 weeks of data takes around 120KB of RAM per queue. Older data points are disposed automatically, so RAM consumption never grows past the maximum number of data points.

## Related

- [Prometheus](./prometheus.md)
- [How to monitor and manage BullMQ queues](https://bullmq.io/articles/guides/monitoring-bullmq-queues/) (external guide)
