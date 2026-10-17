# samples

`ark-ui` / `chakra-ui` のスタイル付き Table とは別物（ヘッドレス）の実例。

| Name | Description | Path |
|------|-------------|------|
| Dynamic Columns | Derive columns, sort fns and filter fns at runtime from the data keys | [basic-dynamic-columns.md](./basic-dynamic-columns.md) |
| External Atoms (useCreateAtom) | Own individual state slices as external atoms and pass them to the table | [basic-external-atoms.md](./basic-external-atoms.md) |
| External State (React useState) | Own the sorting and pagination state in React `useState` and feed it to the table | [basic-external-state.md](./basic-external-state.md) |
| Fine-grained Subscribe | Use `Subscribe` / `table.Subscribe` to re-render only the parts of the table that need it | [basic-subscribe.md](./basic-subscribe.md) |
| Basic Table | Render a minimal headless table with `useTable` and declared columns | [basic-table.md](./basic-table.md) |
| Basic useAppTable (createTableHook) | Create a reusable table hook factory with `createTableHook` and pre-bound components | [basic-use-app-table.md](./basic-use-app-table.md) |
| Cell Selection | Enable spreadsheet-style cell and range selection | [cell-selection.md](./cell-selection.md) |
| Cell Spanning | Merge adjacent cells vertically (`spanRows`) and horizontally | [cell-spanning.md](./cell-spanning.md) |
| Column Filtering | Filter rows by a single column's value using a registered `filterFn` | [column-filtering.md](./column-filtering.md) |
| Sticky Column Pinning | Pin columns to the start or end with `position: sticky` styles | [column-pinning-sticky.md](./column-pinning-sticky.md) |
| Column Pinning | Pin columns to the `start` or `end` region so they stay visible | [column-pinning.md](./column-pinning.md) |
| Performant Column Resizing | Resize columns with no React re-renders by subscribing to the column sizing state | [column-resizing-performant.md](./column-resizing-performant.md) |
| Column Resizing | Drag-to-resize column headers, built on top of column sizing | [column-resizing.md](./column-resizing.md) |
| Column Visibility & Ordering | Toggle columns hidden/shown and let users reorder them | [column-visibility-ordering.md](./column-visibility-ordering.md) |
| Composable Tables | Share features, row models and pre-bound table / cell / header components | [composable-tables.md](./composable-tables.md) |
| Custom Plugin (Feature) | Define a custom table feature (state, options, APIs) | [custom-plugin.md](./custom-plugin.md) |
| Editable Cells | Render an `<input>` per cell and push edits back to the data | [editable-cells.md](./editable-cells.md) |
| Expanding Sub-Rows | Expand/collapse hierarchical child rows (`row.subRows`) | [expanding-subrows.md](./expanding-subrows.md) |
| Faceted Filters | Drive per-column filter UIs (range, select, autocomplete) from facet values | [filters-faceted.md](./filters-faceted.md) |
| Global Filtering (with fuzzy search) | Wire a single search box across all columns, optionally using a fuzzy filter function | [global-filtering.md](./global-filtering.md) |
| Grouping with Aggregation | Group rows by a column's value and compute per-group aggregate values | [grouping-aggregation.md](./grouping-aggregation.md) |
| Header Groups | Group columns under shared headers with `columnHelper.group` | [header-groups.md](./header-groups.md) |
| Legacy v8-Style Table (Migration Reference) | **v8 pattern, shown only for migration contrast** (do not use for new code) | [legacy-v8-basic.md](./legacy-v8-basic.md) |
| Pagination | Client-side page navigation with `pageIndex`/`pageSize` state | [pagination.md](./pagination.md) |
| Row Pinning | Pin rows to the top or bottom of the table with `rowPinningFeature` | [row-pinning.md](./row-pinning.md) |
| Row Selection | Checkbox-based row selection with a "select all" header checkbox | [row-selection.md](./row-selection.md) |
| Server-Side Pagination & Sorting | Delegate pagination and sorting to the backend (e.g. via TanStack Query) | [server-side.md](./server-side.md) |
| Sorting | Toggle single/multi-column client-side sorting | [sorting.md](./sorting.md) |
| Sub Components | Render a custom full-width detail row under an expanded row | [sub-components.md](./sub-components.md) |
| Virtualized Columns (with TanStack Virtual) | Virtualize columns (horizontal, with empty padding cells) | [virtualized-columns.md](./virtualized-columns.md) |
| Virtualized Infinite Scrolling (with TanStack Query and Virtual) | Combine `useInfiniteQuery`, server-side sorting and a row virtualizer | [virtualized-infinite-scrolling.md](./virtualized-infinite-scrolling.md) |
| Virtualized Rows (with TanStack Virtual) | Render only the visible slice of a large row model using TanStack Virtual | [virtualized-rows.md](./virtualized-rows.md) |
| Web Worker Row Models (experimental) | Run the filtered, grouped and sorted row-model stages in a Web Worker | [web-worker-row-models.md](./web-worker-row-models.md) |
| With TanStack Form | Make every cell an editable form field using TanStack Form | [with-tanstack-form.md](./with-tanstack-form.md) |
| With TanStack Query | Drive a table with manual (server-side) sorting and global filtering | [with-tanstack-query.md](./with-tanstack-query.md) |
| With TanStack Router | Keep pagination, sorting and filter state in URL search params using TanStack Router | [with-tanstack-router.md](./with-tanstack-router.md) |
