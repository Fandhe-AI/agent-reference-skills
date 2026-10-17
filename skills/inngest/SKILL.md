---
name: inngest
description: >
  Inngest イベント駆動 Durable Execution リファレンス。バックグラウンドジョブ、長時間ワークフロー。
  createFunction, step.run, step.sleep, step.waitForEvent, step.waitForSignal, step.invoke,
  step.sendEvent, step.sleepUntil, step.fetch, step.ai.infer, step.ai.wrap, step.metadata, inngest.send, serve, connect, checkpointing, Inngest CLI。
  concurrency, throttle, debounce, rate-limit, batching, priority, idempotency, singleton, multi-tenancy フロー制御。
  Realtime（channels, topics, publish, subscribe, subscription tokens, useRealtime）、
  Agent Evals（scoring, group.experiment）、MCP（Dev Server / Cloud）。
  デプロイ先 Next.js, Express, Hono, Cloudflare Workers, Vercel, Netlify, DigitalOcean, Render。
user-invocable: false
---

対象: TypeScript SDK `inngest` v4.24.0（npm latest）／公式ドキュメント https://www.inngest.com/docs-markdown/（取得日 2026-10-16）

## ディレクトリ構成

```text
skills/inngest/
  SKILL.md
  references/
    functions/
      README.md
      batch-events.md
      cancel-on.md
      checkpointing.md
      create-function.md
      deferred-functions.md
      durable-endpoints.md
      durable-execution.md
      idempotency.md
      inngest-errors.md
      limits.md
      non-retriable-errors.md
      on-failure.md
      priority.md
      retries.md
      rollbacks.md
      schedules-and-delayed-starts.md
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
      step-metadata.md
      step-run.md
      step-send-event.md
      step-sleep.md
      step-sleep-until.md
      step-wait-for-event.md
      step-wait-for-signal.md
      typescript-types.md
      working-with-loops.md
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
      bursty-concurrency.md
      concurrency.md
      debounce.md
      idempotency.md
      multi-tenancy.md
      priority.md
      rate-limiting.md
      simulator.md
      singleton.md
      throttling.md
    sdk/
      README.md
      connect.md
      create-function.md
      environment-variables.md
      eslint-plugin.md
      event-type.md
      extended-traces.md
      framework-express.md
      framework-hono.md
      framework-nextjs.md
      framework-other.md
      inngest-client.md
      logging.md
      middleware-dependency-injection.md
      middleware-encryption.md
      middleware-sentry.md
      middleware-serialization.md
      middleware.md
      referencing-functions.md
      send-event.md
      serve.md
      testing.md
      trigger-helpers.md
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
      pause-and-resume-functions.md
      prometheus-metrics.md
      replay.md
      rerun-a-run.md
      rotating-keys.md
      self-hosting.md
      signing-keys.md
      traces.md
      webhooks.md
    ai/
      README.md
      agent-evals.md
      agent-evals-best-practices.md
      agent-evals-experiments.md
      agent-evals-limits.md
      agent-evals-quick-start.md
      agent-evals-reference.md
      agent-evals-troubleshooting.md
      agent-skills.md
      agent-tool-loop.md
      ai-dev-tools.md
      cli-for-coding-agents.md
      deferred-scoring.md
      evals-compare-models-and-prompts.md
      evals-cost-management.md
      evals-interpreting-results.md
      evals-llm-judge.md
      evals-user-feedback.md
      evals-workflow-rewrite.md
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
      limits.md
      publishing.md
      server-side-subscriptions.md
      stream-ai-responses.md
      subscribing.md
      subscription-tokens.md
      troubleshooting.md
      use-realtime.md
  samples/
    README.md
    ai-metadata-quickstart.md
    ai-workflow.md
    background-job.md
    cleanup-after-function-cancellation.md
    cloudflare-workers-environment-variables.md
    durable-endpoints.md
    email-sequence.md
    fan-out.md
    fetch-run-status-and-output.md
    human-in-the-loop.md
    open-telemetry.md
    realtime-publish-subscribe.md
    scheduled-task.md
    scheduling-one-off-function.md
    singleton-function.md
    step-workflow.md
    track-failures-in-datadog.md
  scripts/
    README.md
    cli.md
    deploy.md
    dev.md
    docker.md
    env.md
    setup.md
    test-events.md
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
| NonRetriableError・Inngest エラー型・checkpointing | functions | [references/functions/README.md](references/functions/README.md) |
| cron jitter・遅延開始・プラン / プラットフォーム制限 | functions | [references/functions/README.md](references/functions/README.md) |
| step.run / step.sleep / step.waitForEvent の使い方 | steps | [references/steps/README.md](references/steps/README.md) |
| step.invoke・並列ステップ・条件分岐・エラーハンドリング | steps | [references/steps/README.md](references/steps/README.md) |
| step.fetch・step.waitForSignal による HTTP オフロード・シグナル待機 | steps | [references/steps/README.md](references/steps/README.md) |
| step.metadata・ループ内 step の扱い | steps | [references/steps/README.md](references/steps/README.md) |
| イベント送信・イベントペイロードスキーマ定義 | events | [references/events/README.md](references/events/README.md) |
| ファンアウト・Webhook・イベント命名規約・TypeScript 型定義 | events | [references/events/README.md](references/events/README.md) |
| セッションによるラン集約・CEL 式によるマッチング条件記述 | events | [references/events/README.md](references/events/README.md) |
| concurrency / throttle / rate-limit / debounce 設定 | flow-control | [references/flow-control/README.md](references/flow-control/README.md) |
| priority / batching / idempotency / singleton によるフロー制御 | flow-control | [references/flow-control/README.md](references/flow-control/README.md) |
| bursty concurrency・multi-tenancy・flow control simulator | flow-control | [references/flow-control/README.md](references/flow-control/README.md) |
| Inngest クライアント初期化・serve / connect の設定 | sdk | [references/sdk/README.md](references/sdk/README.md) |
| Next.js / Express / Hono などフレームワーク統合 | sdk | [references/sdk/README.md](references/sdk/README.md) |
| ミドルウェア（DI・暗号化・Sentry）・SDK v3/v4 差分の確認 | sdk | [references/sdk/README.md](references/sdk/README.md) |
| trigger helpers（eventType / cron / invoke / staticSchema）・logger・Extended Traces | sdk | [references/sdk/README.md](references/sdk/README.md) |
| referenceFunction・@inngest/test・カスタムシリアライズ・ESLint プラグイン | sdk | [references/sdk/README.md](references/sdk/README.md) |
| 署名キー・イベントキー・環境変数・環境設定・鍵ローテーション | platform | [references/platform/README.md](references/platform/README.md) |
| デプロイ（Vercel / Netlify / Cloudflare / DigitalOcean / Render）・セルフホスト | platform | [references/platform/README.md](references/platform/README.md) |
| Dev Server のセットアップ・オブザーバビリティ・トレース・リプレイ | platform | [references/platform/README.md](references/platform/README.md) |
| Insights によるクエリ分析・Datadog 連携・バルクキャンセル | platform | [references/platform/README.md](references/platform/README.md) |
| 関数の pause / resume・単一 run の rerun | platform | [references/platform/README.md](references/platform/README.md) |
| step.ai.infer / step.ai.wrap による AI 推論ステップ | ai | [references/ai/README.md](references/ai/README.md) |
| エージェントループ・Human-in-the-Loop・サブエージェント委譲 | ai | [references/ai/README.md](references/ai/README.md) |
| Agent Evals・scoring・group.experiment によるエージェント評価 | ai | [references/ai/README.md](references/ai/README.md) |
| Agent Evals の quick start / reference / limits・LLM judge・user feedback | ai | [references/ai/README.md](references/ai/README.md) |
| モデル・プロンプト比較・評価コスト管理ガイド | ai | [references/ai/README.md](references/ai/README.md) |
| Agent Skills / MCP dev server などエージェント向け開発ツール | ai | [references/ai/README.md](references/ai/README.md) |
| Inngest CLI をコーディングエージェントから使う | ai | [references/ai/README.md](references/ai/README.md) |
| チャンネル・トピックの定義とリアルタイム配信の publish/subscribe | realtime | [references/realtime/README.md](references/realtime/README.md) |
| useRealtime での購読・subscription token の発行 | realtime | [references/realtime/README.md](references/realtime/README.md) |
| AI 応答のストリーミング・サーバー側購読 | realtime | [references/realtime/README.md](references/realtime/README.md) |
| Realtime の制限・トラブルシュート | realtime | [references/realtime/README.md](references/realtime/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・デプロイ手順を知りたい | scripts | [scripts/README.md](scripts/README.md) |
| Inngest CLI（Cloud の run / trace 取得）・Docker で動かしたい | scripts | [scripts/README.md](scripts/README.md) |
