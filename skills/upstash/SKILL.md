---
name: upstash
description: >
  Upstash サーバーレスデータプラットフォームリファレンス。
  @upstash/redis — REST API、pipelining、transactions、JSON、Search、グローバルレプリケーション。
  @upstash/ratelimit — Fixed Window、Sliding Window、Token Bucket、limit、blockUntilReady。
  QStash — publishJSON、schedules、queues、DLQ、URL Groups、callbacks、flow-control。
  @upstash/vector — upsert、query、ANN、hybrid index、sparse index、embedding models、namespace。
  @upstash/workflow — durable execution、serve、context.run/sleep/call/invoke、waitForEvent、parallel steps、agents。
  Upstash Search — search、upsert、fetch、range、filtering、reranking、algorithm、@upstash/search。
  Upstash Box — サンドボックス、agent、filesystem、git、browser（CDP/AI actions/recordings）、network policy、snapshots、schedules。
user-invocable: false
---

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
      global-replication.md
      replication.md
      search-introduction.md
      search-getting-started.md
      search-query-operators.md
      search-aggregations.md
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
    vector/
      README.md
      ts-sdk-overview.md
      upsert.md
      query.md
      fetch.md
      delete.md
      range.md
      filtering.md
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
      serve.md
      serve-many.md
      context.md
      context-run.md
      context-sleep.md
      context-call.md
      context-invoke.md
      context-wait-for-event.md
      context-notify.md
      parallel-steps.md
      wait-for-event.md
      flow-control.md
      retries.md
      failures.md
      security.md
      client.md
      client-trigger.md
      client-cancel.md
      client-notify.md
      client-logs.md
      schedule.md
      local-development.md
      agents.md
      quickstart-nextjs.md
      quickstart-hono.md
      quickstart-express.md
      quickstart-cloudflare.md
      quickstart-nuxt.md
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
    box/
      README.md
      quickstart.md
      agent.md
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
      guides-ai-sdk-code-interpreter.md
      guides-code-review-agent.md
      guides-crabbox-setup.md
      guides-hermes-setup.md
      guides-langchain-deep-agents.md
      guides-nextjs-setup.md
      guides-openclaw-setup.md
      guides-pi-setup.md
      guides-remote-development.md
      guides-tanstack-ai-file-editor.md
      guides-web-scraping-playwright.md
  samples/
    README.md
    redis-session-cache.md
    ratelimit-edge.md
    qstash-background-job.md
    vector-semantic-search.md
    workflow-multistep.md
    search-filtered-query.md
    box-agent-sandbox.md
    box-code-execution.md
  scripts/
    README.md
    install.md
    cli.md
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
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
