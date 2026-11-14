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

## Delayed ジョブ数のタイムスタンプ指定（v6.7.0+、TypeScript）

`getDelayedCount` に Unix タイムスタンプ（ミリ秒）を渡すと、そのカットオフより厳密に前にスケジュールされた delayed ジョブだけを数える。

```typescript
const overdue = await myQueue.getDelayedCount(Date.now());
const allDelayed = await myQueue.getDelayedCount();
```

## Waiting と delayed の滞留

`getWaiting()` / `getWaitingCount()` は、スケジュール時刻を過ぎていても delayed ステータスのままのジョブを含まない。Worker の処理が追いつかないと期限超過の delayed ジョブが大量に溜まり得るため、waiting 件数が少なくても残作業が少ないとは限らない。TypeScript では両方を監視する。

```typescript
const waiting = await myQueue.getWaitingCount();
const overdueDelayed = await myQueue.getDelayedCount(Date.now());
```

## 注意点

- `getDelayedCount(timestamp)` はカットオフちょうどのジョブを除外する。引数なしは未来にスケジュールされたものを含むすべての delayed ジョブを数え、すでに waiting / active へ昇格したジョブは含まれない（release: https://github.com/taskforcesh/bullmq/releases/tag/v6.7.0）
- `getWaiting()` は waiting ステータスのジョブのみ取得する。delayed のジョブを調べるには `getJobs(['delayed'], start, end)` を使う
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/jobs/getters.md (tag v6.7.6、取得日 2026-11-14)
- `getJobCounts` は複数のステータスを同時に指定できる
- `getJobs` はページネーションに対応しており、大量のジョブがある場合でも効率的に取得可能
- Repeatable Job の設定情報は `getJobs()` には表示されない。`getRepeatableJobs()` を使用すること

## 関連

- [Jobs](./jobs.md)
- [Prioritized](./prioritized.md)
- [Removing Jobs](./removing-jobs.md)
