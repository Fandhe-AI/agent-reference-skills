---
name: anthropic-api-core
description: >
  Claude API (platform.claude.com) の Messages API リファレンス。
  streaming (SSE), thinking (adaptive) / effort, prompt caching, context editing, compaction,
  structured outputs, Message Batches, token counting, vision / PDF, Files API, citations,
  embeddings (Voyage AI)。
  errors, rate limits, beta headers, Amazon Bedrock / Vertex AI / Foundry 経由アクセスを含む。
user-invocable: false
---

# anthropic-api-core

Claude API (platform.claude.com) — Messages API を中心としたテキスト生成・ストリーミング・thinking・
prompt caching・structured outputs・Message Batches・vision/PDF・Files API をカバーする公式リファレンス。
エラーコード・レート制限・beta ヘッダー、Amazon Bedrock / Google Cloud Vertex AI / Microsoft Foundry / Claude Platform on AWS
経由でのアクセス方法を含む。

Tool use・Agent Skills (SKILL.md)・MCP connector は `anthropic-api-tools-mcp`、Claude Code 本体は `anthropic-claude-code`、
Agent SDK は `anthropic-agent-sdk` を参照（本スキルは Claude API 本体の呼び出し方を担当）。

## ディレクトリ構成

```text
skills/anthropic-api-core/
  SKILL.md
  references/
    getting-started/
      README.md
      get-started.md
      get-api-key.md
      intro.md
    api-basics/
      README.md
      beta-headers.md
      beta.md
      claude-platform-on-aws-iam-actions.md
      errors.md
      ip-addresses.md
      overview.md
      rate-limits.md
      service-tiers.md
      supported-regions.md
      versioning.md
    messages/
      README.md
      batch-processing.md
      citations.md
      embeddings.md
      fallback-credit.md
      fast-mode.md
      files.md
      handling-stop-reasons.md
      mid-conversation-system-messages.md
      multilingual-support.md
      overview.md
      pdf-support.md
      refusals-and-fallback.md
      search-results.md
      streaming.md
      structured-outputs.md
      task-budgets.md
      token-counting.md
      vision-coordinates.md
      vision.md
      working-with-messages.md
    thinking/
      README.md
      effort.md
      extended-thinking.md
      mid-conversation-effort-example.md
      thinking-steering-and-cost.md
      thinking-tool-workflows.md
      thinking-troubleshooting.md
      thinking.md
    caching-context/
      README.md
      cache-diagnostics.md
      compaction.md
      context-editing.md
      context-windows.md
      prompt-caching.md
    endpoints/
      README.md
      batches-cancel.md
      batches-create.md
      batches-delete.md
      batches-list.md
      batches-results.md
      batches-retrieve.md
      completions-create.md
      files-delete.md
      files-download.md
      files-list.md
      files-retrieve_metadata.md
      files-upload.md
      messages-count_tokens.md
      messages-create.md
      models-list.md
      models-retrieve.md
    platforms/
      README.md
      claude-in-amazon-bedrock.md
      claude-in-microsoft-foundry.md
      claude-on-amazon-bedrock-legacy.md
      claude-on-vertex-ai.md
      claude-platform-on-aws.md
  samples/
    README.md
    basic-message.md
    streaming.md
    extended-thinking.md
    batch-processing.md
    prompt-caching.md
    structured-outputs.md
    vision-pdf.md
    token-counting.md
  scripts/
    README.md
    setup.md
    curl-endpoints.md
    headers.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`samples/` `scripts/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| API キー取得・最初の API 呼び出し・Messages API と Managed Agents の使い分けを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| エラーコード・レート制限・beta ヘッダー（`anthropic-beta`）・API バージョン（`anthropic-version`）・service tiers・対応リージョンを知りたい | api-basics | [references/api-basics/README.md](references/api-basics/README.md) |
| Messages API でテキストを生成する・ストリーミング（SSE）・vision/PDF・citations・search results・embeddings・stop reasons を扱いたい | messages | [references/messages/README.md](references/messages/README.md) |
| 構造化出力（`output_config.format`）・Message Batches・Files API・fast mode・task budgets・多言語対応を知りたい | messages | [references/messages/README.md](references/messages/README.md) |
| 思考（adaptive thinking / `effort`）・レガシー extended thinking（固定 `budget_tokens`）・思考のツール連携やトラブルシューティングを知りたい | thinking | [references/thinking/README.md](references/thinking/README.md) |
| prompt caching（`cache_control`）・context editing・compaction・context windows・cache diagnostics を扱いたい | caching-context | [references/caching-context/README.md](references/caching-context/README.md) |
| Messages / Batches / Files / Models の各エンドポイントのリクエスト・レスポンス仕様（curl 相当）を確認したい | endpoints | [references/endpoints/README.md](references/endpoints/README.md) |
| Amazon Bedrock / Google Cloud Vertex AI / Microsoft Foundry / Claude Platform on AWS 経由で Claude API を呼びたい | platforms | [references/platforms/README.md](references/platforms/README.md) |
| 典型的な使い方を知りたい（基本呼び出し, streaming, thinking, batches, prompt caching, structured outputs, vision/PDF, token counting） | samples | [samples/README.md](samples/README.md) |
| API キー設定・SDK/CLI インストール・curl でのエンドポイント呼び出し・ヘッダー指定例を知りたい | scripts | [scripts/README.md](scripts/README.md) |
