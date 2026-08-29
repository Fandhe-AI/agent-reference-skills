---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/type-aliases/RowModelFactory
---

# RowModelFactory

Row model factory function type from the v8 API, used as the shape of `LegacyRowModelOptions` `get*RowModel` properties.

## Signature / Usage

```ts
type RowModelFactory<TData extends RowData> =
  (table: Table<LegacyFeatures, TData>) => () => RowModel<LegacyFeatures, TData>
```

## Notes

- **v9 status: present, internal to the legacy compatibility layer only.** The v9 equivalent is a row-model creator function (e.g. `createFilteredRowModel()`) passed to a feature slot on `useTable`, not a factory returning a factory.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [getCoreRowModel](./getCoreRowModel.md)
