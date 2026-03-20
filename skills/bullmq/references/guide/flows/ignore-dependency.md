# Ignore Dependency

`ignoreDependencyOnFailure` オプションを使用すると、子ジョブが失敗した際に依存関係を無視して親ジョブの処理を続行できます。`removeDependencyOnFailure` と異なり、失敗情報は保持され、`getIgnoredChildrenFailures` で取得可能です。

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
      opts: { ignoreDependencyOnFailure: true },
      children: [
        {
          name,
          data: { idx: 1, foo: 'bah' },
          queueName: 'grandChildrenQueueName',
        },
        {
          name,
          data: { idx: 2, foo: 'baz' },
          queueName: 'grandChildrenQueueName',
        },
      ],
    },
    {
      name,
      data: { idx: 3, foo: 'foo' },
      queueName: 'childrenQueueName',
    },
  ],
});
```

## 失敗情報の取得

```typescript
const ignoredChildrenFailures =
  await originalTree.job.getIgnoredChildrenFailures();
```

## 注意点

- `ignoreDependencyOnFailure: true` を持つ子ジョブが失敗すると、親ジョブの依存関係から無視されます
- 他に保留中の子ジョブがなければ、親ジョブは waiting 状態に移行します
- `removeDependencyOnFailure` との違いは、失敗した子の情報が `getIgnoredChildrenFailures` で取得できる点です

## 関連

- [./flows.md](./flows.md) — FlowProducer の基本
- [./remove-dependency.md](./remove-dependency.md) — 依存関係の削除
- [./remove-child-dependency.md](./remove-child-dependency.md) — 子依存関係の手動削除
- [./fail-parent.md](./fail-parent.md) — 子失敗時の親の失敗
