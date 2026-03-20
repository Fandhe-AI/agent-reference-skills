# Stop Retrying Jobs

回復不可能なエラーが発生した場合にリトライを停止するパターン。`UnrecoverableError` をスローすることで、`attempts` 設定に関わらずジョブを即座に failed にする。

## 基本的な使い方

```typescript
import { Worker, UnrecoverableError } from 'bullmq';

const worker = new Worker(
  'foo',
  async job => {
    doSomeProcessing();
    throw new UnrecoverableError('Unrecoverable');
  },
  { connection },
);

await queue.add(
  'test-retry',
  { foo: 'bar' },
  {
    attempts: 3,
    backoff: 1000,
  },
);
```

## レート制限時のジョブ失敗

`RateLimitError` によるリトライは `attempts` チェックを無視する（レート制限は真のエラーとみなされないため）。手動で attempts をチェックしてリトライを停止するには `job.attemptsStarted` を使用する。

```typescript
import { Worker, RateLimitError, UnrecoverableError } from 'bullmq';

const worker = new Worker(
  'myQueue',
  async job => {
    const [isRateLimited, duration] = await doExternalCall();
    if (isRateLimited) {
      await queue.rateLimit(duration);
      if (job.attemptsStarted >= job.opts.attempts) {
        throw new UnrecoverableError('Unrecoverable');
      }
      // RateLimitError をスローしてジョブを wait に戻す
      throw new RateLimitError();
    }
  },
  {
    connection,
    limiter: {
      max: 1,
      duration: 500,
    },
  },
);
```

## 注意点

- `job.attemptsMade` は `RateLimitError`, `DelayedError`, `WaitingChildrenError` 以外のエラーでインクリメントされる
- `job.attemptsStarted` はジョブが active に移動するたびにインクリメントされる
- `UnrecoverableError` は `attempts` の設定を完全にオーバーライドする

## 関連

- [Rate Limit API Reference](https://api.docs.bullmq.io/classes/v5.Queue.html#ratelimit)
- [./manual-retrying.md](./manual-retrying.md)
- [./idempotent-jobs.md](./idempotent-jobs.md)
