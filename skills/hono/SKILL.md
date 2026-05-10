---
name: hono
description: >
  Hono Web フレームワーク API リファレンス。
  Hono App, Context, HonoRequest, Routing, HTTPException,
  Built-in Middleware (JWT, CORS, CSRF, Cache, Logger 等),
  Helpers (Cookie, Streaming, WebSocket, Factory, RPC),
  マルチランタイム対応 (Cloudflare Workers, Deno, Bun, Node.js)
user-invocable: false
model: sonnet
---

# Hono API リファレンス

Hono — Web Standards ベースの軽量・高速 Web フレームワーク。
マルチランタイム（Cloudflare Workers, Deno, Bun, Node.js 等）で動作する。
API 設計・ミドルウェア選定・ルーティング実装時に参照する。

## ディレクトリ構造

```
.claude/skills/hono/
├── SKILL.md                                ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md           ← Getting Started 索引（16ページ）
    ├── api/README.md                       ← API リファレンス索引（6ページ）
    ├── concepts/README.md                  ← コンセプト索引（7ページ）
    ├── middleware/README.md                ← Built-in Middleware 索引（23ページ）
    ├── helpers/README.md                   ← Helpers 索引（15ページ）
    └── guides/README.md                    ← ガイド索引（9ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| プロジェクト初期セットアップ、ランタイム別の構成、serve 関数 | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| Hono App, HonoRequest, Context, ルーティング, HTTPException, プリセット | api | [references/api/README.md](./references/api/README.md) |
| 設計思想, Web Standards, ミドルウェア概念, ルーター種類, Stacks | concepts | [references/concepts/README.md](./references/concepts/README.md) |
| 認証 (JWT/Basic/Bearer), CORS, CSRF, Cache, Logger, Compress, ETag 等 | middleware | [references/middleware/README.md](./references/middleware/README.md) |
| Cookie, Streaming, WebSocket, Proxy, Factory, SSG, Testing, ConnInfo | helpers | [references/helpers/README.md](./references/helpers/README.md) |
| ベストプラクティス, カスタムミドルウェア, JSX, バリデーション, RPC, テスト | guides | [references/guides/README.md](./references/guides/README.md) |
