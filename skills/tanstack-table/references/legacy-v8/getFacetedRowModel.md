---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/getFacetedRowModel
---

# getFacetedRowModel

Stub function for v8 API compatibility with `useLegacyTable`. Acts as a marker to enable the faceted row model.

## Signature / Usage

```tsx
function getFacetedRowModel<TData extends RowData>(): FacetedRowModelFactory<TData>
```

## Notes

- **v9 status: present as a deprecated stub, renamed to `createFacetedRowModel()`.** Pass it in the `facetedRowModel` feature slot with the new `useTable` hook instead.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [FacetedRowModelFactory](./FacetedRowModelFactory.md)
