---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/type-aliases/LegacyColumnDef
---

# LegacyColumnDef

Column definition type bound to `LegacyFeatures`.

## Signature / Usage

```ts
type LegacyColumnDef<TData extends RowData, TValue = unknown> =
  ColumnDef<LegacyFeatures, TData, TValue>
```

## Notes

- **v9 status: present as a deprecated type alias, renamed to `ColumnDef<TFeatures, TData, TValue>`.** Use it with `useTable` instead.

## Related

- [legacyCreateColumnHelper](./legacyCreateColumnHelper.md)
- [LegacyFeatures](./LegacyFeatures.md)
