---
name: opencode-usage
description: >
  OpenCode (opencode.ai のオープンソース AI コーディングエージェント, v2) の利用リファレンス。
  opencode.jsonc 設定, agents (build / plan), models, providers, OpenCode skills, commands, plugins,
  Ollama ローカルモデル, MCP servers, tools, websearch, network, permissions, policies,
  snapshots, compaction, warming, TUI, keybinds, opencode run / serve, ACP,
  AGENTS.md instructions, formatters, themes, troubleshooting, V1 移行。
user-invocable: false
---

# opencode-usage

OpenCode v2 — opencode.ai のオープンソース AI コーディングエージェント（CLI / TUI / Desktop / Web）の利用側リファレンス。npm パッケージは `@opencode/cli`。
出典は https://opencode.ai/docs/ と https://opencode.ai/docs/cli/ 、原本は anomalyco/opencode のタグ v2.3.0（commit a6b15d3、2026-11-13）の `services/site/src/docs/content/*.mdx` と `cli/*.mdx`。
V1（`/v1/docs`）は対象外で、V1 からの移行のみ `references/getting-started/migrate-v1.md` と `migrate-v1-configuration.md` に集約する。

## 姉妹スキル

- `opencode-build` — プラグイン開発（`@opencode/plugin` / `@opencode/client` / `@opencode/sdk`、TUI / GUI プラグイン、Effect 版、サーバー HTTP API）
- `opencode-console` — OpenCode Console のゲートウェイ・OpenCode Go・ワークスペース・harnesses

本スキルは利用側（設定・エージェント・モデル・ツール・権限・CLI）を担当し、拡張開発と Console は上記の姉妹スキルを参照する。

## 他スキルとの使い分け

- Claude Code（`anthropic-claude-code` / `anthropic-claude-code-extend` / `anthropic-claude-code-admin`）とは別製品。OpenCode skills は Claude Code の Agent Skills (SKILL.md) とは別物で、設定ファイルの形式・置き場所・意味に互換性はない
- OpenAI Codex（`openai-codex`）とは別製品。`AGENTS.md` は両者で読まれる場合があるが、解釈と設定は各製品のドキュメントに従う
- MCP の仕様自体（プロトコル・メッセージ）は `mcp-spec` が担当。本スキルは OpenCode から MCP servers に接続する設定・運用のみを扱う

## ディレクトリ構成

```text
skills/opencode-usage/
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
    agents-models/
      README.md
      agents.md
      agent-options.md
      models.md
      model-variants.md
      model-options-aliases.md
      model-reasoning-caching.md
      model-compatibility.md
      local-models.md
      providers.md
      provider-requests.md
      provider-packages-models.md
      provider-azure.md
      provider-bedrock-vertex.md
      provider-copilot-local-gateways.md
      provider-errors.md
      skills.md
      commands.md
      plugins.md
    tools-mcp/
      README.md
      tools-overview.md
      tools-files.md
      tools-shell-web.md
      tools-interaction-automation.md
      tools-browser.md
      websearch.md
      network.md
      mcp-overview.md
      mcp-local.md
      mcp-remote.md
      mcp-oauth.md
      mcp-timeouts-protocol-pooling.md
      mcp-permissions-names.md
      mcp-runtime-behavior.md
    permissions-policies/
      README.md
      permissions.md
      policies.md
    sessions/
      README.md
      snapshots.md
      compaction.md
      warming.md
    cli/
      README.md
      overview.md
      tui.md
      web.md
      providers.md
      acp.md
      config.md
      theme.md
      plugins.md
      keybinds.md
      commands-run.md
      commands-mini.md
      commands-session.md
      commands-auth.md
      commands-models.md
      commands-mcp.md
      commands-plugin.md
      commands-stats.md
      commands-serve.md
      commands-pair.md
      commands-service.md
      commands-reload.md
      commands-api.md
      commands-acp.md
      commands-debug.md
      commands-upgrade.md
      commands-uninstall.md
  samples/
    README.md
    minimal-config.md
    config-variables.md
    custom-provider.md
    local-models-ollama.md
    custom-agent.md
    custom-command.md
    agent-skill.md
    agents-md-instructions.md
    mcp-servers.md
    permissions-rules.md
    policies-provider-allowlist.md
    formatters.md
    keybinds.md
    acp-zed.md
    github-actions-run.md
  scripts/
    README.md
    install.md
    auth.md
    cli.md
    mcp.md
    plugin.md
    server.md
    network.md
    acp.md
    troubleshooting.md
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
| agents (build / plan) をカスタマイズしたい、agent options を知りたい | agents-models | [references/agents-models/README.md](references/agents-models/README.md) |
| models・variants・model options / aliases・reasoning・caching・model compatibility・ローカルモデルを設定したい | agents-models | [references/agents-models/README.md](references/agents-models/README.md) |
| providers（provider requests / provider packages・models / Azure / Bedrock / Vertex / Copilot / ゲートウェイ）の設定とエラー対処をしたい | agents-models | [references/agents-models/README.md](references/agents-models/README.md) |
| OpenCode skills・commands・plugins の設定を知りたい | agents-models | [references/agents-models/README.md](references/agents-models/README.md) |
| tools（ファイル・シェル・Web・ブラウザ）の仕様と websearch・network 設定を知りたい | tools-mcp | [references/tools-mcp/README.md](references/tools-mcp/README.md) |
| MCP servers（local / remote）の接続・OAuth・タイムアウト・権限名を設定したい | tools-mcp | [references/tools-mcp/README.md](references/tools-mcp/README.md) |
| permissions のルールを設計したい、policies で組織制約を掛けたい | permissions-policies | [references/permissions-policies/README.md](references/permissions-policies/README.md) |
| snapshots・compaction・warming などセッション挙動を調整したい | sessions | [references/sessions/README.md](references/sessions/README.md) |
| CLI のコマンド（opencode run / serve / auth / mcp / models 等）を引きたい | cli | [references/cli/README.md](references/cli/README.md) |
| TUI・keybinds・theme・ACP・web・plugins・cli.json Settings・Providers（プロバイダー接続）の CLI 側仕様を知りたい | cli | [references/cli/README.md](references/cli/README.md) |
| 典型的な使い方・設定例を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
