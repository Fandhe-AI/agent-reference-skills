---
name: typedoc
description: >
  TypeDoc (TypeScript ドキュメントジェネレーター) リファレンス。
  typedoc.json, TSDoc タグ, オプション, テーマ, プラグイン開発
user-invocable: false
---

# TypeDoc リファレンス

TypeDoc (TypeScript ドキュメントジェネレーター) の全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/typedoc/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md         ← インストール・CLI・API（3ページ）
    ├── guides/README.md                  ← コメント構文・外部ドキュメント（4ページ）
    ├── tags-block/README.md              ← ブロックタグ（22ページ）
    ├── tags-modifier/README.md           ← モディファイアタグ（25ページ）
    ├── tags-inline/README.md             ← インラインタグ（4ページ）
    ├── options/README.md                 ← 設定オプション（7ページ）
    ├── themes/README.md                  ← テーマ（2ページ）
    ├── plugins/README.md                 ← プラグイン（1ページ）
    ├── development/README.md             ← 開発・拡張（4ページ）
    └── api/README.md                     ← プログラマティック API（8ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、CLI 使用法、プログラマティック API | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| コメント構文、JSDoc/TSDoc、外部ドキュメント、宣言参照 | guides | [references/guides/README.md](./references/guides/README.md) |
| @param, @returns, @example, @category 等のブロックタグ | tags-block | [references/tags-block/README.md](./references/tags-block/README.md) |
| @hidden, @internal, @override 等のモディファイアタグ | tags-modifier | [references/tags-modifier/README.md](./references/tags-modifier/README.md) |
| @link, @inheritDoc, @include 等のインラインタグ | tags-inline | [references/tags-inline/README.md](./references/tags-inline/README.md) |
| typedoc.json, entryPoints, out, theme 等の設定オプション | options | [references/options/README.md](./references/options/README.md) |
| デフォルトテーマ、カスタム CSS、コミュニティテーマ | themes | [references/themes/README.md](./references/themes/README.md) |
| コミュニティプラグイン一覧 | plugins | [references/plugins/README.md](./references/plugins/README.md) |
| カスタムテーマ開発、プラグイン開発、i18n | development | [references/development/README.md](./references/development/README.md) |
| Application, Converter, Renderer, Reflection 等の API | api | [references/api/README.md](./references/api/README.md) |
