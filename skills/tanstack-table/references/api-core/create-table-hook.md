---
source: https://tanstack.com/table/latest/docs/framework/react/reference/index/functions/createTableHook
---

# createTableHook / CreateTableHookOptions (React)

Creates a custom table hook with pre-bound components for composition (the table equivalent of TanStack Form's `createFormHook`). Also covers `CreateTableHookResult`, `createTableHookContexts`, and `TableHookContexts`.

## Signature / Usage

```ts
function createTableHook<TFeatures, TTableComponents, TCellComponents, THeaderComponents>(
  options: CreateTableHookOptions<TFeatures, TTableComponents, TCellComponents, THeaderComponents>
): CreateTableHookResult<TFeatures, TTableComponents, TCellComponents, THeaderComponents>;
```

```tsx
// hooks/table.ts
export const {
  useAppTable,
  createAppColumnHelper,
  useTableContext,
  useCellContext,
  useHeaderContext,
} = createTableHook({
  features: tableFeatures({
    rowPaginationFeature,
    rowSortingFeature,
    columnFilteringFeature,
    paginatedRowModel: createPaginatedRowModel(),
    sortedRowModel: createSortedRowModel(),
    filteredRowModel: createFilteredRowModel(),
    sortFns,
    filterFns,
  }),
  tableComponents: { PaginationControls, RowCount },
  cellComponents: { TextCell, NumberCell },
  headerComponents: { SortIndicator, ColumnFilter },
})
```

## Options / Props

`CreateTableHookOptions` = `Omit<TableOptions<TFeatures, any>, "columns" | "data" | "store" | "state" | "initialState">` & the following:

| Name | Type | Description |
|------|------|-------------|
| `tableComponents` | `TTableComponents` | Table-level components available directly on the table returned by `useAppTable`; use `useTableContext()` inside. e.g. `{ PaginationControls, GlobalFilter, RowCount }` |
| `cellComponents` | `TCellComponents` | Cell-level components exposed on the cell passed to `AppCell` children; use `useCellContext()` inside. e.g. `{ TextCell, NumberCell, DateCell, CurrencyCell }` |
| `headerComponents` | `THeaderComponents` | Header-level components exposed on the header passed to `AppHeader` / `AppFooter` children; use `useHeaderContext()` inside. e.g. `{ SortIndicator, ColumnFilter, ResizeHandle }` |
| `tableContext` | `Context<ReactTable<any, any>>` | Custom React context for the table instance. Defaults to a shared module-scoped context; pass your own only to isolate this table (e.g. nesting tables) |
| `cellContext` | `Context<Cell<any, any, any>>` | Custom React context for the cell instance, used inside `cellComponents` |
| `headerContext` | `Context<Header<any, any, any>>` | Custom React context for the header instance, used inside `headerComponents` (and footer components) |

`CreateTableHookResult` properties:

| Name | Type | Description |
|------|------|-------------|
| `appFeatures` | `TFeatures` | The features object passed to `createTableHook` |
| `createAppColumnHelper` | `<TData>() => AppColumnHelper<TFeatures, TData, TCellComponents, THeaderComponents>` | Column helper pre-bound to `TFeatures` and the registered components |
| `useAppTable` | `<TData, TSelected>(tableOptions, selector?) => AppReactTable<...>` | Creates a table with `App*` wrappers and registered `tableComponents` attached; `TData` is inferred from `data`. `tableOptions` is `Omit<TableOptions<TFeatures, TData>, "features">` |
| `useTableContext` | `<TData, TSelected>() => AppReactTable<...>` | Reads the table from the nearest `<table.AppTable>`. `TSelected` cannot be inferred (React context does not carry generics); defaults to the full table state |
| `useCellContext` | `<TValue>() => Cell_Core<...> & TCellComponents & object` | Reads the cell from the nearest `<table.AppCell>`, extended with `cellComponents` and a context-bound `FlexRender` |
| `useHeaderContext` | `<TValue>() => Header_Core<...> & THeaderComponents & object` | Reads the header from the nearest `<table.AppHeader>` / `<table.AppFooter>`, extended with `headerComponents` and a context-bound `FlexRender` |

## Notes

- `createTableHookContexts<TFeatures, TData = RowData>(): TableHookContexts<TFeatures, TData>` creates a fresh, scoped set of table/cell/header contexts plus matching hooks, to pass into `createTableHook`. Usually not needed; use it for an isolated context, e.g. nesting one table inside another.
- `TableHookContexts` has `tableContext`, `cellContext`, `headerContext`, and `useTableContext<TTableData = TData>()`, `useCellContext<TValue>()`, `useHeaderContext<TValue>()`.
- Hooks from `createTableHookContexts` are typed with `TFeatures` only and do not know the registered component maps; for the richest types prefer the `use*Context` hooks returned from `createTableHook`.

```tsx
// scoped-table-context.ts
export const {
  tableContext,
  cellContext,
  headerContext,
  useTableContext,
  useCellContext,
  useHeaderContext,
} = createTableHookContexts<typeof features>()

// table.ts
export const { useAppTable } = createTableHook({
  features,
  tableContext, // <- pass the scoped contexts so the providers use them
  cellContext,
  headerContext,
  tableComponents: { PaginationControls },
})
```

## Related

- [ReactTable / AppReactTable](./react-table-type.md)
- [AppColumnHelper](./app-column-helper.md)
- [AppCellContext / AppHeaderContext](./app-cell-header-context.md)
- [useTable](./use-table.md)
