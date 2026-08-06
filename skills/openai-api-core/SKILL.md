---
name: openai-api-core
description: >
  OpenAI API (developers.openai.com) の Responses API リファレンス。
  text generation, embeddings, structured outputs, streaming, function calling,
  programmatic tool calling, conversation state, prompt caching,
  reasoning models, background mode, compaction, multi-agent。
  webhooks, error codes, rate limits, Realtime API server controls。
  公式 SDK (Python / JavaScript(JS) / .NET / Java / Go / Ruby), openai CLI。
  Chat Completions / Assistants からの移行, deprecations。
user-invocable: false
---

# openai-api-core

OpenAI API — Responses API を中心としたテキスト生成・構造化出力・ストリーミング・function calling・
会話状態管理をカバーする公式リファレンス。webhooks・エラーコード・レート制限、公式 SDK（Python / JS / .NET / Java / Go / Ruby）、
Chat Completions / Assistants からの移行ガイドを含む。

## ディレクトリ構成

```text
skills/openai-api-core/
  SKILL.md
  references/
    getting-started/
      README.md
      quickstart.md
      concepts.md
      models.md
      models-all.md
      models-compare.md
    responses/
      README.md
      text.md
      conversation-state.md
      prompt-caching.md
      reasoning.md
      reasoning-best-practices.md
      background.md
      responses-multi-agent.md
      compaction.md
    structured-streaming/
      README.md
      structured-outputs.md
      streaming-responses.md
      function-calling.md
      programmatic-tool-calling.md
    webhooks-errors/
      README.md
      webhooks.md
      realtime-server-controls.md
      error-codes.md
      rate-limits.md
    libraries/
      README.md
      python-sdk.md
      javascript-sdk.md
      dotnet-sdk.md
      java-sdk.md
      go-sdk.md
      ruby-sdk.md
      openai-cli.md
    legacy-migration/
      README.md
      responses-vs-chat-completions.md
      migrate-chat-completions-to-responses.md
      assistants-to-responses-migration.md
      deprecations.md
  samples/
    README.md
    basic-text-generation.md
    structured-outputs.md
    streaming-responses.md
    multi-turn-conversation.md
    function-calling.md
    webhook-verification.md
    background-responses.md
  scripts/
    README.md
    install.md
    auth.md
    curl-endpoints.md
    cli.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`samples/` `scripts/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

Agents SDK・組み込みツール（web search / file search / code interpreter / computer use）・MCP 連携は `openai-agents` スキル、
Codex（コーディングエージェント CLI）は `openai-codex` スキルを参照。
本スキルは Responses API 本体の呼び出し方・構造化出力・ストリーミング・webhooks・公式 SDK・レガシー移行を担当する。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| API キー設定・SDK インストール・最初の API 呼び出しを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| モデル一覧・選定基準・コンテキストウィンドウ/最大出力の比較を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Responses API でテキストを生成する・プロンプト設計の基本を知りたい | responses | [references/responses/README.md](references/responses/README.md) |
| 会話状態の管理（`previous_response_id` / Conversations API）・プロンプトキャッシュを扱いたい | responses | [references/responses/README.md](references/responses/README.md) |
| reasoning モデルの `effort`/`summary` 設定・background mode・マルチエージェント・compaction を知りたい | responses | [references/responses/README.md](references/responses/README.md) |
| 構造化出力（JSON Schema, strict mode）を得たい | structured-streaming | [references/structured-streaming/README.md](references/structured-streaming/README.md) |
| SSE ストリーミングでレスポンスを逐次受信したい | structured-streaming | [references/structured-streaming/README.md](references/structured-streaming/README.md) |
| function calling / programmatic tool calling でツールを呼び出したい | structured-streaming | [references/structured-streaming/README.md](references/structured-streaming/README.md) |
| webhook の受信・検証・Realtime API のサーバー側制御を知りたい | webhooks-errors | [references/webhooks-errors/README.md](references/webhooks-errors/README.md) |
| エラーコード・例外クラス・レート制限とバックオフ戦略を知りたい | webhooks-errors | [references/webhooks-errors/README.md](references/webhooks-errors/README.md) |
| 公式 SDK（Python / JavaScript / .NET / Java / Go / Ruby）の使い方を知りたい | libraries | [references/libraries/README.md](references/libraries/README.md) |
| openai CLI のインストール・コマンドを知りたい | libraries | [references/libraries/README.md](references/libraries/README.md) |
| Responses API と Chat Completions API のどちらを使うか判断したい | legacy-migration | [references/legacy-migration/README.md](references/legacy-migration/README.md) |
| Chat Completions / Assistants から Responses API へ移行したい・非推奨スケジュールを知りたい | legacy-migration | [references/legacy-migration/README.md](references/legacy-migration/README.md) |
| 典型的な使い方を知りたい（テキスト生成, 構造化出力, ストリーミング, 会話継続, function calling, webhook 検証, background 実行等） | samples | [samples/README.md](samples/README.md) |
| インストール・認証設定・curl でのエンドポイント呼び出し・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
