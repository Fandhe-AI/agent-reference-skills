---
name: anthropic-models-sdks
description: >
  Claude API (platform.claude.com) のモデル・SDK。
  model ID・選択基準、Fable・Mythos 5.1 / Opus・Sonnet・Haiku 5.5 移行・破壊的変更、
  コスト最適化 (effort / caching / batch / advisor)、pricing、deprecation、用語集。
  公式 SDK 7 言語 (Python / TypeScript / Java / Go / Ruby / C# / PHP)、
  Claude API 用 CLI `ant` (Claude Code CLI とは別。quickstart / authentication / scripting、`ant apply` resources as code、Managed Agents session 接続)、
  middleware、OpenAI SDK 互換、Apple Foundation Models。
user-invocable: false
---

# anthropic-models-sdks

Claude API (platform.claude.com) — モデルのスペック・選択基準・バージョニング・料金・廃止スケジュールと、
公式 SDK 7言語・Claude API 用 CLI（`ant`）・ライブラリ統合をカバーするリファレンス。

Messages API 本体・streaming・thinking・prompt caching・structured outputs は `anthropic-api-core`、
Tool use・Agent Skills・MCP connector は `anthropic-api-tools-mcp`、Claude Code 本体（CLI/IDE）は `anthropic-claude-code`、
Agent SDK は `anthropic-agent-sdk` を参照（本スキルはモデル選定と SDK/CLI セットアップを担当）。
`optimizing-for-cost-and-intelligence` の advisor / orchestrator 戦略は tool の仕様が `anthropic-api-tools-mcp`、effort / prompt caching / batch の API 仕様が `anthropic-api-core` の担当（本スキルはトレードオフの指針のみ）。
`cli-apply` / `cli-sessions-connect` が扱う Managed Agents リソース自体は `anthropic-managed-agents` の担当（本スキルは `ant` CLI 操作のみ）。

## 対象バージョン

- 取得日 2026-10-17（出典 platform.claude.com の Markdown twin、URL に版なし。last verified 2026-10-17）
- 現行モデル: `claude-fable-5-1` / `claude-mythos-5-1`（検証済み組織のみ）/ `claude-opus-5-5` / `claude-sonnet-5-5` / `claude-haiku-5-5`
- `ant` CLI 1.42.0（`ant apply` は 1.30.0+、`sessions connect` は 1.32.0+ が必要）、Java SDK `com.anthropic:anthropic-java:2.73.0`
- モデルページの出典 URL は `/docs/en/models/<model>/` 配下へ移動（旧 `about-claude/models/*` は `/models/overview`・`/models/fable-5/overview`・`/models/opus-5/overview`・`/models/sonnet-5/overview` へリダイレクト）

## ディレクトリ構成

```text
skills/anthropic-models-sdks/
  SKILL.md
  references/
    models/
      README.md
      overview.md
      choosing-a-model.md
      introducing-claude-fable-5-and-claude-mythos-5.md
      migration-guide.md
      migration-fable-5-1.md
      migration-opus-5-5.md
      migration-sonnet-5-5.md
      migration-haiku-5-5.md
      model-ids-and-versions.md
      optimizing-for-cost-and-intelligence.md
      whats-new-fable-5-1.md
      whats-new-opus-5-5.md
      whats-new-sonnet-5-5.md
      whats-new-haiku-5-5.md
      whats-new-opus-5.md
      whats-new-sonnet-5.md
    pricing-lifecycle/
      README.md
      glossary.md
      model-deprecations.md
      pricing.md
    sdks-cli/
      README.md
      overview.md
      apple-foundation-models.md
      cli-apply.md
      cli-sessions-connect.md
      cli-authentication.md
      cli-quickstart.md
      cli-scripting.md
      cli-using.md
      middleware.md
      openai-sdk-compat.md
      sdk-csharp.md
      sdk-go.md
      sdk-java.md
      sdk-php.md
      sdk-python.md
      sdk-ruby.md
      sdk-typescript.md
  scripts/
    README.md
    sdk-install.md
    cli.md
    models-api.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`scripts/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| モデル一覧・性能比較・アプリに最適なモデルの選び方を知りたい | models | [references/models/README.md](references/models/README.md) |
| model ID の構造・バージョニング（dateless format）・旧モデルからの移行を知りたい | models | [references/models/README.md](references/models/README.md) |
| Claude Fable 5.1 / Mythos 5.1 / Opus 5.5 / Sonnet 5.5 / Haiku 5.5 の新機能・破壊的変更（旧世代の Fable 5 / Opus 5 / Sonnet 5 も含む）を知りたい | models | [references/models/README.md](references/models/README.md) |
| モデル別の移行チェックリスト（Opus 5 → 5.5、Sonnet 5 → 5.5、Haiku 4.5 → 5.5、Fable 5 → 5.1）を知りたい | models | [references/models/README.md](references/models/README.md) |
| コストと知能のトレードオフ（effort 調整・キャッシュ・バッチ・モデル併用）を最適化したい | models | [references/models/README.md](references/models/README.md) |
| モデル・機能の価格を知りたい | pricing-lifecycle | [references/pricing-lifecycle/README.md](references/pricing-lifecycle/README.md) |
| モデルの廃止（deprecation）予定・退役日・推奨移行先を知りたい | pricing-lifecycle | [references/pricing-lifecycle/README.md](references/pricing-lifecycle/README.md) |
| LLM/AI 関連の基本用語を確認したい | pricing-lifecycle | [references/pricing-lifecycle/README.md](references/pricing-lifecycle/README.md) |
| Python / TypeScript / Java / Go / Ruby / C# / PHP の公式 SDK をインストール・初期化したい | sdks-cli | [references/sdks-cli/README.md](references/sdks-cli/README.md) |
| Claude API 用 CLI（`ant`）の quickstart・認証・コマンド操作・スクリプティングを知りたい | sdks-cli | [references/sdks-cli/README.md](references/sdks-cli/README.md) |
| `ant apply` でエージェント等を as code 管理・CI で apply したい | sdks-cli | [references/sdks-cli/README.md](references/sdks-cli/README.md) |
| `ant` から Managed Agents セッションに接続・承認操作をしたい | sdks-cli | [references/sdks-cli/README.md](references/sdks-cli/README.md) |
| SDK のリクエスト/レスポンスを middleware で加工したい・OpenAI SDK 互換レイヤーで検証したい | sdks-cli | [references/sdks-cli/README.md](references/sdks-cli/README.md) |
| Apple Foundation Models framework から Claude を使いたい | sdks-cli | [references/sdks-cli/README.md](references/sdks-cli/README.md) |
| SDK のインストールコマンド・`ant` CLI 操作（`ant apply` 含む）・`/v1/models` の curl コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
