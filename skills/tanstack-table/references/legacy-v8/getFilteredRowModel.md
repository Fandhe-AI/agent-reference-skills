---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/getFilteredRowModel
---

# getFilteredRowModel

Stub function for v8 API compatibility with `useLegacyTable`. Acts as a marker to enable the filtered row model.

## Signature / Usage

```tsx
function getFilteredRowModel<TData extends RowData>(): RowModelFactory<TData>
```

## Notes

- **v9 status: present as a deprecated stub, renamed to `createFilteredRowModel()`.** Pass it in the `filteredRowModel` feature slot with the new `useTable` hook instead.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [RowModelFactory](./RowModelFactory.md)
