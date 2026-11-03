---
name: cloudflare-ai
description: >
  Cloudflare の AI 基盤 (Workers AI / AI Gateway / Vectorize) の
  リファレンス。env.AI.run、REST API、OpenAI 互換エンドポイント、JSON mode、function calling、batch API、LoRA、toMarkdown、
  モデルカタログ (text generation / embeddings / text-to-image / ASR / TTS)、
  AI Gateway (caching / rate limiting / fallbacks / logs / BYOK / dynamic routing)、
  VectorizeIndex insert / upsert / query / metadata filtering。
  Agents SDK は cloudflare-agents、プロバイダー API 本体は openai-api-core / anthropic-api-core / google-gemini-api、Upstash Vector とは別。
user-invocable: false
---

# Cloudflare AI 基盤 リファレンス

> 分割 PR で順次追加中の部分版。現時点で収録済みなのは下記「ディレクトリ構成」とマッピング表に載っているカテゴリのみ。

Cloudflare 開発者プラットフォームの AI 4 製品 — Workers AI（サーバーレス推論・モデルカタログ）、AI Gateway（LLM リクエストのプロキシ・可観測性・制御）、Vectorize（ベクトルデータベース）、AI Search（旧 AutoRAG、マネージド RAG）— を扱う。各製品の Workers バインディング API、REST API、設定、運用、制限、料金を参照する。

## 対象バージョン

- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため、`cloudflare/cloudflare-docs` の production SHA `d0995b91312add6db730afec4f4944cee834abc6` と取得日 2026-11-03 で pin
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
- 未収録の Cloudflare 製品（Durable Objects / Queues / Workflows 等）は公式 docs を参照

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
```

## 探索手順

タスクから製品カテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリ（workers-ai / workers-ai-models / ai-gateway / vectorize）を探す
2. そのカテゴリの `references/{category}/README.md`を参照して目的のページを特定する
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
| caching・rate limiting・fallbacks・dynamic routing を設定したい | ai-gateway | [references/ai-gateway/README.md](references/ai-gateway/README.md) |
| BYOK・認証・カスタムプロバイダー・カスタムドメインを設定したい | ai-gateway | [references/ai-gateway/README.md](references/ai-gateway/README.md) |
| logs・analytics・costs・Logpush・OpenTelemetry で観測したい | ai-gateway | [references/ai-gateway/README.md](references/ai-gateway/README.md) |
| 各プロバイダー（OpenAI 互換 / Anthropic / Bedrock / Vertex / Gemini ほか）への接続方法を知りたい | ai-gateway | [references/ai-gateway/README.md](references/ai-gateway/README.md) |
| Vectorize インデックスを作成して vector を insert / upsert したい | vectorize | [references/vectorize/README.md](references/vectorize/README.md) |
| query・metadata filtering・namespaces で検索したい | vectorize | [references/vectorize/README.md](references/vectorize/README.md) |
| VectorizeIndex バインディング API・distance metrics を調べたい | vectorize | [references/vectorize/README.md](references/vectorize/README.md) |
| Vectorize の制限・料金・v1 からの移行を確認したい | vectorize | [references/vectorize/README.md](references/vectorize/README.md) |
