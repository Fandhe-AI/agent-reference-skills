---
name: react-router-v7
description: >
  React Router v7 (Framework Mode、旧 Remix) リファレンス。
  loader, action, middleware, hooks (useLoaderData / useNavigate / useFetcher / useNavigation 等)、
  コンポーネント (Link, NavLink, Form, Outlet)、routes.ts、SSR / SPA / Static、
  ErrorBoundary, session, redirect, defer, type-safe routing。
user-invocable: false
model: sonnet
---

# React Router v7 Framework Mode リファレンス

React Router v7 Framework Mode の全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/react-router-v7/
  SKILL.md
  references/
    start/
      README.md
      actions.md
      data-loading.md
      deploying.md
      installation.md
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
      useLoaderData.md
      useActionData.md
      useNavigation.md
      useNavigate.md
      useFetcher.md
      useFetchers.md
      useParams.md
      useRouteLoaderData.md
      useMatches.md
      useLocation.md
      useSubmit.md
      useRouteError.md
      useRevalidator.md
      useSearchParams.md
      useHref.md
      useBlocker.md
      useBeforeUnload.md
      useAsyncValue.md
      useAsyncError.md
      useOutletContext.md
      useViewTransitionState.md
      useFormAction.md
      useMatch.md
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
      ScrollRestoration.md
      Scripts.md
    utils/
      README.md
      createContext.md
      createCookie.md
      createCookieSessionStorage.md
      createMemorySessionStorage.md
      createRoutesStub.md
      data.md
      generatePath.md
      href.md
      isRouteErrorResponse.md
      redirect.md
      redirectDocument.md
      replace.md
      sessions-and-cookies.md
    how-to/
      README.md
      accessibility.md
      client-data.md
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
      state-management.md
      type-safety.md
    cli/
      README.md
      dev.md
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
| ルーティング設定・データ読み込み・アクション・デプロイ | start | [references/start/README.md](references/start/README.md) |
| ルートモジュール・レンダリング戦略・テスト | start | [references/start/README.md](references/start/README.md) |
| root.tsx / routes.ts / react-router.config.ts の設定 | conventions | [references/conventions/README.md](references/conventions/README.md) |
| entry.client.tsx / entry.server.tsx / client・server モジュール分離 | conventions | [references/conventions/README.md](references/conventions/README.md) |
| HydratedRouter / ServerRouter の使い方 | routers | [references/routers/README.md](references/routers/README.md) |
| useLoaderData / useActionData / useFetcher 等のフック | hooks | [references/hooks/README.md](references/hooks/README.md) |
| useNavigate / useNavigation / useParams / useSearchParams 等 | hooks | [references/hooks/README.md](references/hooks/README.md) |
| useBlocker / useRevalidator / useRouteError 等 | hooks | [references/hooks/README.md](references/hooks/README.md) |
| Form / Link / NavLink / Outlet / Await 等のコンポーネント | components | [references/components/README.md](references/components/README.md) |
| Links / Meta / Scripts / ScrollRestoration / PrefetchPageLinks | components | [references/components/README.md](references/components/README.md) |
| redirect / data / createCookie / セッション管理 | utils | [references/utils/README.md](references/utils/README.md) |
| generatePath / href / isRouteErrorResponse / createRoutesStub | utils | [references/utils/README.md](references/utils/README.md) |
| ミドルウェア・ファイルアップロード・SPA モード・プリレンダリング | how-to | [references/how-to/README.md](references/how-to/README.md) |
| フォームバリデーション・エラーバウンダリ・セキュリティ | how-to | [references/how-to/README.md](references/how-to/README.md) |
| RSC・サーバーバンドル・リソースルート・型安全性 | how-to | [references/how-to/README.md](references/how-to/README.md) |
| コード分割・状態管理・BFF・プログレッシブエンハンスメント等の概念 | explanation | [references/explanation/README.md](references/explanation/README.md) |
| HMR・レースコンディション・並行処理・型安全性の仕組み | explanation | [references/explanation/README.md](references/explanation/README.md) |
| dev / build / typegen 等の CLI コマンド | cli | [references/cli/README.md](references/cli/README.md) |
| 典型的な使い方・実装パターンを確認したい | samples | [samples/README.md](samples/README.md) |
| インストール・ビルド・型生成のコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
