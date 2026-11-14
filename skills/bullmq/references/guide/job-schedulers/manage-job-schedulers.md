# BullMQ — Manage Job Schedulers

Job Scheduler のライフサイクル管理は、効率的なバックグラウンドタスクの維持に不可欠です。`upsertJobScheduler` に加えて、`removeJobScheduler` と `getJobSchedulers` メソッドでスケジューラの削除と一覧取得が行えます。

## removeJobScheduler（スケジューラの削除）

不要になったスケジューラや、非アクティブ/廃止されたスケジューラを削除してリソースを最適化します。

```typescript
import { Queue } from 'bullmq';

const queue = new Queue('Paint');

// スケジューラ 'scheduler-123' を削除
const result = await queue.removeJobScheduler('scheduler-123');
console.log(
  result ? 'Scheduler removed successfully' : 'Missing Job Scheduler',
);
```

| 戻り値 | Description |
|--------|-------------|
| `true` | 指定 ID の Job Scheduler が存在し、削除された |
| `false` | 指定 ID の Job Scheduler が存在しなかった |

## getJobSchedulers（スケジューラ一覧の取得）

指定した範囲内のすべてのスケジューラ設定を取得します。モニタリングやダッシュボードでの使用に最適です。

```typescript
// 最初の10件のスケジューラを次回実行時刻の昇順で取得
const schedulers = await queue.getJobSchedulers(0, 9, true);
console.log('Current job schedulers:', schedulers);
```

To remove a scheduler returned by `getJobSchedulers`, pass its `key` to `removeJobScheduler`:

```typescript
const [scheduler] = await queue.getJobSchedulers(0, 0);
if (scheduler) {
  await queue.removeJobScheduler(scheduler.key);
}
```

### getJobSchedulers パラメータ

| Name | Type | Description |
|------|------|-------------|
| `start` | `number` | 取得開始位置 |
| `end` | `number` | 取得終了位置 |
| `asc` | `boolean` | `true` で次回実行時刻の昇順 |

## getJobScheduler（個別スケジューラの取得）

ID を指定して特定のスケジューラの設定を取得します。

```typescript
const scheduler = await queue.getJobScheduler('test');
console.log('Current job scheduler:', scheduler);
```

## Notes

- The scheduler ID passed to `upsertJobScheduler` is returned as the `key` property by `getJobScheduler` and `getJobSchedulers`. Use this `key` when retrieving, updating, or removing a scheduler. It is distinct from the scheduler's `name` and the IDs of the jobs it produces; the optional `id` property on `JobSchedulerJson` is not the scheduler identifier (official note, v6.7.6).
- `removeJobScheduler` returns `false` when the scheduler does not exist (it does not throw).
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/job-schedulers/manage-job-schedulers.md (tag v6.7.6, fetched 2026-11-14).
- `getJobSchedulers` supports pagination, so it stays efficient with a large number of schedulers.
- Use `upsertJobScheduler` to update a scheduler (calling it with the same ID overwrites the existing settings).
- `getJobSchedulers` is useful for generating scheduler reports or dashboards.

## Related

- [Job Schedulers](./job-schedulers.md)
- [Repeat Strategies](./repeat-strategies.md)
- [Repeat Options](./repeat-options.md)
