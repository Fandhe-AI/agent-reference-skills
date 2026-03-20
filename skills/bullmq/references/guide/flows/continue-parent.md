# Continue Parent

`continueParentOnFailure` オプションにより、子ジョブが失敗した場合に親ジョブを即座に処理開始できます。`removeUnprocessedChildren` メソッドで未処理の子ジョブを動的にクリーンアップし、`getFailedChildrenValues()` で失敗原因を判別できます。(v5.58.0 以降)

## continueParentOnFailure

```typescript
const { FlowProducer } = require('bullmq');
const flow = new FlowProducer({ connection });

const originalTree = await flow.add({
  name: 'root-job',
  queueName: 'topQueueName',
  data: {},
  children: [
    {
      name: 'child-job-1',
      data: { idx: 0, foo: 'bar' },
      queueName: 'childrenQueueName',
      opts: { continueParentOnFailure: true },
    },
    {
      name: 'child-job-2',
      data: { idx: 1, foo: 'baz' },
      queueName: 'childrenQueueName',
    },
    {
      name: 'child-job-3',
      data: { idx: 2, foo: 'qux' },
      queueName: 'childrenQueueName',
    },
  ],
});
```

子ジョブに `continueParentOnFailure: true` を設定すると、その子が失敗した時点で親ジョブが即座に active 状態に移行します（他の子ジョブがまだ処理中でも）。

## removeUnprocessedChildren

未処理（waiting または delayed 状態）の子ジョブをすべて削除します:

```typescript
await job.removeUnprocessedChildren();
```

| 対象 | 説明 |
|------|------|
| 削除される | waiting, delayed 状態の子ジョブ |
| 削除されない | active, completed, failed 状態の子ジョブ |

## getFailedChildrenValues

失敗した子ジョブの ID とエラーメッセージのマッピングを取得します:

```typescript
const failedChildren = await job.getFailedChildrenValues();
// { "job-id-1": "Upload failed" }
```

失敗した子がない場合は空オブジェクトを返します。

## 親 Worker での分岐処理

```typescript
const processor = async (job) => {
  const failedChildren = await job.getFailedChildrenValues();
  const hasFailedChildren = Object.keys(failedChildren).length > 0;

  if (hasFailedChildren) {
    // パス1: 子ジョブの失敗により continueParentOnFailure がトリガー
    console.log(`Parent job ${job.name} triggered by child failure(s):`, failedChildren);

    // 未処理の子ジョブを削除
    await job.removeUnprocessedChildren();
    console.log('Unprocessed child jobs have been removed.');
  } else {
    // パス2: すべての子ジョブが正常完了
    console.log(`Parent job ${job.name} processing after all children completed successfully.`);
  }
};
```

## 注意点

- `continueParentOnFailure` は子ジョブの失敗時に親を即座に active 状態にします（デフォルトでは全子ジョブの完了を待つ）
- `removeUnprocessedChildren` は active, completed, failed 状態のジョブには影響しません
- ファイルアップロードなど、1つの失敗で残りを中止すべきワークフローに適しています

## 関連

- [./flows.md](./flows.md) — FlowProducer の基本
- [./fail-parent.md](./fail-parent.md) — 子失敗時の親の失敗
- [./remove-dependency.md](./remove-dependency.md) — 依存関係の削除
