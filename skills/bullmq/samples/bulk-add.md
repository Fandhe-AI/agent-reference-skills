# Bulk Add

複数ジョブをアトミックに一括追加し、Redis へのラウンドトリップを削減する。

```typescript
import { FlowProducer, Queue } from 'bullmq';

// 単一キューへの一括追加
const queue = new Queue('Paint');
await queue.addBulk([
  { name: 'job1', data: { color: 'blue' } },
  { name: 'job2', data: { color: 'red' } },
  { name: 'job3', data: { color: 'green' }, opts: { priority: 1 } },
]);

// 複数キューへのアトミックな一括追加 (FlowProducer.addBulk)
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
- 複数キューへのアトミックな一括追加には `FlowProducer.addBulk()` を使用する
- `FlowProducer.addBulk()` は全件追加か 0 件かのどちらかで、部分的な追加は発生しない
- 一括追加により Redis へのラウンドトリップを削減しパフォーマンスが向上する
