---
source: https://tanstack.com/table/latest/docs/framework/react/reference/index/type-aliases/AppCellContext
---

# AppCellContext / AppHeaderContext (React)

`CellContext` / `HeaderContext` enhanced with the components registered in `createTableHook`: the `cell` (or `header`) property includes `cellComponents` (or `headerComponents`) and a context-bound `FlexRender`.

## Signature / Usage

```ts
type AppCellContext<TFeatures, TData, TValue, TCellComponents> = {
  cell: Cell<TFeatures, TData, TValue> & TCellComponents & { FlexRender: () => ReactNode };
  column: Column<TFeatures, TData, TValue>;
  getValue: CellContext<TFeatures, TData, TValue>["getValue"];
  renderValue: CellContext<TFeatures, TData, TValue>["renderValue"];
  row: Row<TFeatures, TData>;
  table: Table<TFeatures, TData>;
}

type AppHeaderContext<TFeatures, TData, TValue, THeaderComponents> = {
  column: Column<TFeatures, TData, TValue>;
  header: Header<TFeatures, TData, TValue> & THeaderComponents & { FlexRender: () => ReactNode };
  table: Table<TFeatures, TData>;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `TableFeatures` | Type parameter |
| `TData` | `RowData` | Type parameter |
| `TValue` | `CellData` | Type parameter |
| `TCellComponents` | `Record<string, ComponentType<any>>` | `AppCellContext` only |
| `THeaderComponents` | `Record<string, ComponentType<any>>` | `AppHeaderContext` only |

## Notes

- Both are used as the `TProps` of `AppColumnDefTemplate` in `AppColumnDefBase`'s `cell` / `header` / `footer`.
- Defined in `src/createTableHook.tsx` (`@tanstack/react-table`).

## Related

- [AppColumnHelper](./app-column-helper.md)
- [createTableHook](./create-table-hook.md)
- [CellContext](./cell-context.md)
- [HeaderContext](./header-context.md)
