---
name: knip
description: >
  Knip (未使用コード検出) リファレンス。
  dead code, unused deps/exports, auto-fix, monorepo
user-invocable: false
---

# Knip リファレンス

Knip の公式ドキュメント全コアページを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/knip/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── overview/README.md               ← 入門・概要（4ページ）
    ├── explanations/README.md           ← 概念説明（4ページ）
    ├── features/README.md               ← 機能詳細（9ページ）
    ├── guides/README.md                 ← 実践ガイド（9ページ）
    ├── reference/README.md              ← リファレンス（11ページ）
    ├── typescript/README.md             ← TypeScript 固有（2ページ）
    └── writing-a-plugin/README.md       ← プラグイン開発（3ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、初期設定、基本的な使い方 | overview | [references/overview/README.md](./references/overview/README.md) |
| エントリーファイル、プラグインの仕組み、導入理由 | explanations | [references/explanations/README.md](./references/explanations/README.md) |
| production mode、monorepo、auto-fix、compilers、reporters | features | [references/features/README.md](./references/features/README.md) |
| 設定調整、トラブルシューティング、CI 統合、パフォーマンス | guides | [references/guides/README.md](./references/guides/README.md) |
| CLI フラグ、設定オプション、issue types、JSDoc タグ、FAQ | reference | [references/reference/README.md](./references/reference/README.md) |
| 未使用 dependencies/exports の検出・解説 | typescript | [references/typescript/README.md](./references/typescript/README.md) |
| カスタムプラグインの作成、inputs、引数パーサー | writing-a-plugin | [references/writing-a-plugin/README.md](./references/writing-a-plugin/README.md) |
