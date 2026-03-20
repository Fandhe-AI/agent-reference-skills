---
name: lefthook
description: >
  Lefthook (Git hooks マネージャー) リファレンス。
  lefthook.yml, pre-commit, pre-push, parallel, piped
user-invocable: false
---

# Lefthook リファレンス

Lefthook（lefthook.dev）の全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/lefthook/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── installation/README.md            ← インストール方法（17ページ）
    ├── configuration/README.md           ← 設定リファレンス（6ページ）
    ├── usage/README.md                   ← CLI コマンド・環境変数（2ページ）
    └── examples/README.md               ← 実用的な設定例（7ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| Lefthook のインストール、セットアップ | installation | [references/installation/README.md](./references/installation/README.md) |
| npm / yarn / pnpm でのインストール | installation | [references/installation/README.md](./references/installation/README.md) |
| Homebrew / Go / Ruby でのインストール | installation | [references/installation/README.md](./references/installation/README.md) |
| lefthook.yml の設定、グローバル設定 | configuration | [references/configuration/README.md](./references/configuration/README.md) |
| extends, output, rc, templates | configuration | [references/configuration/README.md](./references/configuration/README.md) |
| remotes, リモート設定の共有 | configuration | [references/configuration/README.md](./references/configuration/README.md) |
| Hook 設定（parallel, piped, follow, skip） | configuration | [references/configuration/README.md](./references/configuration/README.md) |
| Command 設定（run, glob, files, stage_fixed） | configuration | [references/configuration/README.md](./references/configuration/README.md) |
| Script 設定（script, runner） | configuration | [references/configuration/README.md](./references/configuration/README.md) |
| lefthook install / uninstall / run | usage | [references/usage/README.md](./references/usage/README.md) |
| lefthook add / validate / dump | usage | [references/usage/README.md](./references/usage/README.md) |
| 環境変数（LEFTHOOK, LEFTHOOK_VERBOSE 等） | usage | [references/usage/README.md](./references/usage/README.md) |
| lefthook-local.yml、ローカル設定 | examples | [references/examples/README.md](./references/examples/README.md) |
| コマンドラッピング、フィルタリング | examples | [references/examples/README.md](./references/examples/README.md) |
| commitlint 統合、stage_fixed 例 | examples | [references/examples/README.md](./references/examples/README.md) |
| skip / only 条件設定 | examples | [references/examples/README.md](./references/examples/README.md) |
