# Fail Parent

`failParentOnFailure` オプションを子ジョブに設定すると、その子ジョブが失敗した場合に親ジョブも失敗としてマークされます。この効果はジョブ階層を再帰的に伝播し、祖父母以上のジョブも失敗させることができます。

## 基本的な使い方

```typescript
import { FlowProducer } from 'bullmq';

const flow = new FlowProducer({ connection });

const originalTree = await flow.add({
  name: 'root-job',
  queueName: 'topQueueName',
  data: {},
  children: [
    {
      name: 'child-job',
      data: { idx: 0, foo: 'bar' },
      queueName: 'childrenQueueName',
      opts: { failParentOnFailure: true },
      children: [
        {
          name,
          data: { idx: 1, foo: 'bah' },
          queueName: 'grandChildrenQueueName',
          opts: { failParentOnFailure: true },
        },
        {
          name,
          data: { idx: 2, foo: 'baz' },
          queueName: 'grandChildrenQueueName',
          // failParentOnFailure なし: この子の失敗は親に影響しない
        },
      ],
    },
    {
      name,
      data: { idx: 3, foo: 'foo' },
      queueName: 'childrenQueueName',
      // failParentOnFailure なし: この子の失敗は親に影響しない
    },
  ],
});
```

## キーポイント

| ポイント | 説明 |
|----------|------|
| 選択的適用 | `failParentOnFailure: true` を持つ子ジョブのみが親の失敗をトリガーする |
| 再帰的動作 | 親にも `failParentOnFailure: true` が設定されている場合、失敗は祖父母以上に伝播する |
| 即時効果 | 対象の子ジョブが失敗した時点で親ジョブは遅延的に failed 状態に移行する |

## 動作の仕組み

- grandchild-job-1 が失敗 → child-job-1 が失敗（`failParentOnFailure: true`）→ root-job も失敗（child-job-1 も `failParentOnFailure: true`）
- grandchild-job-2 が失敗 → child-job-1 は影響なし（grandchild-job-2 に `failParentOnFailure` 未設定）
- child-job-2 が失敗 → root-job は影響なし（child-job-2 に `failParentOnFailure` 未設定）

## 注意点

- 子ジョブが失敗すると、親ジョブは遅延的に failed 状態に移行します。Worker が親ジョブを処理する際に `UnrecoverableError`（メッセージ: "child {childKey} failed"）が発生します
- このオプションは再帰的に検証されるため、設定に応じて祖父母以上も失敗する可能性があります
- 親ジョブの成功が特定の子ジョブに厳密に依存するワークフローで特に有用です

## 関連

- [./flows.md](./flows.md) — FlowProducer の基本
- [./continue-parent.md](./continue-parent.md) — 親ジョブの継続処理
- [./remove-dependency.md](./remove-dependency.md) — 依存関係の削除
- [./ignore-dependency.md](./ignore-dependency.md) — 依存関係の無視
