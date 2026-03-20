# BullMQ — Repeat Options

すべての Job Scheduler で使用可能な繰り返しオプションについて解説します。これらのオプションで繰り返しの開始・終了日時、回数制限、即時実行などを制御できます。

## オプション一覧

| Name | Type | Description |
|------|------|-------------|
| `every` | `number` | 繰り返し間隔（ミリ秒） |
| `pattern` | `string` | cron 式 |
| `startDate` | `Date` | スケジュール開始日。この日以降からジョブが生成される |
| `endDate` | `Date` | スケジュール終了日。この日以降はジョブが生成されない |
| `limit` | `number` | 最大繰り返し回数。この回数に達すると以降のジョブは生成されない |
| `immediately` | `boolean` | 即時実行（非推奨: v5.19.0 以降はデフォルトで即時実行） |

## Start Date（開始日）

将来の日付を指定し、その日からスケジュールを開始します。

```typescript
const { Queue } = require('bullmq');
const connection = { host: 'localhost', port: 6379 };
const myQueue = new Queue('my-dated-jobs', { connection });

await myQueue.upsertJobScheduler(
  'start-later-job',
  {
    every: 60000, // 毎分
    startDate: new Date('2024-10-15T00:00:00Z'),
  },
  {
    name: 'timed-start-job',
    data: { message: 'Starting later' },
  },
);
```

## End Date（終了日）

ジョブの繰り返しを終了する日を指定します。

```typescript
await myQueue.upsertJobScheduler(
  'end-soon-job',
  {
    every: 60000,
    endDate: new Date('2024-11-01T00:00:00Z'),
  },
  {
    name: 'timed-end-job',
    data: { message: 'Ending soon' },
  },
);
```

## Limit（回数制限）

繰り返し回数を制限します。count がこの制限に達すると、それ以上のジョブは生成されません。

```typescript
await myQueue.upsertJobScheduler(
  'limited-job',
  {
    every: 10000, // 10秒ごと
    limit: 10,    // 最大10回
  },
  {
    name: 'limited-execution-job',
    data: { message: 'Limited runs' },
  },
);
```

## Immediately（即時実行）

スケジュールに関係なく、追加直後にジョブを実行します。

```typescript
await myQueue.upsertJobScheduler(
  'immediate-job',
  {
    every: 86400000, // 1日1回
    immediately: true,
  },
  {
    name: 'instant-job',
    data: { message: 'Immediate start' },
  },
);
```

> **Note:** `every` オプションは固定時間間隔に基づいてスケジュールされます。例えば 2000ms の間隔を設定すると、ジョブはクロックの偶数秒（0, 2, 4, 6, 8...）にトリガーされます。`immediately` を使うと、間隔のアラインメントに関係なく最初のジョブが即座に実行されます。

## 注意点

- バージョン 5.19.0 以降、`immediately` オプションは非推奨。新規挿入された Job Scheduler の最初の繰り返しは常に即時実行される（既存スケジューラの `upsertJobScheduler` は `every` 間隔に従う）
- `startDate` と `endDate` を組み合わせることで、特定期間のみ有効なスケジュールを設定できる
- `limit` に達した後は、そのスケジューラからジョブは生成されなくなる
- 月次など長い間隔を設定した場合、`immediately` なしでは月初まで待機する必要があった（v5.19.0 以前）

## 関連

- [Job Schedulers](./job-schedulers.md)
- [Repeat Strategies](./repeat-strategies.md)
- [Manage Job Schedulers](./manage-job-schedulers.md)
