---
source: https://tanstack.com/table/latest/docs/framework/react/reference/index/type-aliases/ReactTable
---

# ReactTable / AppReactTable (React)

`ReactTable` is the table instance type returned by `useTable`; `AppReactTable` is the extended type returned by `useAppTable` with the `App*` wrapper components and registered table components.

## Signature / Usage

```ts
type ReactTable<TFeatures, TData, TSelected> = Omit<Table<TFeatures, TData>, "store"> & object;

type AppReactTable<TFeatures, TData, TSelected, TTableComponents, TCellComponents, THeaderComponents> = ReactTable<TFeatures, TData, TSelected> & NoInfer<TTableComponents> & object;
```

```tsx
const table = useTable(options, (state) => ({ globalFilter: state.globalFilter })) // only globalFilter is part of the selected state

console.log(table.state.globalFilter)
```

## Options / Props

`ReactTable` additions:

| Name | Type | Description |
|------|------|-------------|
| `FlexRender` | `<TValue>(props: FlexRenderProps<TFeatures, TData, TValue>) => ReactNode` | Component rendering headers, cells, or footers: `<table.FlexRender cell={cell} />`, `header={header}`, `footer={footer}`. Replaces `flexRender(cell.column.columnDef.cell, cell.getContext())` etc. |
| `state` | `Readonly<TSelected>` | Selected state, shaped by the selector passed as 2nd argument to `useTable` (may not match full table state). `TSelected` defaults to `TableState<TFeatures>` |
| `store` (deprecated) | `Table<TFeatures, TData>["store"]` | Prefer `table.state` for render reads, `table.atoms.<slice>.get()` for slice snapshots, or `table.Subscribe` / `useSelector(table.store, selector)` for explicit subscriptions |
| `Subscribe` | overloads (see below) | Component to subscribe to a source or to `table.store` |

`Subscribe` overloads on the table: `<TSourceValue>(props)` (source, `selector?: undefined`, children), `<TSourceValue, TSubSelected>(props)` (source, `selector`, children), and `<TSubSelected>(props)` taking `Omit<SubscribePropsWithStore<TFeatures, TSubSelected>, "source">`.

`AppReactTable` additions:

| Name | Type | Description |
|------|------|-------------|
| `AppTable` | `AppTableComponent<TFeatures>` | Root wrapper providing table context, with optional `selector` |
| `AppHeader` | `AppHeaderComponent<TFeatures, TData, THeaderComponents>` | Wraps a header; provides header context with `headerComponents`; optional `selector` |
| `AppFooter` | `AppHeaderComponent<TFeatures, TData, THeaderComponents>` | Wraps a footer; provides header context with `headerComponents`; optional `selector` |
| `AppCell` | `AppCellComponent<TFeatures, TData, TCellComponents>` | Wraps a cell; provides cell context with `cellComponents`; optional `selector` |

`TTableComponents` are intersected onto the table directly.

```tsx
<table.AppTable selector={(s) => s.pagination}>
  {(pagination) => <div>Page {pagination.pageIndex}</div>}
</table.AppTable>

<table.AppCell cell={cell} selector={(s) => s.columnFilters}>
  {(c, filters) => <td>{filters.length}</td>}
</table.AppCell>

<table.AppHeader header={header} selector={(s) => s.sorting}>
  {(h, sorting) => <th>{sorting.length} sorted</th>}
</table.AppHeader>
```

## Notes

- Overloads (not a union) are used so `selector` callbacks get correct contextual types in JSX; source overloads come first so `TSourceValue` is inferred from `source`.
- `ReactTable` is defined in `src/useTable.ts`; `AppReactTable` in `src/createTableHook.tsx` (`@tanstack/react-table`).

## Related

- [createTableHook](./create-table-hook.md)
- [Subscribe](./subscribe.md)
- [useTable](./use-table.md)
- [flexRender](./flex-render.md)
