# BullMQ — Prioritized Jobs

ジョブに `priority` オプションを指定すると、FIFO や LIFO のパターンではなく優先度に基づいて処理順序が決定されます。優先度値が小さいほど高い優先度を示します（1 が最高優先度）。

## 基本的な使い方

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

await myQueue.add('wall', { color: 'pink' }, { priority: 10 });
await myQueue.add('wall', { color: 'brown' }, { priority: 5 });
await myQueue.add('wall', { color: 'blue' }, { priority: 7 });

// 処理順: brown (5) → blue (7) → pink (10)
```

## オプション

| Name | Type | Description |
|------|------|-------------|
| `priority` | `number` | 優先度レベル（1 ~ 2,097,152）。小さいほど高優先度 |

## 優先度の変更（changePriority）

ジョブ追加後に優先度を変更できます。

```typescript
const job = await Job.create(queue, 'test2', { foo: 'bar' }, { priority: 16 });

// 優先度を 1 に変更
await job.changePriority({
  priority: 1,
});
```

LIFO オプションと組み合わせることも可能です。

```typescript
const job = await Job.create(queue, 'test2', { foo: 'bar' }, { priority: 16 });

await job.changePriority({
  lifo: true,
});
```

## Prioritized ジョブの取得

```typescript
const jobs = await queue.getJobs(['prioritized']);

// または専用メソッド
const jobs2 = await queue.getPrioritized();
```

## 優先度別カウントの取得

```typescript
const counts = await queue.getCountsPerPriority([1, 0]);
/*
{
  '1': 11,  // priority 1 のジョブ数
  '0': 10   // priority 0（waiting）のジョブ数
}
*/
```

## 注意点

- 優先度付きジョブの追加は他のジョブタイプより遅い操作で、計算量は `O(log(n))`（n は prioritized set のジョブ数）
- 優先度の範囲は `1` ~ `2,097,152`。値が小さいほど高い優先度
- **priority が未指定のジョブは最高優先度として扱われ**、priority が指定されたジョブより先に処理される
- 同じ優先度のジョブは FIFO 順で処理される

## 関連

- [FIFO](./fifo.md)
- [LIFO](./lifo.md)
- [Getters](./getters.md)
