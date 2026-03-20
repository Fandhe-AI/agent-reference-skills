# Manual Retrying

処理中のジョブを即座に wait 状態に戻してリトライするパターン。`moveToWait` メソッドと `WaitingError` を組み合わせて実装する。

## 基本的な使い方

```typescript
import { WaitingError, Worker } from 'bullmq';

const worker = new Worker(
  'queueName',
  async (job: Job, token?: string) => {
    try {
      await doSomething();
    } catch (error) {
      await job.moveToWait(token);
      throw new WaitingError();
    }
  },
  { connection },
);
```

## 仕組み

1. ワーカーがジョブを処理中、ジョブにはトークンによるロックがかかっている
2. `moveToWait` にトークンを渡すことでロックを解除し、ジョブを wait リストに戻す
3. `WaitingError` をスローすることで、ワーカーにジョブがリトライされたことを通知し、complete や fail の処理を行わせない

## 注意点

- `moveToWait` を呼ぶ際は、必ず処理関数の引数で受け取ったトークンを使用すること
- `WaitingError` をスローしないと、ワーカーがジョブを complete または fail として処理してしまう
- `moveToWait` による手動リトライは `attemptsMade` をインクリメントしない。`attemptsStarted` で処理開始回数を追跡できる

## 関連

- [Move To Wait API Reference](https://api.docs.bullmq.io/classes/v5.Job.html#movetowait)
- [./stop-retrying-jobs.md](./stop-retrying-jobs.md)
- [./process-step-jobs.md](./process-step-jobs.md)
