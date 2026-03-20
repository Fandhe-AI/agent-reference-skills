# BullMQ — Deduplication

BullMQ のデデュプリケーション（重複排除）は、特定の識別子に基づいてジョブの実行を制御し、指定期間内またはジョブ完了/失敗まで同じ識別子の新しいジョブがキューに追加されないようにする機能です。重複追加の試行時には `deduplicated` イベントが発火します。

## Simple モード

Simple モードでは、ジョブの完了または失敗まで重複排除が継続します。ジョブが未完了の間、同じ deduplication ID を持つ後続のジョブは無視されます。

```typescript
// ジョブが完了/失敗するまで重複排除される
await myQueue.add(
  'house',
  { color: 'white' },
  { deduplication: { id: 'customValue' } },
);
```

## Throttle モード

Throttle モードでは、TTL（Time to Live）を指定して一定期間内の重複を防止します。

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

// 5秒間の重複排除
await myQueue.add(
  'house',
  { color: 'white' },
  { deduplication: { id: 'customValue', ttl: 5000 } },
);
```

## Debounce モード

Debounce モードは `delay` と `ttl` を組み合わせ、`extend` と `replace` オプションを `true` にすることで実現します。同じ deduplication ID のジョブが追加されると、前のジョブを新しいジョブで置き換え、TTL もリセットされます。

```typescript
import { Queue, Worker } from 'bullmq';

const myQueue = new Queue('Paint');

const worker = new Worker('Paint', async () => {});

worker.once('completed', job => {
  console.log(job.data.color); // `white 10`
});

// Debounce モードで10件のジョブを追加
for (let i = 1; i < 11; i++) {
  await myQueue.add(
    'house1',
    { color: `white ${i}` },
    {
      deduplication: {
        id: 'customValue',
        ttl: 5000,
        extend: true,
        replace: true,
      },
      delay: 5000,
    },
  );
}
```

## deduplication オプション

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | 重複排除の識別子。ジョブデータのハッシュやサブセットで生成 |
| `ttl` | `number` | Throttle/Debounce モードでの有効期間（ミリ秒） |
| `extend` | `boolean` | TTL を延長するかどうか（Debounce モード用） |
| `replace` | `boolean` | 既存ジョブを新しいジョブで置き換えるか（Debounce モード用） |

## Deduplicated イベント

重複排除が発生した際に `QueueEvents` クラスから `deduplicated` イベントを受信できます。

```typescript
import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('myQueue');

queueEvents.on(
  'deduplicated',
  ({ jobId, deduplicationId, deduplicatedJobId }, id) => {
    console.log(
      `Job ${deduplicatedJobId} was deduplicated due to existing job ${jobId} with deduplication ID ${deduplicationId}`,
    );
  },
);
```

## Deduplication Job ID の取得

```typescript
const jobId = await myQueue.getDeduplicationJobId('customValue');
```

## Deduplication キーの削除

TTL 終了前やジョブ完了前に重複排除を停止したい場合は、キーを手動で削除できます。

```typescript
// キューから削除
await myQueue.removeDeduplicationKey('customValue');

// 特定のジョブから削除
const isRemoved = await job.removeDeduplicationKey();
```

## 注意点

- 手動でジョブを削除（`job.remove()` の呼び出し）すると重複排除が無効になる
- deduplication ID はジョブを一意に表す識別子として設計すること（ジョブデータ全体またはサブセットのハッシュなど）
- Simple モードは長時間実行ジョブや重複実行を防ぎたい重要な処理に適している
- Throttle モードは短時間に大量の同一リクエストが発生するシナリオに適している
- Debounce モードは最新のデータのみを処理したい場合に適している

## 関連

- [Job IDs](./job-ids.md)
- [Delayed](./delayed.md)
- [Jobs](./jobs.md)
