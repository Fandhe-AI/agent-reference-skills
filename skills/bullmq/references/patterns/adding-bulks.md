# Adding Jobs in Bulk across Different Queues

異なるキューに対してジョブをアトミックに一括追加するパターン。すべてのジョブが追加されるか、まったく追加されないかのどちらかを保証し、Redis へのラウンドトリップも削減できる。

## 基本的な使い方

`queue.addBulk` は単一キューにしか追加できないため、複数キューへの一括追加には `FlowProducer.addBulk` を使用する。

```typescript
import { FlowProducer } from 'bullmq';

const flow = new FlowProducer({ connection });

const trees = await flow.addBulk([
  {
    name: 'job-1',
    queueName: 'queueName-1',
    data: {},
  },
  {
    name: 'job-2',
    queueName: 'queueName-2',
    data: {},
  },
]);
```

子ジョブなしの個別ジョブも追加可能。この呼び出しは成功か失敗のどちらかのみで、すべてのジョブが追加されるか、1つも追加されない。

## 注意点

- `queue.addBulk` は単一キュー専用。複数キューには `FlowProducer.addBulk` を使う
- アトミック操作のため、部分的な追加は発生しない
- ラウンドトリップの削減によりパフォーマンスが向上する

## 関連

- [Add Bulk API Reference](https://api.docs.bullmq.io/classes/v5.FlowProducer.html#addbulk)
- [./flows.md](./flows.md)
