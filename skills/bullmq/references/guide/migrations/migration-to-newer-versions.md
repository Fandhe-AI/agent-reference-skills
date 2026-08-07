# Migration to Newer Versions

BullMQ のバージョンアップ戦略。CHANGELOG を確認し、段階的にアップグレードすることを推奨する。

## Upgrade Types

| Upgrade Type | Version | Risk | Strategy |
|---|---|---|---|
| Bugfix | micro (x.x.Z) | Low | 全インスタンスをそのまま更新するだけ。コード変更不要 |
| Feature | minor (x.Y.x) | Medium | BullMQ を先に更新してから新機能を使うコードをデプロイ。後方互換性を確認すること |
| API breaking | major (X.x.x) | High | TypeScript コンパイルとユニットテストで検出可能 |
| Data-structure breaking | major (X.x.x) | Highest | ロールバックが困難な場合がある |

## Data-Structure Breaking Changes

2種類ある:

- **Additive**: 新しいデータ構造が追加される。比較的対処しやすい
- **Destructive**: 既存のデータ構造が変更される。最も複雑で、ロールバックが困難になる可能性がある

## Migration Strategies

### Pause / Upgrade / Unpause

```typescript
// 1. キューを一時停止
await queue.pause();

// 2. 処理中のジョブの完了を待つ
await worker.close();

// 3. 全インスタンスをアップグレード

// 4. 新しいワーカーを起動
const newWorker = new Worker('myQueue', processor);

// 5. キューを再開
await queue.resume();
```

### New Queues

新しいキュー（別の Redis インスタンスまたはバージョン固有の名前）を作成し、古いキューと並行運用する。

```typescript
// 旧キュー（処理完了まで維持）
const oldQueue = new Queue('myQueue-v1');
const oldWorker = new Worker('myQueue-v1', processor);

// 新キュー（新しいジョブはこちらに追加）
const newQueue = new Queue('myQueue-v2');
const newWorker = new Worker('myQueue-v2', newProcessor);
```

## v5 → v6 の主な破壊的変更（2026-07-30, 6.0.0）

v6 は API breaking / data-structure breaking を含む large release。アップグレード前に以下を確認すること。

| 変更内容 | 詳細 |
|---|---|
| `Connection` パラメータ → `BackendFactory` | 高レベルクラス（`Queue` / `Worker` / `FlowProducer`）は `IQueueBackend` にのみ依存するようになり、コンストラクタの任意 `Connection` パラメータは任意の `BackendFactory` パラメータに置き換わった。詳細は [Architecture](../architecture.md) |
| PostgreSQL backend の追加 | `IQueueBackend` 抽象化により、Redis 以外に `createPostgresBackend` による PostgreSQL バックエンドを選択可能になった（pluggable queue backends） |
| Redis 内部 API の削除 | `Queue#client` / `Queue#redisVersion` / `Queue#databaseType` / `Worker#blockingClient` / `FlowProducer#client` が削除。生の Redis クライアントが必要な場合は `getBackend()` が返す `RedisQueueBackend` 経由でアクセスする |
| `ioredis` が peer dependency 化 | `dependencies` から外れ `peerDependencies`（`optional: true`）に変更。`redis` / `pg` / `bullmq-otel` も同様。Redis 利用時は `npm install ioredis` が別途必要。詳細は [Connections](../connections.md) |
| `Worker#resume()` の非同期化 | `Promise<void>` を返すようになり `await` が必須（v5 以前は同期メソッド）。詳細は [Workers](../workers/workers.md) |
| `Worker#waitUntilReady()` の戻り値変更 | Redis クライアントではなく `void` に解決するようになった |
| Legacy Repeatable Jobs API の完全削除 | `Queue#add` / `Queue#addBulk` の `repeat` オプション、`Repeat` クラス、`Queue#getRepeatableJobs()` / `removeRepeatable()` / `removeRepeatableByKey()` を削除。[Job Schedulers](../job-schedulers/job-schedulers.md)（`upsertJobScheduler` 等）に完全移行すること。詳細は [Repeatable Jobs (Legacy)](../jobs/repeatable.md) |
| その他の削除 | `debounce` オプション、`Job#discard()` メソッド、`JobType` および `Queue#getJobCounts()` デフォルト結果からの `paused` 状態の削除（一時停止中のキューのジョブは `waiting` として表現される） |

アップグレード前には公式の v5 → v6 移行ガイドに従うこと。

## Notes

- アップグレード前に必ず CHANGELOG を確認すること
- 大きなバージョンジャンプは避け、段階的にアップグレードすること
- データ構造の破壊的変更がある場合、ロールバック計画を事前に立てること
- v6 へのアップグレードでは特に legacy repeatable jobs API の削除と `ioredis` の peer dependency 化に注意すること（依存関係のインストールとコードの両方の対応が必要）

## Related

- [./bull-to-bullmq.md](./bull-to-bullmq.md)
- [../architecture.md](../architecture.md)
- [../going-to-production.md](../going-to-production.md)
