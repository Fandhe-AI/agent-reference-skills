---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/interfaces/LegacyFeatures
---

# LegacyFeatures

Feature set registered by `useLegacyTable`. Extends the stock features with built-in filter, sort, and aggregation registries so column definitions accept the v8 string identifiers such as `'mean'` and `'includesString'`.

## Signature / Usage

```ts
interface LegacyFeatures extends StockFeatures {
  aggregationFns: { range: AggregationFnDef<TableFeatures, RowData, unknown, number> }
  filterFns: { startsWithLetter: FilterFn<TableFeatures, RowData> }
  sortFns: { byNameLength: SortFn<TableFeatures, RowData> }
}
```

## Notes

- **v9 status: present, internal to the legacy compatibility layer only** (not part of the public features API). Standard v9 usage declares features explicitly via `tableFeatures()` instead of relying on a pre-bundled feature set.

## Related

- [useLegacyTable](./useLegacyTable.md)
- [LegacyTable](./LegacyTable.md)
