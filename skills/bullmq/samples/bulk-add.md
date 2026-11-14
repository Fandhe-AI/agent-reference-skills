# Bulk Add

複数ジョブを一括追加し、バックエンドへのラウンドトリップを削減する。`queue.addBulk()` の原子性は SDK とバックエンドに依存する（Notes 参照）。

```typescript
import { FlowProducer, Queue } from 'bullmq';

// 単一キューへの一括追加
const queue = new Queue('Paint');
await queue.addBulk([
  { name: 'job1', data: { color: 'blue' } },
  { name: 'job2', data: { color: 'red' } },
  { name: 'job3', data: { color: 'green' }, opts: { priority: 1 } },
]);

// 複数キューへの一括追加 (FlowProducer.addBulk)
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
- 複数キューへの一括追加には `FlowProducer.addBulk()` を使用する
- `FlowProducer.addBulk()` は全件追加か 0 件かのどちらかで、部分的な追加は発生しない
- 一括追加によりバックエンドへのラウンドトリップを削減しパフォーマンスが向上する
- `queue.addBulk()` の原子性: PostgreSQL では TypeScript / Python / .NET が 1 バッチを単一トランザクションで追加する。Redis では失敗したバルク呼び出しが 0 件追加であるとは仮定できず、一部のジョブだけ追加されている可能性があるため、再試行前にキューを確認する（v6.7.6 公式ページ、reference は `references/guide/queues/adding-bulks.md`）。以前この例は「アトミック」と記載していた
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/queues/adding-bulks.md、guide/flows/adding-bulks.md (tag v6.7.6)
