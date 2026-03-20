# BullMQ — Job Schedulers

Job Scheduler は指定された repeat 設定に基づいてジョブを生成するファクトリとして機能します。固定間隔、cron 式、カスタム要件など、さまざまなシナリオに対応できます。歴史的な理由から、Job Scheduler が生成するジョブは「Repeatable Jobs」と呼ばれることがあります。

## 基本的な使い方

`upsertJobScheduler` メソッドでスケジューラを作成します。

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('Paint');

// 1秒ごとにジョブを生成するスケジューラを作成
const firstJob = await queue.upsertJobScheduler('my-scheduler-id', {
  every: 1000,
});
```

この例では、1秒ごとに新しいジョブを生成する Job Scheduler が作成されます。最初のジョブは「delayed」状態で返され、1秒後に処理されます。

## Job テンプレートの使用

ジョブに標準的な name、data、options を定義するテンプレートを指定できます。

```typescript
// 毎日 3:15（午前）にジョブを作成
const firstJob = await queue.upsertJobScheduler(
  'my-scheduler-id',
  { pattern: '0 15 3 * * *' },
  {
    name: 'my-job-name',
    data: { foo: 'bar' },
    opts: {
      backoff: 3,
      attempts: 5,
      removeOnFail: 1000,
    },
  },
);
```

同じスケジューラ ID で `upsertJobScheduler` を再度呼び出すことで、repeat オプションやジョブテンプレートの設定を更新できます。

## upsertJobScheduler パラメータ

| Name | Type | Description |
|------|------|-------------|
| `jobSchedulerId` | `string` | スケジューラの一意な識別子 |
| `repeatOpts` | `object` | 繰り返し設定（`every`, `pattern` など） |
| `template` | `object` | ジョブテンプレート（`name`, `data`, `opts`） |

## 注意点

- **Upsert vs Add:** 本番デプロイメントでの管理を簡素化するために `upsert` を使用。スケジューラの重複なく更新または作成が保証される
- **ジョブ生成レート:** スケジューラは最後のジョブが処理を開始したときにのみ新しいジョブを生成する。キューが混雑している場合やワーカー/コンカレンシーが不足している場合、指定間隔より低頻度になる可能性がある
- **ジョブの状態:** Job Scheduler がジョブを生成している限り、常に1つのジョブが「Delayed」状態でスケジューラに関連付けられている
- Job Scheduler が生成するジョブには特別なジョブ ID が付与されるため、カスタムジョブ ID は指定できない。ジョブの識別にはジョブ名を使用すること

## 関連

- [Repeat Strategies](./repeat-strategies.md)
- [Repeat Options](./repeat-options.md)
- [Manage Job Schedulers](./manage-job-schedulers.md)
- [../jobs/repeatable.md](../jobs/repeatable.md)
