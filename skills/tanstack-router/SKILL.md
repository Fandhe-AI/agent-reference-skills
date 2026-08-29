---
name: tanstack-router
description: >
  TanStack Router (型安全 React ルーター、@tanstack/react-router) の API リファレンス。
  React Router (react-router) とは別ライブラリ。
  createRouter, createFileRoute, createRootRoute, createLazyFileRoute, Link, Outlet,
  useNavigate, useParams, useSearch, useLoaderData, useBlocker, loader, beforeLoad,
  validateSearch, redirect, notFound, Await, file-based routing, routeTree.gen.ts,
  router-plugin, tsr CLI, code splitting, SSR, TanStack Query 統合, eslint-plugin-router。
user-invocable: false
---

# TanStack Router リファレンス

TanStack Router (`@tanstack/react-router`) の公式ドキュメントを蒸留したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/tanstack-router/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      quick-start.md
      devtools.md
      decisions-on-dx.md
      comparison.md
      faq.md
      installation-manual.md
      installation-with-vite.md
      installation-with-rspack.md
      installation-with-webpack.md
      installation-with-esbuild.md
      installation-with-router-cli.md
      migrate-from-react-router.md
      migrate-from-react-location.md
    core-routing/
      README.md
      routing-concepts.md
      route-trees.md
      route-matching.md
      file-based-routing.md
      virtual-file-routes.md
      code-based-routing.md
      file-naming-conventions.md
      url-rewrites.md
    navigation/
      README.md
      navigation.md
      links.md
      link-options.md
      custom-link.md
      path-params.md
      search-params.md
      custom-search-param-serialization.md
      route-masking.md
      navigation-blocking.md
      history-types.md
      scroll-restoration.md
      internationalization-i18n.md
    data-rendering/
      README.md
      data-loading.md
      deferred-data-loading.md
      external-data-loading.md
      data-mutations.md
      preloading.md
      document-head-management.md
      ssr.md
      render-optimizations.md
      code-splitting.md
      automatic-code-splitting.md
    configuration/
      README.md
      creating-a-router.md
      outlets.md
      router-events.md
      type-safety.md
      type-utilities.md
      router-context.md
      not-found-errors.md
      authenticated-routes.md
      static-route-data.md
    api/
      README.md
      create-router.md
      create-route.md
      create-file-route.md
      create-root-route.md
      create-root-route-with-context.md
      create-lazy-file-route.md
      lazy-route-component.md
      router-provider.md
      link.md
      outlet.md
      navigate.md
      use-router.md
      use-navigate.md
      use-params.md
      use-search.md
      use-loader-data.md
      use-loader-deps.md
      use-route-context.md
      use-match.md
      use-matches.md
      use-match-route.md
      use-router-state.md
      use-blocker.md
      use-location.md
      use-can-go-back.md
      redirect.md
      not-found.md
      router-options.md
      route-options.md
      router.md
      route-match.md
      parsed-location.md
      navigate-options.md
      link-options.md
      register.md
      error-component.md
      catch-boundary.md
      catch-not-found.md
      retain-search-params.md
      strip-search-params.md
      eslint-plugin-router.md
      create-route-property-order.md
      query.md
      defer.md
      await.md
      use-awaited.md
      get-route-api.md
      create-route-mask.md
      match-route.md
      client-only.md
      use-link-props.md
      use-child-matches.md
      use-parent-matches.md
      is-redirect.md
      is-not-found.md
  samples/
    README.md
    basic-file-routing.md
    code-based-routing.md
    search-params-validation.md
    path-params.md
    data-loading.md
    deferred-data.md
    auth-guard.md
    navigation-blocking.md
    query-integration.md
    code-splitting.md
    basic-ssr.md
    router-context.md
  scripts/
    README.md
    install.md
    scaffold.md
    bundler-plugins.md
    router-cli.md
    devtools.md
    eslint.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| 導入・インストール（Vite/Rspack/Webpack/Esbuild/Router CLI）・React Router からの移行 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Devtools・設計思想（Decisions on DX）・他ライブラリとの比較・FAQ | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| ファイル/コードベースルーティングの基本概念・ルートツリー構造・マッチング規則 | core-routing | [references/core-routing/README.md](references/core-routing/README.md) |
| ファイル命名規則（`$`/`_`/`(group)` 等）・Virtual File Routes・URL Rewrites | core-routing | [references/core-routing/README.md](references/core-routing/README.md) |
| `Link` / `useNavigate` / `linkOptions` / `createLink` によるナビゲーション | navigation | [references/navigation/README.md](references/navigation/README.md) |
| Path Params / Search Params の型安全バリデーション・カスタムシリアライズ | navigation | [references/navigation/README.md](references/navigation/README.md) |
| Route Masking・Navigation Blocking・History 種別・スクロール復元・i18n | navigation | [references/navigation/README.md](references/navigation/README.md) |
| `loader` / `useLoaderData` によるデータロード・Deferred Data・外部データ連携 | data-rendering | [references/data-rendering/README.md](references/data-rendering/README.md) |
| Preloading・Document Head 管理・SSR・レンダリング最適化・Code Splitting | data-rendering | [references/data-rendering/README.md](references/data-rendering/README.md) |
| `createRouter` の初期化オプション・Router Events・型安全性・Router Context | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Not Found エラー処理・`beforeLoad` による認証ガード・Static Route Data | configuration | [references/configuration/README.md](references/configuration/README.md) |
| 個別 API（フック・コンポーネント・関数・型）のシグネチャを正確に知りたい | api | [references/api/README.md](references/api/README.md) |
| `defer` / `Await` / `useAwaited`・ESLint プラグイン・TanStack Query 統合の API | api | [references/api/README.md](references/api/README.md) |
| 典型的な使い方（ファイルルーティング・認証ガード・SSR・Query 統合等）の実装例を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・scaffold・bundler plugin 設定・CLI・Devtools・ESLint コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
