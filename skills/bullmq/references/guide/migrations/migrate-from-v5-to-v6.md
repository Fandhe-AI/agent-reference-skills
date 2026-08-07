# Migrate from v5 to v6

BullMQ v6 は pluggable queue backend（`IQueueBackend` 抽象化・Redis / PostgreSQL バックエンド）を導入し、legacy repeatable jobs API の完全撤廃を含む破壊的変更を伴う。

## Breaking Changes

### Legacy Repeatable Jobs API の撤廃

以下の API が完全に削除された。

- `Queue.add(..., { repeat })`
- `Queue.addBulk(..., { repeat })`
- `Queue.getRepeatableJobs()`
- `Queue.removeRepeatable()`
- `Queue.removeRepeatableByKey()`
- `Repeat` クラス

代わりに Job Scheduler API（`upsertJobScheduler` / `getJobSchedulers` / `removeJobScheduler`）を使用する。

```typescript
// v5 以前（削除された API）
// await queue.add('paint', { color: 'blue' }, { repeat: { pattern: '0 15 3 * * *' } });

// v6（Job Scheduler API）
await queue.upsertJobScheduler(
  'paint-daily',
  { pattern: '0 15 3 * * *' },
  { name: 'paint', data: { color: 'blue' }, opts: { attempts: 5, backoff: 3000 } },
);
```

| Legacy `repeat` オプション | Job Scheduler 引数 |
|---|---|
| `repeat.pattern` | `{ pattern }` |
| `repeat.every` | `{ every }` |
| `repeat.limit` | `{ limit }` |
| `repeat.startDate` | `{ startDate }` |
| `repeat.endDate` | `{ endDate }` |
| `repeat.tz` | `{ tz }` |
| `repeat.utc: true` | `{ tz: 'UTC' }`（`repeat.utc` オプション自体が廃止） |

### Debounce の廃止

legacy `debounce` オプションは非推奨となり、deduplication ID・TTL/replace/extend モードを持つ deduplication 機構に置き換えられた。

### Telemetry インターフェースの変更

- `createGauge` が必須化（従来はオプショナル）
- 非推奨だった enum メンバーが削除され、`JobState` が導入された
- Worker span に `JobFinishedTimestamp` 属性が含まれなくなった
- ジョブメトリクスの用語が "status" から "state" に変更
- `clean` テレメトリはクリーンされたジョブ数のみを報告し、ID 配列全体は報告しなくなった

### `Queue.resume()` の非同期化

`resume()` は `await` が必須になった。

```typescript
await queue.resume();
```

### Flow ジョブ ID 生成の変更

`jobId` を明示しない Flow ジョブは、Redis 形式の連番 ID ではなく UUID を採番されるようになった。

### カスタムバックエンド実装（`IQueueBackend`）のメソッド名変更

`IQueueBackend` を自前実装している場合、以下のメソッド名変更が必要。

| v5 | v6 |
|---|---|
| `reprocessJob` | `retryFinishedJob` |
| `retryJobs` | `retryFinishedJobs` |
| `cleanJobsInSet` | `cleanJobsByState` |
| `isJobInList` / `isJobInZSet` | `isJobInState` |

## Requirements

- Node.js **14.17.0** 以上

## Migration Steps

v5 稼働中に以下を実施してから v6 へアップグレードする。

1. legacy repeatable-job API を使用しているアプリケーションコードを置き換える
2. `getRepeatableJobs()` で既存の repeatable 設定を抽出する
3. `upsertJobScheduler()` で同等の Job Scheduler を作成する
4. `getJobSchedulers()` で新しいスケジューラーが存在することを確認する
5. legacy repeatable 定義を削除メソッドで削除する
6. すべての producer / worker が Job Scheduler を使うようになってから v6 をデプロイする

## Notes

- `repeat.utc` オプションは削除された。UTC でスケジュールする場合は Job Scheduler の `{ tz: 'UTC' }` を使用する
- paused job state は v6 で削除されている（`resume()` の非同期化と合わせて、pause/resume の扱いが変わっている点に注意）
- `ioredis` は v6 で optional peer dependency 化されている（[Connections](../connections.md) 参照）

## Related

- [Migration to newer versions](./migration-to-newer-versions.md)
- [Bull to BullMQ](./bull-to-bullmq.md)
- [Job Schedulers](../job-schedulers/job-schedulers.md)
- [Connections](../connections.md)
