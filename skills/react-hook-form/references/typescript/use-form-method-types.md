# UseFormRegister ... UseFormTrigger (method types)

Types of the methods returned by `useForm`: `register`, `unregister`, `watch`, `subscribe`, `handleSubmit`, `reset`, `resetField`, `resetDefaultValues`, `setError`, `clearErrors`, `setValue`, `setValues`, `setFocus`, `getValues`, `getErrors`, `getFieldState`, `trigger`.

## Signature / Usage

UseFormRegister:

```tsx
export type UseFormRegister<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: RegisterOptions<TFieldValues, TFieldName>
) => UseFormRegisterReturn<TFieldName>
```

UseFormRegisterReturn (shape returned by `register`; useful for typing a custom `Input` that spreads `{...register(name)}`):

```tsx
export type UseFormRegisterReturn<
  TFieldName extends InternalFieldName = InternalFieldName,
> = {
  onChange: ChangeHandler
  onBlur: ChangeHandler
  ref: RefCallBack
  name: TFieldName
  min?: string | number
  max?: string | number
  maxLength?: number
  minLength?: number
  pattern?: string
  required?: boolean
  disabled?: boolean
}
```

UseFormUnregister:

```tsx
export type UseFormUnregister<TFieldValues extends FieldValues> = (
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[],
  options?: Omit<
    KeepStateOptions,
    | "keepIsSubmitted"
    | "keepSubmitCount"
    | "keepValues"
    | "keepDefaultValues"
    | "keepErrors"
  > & { keepValue?: boolean; keepDefaultValue?: boolean; keepError?: boolean }
) => void
```

UseFormWatch (overloaded: no argument, a field name, an array of names, or a callback that subscribes without triggering a re-render):

```tsx
export type UseFormWatch<TFieldValues extends FieldValues> = {
  (): TFieldValues
  <TFieldNames extends readonly FieldPath<TFieldValues>[]>(
    names: readonly [...TFieldNames],
    defaultValue?: DeepPartial<TFieldValues>
  ): FieldPathValues<TFieldValues, TFieldNames>
  <TFieldName extends FieldPath<TFieldValues>>(
    name: TFieldName,
    defaultValue?: FieldPathValue<TFieldValues, TFieldName>
  ): FieldPathValue<TFieldValues, TFieldName>
  (
    callback: WatchObserver<TFieldValues>,
    defaultValues?: DeepPartial<TFieldValues>
  ): Subscription
}
```

UseFormSubscribe (subscribe to formState changes without triggering a component re-render):

```tsx
export type UseFormSubscribe<TFieldValues extends FieldValues> = <
  TFieldNames extends readonly FieldPath<TFieldValues>[],
>(payload: {
  name?: readonly [...TFieldNames] | TFieldNames[number]
  formState?: Partial<ReadFormState>
  callback: (
    data: Partial<FormState<TFieldValues>> & {
      values: TFieldValues
      name?: InternalFieldName
      type?: EventType
    }
  ) => void
  exact?: boolean
}) => () => void
```

UseFormHandleSubmit:

```tsx
export type UseFormHandleSubmit<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = <TResult>(
  onValid: SubmitHandler<TTransformedValues, TResult>,
  onInvalid?: SubmitErrorHandler<TFieldValues>
) => (e?: React.BaseSyntheticEvent) => Promise<Awaited<TResult> | undefined>
```

UseFormReset:

```tsx
export type UseFormReset<TFieldValues extends FieldValues> = (
  values?:
    | DefaultValues<TFieldValues>
    | TFieldValues
    | ResetAction<TFieldValues>,
  keepStateOptions?: KeepStateOptions
) => void
```

UseFormResetField:

```tsx
export type UseFormResetField<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: ResetFieldConfig<TFieldValues, TFieldName>
) => void
```

UseFormResetDefaultValues:

```tsx
export type UseFormResetDefaultValues<TFieldValues extends FieldValues> = (
  values: DefaultValues<TFieldValues> | TFieldValues,
  options?: Partial<Pick<KeepStateOptions, "keepDirty" | "keepIsValid">>
) => void
```

UseFormSetError:

```tsx
export type UseFormSetError<TFieldValues extends FieldValues> = (
  name: FieldPath<TFieldValues> | ErrorNamespacePath,
  error: ErrorOption,
  options?: {
    shouldFocus: boolean
  }
) => void
```

UseFormClearErrors:

```tsx
export type UseFormClearErrors<TFieldValues extends FieldValues> = (
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[]
    | ErrorNamespacePath
) => void
```

UseFormSetValue:

```tsx
export type UseFormSetValue<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  value: FieldPathValue<TFieldValues, TFieldName>,
  options?: SetValueConfig
) => void
```

UseFormSetValues:

```tsx
export type UseFormSetValues<TFieldValues extends FieldValues> = (
  value: Partial<TFieldValues> | ((formValues: TFieldValues) => TFieldValues),
  options?: SetValueConfig
) => void
```

UseFormSetFocus:

```tsx
export type SetFocusOptions = Partial<{
  shouldSelect: boolean
}>

export type UseFormSetFocus<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: SetFocusOptions
) => void
```

UseFormGetValues (overloaded: no arguments, a single field name, or an array of field names):

```tsx
export type GetValuesConfig = {
  dirtyFields?: boolean
  touchedFields?: boolean
}

export type UseFormGetValues<TFieldValues extends FieldValues> = {
  (name?: undefined, config?: GetValuesConfig): TFieldValues
  <TFieldName extends FieldPath<TFieldValues>>(
    name: TFieldName,
    config?: GetValuesConfig
  ): FieldPathValue<TFieldValues, TFieldName>
  <TFieldNames extends FieldPath<TFieldValues>[]>(
    names: readonly [...TFieldNames],
    config?: GetValuesConfig
  ): [...FieldPathValues<TFieldValues, TFieldNames>]
}
```

UseFormGetErrors (overloaded: no arguments, a single error path, or an array of error paths):

```tsx
export type ErrorNamespacePath =
  | "root"
  | `root.${string}`
  | "form"
  | `form.${string}`

export type GetErrorsResult<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> | ErrorNamespacePath,
> = TName extends "root"
  ? (Record<string, GlobalError> & GlobalError) | undefined
  : TName extends ErrorNamespacePath
    ? GlobalError | undefined
    : TName extends FieldPath<TFieldValues>
      ? FieldPathError<TFieldValues, TName> | undefined
      : never

export type UseFormGetErrors<TFieldValues extends FieldValues> = {
  (name?: undefined): FieldErrors<TFieldValues>
  <TName extends FieldPath<TFieldValues> | ErrorNamespacePath>(
    name: TName
  ): GetErrorsResult<TFieldValues, TName>
  <TNames extends (FieldPath<TFieldValues> | ErrorNamespacePath)[]>(
    names: readonly [...TNames]
  ): {
    [K in keyof TNames]: GetErrorsResult<TFieldValues, TNames[K]>
  }
}
```

UseFormGetFieldState:

```tsx
export type UseFormGetFieldState<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues>,
>(
  name: TFieldName,
  formState?: FormState<TFieldValues>
) => {
  invalid: boolean
  isDirty: boolean
  isTouched: boolean
  isValidating: boolean
  error?: FieldError
}
```

UseFormTrigger:

```tsx
export type TriggerConfig = Partial<{
  shouldFocus: boolean
  shouldTouch: boolean
}>

export type UseFormTrigger<TFieldValues extends FieldValues> = (
  name?:
    | FieldPath<TFieldValues>
    | FieldPath<TFieldValues>[]
    | readonly FieldPath<TFieldValues>[],
  options?: TriggerConfig
) => Promise<boolean>
```

## Notes

- `UseFormHandleSubmit` signature taken from react-hook-form v7.90.0 `src/types/form.ts` (https://github.com/react-hook-form/react-hook-form/blob/v7.90.0/src/types/form.ts); the /ts page still shows `Promise<void>`.
- Source: https://react-hook-form.com/ts#UseFormRegister, https://react-hook-form.com/ts#UseFormRegisterReturn, https://react-hook-form.com/ts#UseFormUnregister, https://react-hook-form.com/ts#UseFormWatch, https://react-hook-form.com/ts#UseFormSubscribe, https://react-hook-form.com/ts#UseFormHandleSubmit, https://react-hook-form.com/ts#UseFormReset, https://react-hook-form.com/ts#UseFormResetField, https://react-hook-form.com/ts#UseFormResetDefaultValues, https://react-hook-form.com/ts#UseFormSetError, https://react-hook-form.com/ts#UseFormClearErrors, https://react-hook-form.com/ts#UseFormSetValue, https://react-hook-form.com/ts#UseFormSetValues, https://react-hook-form.com/ts#UseFormSetFocus, https://react-hook-form.com/ts#UseFormGetValues, https://react-hook-form.com/ts#UseFormGetErrors, https://react-hook-form.com/ts#UseFormGetFieldState, https://react-hook-form.com/ts#UseFormTrigger

## Related

- [UseFormReturn / UseFormProps / ValidateForm](./use-form-return-props.md)
- [FormState / KeepStateOptions / FormStateProxy](./form-state-types.md)
- [FieldError / FieldErrors / ErrorOption](./error-types.md)
