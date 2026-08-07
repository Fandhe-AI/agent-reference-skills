---
name: anthropic-models-sdks
description: >
  Claude API (platform.claude.com) のモデル・SDK リファレンス。
  モデル選択基準・model ID とバージョン・Fable 5 / Mythos 5 / Opus 5 / Sonnet 5 の新機能・移行ガイド、
  pricing・model deprecation・用語集を含む。
  公式 SDK 7 言語（Python / TypeScript / Java / Go / Ruby / C# / PHP）、
  Claude API 用 CLI（`ant`、Claude Code CLI とは別）の quickstart / authentication / scripting、
  middleware、OpenAI SDK 互換レイヤー、Apple Foundation Models 連携を含む。
user-invocable: false
---

# anthropic-models-sdks

Claude API (platform.claude.com) — モデルのスペック・選択基準・バージョニング・料金・廃止スケジュールと、
公式 SDK 7言語・Claude API 用 CLI（`ant`）・ライブラリ統合をカバーするリファレンス。

Messages API 本体・streaming・thinking・prompt caching・structured outputs は `anthropic-api-core`、
Tool use・Agent Skills・MCP connector は `anthropic-api-tools-mcp`、Claude Code 本体（CLI/IDE）は `anthropic-claude-code`、
Agent SDK は `anthropic-agent-sdk` を参照（本スキルはモデル選定と SDK/CLI セットアップを担当）。

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
      model-ids-and-versions.md
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
| Claude Fable 5 / Mythos 5 / Opus 5 / Sonnet 5 の新機能・挙動変更を知りたい | models | [references/models/README.md](references/models/README.md) |
| モデル・機能の価格を知りたい | pricing-lifecycle | [references/pricing-lifecycle/README.md](references/pricing-lifecycle/README.md) |
| モデルの廃止（deprecation）予定・退役日・推奨移行先を知りたい | pricing-lifecycle | [references/pricing-lifecycle/README.md](references/pricing-lifecycle/README.md) |
| LLM/AI 関連の基本用語を確認したい | pricing-lifecycle | [references/pricing-lifecycle/README.md](references/pricing-lifecycle/README.md) |
| Python / TypeScript / Java / Go / Ruby / C# / PHP の公式 SDK をインストール・初期化したい | sdks-cli | [references/sdks-cli/README.md](references/sdks-cli/README.md) |
| Claude API 用 CLI（`ant`）の quickstart・認証・コマンド操作・スクリプティングを知りたい | sdks-cli | [references/sdks-cli/README.md](references/sdks-cli/README.md) |
| SDK のリクエスト/レスポンスを middleware で加工したい・OpenAI SDK 互換レイヤーで検証したい | sdks-cli | [references/sdks-cli/README.md](references/sdks-cli/README.md) |
| Apple Foundation Models framework から Claude を使いたい | sdks-cli | [references/sdks-cli/README.md](references/sdks-cli/README.md) |
| SDK のインストールコマンド・`ant` CLI 操作・`/v1/models` の curl コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
