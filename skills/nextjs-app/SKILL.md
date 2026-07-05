---
name: nextjs-app
description: >
  Next.js App Router 専用 API リファレンス（Pages Router / getStaticProps 等は非対応）。
  Server Components, Server Actions, layout/page/loading/error ファイル規約,
  dynamic routes, parallel/intercepting routes, Metadata API (generateMetadata),
  use cache, revalidatePath/revalidateTag, next/image・next/font・next/link,
  cookies/headers, useRouter, next.config.js, proxy（旧 middleware）。
  プラットフォーム実行基盤・CDN・ISR インフラは vercel スキル参照。
user-invocable: false
---

## 対象範囲

本スキルは Next.js の **App Router（`app/` ディレクトリ）専用**のリファレンスである。
Pages Router（`pages/` ディレクトリ、`getStaticProps` / `getServerSideProps` / `getInitialProps` 等）は対象外。
Pages Router からの移行手順のみ `references/guides/app-router-migration.md` に含む。

プラットフォームの実行挙動（Vercel の CDN・ISR インフラ・Edge 実行環境・デプロイ設定）は `vercel` スキルが担当する。
本スキルは「App Router でどう書くか（API 仕様・ファイル規約）」に徹する。

## ディレクトリ構成

```text
skills/nextjs-app/
  SKILL.md
  references/
    getting-started/
      README.md
      installation.md
      project-structure.md
      layouts-and-pages.md
      linking-and-navigating.md
      server-and-client-components.md
      fetching-data.md
      mutating-data.md
      caching.md
      revalidating.md
      error-handling.md
      css.md
      images.md
      fonts.md
      metadata-and-og-images.md
      route-handlers.md
      proxy.md
      deploying.md
      upgrading.md
    guides/
      README.md
      analytics.md
      app-router-migration.md
      authentication.md
      backend-for-frontend.md
      caching-without-cache-components.md
      ci-build-caching.md
      codemods.md
      content-security-policy.md
      css-in-js.md
      custom-server.md
      cypress.md
      debugging.md
      draft-mode.md
      environment-variables.md
      forms.md
      from-create-react-app.md
      from-vite.md
      incremental-static-regeneration.md
      instrumentation.md
      internationalization.md
      jest.md
      json-ld.md
      lazy-loading.md
      local-development.md
      mdx.md
      memory-usage.md
      multi-tenant.md
      multi-zones.md
      open-telemetry.md
      package-bundling.md
      playwright.md
      ppr-platform-guide.md
      prefetching.md
      production-checklist.md
      progressive-web-apps.md
      redirecting.md
      sass.md
      scripts.md
      self-hosting.md
      server-actions.md
      single-page-applications.md
      static-exports.md
      streaming.md
      tailwind-v3-css.md
      testing.md
      third-party-libraries.md
      version-14.md
      version-15.md
      version-16.md
      videos.md
      vitest.md
    api-reference/
      functions/
        README.md
        after.md
        cacheLife.md
        cacheTag.md
        unstable_catchError.md
        connection.md
        cookies.md
        draftMode.md
        fetch.md
        forbidden.md
        generateImageMetadata.md
        generateMetadata.md
        generateSitemaps.md
        generateStaticParams.md
        generateViewport.md
        headers.md
        ImageResponse.md
        NextRequest.md
        NextResponse.md
        not-found.md
        permanentRedirect.md
        redirect.md
        refresh.md
        revalidatePath.md
        revalidateTag.md
        unauthorized.md
        unstable_cache.md
        unstable_noStore.md
        unstable_rethrow.md
        updateTag.md
        useLinkStatus.md
        use-params.md
        usePathname.md
        useReportWebVitals.md
        useRouter.md
        use-search-params.md
        use-selected-layout-segment.md
        use-selected-layout-segments.md
        userAgent.md
      file-conventions/
        README.md
        default.md
        dynamic-routes.md
        error.md
        forbidden.md
        instrumentation.md
        instrumentation-client.md
        intercepting-routes.md
        layout.md
        loading.md
        mdx-components.md
        not-found.md
        page.md
        parallel-routes.md
        proxy.md
        public-folder.md
        route.md
        route-groups.md
        src-folder.md
        template.md
        unauthorized.md
        metadata.md
        metadata/
          README.md
          app-icons.md
          manifest.md
          opengraph-image.md
          robots.md
          sitemap.md
        route-segment-config.md
        route-segment-config/
          README.md
          dynamicParams.md
          maxDuration.md
          preferredRegion.md
          runtime.md
      components/
        README.md
        font.md
        form.md
        image.md
        link.md
        script.md
      directives/
        README.md
        use-cache.md
        use-cache-private.md
        use-cache-remote.md
        use-client.md
        use-server.md
      config/
        README.md
        overview.md
        images.md
        headers-redirects-rewrites.md
        routing.md
        build-output.md
        caching.md
        bundling.md
        react-experimental.md
        dev-environment.md
        deployment.md
        env-and-checks.md
        typescript.md
        eslint.md
        create-next-app.md
        next-cli.md
      misc/
        README.md
        adapters.md
        adapters-configuration.md
        adapters-creating-an-adapter.md
        adapters-api-reference.md
        adapters-testing-adapters.md
        adapters-routing-with-next-routing.md
        adapters-implementing-ppr-in-an-adapter.md
        adapters-runtime-integration.md
        adapters-invoking-entrypoints.md
        adapters-output-types.md
        adapters-routing-information.md
        adapters-use-cases.md
        edge-runtime.md
        turbopack.md
  samples/
    README.md
    server-component-data-fetching.md
    server-actions-form.md
    dynamic-route-static-params.md
    route-file-conventions.md
    route-handler-get-post.md
    metadata-and-og-image.md
    on-demand-revalidation.md
    streaming-with-suspense.md
    parallel-intercepting-routes-modal.md
  scripts/
    README.md
    install.md
    cli.md
    codemod.md
    telemetry.md
    info.md
    bundle-analyzer.md
    env.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. まず対象が **App Router** の話題か確認する（Pages Router の API は本スキル対象外）
2. 下記マッピング表でタスクに対応するカテゴリを探す
3. そのカテゴリの README.md（`references/{category}/README.md` または `samples/README.md` / `scripts/README.md`）を参照して目的のページを特定する
4. 該当ページの `.md` を Read して詳細を確認する
5. デプロイ先の CDN 挙動・ISR インフラ・Edge 実行環境など**プラットフォーム側の話題**は `vercel` スキルを参照する

## タスク → カテゴリ マッピング

### 基本概念・セットアップ

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| プロジェクトを新規作成したい、フォルダ構成を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| ページ・レイアウトの作り方、Server/Client Components の使い分けを知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| データ取得・データ更新（Server Actions）の基本を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| CSS・画像・フォント最適化、metadata の基本を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |

### 機能別ガイド・運用

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Server Actions でフォームを実装したい、認証・国際化を実装したい | guides | [references/guides/README.md](references/guides/README.md) |
| ISR・Draft Mode・ストリーミング・PPR を使いたい | guides | [references/guides/README.md](references/guides/README.md) |
| Jest/Vitest/Playwright/Cypress でテストしたい | guides | [references/guides/README.md](references/guides/README.md) |
| Pages Router / CRA / Vite からの移行、バージョンアップ手順を知りたい | guides | [references/guides/README.md](references/guides/README.md) |
| マルチテナント・マルチゾーン構成、本番前チェックリストを確認したい | guides | [references/guides/README.md](references/guides/README.md) |

### 関数 API

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| `cookies` / `headers` / `redirect` / `notFound` の使い方を知りたい | api-reference/functions | [references/api-reference/functions/README.md](references/api-reference/functions/README.md) |
| `revalidatePath` / `revalidateTag` / `unstable_cache` でキャッシュ制御したい | api-reference/functions | [references/api-reference/functions/README.md](references/api-reference/functions/README.md) |
| `generateMetadata` / `generateStaticParams` / `generateViewport` を書きたい | api-reference/functions | [references/api-reference/functions/README.md](references/api-reference/functions/README.md) |
| `useRouter` / `usePathname` / `useSearchParams` / `useParams` を使いたい | api-reference/functions | [references/api-reference/functions/README.md](references/api-reference/functions/README.md) |

### ファイル規約

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| `layout` / `page` / `loading` / `error` / `template` / `default` の役割を知りたい | api-reference/file-conventions | [references/api-reference/file-conventions/README.md](references/api-reference/file-conventions/README.md) |
| Dynamic Routes / Route Groups / Parallel Routes / Intercepting Routes を実装したい | api-reference/file-conventions | [references/api-reference/file-conventions/README.md](references/api-reference/file-conventions/README.md) |
| `route.ts` でカスタム API エンドポイントを作りたい | api-reference/file-conventions | [references/api-reference/file-conventions/README.md](references/api-reference/file-conventions/README.md) |
| favicon/manifest/robots/sitemap/OG 画像のファイル規約を知りたい | api-reference/file-conventions | [references/api-reference/file-conventions/metadata/README.md](references/api-reference/file-conventions/metadata/README.md) |
| `dynamicParams` / `runtime` / `preferredRegion` / `maxDuration` を設定したい | api-reference/file-conventions | [references/api-reference/file-conventions/route-segment-config/README.md](references/api-reference/file-conventions/route-segment-config/README.md) |

### 組み込みコンポーネント・ディレクティブ

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| `next/image` / `next/font` / `next/link` / `Form` / `next/script` を使いたい | api-reference/components | [references/api-reference/components/README.md](references/api-reference/components/README.md) |
| `use client` / `use server` / `use cache` の使い分けを知りたい | api-reference/directives | [references/api-reference/directives/README.md](references/api-reference/directives/README.md) |

### 設定・ツール

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| `next.config.js` のオプション（images, headers/redirects/rewrites, routing, caching 等）を調べたい | api-reference/config | [references/api-reference/config/README.md](references/api-reference/config/README.md) |
| TypeScript / ESLint 設定、`create-next-app` / `next` CLI を使いたい | api-reference/config | [references/api-reference/config/README.md](references/api-reference/config/README.md) |
| デプロイアダプター（adapters）を作成・設定したい | api-reference/misc | [references/api-reference/misc/README.md](references/api-reference/misc/README.md) |
| Edge Runtime の制約、Turbopack の設定を知りたい | api-reference/misc | [references/api-reference/misc/README.md](references/api-reference/misc/README.md) |

### 実例・コマンド

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| 典型的な使い方を知りたい（データ取得、Server Actions フォーム、Route Handler、metadata、モーダル等） | samples | [samples/README.md](samples/README.md) |
| インストール・CLI・codemod・テレメトリ・バンドル解析コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |

### 補足

| タスク | 参照先 |
| --- | --- |
| Vercel の CDN・ISR インフラ・Edge 実行環境・デプロイ設定を知りたい | `vercel` スキル |
