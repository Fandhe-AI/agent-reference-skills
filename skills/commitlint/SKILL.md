---
name: commitlint
description: >
  commitlint (コミットメッセージ検証) リファレンス。
  rules, plugins, shareable-config, Husky, CI
user-invocable: false
---

# commitlint リファレンス

commitlint 公式ドキュメントの全 API・ガイドを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/commitlint/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── guides/README.md                  ← 入門・セットアップガイド（4ページ）
    ├── reference/README.md               ← CLI・設定・ルール・プラグイン（8ページ）
    ├── api/README.md                     ← Node.js API（4ページ）
    ├── concepts/README.md                ← コミット規約・共有設定（2ページ）
    └── support/README.md                 ← トラブルシューティング・移行（3ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、初期設定、Husky 連携、Git フック | guides | [references/guides/README.md](./references/guides/README.md) |
| CLI オプション、設定ファイル、ルール一覧、プラグイン作成 | reference | [references/reference/README.md](./references/reference/README.md) |
| @commitlint/load, lint, read, format の API | api | [references/api/README.md](./references/api/README.md) |
| Conventional Commits フォーマット、共有設定の作成・配布 | concepts | [references/concepts/README.md](./references/concepts/README.md) |
| エラー解決、バージョンアップグレード、リリースポリシー | support | [references/support/README.md](./references/support/README.md) |
