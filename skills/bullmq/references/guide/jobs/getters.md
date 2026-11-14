# BullMQ — Getters

ジョブはライフサイクルの中でさまざまなステータスを経由します。BullMQ は各ステータスからジョブ情報を取得するためのメソッドを提供しています。

## Job Counts（ジョブ数の取得）

指定したステータスのジョブ数を取得します。

```typescript
import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

const counts = await myQueue.getJobCounts('wait', 'completed', 'failed');
// { wait: number, completed: number, failed: number }
```

## 利用可能なステータス

| Status | Description |
|--------|-------------|
| `completed` | 完了したジョブ |
| `failed` | 失敗したジョブ |
| `delayed` | 遅延中のジョブ |
| `active` | 処理中のジョブ |
| `wait` | 待機中のジョブ |
| `waiting-children` | 子ジョブの完了を待っているジョブ |
| `prioritized` | 優先度付きジョブ |
| `paused` | 一時停止中のジョブ |
| `repeat` | 繰り返しジョブ |

## Get Jobs（ジョブの取得）

ページネーション形式でジョブを取得します。

```typescript
// 最も古い100件の completed ジョブを取得
const completed = await myQueue.getJobs(['completed'], 0, 100, true);
```

### getJobs パラメータ

| Name | Type | Description |
|------|------|-------------|
| `types` | `string[]` | 取得するジョブのステータス配列 |
| `start` | `number` | 取得開始位置（0始まり） |
| `end` | `number` | 取得終了位置 |
| `asc` | `boolean` | `true` で古い順、`false` で新しい順 |

## Notes

- `getDelayedCount(timestamp)` excludes jobs scheduled exactly at the cutoff. Calling it without an argument still counts all delayed jobs, including those scheduled for the future; jobs already promoted to waiting or active are not included (feature added in v6.7.0, https://github.com/taskforcesh/bullmq/releases/tag/v6.7.0).
- `getWaiting()` only retrieves jobs in waiting status. To inspect jobs that are still delayed, use `getJobs(['delayed'], start, end)`.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/jobs/getters.md (tag v6.7.6, fetched 2026-11-14).
- `getJobCounts` は複数のステータスを同時に指定できる
- `getJobs` はページネーションに対応しており、大量のジョブがある場合でも効率的に取得可能
- Repeatable Job の設定情報は `getJobs()` には表示されない。`getRepeatableJobs()` を使用すること

### Count overdue delayed jobs (v6.7.0+, TypeScript)

Pass a Unix timestamp in milliseconds to `getDelayedCount` to count delayed jobs scheduled strictly before that time:

```typescript
const overdue = await myQueue.getDelayedCount(Date.now());
const allDelayed = await myQueue.getDelayedCount();
```

### Waiting jobs and delayed backlogs

`getWaiting()` and `getWaitingCount()` do not include jobs that are still in delayed status, even when their scheduled time has passed. If workers cannot process jobs fast enough, a large backlog of overdue delayed jobs can accumulate, so a small waiting count does not necessarily mean there is little work left. In TypeScript, monitor both the waiting count and the overdue delayed count:

```typescript
const waiting = await myQueue.getWaitingCount();
const overdueDelayed = await myQueue.getDelayedCount(Date.now());
```

## Related

- [Jobs](./jobs.md)
- [Prioritized](./prioritized.md)
- [Removing Jobs](./removing-jobs.md)
