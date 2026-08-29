---
source: https://tanstack.com/table/latest/docs/reference/index/functions/tableOptions
---

# tableOptions

Runtime identity helper for `tableOptions`. Returns the same object it receives; all value comes from the overloads preserving table option inference at compile time when composing reusable, partial option objects (e.g. omitting `columns`, `data`, and/or `features` to be supplied later by a framework adapter or table factory).

## Signature / Usage

```ts
function tableOptions<TFeatures, TData>(options: TableOptions<TFeatures, TData>): TableOptions<TFeatures, TData>;
// plus overloads for options omitting any combination of "data" | "columns" | "features"
```

## Notes

- Purely a type-inference helper; it does not construct a table (use `constructTable` for that).

## Related

- [TableOptions](./table-options.md)
- [constructTable](./construct-table.md)
