---
source: https://tanstack.com/table/latest/docs/reference/index/variables/sortFns, https://tanstack.com/table/latest/docs/reference/index/interfaces/SortFn, https://tanstack.com/table/latest/docs/reference/index/functions/constructSortFn
---

# sortFns / SortFn / SortFns / BuiltInSortFn / SortFnOption

Sorting function type (`SortFn`), the deprecated built-in registry (`sortFns`), the builder `constructSortFn`, and the related option types of `rowSortingFeature`.

## Signature / Usage

```ts
function constructSortFn<TFeatures, TData>(def): CreatedSortFn<TFeatures, TData>;

const stripDiacritics = (value: string) =>
  value.normalize('NFD').replace(/\p{Diacritic}/gu, '')

const alphanumericIgnoreDiacritics = constructSortFn({
  ...sortFn_alphanumeric,
  resolveDataValue: (value) =>
    stripDiacritics(sortFn_alphanumeric.resolveDataValue!(value)),
})
```

```ts
SortFn(
   rowA,
   rowB,
   columnId): number;

type SortFnOption<TFeatures, TData> =
  | "auto"
  | ExtractSortFnKeys<TFeatures>
  | SortFn<TFeatures, TData>;

type BuiltInSortFn = keyof typeof sortFns;
```

## Options / Props

`SortFn` properties:

| Name | Type | Description |
|------|------|-------------|
| `resolveDataValue?` | `TransformDataValueFn` | Normalizes each row's value before the two sides are compared. Only honored by sorting functions built with `constructSortFn` (including all built-in ones). |

`SortFn` call parameters: `rowA: Row<TFeatures, TData>`, `rowB: Row<TFeatures, TData>`, `columnId: string`. Returns `number`.

`sortFns` keys (each `CreatedSortFn<any, any>` = `sortFn_<name>`): `alphanumeric`, `alphanumericCaseSensitive`, `basic`, `datetime`, `text`, `textCaseSensitive`.

## Notes

- `sortFns` (the full built-in registry) is deprecated: registering it opts out of tree-shaking. Import individual `sortFn_*` functions and register them in the `sortFns` slot, or pass them directly to the `sortFn` column option. The export still works and is not going away in v9, but built-in name resolution (including `sortFn: 'auto'`) only finds functions you register yourself.
- `constructSortFn` takes a value-level `sort` comparator plus optional `resolveDataValue`; the definition is attached to the returned function, so a variant can be made by spreading a built-in sorting function and overriding the resolver.
- `SortFns` is a declaration-merging interface (no members in the reference).
- Source: tanstack-table docs reference for table-core 9.3.1.

## Related

- [row-sorting.md](./row-sorting.md)
- [filter-fns.md](./filter-fns.md)
- [aggregation-fns.md](./aggregation-fns.md)
