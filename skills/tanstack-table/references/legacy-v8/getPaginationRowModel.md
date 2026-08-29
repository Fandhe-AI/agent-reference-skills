---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/getPaginationRowModel
---

# getPaginationRowModel

Stub function for v8 API compatibility with `useLegacyTable`. Acts as a marker to enable the paginated row model.

## Signature / Usage

```tsx
function getPaginationRowModel<TData extends RowData>(): RowModelFactory<TData>
```

## Notes

- **v9 status: present as a deprecated stub, renamed to `createPaginatedRowModel()`.** Pass it in the `paginatedRowModel` feature slot with the new `useTable` hook instead.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [RowModelFactory](./RowModelFactory.md)
