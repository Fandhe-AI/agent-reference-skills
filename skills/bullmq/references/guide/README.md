# Guide

| Name | Description | Path |
|------|-------------|------|
| Architecture | BullMQ は Redis 上にジョブキュー機能を実装しており、明確に定義されたライフサイクルステート… | [architecture.md](./architecture.md) |
| BullMQ — Connections | BullMQ は Redis への接続に ioredis モジュールを使用する。Queue や Worker の各インスタンス… | [connections.md](./connections.md) |
| BullMQ — Introduction | BullMQ は 4 つのコアクラスを中心に構築されたジョブキューライブラリである。Queue でジョブを登… | [introduction.md](./introduction.md) |
| Going to Production | BullMQ ベースのアプリケーションを本番環境にデプロイする際の重要な考慮事項とベストプラクティス… | [going-to-production.md](./going-to-production.md) |
| Migrations | > **Deprecated**: このファイルは公式ドキュメントの構造変更により非推奨となりました。後継ページは… | [migrations.md](./migrations.md) |
| Parallelism and Concurrency | BullMQ では並列性（Parallelism）と並行性（Concurrency）は異なる概念です。並列性は複数のワーカー… | [parallelism-and-concurrency.md](./parallelism-and-concurrency.md) |
| Rate Limiting | BullMQ はワーカーレベルのレート制限機能を提供し、`limiter` オプション（`max` と `duration`）を使… | [rate-limiting.md](./rate-limiting.md) |
| QueueScheduler | `QueueScheduler` は BullMQ v2.0 で廃止されたヘルパークラスです。v2.0 以前では、遅延ジョブの管理とス… | [queuescheduler.md](./queuescheduler.md) |
| Retrying Failing Jobs | BullMQ は失敗したジョブの自動リトライ機能を提供します。`attempts` オプションと組み込みまたはカス… | [retrying-failing-jobs.md](./retrying-failing-jobs.md) |
| Returning Job Data | BullMQ では Worker のプロセッサ関数から値を返すことができ、その戻り値は `job.returnvalue` プロパ… | [returning-job-data.md](./returning-job-data.md) |
| Troubleshooting | BullMQ を使用する際によく遭遇するエラーとその解決策をまとめています。ロックの消失、環境変数の問… | [troubleshooting.md](./troubleshooting.md) |
