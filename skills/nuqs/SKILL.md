---
name: nuqs
description: >
  nuqs (Type-safe URL search params 状態管理, React / Next.js) リファレンス。
  useQueryState, useQueryStates, parseAsString / parseAsInteger / parseAsArrayOf 等 parsers、
  NuqsAdapter (Next.js / React Router / TanStack Router / Remix)、createSerializer、
  createStandardSchemaV1, inferParserType、shallow routing、history 制御、SSR、
  URL 長さ制限 (limits)、Zod / Effect / Sury 連携。
user-invocable: false
model: sonnet
---

# nuqs API リファレンス

nuqs — Type-safe URL query state management for React。
`React.useState` のドロップイン置換として URL クエリパラメータと状態を同期する。

対象 nuqs v2.10.2（2026-10-08、GitHub tag v2.10.2、docs 原本 packages/docs/content/docs at that tag）。

## ディレクトリ構成

```text
skills/nuqs/
  SKILL.md
  references/
    hooks/
      README.md
      useQueryState.md
      useQueryStates.md
    parsers/
      README.md
      built-in.md
      custom.md
      community-zod-codecs.md
      community-effect-schema.md
      community-sury.md
      community-tanstack-table.md
    adapters/
      README.md
      adapters.md
    guides/
      README.md
      troubleshooting.md
      seo.md
      tips-tricks.md
    options/
      README.md
      options.md
    server/
      README.md
      server-side.md
    utilities/
      README.md
      createSerializer.md
      createStandardSchemaV1.md
      inferParserType.md
    limits/
      README.md
      limits.md
  samples/
    README.md
    basic-query-state.md
    typed-state-with-parsers.md
    multiple-params-batch-update.md
    search-filter-debounce.md
    server-side-parsing.md
    search-params-cache.md
    adapter-setup.md
    custom-parser.md
    url-key-remapping.md
    array-params.md
    testing.md
    suspense-boundary.md
    seo-canonical-url.md
  scripts/
    README.md
    install.md
    setup.md
    testing.md
    debug.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| useQueryState の基本的な使い方、単一パラメータの読み書き | hooks | [references/hooks/README.md](references/hooks/README.md) |
| useQueryStates でバッチ更新、複数パラメータの同期 | hooks | [references/hooks/README.md](references/hooks/README.md) |
| ビルトインパーサー（parseAsString / parseAsInteger / parseAsBoolean / parseAsArrayOf 等）の使い方 | parsers | [references/parsers/README.md](references/parsers/README.md) |
| createParser でカスタムパーサーを作成する、Zod codecs / Effect Schema / Sury / TanStack Table コミュニティパーサー | parsers | [references/parsers/README.md](references/parsers/README.md) |
| フレームワーク別 NuqsAdapter（Next.js app/pages/unified、React SPA、Remix、React Router v6/v7/v8、TanStack Router）、serverSearch、非推奨 adapter | adapters | [references/adapters/README.md](references/adapters/README.md) |
| Suspense boundary エラー、同一 key の異なるパーサー、Pages Router SSR の null、canonical URL / SEO、カスタムフック再利用 | guides | [references/guides/README.md](references/guides/README.md) |
| history, shallow, scroll, throttle, debounce, clearOnDefault, startTransition オプション設定 | options | [references/options/README.md](references/options/README.md) |
| createLoader, createSearchParamsCache でサーバーサイド解析 | server | [references/server/README.md](references/server/README.md) |
| createSerializer, createStandardSchemaV1, inferParserType でパーサーからユーティリティを生成する | utilities | [references/utilities/README.md](references/utilities/README.md) |
| URL 長さ・ブラウザ制限（throttling, max URL length）を知りたい | limits | [references/limits/README.md](references/limits/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・テスト・デバッグ手順を知りたい | scripts | [scripts/README.md](scripts/README.md) |
