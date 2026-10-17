# Mode / RegisterOptions

`Mode` is the validation trigger mode type; `RegisterOptions` is the options type of `register`.

## Signature / Usage

```tsx
export type ValidationMode = typeof VALIDATION_MODE

export type Mode = keyof ValidationMode

export type RegisterOptions<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<{
  required: Message | ValidationRule<boolean>
  min: ValidationRule<number | string>
  max: ValidationRule<number | string>
  maxLength: ValidationRule<number>
  minLength: ValidationRule<number>
  validate:
    | Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues>
    | Record<
        string,
        Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues>
      >
  value: FieldPathValue<TFieldValues, TFieldName>
  setValueAs: (value: any) => any
  shouldUnregister?: boolean
  onChange?: (event: any) => void
  onBlur?: (event: any) => void
  disabled: boolean
  deps: FieldPath<TFieldValues> | FieldPath<TFieldValues>[]
}> &
  (
    | {
        pattern?: ValidationRule<RegExp>
        valueAsNumber?: false
        valueAsDate?: false
      }
    | {
        pattern?: undefined
        valueAsNumber?: false
        valueAsDate?: true
      }
    | {
        pattern?: undefined
        valueAsNumber?: true
        valueAsDate?: false
      }
  )
```

## Notes

- `pattern` is only allowed when neither `valueAsNumber` nor `valueAsDate` is `true` (discriminated union).
- Source: https://react-hook-form.com/ts#Mode, https://react-hook-form.com/ts#RegisterOptions

## Related

- [UseFormReturn / UseFormProps / ValidateForm](./use-form-return-props.md)
- [Controller types](./controller-types.md)
