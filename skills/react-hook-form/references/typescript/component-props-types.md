# UseWatchProps / WatchProps / UseFormStateProps / FormStateProps / FormProviderProps / FormProps

Props types for the `useWatch` hook, the `Watch` and `FormState` render-prop components, `useFormState`, `FormProvider`, and the `Form` component.

## Signature / Usage

UseWatchProps (props accepted by `useWatch`):

```tsx
export type UseWatchProps<TFieldValues extends FieldValues = FieldValues> = {
  defaultValue?: unknown
  disabled?: boolean
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[]
  control?: Control<TFieldValues>
  exact?: boolean
  compute?: (formValues: TFieldValues) => TFieldValues
}
```

WatchProps (props for the `Watch` render-prop component):

```tsx
export type WatchProps<
  TFieldName extends WatchName<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
  TComputeValue = undefined,
> = {
  control?: Control<TFieldValues, TContext, TTransformedValues>
  name?: TFieldName
  disabled?: boolean
  exact?: boolean
  defaultValue?: WatchDefaultValue<TFieldName, TFieldValues>
  compute?: (value: WatchValue<TFieldName, TFieldValues>) => TComputeValue
  render: (
    value: WatchRenderValue<TFieldName, TFieldValues, TComputeValue>
  ) => React.ReactNode | React.ReactNode[]
}
```

UseFormStateProps (props accepted by `useFormState`):

```tsx
export type UseFormStateProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = Partial<{
  control?: Control<TFieldValues, any, TTransformedValues>
  disabled?: boolean
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[]
  exact?: boolean
}>
```

FormStateProps (props for the `FormState` render-prop component):

```tsx
export type FormStateProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = UseFormStateProps<TFieldValues, TTransformedValues> & {
  render: (values: UseFormStateReturn<TFieldValues>) => React.ReactNode
}
```

FormProviderProps:

```tsx
export type FormProviderProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = {
  children: React.ReactNode | React.ReactNode[]
} & UseFormReturn<TFieldValues, TContext, TTransformedValues>
```

FormProps (props of the `Form` component):

```tsx
export type FormProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = Omit<React.FormHTMLAttributes<HTMLFormElement>, "onError" | "onSubmit"> &
  Partial<{
    control: Control<TFieldValues, any, TTransformedValues>
    headers: Record<string, string>
    validateStatus: (status: number) => boolean
    onError: (
      payload:
        | { response: Response; error?: undefined }
        | { response?: undefined; error: unknown }
    ) => void
    onSuccess: ({ response }: { response: Response }) => void
    onSubmit: FormSubmitHandler<TTransformedValues>
    method: "post" | "put" | "delete"
    children: React.ReactNode | React.ReactNode[]
    render: (props: {
      submit: (e?: React.FormEvent) => void
    }) => React.ReactNode | React.ReactNode[]
    encType:
      | "application/x-www-form-urlencoded"
      | "multipart/form-data"
      | "text/plain"
      | "application/json"
  }>
```

## Notes

- Source: https://react-hook-form.com/ts#UseWatchProps, https://react-hook-form.com/ts#WatchProps, https://react-hook-form.com/ts#UseFormStateProps, https://react-hook-form.com/ts#FormStateProps, https://react-hook-form.com/ts#FormProviderProps, https://react-hook-form.com/ts#FormProps

## Related

- [Control](./control.md)
- [SubmitHandler / SubmitErrorHandler / FormSubmitHandler](./submit-handler.md)
- [UseFormReturn / UseFormProps / ValidateForm](./use-form-return-props.md)
