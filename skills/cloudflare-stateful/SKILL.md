---
name: cloudflare-stateful
description: >
  Cloudflare Workers のステートフル基盤 (Durable Objects / Queues / Workflows) の
  リファレンス。DurableObject、ctx.storage SQL / KV API、alarms、WebSocket hibernation、
  Queues producer / consumer、DLQ、pull consumers、
  WorkflowEntrypoint、step.do / sleep / waitForEvent。
  ランタイムは cloudflare-workers、Wrangler は cloudflare-wrangler、Agents SDK は cloudflare-agents、Upstash QStash・Inngest・BullMQ とは別。
user-invocable: false
---

# Cloudflare ステートフル基盤 リファレンス

Cloudflare Workers 上のステートフル 3 製品 — Durable Objects（強い一貫性を持つ単一インスタンス + 永続ストレージ）、Queues（メッセージキュー）、Workflows（耐久実行ワークフロー）— を扱う。各製品の Workers バインディング API、設定、運用、制限、料金、実例、`wrangler` コマンドを参照する。

## 対象バージョン

- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため、`cloudflare/cloudflare-docs` の production SHA `34d908a`（2026-11-14 取得、旧 pin `d0995b9` は 2026-11-03 取得）と取得日 2026-11-14 で pin。Queues は d0995b9 → 34d908a 間で差分なし
- binding 型製品のため npm パッケージの版数は無い

## 他スキルとの使い分け

- cloudflare-workers: `env` / bindings の概念、service bindings、RPC、ランタイム API。本スキルは Durable Objects / Queues / Workflows 固有のバインディング API のみ扱う
- cloudflare-wrangler: Wrangler 全般、設定ファイルのキー仕様、Miniflare / Vitest。本スキルは製品別の `wrangler queues` / `workflows` 等のサブコマンドのみ扱う
- cloudflare-storage: D1 / KV / R2 / Hyperdrive は別製品。Durable Objects の `ctx.storage`（SQLite / KV API）は本スキルが担当
- cloudflare-agents: Durable Objects 上に構築するエージェント（Agents SDK）は cloudflare-agents が担当
- drizzle: Durable Objects の SQLite を Drizzle ORM で扱う場合は drizzle が担当
- upstash / inngest / bullmq: Upstash QStash、Inngest、BullMQ は別製品。Cloudflare Queues / Workflows とは別物
- cloudflare-ai / cloudflare-pages / cloudflare-sandbox-containers: Workers AI・AI Gateway・Vectorize・AI Search、Pages、Containers / Sandbox SDK（Durable Object から起動するコンテナ）は各スキル。いずれにも無い Cloudflare 製品は公式 docs（`https://developers.cloudflare.com/<product>/`）を参照

## ディレクトリ構成

```text
skills/cloudflare-stateful/
  SKILL.md
  references/
    durable-objects/
      README.md
      access-storage.md
      alarms.md
      automatic-retries.md
      base-class.md
      class-migrations-legacy.md
      code-updates.md
      create-stubs-and-send-requests.md
      data-location.md
      data-security.md
      data-studio.md
      durable-object-lifecycle.md
      environments.md
      error-handling.md
      faq.md
      get-started.md
      glossary.md
      id.md
      in-memory-state.md
      known-issues.md
      legacy-kv-storage-api.md
      limits.md
      metrics-and-analytics.md
      migrations.md
      namespace.md
      overview.md
      pricing.md
      rules-of-durable-objects.md
      spend-management.md
      sqlite-storage-api.md
      state.md
      stub.md
      troubleshooting.md
      webgpu.md
      websockets.md
      what-are-durable-objects.md
    queues/
      README.md
      audit-logs.md
      batching-retries.md
      configure-queues.md
      consumer-api.md
      consumer-concurrency.md
      data-location.md
      dead-letter-queues.md
      delivery-guarantees.md
      error-codes.md
      event-schemas.md
      event-subscriptions.md
      get-started.md
      how-queues-works.md
      limits.md
      local-development.md
      metrics.md
      overview.md
      pause-purge.md
      pricing.md
      producer-api.md
      pull-consumers.md
      wrangler-commands.md
    workflows/
      README.md
      call-workflows-from-pages.md
      changelog.md
      concurrency-limits.md
      data-location.md
      durable-agents.md
      event-subscriptions.md
      events-and-parameters.md
      get-started.md
      glossary.md
      limits.md
      local-development.md
      metrics-analytics.md
      overview.md
      pricing.md
      python-bindings.md
      python-dag.md
      python-sdk.md
      rollback.md
      rules-of-workflows.md
      sleeping-and-retrying.md
      step-config-and-context.md
      subscribe-instance-events.md
      trigger-workflows.md
      visualizer.md
      workflow-binding.md
      workflow-configuration.md
      workflow-entrypoint.md
      workflow-instance.md
      workflow-step.md
      wrangler-commands.md
  samples/
    README.md
    durable-object-alarm-batching.md
    durable-object-counter.md
    durable-object-in-memory-state.md
    durable-object-readable-stream.md
    durable-object-rpctarget-metadata.md
    durable-object-ttl.md
    durable-object-with-kv.md
    queues-batch-errors-to-r2.md
    queues-handle-rate-limits.md
    queues-publish-from-durable-object.md
    queues-publish-from-worker.md
    queues-publish-via-http.md
    websocket-hibernation-server.md
    workflows-cart-invoice.md
    workflows-d1-backup-to-r2.md
    workflows-wait-for-event-approval.md
  scripts/
    README.md
    durable-objects.md
    queues.md
    workflows.md
```

## 探索手順

タスクから製品カテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリ（durable-objects / queues / workflows / samples / scripts）を探す
2. そのカテゴリの `references/{category}/README.md`（samples / scripts は直下の `README.md`）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Durable Objects の概念・ライフサイクル・設計ルールを知りたい | durable-objects | [references/durable-objects/README.md](references/durable-objects/README.md) |
| DurableObject クラス・stub・namespace・ID の API を調べたい | durable-objects | [references/durable-objects/README.md](references/durable-objects/README.md) |
| ctx.storage の SQL API / KV API を使いたい | durable-objects | [references/durable-objects/README.md](references/durable-objects/README.md) |
| alarms・WebSocket hibernation・in-memory state を扱いたい | durable-objects | [references/durable-objects/README.md](references/durable-objects/README.md) |
| Durable Objects の migrations・制限・料金・spending limit・stub 呼び出しの自動リトライ・トラブルシュートを確認したい | durable-objects | [references/durable-objects/README.md](references/durable-objects/README.md) |
| Queues に Worker からメッセージを送信（producer）したい | queues | [references/queues/README.md](references/queues/README.md) |
| Queues の consumer・バッチ・リトライ・並行数を設定したい | queues | [references/queues/README.md](references/queues/README.md) |
| dead letter queue・pull consumer・pause / purge を扱いたい | queues | [references/queues/README.md](references/queues/README.md) |
| Queues の配信保証・制限・料金・エラーコードを確認したい | queues | [references/queues/README.md](references/queues/README.md) |
| Workflow を WorkflowEntrypoint で定義し最初のインスタンスを動かしたい | workflows | [references/workflows/README.md](references/workflows/README.md) |
| step.do / step.sleep / step.waitForEvent の API・リトライ設定を調べたい | workflows | [references/workflows/README.md](references/workflows/README.md) |
| Workflow インスタンスの起動・状態取得・イベント送信・rollback を扱いたい | workflows | [references/workflows/README.md](references/workflows/README.md) |
| Workflows の制限・per-Workflow concurrency limit・料金・Python SDK・ローカル開発を確認したい | workflows | [references/workflows/README.md](references/workflows/README.md) |
| 典型的な使い方を知りたい（Durable Objects / Queues / Workflows の実例） | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド（wrangler の queues / workflows / Durable Objects 関連）を知りたい | scripts | [scripts/README.md](scripts/README.md) |
