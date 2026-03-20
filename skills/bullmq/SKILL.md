---
name: bullmq
description: >
  BullMQ (Redis ジョブキュー) API リファレンス。
  Queue, Worker, Job, FlowProducer, イベント,
  rate-limiting, cron, delayed, repeatable
user-invocable: false
---

# BullMQ リファレンス

BullMQ (Redis ベースの Node.js ジョブキューライブラリ) の全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/bullmq/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── start/README.md                   ← 入門ガイド（2ページ）
    ├── guide/README.md                   ← コアガイド（約50ページ）
    │   ├── queues/README.md              ← キュー関連（7ページ）
    │   ├── workers/README.md             ← ワーカー関連（8ページ）
    │   ├── jobs/README.md                ← ジョブ関連（13ページ）
    │   ├── job-schedulers/README.md      ← ジョブスケジューラ（4ページ）
    │   ├── flows/README.md               ← フロー関連（8ページ）
    │   ├── events/README.md              ← イベント（3ページ）
    │   ├── metrics/README.md             ← メトリクス（3ページ）
    │   ├── telemetry/README.md           ← テレメトリ（6ページ）
    │   ├── redis-compatibility/README.md ← Redis互換性（3ページ）
    │   ├── redis-hosting/README.md       ← Redisホスティング（3ページ）
    │   └── nestjs/README.md              ← NestJS統合（3ページ）
    ├── patterns/README.md                ← 実装パターン集（14ページ）
    ├── bullmq-pro/README.md              ← BullMQ Pro（約18ページ）
    │   ├── observables/README.md         ← Observables（3ページ）
    │   ├── groups/README.md              ← Groups（10ページ）
    │   └── nestjs/README.md              ← NestJS Pro（3ページ）
    └── languages/README.md               ← 多言語サポート（3ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| BullMQ の概要、インストール、基本的な使い方 | start | [references/start/README.md](./references/start/README.md) |
| Queue, Worker, Job, Flow の基本操作 | guide | [references/guide/README.md](./references/guide/README.md) |
| キューの設定、バルク追加、グローバル並行数 | guide/queues | [references/guide/queues/README.md](./references/guide/queues/README.md) |
| ワーカーの並行処理、シャットダウン、サンドボックス | guide/workers | [references/guide/workers/README.md](./references/guide/workers/README.md) |
| ジョブの種類（遅延・繰り返し・優先度）、リトライ | guide/jobs | [references/guide/jobs/README.md](./references/guide/jobs/README.md) |
| ジョブスケジューラ、繰り返し戦略、cron | guide/job-schedulers | [references/guide/job-schedulers/README.md](./references/guide/job-schedulers/README.md) |
| 親子ジョブ、FlowProducer、依存関係 | guide/flows | [references/guide/flows/README.md](./references/guide/flows/README.md) |
| イベントリスニング、QueueEvents | guide/events | [references/guide/events/README.md](./references/guide/events/README.md) |
| メトリクス、Prometheus 連携 | guide/metrics | [references/guide/metrics/README.md](./references/guide/metrics/README.md) |
| OpenTelemetry、トレース、Jaeger | guide/telemetry | [references/guide/telemetry/README.md](./references/guide/telemetry/README.md) |
| Redis 互換性、Dragonfly | guide/redis-compatibility | [references/guide/redis-compatibility/README.md](./references/guide/redis-compatibility/README.md) |
| AWS MemoryDB / ElastiCache | guide/redis-hosting | [references/guide/redis-hosting/README.md](./references/guide/redis-hosting/README.md) |
| NestJS との統合 | guide/nestjs | [references/guide/nestjs/README.md](./references/guide/nestjs/README.md) |
| 冪等性、スロットル、ステップ処理等の実装パターン | patterns | [references/patterns/README.md](./references/patterns/README.md) |
| BullMQ Pro（グループ、Observable、バッチ） | bullmq-pro | [references/bullmq-pro/README.md](./references/bullmq-pro/README.md) |
| Python / Elixir / PHP での利用 | languages | [references/languages/README.md](./references/languages/README.md) |
