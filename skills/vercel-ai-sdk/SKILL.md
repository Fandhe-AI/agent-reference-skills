---
name: vercel-ai-sdk
description: >
  Vercel AI SDK (TypeScript LLM ツールキット, ai / @ai-sdk/*, v7)。
  generateText, streamText, Output, ToolLoopAgent, createMCPClient, useChat, UIMessage,
  embed, generateImage, wrapLanguageModel, WorkflowAgent, HarnessAgent, AI Gateway, @ai-sdk/rsc、
  v4 から v7 への移行。
user-invocable: false
---

# Vercel AI SDK

TypeScript 向け LLM アプリ開発ツールキット `ai`（AI SDK Core / UI / RSC）と `@ai-sdk/*` パッケージ群のリファレンス・サンプル・コマンド集。

## 対象バージョン

- `ai` **7.0.142**（npm latest、2026-10-15 公開）
- GitHub タグ `vercel/ai` の `ai@7.0.142`（lightweight tag、commit `6e14ffaa7e66594b926891583a4dab61910743d0`）
- 原本: `raw.githubusercontent.com/vercel/ai/ai@7.0.142/` 配下の `content/{docs,providers,cookbook}/**/*.mdx`
- 同タグ時点の関連パッケージ: `@ai-sdk/react` 4.0.146 / `@ai-sdk/rsc` 3.0.142 / `@ai-sdk/workflow` 2.0.74 / `@ai-sdk/harness` 1.0.153 / `@ai-sdk/tui` 1.0.143 / `@ai-sdk/mcp` 2.0.77 / `@ai-sdk/devtools` 1.0.45 / `@ai-sdk/provider` 4.0.28 / `@ai-sdk/provider-utils` 5.0.61 / `@ai-sdk/gateway` 4.0.115 / `@ai-sdk/openai` 4.0.95 / `@ai-sdk/anthropic` 4.0.81 / `@ai-sdk/google` 4.0.97 / `@ai-sdk/amazon-bedrock` 5.0.117 / `@ai-sdk/openai-compatible` 3.0.70
- サイト URL（`ai-sdk.dev`）に版指定は無い。取得日 2026-10-16。各ページの `source:` は版なしの `ai-sdk.dev` パス

## ディレクトリ構成

```text
skills/vercel-ai-sdk/
  SKILL.md
  references/
    foundations/        # 導入・概念・プロバイダー選択・prompts・streaming・tools
      README.md
      introduction.md, navigating-the-library.md, choosing-a-provider.md, coding-agents.md ...
    core/               # AI SDK Core の関数・設定
      README.md
      generate-text.md, stream-text.md, output.md, model-message.md, settings.md, reasoning.md ...
    agents/             # Agent / ToolLoopAgent・ループ制御・承認・subagents
      README.md
      agent.md, tool-loop-agent.md, loop-control.md, tool-approvals.md, subagents.md ...
    tools-mcp/          # tool・スキーマ・MCP クライアント・MCP Apps・toolSearch
      README.md
      tool.md, dynamic-tool.md, create-mcp-client.md, zod-schema.md, mcp-apps.md ...
    ui/                 # useChat / UIMessage / stream protocol / transport
      README.md
      use-chat.md, ui-message.md, stream-protocol.md, transport.md, create-ui-message-stream.md ...
    rsc/                # @ai-sdk/rsc（streamUI / createStreamableUI / createAI）
      README.md
      overview.md, stream-ui.md, create-ai.md, migrating-to-ui.md ...
    embeddings-batch/   # embed / rerank / batch / uploadFile / uploadSkill / decide
      README.md
      embed.md, embed-many.md, rerank.md, start-batch.md, upload-file.md ...
    media/              # 画像・音声・文字起こし・動画・realtime・翻訳
      README.md
      generate-image.md, generate-speech.md, transcribe.md, generate-video.md, realtime.md ...
    providers/          # プロバイダー・AI Gateway・registry・language model middleware
      README.md
      ai-gateway.md, openai.md, anthropic.md, google.md, amazon-bedrock.md, wrap-language-model.md ...
    workflow-harnesses/ # HarnessAgent・Claude Code / Codex harness・WorkflowAgent・Terminal UI
      README.md
      harness-agent.md, claude-code-harness.md, codex-harness.md, workflow-agent.md, terminal-ui.md ...
    operations/         # エラー・telemetry・testing・DevTools・キャッシュ・デプロイ
      README.md
      error-handling.md, telemetry.md, testing.md, devtools.md, vercel-deployment-guide.md ...
    migration/          # 4.x → 5.0 → 6.0 → 7.0 移行ガイド・versioning
      README.md
      migration-guide-7-0.md, migration-guide-6-0.md, migration-guide-5-0.md, versioning.md ...
  samples/              # quickstart・API サーバー・chatbot・RAG・MCP・RSC などの実例
    README.md
    quickstart-nextjs-app-router.md, api-server-hono.md, rag-in-memory-embeddings.md ...
  scripts/              # インストール・codemod・DevTools・Agent Skill 導入コマンド
    README.md
    install.md, codemod.md, devtools.md, agent-skill.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（samples / scripts は `README.md`）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 版差異が疑われる場合は `references/migration/` を確認する（v4 / v5 / v6 / v7 で API が大きく変わる）

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| AI SDK の全体像・Core / UI / RSC の使い分けを知りたい | foundations | [references/foundations/README.md](references/foundations/README.md) |
| プロバイダー選択・prompts・provider options の概念を知りたい | foundations | [references/foundations/README.md](references/foundations/README.md) |
| generateText / streamText を呼びたい | core | [references/core/README.md](references/core/README.md) |
| 構造化出力（Output）・ModelMessage・共通設定・reasoning を知りたい | core | [references/core/README.md](references/core/README.md) |
| smoothStream・ID 生成などユーティリティを知りたい | core | [references/core/README.md](references/core/README.md) |
| ToolLoopAgent でエージェントを構築したい | agents | [references/agents/README.md](references/agents/README.md) |
| ループ制御（stop condition）・tool 承認・subagents・memory を設定したい | agents | [references/agents/README.md](references/agents/README.md) |
| Agent の出力を UI メッセージストリームとして返したい | agents | [references/agents/README.md](references/agents/README.md) |
| tool の定義・tool calling・Zod / Valibot / JSON Schema を使いたい | tools-mcp | [references/tools-mcp/README.md](references/tools-mcp/README.md) |
| createMCPClient で MCP サーバーに接続したい（MCP Apps / events 含む） | tools-mcp | [references/tools-mcp/README.md](references/tools-mcp/README.md) |
| toolSearch・Code Mode・runtime context を使いたい | tools-mcp | [references/tools-mcp/README.md](references/tools-mcp/README.md) |
| useChat でチャット UI を作りたい | ui | [references/ui/README.md](references/ui/README.md) |
| UIMessage・stream protocol・transport・message metadata を扱いたい | ui | [references/ui/README.md](references/ui/README.md) |
| UI メッセージストリームのレスポンス生成・検証・変換をしたい | ui | [references/ui/README.md](references/ui/README.md) |
| useCompletion / useObject / useRealtime を使いたい | ui | [references/ui/README.md](references/ui/README.md) |
| RSC（streamUI / createStreamableUI / createAI）を使いたい | rsc | [references/rsc/README.md](references/rsc/README.md) |
| RSC から AI SDK UI へ移行したい | rsc | [references/rsc/README.md](references/rsc/README.md) |
| embed / embedMany / cosineSimilarity で埋め込みを扱いたい | embeddings-batch | [references/embeddings-batch/README.md](references/embeddings-batch/README.md) |
| rerank・batch API・uploadFile / uploadSkill・experimental_decide を使いたい | embeddings-batch | [references/embeddings-batch/README.md](references/embeddings-batch/README.md) |
| 画像・音声・動画の生成、文字起こし、翻訳、realtime を使いたい | media | [references/media/README.md](references/media/README.md) |
| OpenAI / Anthropic / Google / Amazon Bedrock プロバイダーを設定したい | providers | [references/providers/README.md](references/providers/README.md) |
| AI Gateway・provider registry・customProvider・OpenAI 互換プロバイダーを使いたい | providers | [references/providers/README.md](references/providers/README.md) |
| wrapLanguageModel と language model middleware を使いたい | providers | [references/providers/README.md](references/providers/README.md) |
| HarnessAgent で Claude Code / Codex を駆動したい | workflow-harnesses | [references/workflow-harnesses/README.md](references/workflow-harnesses/README.md) |
| WorkflowAgent で durable なエージェントを作りたい | workflow-harnesses | [references/workflow-harnesses/README.md](references/workflow-harnesses/README.md) |
| @ai-sdk/tui のターミナル UI を使いたい | workflow-harnesses | [references/workflow-harnesses/README.md](references/workflow-harnesses/README.md) |
| エラー処理・telemetry・テスト・DevTools を設定したい | operations | [references/operations/README.md](references/operations/README.md) |
| rate limiting・キャッシュ・ストリーム中断・Vercel デプロイを知りたい | operations | [references/operations/README.md](references/operations/README.md) |
| 旧バージョンから v7 へ移行したい（破壊的変更・codemod） | migration | [references/migration/README.md](references/migration/README.md) |
| 版管理・API 安定性の方針を知りたい | migration | [references/migration/README.md](references/migration/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
