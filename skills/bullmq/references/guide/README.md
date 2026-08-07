# guide

| Name | Description | Path |
|------|-------------|------|
| Architecture | Redis 上のジョブキュー実装。ライフサイクルステート管理。 | [architecture.md](./architecture.md) |
| BullMQ — Connections | Redis への接続設定。ioredis モジュール。Queue / Worker。 | [connections.md](./connections.md) |
| Going to Production | 本番環境デプロイのベストプラクティス。Redis 永続化・メモリポリシー。 | [going-to-production.md](./going-to-production.md) |
| BullMQ — Introduction | 4 つのコアクラス。Queue / Worker / QueueEvents / FlowProducer。 | [introduction.md](./introduction.md) |
| Migrations | バージョンアップ戦略。破壊的変更への対応。Bull から BullMQ への移行。 | [migrations.md](./migrations.md) |
| Parallelism and Concurrency | 並列性と並行性の概念。Parallelism / Concurrency。ワーカー設定。 | [parallelism-and-concurrency.md](./parallelism-and-concurrency.md) |
| QueueScheduler | `QueueScheduler` は v2.0 で廃止。遅延ジョブ管理・ストール検出。 | [queuescheduler.md](./queuescheduler.md) |
| Rate Limiting | ワーカーレベルのレート制限。`limiter` オプション。max / duration。 | [rate-limiting.md](./rate-limiting.md) |
| Retrying Failing Jobs | 失敗したジョブの自動リトライ。`attempts` / バックオフ戦略。 | [retrying-failing-jobs.md](./retrying-failing-jobs.md) |
| Returning Job Data | Worker プロセッサからの値返却。`returnvalue` プロパティ。 | [returning-job-data.md](./returning-job-data.md) |
| Troubleshooting | よく遭遇するエラーと解決策。Missing Locks エラー・環境変数の問題。 | [troubleshooting.md](./troubleshooting.md) |
