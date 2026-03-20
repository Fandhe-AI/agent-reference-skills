# BullMQ — Cancelling Jobs

標準の `AbortController` / `AbortSignal` API を使用して、実行中のジョブをキャンセルする機能。Worker のプロセッサ関数は第 3 引数としてオプションの `AbortSignal` を受け取れる。

## キャンセルメソッド

```typescript
// 特定のジョブをキャンセル
const cancelled = worker.cancelJob('job-id-123');

// 理由を付けてキャンセル
worker.cancelJob('job-id-456', 'User requested cancellation');

// すべてのアクティブジョブをキャンセル
worker.cancelAllJobs();
worker.cancelAllJobs('System shutdown');

// アクティブジョブの一覧を取得
const activeJobs = await queue.getActive();
```

## 推奨パターン: イベントベースのアプローチ

ポーリングではなく、`abort` イベントをリッスンする方法が推奨される。即座に応答でき、効率的で、Web API 標準（`fetch()` 等）と一貫性がある。

```typescript
const worker = new Worker('myQueue', async (job, token, signal) => {
  return new Promise((resolve, reject) => {
    signal?.addEventListener('abort', () => {
      console.log(`Job ${job.id} cancellation requested`);
      clearInterval(interval);
      reject(new Error('Job was cancelled'));
    });

    const interval = setInterval(() => {
      processNextItem();
    }, 100);
  });
});
```

## ネイティブ API との統合

`signal` を直接 `fetch()` 等のネイティブ API に渡すことで、ネットワーク/プロトコルレベルで操作をキャンセルできる。

```typescript
const worker = new Worker('fetchQueue', async (job, token, signal) => {
  return new Promise(async (resolve, reject) => {
    signal?.addEventListener('abort', () => {
      reject(new Error('Job was cancelled'));
    });

    const response = await fetch(job.data.url, {
      signal,
      method: 'GET',
      headers: job.data.headers,
    });

    const data = await response.json();
    resolve(data);
  });
});
```

## エラーハンドリングによるリトライ制御

```typescript
import { Worker, UnrecoverableError } from 'bullmq';

// 通常の Error: ジョブは failed 状態に移行し、attempts が残っていればリトライ
reject(new Error('Cancelled, will retry'));

// UnrecoverableError: リトライなしで永久に失敗
reject(new UnrecoverableError('Cancelled permanently'));
```

## ロック更新失敗時のキャンセル

```typescript
worker.on('lockRenewalFailed', (jobIds: string[]) => {
  console.log('Lock renewal failed for jobs:', jobIds);
  jobIds.forEach(jobId => worker.cancelJob(jobId));
});
```

## 注意点

- この機能は完全に後方互換。`signal` パラメータを持たない既存のプロセッサはそのまま動作する
- `cancelJob` は Worker がそのジョブを処理中の場合にのみ有効
- `UnrecoverableError` を使用すると、リトライせずにジョブを即座に失敗させることができる

## 関連

- [Workers](./workers.md)
- [Stalled Jobs](./stalled-jobs.md)
- [Graceful Shutdown](./graceful-shutdown.md)
