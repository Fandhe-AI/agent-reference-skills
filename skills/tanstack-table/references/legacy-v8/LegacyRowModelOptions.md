---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/interfaces/LegacyRowModelOptions
---

# LegacyRowModelOptions

Legacy v8-style row model options interface, consumed by `LegacyTableOptions` / `useLegacyTable`.

## Signature / Usage

```ts
interface LegacyRowModelOptions<TData extends RowData> {
  getCoreRowModel?: RowModelFactory<TData>
  getFilteredRowModel?: RowModelFactory<TData>
  getSortedRowModel?: RowModelFactory<TData>
  getGroupedRowModel?: RowModelFactory<TData>
  getExpandedRowModel?: RowModelFactory<TData>
  getPaginationRowModel?: RowModelFactory<TData>
  getFacetedRowModel?: FacetedRowModelFactory<TData>
  getFacetedMinMaxValues?: FacetedMinMaxValuesFactory<TData>
  getFacetedUniqueValues?: FacetedUniqueValuesFactory<TData>
  filterFns?: FilterFns
  sortFns?: SortFns
  aggregationFns?: AggregationFns
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| getCoreRowModel | `RowModelFactory<TData>` | Core row model. No longer needed in v9 — always created automatically |
| getFilteredRowModel | `RowModelFactory<TData>` | Filtered row model. Use the `filteredRowModel`/`filterFns` slots with `createFilteredRowModel()` |
| getSortedRowModel | `RowModelFactory<TData>` | Sorted row model. Use the `sortedRowModel`/`sortFns` slots with `createSortedRowModel()` |
| getGroupedRowModel | `RowModelFactory<TData>` | Grouped row model. Use `columnGroupingFeature` with the `groupedRowModel` slot and `createGroupedRowModel()` |
| getExpandedRowModel | `RowModelFactory<TData>` | Expanded row model. Use the `expandedRowModel` slot with `createExpandedRowModel()` |
| getPaginationRowModel | `RowModelFactory<TData>` | Paginated row model. Use the `paginatedRowModel` slot with `createPaginatedRowModel()` |
| getFacetedRowModel | `FacetedRowModelFactory<TData>` | Faceted row model for a column. Use the `facetedRowModel` slot with `createFacetedRowModel()` |
| getFacetedMinMaxValues | `FacetedMinMaxValuesFactory<TData>` | Faceted min/max values for a column. Use the `facetedMinMaxValues` slot with `createFacetedMinMaxValues()` |
| getFacetedUniqueValues | `FacetedUniqueValuesFactory<TData>` | Faceted unique values for a column. Use the `facetedUniqueValues` slot with `createFacetedUniqueValues()` |
| filterFns | `FilterFns` | Additional filter functions. Use the `filteredRowModel`/`filterFns` slots with `createFilteredRowModel()` |
| sortFns | `SortFns` | Additional sort functions. Use the `sortedRowModel`/`sortFns` slots with `createSortedRowModel()` |
| aggregationFns | `AggregationFns` | Additional aggregation functions. Use `rowAggregationFeature` with the `aggregationFns` slot; add `columnGroupingFeature`/`groupedRowModel` only when grouping rows |

## Notes

- **v9 status: present as a deprecated interface**, consumed only by `LegacyTableOptions`/`useLegacyTable`. Every property here corresponds to a v8-style `get*RowModel` option; v9 replaces the whole set with the `features` option on `useTable`.

## Related

- [useLegacyTable](./useLegacyTable.md)
- [LegacyTableOptions](./LegacyTableOptions.md)
