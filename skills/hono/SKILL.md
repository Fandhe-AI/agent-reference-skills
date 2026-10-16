---
name: hono
description: >
  Hono (軽量・マルチランタイム対応 Web フレームワーク) リファレンス。
  Hono App, Context (c.req / c.json / c.text / c.html), HonoRequest, Routing, HTTPException、
  Built-in Middleware (JWT, CORS, CSRF, Cache, Logger, Compress, Basic / Bearer Auth, Mount)、
  Helpers (Cookie, Streaming, WebSocket, Factory, RPC)、
  Cloudflare Workers / Deno / Bun / Node.js / AWS Lambda 対応、@hono/* アダプターパッケージ。
user-invocable: false
model: sonnet
---

# Hono API リファレンス

Hono — Web Standards ベースの軽量・高速 Web フレームワーク。
マルチランタイム（Cloudflare Workers, Deno, Bun, Node.js 等）で動作する。
API 設計・ミドルウェア選定・ルーティング実装時に参照する。

対象 Hono v4.13.13 / ランタイムアダプター @hono/* 1.0.x（docs: honojs/website 7838d779, 2026-10-13）。

## ディレクトリ構成

```text
skills/hono/
  SKILL.md
  references/
    getting-started/
      README.md
      basic.md
      nodejs.md
      bun.md
      deno.md
      cloudflare-workers.md
      cloudflare-pages.md
      vercel.md
      netlify.md
      aws-lambda.md
      lambda-edge.md
      fastly.md
      azure-functions.md
      google-cloud-run.md
      nextjs.md
      supabase-functions.md
      service-worker.md
      ali-function-compute.md
      cloudflare-workers-vite.md
      webassembly-wasi.md
      cloudbase.md
    api/
      README.md
      hono.md
      context.md
      request.md
      routing.md
      exception.md
      presets.md
    concepts/
      README.md
      motivation.md
      web-standard.md
      middleware.md
      routers.md
      benchmarks.md
      developer-experience.md
      stacks.md
    middleware/
      README.md
      basic-auth.md
      bearer-auth.md
      jwt.md
      jwk.md
      csrf.md
      secure-headers.md
      cors.md
      etag.md
      body-limit.md
      cache.md
      compress.md
      pretty-json.md
      method-override.md
      request-id.md
      timeout.md
      timing.md
      logger.md
      language.md
      trailing-slash.md
      context-storage.md
      jsx-renderer.md
      combine.md
      ip-restriction.md
      method-not-allowed.md
      mount.md
      third-party.md
    helpers/
      README.md
      accepts.md
      adapter.md
      conninfo.md
      cookie.md
      css.md
      dev.md
      factory.md
      html.md
      jwt.md
      proxy.md
      route.md
      ssg.md
      streaming.md
      testing.md
      websocket.md
    guides/
      README.md
      best-practices.md
      create-hono.md
      examples.md
      faq.md
      helpers.md
      jsx.md
      jsx-dom.md
      middleware.md
      others.md
      rpc.md
      testing.md
      validation.md
  samples/
    README.md
    basic-app.md
    cors-jwt-auth.md
    middleware-custom.md
    jsx-ssr.md
    rpc.md
    routing.md
    streaming-sse.md
    testing.md
    validation-zod.md
    websocket.md
  scripts/
    README.md
    install.md
    dev.md
    build.md
    deploy.md
    test.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| プロジェクト初期セットアップ、ランタイム別の構成（Tencent CloudBase 含む）、@hono/* アダプターパッケージ、serve 関数 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Hono App, HonoRequest, Context, ルーティング, HTTPException, プリセット | api | [references/api/README.md](references/api/README.md) |
| 設計思想、Web Standards、ミドルウェア概念、ルーター種類、Stacks | concepts | [references/concepts/README.md](references/concepts/README.md) |
| 認証 (JWT / Basic / Bearer)、CORS、CSRF、Cache、Logger、Compress、ETag 等、Mount（他フレームワーク製アプリの組み込み。app.mount() は非推奨）、Third-party middleware（バリデーター・OpenAPI・認証・監視） | middleware | [references/middleware/README.md](references/middleware/README.md) |
| Cookie、Streaming、WebSocket、Proxy、Factory、SSG、Testing、ConnInfo | helpers | [references/helpers/README.md](references/helpers/README.md) |
| ベストプラクティス、カスタムミドルウェア、JSX、バリデーション、RPC、テスト | guides | [references/guides/README.md](references/guides/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
