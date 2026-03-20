# BullMQ — ガイド

BullMQ の主要コンセプトと API の包括的なガイド。

## コア概念

| Name | Description | Path |
|------|-------------|------|
| Introduction | BullMQ のコアクラス（Queue, Worker, QueueEvents, FlowProducer）の概要 | [./introduction.md](./introduction.md) |
| Connections | Redis 接続設定、ioredis オプション、共有接続 | [./connections.md](./connections.md) |

## キュー・ワーカー・ジョブ

| Name | Description | Path |
|------|-------------|------|
| Queues | キューの作成と管理 | [./queues/README.md](./queues/README.md) |
| Workers | ジョブの処理、並行処理、イベント | [./workers/README.md](./workers/README.md) |
| Jobs | ジョブの種類（FIFO, LIFO, 遅延, 繰り返し, 優先度） | [./jobs/README.md](./jobs/README.md) |
| Job Schedulers | ジョブの繰り返しスケジュール管理 | [./job-schedulers/README.md](./job-schedulers/README.md) |
| Flows | 親子ジョブの依存関係、FlowProducer | [./flows/README.md](./flows/README.md) |

## 運用・監視

| Name | Description | Path |
|------|-------------|------|
| Events | ジョブイベントの監視、QueueEvents | [./events/README.md](./events/README.md) |
| Metrics | キューメトリクスの収集と Prometheus 連携 | [./metrics/README.md](./metrics/README.md) |
| Telemetry | OpenTelemetry によるトレースとメトリクス | [./telemetry/README.md](./telemetry/README.md) |
| Rate Limiting | ワーカー単位のレート制限 | [./rate-limiting.md](./rate-limiting.md) |
| Parallelism and Concurrency | 並列処理と並行処理の設計 | [./parallelism-and-concurrency.md](./parallelism-and-concurrency.md) |
| Retrying Failing Jobs | 失敗ジョブのリトライ戦略（バックオフ） | [./retrying-failing-jobs.md](./retrying-failing-jobs.md) |
| Returning Job Data | ジョブからのデータ返却 | [./returning-job-data.md](./returning-job-data.md) |

## インフラ・統合

| Name | Description | Path |
|------|-------------|------|
| Redis Compatibility | Redis 互換データベース（Dragonfly 等）のサポート | [./redis-compatibility/README.md](./redis-compatibility/README.md) |
| Redis Hosting | AWS MemoryDB / ElastiCache でのホスティング | [./redis-hosting/README.md](./redis-hosting/README.md) |
| NestJS | NestJS フレームワークとの統合 | [./nestjs/README.md](./nestjs/README.md) |
| Architecture | BullMQ の内部アーキテクチャ | [./architecture.md](./architecture.md) |
| Going to Production | 本番環境への移行ガイド | [./going-to-production.md](./going-to-production.md) |
| Migrations | Bull から BullMQ への移行、バージョン間の移行 | [./migrations.md](./migrations.md) |
| QueueScheduler | QueueScheduler（v2.0 以前のレガシー） | [./queuescheduler.md](./queuescheduler.md) |
| Troubleshooting | トラブルシューティングガイド | [./troubleshooting.md](./troubleshooting.md) |
