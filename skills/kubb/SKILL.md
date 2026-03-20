---
name: kubb
description: >
  Kubb (OpenAPI コードジェネレーター) リファレンス。
  kubb.config.ts, Swagger, TanStack Query, Zod, MSW
user-invocable: false
---

# Kubb リファレンス

Kubb（kubb.dev）の全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/kubb/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md         ← 入門ガイド（6ページ）
    ├── plugins/README.md                 ← プラグイン（16ページ）
    ├── helpers/README.md                 ← ヘルパー・ビルドツール（3ページ）
    ├── examples/README.md                ← サンプル（16ページ）
    └── guides/README.md                  ← ガイド（2ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、初期設定、kubb init、kubb.config.ts | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| OpenAPI パース、TypeScript 型生成、API クライアント生成 | plugins | [references/plugins/README.md](./references/plugins/README.md) |
| Zod スキーマ生成、Faker モック、MSW ハンドラー | plugins | [references/plugins/README.md](./references/plugins/README.md) |
| React Query / Vue Query / SWR hooks 生成 | plugins | [references/plugins/README.md](./references/plugins/README.md) |
| Cypress テスト、MCP サーバー、Redoc ドキュメント生成 | plugins | [references/plugins/README.md](./references/plugins/README.md) |
| CLI コマンド（generate, validate, start, agent, mcp） | helpers | [references/helpers/README.md](./references/helpers/README.md) |
| MCP サーバー統合、Claude Desktop 連携 | helpers | [references/helpers/README.md](./references/helpers/README.md) |
| Vite / webpack / Rollup / esbuild / Nuxt / Astro 統合 | helpers | [references/helpers/README.md](./references/helpers/README.md) |
| 各プラグインの kubb.config.ts 設定例 | examples | [references/examples/README.md](./references/examples/README.md) |
| カスタムジェネレーター、高度な構成 | examples | [references/examples/README.md](./references/examples/README.md) |
| 基本チュートリアル、ステップバイステップ | guides | [references/guides/README.md](./references/guides/README.md) |
| v3→v5 マイグレーション、破壊的変更 | guides | [references/guides/README.md](./references/guides/README.md) |
