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
| `reschedule` | `boolean` | Applies the incoming job's delay to an existing job with the same deduplication ID, but only while that job is still delayed (v6.7.6 official page) |

### reschedule option

Set `reschedule: true` to apply the incoming job's delay to an existing job with the same deduplication ID, but only while that job is still delayed. Unlike `replace`, this preserves the original job ID, name, data, and other options.

```typescript
await myQueue.add(
  'house',
  { color: 'white' },
  {
    delay: 5000,
    deduplication: { id: 'house', reschedule: true },
  },
);

await myQueue.add(
  'house',
  { color: 'blue' },
  {
    delay: 8000,
    deduplication: { id: 'house', reschedule: true },
  },
);
```

The original job keeps `{ color: 'white' }` and becomes eligible for processing 8000 milliseconds after the second add's timestamp. The delay can be shortened or lengthened; an omitted or zero delay makes the delayed job eligible immediately, subject to worker availability.

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

## Notes

- Rescheduling is independent of TTL management. Combine it with `ttl` and `extend: true` to refresh the deduplication window as well. If the deduplication key has expired, a new job is added normally instead.
- Jobs that are no longer delayed are not rescheduled, and existing deduplication behavior (including `keepLastIfActive`) is preserved. If `replace: true` is also provided, replacement takes precedence over rescheduling. Rescheduling emits a `delayed` event for the existing job as well as the usual `deduplicated` event.
- Related changelog entries: v6.6.0 "deduplication: support schedule option (python) (elixir) (php) (rust) (dotnet)" (https://github.com/taskforcesh/bullmq/releases/tag/v6.6.0) and v6.7.6 "flow: remove deduplication key that is associated with parent job that is removed (python) (elixir) (php) (rust) (dotnet)" (https://github.com/taskforcesh/bullmq/releases/tag/v6.7.6). The TypeScript `reschedule` description comes from the v6.7.6 guide.
- In the official page, the `reschedule` section opens with a paragraph of PostgreSQL implementation notes (obliteration batches and advisory locks) that is only loosely related to rescheduling: intermediate obliteration batches lock only the deduplication rows pointing to their selected jobs, while the final batch locks all remaining queue deduplication rows before deleting jobs; completion and failure take a shared advisory lock for the queue and the direct parent's queue, obliteration takes the exclusive one; PostgreSQL bulk adds and flows acquire deduplication advisory locks in lock-key order; pausing a queue only pauses processing, not adds.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/jobs/deduplication.md (tag v6.7.6, fetched 2026-11-14).
- Manually removing a job (calling `job.remove()`) disables its deduplication.
- Design the deduplication ID as an identifier that uniquely represents the job (for example a hash of the whole job data or a subset of it).
- Simple mode suits long-running jobs and important work that must not run twice.
- Throttle mode suits scenarios where many identical requests arrive in a short time.
- Debounce mode suits cases where only the latest data should be processed.

## Related

- [Job IDs](./job-ids.md)
- [Delayed](./delayed.md)
- [Jobs](./jobs.md)
