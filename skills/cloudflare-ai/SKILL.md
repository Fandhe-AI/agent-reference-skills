---
name: cloudflare-ai
description: >
  Cloudflare の AI 基盤 (Workers AI / AI Gateway / Vectorize / AI Search)
  リファレンス。env.AI.run、REST API、OpenAI 互換、function calling、batch API、LoRA、
  モデルカタログ (text generation / embeddings / image / ASR / TTS)、
  AI Gateway (caching / rate limiting / fallbacks / BYOK / model aliases)、
  VectorizeIndex (upsert/query)、AI Search (旧 AutoRAG、D1/R2、namespaces)。
  Agents SDK は cloudflare-agents、Upstash Vector・各社 API とは別。
user-invocable: false
---

# Cloudflare AI 基盤 リファレンス

Cloudflare 開発者プラットフォームの AI 4 製品 — Workers AI（サーバーレス推論・モデルカタログ）、AI Gateway（LLM リクエストのプロキシ・可観測性・制御）、Vectorize（ベクトルデータベース）、AI Search（旧 AutoRAG、マネージド RAG）— を扱う。各製品の Workers バインディング API、REST API、設定、運用、制限、料金を参照する。

## 対象バージョン

- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため、`cloudflare/cloudflare-docs` の production SHA `34d908abc615fdf22eeb386b171b9657b9abcf38` と取得日 2026-11-14 で pin（旧 pin: `d0995b9` / 2026-11-03）
- 参考: npm `workers-ai-provider` 4.0.1（docs では `createAI` への移行を推奨と注記）/ `ai-gateway-provider` 4.0.2

## 他スキルとの使い分け

- cloudflare-workers: `env` / bindings の概念、service bindings、RPC、ランタイム API。本スキルは AI 関連バインディング（`env.AI` / Vectorize / AI Search）の API のみ扱う
- cloudflare-wrangler: Wrangler 全般（install / dev / deploy / 設定ファイルのキー仕様）。`wrangler vectorize` コマンドの詳細は cloudflare-wrangler の commands/vectorize.md ほかを参照。本スキルの `wrangler-commands.md` / `scripts/` は製品別の要点のみ
- cloudflare-storage: R2 / KV / D1 の API。AI Search のデータソースとしての R2 の設定は本スキル、R2 バケット自体の操作は cloudflare-storage
- cloudflare-agents: Agents SDK（Cloudflare 上のエージェント実装）は cloudflare-agents が担当。本スキルは AI Search の `agent-sdks` など接点のページのみ
- vercel-ai-sdk: `ai` / `@ai-sdk/*` 本体は vercel-ai-sdk。本スキルは `workers-ai-provider` / `ai-gateway-provider` を使う側の Cloudflare 設定のみ
- openai-api-core / anthropic-api-core / google-gemini-api: 各プロバイダー API 本体は別スキル。AI Gateway はそれらを中継する Cloudflare 側の機能のみ
- upstash: Upstash Vector は別製品。Vectorize とは別物
- fandhe-db: Rust 製 vector 特化クエリ DB。Vectorize とは別製品
- cloudflare-stateful: Durable Objects / Queues / Workflows（`https://developers.cloudflare.com/durable-objects/` ほか）は cloudflare-stateful。いずれにも無い Cloudflare 製品は公式 docs（`https://developers.cloudflare.com/<product>/`）を参照

## ディレクトリ構成

```text
skills/cloudflare-ai/
  SKILL.md
  references/
    workers-ai/
      README.md
      ai-sdk.md
      batch-api.md
      bindings-and-run.md
      data-usage.md
      embedded-function-calling-examples.md
      embedded-function-calling.md
      errors.md
      event-subscriptions.md
      extraction-models.md
      fine-tunes-loras.md
      function-calling.md
      get-started-dashboard.md
      glossary.md
      hugging-face-chat-ui.md
      json-mode.md
      limits.md
      markdown-conversion-formats.md
      markdown-conversion-options.md
      markdown-conversion-rest-api.md
      markdown-conversion.md
      openai-compatibility.md
      overview.md
      pi-ai.md
      pricing.md
      prompt-caching.md
      prompting.md
      public-loras.md
      reject-if-busy.md
      rest-api.md
      streaming.md
      tutorial-autotrain-lora.md
      tutorial-bigquery.md
      tutorial-choose-text-model.md
      tutorial-deepseek-coder.md
      tutorial-jupyter-notebook.md
      tutorial-llama-vision.md
      tutorial-rag.md
      tutorial-whisper-chunking.md
      tutorials-index.md
    workers-ai-models/
      README.md
      automatic-speech-recognition.md
      decision-models.md
      image-classification.md
      image-to-text.md
      text-classification.md
      text-embeddings.md
      text-generation-parameters.md
      text-generation.md
      text-to-image.md
      text-to-speech.md
      translation.md
    ai-gateway/
      README.md
      configuration-authentication.md
      configuration-bring-your-own-keys.md
      configuration-cloudflare-access.md
      configuration-custom-costs.md
      configuration-custom-domains.md
      configuration-custom-providers.md
      configuration-fallbacks.md
      configuration-manage-gateway.md
      configuration-request-handling.md
      evaluations-human-feedback.md
      evaluations.md
      features-auto-router.md
      features-caching.md
      features-dlp.md
      features-dynamic-routing.md
      features-guardrails.md
      features-machine-payments.md
      features-model-aliases.md
      features-rate-limiting.md
      features-spend-limits.md
      features-unified-billing.md
      get-started.md
      header-glossary.md
      integrations-ai-sdks.md
      integrations-coding-agents.md
      integrations-ide-clients.md
      integrations-workers-ai-binding.md
      observability-analytics.md
      observability-costs.md
      observability-custom-metadata.md
      observability-legacy-logs.md
      observability-log-classification.md
      observability-logging.md
      observability-logpush.md
      observability-otel-integration.md
      observability-user-insights.md
      overview.md
      reference-audit-logs.md
      reference-limits.md
      reference-pricing.md
      reference-troubleshooting.md
      usage-chat-completion.md
      usage-providers-anthropic-bedrock-vertex-gemini.md
      usage-providers-openai-compatible.md
      usage-providers-others.md
      usage-providers-overview.md
      usage-rest-api.md
      usage-universal-endpoint.md
      usage-web-search.md
      usage-websockets-api.md
      usage-worker-binding-methods.md
    vectorize/
      README.md
      binding-api.md
      changelog.md
      create-indexes.md
      distance-metrics.md
      event-subscriptions.md
      getting-started.md
      insert-vectors.md
      legacy-v1-transition.md
      limits.md
      list-vectors.md
      metadata-filtering.md
      namespaces.md
      overview.md
      pricing.md
      query-vectors.md
      what-is-a-vector-database.md
      workers-ai-embeddings.md
      wrangler-commands.md
    ai-search/
      README.md
      agent-sdks.md
      bindings-configuration.md
      bring-your-own-generation-model.md
      chat-completions.md
      chunking-and-path-filtering.md
      custom-domains-and-access.md
      data-source-d1.md
      data-source-r2.md
      data-source-website.md
      data-sources.md
      error-codes.md
      filtering.md
      get-started-python-sdk.md
      get-started-rest-api.md
      get-started-workers.md
      get-started-wrangler.md
      get-started.md
      how-ai-search-works.md
      how-to-guides.md
      indexing-methods.md
      instance-methods.md
      instances-terraform.md
      items-workers-binding.md
      limits-pricing.md
      mcp.md
      metadata-attributes.md
      migration-from-autorag.md
      models.md
      multitenancy.md
      namespace-methods.md
      namespace-public-endpoints.md
      namespaces-rest-api.md
      namespaces-terraform.md
      namespaces.md
      public-endpoint-settings.md
      public-endpoint-usage.md
      reranking-query-rewriting-system-prompt.md
      rest-api-instances-items.md
      rest-api-search.md
      result-controls-and-boosting.md
      search.md
      service-api-token.md
      similarity-cache.md
      syncing.md
      ui-snippets.md
      website-parse-types.md
      workers-binding-legacy.md
      wrangler-commands.md
  samples/
    README.md
    gateway-first-request-workers-ai.md
    gateway-replicate-video.md
    search-add-to-website.md
    search-bring-your-own-model.md
    search-chunk-citations.md
    search-fetch-and-index-pages.md
    search-human-in-the-loop-kb.md
    search-multiple-instances.md
    search-simple-engine.md
    search-streaming-citations.md
    search-tenant-filtering.md
    search-tenant-instances.md
    search-voice-knowledge-base.md
  scripts/
    README.md
    ai-gateway.md
    ai-search.md
    vectorize.md
    workers-ai.md
```

## 探索手順

タスクから製品カテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリ（workers-ai / workers-ai-models / ai-gateway / vectorize / ai-search / samples / scripts）を探す
2. そのカテゴリの `references/{category}/README.md`（samples / scripts は直下の `README.md`）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Workers AI で `env.AI.run` を呼び出したい・REST API や OpenAI 互換エンドポイントを使いたい | workers-ai | [references/workers-ai/README.md](references/workers-ai/README.md) |
| JSON mode・function calling・streaming・batch API を使いたい | workers-ai | [references/workers-ai/README.md](references/workers-ai/README.md) |
| LoRA ファインチューン・toMarkdown による Markdown 変換を扱いたい | workers-ai | [references/workers-ai/README.md](references/workers-ai/README.md) |
| Workers AI の料金・制限・エラーコードを確認したい | workers-ai | [references/workers-ai/README.md](references/workers-ai/README.md) |
| text generation のパラメーターやモデル選定基準を知りたい | workers-ai-models | [references/workers-ai-models/README.md](references/workers-ai-models/README.md) |
| embeddings・text-to-image・ASR・TTS・翻訳・分類モデルの入出力を調べたい | workers-ai-models | [references/workers-ai-models/README.md](references/workers-ai-models/README.md) |
| AI Gateway を作成して最初のリクエストを中継したい | ai-gateway | [references/ai-gateway/README.md](references/ai-gateway/README.md) |
| caching・rate limiting・fallbacks・dynamic routing・model aliases（`custom/<alias>`）を設定したい | ai-gateway | [references/ai-gateway/README.md](references/ai-gateway/README.md) |
| BYOK・認証・カスタムプロバイダー・カスタムドメインを設定したい | ai-gateway | [references/ai-gateway/README.md](references/ai-gateway/README.md) |
| logs・analytics・costs・Logpush・OpenTelemetry で観測したい | ai-gateway | [references/ai-gateway/README.md](references/ai-gateway/README.md) |
| 各プロバイダー（OpenAI 互換 / Anthropic / Bedrock / Vertex / Gemini ほか）への接続方法を知りたい | ai-gateway | [references/ai-gateway/README.md](references/ai-gateway/README.md) |
| Vectorize インデックスを作成して vector を insert / upsert したい | vectorize | [references/vectorize/README.md](references/vectorize/README.md) |
| query・metadata filtering・namespaces で検索したい | vectorize | [references/vectorize/README.md](references/vectorize/README.md) |
| VectorizeIndex バインディング API・distance metrics を調べたい | vectorize | [references/vectorize/README.md](references/vectorize/README.md) |
| Vectorize の制限・料金・v1 からの移行を確認したい | vectorize | [references/vectorize/README.md](references/vectorize/README.md) |
| AI Search（旧 AutoRAG）のインスタンスを作成してデータソース（R2 / website / D1 beta）を接続したい・Terraform / Namespaces REST API で管理したい | ai-search | [references/ai-search/README.md](references/ai-search/README.md) |
| `search` / `chatCompletions` を Workers バインディング・REST API・Python SDK から呼びたい | ai-search | [references/ai-search/README.md](references/ai-search/README.md) |
| チャンク分割・filtering・reranking・similarity cache を調整したい | ai-search | [references/ai-search/README.md](references/ai-search/README.md) |
| AutoRAG からの移行・namespaces・マルチテナント構成・公開エンドポイントを設定したい | ai-search | [references/ai-search/README.md](references/ai-search/README.md) |
| 典型的な使い方を知りたい（AI Gateway 経由の推論・AI Search の実例） | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド（wrangler・REST 呼び出し）を知りたい | scripts | [scripts/README.md](scripts/README.md) |
