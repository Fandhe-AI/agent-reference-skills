---
name: inngest
description: >
  Inngest イベント駆動 Durable Execution プラットフォームリファレンス。
  サーバーレス環境での長時間ワークフロー、バックグラウンドジョブ、スケジュールタスク実装。
  createFunction, step.run, step.sleep, step.sleepUntil, step.waitForEvent,
  step.invoke, step.sendEvent, step.ai.infer, step.ai.wrap, inngest.send, serve, connect。
  concurrency, throttle, debounce, rate-limit, batching, priority, idempotency フロー制御。
  Next.js / Express / Hono / Cloudflare Workers / Vercel / Netlify デプロイ対応。
user-invocable: false
---

## ディレクトリ構成

```text
skills/inngest/
  SKILL.md
  references/
    functions/
      README.md
      create-function.md
      triggers.md
      retries.md
      cancel-on.md
      timeouts.md
      on-failure.md
      batch-events.md
      priority.md
      idempotency.md
      durable-execution.md
      versioning.md
    steps/
      README.md
      step-run.md
      step-sleep.md
      step-sleep-until.md
      step-wait-for-event.md
      step-invoke.md
      step-send-event.md
      parallel-steps.md
      error-handling.md
      conditionals.md
      step-ai.md
      typescript-types.md
    events/
      README.md
      sending-events.md
      event-payload-schema.md
      step-send-event.md
      event-keys.md
      event-naming-conventions.md
      typescript-event-types.md
      fan-out.md
      webhooks.md
      sending-events-from-functions.md
      multiple-triggers.md
    flow-control/
      README.md
      concurrency.md
      throttling.md
      rate-limiting.md
      debounce.md
      priority.md
      batching.md
      idempotency.md
    sdk/
      README.md
      inngest-client.md
      create-function.md
      send-event.md
      serve.md
      connect.md
      framework-nextjs.md
      framework-express.md
      framework-hono.md
      framework-other.md
      event-type.md
      typescript-types.md
      environment-variables.md
      middleware.md
    platform/
      README.md
      signing-keys.md
      event-keys.md
      api-keys.md
      environment-variables.md
      environments.md
      dev-server.md
      deploy-syncing.md
      deploy-vercel.md
      deploy-netlify.md
      deploy-cloudflare.md
      deploy-digitalocean.md
      deploy-render.md
      connect.md
      self-hosting.md
      observability-metrics.md
      traces.md
      inspecting-function-runs.md
      replay.md
      webhooks.md
      prometheus-metrics.md
    ai/
      README.md
      step-ai-infer.md
      step-ai-wrap.md
      agent-tool-loop.md
      human-in-the-loop.md
      sub-agent-delegation.md
  samples/
    README.md
    background-job.md
    scheduled-task.md
    step-workflow.md
    fan-out.md
    human-in-the-loop.md
    ai-workflow.md
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
| step.run / step.sleep / step.waitForEvent の使い方 | steps | [references/steps/README.md](references/steps/README.md) |
| step.invoke・並列ステップ・条件分岐・エラーハンドリング | steps | [references/steps/README.md](references/steps/README.md) |
| イベント送信・イベントペイロードスキーマ定義 | events | [references/events/README.md](references/events/README.md) |
| ファンアウト・Webhook・イベント命名規約・TypeScript 型定義 | events | [references/events/README.md](references/events/README.md) |
| concurrency / throttle / rate-limit / debounce 設定 | flow-control | [references/flow-control/README.md](references/flow-control/README.md) |
| priority / batching / idempotency によるフロー制御 | flow-control | [references/flow-control/README.md](references/flow-control/README.md) |
| Inngest クライアント初期化・serve / connect の設定 | sdk | [references/sdk/README.md](references/sdk/README.md) |
| Next.js / Express / Hono などフレームワーク統合 | sdk | [references/sdk/README.md](references/sdk/README.md) |
| 署名キー・イベントキー・環境変数・環境設定 | platform | [references/platform/README.md](references/platform/README.md) |
| デプロイ（Vercel / Netlify / Cloudflare / DigitalOcean / Render）・セルフホスト | platform | [references/platform/README.md](references/platform/README.md) |
| Dev Server のセットアップ・オブザーバビリティ・トレース・リプレイ | platform | [references/platform/README.md](references/platform/README.md) |
| step.ai.infer / step.ai.wrap による AI 推論ステップ | ai | [references/ai/README.md](references/ai/README.md) |
| エージェントループ・Human-in-the-Loop・サブエージェント委譲 | ai | [references/ai/README.md](references/ai/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・デプロイ手順を知りたい | scripts | [scripts/README.md](scripts/README.md) |
