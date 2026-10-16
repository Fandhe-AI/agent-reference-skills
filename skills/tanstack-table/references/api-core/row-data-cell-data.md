---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/RowData
---

# RowData / CellData

Base constraint types for row objects and cell values.

## Signature / Usage

```ts
type RowData = Record<string, any> | any[];

type CellData = unknown;
```

## Notes

- `RowData` is the constraint for the `TData` type parameter throughout the API; `CellData` is the constraint (and default) for `TValue`.
- Defined in `types/type-utils.ts` (`table-core`).

## Related

- [ColumnDef variants](./column-def-variants.md)
- [AccessorFn / DeepKeys / DeepValue](./accessor-fn-deep-keys.md)
