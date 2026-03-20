# Job Ids

BullMQ はデフォルトで一意なジョブ ID を自動生成するが、`jobId` オプションでカスタム ID を指定することも可能。カスタム ID は重複排除やべき等性の実装に利用できる。

## 基本的な使い方

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('my-queue');

// カスタム ID を指定
await queue.add('my-job', { foo: 'bar' }, { jobId: 'custom-id-123' });
```

## 重複排除

同じ `jobId` のジョブが既にキューに存在する場合、新しいジョブは無視され `duplicated` イベントが発行される。

```typescript
await queue.add('my-job', { data: 1 }, { jobId: 'unique-1' });
await queue.add('my-job', { data: 2 }, { jobId: 'unique-1' }); // 無視される

// QueueEvents で重複を検知
const queueEvents = new QueueEvents('my-queue');
queueEvents.on('duplicated', ({ jobId }) => {
  console.log(`Job ${jobId} was duplicated`);
});
```

## 注意点

- ジョブ ID にコロン `:` を含めることはできない（内部的にセパレータとして使用）
- `removeOnComplete` / `removeOnFail` で削除されたジョブの ID は再利用可能
- カスタム ID を使う場合、一意性の管理はアプリケーション側の責任
- Flow 内のジョブに `jobId` を指定する場合もコロン制約に注意

## 関連

- [Deduplication](./deduplication.md)
- [Auto-removal of jobs](../queues/auto-removal-of-jobs.md)
- [Jobs](./jobs.md)
