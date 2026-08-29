# samples

`ark-ui` / `chakra-ui` のスタイル付き Table とは別物（ヘッドレス）の実例。

| Name | Description | Path |
| --- | --- | --- |
| Basic Table | Render a minimal headless table with `useTable`, `tableFeatures`, and `table.FlexRender` | [basic-table.md](./basic-table.md) |
| Sorting | Toggle single/multi-column client-side sorting via `rowSortingFeature` | [sorting.md](./sorting.md) |
| Column Filtering | Filter rows by a single column's value with a registered `filterFn` | [column-filtering.md](./column-filtering.md) |
| Global Filtering (with fuzzy search) | Search-box filtering across all columns, optionally fuzzy via `match-sorter-utils` | [global-filtering.md](./global-filtering.md) |
| Pagination | Client-side page navigation with `pageIndex`/`pageSize` state | [pagination.md](./pagination.md) |
| Row Selection | Checkbox-based row selection keyed by a stable row id | [row-selection.md](./row-selection.md) |
| Expanding Sub-Rows | Expand/collapse hierarchical child rows via `getSubRows` | [expanding-subrows.md](./expanding-subrows.md) |
| Grouping with Aggregation | Group rows by column value and compute per-group aggregate totals | [grouping-aggregation.md](./grouping-aggregation.md) |
| Column Resizing | Drag-to-resize column headers built on column sizing | [column-resizing.md](./column-resizing.md) |
| Column Pinning | Pin columns to the `start`/`end` region so they stay visible | [column-pinning.md](./column-pinning.md) |
| Column Visibility & Ordering | Toggle columns hidden/shown and reorder them via `columnOrder` | [column-visibility-ordering.md](./column-visibility-ordering.md) |
| Virtualized Rows (with TanStack Virtual) | Render only the visible row slice using `@tanstack/react-virtual` | [virtualized-rows.md](./virtualized-rows.md) |
| Editable Cells | Push per-cell edits back through `table.options.meta` | [editable-cells.md](./editable-cells.md) |
| Server-Side Pagination & Sorting | Delegate pagination/sorting to the backend via `manualPagination`/`manualSorting` | [server-side.md](./server-side.md) |
| Legacy v8-Style Table (Migration Reference) | v8 pattern via `useLegacyTable`, contrasted against the current v9 API | [legacy-v8-basic.md](./legacy-v8-basic.md) |
