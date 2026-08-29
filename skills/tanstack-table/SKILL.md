---
name: tanstack-table
description: >
  TanStack Table (React Table) v9 ヘッドレステーブル (@tanstack/react-table) の API リファレンス。
  ark-ui / chakra-ui のスタイル付き Table とは別。
  useTable, tableFeatures, createColumnHelper, flexRender, createCoreRowModel,
  sorting, column / global / fuzzy filtering, faceting, pagination, row selection, expanding,
  grouping / aggregation, column / row の ordering・pinning・sizing・visibility, virtualization。
  v8 legacy (useReactTable / getCoreRowModel) と v9 移行。
user-invocable: false
---

# TanStack Table リファレンス

TanStack Table (`@tanstack/react-table`) v9 の公式ドキュメントを蒸留したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/tanstack-table/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      installation.md
      quick-start.md
      migrating-to-v9.md
      use-legacy-table.md
      devtools.md
      agent-skills.md
    core-guides/
      README.md
      features.md
      data.md
      client-side-vs-server-side.md
      column-defs.md
      tables.md
      row-models.md
      worker-row-models.md
      rows.md
      cells.md
      header-groups.md
      headers.md
      columns.md
      table-and-column-meta.md
      helpers.md
    feature-guides/
      README.md
      cell-selection.md
      cell-spanning.md
      column-ordering.md
      column-pinning.md
      column-sizing.md
      column-resizing.md
      column-visibility.md
      column-filtering.md
      global-filtering.md
      fuzzy-filtering.md
      column-faceting.md
      aggregation.md
      grouping.md
      expanding.md
      pagination.md
      row-pinning.md
      row-selection.md
      sorting.md
      virtualization.md
    api-core/
      README.md
      table.md
      table-options.md
      table-state.md
      table-meta.md
      table-feature.md
      construct-table.md
      table-options-helper.md
      table-features-fn.md
      get-initial-table-state.md
      column.md
      column-def.md
      column-helper.md
      column-meta.md
      create-column-helper.md
      construct-column.md
      row.md
      row-model.md
      construct-row.md
      create-core-row-model.md
      create-filtered-row-model.md
      create-sorted-row-model.md
      create-grouped-row-model.md
      create-expanded-row-model.md
      create-paginated-row-model.md
      create-faceted-row-model.md
      create-faceted-min-max-values.md
      create-faceted-unique-values.md
      cell.md
      cell-context.md
      construct-cell.md
      header.md
      header-group.md
      header-context.md
      construct-header.md
      build-header-groups.md
      stock-features.md
      core-features.md
      static-functions.md
      use-table.md
      flex-render.md
      react-table-package.md
    api-features/
      README.md
      cell-selection.md
      cell-spanning.md
      column-faceting.md
      column-filtering.md
      column-grouping.md
      column-ordering.md
      column-pinning.md
      column-resizing.md
      column-sizing.md
      column-visibility.md
      global-filtering.md
      row-aggregation.md
      row-expanding.md
      row-pagination.md
      row-pinning.md
      row-selection.md
      row-sorting.md
    legacy-v8/
      README.md
      useReactTable.md
      flexRender.md
      useLegacyTable.md
      legacyCreateColumnHelper.md
      getCoreRowModel.md
      getFilteredRowModel.md
      getSortedRowModel.md
      getGroupedRowModel.md
      getExpandedRowModel.md
      getPaginationRowModel.md
      getFacetedRowModel.md
      getFacetedMinMaxValues.md
      getFacetedUniqueValues.md
      LegacyRowModelOptions.md
      LegacyTable.md
      LegacyTableOptions.md
      LegacyReactTable.md
      LegacyColumnDef.md
      LegacyFeatures.md
      LegacyCell.md
      LegacyColumn.md
      LegacyRow.md
      LegacyHeader.md
      LegacyHeaderGroup.md
      RowModelFactory.md
      FacetedRowModelFactory.md
      FacetedMinMaxValuesFactory.md
      FacetedUniqueValuesFactory.md
  samples/
    README.md
    basic-table.md
    sorting.md
    column-filtering.md
    global-filtering.md
    pagination.md
    row-selection.md
    expanding-subrows.md
    grouping-aggregation.md
    column-resizing.md
    column-pinning.md
    column-visibility-ordering.md
    virtualized-rows.md
    editable-cells.md
    server-side.md
    legacy-v8-basic.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. まず v8 か v9 かを判別する。`useReactTable` / `get*RowModel`（`getCoreRowModel` 等）が出てくる、または v8 (`@tanstack/react-table@8`) からの移行作業なら `references/legacy-v8/`。`useTable` / `tableFeatures` / `*Feature`（`rowSortingFeature` 等）が出てくるなら v9（`api-core` / `api-features` / `feature-guides`）
2. 下記マッピング表でタスクに対応するカテゴリを探す
3. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
4. 該当ページの `.md` を Read して詳細を確認する

`feature-guides` と `api-features` はファイル名が重複する（`column-filtering.md` 等）。`feature-guides` は機能の挙動・使い分けの解説、`api-features` は feature 単位の options / state / APIs（`*Feature` 名の実体）を扱う。同様に `api-core` の `create*RowModel` / `flex-render.md`（v9）と `legacy-v8` の `get*RowModel` / `flexRender.md`（v8）も対になる名前だが別 API。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| 導入・インストール・Quick Start・Devtools、`@tanstack/intent` Agent Skills を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| v8 → v9 の移行方針、`useLegacyTable` による段階移行を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `data` / 列定義 / row model の仕組み・実行順、client-side と server-side の使い分けを知りたい | core-guides | [references/core-guides/README.md](references/core-guides/README.md) |
| `row` / `cell` / `header` / `column` オブジェクトの読み方、meta・型ヘルパーを知りたい | core-guides | [references/core-guides/README.md](references/core-guides/README.md) |
| sorting / filtering（column・global・fuzzy）/ faceting / pagination の挙動・使い分けを知りたい | feature-guides | [references/feature-guides/README.md](references/feature-guides/README.md) |
| row selection / expanding / grouping・aggregation / column ordering・pinning・sizing・resizing・visibility / row pinning / virtualization の挙動を知りたい | feature-guides | [references/feature-guides/README.md](references/feature-guides/README.md) |
| `Table` / `Column` / `Row` / `Cell` / `Header` 型、`constructTable` 等の構築関数を知りたい | api-core | [references/api-core/README.md](references/api-core/README.md) |
| `createColumnHelper` / `createCoreRowModel` 系 row model factory を知りたい | api-core | [references/api-core/README.md](references/api-core/README.md) |
| React アダプター（`useTable` / `flexRender` / `@tanstack/react-table` のエクスポート一覧）を知りたい | api-core | [references/api-core/README.md](references/api-core/README.md) |
| `columnFilteringFeature` / `columnPinningFeature` / `columnSizingFeature` 等 column 系 feature の options / state / APIs を知りたい | api-features | [references/api-features/README.md](references/api-features/README.md) |
| `rowSortingFeature` / `rowSelectionFeature` / `rowPaginationFeature` / `cellSelectionFeature` 等 row・cell 系 feature の options / state / APIs を知りたい | api-features | [references/api-features/README.md](references/api-features/README.md) |
| v8 の `useReactTable` / `flexRender` / `get*RowModel` / `legacyCreateColumnHelper` の API を知りたい | legacy-v8 | [references/legacy-v8/README.md](references/legacy-v8/README.md) |
| `LegacyTable` / `LegacyTableOptions` / `LegacyColumnDef` / `LegacyFeatures` 等の v8 互換型、`RowModelFactory` 系の型を知りたい | legacy-v8 | [references/legacy-v8/README.md](references/legacy-v8/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| sorting / filtering / pagination / row selection / grouping・aggregation の実装例を知りたい | samples | [samples/README.md](samples/README.md) |
| column resizing / pinning / visibility・ordering / virtualization / editable cells / server-side の実装例を知りたい | samples | [samples/README.md](samples/README.md) |
| v8 スタイルとの対比実装例を知りたい | samples | [samples/README.md](samples/README.md) |
