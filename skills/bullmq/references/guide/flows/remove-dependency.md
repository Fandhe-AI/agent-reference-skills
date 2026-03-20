# Remove Dependency

`removeDependencyOnFailure` オプションを使用すると、子ジョブが失敗した際に親ジョブとの依存関係を自動的に削除できます。親ジョブは失敗した子ジョブの完了を待たずに処理を続行します。

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
      opts: { removeDependencyOnFailure: true },
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

## 注意点

- `removeDependencyOnFailure: true` を持つ子ジョブが失敗すると、親ジョブの依存関係リストからその子が削除されます
- 他に保留中の子ジョブがなければ、親ジョブは waiting 状態に移行して処理されます
- 失敗した子ジョブの結果は `getChildrenValues` には含まれません

## 関連

- [./flows.md](./flows.md) — FlowProducer の基本
- [./fail-parent.md](./fail-parent.md) — 子失敗時の親の失敗
- [./ignore-dependency.md](./ignore-dependency.md) — 依存関係の無視
- [./remove-child-dependency.md](./remove-child-dependency.md) — 子依存関係の手動削除
