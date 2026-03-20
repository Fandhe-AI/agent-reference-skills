# BullMQ — Repeatable Jobs

Repeatable ジョブは、一度キューに追加するだけで事前定義されたスケジュールに従い繰り返し実行される特別なメタジョブです。cron 式またはミリ秒間隔で繰り返しパターンを指定できます。

> **Note:** BullMQ バージョン 5.16.0 以降では、これらの API は非推奨となり、より堅牢な [Job Schedulers](../job-schedulers/job-schedulers.md) が推奨されています。

## 基本的な使い方

`repeat` オプションを指定してジョブを追加すると、Repeatable Job 設定と最初の遅延ジョブが即座に作成されます。

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

// 毎日 3:15（午前）に実行
await myQueue.add(
  'submarine',
  { color: 'yellow' },
  {
    repeat: {
      pattern: '0 15 3 * * *',
    },
  },
);

// 10秒ごとに実行（最大100回）
await myQueue.add(
  'bird',
  { color: 'bird' },
  {
    repeat: {
      every: 10000,
      limit: 100,
    },
  },
);
```

## repeat オプション

| Name | Type | Description |
|------|------|-------------|
| `pattern` | `string` | cron 式（cron-parser の "unix cron w/ optional seconds" 形式） |
| `every` | `number` | 繰り返し間隔（ミリ秒） |
| `limit` | `number` | 最大繰り返し回数 |
| `key` | `string` | カスタム Repeatable キー（同じ repeat オプションのジョブを区別する） |

## Repeatable ジョブの削除

```typescript
import { Queue } from 'bullmq';

const repeat = { pattern: '*/1 * * * * *' };
const myQueue = new Queue('Paint');

const job1 = await myQueue.add('red', { foo: 'bar' }, { repeat });
const job2 = await myQueue.add('blue', { foo: 'baz' }, { repeat });

// repeatJobKey で削除
const isRemoved1 = await myQueue.removeRepeatableByKey(job1.repeatJobKey);

// ジョブ名と repeat オプションで削除
const isRemoved2 = await myQueue.removeRepeatable('blue', repeat);
```

## Repeatable ジョブの一覧取得

```typescript
const repeatableJobs = await myQueue.getRepeatableJobs();
```

## カスタム Repeatable キー

同じ repeat オプションを持つジョブを区別するためにカスタムキーを使用できます。

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint', { connection });

await myQueue.add(
  'bird',
  { color: 'gray' },
  {
    repeat: {
      every: 10_000,
      key: 'colibri',
    },
  },
);

await myQueue.add(
  'bird',
  { color: 'brown' },
  {
    repeat: {
      every: 10_000,
      key: 'eagle',
    },
  },
);
```

### カスタムキーによる既存ジョブの更新

同じキーで新しい repeatable ジョブを追加すると、既存の設定が更新されます。

```typescript
// 間隔を10秒から25秒に変更
await myQueue.add(
  'bird',
  { color: 'turquoise' },
  {
    repeat: {
      every: 25_000,
      key: 'eagle',
    },
  },
);
```

## カスタム Repeat Strategy

デフォルトの cron-parser ベースの戦略を変更し、独自のスケジューリングロジック（例: RRULE）を定義できます。

```typescript
import { Queue, Worker } from 'bullmq';
import { rrulestr } from 'rrule';

const settings = {
  repeatStrategy: (millis, opts) => {
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
const worker = new Worker(
  'Paint',
  async () => {
    doSomething();
  },
  { settings },
);
```

## 遅い Repeatable ジョブ

繰り返し頻度よりもジョブの処理時間が長い場合、ワーカー数が不足すると期待通りの頻度で処理されないことがあります。例えば 1 秒ごとのジョブで処理に 5 秒かかる場合、5 台のワーカーが必要です。

## 注意点

- BullMQ は同じ repeat オプションの重複した repeatable ジョブを追加しない
- ワーカーが稼働していない間、repeatable ジョブは蓄積されない
- Repeatable Job 設定はジョブではないため `getJobs()` には表示されない。管理には `getRepeatableJobs()` を使用する
- `repeatStrategy` 設定は Queue と Worker の両方に提供する必要がある（初回はキューで次回タイミングを計算し、以降はワーカーが引き継ぐため）
- repeat strategy 関数はオプションの第3引数として `jobName` を受け取る
- repeatable ジョブの `jobId` は一意 ID の生成に使用される（通常のジョブとは異なる動作）

## 関連

- [../job-schedulers/job-schedulers.md](../job-schedulers/job-schedulers.md)
- [Delayed](./delayed.md)
- [FIFO](./fifo.md)
