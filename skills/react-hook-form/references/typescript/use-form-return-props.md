# UseFormReturn / UseFormProps / ValidateForm

Types for the object returned by `useForm`, the options accepted by `useForm`, and the form-level `validate` option.

## Signature / Usage

UseFormReturn:

```tsx
export type UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = {
  watch: UseFormWatch<TFieldValues>
  getValues: UseFormGetValues<TFieldValues>
  getErrors: UseFormGetErrors<TFieldValues>
  getFieldState: UseFormGetFieldState<TFieldValues>
  setError: UseFormSetError<TFieldValues>
  clearErrors: UseFormClearErrors<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  setValues: UseFormSetValues<TFieldValues>
  trigger: UseFormTrigger<TFieldValues>
  formState: FormState<TFieldValues>
  resetField: UseFormResetField<TFieldValues>
  reset: UseFormReset<TFieldValues>
  resetDefaultValues: UseFormResetDefaultValues<TFieldValues>
  handleSubmit: UseFormHandleSubmit<TFieldValues, TTransformedValues>
  unregister: UseFormUnregister<TFieldValues>
  control: Control<TFieldValues, TContext, TTransformedValues>
  register: UseFormRegister<TFieldValues>
  setFocus: UseFormSetFocus<TFieldValues>
  subscribe: UseFormSubscribe<TFieldValues>
}
```

Typing a generic form wrapper with `UseFormReturn`:

```tsx
import type { FieldValues, UseFormReturn, SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => ReactNode
}

const Form = <TFormValues extends FieldValues>({
  onSubmit,
  children,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>()
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  )
}
```

UseFormProps:

```tsx
export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = Partial<{
  mode: Mode
  disabled: boolean
  reValidateMode: Exclude<Mode, "onTouched" | "all">
  defaultValues: DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>
  values: TFieldValues
  errors: FieldErrors<TFieldValues>
  resetOptions: Parameters<UseFormReset<TFieldValues>>[1]
  resolver: Resolver<TFieldValues, TContext, TTransformedValues>
  context: TContext
  shouldFocusError: boolean
  shouldUnregister: boolean
  shouldUseNativeValidation: boolean
  progressive: boolean
  criteriaMode: CriteriaMode
  delayError: number
  formControl?: Omit<
    UseFormReturn<TFieldValues, TContext, TTransformedValues>,
    "formState"
  >
  validate: ValidateForm<TFieldValues>
}>
```

ValidateForm:

```tsx
export type ValidateFormEventType =
  | "blur"
  | "focusout"
  | "change"
  | "submit"
  | "trigger"
  | "valid"

export type ValidateForm<TFormValues extends FieldValues> = (props: {
  formValues: TFormValues
  formState: FormState<TFormValues>
  eventType?: ValidateFormEventType
  name?: FieldPath<TFormValues> | FieldPath<TFormValues>[]
}) => FormValidateResult<TFormValues> | Promise<FormValidateResult<TFormValues>>

export type FormValidateResult<TFormValues> =
  | Partial<
      Record<
        keyof TFormValues,
        { message: string | string[] | boolean | undefined; type: string }
      >
    >
  | string
  | boolean
```

## Notes

- `ValidateForm` is the type of `useForm`'s `validate` option: form-level validation that runs alongside (or instead of) a `resolver`.
- Return `true` for a valid form. Returning a `string` sets `formState.errors.form`; returning an object keyed by field name sets `formState.errors.form.<fieldName>` for each entry.

## Related

- [Control](./control.md)
- [Resolver](./resolver.md)
- [Mode / RegisterOptions](./mode-register-options.md)
