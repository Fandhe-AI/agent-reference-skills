# Priority Jobs

priority オプションで処理順序を制御し、重要なジョブを優先して処理する。

```typescript
import { Queue, Worker } from 'bullmq';

const myQueue = new Queue('Paint');

// 優先度を指定: 小さい値ほど高優先度
await myQueue.add('wall', { color: 'pink' }, { priority: 10 });
await myQueue.add('wall', { color: 'brown' }, { priority: 5 });
await myQueue.add('wall', { color: 'blue' }, { priority: 7 });
// 処理順: brown (5) → blue (7) → pink (10)

// priority 未指定のジョブは最高優先度として扱われる
await myQueue.add('urgent', { color: 'red' }); // 最初に処理される

// 追加後に優先度を変更する
const job = await myQueue.add('task', { foo: 'bar' }, { priority: 16 });
await job.changePriority({ priority: 1 });

const worker = new Worker('Paint', async job => {
  console.log(`Processing: ${job.data.color}`);
});
```

## Notes

- priority の範囲は 1〜2,097,152 で、値が小さいほど高優先度
- priority 未指定のジョブは priority 指定ジョブより先に処理される
- 同じ priority のジョブは FIFO 順で処理される
- 優先度付きジョブの追加は O(log n) の計算量がかかる（通常の FIFO より遅い）
