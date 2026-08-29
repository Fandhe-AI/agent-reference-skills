---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/type-aliases/FacetedRowModelFactory
---

# FacetedRowModelFactory

Faceted row model factory function type from the v8 API.

## Signature / Usage

```ts
type FacetedRowModelFactory<TData extends RowData> =
  (table: Table<LegacyFeatures, TData>, columnId: string) => () => RowModel<LegacyFeatures, TData>
```

## Notes

- **v9 status: present, internal to the legacy compatibility layer only.** The v9 equivalent is `createFacetedRowModel()` passed to the `facetedRowModel` feature slot on `useTable`.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [getFacetedRowModel](./getFacetedRowModel.md)
