# Bulk Add

Add many jobs in one call to reduce roundtrips to the backend. Whether `queue.addBulk()` is atomic depends on the SDK and backend (see Notes).

```typescript
import { FlowProducer, Queue } from 'bullmq';

// 単一キューへの一括追加
const queue = new Queue('Paint');
await queue.addBulk([
  { name: 'job1', data: { color: 'blue' } },
  { name: 'job2', data: { color: 'red' } },
  { name: 'job3', data: { color: 'green' }, opts: { priority: 1 } },
]);

// Bulk add across several queues (FlowProducer.addBulk)
const flow = new FlowProducer({ connection });
const trees = await flow.addBulk([
  {
    name: 'job-1',
    queueName: 'queueName-1',
    data: { step: 'first' },
  },
  {
    name: 'job-2',
    queueName: 'queueName-2',
    data: { step: 'second' },
  },
]);
```

## Notes

- `queue.addBulk()` は単一キュー専用
- Use `FlowProducer.addBulk()` for adding jobs to several queues in one call
- `FlowProducer.addBulk()` は全件追加か 0 件かのどちらかで、部分的な追加は発生しない
- Bulk adding reduces roundtrips to the backend and improves throughput
- Atomicity of `queue.addBulk()`: on PostgreSQL the TypeScript, Python and .NET SDKs add a batch in a single transaction; on Redis a failed bulk call must not be assumed to have added no jobs, so check the queue before retrying (v6.7.6 official page; details in `references/guide/queues/adding-bulks.md`). This sample previously described the call as atomic. The `FlowProducer.addBulk()` note in the official flows page still says all or none of the flows are added.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/queues/adding-bulks.md、guide/flows/adding-bulks.md (tag v6.7.6)
