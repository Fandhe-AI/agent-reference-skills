---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/getExpandedRowModel
---

# getExpandedRowModel

Stub function for v8 API compatibility with `useLegacyTable`. Acts as a marker to enable the expanded row model.

## Signature / Usage

```tsx
function getExpandedRowModel<TData extends RowData>(): RowModelFactory<TData>
```

## Notes

- **v9 status: present as a deprecated stub, renamed to `createExpandedRowModel()`.** Pass it in the `expandedRowModel` feature slot with the new `useTable` hook instead.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [RowModelFactory](./RowModelFactory.md)
