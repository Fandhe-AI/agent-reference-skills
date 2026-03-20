# Events

BullMQ のすべてのクラスは `EventEmitter` を継承しており、ジョブのライフサイクルに関するイベントを発行します。Worker のローカルイベントと、`QueueEvents` クラスによるグローバル監視の2種類の方法でイベントをリスンできます。

## ローカル Worker イベント

Worker はローカルで処理したジョブに関するイベントを発行します:

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

myQueue.on('waiting', (job: Job) => {
  // Job is waiting to be processed.
});
```

```typescript
import { Worker } from 'bullmq';

const myWorker = new Worker('Paint');

myWorker.on('drained', () => {
  // Queue is drained, no more jobs left
});

myWorker.on('completed', (job: Job) => {
  // job has completed
});

myWorker.on('failed', (job: Job) => {
  // job has failed
});
```

## グローバルイベント監視（QueueEvents）

すべての Worker からのイベントを一箇所でリスンするには `QueueEvents` クラスを使用します:

```typescript
import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('Paint');

queueEvents.on('completed', ({ jobId }) => {
  // Called every time a job is completed in any worker.
});

queueEvents.on(
  'progress',
  ({ jobId, data }: { jobId: string; data: number | object }) => {
    // jobId received a progress event
  },
);
```

## 主な Worker イベント

| Event | Description |
|-------|-------------|
| waiting | ジョブが処理待ちキューに入った |
| completed | ジョブが正常に完了した |
| failed | ジョブがエラーで失敗した |
| progress | ジョブの進捗が更新された |
| drained | キューにジョブがなくなった |
| error | Worker でエラーが発生した |

## Redis Streams ベースの実装

`QueueEvents` は Redis Streams を使用して実装されており、標準的な pub-sub と異なり、ネットワーク切断時にもイベントが失われない保証があります。

イベントストリームは自動的にトリミングされ、デフォルトで約10,000件のイベントが保持されます。この上限は `streams.events.maxLen` オプションで変更できます。

## 手動イベントトリミング

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('paint');

await queue.trimEvents(10); // 最新10件のイベントのみ残す
```

## 注意点

- ローカルイベントは各 Worker が処理したジョブのみ対象です
- すべての Worker のイベントを一元監視する場合は `QueueEvents` を使用してください
- イベントストリームのサイズはデフォルトで約10,000件に自動トリミングされます
- `trimEvents()` で手動トリミングも可能です

## 関連

- [./create-custom-events.md](./create-custom-events.md) — カスタムイベントの作成
