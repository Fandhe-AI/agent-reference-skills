# Step Jobs

ジョブの処理をステップに分割し、障害時に途中のステップから再開できるパターン。

```typescript
import { Worker } from 'bullmq';

enum Step {
  Initial,
  Second,
  Finish,
}

const worker = new Worker(
  'queueName',
  async job => {
    let step = job.data.step ?? Step.Initial;

    while (step !== Step.Finish) {
      switch (step) {
        case Step.Initial: {
          await doInitialStepStuff();
          // 次のステップをデータに保存してから進む
          await job.updateData({ step: Step.Second });
          step = Step.Second;
          break;
        }
        case Step.Second: {
          await doSecondStepStuff();
          await job.updateData({ step: Step.Finish });
          step = Step.Finish;
          return Step.Finish;
        }
        default: {
          throw new Error('invalid step');
        }
      }
    }
  },
  { connection },
);

// ジョブ追加時に初期ステップを指定する
await queue.add('step-job', { step: Step.Initial });
```

## Notes

- 各ステップ完了直後に `job.updateData()` でステップ状態を保存する。保存前にクラッシュすると最初からやり直しになる
- `DelayedError` を throw するとステップ間に遅延を挿入できる（`attemptsMade` は増加しない）
- `WaitingChildrenError` を throw すると子ジョブの完了待ちに移行できる
- 特殊エラー（`DelayedError`, `WaitingChildrenError`）は失敗としてカウントされない
