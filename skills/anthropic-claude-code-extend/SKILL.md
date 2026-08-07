---
name: anthropic-claude-code-extend
description: >
  Claude Code (code.claude.com) の拡張機能リファレンス。
  Agent Skills (SKILL.md), slash commands, output styles, subagents, agent teams,
  agent view, workflows, routines, scheduled tasks, hooks (PreToolUse / PostToolUse),
  plugins, plugin marketplace, MCP 設定 (.mcp.json / claude mcp add), managed MCP,
  tools-reference, advisor, ultrareview。
user-invocable: false
---

# anthropic-claude-code-extend

Claude Code (code.claude.com) — CLI 本体を拡張する機能群のリファレンス。Agent Skills（SKILL.md）・
slash commands・output styles、subagents / agent teams / agent view / workflows / routines /
scheduled tasks、hooks、plugins / plugin marketplace、MCP 設定、built-in tools（advisor / ultrareview 含む）
をカバーする。

CLI 本体（インストール・設定・セッション）は `anthropic-claude-code`、Agent SDK の Skills / MCP /
subagents / hooks は `anthropic-agent-sdk`、Claude API 側の Agent Skills / Skills API / MCP connector は
`anthropic-api-tools-mcp` を参照（本スキルは Claude Code CLI から使う拡張機能の設定・仕様を担当）。

## ディレクトリ構成

```text
skills/anthropic-claude-code-extend/
  SKILL.md
  references/
    skills-commands/
      README.md
      commands.md
      output-styles.md
      prompt-library.md
      skills.md
    subagents/
      README.md
      agent-teams.md
      agent-view.md
      agents.md
      routines.md
      routines-fire.md
      scheduled-tasks.md
      sub-agents.md
      workflows.md
    hooks/
      README.md
      hooks.md
      hooks-guide.md
    plugins/
      README.md
      discover-plugins.md
      plugin-dependencies.md
      plugin-hints.md
      plugin-marketplaces.md
      plugin-relevance.md
      plugins.md
      plugins-reference.md
    mcp/
      README.md
      managed-mcp.md
      mcp.md
      mcp-quickstart.md
    tools/
      README.md
      advisor.md
      tools-reference.md
      ultrareview.md
  samples/
    README.md
    skill-definition.md
    slash-command.md
    hook-config.md
    subagent-definition.md
    plugin-manifest.md
    plugin-marketplace.md
    mcp-config.md
    output-style.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`samples/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Agent Skills（SKILL.md）を定義したい・slash command を作りたい・output style や SDLC prompt library を使いたい | skills-commands | [references/skills-commands/README.md](references/skills-commands/README.md) |
| subagent を定義したい・agent teams で複数インスタンスを協調させたい・agent view でバックグラウンド session を管理したい・並列実行の 4 アプローチを比較したい・routines / scheduled tasks（/loop, /fire）で自動化したい・workflows で大規模 orchestration を組みたい | subagents | [references/subagents/README.md](references/subagents/README.md) |
| セッション lifecycle イベント（SessionStart / PreToolUse / PostToolUse / PermissionRequest 等）で hook を設定・実装したい | hooks | [references/hooks/README.md](references/hooks/README.md) |
| plugin を作成・配布したい・plugin marketplace を構築したい・plugin.json manifest や dependency constraint を確認したい | plugins | [references/plugins/README.md](references/plugins/README.md) |
| Claude Code から MCP サーバーへ接続したい（.mcp.json / `claude mcp add`）・organization 単位で managed MCP access を制御したい | mcp | [references/mcp/README.md](references/mcp/README.md) |
| built-in tool（Agent / Bash / Read / Edit / Skill 等）の完全リファレンスを確認したい・advisor tool や ultrareview を使いたい | tools | [references/tools/README.md](references/tools/README.md) |
| 典型的な使い方を知りたい（SKILL.md 定義, slash command, hook 設定, subagent 定義, plugin manifest / marketplace, .mcp.json, output style） | samples | [samples/README.md](samples/README.md) |
