---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/type-aliases/FacetedUniqueValuesFactory
---

# FacetedUniqueValuesFactory

Faceted unique values factory function type from the v8 API.

## Signature / Usage

```ts
type FacetedUniqueValuesFactory<TData extends RowData> =
  (table: Table<LegacyFeatures, TData>, columnId: string) => () => Map<any, number>
```

## Notes

- **v9 status: present, internal to the legacy compatibility layer only.** The v9 equivalent is `createFacetedUniqueValues()` passed to the `facetedUniqueValues` feature slot on `useTable`.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [getFacetedUniqueValues](./getFacetedUniqueValues.md)
