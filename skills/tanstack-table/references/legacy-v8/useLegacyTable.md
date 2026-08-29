---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/useLegacyTable
---

# useLegacyTable

Deprecated hook providing v8-style backward compatibility. Accepts legacy v8-style `TableOptions` and returns a table instance with the full state subscribed and a `getState()` method.

## Signature / Usage

```tsx
function useLegacyTable<TData extends RowData>(
  options: LegacyTableOptions<TData>
): LegacyReactTable<TData>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| options | `LegacyTableOptions<TData>` | Legacy v8-style table options |

## Notes

- **v9 status: present as a deprecated compatibility shim** (new in v9; has no v8 equivalent — it bridges v8-style options into the v9 core). Provided only as a migration layer from TanStack Table v8. Use the new `useTable` hook instead with an explicit `features` option:

```tsx
// New v9 API
const features = tableFeatures({
  columnFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns,
  sortFns,
})

const table = useTable({
  features,
  columns,
  data,
})
```

- Key differences from v8: features are tree-shakeable (import only what you use); row models and fn registries are explicitly passed via `features`; use `table.Subscribe` for fine-grained re-renders; state is accessed via `table.state` after selecting.
- Defined in `packages/react-table/src/useLegacyTable.ts`.

## Related

- [LegacyTableOptions](./LegacyTableOptions.md)
- [LegacyReactTable](./LegacyReactTable.md)
- [legacyCreateColumnHelper](./legacyCreateColumnHelper.md)
