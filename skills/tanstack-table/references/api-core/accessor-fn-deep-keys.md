---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/DeepKeys
---

# AccessorFn / DeepKeys / DeepValue

Type utilities for reading cell values: an accessor function type, the union of dotted key paths of a row type, and the value type at a path.

## Signature / Usage

```ts
type AccessorFn<TData, TValue> = (originalRow: TData, index: number) => TValue;

type DeepKeys<T, TDepth> = TDepth["length"] extends 5 ? never : unknown extends T ? string : T extends ReadonlyArray<any> & IsTuple<T> ?
  | AllowedIndexes<T>
  | DeepKeysPrefix<T, AllowedIndexes<T>, TDepth> : T extends any[] ? DeepKeys<T[number], [...TDepth, any]> : T extends Date ? never : T extends object ? keyof T & string | DeepKeysPrefix<T, keyof T, TDepth> : never;

type DeepValue<T, TProp> = T extends null | undefined ? undefined : T extends Record<string | number, any> ? TProp extends `${infer TBranch}.${infer TDeepProp}` ? DeepValue<T[TBranch], TDeepProp> : T[TProp & keyof T] : never;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TData` | `RowData` | `AccessorFn`: row data type |
| `TValue` | `CellData` (default `CellData`) | `AccessorFn`: returned value type |
| `originalRow` | `TData` | `AccessorFn` parameter |
| `index` | `number` | `AccessorFn` parameter |
| `T` | `T` | `DeepKeys` / `DeepValue`: the object type |
| `TDepth` | `any[]` (default `[]`) | `DeepKeys`: recursion depth tracker |
| `TProp` | `TProp` | `DeepValue`: dotted path |

## Notes

- `AccessorFn` reads a cell value from an original row object; the row index is provided for accessors that need stable position-aware derived values.
- `DeepKeys` stops recursing at depth 5 (`TDepth["length"] extends 5 ? never`), yields `never` for `Date`, and yields `string` when `T` is `unknown`.
- Defined in `types/ColumnDef.ts` (`AccessorFn`) and `types/type-utils.ts` (`DeepKeys`, `DeepValue`).

## Related

- [ColumnDef variants](./column-def-variants.md)
- [createColumnHelper](./create-column-helper.md)
- [RowData / CellData](./row-data-cell-data.md)
