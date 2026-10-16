---
source: https://tanstack.com/table/latest/docs/reference/index/variables/filterFns, https://tanstack.com/table/latest/docs/reference/index/interfaces/FilterFn, https://tanstack.com/table/latest/docs/reference/index/functions/constructFilterFn
---

# filterFns / FilterFn / FilterFns / FilterMeta / BuiltInFilterFn / FilterFnOption

Filter function type (`FilterFn`), the deprecated built-in registry (`filterFns`), the builder `constructFilterFn`, and the related option/meta types of `columnFilteringFeature`.

## Signature / Usage

```ts
function constructFilterFn<TFeatures, TData>(def): CreatedFilterFn<TFeatures, TData>;

const normalize = (value: unknown) =>
  String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

const includesStringIgnoreDiacritics = constructFilterFn({
  ...filterFn_includesString,
  resolveFilterValue: normalize,
  resolveDataValue: normalize,
})
```

```ts
FilterFn(
   row,
   columnId,
   filterValue,
   addMeta?): boolean;
```

```ts
type FilterFnOption<TFeatures, TData> =
  | "auto"
  | ExtractFilterFnKeys<TFeatures>
  | FilterFn<TFeatures, TData>;

type BuiltInFilterFn = keyof typeof filterFns;
```

## Options / Props

`FilterFn` properties:

| Name | Type | Description |
|------|------|-------------|
| `autoRemove?` | `ColumnFilterAutoRemoveTestFn<TFeatures, TData, unknown>` | Removes the filter from `state.columnFilters` when the filter value fails this test (e.g. empty strings for text filters). When provided it is authoritative: values it keeps stay in filter state even when empty strings. An `undefined` filter value always clears the filter. |
| `resolveDataValue?` | `TransformDataValueFn` | Normalizes each row's value before it is compared against the filter value. Only honored by filter functions built with `constructFilterFn` (including all built-in ones). |
| `resolveFilterValue?` | `TransformFilterValueFn<TFeatures, TData, unknown>` | Normalizes the filter value before filtering runs. Applied once per filter (not per row); the result is passed to the filter function as `filterValue`. |

`FilterFn` call parameters: `row: Row<TFeatures, TData>`, `columnId: string`, `filterValue: any`, `addMeta?: (meta) => void`. Returns `boolean`.

`filterFns` keys (each `CreatedFilterFn<any, any>` = `filterFn_<name>`): `arrHas`, `arrIncludes`, `arrIncludesAll`, `arrIncludesSome`, `between`, `betweenInclusive`, `empty`, `endsWith`, `equals`, `equalsString`, `equalsStringSensitive`, `includesString`, `includesStringSensitive`, `inDateRange`, `inNumberRange`, `notEmpty`, `startsWith`, `weakEquals`.

## Notes

- `filterFns` (the full built-in registry) is deprecated: registering it opts out of tree-shaking. Import individual `filterFn_*` functions and register them in the `filterFns` slot, or pass them directly to the `filterFn` column option. The export still works and is not going away in v9, but built-in name resolution (including `filterFn: 'auto'`) only finds functions you register yourself.
- `constructFilterFn` attaches the definition to the returned function, so a variant can be made by spreading a built-in filter function and overriding what differs. The `filter` comparator receives the row's value (after `resolveDataValue`) and the filter value (after `resolveFilterValue`).
- When calling a filter function directly (outside of a table), apply the resolver yourself: `fn(row, columnId, fn.resolveFilterValue?.(value) ?? value)`.
- `FilterFns` and `FilterMeta` are declaration-merging interfaces (no members in the reference); `FilterFnOption` accepts `"auto"`, a registered key, or a `FilterFn`.
- Source: tanstack-table docs reference for table-core 9.3.1.

## Related

- [column-filtering.md](./column-filtering.md)
- [global-filtering.md](./global-filtering.md)
- [sort-fns.md](./sort-fns.md)
