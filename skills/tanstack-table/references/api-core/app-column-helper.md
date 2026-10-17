---
source: https://tanstack.com/table/latest/docs/framework/react/reference/index/type-aliases/AppColumnHelper
---

# AppColumnHelper (React)

Enhanced column helper (returned by `createAppColumnHelper`) with pre-bound components in cell/header/footer contexts, so TypeScript knows the registered components when defining columns. Also covers `AppColumnDefBase`, `AppDisplayColumnDef`, `AppGroupColumnDef`, `AppColumnDefTemplate`.

## Signature / Usage

```ts
type AppColumnHelper<TFeatures, TData, TCellComponents, THeaderComponents> = {
  accessor: <TAccessor, TValue>(accessor, column) => TAccessor extends AccessorFn<TData> ? AccessorFnColumnDef<TFeatures, TData, TValue> : AccessorKeyColumnDef<TFeatures, TData, TValue>;
  columns: <TColumns>(columns: [...TColumns]) => ColumnDef<TFeatures, TData, any>[] & [...TColumns];
  display: (column: AppDisplayColumnDef<TFeatures, TData, TCellComponents, THeaderComponents>) => DisplayColumnDef<TFeatures, TData, unknown>;
  group: (column: AppGroupColumnDef<TFeatures, TData, TCellComponents, THeaderComponents>) => GroupColumnDef<TFeatures, TData, unknown>;
}
```

```ts
type AppColumnDefTemplate<TProps> = string | ((props) => any);

type AppColumnDefBase<TFeatures, TData, TValue, TCellComponents, THeaderComponents> = Omit<IdentifiedColumnDef<TFeatures, TData, TValue>, "cell" | "header" | "footer"> & {
  cell?: AppColumnDefTemplate<AppCellContext<TFeatures, TData, TValue, TCellComponents>>;
  footer?: AppColumnDefTemplate<AppHeaderContext<TFeatures, TData, TValue, THeaderComponents>>;
  header?: AppColumnDefTemplate<AppHeaderContext<TFeatures, TData, TValue, THeaderComponents>>;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `accessor` | `(accessor, column) => AccessorFnColumnDef \| AccessorKeyColumnDef` | Data column with an accessor key (`DeepKeys<TData>`) or function (`AccessorFn<TData>`); contexts include pre-bound components. `column` is `AppColumnDefBase<...>` (plus an extra `object` part when `TAccessor` is an `AccessorFn`) |
| `columns` | `<TColumns>(columns) => ColumnDef<TFeatures, TData, any>[] & [...TColumns]` | Wraps an array of column defs to preserve each column's individual `TValue` type |
| `display` | `(column: AppDisplayColumnDef) => DisplayColumnDef<TFeatures, TData, unknown>` | Display (non-data) column |
| `group` | `(column: AppGroupColumnDef) => GroupColumnDef<TFeatures, TData, unknown>` | Group column with nested child columns |

`AppDisplayColumnDef` = `Omit<DisplayColumnDef<TFeatures, TData, unknown>, "cell" | "header" | "footer">` plus `cell` / `header` / `footer` templates typed with `AppCellContext` / `AppHeaderContext` (`TValue = unknown`). `AppGroupColumnDef` = `Omit<GroupColumnDef<TFeatures, TData, unknown>, "cell" | "header" | "footer" | "columns">` plus the same templates and `columns?: ReadonlyArray<ColumnDef<TFeatures, TData, unknown>>`.

## Notes

- Type parameters: `TFeatures extends TableFeatures`, `TData extends RowData`, `TCellComponents` / `THeaderComponents` extend `Record<string, ComponentType<any>>`.
- Obtain it via `createAppColumnHelper<TData>()` from `createTableHook`.
- Defined in `src/createTableHook.tsx` (`@tanstack/react-table`).

## Related

- [createTableHook](./create-table-hook.md)
- [AppCellContext / AppHeaderContext](./app-cell-header-context.md)
- [ColumnDef variants](./column-def-variants.md)
- [createColumnHelper](./create-column-helper.md)
