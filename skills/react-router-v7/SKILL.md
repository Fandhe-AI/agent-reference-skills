---
name: react-router-v7
description: >
  React Router v7 Framework Mode API リファレンス。
  loader, action, middleware, hooks, コンポーネント,
  routes.ts, SSR, SPA, ErrorBoundary, session
user-invocable: false
---

# React Router v7 Framework Mode リファレンス

React Router v7 Framework Mode の全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/react-router-v7/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── start/README.md                   ← 入門ガイド（10ページ）
    ├── conventions/README.md             ← フレームワーク規約（7ページ）
    ├── routers/README.md                 ← ルーターコンポーネント（2ページ）
    ├── hooks/README.md                   ← 全 hooks（23ページ）
    ├── components/README.md              ← 全コンポーネント（11ページ）
    ├── utils/README.md                   ← 全ユーティリティ（13ページ）
    ├── how-to/README.md                  ← 実装ガイド（24ページ）
    ├── explanation/README.md             ← 概念説明（12ページ）
    └── cli/README.md                     ← CLI コマンド（1ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| プロジェクトセットアップ、ルーティング設定、データ読み込み | start | [references/start/README.md](./references/start/README.md) |
| root.tsx, routes.ts, config, entry ファイル | conventions | [references/conventions/README.md](./references/conventions/README.md) |
| HydratedRouter, ServerRouter | routers | [references/routers/README.md](./references/routers/README.md) |
| useLoaderData, useFetcher, useNavigate 等 | hooks | [references/hooks/README.md](./references/hooks/README.md) |
| Form, Link, NavLink, Outlet, Await 等 | components | [references/components/README.md](./references/components/README.md) |
| redirect, data, createCookie, session 等 | utils | [references/utils/README.md](./references/utils/README.md) |
| ミドルウェア、ファイルアップロード、SPA、セキュリティ等 | how-to | [references/how-to/README.md](./references/how-to/README.md) |
| コード分割、状態管理、型安全性等の概念 | explanation | [references/explanation/README.md](./references/explanation/README.md) |
| dev, build, typegen 等の CLI コマンド | cli | [references/cli/README.md](./references/cli/README.md) |
