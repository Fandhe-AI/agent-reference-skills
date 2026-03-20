---
name: editorconfig
description: >
  EditorConfig リファレンス。.editorconfig プロパティと glob パターン
user-invocable: false
---

# EditorConfig リファレンス

EditorConfig ファイルフォーマットの全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切なリファレンスファイルを読むこと。

## ディレクトリ構造

```
.claude/skills/editorconfig/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── README.md                         ← リファレンス概要・ファイル一覧
    ├── specification.md                  ← 正式仕様（ファイル発見、パース、優先順位）
    ├── properties.md                     ← 全プロパティ詳細（値、説明、適用タイミング）
    ├── glob-patterns.md                  ← グロブパターン仕様
    └── best-practices.md                 ← 設定例、FAQ、よくあるパターン
```

## 探索手順

1. ユーザーのタスクに最も関連するリファレンスを特定する
2. そのリファレンスファイルを読む
3. 必要に応じて関連ファイルのリンクを辿る

## タスク → リファレンスマッピング

| タスク例 | リファレンス | パス |
|---------|------------|------|
| `.editorconfig` の新規作成、設定例 | best-practices | [references/best-practices.md](./references/best-practices.md) |
| プロパティの意味、値、設定方法 | properties | [references/properties.md](./references/properties.md) |
| ファイルマッチングパターン、ワイルドカード | glob-patterns | [references/glob-patterns.md](./references/glob-patterns.md) |
| ファイル検索順、優先順位、パース仕様 | specification | [references/specification.md](./references/specification.md) |
