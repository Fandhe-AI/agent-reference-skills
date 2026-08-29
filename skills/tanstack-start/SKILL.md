---
name: tanstack-start
description: >
  TanStack Start (TanStack Router ベースのフルスタック React フレームワーク、
  @tanstack/react-start) の API リファレンス。Next.js とは別フレームワーク。
  createServerFn (validator / handler), createMiddleware, server routes,
  createServerOnlyFn / createIsomorphicFn、SSR / selective SSR / SPA mode /
  static prerendering / ISR、streaming、hydration、
  server entry / client entry、hosting (Cloudflare Workers / Netlify /
  Vercel / Node / Bun / Docker)、authentication / session、Tailwind、SEO、
  environment variables。ルーティングは tanstack-router スキルを参照。
user-invocable: false
---

# TanStack Start リファレンス

TanStack Start (`@tanstack/react-start`) の API ドキュメントを蒸留したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/tanstack-start/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      getting-started.md
      build-from-scratch.md
      comparison.md
      start-vs-nextjs.md
      migrate-from-next-js.md
      tutorial-reading-writing-file.md
      tutorial-fetching-external-api.md
    server/
      README.md
      routing.md
      execution-model.md
      code-execution-patterns.md
      import-protection.md
      path-aliases.md
      environment-variables.md
      server-functions.md
      streaming-data-from-server-functions.md
      server-components.md
      static-server-functions.md
      environment-functions.md
      middleware.md
      error-boundaries.md
      server-routes.md
    rendering/
      README.md
      hydration-errors.md
      deferred-hydration.md
      selective-ssr.md
      spa-mode.md
      static-prerendering.md
      isr.md
      server-entry-point.md
      client-entry-point.md
      early-hints.md
      cdn-asset-urls.md
    deployment/
      README.md
      cloudflare-workers.md
      netlify.md
      railway.md
      nitro.md
      vercel.md
      node-docker.md
      bun.md
      appwrite-sites.md
      observability.md
    auth-data-styling/
      README.md
      authentication-overview.md
      authentication-server-primitives.md
      authentication.md
      databases.md
      css-styling.md
      tailwind-integration.md
      rendering-markdown.md
      seo.md
      geo.md
  samples/
    README.md
    basic-app.md
    server-function-crud.md
    api-route.md
    auth-middleware.md
    ssr-data-loading.md
    streaming.md
    spa-mode.md
    selective-ssr.md
    static-prerendering.md
    deploy-cloudflare.md
    deploy-vercel-nitro.md
    tailwind-setup.md
    environment-functions.md
  scripts/
    README.md
    create-project.md
    install.md
    dev-build.md
    deploy.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| プロジェクトの概要・セットアップ手段の比較・Next.js との違いを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| 手動セットアップの手順・Next.js からの移行手順を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| ファイルベースストレージ・外部 API 呼び出しのチュートリアルを追いたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `createServerFn` / `.validator` / `.handler`・static server functions・サーバーファンクションからのストリーミング | server | [references/server/README.md](references/server/README.md) |
| `createMiddleware`・`server.handlers`（raw HTTP エンドポイント）・エラーバウンダリ | server | [references/server/README.md](references/server/README.md) |
| 実行モデル（isomorphic 既定の境界）・`createServerOnlyFn` / `createIsomorphicFn` / `createClientOnlyFn`・import protection | server | [references/server/README.md](references/server/README.md) |
| React Server Components (RSC)・file-based routing の入口（ルーティング詳細は TanStack Router スキル）・path aliases・environment variables | server | [references/server/README.md](references/server/README.md) |
| Selective SSR / SPA mode / Static Prerendering / ISR の設定 | rendering | [references/rendering/README.md](references/rendering/README.md) |
| ハイドレーションエラーの原因・対策、deferred hydration | rendering | [references/rendering/README.md](references/rendering/README.md) |
| server entry / client entry・early hints・CDN asset URL の設定 | rendering | [references/rendering/README.md](references/rendering/README.md) |
| Cloudflare Workers / Netlify / Vercel / Node / Bun / Docker へのデプロイ | deployment | [references/deployment/README.md](references/deployment/README.md) |
| Railway / Appwrite Sites へのデプロイ、Nitro のビルド/デプロイ層、Observability の統合 | deployment | [references/deployment/README.md](references/deployment/README.md) |
| 認証の設計（session, OAuth, CSRF, レート制限）・ログイン/ログアウト実装 | auth-data-styling | [references/auth-data-styling/README.md](references/auth-data-styling/README.md) |
| データベース連携・Tailwind CSS 導入・CSS スタイリング方針 | auth-data-styling | [references/auth-data-styling/README.md](references/auth-data-styling/README.md) |
| Markdown レンダリング・SEO（meta/JSON-LD/sitemap）・GEO 対応 | auth-data-styling | [references/auth-data-styling/README.md](references/auth-data-styling/README.md) |
| 典型的な使い方・実装パターンを確認したい | samples | [samples/README.md](samples/README.md) |
| インストール・ビルド・デプロイのコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
