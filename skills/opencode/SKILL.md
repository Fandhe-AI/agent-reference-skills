---
name: opencode
description: >
  OpenCode (opencode.ai のオープンソース AI コーディングエージェント, v2) の利用リファレンス。
  opencode.jsonc 設定, permissions, policies, snapshots, compaction, warming,
  AGENTS.md instructions, formatters, themes, troubleshooting, V1 移行。
user-invocable: false
---

# opencode

OpenCode v2 — opencode.ai のオープンソース AI コーディングエージェント（CLI / TUI / Desktop / Web）の利用側リファレンス。npm パッケージは `@opencode/cli`。
出典は https://opencode.ai/docs/ と https://opencode.ai/docs/cli/ 、原本は anomalyco/opencode のタグ v2.3.0（commit a6b15d3、2026-11-13）の `services/site/src/docs/content/*.mdx` と `cli/*.mdx`。
V1（`/v1/docs`）は対象外で、V1 からの移行のみ `references/getting-started/migrate-v1.md` と `migrate-v1-configuration.md` に集約する。

## 姉妹スキル

- `opencode-build` — プラグイン開発（`@opencode/plugin` / `@opencode/client` / `@opencode/sdk`、Effect 版、サーバー HTTP API）
- `opencode-console` — OpenCode Console のゲートウェイ・OpenCode Go・ワークスペース・harnesses

本スキルは利用側（設定・エージェント・モデル・ツール・権限・CLI）を担当し、拡張開発と Console は上記の姉妹スキルを参照する。

## 他スキルとの使い分け

- Claude Code（`anthropic-claude-code` / `anthropic-claude-code-extend` / `anthropic-claude-code-admin`）とは別製品。OpenCode skills は Claude Code の Agent Skills (SKILL.md) とは別物で、設定ファイルの形式・置き場所・意味に互換性はない
- OpenAI Codex（`openai-codex`）とは別製品。`AGENTS.md` は両者で読まれる場合があるが、解釈と設定は各製品のドキュメントに従う
- MCP の仕様自体（プロトコル・メッセージ）は `mcp-spec` が担当。本スキルは OpenCode から MCP servers に接続する設定・運用のみを扱う

## ディレクトリ構成

```text
skills/opencode/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      claude-agent.md
      troubleshooting.md
      migrate-v1.md
      migrate-v1-configuration.md
    configuration/
      README.md
      config-locations.md
      config-schema.md
      config-variables.md
      config-access-control.md
      config-workspace.md
      config-integrations.md
      config-compaction-warming.md
      config-worktrees.md
      config-experimental.md
      instructions.md
      references.md
      attachments.md
      formatters.md
      themes.md
    permissions-policies/
      README.md
      permissions.md
      policies.md
    sessions/
      README.md
      snapshots.md
      compaction.md
      warming.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| OpenCode のインストール・概要・Claude エージェントとの関係・トラブルシュートを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| V1 から V2 へ移行したい（設定の変更点を含む） | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| opencode.jsonc の置き場所・スキーマ・変数展開を知りたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| AGENTS.md instructions・formatters・themes・attachments・worktrees を設定したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| アクセス制御・ワークスペース・外部連携（MCP / skills / commands / references / plugins / providers キー）・experimental 設定を確認したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| permissions のルールを設計したい、policies で組織制約を掛けたい | permissions-policies | [references/permissions-policies/README.md](references/permissions-policies/README.md) |
| snapshots・compaction・warming などセッション挙動を調整したい | sessions | [references/sessions/README.md](references/sessions/README.md) |
