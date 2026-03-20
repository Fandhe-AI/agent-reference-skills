# FIFO

FIFO（First-In, First-Out）は BullMQ のデフォルトのジョブ処理順序。ジョブは追加された順番に処理される。

## 基本的な使い方

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('my-queue');

// FIFO はデフォルト動作のため、特別なオプションは不要
await queue.add('job1', { data: 'first' });
await queue.add('job2', { data: 'second' });
await queue.add('job3', { data: 'third' });

// 処理順序: job1 → job2 → job3
```

## defaultJobOptions での設定

```typescript
const queue = new Queue('my-queue', {
  defaultJobOptions: {
    removeOnComplete: true,
  },
});
```

## 注意点

- FIFO はデフォルト動作のため、明示的な設定は不要
- 遅延ジョブや優先度付きジョブを追加すると、厳密な FIFO 順序は崩れる
- 複数ワーカーが並行処理する場合、個々のジョブの完了順序は FIFO とは限らない

## 関連

- [LIFO](./lifo.md)
- [Prioritized](./prioritized.md)
- [Jobs](./jobs.md)
