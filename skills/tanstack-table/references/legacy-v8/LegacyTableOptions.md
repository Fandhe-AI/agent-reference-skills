---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/type-aliases/LegacyTableOptions
---

# LegacyTableOptions

Legacy v8-style table options that work with `useLegacyTable`. Omits `features` and instead accepts the v8-style `get*RowModel` function options.

## Signature / Usage

```ts
type LegacyTableOptions<TData extends RowData> =
  Omit<TableOptions<LegacyFeatures, TData>, 'features'> & LegacyRowModelOptions<TData>
```

## Notes

- **v9 status: present as a deprecated type alias.** Compatibility layer for migrating from v8. Renamed/replaced by `TableOptions<TFeatures, TData>` used with `useTable`'s explicit `features` option.

## Related

- [useLegacyTable](./useLegacyTable.md)
- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
