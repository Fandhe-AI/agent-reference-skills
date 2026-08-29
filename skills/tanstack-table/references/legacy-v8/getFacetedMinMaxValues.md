---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/getFacetedMinMaxValues
---

# getFacetedMinMaxValues

Stub function for v8 API compatibility with `useLegacyTable`. Acts as a marker to enable the faceted min/max values.

## Signature / Usage

```tsx
function getFacetedMinMaxValues<TData extends RowData>(): FacetedMinMaxValuesFactory<TData>
```

## Notes

- **v9 status: present as a deprecated stub, renamed to `createFacetedMinMaxValues()`.** Pass it in the `facetedMinMaxValues` feature slot with the new `useTable` hook instead.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [FacetedMinMaxValuesFactory](./FacetedMinMaxValuesFactory.md)
