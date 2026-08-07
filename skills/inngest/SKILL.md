---
name: inngest
description: >
  Inngest イベント駆動 Durable Execution プラットフォームリファレンス。
  サーバーレス環境での長時間ワークフロー、バックグラウンドジョブ、スケジュールタスク実装。
  createFunction, step.run, step.sleep, step.sleepUntil, step.waitForEvent, step.waitForSignal,
  step.invoke, step.sendEvent, step.fetch, step.ai.infer, step.ai.wrap, inngest.send, serve, connect。
  concurrency, throttle, debounce, rate-limit, batching, priority, idempotency, singleton フロー制御。
  Realtime（channels, topics, publish, subscribe, useRealtime, subscription tokens）による進捗配信。
  Agent Evals, scoring, group.experiment, MCP dev server などエージェント運用機能。
  Next.js / Express / Hono / Cloudflare Workers / Vercel / Netlify / DigitalOcean / Render デプロイ対応。
user-invocable: false
---

## ディレクトリ構成

```text
skills/inngest/
  SKILL.md
  references/
    functions/
      README.md
      batch-events.md
      cancel-on.md
      create-function.md
      deferred-functions.md
      durable-endpoints.md
      durable-execution.md
      idempotency.md
      on-failure.md
      priority.md
      retries.md
      rollbacks.md
      streaming.md
      timeouts.md
      triggers.md
      versioning.md
    steps/
      README.md
      conditionals.md
      error-handling.md
      parallel-steps.md
      step-ai.md
      step-fetch.md
      step-invoke.md
      step-run.md
      step-send-event.md
      step-sleep.md
      step-sleep-until.md
      step-wait-for-event.md
      step-wait-for-signal.md
      typescript-types.md
    events/
      README.md
      event-keys.md
      event-naming-conventions.md
      event-payload-schema.md
      fan-out.md
      multiple-triggers.md
      sending-events-from-functions.md
      sending-events.md
      sessions.md
      step-send-event.md
      typescript-event-types.md
      webhooks.md
      writing-expressions.md
    flow-control/
      README.md
      batching.md
      concurrency.md
      debounce.md
      idempotency.md
      priority.md
      rate-limiting.md
      singleton.md
      throttling.md
    sdk/
      README.md
      connect.md
      create-function.md
      environment-variables.md
      event-type.md
      framework-express.md
      framework-hono.md
      framework-nextjs.md
      framework-other.md
      inngest-client.md
      middleware-dependency-injection.md
      middleware-encryption.md
      middleware-sentry.md
      middleware.md
      send-event.md
      serve.md
      typescript-types.md
      v3-v4-differences.md
    platform/
      README.md
      api-keys.md
      bulk-cancellation.md
      connect.md
      datadog-integration.md
      deploy-cloudflare.md
      deploy-digitalocean.md
      deploy-netlify.md
      deploy-render.md
      deploy-syncing.md
      deploy-vercel.md
      dev-server.md
      environment-variables.md
      environments.md
      event-keys.md
      inspecting-function-runs.md
      insights.md
      observability-metrics.md
      prometheus-metrics.md
      replay.md
      rotating-keys.md
      self-hosting.md
      signing-keys.md
      traces.md
      webhooks.md
    ai/
      README.md
      agent-evals.md
      agent-skills.md
      agent-tool-loop.md
      ai-dev-tools.md
      deferred-scoring.md
      group-experiment.md
      human-in-the-loop.md
      mcp-dev-server.md
      scoring.md
      step-ai-infer.md
      step-ai-wrap.md
      sub-agent-delegation.md
    realtime/
      README.md
      channels.md
      publishing.md
      subscribing.md
      subscription-tokens.md
      use-realtime.md
  samples/
    README.md
    ai-workflow.md
    background-job.md
    fan-out.md
    human-in-the-loop.md
    realtime-publish-subscribe.md
    scheduled-task.md
    singleton-function.md
    step-workflow.md
  scripts/
    README.md
    setup.md
    dev.md
    test-events.md
    env.md
    deploy.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| 関数の定義・トリガー・リトライ設定 | functions | [references/functions/README.md](references/functions/README.md) |
| cancelOn・onFailure・タイムアウト・バッチ・冪等性の設定 | functions | [references/functions/README.md](references/functions/README.md) |
| Deferred Functions・Durable Endpoints・ストリーミング・ロールバックの設定 | functions | [references/functions/README.md](references/functions/README.md) |
| step.run / step.sleep / step.waitForEvent の使い方 | steps | [references/steps/README.md](references/steps/README.md) |
| step.invoke・並列ステップ・条件分岐・エラーハンドリング | steps | [references/steps/README.md](references/steps/README.md) |
| step.fetch・step.waitForSignal による HTTP オフロード・シグナル待機 | steps | [references/steps/README.md](references/steps/README.md) |
| イベント送信・イベントペイロードスキーマ定義 | events | [references/events/README.md](references/events/README.md) |
| ファンアウト・Webhook・イベント命名規約・TypeScript 型定義 | events | [references/events/README.md](references/events/README.md) |
| セッションによるラン集約・CEL 式によるマッチング条件記述 | events | [references/events/README.md](references/events/README.md) |
| concurrency / throttle / rate-limit / debounce 設定 | flow-control | [references/flow-control/README.md](references/flow-control/README.md) |
| priority / batching / idempotency / singleton によるフロー制御 | flow-control | [references/flow-control/README.md](references/flow-control/README.md) |
| Inngest クライアント初期化・serve / connect の設定 | sdk | [references/sdk/README.md](references/sdk/README.md) |
| Next.js / Express / Hono などフレームワーク統合 | sdk | [references/sdk/README.md](references/sdk/README.md) |
| ミドルウェア（DI・暗号化・Sentry）・SDK v3/v4 差分の確認 | sdk | [references/sdk/README.md](references/sdk/README.md) |
| 署名キー・イベントキー・環境変数・環境設定・鍵ローテーション | platform | [references/platform/README.md](references/platform/README.md) |
| デプロイ（Vercel / Netlify / Cloudflare / DigitalOcean / Render）・セルフホスト | platform | [references/platform/README.md](references/platform/README.md) |
| Dev Server のセットアップ・オブザーバビリティ・トレース・リプレイ | platform | [references/platform/README.md](references/platform/README.md) |
| Insights によるクエリ分析・Datadog 連携・バルクキャンセル | platform | [references/platform/README.md](references/platform/README.md) |
| step.ai.infer / step.ai.wrap による AI 推論ステップ | ai | [references/ai/README.md](references/ai/README.md) |
| エージェントループ・Human-in-the-Loop・サブエージェント委譲 | ai | [references/ai/README.md](references/ai/README.md) |
| Agent Evals・scoring・group.experiment によるエージェント評価 | ai | [references/ai/README.md](references/ai/README.md) |
| Agent Skills / MCP dev server などエージェント向け開発ツール | ai | [references/ai/README.md](references/ai/README.md) |
| チャンネル・トピックの定義とリアルタイム配信の publish/subscribe | realtime | [references/realtime/README.md](references/realtime/README.md) |
| useRealtime での購読・subscription token の発行 | realtime | [references/realtime/README.md](references/realtime/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・デプロイ手順を知りたい | scripts | [scripts/README.md](scripts/README.md) |
