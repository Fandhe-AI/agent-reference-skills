---
source: https://tanstack.com/table/latest/docs/reference/index/interfaces/TableFeatures
---

# TableFeatures (interface)

Complete feature registry for a table. Combines core features, stock features, declaration-merged custom plugins, row-model factory slots, function registries, and type-only meta slots. The concrete `features` object passed to `tableFeatures()` determines which feature APIs appear in table, row, column, cell, header, options, and state types.

## Signature / Usage

```ts
// extends Partial<CoreFeatures>, Partial<StockFeatures>, Partial<Plugins>
const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
  tableMeta: {} as MyTableMeta,
})
```

## Options / Props

Own properties (all optional). Feature slots (`xxxFeature?: TableFeature`) are inherited from `CoreFeatures` / `StockFeatures` / `Plugins`.

| Name | Type | Description |
|------|------|-------------|
| `aggregationFns` | `Record<string, AggregationFnDef<any, any, any, any>>` | Registry of aggregation functions by name; keys become valid string values for `aggregationFn` on column defs. Register built-ins individually: `{ sum: aggregationFn_sum, myCustomAggregationFn }` |
| `filterFns` | `Record<string, FilterFn<any, any>>` | Registry of filter functions by name; keys become valid `filterFn` / `globalFilterFn` values |
| `sortFns` | `Record<string, SortFn<any, any>>` | Registry of sorting functions by name; keys become valid `sortFn` values |
| `columnMeta` | `object` | Type-only slot for `columnDef.meta`. Pass a phantom value: `columnMeta: {} as MyColumnMeta`. Stripped at runtime. Omitted: global `ColumnMeta` interface applies |
| `tableMeta` | `object` | Type-only slot for `options.meta`. Pass `tableMeta: {} as MyTableMeta`. Omitted: global `TableMeta` interface applies |
| `filterMeta` | `object` | Type-only slot for filter meta added via `addMeta` and read from `row.columnFiltersMeta`. Pass `filterMeta: {} as MyFilterMeta` (or `metaHelper<MyFilterMeta>()`). Omitted: global `FilterMeta` applies |
| `coreRowModel` | `(table) => () => RowModel<any, any>` | Factory for the core row model. Defaults to `createCoreRowModel()` |
| `expandedRowModel` | `(table) => () => RowModel<any, any>` | Client-side expanded row model factory (`createExpandedRowModel()`). Not needed for server-side expansion |
| `filteredRowModel` | `(table) => () => RowModel<any, any>` | Client-side filtered row model factory (`createFilteredRowModel()`). Not needed for server-side filtering |
| `groupedRowModel` | `(table) => () => RowModel<any, any>` | Client-side grouped row model factory (`createGroupedRowModel()`). Not needed for server-side grouping |
| `paginatedRowModel` | `(table) => () => RowModel<any, any>` | Client-side paginated row model factory (`createPaginatedRowModel()`). Not needed for server-side pagination |
| `sortedRowModel` | `(table) => () => RowModel<any, any>` | Client-side sorted row model factory (`createSortedRowModel()`). Not needed for server-side sorting |
| `facetedRowModel` | `(table, columnId) => () => RowModel<any, any>` | Per-column faceted row model factory (`createFacetedRowModel()`) |
| `facetedUniqueValues` | `(table, columnId) => () => Map<any, number>` | Per-column faceted unique values factory (`createFacetedUniqueValues()`) |
| `facetedMinMaxValues` | `(table, columnId) => () => [number, number] \| undefined` | Per-column faceted min/max factory (`createFacetedMinMaxValues()`) |

Core feature slots: `coreReactivityFeature` (`TableReactivityBindings`), `coreCellsFeature`, `coreColumnsFeature`, `coreHeadersFeature`, `coreRowModelsFeature`, `coreRowsFeature`, `coreTablesFeature`.

Stock feature slots (`TableFeature`): `cellSelectionFeature`, `cellSpanningFeature`, `columnFacetingFeature`, `columnFilteringFeature`, `columnGroupingFeature`, `columnOrderingFeature`, `columnPinningFeature`, `columnResizingFeature`, `columnSizingFeature`, `columnVisibilityFeature`, `globalFilteringFeature`, `rowAggregationFeature`, `rowExpandingFeature`, `rowPaginationFeature`, `rowPinningFeature`, `rowSelectionFeature`, `rowSortingFeature`.

Plugin slot: `workerRowModelsFeature` (`TableFeature`, from `Plugins`).

## Notes

- Spreading the exported `filterFns` / `sortFns` / `aggregationFns` registries also works but bundles every built-in function.
- The `columnMeta` / `tableMeta` / `filterMeta` values are ignored and stripped from the registered features at runtime; only their types are used.

## Related

- [tableFeatures](./table-features-fn.md)
- [TableFeature](./table-feature.md)
- [stockFeatures](./stock-features.md)
- [coreFeatures](./core-features.md)
- [RowModelFns / CachedRowModels](./row-model-fns.md)
