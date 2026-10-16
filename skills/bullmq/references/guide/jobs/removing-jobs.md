# Removing jobs

Sometimes it is necessary to remove a job. For example, there could be a job that has bad data.

## Signature / Usage

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('paint');

const job = await queue.add('wall', { color: 1 });

await job.remove();
```

### Having a parent job

There are 2 possible cases when removing a child job:

| Case | Parent state | Behavior |
|------|--------------|----------|
| No pending dependencies | Moved to wait | The parent may be processed |
| Pending dependencies | Kept in waiting-children | The parent waits for the other children |

### Having pending dependencies

BullMQ tries to remove all pending descendants first.

## Notes

- Locked jobs (in active state) cannot be removed. In TypeScript and Python an error is thrown; in Rust `Queue::remove` returns `Ok(false)` (`true` = removed, `false` = the job or one of its dependencies is locked and could not be removed).
- Processed values are kept in the parent's processed `hset` if the child is in completed state at the time it is removed.
- If any of the children are locked, the deletion process is stopped.

## Related

- [Jobs](./jobs.md)
- [Stalled](./stalled.md)
- [Getters](./getters.md)
