---
name: syncpack
description: >
  Syncpack (モノレポ依存関係管理) API リファレンス。
  .syncpackrc, lint, fix, update, format,
  versionGroups, semverGroups, customTypes, source
user-invocable: false
---

# Syncpack リファレンス

Syncpack（syncpack.dev）の全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/syncpack/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── guide/README.md                   ← ガイド（3ページ）
    ├── commands/README.md                ← CLI コマンド（6ページ）
    ├── version-groups/README.md          ← バージョングループ（8ページ）
    ├── semver-groups/README.md           ← Semver グループ（2ページ）
    ├── config/README.md                  ← 設定オプション（14ページ）
    └── reference/README.md               ← リファレンス（4ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、初期設定、Getting Started | guide | [references/guide/README.md](./references/guide/README.md) |
| v14 移行、マイグレーション | guide | [references/guide/README.md](./references/guide/README.md) |
| peerDependencies の誤検知対策 | guide | [references/guide/README.md](./references/guide/README.md) |
| syncpack lint、バージョン不一致チェック | commands | [references/commands/README.md](./references/commands/README.md) |
| syncpack fix、バージョン修正 | commands | [references/commands/README.md](./references/commands/README.md) |
| syncpack update、最新バージョン更新 | commands | [references/commands/README.md](./references/commands/README.md) |
| syncpack format、package.json 整形 | commands | [references/commands/README.md](./references/commands/README.md) |
| syncpack list、依存関係一覧 | commands | [references/commands/README.md](./references/commands/README.md) |
| syncpack json、JSON 出力 | commands | [references/commands/README.md](./references/commands/README.md) |
| 特定バージョンに固定、pinVersion | version-groups | [references/version-groups/README.md](./references/version-groups/README.md) |
| 最高バージョンに統一、highestSemver | version-groups | [references/version-groups/README.md](./references/version-groups/README.md) |
| 依存関係の禁止、banned | version-groups | [references/version-groups/README.md](./references/version-groups/README.md) |
| バージョンチェック除外、ignored | version-groups | [references/version-groups/README.md](./references/version-groups/README.md) |
| snapTo、特定パッケージに追従 | version-groups | [references/version-groups/README.md](./references/version-groups/README.md) |
| sameRange、sameMinor ポリシー | version-groups | [references/version-groups/README.md](./references/version-groups/README.md) |
| semver range 統一、^ ~ 固定 | semver-groups | [references/semver-groups/README.md](./references/semver-groups/README.md) |
| semver チェック除外 | semver-groups | [references/semver-groups/README.md](./references/semver-groups/README.md) |
| .syncpackrc 設定ファイル、設定形式 | config | [references/config/README.md](./references/config/README.md) |
| customTypes、カスタム依存関係型 | config | [references/config/README.md](./references/config/README.md) |
| source、対象ファイル指定 | config | [references/config/README.md](./references/config/README.md) |
| sortAz、sortFirst、ソート設定 | config | [references/config/README.md](./references/config/README.md) |
| indent、インデント設定 | config | [references/config/README.md](./references/config/README.md) |
| formatBugs、formatRepository | config | [references/config/README.md](./references/config/README.md) |
| dependencyGroups、依存グループ設定 | config | [references/config/README.md](./references/config/README.md) |
| strict モード | config | [references/config/README.md](./references/config/README.md) |
| 依存関係型一覧（dev, peer, prod 等） | reference | [references/reference/README.md](./references/reference/README.md) |
| specifier 型一覧（exact, range, workspace 等） | reference | [references/reference/README.md](./references/reference/README.md) |
| ステータスコード一覧 | reference | [references/reference/README.md](./references/reference/README.md) |
| 用語集、glossary | reference | [references/reference/README.md](./references/reference/README.md) |
