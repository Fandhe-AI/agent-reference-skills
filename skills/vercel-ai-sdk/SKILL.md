---
name: vercel-ai-sdk
description: >
  Vercel AI SDK (TypeScript LLM ツールキット, ai / @ai-sdk/*, v7)。
  generateText, streamText, Output, ToolLoopAgent, useChat, UIMessage, embed, wrapLanguageModel,
  WorkflowAgent, HarnessAgent, AI Gateway。
user-invocable: false
---

# Vercel AI SDK

> 分割 PR の途中段階。現在収録済み: references/{agents, core}。冒頭説明・description に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

TypeScript 向け LLM アプリ開発ツールキット `ai`（AI SDK Core / UI / RSC）と `@ai-sdk/*` パッケージ群のリファレンス・サンプル・コマンド集。

## 対象バージョン

- `ai` **7.0.142**（npm latest、2026-10-15 公開）
- GitHub タグ `vercel/ai` の `ai@7.0.142`（lightweight tag、commit `6e14ffaa7e66594b926891583a4dab61910743d0`）
- 同タグ時点の関連パッケージ: `@ai-sdk/react` 4.0.146 / `@ai-sdk/rsc` 3.0.142 / `@ai-sdk/workflow` 2.0.74 / `@ai-sdk/harness` 1.0.153 / `@ai-sdk/tui` 1.0.143 / `@ai-sdk/mcp` 2.0.77 / `@ai-sdk/devtools` 1.0.45 / `@ai-sdk/provider` 4.0.28 / `@ai-sdk/provider-utils` 5.0.61 / `@ai-sdk/gateway` 4.0.115 / `@ai-sdk/openai` 4.0.95 / `@ai-sdk/anthropic` 4.0.81 / `@ai-sdk/google` 4.0.97 / `@ai-sdk/amazon-bedrock` 5.0.117 / `@ai-sdk/openai-compatible` 3.0.70
- サイト URL（`ai-sdk.dev`）に版指定は無い。取得日 2026-10-16。各ページの `source:` は版なしの `ai-sdk.dev` パス

## ディレクトリ構成

```text
skills/vercel-ai-sdk/
  SKILL.md
  references/
    core/               # AI SDK Core の関数・設定
      README.md
      generate-text.md, stream-text.md, output.md, model-message.md, settings.md, reasoning.md ...
    agents/             # Agent / ToolLoopAgent・ループ制御・承認・subagents
      README.md
      agent.md, tool-loop-agent.md, loop-control.md, tool-approvals.md, subagents.md ...
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| generateText / streamText を呼びたい | core | [references/core/README.md](references/core/README.md) |
| 構造化出力（Output）・ModelMessage・共通設定・reasoning を知りたい | core | [references/core/README.md](references/core/README.md) |
| smoothStream・ID 生成などユーティリティを知りたい | core | [references/core/README.md](references/core/README.md) |
| ToolLoopAgent でエージェントを構築したい | agents | [references/agents/README.md](references/agents/README.md) |
| ループ制御（stop condition）・tool 承認・subagents・memory を設定したい | agents | [references/agents/README.md](references/agents/README.md) |
| Agent の出力を UI メッセージストリームとして返したい | agents | [references/agents/README.md](references/agents/README.md) |
