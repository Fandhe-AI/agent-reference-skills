# UseFieldArrayReturn / FieldArrayMethodProps / UseFieldArrayProps / FieldArrayProps

Types for `useFieldArray`: its return value, the focus options of `append` / `prepend` / `insert`, its props, and the props of the `FieldArray` render component.

## Signature / Usage

UseFieldArrayReturn:

```tsx
export type UseFieldArrayReturn<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = "id",
> = {
  swap: UseFieldArraySwap
  move: UseFieldArrayMove
  prepend: UseFieldArrayPrepend<TFieldValues, TFieldArrayName>
  append: UseFieldArrayAppend<TFieldValues, TFieldArrayName>
  remove: UseFieldArrayRemove
  insert: UseFieldArrayInsert<TFieldValues, TFieldArrayName>
  update: UseFieldArrayUpdate<TFieldValues, TFieldArrayName>
  replace: UseFieldArrayReplace<TFieldValues, TFieldArrayName>
  fields: (FieldArrayWithId<TFieldValues, TFieldArrayName, TKeyName> & {
    disabled?: boolean
  })[]
}
```

FieldArrayMethodProps (second argument to `append`, `prepend`, and `insert`):

```tsx
export type FieldArrayMethodProps = {
  shouldFocus?: boolean
  focusIndex?: number
  focusName?: string
}
```

UseFieldArrayProps:

```tsx
export type UseFieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = "id",
  TTransformedValues = TFieldValues,
> = {
  name: TFieldArrayName
  keyName?: TKeyName
  control?: Control<TFieldValues, any, TTransformedValues>
  rules?: {
    validate?:
      | Validate<FieldArray<TFieldValues, TFieldArrayName>[], TFieldValues>
      | Record<
          string,
          Validate<FieldArray<TFieldValues, TFieldArrayName>[], TFieldValues>
        >
  } & Pick<
    RegisterOptions<TFieldValues>,
    "maxLength" | "minLength" | "required"
  >
  shouldUnregister?: boolean
  disabled?: boolean
}
```

FieldArrayProps:

```tsx
export type FieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = "id",
> = {
  render: (
    fieldArray: UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName>
  ) => React.ReactElement
} & UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>
```

## Related

- [Field / FieldPath / FieldPathByValue / FieldValues / FieldArrayWithId](./field-path-types.md)
- [Mode / RegisterOptions](./mode-register-options.md)
