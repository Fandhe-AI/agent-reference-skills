---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/getSortedRowModel
---

# getSortedRowModel

Stub function for v8 API compatibility with `useLegacyTable`. Acts as a marker to enable the sorted row model.

## Signature / Usage

```tsx
function getSortedRowModel<TData extends RowData>(): RowModelFactory<TData>
```

## Notes

- **v9 status: present as a deprecated stub, renamed to `createSortedRowModel()`.** Pass it in the `sortedRowModel` feature slot with the new `useTable` hook instead.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [RowModelFactory](./RowModelFactory.md)
