---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/getGroupedRowModel
---

# getGroupedRowModel

Stub function for v8 API compatibility with `useLegacyTable`. Acts as a marker to enable the grouped row model.

## Signature / Usage

```tsx
function getGroupedRowModel<TData extends RowData>(): RowModelFactory<TData>
```

## Notes

- **v9 status: present as a deprecated stub, renamed to `createGroupedRowModel()`.** Use `columnGroupingFeature` with the `groupedRowModel` slot instead. Add `rowAggregationFeature` separately when grouped rows aggregate values.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [RowModelFactory](./RowModelFactory.md)
