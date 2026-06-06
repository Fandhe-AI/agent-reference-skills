---
name: bullmq
description: >
  BullMQ (Redis ベースの Node.js ジョブキュー) リファレンス。
  Queue, Worker, Job, FlowProducer, QueueEvents、レート制限、cron、
  delayed / repeatable / priority ジョブ、再試行、デッドレター、フロー、メトリクス。
  Python / Elixir / PHP / Rust マルチ言語対応。
user-invocable: false
model: sonnet
---

# BullMQ リファレンス

BullMQ (Redis ベースの Node.js ジョブキューライブラリ) の全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/bullmq/
  SKILL.md
  references/
    guide/
      architecture.md
      connections.md
      going-to-production.md
      introduction.md
      parallelism-and-concurrency.md
      queuescheduler.md
      rate-limiting.md
      retrying-failing-jobs.md
      returning-job-data.md
      troubleshooting.md
      events/
        README.md
        create-custom-events.md
        events.md
      flows/
        README.md
        adding-bulks.md
        continue-parent.md
        fail-parent.md
        flows.md
        get-flow-tree.md
        ignore-dependency.md
        remove-child-dependency.md
        remove-dependency.md
      job-schedulers/
        README.md
        job-schedulers.md
        manage-job-schedulers.md
        repeat-options.md
        repeat-strategies.md
      jobs/
        README.md
        deduplication.md
        delayed.md
        fifo.md
        getters.md
        job-data.md
        job-ids.md
        jobs.md
        lifo.md
        prioritized.md
        repeatable.md
        removing-jobs.md
        retrying-jobs.md
        stalled.md
      metrics/
        README.md
        metrics.md
        prometheus.md
      migrations/
        README.md
        bull-to-bullmq.md
        migration-to-newer-versions.md
      nestjs/
        README.md
        producers.md
        queue-events-listeners.md
      queues/
        README.md
        adding-bulks.md
        auto-removal-of-jobs.md
        global-concurrency.md
        global-rate-limit.md
        meta.md
        queues.md
        removing-jobs.md
      redis-compatibility/
        README.md
        dragonfly.md
        redis-compatibility.md
      redis-hosting/
        README.md
        aws-elasticache.md
        aws-memorydb.md
      telemetry/
        README.md
        getting-started.md
        metrics.md
        running-a-simple-example.md
        running-jaeger.md
        telemetry.md
        traces.md
      workers/
        README.md
        auto-removal-of-jobs.md
        cancelling-jobs.md
        concurrency.md
        graceful-shutdown.md
        pausing-queues.md
        sandboxed-processors.md
        stalled-jobs.md
        workers.md
    patterns/
      README.md
      adding-bulks.md
      deduplication.md
      failing-fast-when-redis-is-down.md
      flows.md
      idempotent-jobs.md
      manual-retrying.md
      manually-fetching-jobs.md
      named-processor.md
      process-step-jobs.md
      redis-cluster.md
      stop-retrying-jobs.md
      throttle-jobs.md
      timeout-for-sandboxed-processors.md
      timeout-jobs.md
    bullmq-pro/
      README.md
      batches.md
      install.md
      introduction.md
      new-releases.md
      support.md
      telemetry.md
      groups/
        README.md
        concurrency.md
        getters.md
        groups.md
        local-group-concurrency.md
        local-group-rate-limit.md
        max-group-size.md
        pausing-groups.md
        prioritized.md
        rate-limiting.md
        sandboxes-for-groups.md
      nestjs/
        README.md
        changelog.md
        producers.md
        queue-events-listeners.md
      observables/
        README.md
        cancelation.md
        observables.md
    languages/
      README.md
      elixir.md
      php.md
      python.md
      rust.md
  samples/
    README.md
    basic-queue-and-worker.md
    bulk-add.md
    concurrency.md
    delayed-jobs.md
    flow-producer.md
    graceful-shutdown.md
    job-scheduler-cron.md
    priority-jobs.md
    queue-events.md
    rate-limiting.md
    retry-with-backoff.md
    step-jobs.md
  scripts/
    README.md
    install.md
    telemetry.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| キューの設定、バルク追加、グローバル並行数、ジョブ自動削除 | guide/queues | [references/guide/queues/README.md](references/guide/queues/README.md) |
| ワーカーの並行処理、グレースフルシャットダウン、サンドボックス | guide/workers | [references/guide/workers/README.md](references/guide/workers/README.md) |
| ジョブの種類（遅延・繰り返し・優先度・FIFO/LIFO）、リトライ、重複排除 | guide/jobs | [references/guide/jobs/README.md](references/guide/jobs/README.md) |
| ジョブスケジューラ、cron、繰り返し戦略 | guide/job-schedulers | [references/guide/job-schedulers/README.md](references/guide/job-schedulers/README.md) |
| 親子ジョブ、FlowProducer、依存関係管理 | guide/flows | [references/guide/flows/README.md](references/guide/flows/README.md) |
| イベントリスニング、QueueEvents、カスタムイベント | guide/events | [references/guide/events/README.md](references/guide/events/README.md) |
| メトリクス収集、Prometheus 連携 | guide/metrics | [references/guide/metrics/README.md](references/guide/metrics/README.md) |
| OpenTelemetry、トレース、Jaeger 連携 | guide/telemetry | [references/guide/telemetry/README.md](references/guide/telemetry/README.md) |
| Redis 互換性、Dragonfly 対応 | guide/redis-compatibility | [references/guide/redis-compatibility/README.md](references/guide/redis-compatibility/README.md) |
| AWS MemoryDB / ElastiCache でのホスティング | guide/redis-hosting | [references/guide/redis-hosting/README.md](references/guide/redis-hosting/README.md) |
| NestJS との統合、Queue インジェクション | guide/nestjs | [references/guide/nestjs/README.md](references/guide/nestjs/README.md) |
| BullMQ / Bull からの移行、バージョンアップ | guide/migrations | [references/guide/migrations/README.md](references/guide/migrations/README.md) |
| 冪等性、スロットル、ステップ処理等の実装パターン | patterns | [references/patterns/README.md](references/patterns/README.md) |
| BullMQ Pro（グループ、Observable、バッチ） | bullmq-pro | [references/bullmq-pro/README.md](references/bullmq-pro/README.md) |
| BullMQ Pro グループ（並行数・レート制限・優先度） | bullmq-pro/groups | [references/bullmq-pro/groups/README.md](references/bullmq-pro/groups/README.md) |
| BullMQ Pro Observable（キャンセル） | bullmq-pro/observables | [references/bullmq-pro/observables/README.md](references/bullmq-pro/observables/README.md) |
| BullMQ Pro NestJS 統合 | bullmq-pro/nestjs | [references/bullmq-pro/nestjs/README.md](references/bullmq-pro/nestjs/README.md) |
| Python / Elixir / PHP / Rust での利用 | languages | [references/languages/README.md](references/languages/README.md) |
| 典型的な使い方を知りたい（最小構成・フロー・スケジューラ等） | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド、テレメトリセットアップ | scripts | [scripts/README.md](scripts/README.md) |
