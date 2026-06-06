# Queue Events

QueueEvents で全 Worker のイベントを一元監視し、ジョブの完了・失敗・進捗を追跡する。

```typescript
import { Queue, QueueEvents, Worker } from 'bullmq';

const queue = new Queue('Paint');
const queueEvents = new QueueEvents('Paint');

// グローバルイベント: 全 Worker のイベントを集約する
queueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(`Job ${jobId} completed with result:`, returnvalue);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.log(`Job ${jobId} failed:`, failedReason);
});

queueEvents.on('progress', ({ jobId, data }) => {
  console.log(`Job ${jobId} progress:`, data);
});

// Worker 側でローカルイベントをリスンする場合
const worker = new Worker('Paint', async job => {
  // 進捗を報告する
  await job.updateProgress(50);
  await doSomeWork();
  await job.updateProgress(100);
  return { result: 'done' };
});

worker.on('completed', job => console.log(`Local: ${job.id} completed`));
worker.on('failed', (job, err) => console.log(`Local: ${job?.id} failed`));
worker.on('drained', () => console.log('Queue is empty'));

await queue.add('myJob', { color: 'blue' });
```

## Notes

- `QueueEvents` は Redis Streams を使用するため、ネットワーク切断時もイベントが失われない
- ローカルイベント（Worker）は自身が処理したジョブのみ対象、`QueueEvents` は全 Worker が対象
- イベントストリームはデフォルトで約 10,000 件に自動トリミングされる
- `job.updateProgress()` の引数は number または任意のオブジェクト
