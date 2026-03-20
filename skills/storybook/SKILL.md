---
name: storybook
description: >
  Storybook API リファレンス。
  story, CSF, args, decorators, play function,
  テスト, autodocs, main.ts, preview.ts, アドオン
user-invocable: false
---

# Storybook リファレンス

Storybook 公式ドキュメントを網羅した API リファレンススキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/storybook/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── get-started/README.md             ← 入門ガイド（5ページ）
    ├── writing-stories/README.md         ← ストーリーの書き方（13ページ）
    ├── writing-tests/README.md           ← テストの書き方（8ページ）
    ├── writing-docs/README.md            ← ドキュメントの書き方（5ページ）
    ├── essentials/README.md              ← ビルトインアドオン（7ページ）
    ├── configure/README.md               ← 設定（12ページ）
    ├── builders/README.md                ← ビルダー（3ページ）
    └── api/
        ├── README.md                     ← API リファレンストップ（8項目）
        ├── main-config/README.md         ← main.js|ts 設定（22ページ）
        ├── doc-blocks/README.md          ← Doc Blocks（18ページ）
        └── portable-stories/README.md    ← Portable Stories（3ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、ストーリーとは、セットアップ | get-started | [references/get-started/README.md](./references/get-started/README.md) |
| Args、Decorators、Play function、Mocking、TypeScript | writing-stories | [references/writing-stories/README.md](./references/writing-stories/README.md) |
| Interaction テスト、A11y テスト、Visual テスト、CI | writing-tests | [references/writing-tests/README.md](./references/writing-tests/README.md) |
| Autodocs、MDX、Doc Blocks、ドキュメントビルド | writing-docs | [references/writing-docs/README.md](./references/writing-docs/README.md) |
| Actions、Controls、Viewport、Backgrounds | essentials | [references/essentials/README.md](./references/essentials/README.md) |
| CSS、TypeScript、Theming、環境変数、サイドバー | configure | [references/configure/README.md](./references/configure/README.md) |
| Vite、Webpack、Builder API | builders | [references/builders/README.md](./references/builders/README.md) |
| CSF、ArgTypes、Parameters、CLI | api | [references/api/README.md](./references/api/README.md) |
| main.js の framework、stories、addons 等の設定 | api/main-config | [references/api/main-config/README.md](./references/api/main-config/README.md) |
| Canvas、Source、Meta 等の Doc Block コンポーネント | api/doc-blocks | [references/api/doc-blocks/README.md](./references/api/doc-blocks/README.md) |
| Vitest、Jest、Playwright での Portable Stories | api/portable-stories | [references/api/portable-stories/README.md](./references/api/portable-stories/README.md) |
