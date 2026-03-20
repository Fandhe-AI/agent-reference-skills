# Process Step Jobs

プロセッサ関数をステップに分割し、各ステップの完了状態を保存しながら処理を進めるパターン。障害時に途中のステップから再開できる。

## 基本的なステップ処理

switch 文を使い、ステップごとに処理を分岐する。各ステップ完了時に `job.updateData` で次のステップを保存することで、リトライ時に正しいステップから再開できる。

```typescript
enum Step {
  Initial,
  Second,
  Finish,
}

const worker = new Worker(
  'queueName',
  async job => {
    let step = job.data.step;
    while (step !== Step.Finish) {
      switch (step) {
        case Step.Initial: {
          await doInitialStepStuff();
          await job.updateData({
            step: Step.Second,
          });
          step = Step.Second;
          break;
        }
        case Step.Second: {
          await doSecondStepStuff();
          await job.updateData({
            step: Step.Finish,
          });
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
```

## ステップ間の遅延

`moveToDelayed` と `DelayedError` を使って、ステップ間に遅延を挿入できる。

```typescript
import { DelayedError, Worker } from 'bullmq';

enum Step {
  Initial,
  Second,
  Finish,
}

const worker = new Worker(
  'queueName',
  async (job: Job, token?: string) => {
    let step = job.data.step;
    while (step !== Step.Finish) {
      switch (step) {
        case Step.Initial: {
          await doInitialStepStuff();
          await job.moveToDelayed(Date.now() + 200, token);
          await job.updateData({
            step: Step.Second,
          });
          throw new DelayedError();
        }
        case Step.Second: {
          await doSecondStepStuff();
          await job.updateData({
            step: Step.Finish,
          });
          step = Step.Finish;
        }
        default: {
          throw new Error('invalid step');
        }
      }
    }
  },
  { connection },
);
```

## 子ジョブの待機 (Waiting Children)

ランタイムで子ジョブを追加し、その完了を待つパターン。`moveToWaitingChildren` と `WaitingChildrenError` を使用する。

```typescript
import { WaitingChildrenError, Worker } from 'bullmq';

enum Step {
  Initial,
  Second,
  Third,
  Finish,
}

const worker = new Worker(
  'parentQueueName',
  async (job: Job, token?: string) => {
    let step = job.data.step;
    while (step !== Step.Finish) {
      switch (step) {
        case Step.Initial: {
          await doInitialStepStuff();
          await childrenQueue.add(
            'child-1',
            { foo: 'bar' },
            {
              parent: {
                id: job.id,
                queue: job.queueQualifiedName,
              },
            },
          );
          await job.updateData({
            step: Step.Second,
          });
          step = Step.Second;
          break;
        }
        case Step.Second: {
          await doSecondStepStuff();
          await childrenQueue.add(
            'child-2',
            { foo: 'bar' },
            {
              parent: {
                id: job.id,
                queue: job.queueQualifiedName,
              },
            },
          );
          await job.updateData({
            step: Step.Third,
          });
          step = Step.Third;
          break;
        }
        case Step.Third: {
          const shouldWait = await job.moveToWaitingChildren(token);
          if (!shouldWait) {
            await job.updateData({
              step: Step.Finish,
            });
            step = Step.Finish;
            return Step.Finish;
          } else {
            throw new WaitingChildrenError();
          }
        }
        default: {
          throw new Error('invalid step');
        }
      }
    }
  },
  { connection },
);
```

## フローのチェイン

`FlowProducer` を使ってランタイムでフローを追加し、子ジョブの完了を待つ。

```typescript
import { FlowProducer, WaitingChildrenError, Worker } from 'bullmq';

enum Step {
  Initial,
  Second,
  Third,
  Finish,
}

const flow = new FlowProducer({ connection });
const worker = new Worker(
  'parentQueueName',
  async (job, token) => {
    let step = job.data.step;
    while (step !== Step.Finish) {
      switch (step) {
        case Step.Initial: {
          await doInitialStepStuff();
          await flow.add({
            name: 'child-job',
            queueName: 'childrenQueueName',
            data: {},
            children: [
              {
                name,
                data: { idx: 0, foo: 'bar' },
                queueName: 'grandchildrenQueueName',
              },
              {
                name,
                data: { idx: 1, foo: 'baz' },
                queueName: 'grandchildrenQueueName',
              },
            ],
            opts: {
              parent: {
                id: job.id,
                queue: job.queueQualifiedName,
              },
            },
          });

          await job.updateData({
            step: Step.Second,
          });
          step = Step.Second;
          break;
        }
        case Step.Second: {
          await doSecondStepStuff();
          await job.updateData({
            step: Step.Third,
          });
          step = Step.Third;
          break;
        }
        case Step.Third: {
          const shouldWait = await job.moveToWaitingChildren(token);
          if (!shouldWait) {
            await job.updateData({
              step: Step.Finish,
            });
            step = Step.Finish;
            return Step.Finish;
          } else {
            throw new WaitingChildrenError();
          }
        }
        default: {
          throw new Error('invalid step');
        }
      }
    }
  },
  { connection },
);
```

## 注意点

- 特殊エラー（`DelayedError`, `RateLimitError`, `WaitingChildrenError`, `WaitingError`）による手動移動は `attemptsMade` をインクリメントしない
- ジョブの処理開始回数を制御するには `maxStartedAttempts` オプションを使用する
- 各ステップ完了後に必ず `job.updateData` でステップ情報を保存すること。そうしないとリトライ時に最初から再実行される

## 関連

- [Move To Delayed API Reference](https://api.docs.bullmq.io/classes/v5.Job.html#movetodelayed)
- [Move To Waiting Children API Reference](https://api.docs.bullmq.io/classes/v5.Job.html#movetowaitingchildren)
- [./flows.md](./flows.md)
- [./manual-retrying.md](./manual-retrying.md)
