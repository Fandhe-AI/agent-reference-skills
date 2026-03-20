# BullMQ — Repeat Strategies

BullMQ には Repeatable ジョブを作成するための2つの定義済み戦略（every と cron）があり、さらにカスタム戦略を定義することも可能です。

## "Every" 戦略

指定したミリ秒間隔でジョブを繰り返し生成するシンプルな戦略です。

```typescript
const { Queue, Worker } = require('bullmq');

const connection = { host: 'localhost', port: 6379 };
const myQueue = new Queue('my-repeatable-jobs', { connection });

// 10秒ごとにジョブを繰り返し
await myQueue.upsertJobScheduler(
  'repeat-every-10s',
  {
    every: 10000,
  },
  {
    name: 'every-job',
    data: { jobData: 'data' },
    opts: {},
  },
);

const worker = new Worker(
  'my-repeatable-jobs',
  async job => {
    console.log(`Processing job ${job.id} with data: ${job.data.jobData}`);
  },
  { connection },
);
```

## "Cron" 戦略

[cron-parser](https://www.npmjs.com/package/cron-parser) ライブラリを使用した cron 式によるスケジューリングです。自動レポートやメンテナンスタスクなど、正確な時刻での実行に最適です。

### cron 式のフォーマット

```
*    *    *    *    *    *
|    |    |    |    |    |
|    |    |    |    |    +-- day of week (0-7, 1L-7L, 0 or 7 = Sunday)
|    |    |    |    +------- month (1-12)
|    |    |    +------------ day of month (1-31, L = last day)
|    |    +----------------- hour (0-23)
|    +---------------------- minute (0-59)
+--------------------------- second (0-59, optional)
```

```typescript
const { Queue, Worker } = require('bullmq');

const connection = { host: 'localhost', port: 6379 };
const myQueue = new Queue('my-cron-jobs', { connection });

// 月~金 毎朝 9:00 に実行
await myQueue.upsertJobScheduler(
  'weekday-morning-job',
  {
    pattern: '0 0 9 * * 1-5',
  },
  {
    name: 'cron-job',
    data: { jobData: 'morning data' },
    opts: {},
  },
);

const worker = new Worker(
  'my-cron-jobs',
  async job => {
    console.log(
      `Processing job ${job.id} at ${new Date()} with data: ${job.data.jobData}`,
    );
  },
  { connection },
);
```

## カスタム戦略

独自のスケジューリングロジックを定義できます。repeat strategy は pattern と最新ジョブのミリ秒に基づいて次のタイムスタンプを返します。1つのキューにつき1つの `repeatStrategy` のみ定義可能です。

RRULE を使用したカスタム戦略の例:

```typescript
import { Queue, Worker } from 'bullmq';
import { rrulestr } from 'rrule';

const settings = {
  repeatStrategy: (millis: number, opts: RepeatOptions, _jobName: string) => {
    const currentDate =
      opts.startDate && new Date(opts.startDate) > new Date(millis)
        ? new Date(opts.startDate)
        : new Date(millis);

    const rrule = rrulestr(opts.pattern);

    if (rrule.origOptions.count && !rrule.origOptions.dtstart) {
      throw new Error('DTSTART must be defined to use COUNT with rrule');
    }

    const next_occurrence = rrule.after(currentDate, false);
    return next_occurrence?.getTime();
  },
};

const myQueue = new Queue('Paint', { settings });

await myQueue.upsertJobScheduler(
  'collibris',
  {
    pattern: 'RRULE:FREQ=SECONDLY;INTERVAL=10;WKST=MO',
  },
  {
    data: { color: 'green' },
  },
);

await myQueue.upsertJobScheduler(
  'pingeons',
  {
    pattern: 'RRULE:FREQ=SECONDLY;INTERVAL=20;WKST=MO',
  },
  {
    data: { color: 'gray' },
  },
);

const worker = new Worker(
  'Paint',
  async () => {
    doSomething();
  },
  { settings },
);
```

## 注意点

- cron 式はタイムゾーンの違いや夏時間の切り替えをシームレスに処理できる
- cron 式のオプションの秒フィールドにより、標準 cron より精密なスケジューリングが可能
- `repeatStrategy` 設定は Queue と Worker の**両方**に提供する必要がある（初回はキューで次回タイミングを計算し、以降はワーカーが引き継ぐため）
- 1つのキューにつき1つの `repeatStrategy` のみ定義可能

## 関連

- [Job Schedulers](./job-schedulers.md)
- [Repeat Options](./repeat-options.md)
- [Manage Job Schedulers](./manage-job-schedulers.md)
