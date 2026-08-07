---
name: anthropic-claude-code
description: >
  Claude Code (code.claude.com) の CLI 本体リファレンス。
  CLAUDE.md memory, settings.json, env-vars, model config, keybindings, statusline,
  terminal config, cli-reference (-p / --continue / --resume), sessions, checkpointing,
  worktrees, remote control, channels, deep links, troubleshooting。
user-invocable: false
---

# anthropic-claude-code

Claude Code (code.claude.com) — ターミナル上で動くエージェント型コーディングツール CLI 本体のリファレンス。
インストール・quickstart・agentic loop の仕組み・CLAUDE.md memory・settings.json / 環境変数 / モデル設定・
keybindings / statusline / ターミナル設定・`cli-reference`（`-p` / `--continue` / `--resume` 等のフラグ）・
セッション管理（resume, checkpointing, worktrees, remote control, channels, deep links）・
トラブルシューティングをカバーする。

Skills / MCP / subagents / hooks / plugins の拡張機能は `anthropic-claude-code-extend`、
Agent SDK（ライブラリとして組み込む場合）は `anthropic-agent-sdk`、Messages API 直接呼び出しは
`anthropic-api-core` を参照（本スキルは Claude Code CLI 本体の使い方・設定・運用を担当）。

## ディレクトリ構成

```text
skills/anthropic-claude-code/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      quickstart.md
      how-claude-code-works.md
      best-practices.md
      common-workflows.md
      features-overview.md
      feature-availability.md
      glossary.md
      memory.md
      goal.md
      context-window.md
      prompt-caching.md
      setup.md
    settings/
      README.md
      settings.md
      env-vars.md
      model-config.md
      keybindings.md
      statusline.md
      terminal-config.md
      debug-your-config.md
      cli-reference.md
      claude-directory.md
      auto-mode-config.md
      fast-mode.md
      errors.md
    sessions/
      README.md
      sessions.md
      remote-control.md
      channels.md
      channels-reference.md
      deep-links.md
      worktrees.md
      checkpointing.md
    troubleshooting/
      README.md
      troubleshoot-install.md
      troubleshooting.md
  samples/
    README.md
    common-workflows.md
    memory-claude-md.md
    cli-usage.md
    settings-json.md
    statusline-config.md
    keybindings-terminal.md
  scripts/
    README.md
    install.md
    cli-commands.md
    env-setup.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`samples/` `scripts/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Claude Code の概要・インストール・quickstart・agentic loop の仕組み・ベストプラクティス・典型ワークフロー・機能一覧・用語集・CLAUDE.md memory・`/goal`・context window・prompt caching を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `settings.json` / 環境変数 / モデル設定・エイリアス・keybindings・statusline・ターミナル設定・`cli-reference`（コマンド・フラグ）・`.claude` ディレクトリ構成・auto mode・fast mode・エラーメッセージを知りたい | settings | [references/settings/README.md](references/settings/README.md) |
| セッション管理（resume / branch）・remote control・channels（MCP イベントプッシュ）・deep links・worktree 並行実行・checkpointing（`/rewind`）を扱いたい | sessions | [references/sessions/README.md](references/sessions/README.md) |
| インストール・ログイン失敗、CPU/メモリ高騰・ハング・auto-compact thrashing などランタイム問題を診断したい | troubleshooting | [references/troubleshooting/README.md](references/troubleshooting/README.md) |
| 典型的な使い方を知りたい（common workflows, CLAUDE.md `@path` インポート, CLI 起動パターン, settings.json 最小構成, statusline スクリプト, keybindings/tmux 設定） | samples | [samples/README.md](samples/README.md) |
| インストール・バージョン確認・アップデート・アンインストール・`claude` CLI コマンド例・認証/モデル/プロキシ環境変数設定を知りたい | scripts | [scripts/README.md](scripts/README.md) |
