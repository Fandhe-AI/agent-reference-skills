# Removing Jobs

`Queue` provides three methods to remove jobs from a queue: `drain`, `clean` and `obliterate`. Each targets different jobs and behaves differently.

## Signature / Usage

### Drain

Removes jobs that are waiting or delayed, but not active, waiting-children, completed or failed.

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('paint');

// removes waiting jobs only
await queue.drain();

// also removes delayed jobs
await queue.drain(true);
```

### Clean

Removes jobs in a specific state that are older than a grace period. Returns the IDs of the deleted jobs.

```typescript
const deletedJobIds = await queue.clean(
  60000, // jobs older than 1 minute
  1000, // remove at most 1000 jobs
  'paused',
);
```

### Obliterate

Removes the queue and all its related data. By default active jobs are preserved.

```typescript
await queue.obliterate();

// force removal including active jobs
await queue.obliterate({ force: true });
```

## Options / Props

`clean(grace, limit, type)` parameters:

| Name | Type | Description |
|------|------|-------------|
| `grace` | `number` | Grace period in milliseconds; jobs at least this old are targeted |
| `limit` | `number` | Maximum number of jobs to remove in one call |
| `type` | `string` | Job state to target (`completed`, `failed`, `paused`, `delayed`, `wait`) |

## Notes

- All three methods take parent/child relationships across different queues into account. If a child job lives in another queue, the parent stays in waiting-children.
- `drain` empties the queue but does not delete the queue itself; use `obliterate` to delete the queue as a whole.
- `clean` uses the grace period to protect recent jobs while removing older ones.

## Related

- [Queues](./queues.md)
- [Removing jobs (single job)](../jobs/removing-jobs.md)
- [Removing jobs (official, v6.3.15)](https://docs.bullmq.io/guide/queues/removing-jobs)
- [Drain API Reference](https://docs.bullmq.io/api/classes/v6.Queue.html#drain)
- [Clean API Reference](https://docs.bullmq.io/api/classes/v6.Queue.html#clean)
- [Obliterate API Reference](https://docs.bullmq.io/api/classes/v6.Queue.html#obliterate)
