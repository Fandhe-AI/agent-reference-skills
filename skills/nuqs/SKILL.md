---
name: nuqs
description: >
  nuqs (Type-safe URL search params state manager for React / Next.js) リファレンス。
  useQueryState, useQueryStates, parsers (parseAsString / parseAsInteger / parseAsBoolean / parseAsArrayOf 等)、
  Next.js App Router / Pages Router、SSR、シャロールーティング、history 制御。
user-invocable: false
model: sonnet
---

# nuqs API リファレンス

nuqs — Type-safe URL query state management for React。
`React.useState` のドロップイン置換として URL クエリパラメータと状態を同期する。

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
    options/
      README.md
      options.md
    server/
      README.md
      server-side.md
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
| createParser でカスタムパーサーを作成する | parsers | [references/parsers/README.md](references/parsers/README.md) |
| history, shallow, scroll, throttle, debounce, clearOnDefault, startTransition オプション設定 | options | [references/options/README.md](references/options/README.md) |
| createLoader, createSearchParamsCache でサーバーサイド解析 | server | [references/server/README.md](references/server/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・テスト・デバッグ手順を知りたい | scripts | [scripts/README.md](scripts/README.md) |
