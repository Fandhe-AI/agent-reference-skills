# LIFO

LIFO（Last-In, First-Out）はジョブを追加された逆順で処理する方式。`lifo: true` オプションで有効化する。

## 基本的な使い方

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('my-queue');

await queue.add('job1', { data: 'first' });
await queue.add('job2', { data: 'second' }, { lifo: true });

// job2 が先に処理される（最後に追加されたジョブが最優先）
```

## defaultJobOptions での設定

```typescript
const queue = new Queue('my-queue', {
  defaultJobOptions: {
    lifo: true,
  },
});

// このキューに追加される全ジョブが LIFO で処理される
await queue.add('job1', { data: 'first' });
await queue.add('job2', { data: 'second' });
// 処理順序: job2 → job1
```

## 注意点

- LIFO ジョブは待機リストの先頭に挿入される
- FIFO ジョブと LIFO ジョブを同一キューで混在可能
- 優先度付きジョブと LIFO を同時に使用する場合、優先度が先に評価される
- スタック的な処理パターン（最新データの優先処理）に有用

## 関連

- [FIFO](./fifo.md)
- [Prioritized](./prioritized.md)
- [Jobs](./jobs.md)
