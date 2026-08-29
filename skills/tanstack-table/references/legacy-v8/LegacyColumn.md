---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/type-aliases/LegacyColumn
---

# LegacyColumn

Column instance type bound to `LegacyFeatures`.

## Signature / Usage

```ts
type LegacyColumn<TData extends RowData, TValue = unknown> = Column<LegacyFeatures, TData, TValue>
```

## Notes

- **v9 status: present as a deprecated type alias, renamed to `Column<TFeatures, TData, TValue>`.** Use it with `useTable` instead.

## Related

- [LegacyColumnDef](./LegacyColumnDef.md)
- [LegacyCell](./LegacyCell.md)
