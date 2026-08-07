---
name: anthropic-claude-code-surfaces
description: >
  Claude Code (code.claude.com) の各サーフェス（Desktop / IDE / Web / モバイル / ターミナル UX）リファレンス。
  Desktop app（launch.json, scheduled tasks, WSL, Linux, iOS simulator）、
  VS Code / JetBrains / Chrome 拡張連携、claude.ai/code（Web）と mobile アプリ、
  interactive mode, fullscreen, voice dictation, accessibility,
  computer use, artifacts。
user-invocable: false
---

# anthropic-claude-code-surfaces

Claude Code (code.claude.com) を利用する各サーフェス（Desktop アプリ、IDE 拡張、Web/モバイル、ターミナル UX）のリファレンス。

CLI 本体（インストール・設定・セッション管理）は `anthropic-claude-code`、Skills / MCP / subagents / hooks / plugins などの拡張機能は `anthropic-claude-code-extend` を参照（本スキルは各サーフェス固有の操作・設定のみを担当）。

## ディレクトリ構成

```text
skills/anthropic-claude-code-surfaces/
  SKILL.md
  references/
    desktop/
      README.md
      desktop.md
      desktop-quickstart.md
      desktop-linux.md
      desktop-wsl.md
      desktop-ios-simulator.md
      desktop-scheduled-tasks.md
    ide/
      README.md
      vs-code.md
      jetbrains.md
      chrome.md
    web-mobile/
      README.md
      web-quickstart.md
      claude-code-on-the-web.md
      mobile.md
    terminal-ux/
      README.md
      interactive-mode.md
      fullscreen.md
      accessibility.md
      voice-dictation.md
      computer-use.md
      artifacts.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Claude Desktop アプリの並行セッション・quickstart・Linux（beta）インストール・WSL 2 実行・iOS Simulator 連携・scheduled tasks を知りたい | desktop | [references/desktop/README.md](references/desktop/README.md) |
| VS Code / JetBrains（IntelliJ, PyCharm, WebStorm 等）/ Chrome 拡張から Claude Code を使いたい | ide | [references/ide/README.md](references/ide/README.md) |
| claude.ai/code（Web）でのセッション実行・`--cloud` / `--teleport` によるセッション移動・mobile アプリからのタスク開始/監視を知りたい | web-mobile | [references/web-mobile/README.md](references/web-mobile/README.md) |
| interactive mode のキーボードショートカット・fullscreen 描画・screen reader（accessibility）・voice dictation・computer use（MCP 経由の画面操作）・artifacts 共有を知りたい | terminal-ux | [references/terminal-ux/README.md](references/terminal-ux/README.md) |
