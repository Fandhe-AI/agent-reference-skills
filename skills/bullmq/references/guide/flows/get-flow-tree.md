# Get Flow Tree

`FlowProducer.getFlow()` メソッドを使用して、ジョブとそのすべての子・孫ジョブをツリー構造として取得できます。大規模なフローの可視化やデバッグに有用です。

## 基本的な使い方

```typescript
const flow = new FlowProducer({ connection });

const originalTree = await flow.add({
  name: 'root-job',
  queueName: 'topQueueName',
  data: {},
  children: [
    {
      name,
      data: { idx: 0, foo: 'bar' },
      queueName: 'childrenQueueName',
      children: [
        {
          name,
          data: { idx: 4, foo: 'baz' },
          queueName: 'grandchildrenQueueName',
        },
      ],
    },
    {
      name,
      data: { idx: 2, foo: 'foo' },
      queueName: 'childrenQueueName',
    },
    {
      name,
      data: { idx: 3, foo: 'bis' },
      queueName: 'childrenQueueName',
    },
  ],
});

const { job: topJob } = originalTree;

const tree = await flow.getFlow({
  id: topJob.id,
  queueName: 'topQueueName',
});

const { children, job } = tree;
```

各 `child` は `job` プロパティを持ち、さらに子がある場合は `children` プロパティも持ちます。

## ページネーション（depth / maxChildren）

大量の子ジョブがある場合、取得を制限できます:

```typescript
const limitedTree = await flow.getFlow({
  id: topJob.id,
  queueName: 'topQueueName',
  depth: 1,          // 第1階層の子のみ取得
  maxChildren: 2,    // ノードごとに最大2つの子を取得
});

const { children, job } = limitedTree;
```

| Name | Type | Description |
|------|------|-------------|
| id | string | ルートジョブの ID |
| queueName | string | ルートジョブのキュー名 |
| depth | number | 取得するツリーの深さ制限 |
| maxChildren | number | 各ノードの子の最大取得数 |

## 注意点

- 各 `child` オブジェクトは `job` プロパティを持ち、子がある場合は `children` プロパティも含まれます
- `depth` と `maxChildren` を適切に設定して、大規模フローでのパフォーマンス問題を回避してください

## 関連

- [./flows.md](./flows.md) — FlowProducer の基本
- [./adding-bulks.md](./adding-bulks.md) — 複数フローの一括追加
