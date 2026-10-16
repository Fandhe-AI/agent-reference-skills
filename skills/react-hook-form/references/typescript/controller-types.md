# ControllerRenderProps / ControllerFieldState / UseControllerReturn / UseControllerProps / ControllerProps

Types for `Controller` and `useController`. `ControllerRenderProps` is the shape of the `field` object passed to `Controller`'s `render` prop, useful for typing a custom controlled input component.

## Signature / Usage

ControllerRenderProps:

```tsx
export type ControllerRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  onChange: (...event: any[]) => void
  onBlur: Noop
  value: FieldPathValue<TFieldValues, TName>
  disabled?: boolean
  name: TName
  ref: RefCallBack
}
```

ControllerFieldState (shape of the `fieldState` object passed to `render`):

```tsx
export type ControllerFieldState = {
  invalid: boolean
  isTouched: boolean
  isDirty: boolean
  isValidating: boolean
  error?: FieldError
}
```

UseControllerReturn:

```tsx
export type UseControllerReturn<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>
  formState: UseFormStateReturn<TFieldValues>
  fieldState: ControllerFieldState
}
```

UseControllerProps:

```tsx
export type UseControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >
  shouldUnregister?: boolean
  defaultValue?: FieldPathValue<TFieldValues, TName>
  control?: Control<TFieldValues, any, TTransformedValues>
  disabled?: boolean
  exact?: boolean
}
```

ControllerProps:

```tsx
export type ControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<TFieldValues, TName>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
  }) => React.ReactElement
} & UseControllerProps<TFieldValues, TName, TTransformedValues>
```

## Notes

- Source: https://react-hook-form.com/ts#ControllerRenderProps, https://react-hook-form.com/ts#ControllerFieldState, https://react-hook-form.com/ts#UseControllerReturn, https://react-hook-form.com/ts#UseControllerProps, https://react-hook-form.com/ts#ControllerProps

## Related

- [FieldError / FieldErrors / ErrorOption](./error-types.md)
- [Mode / RegisterOptions](./mode-register-options.md)
