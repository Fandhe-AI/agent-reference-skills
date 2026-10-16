# FormState / KeepStateOptions / FormStateProxy

Types for `formState` (returned by `useForm` and `useFormState`), the state-retention options of `reset`, and the `FormStateProxy` shape.

## Signature / Usage

```tsx
export type FormState<TFieldValues extends FieldValues> = {
  isDirty: boolean
  isLoading: boolean
  isSubmitted: boolean
  isSubmitSuccessful: boolean
  isSubmitting: boolean
  isValidating: boolean
  isValid: boolean
  disabled: boolean
  submitCount: number
  defaultValues?: undefined | Readonly<DeepPartial<TFieldValues>>
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>
  touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>
  validatingFields: Partial<Readonly<FieldNamesMarkedBoolean<TFieldValues>>>
  errors: FieldErrors<TFieldValues>
  isReady: boolean
}

export type KeepStateOptions = Partial<{
  keepDirtyValues: boolean
  keepErrors: boolean
  keepDirty: boolean
  keepValues: boolean
  keepDefaultValues: boolean
  keepIsSubmitted: boolean
  keepIsSubmitSuccessful: boolean
  keepTouched: boolean
  keepIsValidating: boolean
  keepIsValid: boolean
  keepSubmitCount: boolean
  keepFieldsRef: boolean
}>

export type FormStateProxy<TFieldValues extends FieldValues = FieldValues> = {
  isDirty: boolean
  isValidating: boolean
  dirtyFields: FieldNamesMarkedBoolean<TFieldValues>
  touchedFields: FieldNamesMarkedBoolean<TFieldValues>
  validatingFields: FieldNamesMarkedBoolean<TFieldValues>
  errors: boolean
  isValid: boolean
}
```

## Notes

- `KeepStateOptions` is accepted by `reset` and by `useForm`'s `resetOptions`, controlling which parts of form state survive the reset.

## Related

- [FieldError / FieldErrors / ErrorOption](./error-types.md)
- [UseFormRegister ... UseFormTrigger (method types)](./use-form-method-types.md)
