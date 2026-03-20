---
name: react-hook-form
description: >
  React Hook Form v7 API リファレンス。
  useForm, Controller, useFieldArray, バリデーション, resolver
user-invocable: false
---

# React Hook Form v7 リファレンス

React Hook Form v7 の全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/react-hook-form/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── get-started/README.md             ← インストール・基本使用法（1ページ）
    ├── api/README.md                     ← API 全体概要 + 個別ファイル（30ページ）
    ├── typescript/README.md              ← 型定義一覧（1ページ）
    ├── advanced/README.md                ← 高度な使い方（1ページ）
    ├── faqs/README.md                    ← よくある質問（1ページ）
    └── dev-tools/README.md              ← DevTools（1ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、基本的なフォーム作成、バリデーションルール、スキーマ統合 | get-started | [references/get-started/README.md](./references/get-started/README.md) |
| useForm, register, handleSubmit, reset, Controller, useFieldArray 等 | api | [references/api/README.md](./references/api/README.md) |
| 型定義、ジェネリクス、FieldPath, Resolver 型 | typescript | [references/typescript/README.md](./references/typescript/README.md) |
| アクセシビリティ、ウィザードフォーム、テスト、仮想リスト | advanced | [references/advanced/README.md](./references/advanced/README.md) |
| パフォーマンス、クラスコンポーネント、watch vs getValues | faqs | [references/faqs/README.md](./references/faqs/README.md) |
| DevTools のインストール・デバッグ | dev-tools | [references/dev-tools/README.md](./references/dev-tools/README.md) |
