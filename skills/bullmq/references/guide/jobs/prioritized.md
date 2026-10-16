# Prioritized

Jobs can include a `priority` option. With priorities, job processing order is determined by the specified `priority` instead of following a FIFO or LIFO pattern.

## Signature / Usage

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

await myQueue.add('wall', { color: 'pink' }, { priority: 10 });
await myQueue.add('wall', { color: 'brown' }, { priority: 5 });
await myQueue.add('wall', { color: 'blue' }, { priority: 7 });

// The wall will be painted first brown, then blue and
// finally pink.
```

If several jobs are added with the same priority value, jobs within that priority are processed in FIFO (first in, first out) fashion.

### Change priority

Use `changePriority` to change the `priority` after inserting a job:

```typescript
const job = await Job.create(queue, 'test2', { foo: 'bar' }, { priority: 16 });

await job.changePriority({
  priority: 1,
});
```

Or combine with the LIFO option:

```typescript
await job.changePriority({
  lifo: true,
});
```

### Get prioritized jobs

As prioritized is a separate state, use `getJobs` or `getPrioritized`:

```typescript
const jobs = await queue.getJobs(['prioritized']);

const jobs2 = await queue.getPrioritized();
```

### Get counts per priority

To get the count of jobs in `prioritized` status (priorities higher than 0) or in `waiting` status (priority 0), use `getCountsPerPriority`:

```typescript
const counts = await queue.getCountsPerPriority([1, 0]);
/*
{
  '1': 11,
  '0': 10
}
*/
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `priority` | `number` | Priority level (`1` to `2 097 151`). A lower number is a higher priority. `0` means no priority and is processed before prioritized jobs |

## Notes

- Adding prioritized jobs is slower than other job types, with complexity `O(log(n))` relative to the number of jobs in the prioritized set.
- Jobs without a `priority` assigned get the highest priority, being processed before jobs with priorities assigned.
- In `getCountsPerPriority`, `0` counts waiting jobs and priorities greater than `0` count prioritized jobs.

## Related

- [FIFO](./fifo.md)
- [LIFO](./lifo.md)
- [Getters](./getters.md)
