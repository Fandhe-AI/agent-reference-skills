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
| `reschedule` | `boolean` | 同じ deduplication ID の既存ジョブがまだ delayed の間だけ、新しいジョブの delay を既存ジョブに適用する（v6.7.6 の公式ページに記載） |

### reschedule オプション

`reschedule: true` を指定すると、同じ deduplication ID の既存ジョブが delayed の間に限り、新しく追加するジョブの delay が既存ジョブに適用される。`replace` と異なり、元のジョブ ID・名前・データ・その他オプションは保持される。

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

元のジョブは `{ color: 'white' }` のまま、2 回目の add のタイムスタンプから 8000 ミリ秒後に処理可能になる。delay は短縮も延長もでき、delay を省略または 0 にすると delayed ジョブは（ワーカーの空き次第で）即座に処理可能になる。

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

- `reschedule` は TTL 管理とは独立している。`ttl` と `extend: true` を組み合わせると deduplication ウィンドウも更新される。deduplication キーが期限切れの場合は通常どおり新しいジョブが追加される
- すでに delayed でないジョブは reschedule されず、既存の deduplication 動作（`keepLastIfActive` を含む）は維持される。`replace: true` も指定した場合は replace が reschedule より優先される。reschedule は通常の `deduplicated` イベントに加え、既存ジョブに対する `delayed` イベントも発火する
- changelog 上の関連項目: v6.6.0「deduplication: support schedule option (python) (elixir) (php) (rust) (dotnet)」（https://github.com/taskforcesh/bullmq/releases/tag/v6.6.0）、v6.7.6「flow: remove deduplication key that is associated with parent job that is removed (python) (elixir) (php) (rust) (dotnet)」（https://github.com/taskforcesh/bullmq/releases/tag/v6.7.6）。TypeScript 側の `reschedule` の記述は v6.7.6 の公式ガイドに基づく
- 公式ページの `reschedule` 節の先頭には PostgreSQL の obliteration / advisory lock に関する実装メモの段落が置かれている（reschedule の説明と直接の関係は薄い）。要旨: 中間バッチは選択ジョブを指す deduplication 行のみをロックし、最終バッチはキュー内の残り deduplication 行をすべてロックしてから削除する。完了・失敗はキューと直接の親キューの共有 advisory lock を取得し、obliteration は排他ロックを取得する。PostgreSQL の bulk add / flow は deduplication advisory lock をキー順に取得する。pause は処理のみを止め、add は止めない
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/jobs/deduplication.md (tag v6.7.6、取得日 2026-11-14)
- 手動でジョブを削除（`job.remove()` の呼び出し）すると重複排除が無効になる
- deduplication ID はジョブを一意に表す識別子として設計すること（ジョブデータ全体またはサブセットのハッシュなど）
- Simple モードは長時間実行ジョブや重複実行を防ぎたい重要な処理に適している
- Throttle モードは短時間に大量の同一リクエストが発生するシナリオに適している
- Debounce モードは最新のデータのみを処理したい場合に適している

## 関連

- [Job IDs](./job-ids.md)
- [Delayed](./delayed.md)
- [Jobs](./jobs.md)
