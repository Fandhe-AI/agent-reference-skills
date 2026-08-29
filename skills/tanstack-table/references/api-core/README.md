# api-core

TanStack Table (ヘッドレス、JSX を生成しない) のコア API。`ark-ui` / `chakra-ui` / Android Compose / WinUI の `Table` `Column` `Row` `Cell` とは別物。

| Name | Description | Path |
|------|-------------|------|
| Table | The composed table object type (core + enabled features) | [table.md](./table.md) |
| TableOptions | Complete table options for a specific feature set | [table-options.md](./table-options.md) |
| TableState | Complete table state for a specific feature set | [table-state.md](./table-state.md) |
| TableMeta | Extensible interface for custom table metadata | [table-meta.md](./table-meta.md) |
| TableFeature | Lifecycle hooks/defaults contributed by a feature | [table-feature.md](./table-feature.md) |
| constructTable | Constructs a table instance from options | [construct-table.md](./construct-table.md) |
| tableOptions | Type-inference helper for reusable partial options | [table-options-helper.md](./table-options-helper.md) |
| tableFeatures | Helper to define/compose the features used by a table | [table-features-fn.md](./table-features-fn.md) |
| getInitialTableState | Builds initial state from registered features | [get-initial-table-state.md](./get-initial-table-state.md) |
| Column | The composed column object type | [column.md](./column.md) |
| ColumnDef | Union of display/group/accessor column definitions | [column-def.md](./column-def.md) |
| ColumnHelper | Interface returned by createColumnHelper | [column-helper.md](./column-helper.md) |
| ColumnMeta | Extensible interface for custom column metadata | [column-meta.md](./column-meta.md) |
| createColumnHelper | Creates helpers for authoring column definitions | [create-column-helper.md](./create-column-helper.md) |
| constructColumn | Constructs a column instance | [construct-column.md](./construct-column.md) |
| Row | The composed row object type | [row.md](./row.md) |
| RowModel | Output shape of a row-model factory | [row-model.md](./row-model.md) |
| constructRow | Constructs a row instance | [construct-row.md](./construct-row.md) |
| createCoreRowModel | Core (baseline) row model factory | [create-core-row-model.md](./create-core-row-model.md) |
| createFilteredRowModel | Filtered row model factory | [create-filtered-row-model.md](./create-filtered-row-model.md) |
| createSortedRowModel | Sorted row model factory | [create-sorted-row-model.md](./create-sorted-row-model.md) |
| createGroupedRowModel | Grouped row model factory | [create-grouped-row-model.md](./create-grouped-row-model.md) |
| createExpandedRowModel | Expanded row model factory | [create-expanded-row-model.md](./create-expanded-row-model.md) |
| createPaginatedRowModel | Paginated row model factory | [create-paginated-row-model.md](./create-paginated-row-model.md) |
| createFacetedRowModel | Faceted row model factory | [create-faceted-row-model.md](./create-faceted-row-model.md) |
| createFacetedMinMaxValues | Faceted min/max values helper | [create-faceted-min-max-values.md](./create-faceted-min-max-values.md) |
| createFacetedUniqueValues | Faceted unique values helper | [create-faceted-unique-values.md](./create-faceted-unique-values.md) |
| Cell | The composed cell object type | [cell.md](./cell.md) |
| CellContext | Context passed to a cell's render function | [cell-context.md](./cell-context.md) |
| constructCell | Constructs a cell instance | [construct-cell.md](./construct-cell.md) |
| Header | The composed header object type | [header.md](./header.md) |
| HeaderGroup | A row of headers at a given depth | [header-group.md](./header-group.md) |
| HeaderContext | Context passed to a header's render function | [header-context.md](./header-context.md) |
| constructHeader | Constructs a header instance | [construct-header.md](./construct-header.md) |
| buildHeaderGroups | Builds the nested header group structure | [build-header-groups.md](./build-header-groups.md) |
| stockFeatures | The complete set of stock optional features | [stock-features.md](./stock-features.md) |
| coreFeatures | The core feature set required by every table | [core-features.md](./core-features.md) |
| Static Functions | Name inventory of the ~270 per-object feature functions (table_*/column_*/row_*/cell_*/header_*) | [static-functions.md](./static-functions.md) |
| useTable | v9 React adapter hook; creates a table instance backed by TanStack Store atoms | [use-table.md](./use-table.md) |
| flexRender / FlexRender | JSX-safe cell/header/footer rendering (function + component) | [flex-render.md](./flex-render.md) |
| @tanstack/react-table Exports | Export inventory of the React adapter package (index + legacy trees) | [react-table-package.md](./react-table-package.md) |
