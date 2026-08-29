---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/type-aliases/LegacyHeader
---

# LegacyHeader

Header instance type bound to `LegacyFeatures`.

## Signature / Usage

```ts
type LegacyHeader<TData extends RowData, TValue = unknown> = Header<LegacyFeatures, TData, TValue>
```

## Notes

- **v9 status: present as a deprecated type alias, renamed to `Header<TFeatures, TData, TValue>`.** Use it with `useTable` instead.

## Related

- [LegacyHeaderGroup](./LegacyHeaderGroup.md)
- [LegacyColumn](./LegacyColumn.md)
