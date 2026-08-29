---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/type-aliases/LegacyCell
---

# LegacyCell

Cell instance type bound to `LegacyFeatures`.

## Signature / Usage

```ts
type LegacyCell<TData extends RowData, TValue = unknown> = Cell<LegacyFeatures, TData, TValue>
```

## Notes

- **v9 status: present as a deprecated type alias, renamed to `Cell<TFeatures, TData, TValue>`.** Use it with `useTable` instead.

## Related

- [LegacyRow](./LegacyRow.md)
- [LegacyColumn](./LegacyColumn.md)
