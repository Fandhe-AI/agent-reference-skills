# Remove Child Dependency

`removeChildDependency` メソッドを使用して、子ジョブから親ジョブへの依存関係を手動で削除できます。対象の子ジョブが最後の保留中の子であった場合、親ジョブは waiting 状態に移行します。

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
      opts: {},
    },
  ],
});

await originalTree.children[0].job.removeChildDependency();
```

## 注意点

- このメソッドを呼び出すと、既存の親ジョブがあるか検証され、親が存在しない場合はエラーがスローされます
- 対象の子ジョブが最後の保留中の子であった場合、親ジョブは waiting 状態に移行して処理されます
- 既に failed または completed 状態の子ジョブに対しては、unprocessed リストに含まれないため削除は発生しません

## 関連

- [./flows.md](./flows.md) — FlowProducer の基本
- [./remove-dependency.md](./remove-dependency.md) — 失敗時の自動依存関係削除
- [./ignore-dependency.md](./ignore-dependency.md) — 依存関係の無視
