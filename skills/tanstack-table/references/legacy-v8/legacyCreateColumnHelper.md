---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/legacyCreateColumnHelper
---

# legacyCreateColumnHelper

Creates a column helper with `LegacyFeatures` pre-bound, for use with `useLegacyTable`. Only requires `TData` — no need to specify `TFeatures`.

## Signature / Usage

```tsx
function legacyCreateColumnHelper<TData extends RowData>(): ColumnHelper<LegacyFeatures, TData>
```

## Notes

- **v9 status: present as a deprecated compatibility shim.** Renamed/replaced by `createColumnHelper<TFeatures, TData>()` used with `useTable`.

## Related

- [useLegacyTable](./useLegacyTable.md)
- [LegacyColumnDef](./LegacyColumnDef.md)
