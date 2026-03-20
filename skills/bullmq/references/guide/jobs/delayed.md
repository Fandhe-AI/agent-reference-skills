# BullMQ — Delayed Jobs

遅延ジョブは即座に処理されず、特別な「delayed set」に入り、指定された遅延時間が経過した後に通常のジョブとして処理されます。

## 基本的な使い方

`delay` オプションにミリ秒を指定してジョブを追加します。

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

// 5秒後に処理されるジョブ
await myQueue.add('house', { color: 'white' }, { delay: 5000 });
```

## 特定の日時にスケジュール

ターゲット時刻までのミリ秒数を計算して `delay` に渡します。

```typescript
const targetTime = new Date('03-07-2035 10:30');
const delay = Number(targetTime) - Number(new Date());

await myQueue.add('house', { color: 'white' }, { delay });
```

## 遅延の変更（changeDelay）

ジョブ作成後に `changeDelay()` メソッドで遅延時間を変更できます。新しい遅延は現在時刻から再計算されます。

```typescript
const job = await Job.create(queue, 'test', { foo: 'bar' }, { delay: 2000 });

await job.changeDelay(4000);
```

## オプション

| Name | Type | Description |
|------|------|-------------|
| `delay` | `number` | 処理開始までの遅延時間（ミリ秒） |

## 注意点

- 指定した遅延時間ちょうどにジョブが処理される保証はない（ワーカーの可用性や同時遅延ジョブの数に依存する）
- `changeDelay()` は delayed 状態のジョブにのみ適用可能。他の状態のジョブに対して呼び出すとエラーになる
- BullMQ 2.0 以降、`QueueScheduler` は不要

## 関連

- [Repeatable](./repeatable.md)
- [FIFO](./fifo.md)
- [Jobs](./jobs.md)
