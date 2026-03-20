# BullMQ — Patterns

BullMQ を使った実装パターン集。一般的なユースケースに対するベストプラクティスを提供する。

| Name | Description | Path |
|------|-------------|------|
| Adding Bulks | 異なるキューへのジョブ一括追加 | [./adding-bulks.md](./adding-bulks.md) |
| Deduplication | ジョブの重複排除パターン | [./deduplication.md](./deduplication.md) |
| Manually Fetching Jobs | ジョブの手動取得と処理 | [./manually-fetching-jobs.md](./manually-fetching-jobs.md) |
| Named Processor | 名前付きプロセッサパターン | [./named-processor.md](./named-processor.md) |
| Flows | フローを使った実装パターン | [./flows.md](./flows.md) |
| Idempotent Jobs | 冪等なジョブの実装 | [./idempotent-jobs.md](./idempotent-jobs.md) |
| Throttle Jobs | ジョブのスロットリング | [./throttle-jobs.md](./throttle-jobs.md) |
| Manual Retrying | 手動リトライの実装 | [./manual-retrying.md](./manual-retrying.md) |
| Process Step Jobs | ステップ処理ジョブパターン | [./process-step-jobs.md](./process-step-jobs.md) |
| Failing Fast when Redis is Down | Redis 障害時の高速フェイル | [./failing-fast-when-redis-is-down.md](./failing-fast-when-redis-is-down.md) |
| Stop Retrying Jobs | リトライの停止 | [./stop-retrying-jobs.md](./stop-retrying-jobs.md) |
| Timeout Jobs | ジョブのタイムアウト設定 | [./timeout-jobs.md](./timeout-jobs.md) |
| Timeout for Sandboxed Processors | サンドボックスプロセッサのタイムアウト | [./timeout-for-sandboxed-processors.md](./timeout-for-sandboxed-processors.md) |
| Redis Cluster | Redis Cluster での BullMQ 利用 | [./redis-cluster.md](./redis-cluster.md) |
