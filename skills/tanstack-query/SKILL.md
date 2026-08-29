---
name: tanstack-query
description: >
  TanStack Query (React Query) v5 (@tanstack/react-query) の API リファレンス。
  useQuery, useQueries, useInfiniteQuery, useMutation, useSuspenseQuery,
  QueryClient, QueryClientProvider, queryOptions, HydrationBoundary,
  invalidateQueries, prefetchQuery, staleTime, gcTime, placeholderData,
  optimistic updates, SSR / hydration, persistQueryClient, eslint-plugin-query。
  kubb（フック生成側）とは別。
user-invocable: false
---

# TanStack Query リファレンス

TanStack Query (`@tanstack/react-query`) v5 の公式ドキュメントを蒸留したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/tanstack-query/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      installation.md
      quick-start.md
      devtools.md
      typescript.md
      graphql.md
      react-native.md
      comparison.md
    guides/
      README.md
      important-defaults.md
      queries.md
      query-keys.md
      query-functions.md
      query-options.md
      network-mode.md
      parallel-queries.md
      dependent-queries.md
      background-fetching-indicators.md
      window-focus-refetching.md
      polling.md
      disabling-queries.md
      query-retries.md
      paginated-queries.md
      infinite-queries.md
      initial-query-data.md
      placeholder-query-data.md
      mutations.md
      query-invalidation.md
      invalidations-from-mutations.md
      updates-from-mutation-responses.md
      optimistic-updates.md
      query-cancellation.md
      scroll-restoration.md
      filters.md
      request-waterfalls.md
      prefetching.md
      ssr.md
      advanced-ssr.md
      caching.md
      render-optimizations.md
      default-query-function.md
      suspense.md
      testing.md
      does-this-replace-client-state.md
      migrating-to-v5.md
      migrating-to-react-query-4.md
      migrating-to-react-query-3.md
    api/
      README.md
      query-client.md
      query-cache.md
      mutation-cache.md
      query-observer.md
      infinite-query-observer.md
      queries-observer.md
      streamed-query.md
      focus-manager.md
      online-manager.md
      notify-manager.md
      environment-manager.md
      timeout-manager.md
      use-query.md
      use-queries.md
      use-infinite-query.md
      use-mutation.md
      use-is-fetching.md
      use-is-mutating.md
      use-mutation-state.md
      use-suspense-query.md
      use-suspense-infinite-query.md
      use-suspense-queries.md
      query-client-provider.md
      use-query-client.md
      query-options.md
      infinite-query-options.md
      mutation-options.md
      use-prefetch-query.md
      use-prefetch-infinite-query.md
      query-error-reset-boundary.md
      use-query-error-reset-boundary.md
      hydration.md
    plugins/
      README.md
      eslint-plugin-query.md
      exhaustive-deps.md
      stable-query-client.md
      no-rest-destructuring.md
      no-unstable-deps.md
      infinite-query-property-order.md
      no-void-query-fn.md
      mutation-property-order.md
      prefer-query-options.md
      persist-query-client.md
      create-sync-storage-persister.md
      create-async-storage-persister.md
      broadcast-query-client.md
      create-persister.md
  samples/
    README.md
    basic-query.md
    dependent-queries.md
    pagination.md
    infinite-scroll.md
    mutations-invalidation.md
    optimistic-update.md
    prefetching.md
    ssr-hydration.md
    suspense.md
    offline-persist.md
    testing.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| 導入・インストール・Quick Start・Devtools・TypeScript 設定を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| SWR / Apollo Client / RTK Query との違い、GraphQL / React Native 併用を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| クエリキー設計・並列/依存クエリ・ページネーション・無限スクロールの実装方針を知りたい | guides | [references/guides/README.md](references/guides/README.md) |
| ミューテーション・キャッシュ無効化・楽観的更新・キャンセルの挙動を知りたい | guides | [references/guides/README.md](references/guides/README.md) |
| SSR / hydration・Suspense 統合・テスト方針・v5 移行差分を知りたい | guides | [references/guides/README.md](references/guides/README.md) |
| `useQuery` / `useMutation` / `useInfiniteQuery` 等フックのシグネチャ・オプションを知りたい | api | [references/api/README.md](references/api/README.md) |
| `QueryClient` / `QueryCache` / `QueryObserver` 等コアクラスの API を知りたい | api | [references/api/README.md](references/api/README.md) |
| `queryOptions` / `infiniteQueryOptions` / `mutationOptions` / `hydration` の型・関数を知りたい | api | [references/api/README.md](references/api/README.md) |
| `eslint-plugin-query` の各ルールを知りたい | plugins | [references/plugins/README.md](references/plugins/README.md) |
| `persistQueryClient` / Persister / `broadcastQueryClient` によるキャッシュ永続化を知りたい | plugins | [references/plugins/README.md](references/plugins/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| 楽観的更新のロールバック・SSR での hydration 実装例を知りたい | samples | [samples/README.md](samples/README.md) |
| オフラインキャッシュ永続化・フックのテスト実装例を知りたい | samples | [samples/README.md](samples/README.md) |
