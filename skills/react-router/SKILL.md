---
name: react-router
description: >
  React Router v8 (Framework Mode、旧 Remix) の RR8 リファレンス。
  loader, action, middleware, routes.ts、hooks (useLoaderData, useActionData, useFetcher, useNavigate, useNavigation, useParams, useSearchParams)、
  コンポーネント (Form, Link, NavLink, Outlet, Route, Routes, Await)、SSR / SPA / Static、
  ErrorBoundary, redirect, defer, session, matchPath, matchRoutes, type-safe routing。
user-invocable: false
model: sonnet
---

# React Router v8 リファレンス

React Router v8 の全 API ドキュメントを網羅したスキル。Declarative / Data / Framework の3モードを扱うが、`start/` 配下の導入手順は Framework Mode を中心に記述している。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/react-router/
  SKILL.md
  references/
    start/
      README.md
      actions.md
      data-loading.md
      deploying.md
      installation.md
      modes.md
      navigating.md
      pending-ui.md
      rendering.md
      route-module.md
      routing.md
      testing.md
    conventions/
      README.md
      client-modules.md
      entry-client-tsx.md
      entry-server-tsx.md
      react-router-config-ts.md
      root-tsx.md
      routes-ts.md
      server-modules.md
    routers/
      README.md
      HydratedRouter.md
      ServerRouter.md
    hooks/
      README.md
      useActionData.md
      useAsyncError.md
      useAsyncValue.md
      useBeforeUnload.md
      useBlocker.md
      useFetcher.md
      useFetchers.md
      useFormAction.md
      useHref.md
      useInRouterContext.md
      useLinkClickHandler.md
      useLoaderData.md
      useLocation.md
      useMatch.md
      useMatches.md
      useNavigate.md
      useNavigation.md
      useNavigationType.md
      useOutlet.md
      useOutletContext.md
      useParams.md
      usePrompt.md
      useResolvedPath.md
      useRevalidator.md
      useRouteError.md
      useRouteLoaderData.md
      useRouterState.md
      useRoutes.md
      useSearchParams.md
      useSubmit.md
      useViewTransitionState.md
    components/
      README.md
      Await.md
      Form.md
      Link.md
      Links.md
      Meta.md
      Navigate.md
      NavLink.md
      Outlet.md
      PrefetchPageLinks.md
      Route.md
      Routes.md
      ScrollRestoration.md
      Scripts.md
    utils/
      README.md
      createContext.md
      createCookie.md
      createCookieSessionStorage.md
      createMemorySessionStorage.md
      createPath.md
      createRoutesFromElements.md
      createRoutesStub.md
      createSearchParams.md
      data.md
      generatePath.md
      href.md
      IsCookieFunction.md
      IsSessionFunction.md
      isCookie.md
      isRouteErrorResponse.md
      isSession.md
      matchPath.md
      matchRoutes.md
      parsePath.md
      redirect.md
      redirectDocument.md
      renderMatches.md
      replace.md
      resolvePath.md
      RouterContextProvider.md
      sessions-and-cookies.md
    how-to/
      README.md
      accessibility.md
      client-data.md
      data-strategy.md
      error-boundary.md
      error-reporting.md
      fetchers.md
      file-route-conventions.md
      file-uploads.md
      form-validation.md
      headers.md
      instrumentation.md
      middleware.md
      navigation-blocking.md
      pre-rendering.md
      presets.md
      react-server-components.md
      resource-routes.md
      route-module-type-safety.md
      security.md
      server-bundles.md
      spa.md
      status.md
      suspense.md
      using-handle.md
      view-transitions.md
    explanation/
      README.md
      backend-for-frontend.md
      code-splitting.md
      concurrency.md
      form-vs-fetcher.md
      hot-module-replacement.md
      index-query-param.md
      lazy-route-discovery.md
      progressive-enhancement.md
      race-conditions.md
      react-transitions.md
      sessions-and-cookies.md
      state-management.md
      styling.md
      type-safety.md
    cli/
      README.md
      adapter.md
      dev.md
      serve.md
  samples/
    README.md
    basic-routing.md
    data-loading.md
    error-boundary.md
    form-action.md
    form-validation.md
    middleware-auth.md
    navigation-blocking.md
    pending-ui.md
    pre-rendering.md
    search-params.md
    session-auth.md
  scripts/
    README.md
    build.md
    cli.md
    install.md
    typegen.md
    upgrade.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| プロジェクトのセットアップ・インストール | start | [references/start/README.md](references/start/README.md) |
| Declarative / Data / Framework モードの選択 | start | [references/start/README.md](references/start/README.md) |
| ルーティング設定・データ読み込み・アクション・デプロイ | start | [references/start/README.md](references/start/README.md) |
| ルートモジュール・レンダリング戦略・テスト | start | [references/start/README.md](references/start/README.md) |
| root.tsx / routes.ts / react-router.config.ts の設定 | conventions | [references/conventions/README.md](references/conventions/README.md) |
| entry.client.tsx / entry.server.tsx / client・server モジュール分離 | conventions | [references/conventions/README.md](references/conventions/README.md) |
| HydratedRouter / ServerRouter の使い方 | routers | [references/routers/README.md](references/routers/README.md) |
| useLoaderData / useActionData / useFetcher 等のフック | hooks | [references/hooks/README.md](references/hooks/README.md) |
| useNavigate / useNavigation / useParams / useSearchParams 等 | hooks | [references/hooks/README.md](references/hooks/README.md) |
| useBlocker / useRevalidator / useRouteError 等 | hooks | [references/hooks/README.md](references/hooks/README.md) |
| useRoutes / useOutlet / useResolvedPath 等 Declarative・Data Mode 向けフック | hooks | [references/hooks/README.md](references/hooks/README.md) |
| Form / Link / NavLink / Outlet / Await 等のコンポーネント | components | [references/components/README.md](references/components/README.md) |
| Links / Meta / Scripts / ScrollRestoration / PrefetchPageLinks | components | [references/components/README.md](references/components/README.md) |
| Route / Routes（Declarative・Data Mode のルート定義コンポーネント） | components | [references/components/README.md](references/components/README.md) |
| redirect / data / createCookie / セッション管理 API | utils | [references/utils/README.md](references/utils/README.md) |
| generatePath / href / isRouteErrorResponse / createRoutesStub | utils | [references/utils/README.md](references/utils/README.md) |
| matchPath / matchRoutes / resolvePath / createPath / parsePath 等のパス操作 | utils | [references/utils/README.md](references/utils/README.md) |
| createRoutesFromElements / createSearchParams / RouterContextProvider | utils | [references/utils/README.md](references/utils/README.md) |
| ミドルウェア・ファイルアップロード・SPA モード・プリレンダリング | how-to | [references/how-to/README.md](references/how-to/README.md) |
| フォームバリデーション・エラーバウンダリ・セキュリティ | how-to | [references/how-to/README.md](references/how-to/README.md) |
| RSC・サーバーバンドル・リソースルート・型安全性 | how-to | [references/how-to/README.md](references/how-to/README.md) |
| data strategy（loader/action 実行制御のカスタマイズ） | how-to | [references/how-to/README.md](references/how-to/README.md) |
| コード分割・状態管理・BFF・プログレッシブエンハンスメント等の概念 | explanation | [references/explanation/README.md](references/explanation/README.md) |
| HMR・レースコンディション・並行処理・型安全性の仕組み | explanation | [references/explanation/README.md](references/explanation/README.md) |
| セッション・クッキーの概念的な仕組み（API は utils 参照） | explanation | [references/explanation/README.md](references/explanation/README.md) |
| スタイリング方針（Vite ベース） | explanation | [references/explanation/README.md](references/explanation/README.md) |
| dev / serve / adapter 等の CLI コマンド | cli | [references/cli/README.md](references/cli/README.md) |
| 典型的な使い方・実装パターンを確認したい | samples | [samples/README.md](samples/README.md) |
| インストール・ビルド・型生成のコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
| v7 から v8 へのアップグレード手順 | scripts | [scripts/README.md](scripts/README.md) |
