# Throttle Jobs

頻繁に発生するイベントに対してジョブのスロットリングを行うパターン。同一の `jobId` を指定することで、重複ジョブの追加を防止する。

## 基本的な使い方

`jobId` を同一にすることで、既に存在するジョブと「同一」とみなされキューに追加されない。

```typescript
import { Job, Queue, Worker } from 'bullmq';

const myQueue = new Queue('Paint');

const worker = new Worker('Paint', async (job: Job) => {
  console.log('Do something with job');
  return 'some value';
});

worker.on('completed', (job: Job, returnvalue: any) => {
  console.log('worker done painting', new Date());
});

worker.on('failed', (job: Job, error: Error) => {
  console.error('worker fail painting', job, error, new Date());
});

// delay と同一 jobId を組み合わせて、最初の1件のみ実行
myQueue.add('house', { color: 'white' }, { delay: 1000, jobId: 'house' });
myQueue.add('house', { color: 'white' }, { delay: 1000, jobId: 'house' });
myQueue.add('house', { color: 'white' }, { delay: 1000, jobId: 'house' });
myQueue.add('house', { color: 'white' }, { delay: 1000, jobId: 'house' });
myQueue.add('house', { color: 'white' }, { delay: 1000, jobId: 'house' });
myQueue.add('house', { color: 'white' }, { delay: 1000, jobId: 'house' });
myQueue.add('house', { color: 'white' }, { delay: 1000, jobId: 'house' });
```

## 注意点

- `jobId` のユニーク性の保証は開発者の責任
- `removeOnComplete` / `removeOnFailed` を使用している場合、削除されたジョブは「既存」とみなされないため、同じ `jobId` の新しいジョブが重複として検出されずに追加される可能性がある
- より高度な重複排除が必要な場合は [deduplication パターン](./deduplication.md) を検討する

## 関連

- [./deduplication.md](./deduplication.md)
- [./idempotent-jobs.md](./idempotent-jobs.md)
