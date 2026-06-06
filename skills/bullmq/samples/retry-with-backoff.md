# Retry with Backoff

失敗したジョブを指数バックオフで自動リトライする設定。

```typescript
import { Queue, Worker } from 'bullmq';

const myQueue = new Queue('foo', {
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});

// デフォルト設定が適用される
await myQueue.add('test-retry', { foo: 'bar' });

// ジョブ個別に上書きも可能
await myQueue.add(
  'important-job',
  { foo: 'bar' },
  {
    attempts: 5,
    backoff: {
      type: 'fixed',
      delay: 2000,
      jitter: 0.5, // 1000ms〜2000ms のランダム遅延
    },
  },
);

const worker = new Worker('foo', async job => {
  // プロセッサが例外を throw するとリトライされる
  await doSomeProcessing(job.data);
});
```

## Notes

- `attempts` は初回試行を含む最大試行回数（`attempts: 3` = 最大 3 回実行）
- `exponential` バックオフは `2^(attemptsMade - 1) * delay` ミリ秒で遅延が増加する
- `jitter` は 0〜1 の範囲で指定し、サンダリングハード防止のためにランダム遅延を加える
- `backoffStrategy` が `-1` を返すとリトライせず即座に failed 状態に移行する
