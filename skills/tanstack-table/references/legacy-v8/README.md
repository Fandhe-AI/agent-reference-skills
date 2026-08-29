# legacy-v8

v8 (`@tanstack/react-table@8`) 向けレガシー API。v9 の現行 API は api-core / api-features を参照。

| Name | Description | Path |
| --- | --- | --- |
| useReactTable | v8 React adapter hook; takes `options` and returns a table instance (removed in v9, renamed to `useTable`) | [useReactTable.md](./useReactTable.md) |
| flexRender | Adapter utility for rendering JSX header/cell/footer templates (unchanged in v9) | [flexRender.md](./flexRender.md) |
| useLegacyTable | Deprecated hook providing v8-style backward compatibility; returns a table with full state subscription | [useLegacyTable.md](./useLegacyTable.md) |
| legacyCreateColumnHelper | Column helper with `LegacyFeatures` pre-bound, for use with `useLegacyTable` | [legacyCreateColumnHelper.md](./legacyCreateColumnHelper.md) |
| getCoreRowModel | No-op v8 compatibility stub; core row model is always available in v9 | [getCoreRowModel.md](./getCoreRowModel.md) |
| getFilteredRowModel | v8 compatibility stub enabling the filtered row model | [getFilteredRowModel.md](./getFilteredRowModel.md) |
| getSortedRowModel | v8 compatibility stub enabling the sorted row model | [getSortedRowModel.md](./getSortedRowModel.md) |
| getGroupedRowModel | v8 compatibility stub enabling the grouped row model | [getGroupedRowModel.md](./getGroupedRowModel.md) |
| getExpandedRowModel | v8 compatibility stub enabling the expanded row model | [getExpandedRowModel.md](./getExpandedRowModel.md) |
| getPaginationRowModel | v8 compatibility stub enabling the paginated row model | [getPaginationRowModel.md](./getPaginationRowModel.md) |
| getFacetedRowModel | v8 compatibility stub enabling the faceted row model | [getFacetedRowModel.md](./getFacetedRowModel.md) |
| getFacetedMinMaxValues | v8 compatibility stub enabling faceted min/max values | [getFacetedMinMaxValues.md](./getFacetedMinMaxValues.md) |
| getFacetedUniqueValues | v8 compatibility stub enabling faceted unique values | [getFacetedUniqueValues.md](./getFacetedUniqueValues.md) |
| LegacyRowModelOptions | Legacy v8-style row model options interface consumed by `LegacyTableOptions` | [LegacyRowModelOptions.md](./LegacyRowModelOptions.md) |
| LegacyTable | Table instance type bound to `LegacyFeatures` | [LegacyTable.md](./LegacyTable.md) |
| LegacyTableOptions | Legacy v8-style table options for `useLegacyTable` | [LegacyTableOptions.md](./LegacyTableOptions.md) |
| LegacyReactTable | Legacy table instance type with v8-style `getState()`/`setState()` | [LegacyReactTable.md](./LegacyReactTable.md) |
| LegacyColumnDef | Column definition type bound to `LegacyFeatures` | [LegacyColumnDef.md](./LegacyColumnDef.md) |
| LegacyFeatures | Feature set registered by `useLegacyTable` (v8 string filter/sort/aggregation identifiers) | [LegacyFeatures.md](./LegacyFeatures.md) |
| LegacyCell | Cell instance type bound to `LegacyFeatures` | [LegacyCell.md](./LegacyCell.md) |
| LegacyColumn | Column instance type bound to `LegacyFeatures` | [LegacyColumn.md](./LegacyColumn.md) |
| LegacyRow | Row instance type bound to `LegacyFeatures` | [LegacyRow.md](./LegacyRow.md) |
| LegacyHeader | Header instance type bound to `LegacyFeatures` | [LegacyHeader.md](./LegacyHeader.md) |
| LegacyHeaderGroup | Header group instance type bound to `LegacyFeatures` | [LegacyHeaderGroup.md](./LegacyHeaderGroup.md) |
| RowModelFactory | Row model factory function type from the v8 API | [RowModelFactory.md](./RowModelFactory.md) |
| FacetedRowModelFactory | Faceted row model factory function type from the v8 API | [FacetedRowModelFactory.md](./FacetedRowModelFactory.md) |
| FacetedMinMaxValuesFactory | Faceted min/max values factory function type from the v8 API | [FacetedMinMaxValuesFactory.md](./FacetedMinMaxValuesFactory.md) |
| FacetedUniqueValuesFactory | Faceted unique values factory function type from the v8 API | [FacetedUniqueValuesFactory.md](./FacetedUniqueValuesFactory.md) |
