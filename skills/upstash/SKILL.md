---
name: upstash
description: >
  Upstash サーバーレスデータプラットフォーム (JS SDK)。
  @upstash/redis (REST, pipelining, JSON, Redis Search hybrid),
  @upstash/ratelimit (Sliding Window, Token Bucket),
  QStash (publishJSON, schedules, queues, DLQ),
  @upstash/vector (upsert, query, reranking),
  @upstash/workflow (serve, context.run),
  Upstash Search, @upstash/box, upstash CLI。
  Rust 製 fandhe-db、Cloudflare KV / D1 / R2 (cloudflare-storage) とは別。
user-invocable: false
---

Docs retrieved 2026-11-14 (Markdown twins; pages not re-fetched keep their earlier 2026-10-17 date in Notes). Covers @upstash/workflow 1.5.1 (1.0.0 breaking changes reflected; 1.5.0 step-level flow control / retries), @upstash/qstash 2.12.2, @upstash/redis 1.41.0 (1.40.0 `responseEncoding` default `false`; 1.41.0 hybrid search), @upstash/vector 1.2.4, @upstash/search 0.1.8, @upstash/ratelimit 2.2.1, @upstash/box 0.8.0 (box-cli 0.4.0), upstash CLI 1.7.0. Not caught up: `redis/commands-vector.md` / `commands-array.md` and the Python SDK pages were not re-checked; the `workflow-webhook` / `workflow-human-in-the-loop` samples still cite example projects at `@upstash/workflow` v1.4.0.

## ディレクトリ構成

```text
skills/upstash/
  SKILL.md
  references/
    redis/
      README.md
      branching.md
      commands-array.md
      commands-bitmap.md
      commands-functions.md
      commands-generic.md
      commands-hash.md
      commands-json.md
      commands-list.md
      commands-scripting.md
      commands-set.md
      commands-streams.md
      commands-string.md
      commands-vector.md        # Redis VECTOR.* コマンド（Upstash Vector とは別製品）
      commands-zset.md
      compatibility.md
      connection-auth.md
      deployment.md
      durability.md
      eviction.md
      global-replication.md
      key-locking.md
      pipelining-transactions.md
      py-pipelining.md
      py-sdk-overview.md
      replication.md
      rest-api.md
      search-adapters.md
      search-aggregation-operators.md
      search-aggregations.md
      search-field-operators.md
      search-getting-started.md
      search-hybrid-search.md
      search-index-management.md
      search-introduction.md
      search-query-operators.md
      search-querying.md
      search-recipes.md
      search-retrievers.md
      search-schema-definition.md
      search-streams.md
      search-troubleshooting.md
      security.md
      ts-developing-testing.md
      ts-sdk-overview.md
      ts-troubleshooting.md
    ratelimit/
      README.md
      algorithms.md
      costs.md
      features.md
      integrations-strapi.md
      methods.md
      overview.md
      python-sdk.md
      traffic-protection.md
    qstash/
      README.md
      api-bulk-actions.md
      api-dlq.md
      api-flow-control.md
      api-logs.md
      api-messages.md
      api-queues.md
      api-rate-limits.md
      api-schedules.md
      api-signing-keys.md
      api-url-groups.md
      at-least-once.md
      batch.md
      bulk-actions.md
      callbacks.md
      changelog.md
      deduplication.md
      delay.md
      dlq.md
      flow-control.md
      handling-failures.md
      integrations.md
      local-development.md
      logs.md
      mcp.md
      messages.md
      multi-region.md
      overview.md
      publish.md
      python-sdk.md
      queues.md
      receiver.md
      redact-fields.md
      retry.md
      schedules.md
      security.md
      url-groups.md
    vector/                     # Upstash Vector（マネージド製品。Redis VECTOR.* とは別）
      README.md
      api-endpoints.md
      changelog.md
      delete.md
      embedding-models.md
      faq.md
      fetch.md
      filtering.md
      hybrid-indexes.md
      info-reset.md
      integrations.md
      metadata.md
      namespace.md
      php-sdk.md
      python-sdk.md
      query.md
      range.md
      resumable-query.md
      similarity-functions.md
      sparse-indexes.md
      ts-sdk-overview.md
      tutorials.md
      update.md
      upsert.md
    workflow/
      README.md
      agents-patterns.md
      agents.md
      api-reference-bulk-actions.md
      api-reference-dlq.md
      api-reference-flow-control.md
      api-reference-logs-notify.md
      api-reference-runs.md
      api-reference-signing-keys.md
      best-practices.md
      changelog.md
      client-cancel.md
      client-dlq.md
      client-logs.md
      client-notify.md
      client-trigger.md
      client-waiters.md
      client.md
      configure-run.md
      context-api.md
      context-call.md
      context-cancel.md
      context-invoke.md
      context-notify.md
      context-run.md
      context-sleep.md
      context-wait-for-event.md
      context-webhook.md
      context.md
      dlq.md
      failure-callback.md
      failures.md
      flow-control.md
      how-it-works.md
      integration-aisdk.md
      integration-monitoring.md
      local-development.md
      middlewares.md
      migrations.md
      multi-region.md
      overview.md
      parallel-steps.md
      platforms.md
      pricing.md
      quickstart-astro.md
      quickstart-cloudflare.md
      quickstart-express.md
      quickstart-fastapi.md
      quickstart-flask.md
      quickstart-hono.md
      quickstart-nextjs-fastapi.md
      quickstart-nextjs-flask.md
      quickstart-nextjs.md
      quickstart-nuxt.md
      quickstart-solidjs.md
      quickstart-svelte.md
      quickstart-tanstack-start.md
      realtime.md
      redact-fields.md
      retries.md
      retry-now.md
      schedule.md
      security.md
      serve-many.md
      serve.md
      singleton.md
      start-run.md
      tokens.md
      troubleshooting.md
      update-workflow.md
      wait-for-event.md
      webhooks.md
    search/
      README.md
      advanced-settings.md
      algorithm.md
      content-and-metadata.md
      delete.md
      docusaurus.md
      faq.md
      fetch.md
      filtering.md
      getting-started.md
      indexes.md
      info-reset.md
      info.md
      overview.md
      pricing.md
      python-sdk.md
      range.md
      reranking.md
      reset.md
      search-ui.md
      search.md
      tools.md
      ts-sdk-overview.md
      tutorials.md
      upsert.md
    box/
      README.md
      agent.md
      attach-headers.md
      browser-ai-actions.md
      browser-connect.md
      browser-cookbook.md
      browser-live-view.md
      browser-overview.md
      browser-reading-pages.md
      browser-recordings.md
      browser-tabs.md
      custom-agent.md
      custom-harness-examples.md
      ephemeral-box.md
      filesystem.md
      git.md
      guides-ai-sdk-code-interpreter.md
      guides-browser-use.md
      guides-claude-managed-agents.md
      guides-code-review-agent.md
      guides-copilotkit.md
      guides-crabbox-setup.md
      guides-eve-setup.md
      guides-herdr-setup.md
      guides-hermes-plugin-setup.md
      guides-hermes-setup.md
      guides-langchain-deep-agents.md
      guides-neon-ai-gateway.md
      guides-nextjs-setup.md
      guides-openai-agents-api.md
      guides-openclaw-setup.md
      guides-orca-setup.md
      guides-pi-setup.md
      guides-remote-development.md
      guides-t3-code-setup.md
      guides-tanstack-ai-file-editor.md
      guides-web-scraping-playwright.md
      how-it-works.md
      keep-alive.md
      live-sessions.md
      network-policy.md
      preview.md
      pricing.md
      quickstart.md
      schedules.md
      security.md
      shell.md
      snapshots.md
      use-cases.md
  samples/
    README.md
    box-agent-sandbox.md
    box-code-execution.md
    qstash-background-job.md
    ratelimit-edge.md
    redis-session-cache.md
    search-filtered-query.md
    vector-semantic-search.md
    workflow-human-in-the-loop.md
    workflow-multistep.md
    workflow-webhook.md
  scripts/
    README.md
    cli.md
    dev.md
    install.md
    operations.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Redis クライアントの初期化・接続設定を知りたい | redis | [references/redis/README.md](references/redis/README.md) |
| Redis コマンド（GET/SET/HSET/ZADD 等）を知りたい | redis | [references/redis/README.md](references/redis/README.md) |
| Redis Search（全文検索・集計）を使いたい | redis | [references/redis/README.md](references/redis/README.md) |
| グローバルレプリケーション・耐久性・セキュリティを知りたい | redis | [references/redis/README.md](references/redis/README.md) |
| レートリミットのアルゴリズム（Fixed Window 等）を知りたい | ratelimit | [references/ratelimit/README.md](references/ratelimit/README.md) |
| `limit()` / `blockUntilReady()` メソッドを知りたい | ratelimit | [references/ratelimit/README.md](references/ratelimit/README.md) |
| IP・国・ユーザーエージェントによるトラフィック制御をしたい | ratelimit | [references/ratelimit/README.md](references/ratelimit/README.md) |
| メッセージの発行（publish）・スケジューリングをしたい | qstash | [references/qstash/README.md](references/qstash/README.md) |
| FIFO キュー・DLQ・URL グループを使いたい | qstash | [references/qstash/README.md](references/qstash/README.md) |
| QStash リクエストの署名検証をしたい | qstash | [references/qstash/README.md](references/qstash/README.md) |
| メッセージ配信ログ（Logs）を確認したい | qstash | [references/qstash/README.md](references/qstash/README.md) |
| ベクターの upsert・類似検索（ANN）をしたい | vector | [references/vector/README.md](references/vector/README.md) |
| メタデータフィルタリング・ハイブリッド検索・sparse index を使いたい | vector | [references/vector/README.md](references/vector/README.md) |
| 埋め込みモデル・名前空間（namespace）を知りたい | vector | [references/vector/README.md](references/vector/README.md) |
| 耐久性のあるワークフロー（durable execution）を定義したい | workflow | [references/workflow/README.md](references/workflow/README.md) |
| context.run / sleep / call / invoke / waitForEvent を知りたい | workflow | [references/workflow/README.md](references/workflow/README.md) |
| ワークフローのエラー処理・リトライ・並列ステップを知りたい | workflow | [references/workflow/README.md](references/workflow/README.md) |
| AI エージェントパイプライン（durable agents）を構築したい | workflow | [references/workflow/README.md](references/workflow/README.md) |
| フルテキスト・セマンティック検索インデックスを作成・検索したい | search | [references/search/README.md](references/search/README.md) |
| Search のフィルタリング・reranking・スコアリングを知りたい | search | [references/search/README.md](references/search/README.md) |
| AI エージェント用のサンドボックス（コンテナ）を作成・操作したい | box | [references/box/README.md](references/box/README.md) |
| Box のファイルシステム・git・ブラウザ（CDP/AI actions）を操作したい | box | [references/box/README.md](references/box/README.md) |
| Box のネットワークポリシー・スナップショット・スケジュールを設定したい | box | [references/box/README.md](references/box/README.md) |
| Workflow 1.0 への移行・破壊的変更を知りたい | workflow | [references/workflow/README.md](references/workflow/README.md)（migrations.md） |
| Workflow のベストプラクティス・トラブルシュートを知りたい | workflow | [references/workflow/README.md](references/workflow/README.md)（best-practices.md / troubleshooting.md） |
| Workflow の middlewares・ログ出力を設定したい | workflow | [references/workflow/README.md](references/workflow/README.md)（middlewares.md） |
| Webhook（createWebhook / waitForWebhook）・realtime・人間承認（HITL）を実装したい | workflow | [references/workflow/README.md](references/workflow/README.md)（webhooks.md / context-webhook.md / realtime.md） |
| Workflow の DLQ 操作（再実行・retry-now・失敗関数）をしたい | workflow | [references/workflow/README.md](references/workflow/README.md)（dlq.md / client-dlq.md / failures.md） |
| Box の EphemeralBox・keep-alive・public URL プレビュー・shell を使いたい | box | [references/box/README.md](references/box/README.md) |
| Box で独自エージェント（custom harness）を動かしたい | box | [references/box/README.md](references/box/README.md)（custom-agent.md / custom-harness-examples.md） |
| Redis の VECTOR.* コマンド（Redis 側のベクトル索引）を使いたい | redis | [references/redis/README.md](references/redis/README.md)（commands-vector.md。マネージドの Upstash Vector は別製品で vector カテゴリ） |
| Redis の Array / Functions コマンドを知りたい | redis | [references/redis/README.md](references/redis/README.md)（commands-array.md / commands-functions.md） |
| Redis Search のスキーマ定義・クエリ・インデックス管理・streams を知りたい | redis | [references/redis/README.md](references/redis/README.md)（search-*.md） |
| QStash のローカル開発・リトライ・重複排除・マルチリージョンを知りたい | qstash | [references/qstash/README.md](references/qstash/README.md) |
| ratelimit を Python SDK で使いたい | ratelimit | [references/ratelimit/README.md](references/ratelimit/README.md)（python-sdk.md） |
| ローカル開発サーバーのコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md)（dev.md） |
| Workflow の Webhook・人間承認の典型実装を知りたい | samples | [samples/README.md](samples/README.md)（workflow-webhook.md / workflow-human-in-the-loop.md） |
| Redis Search のハイブリッド検索（`$rrf` / `$ann` / `$standard` retrievers）・field / aggregation operators を知りたい | redis | [references/redis/README.md](references/redis/README.md)（search-hybrid-search.md / search-retrievers.md / search-field-operators.md / search-aggregation-operators.md） |
| Redis のキーロック・ブランチ・Streams / Bitmap / Scripting を知りたい | redis | [references/redis/README.md](references/redis/README.md)（key-locking.md / branching.md / commands-streams.md / commands-bitmap.md / commands-scripting.md） |
| QStash / Workflow の REST API エンドポイント（messages・DLQ・flow control・runs・logs 等）を知りたい | qstash / workflow | [references/qstash/README.md](references/qstash/README.md)（api-*.md）/ [references/workflow/README.md](references/workflow/README.md)（api-reference-*.md） |
| Workflow のステップ単位 flowControl / retries（`context.run` の options）を知りたい | workflow | [references/workflow/README.md](references/workflow/README.md)（context-run.md / flow-control.md / retries.md） |
| Box の料金・ユースケース・API キー（`StoredKey`）・Neon AI Gateway 連携を知りたい | box | [references/box/README.md](references/box/README.md)（pricing.md / use-cases.md / agent.md / guides-neon-ai-gateway.md） |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
