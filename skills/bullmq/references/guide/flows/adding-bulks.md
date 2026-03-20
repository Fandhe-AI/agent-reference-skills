# Adding Flows in Bulk

`FlowProducer.addBulk()` を使用して、複数のフローをアトミックに一括追加できます。すべてのフローが作成されるか、いずれも作成されないかのどちらかとなり、Redis へのラウンドトリップ回数も削減されます。

## 基本的な使い方

```typescript
import { FlowProducer } from 'bullmq';

const flow = new FlowProducer({ connection });

const trees = await flow.addBulk([
  {
    name: 'root-job-1',
    queueName: 'rootQueueName-1',
    data: {},
    children: [
      {
        name,
        data: { idx: 0, foo: 'bar' },
        queueName: 'childrenQueueName-1',
      },
    ],
  },
  {
    name: 'root-job-2',
    queueName: 'rootQueueName-2',
    data: {},
    children: [
      {
        name,
        data: { idx: 1, foo: 'baz' },
        queueName: 'childrenQueueName-2',
      },
    ],
  },
]);
```

## 注意点

- この呼び出しは成功か失敗のどちらかのみで、すべてのジョブが追加されるか、まったく追加されないかのいずれかです
- 大量のフローを追加する場合、個別の `add()` 呼び出しよりも高速です

## 関連

- [./flows.md](./flows.md) — FlowProducer の基本
- [./get-flow-tree.md](./get-flow-tree.md) — フローツリーの取得
