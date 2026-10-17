---
name: upstash
description: >
  Upstash サーバーレスデータプラットフォーム (マネージド SaaS の JS SDK)。
  @upstash/redis (REST, pipelining, transactions, JSON, Redis Search, VECTOR/Array/Functions コマンド)、
  @upstash/ratelimit (Fixed/Sliding Window, Token Bucket, blockUntilReady)、
  QStash (publishJSON, schedules, queues, URL Groups, flow-control, DLQ)、
  @upstash/vector (upsert, query, ANN, namespace, hybrid/sparse index, embedding models, reranking)、
  @upstash/workflow (serve, durable execution, context.run/sleep/call/invoke, waitForEvent, parallel steps, agents)、
  @upstash/search、@upstash/box (サンドボックス, filesystem, git, CDP, browser, network policy, snapshots, custom harness)、
  upstash CLI。Rust 製 fandhe-db とは別。
user-invocable: false
---

Docs retrieved 2026-10-17 (Markdown twins). Covers @upstash/workflow 1.4.0 (1.0.0 breaking changes reflected), @upstash/qstash 2.12.0, @upstash/redis 1.39.0, @upstash/vector 1.2.3, @upstash/search 0.1.7, @upstash/ratelimit 2.2.0, @upstash/box 0.7.9, upstash CLI 1.5.0.

## ディレクトリ構成

```text
skills/upstash/
  SKILL.md
  references/
    redis/
      README.md
      ts-sdk-overview.md
      py-sdk-overview.md
      connection-auth.md
      rest-api.md
      pipelining-transactions.md
      py-pipelining.md
      commands-string.md
      commands-hash.md
      commands-list.md
      commands-set.md
      commands-zset.md
      commands-json.md
      commands-generic.md
      commands-vector.md        # Redis VECTOR.* コマンド（Upstash Vector とは別製品）
      commands-array.md
      commands-functions.md
      global-replication.md
      replication.md
      search-introduction.md
      search-getting-started.md
      search-schema-definition.md
      search-querying.md
      search-query-operators.md
      search-aggregations.md
      search-index-management.md
      search-streams.md
      search-adapters.md
      deployment.md
      security.md
      durability.md
      eviction.md
      compatibility.md
    ratelimit/
      README.md
      overview.md
      algorithms.md
      methods.md
      features.md
      traffic-protection.md
      costs.md
      integrations-strapi.md
      python-sdk.md
    qstash/
      README.md
      overview.md
      publish.md
      batch.md
      schedules.md
      queues.md
      dlq.md
      callbacks.md
      url-groups.md
      receiver.md
      messages.md
      flow-control.md
      logs.md
      retry.md
      delay.md
      deduplication.md
      local-development.md
      multi-region.md
      redact-fields.md
      python-sdk.md
      bulk-actions.md
    vector/                     # Upstash Vector（マネージド製品。Redis VECTOR.* とは別）
      README.md
      ts-sdk-overview.md
      upsert.md
      query.md
      fetch.md
      delete.md
      range.md
      filtering.md
      metadata.md
      similarity-functions.md
      namespace.md
      resumable-query.md
      hybrid-indexes.md
      sparse-indexes.md
      embedding-models.md
      info-reset.md
      python-sdk.md
    workflow/
      README.md
      overview.md
      how-it-works.md
      best-practices.md
      migrations.md
      troubleshooting.md
      serve.md
      serve-many.md
      context.md
      context-api.md
      context-run.md
      context-sleep.md
      context-call.md
      context-invoke.md
      context-wait-for-event.md
      context-notify.md
      context-cancel.md
      context-webhook.md
      parallel-steps.md
      wait-for-event.md
      webhooks.md
      realtime.md
      singleton.md
      middlewares.md
      flow-control.md
      retries.md
      retry-now.md
      failures.md
      failure-callback.md
      dlq.md
      security.md
      redact-fields.md
      multi-region.md
      update-workflow.md
      client.md
      client-trigger.md
      client-cancel.md
      client-notify.md
      client-logs.md
      client-dlq.md
      client-waiters.md
      schedule.md
      local-development.md
      agents.md
      quickstart-nextjs.md
      quickstart-hono.md
      quickstart-express.md
      quickstart-cloudflare.md
      quickstart-nuxt.md
      quickstart-astro.md
      quickstart-svelte.md
      quickstart-solidjs.md
      quickstart-tanstack-start.md
      quickstart-fastapi.md
      quickstart-flask.md
      quickstart-nextjs-fastapi.md
      quickstart-nextjs-flask.md
    search/
      README.md
      overview.md
      getting-started.md
      search.md
      upsert.md
      fetch.md
      delete.md
      range.md
      filtering.md
      indexes.md
      content-and-metadata.md
      algorithm.md
      advanced-settings.md
      reranking.md
      info.md
      info-reset.md
      reset.md
      pricing.md
      ts-sdk-overview.md
      python-sdk.md
      search-ui.md
      docusaurus.md
      tools.md
    box/
      README.md
      quickstart.md
      how-it-works.md
      agent.md
      custom-agent.md
      custom-harness-examples.md
      ephemeral-box.md
      keep-alive.md
      live-sessions.md
      shell.md
      preview.md
      attach-headers.md
      filesystem.md
      git.md
      network-policy.md
      schedules.md
      security.md
      snapshots.md
      browser-overview.md
      browser-tabs.md
      browser-reading-pages.md
      browser-ai-actions.md
      browser-live-view.md
      browser-recordings.md
      browser-connect.md
      browser-cookbook.md
      guides-ai-sdk-code-interpreter.md
      guides-browser-use.md
      guides-claude-managed-agents.md
      guides-code-review-agent.md
      guides-copilotkit.md
      guides-crabbox-setup.md
      guides-eve-setup.md
      guides-hermes-setup.md
      guides-herdr-setup.md
      guides-langchain-deep-agents.md
      guides-nextjs-setup.md
      guides-openai-agents-api.md
      guides-openclaw-setup.md
      guides-pi-setup.md
      guides-remote-development.md
      guides-t3-code-setup.md
      guides-tanstack-ai-file-editor.md
      guides-web-scraping-playwright.md
  samples/
    README.md
    redis-session-cache.md
    ratelimit-edge.md
    qstash-background-job.md
    vector-semantic-search.md
    workflow-multistep.md
    workflow-webhook.md
    workflow-human-in-the-loop.md
    search-filtered-query.md
    box-agent-sandbox.md
    box-code-execution.md
  scripts/
    README.md
    install.md
    cli.md
    dev.md
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
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
