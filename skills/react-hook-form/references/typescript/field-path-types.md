# Field / FieldPath / FieldPathByValue / FieldValues / FieldArrayWithId

Core generic helper types for field names, field values, and field array items.

## Signature / Usage

```tsx
export type Field = {
  _f: {
    ref: Ref
    name: InternalFieldName
    refs?: HTMLInputElement[]
    mount?: boolean
  } & RegisterOptions
}

export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>

export type FieldPathByValue<TFieldValues extends FieldValues, TValue> = {
  [Key in FieldPath<TFieldValues>]: FieldPathValue<
    TFieldValues,
    Key
  > extends TValue
    ? Key
    : never
}[FieldPath<TFieldValues>]

export type FieldValues = Record<string, any>

export type FieldArrayWithId<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = "id",
> = FieldArray<TFieldValues, TFieldArrayName> & Record<TKeyName, string>
```

## Notes

- `FieldPath` is useful when you define a custom component's `name` prop; it type-checks against your field paths.
- `FieldPathByValue` returns a union of all available paths whose value type matches the passed value type.

## Related

- [UseFieldArrayReturn / FieldArrayMethodProps / UseFieldArrayProps / FieldArrayProps](./field-array-types.md)
- [OpaqueTypes](./opaque-types.md)
