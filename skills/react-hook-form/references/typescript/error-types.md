# FieldError / FieldErrors / ErrorOption

Types describing validation errors: a single field error, the `errors` object of `formState`, and the error object accepted by `setError`.

## Signature / Usage

```tsx
export type FieldError = {
  type: LiteralUnion<keyof RegisterOptions, string>
  root?: FieldError
  ref?: Ref
  types?: MultipleFieldErrors
  message?: Message
}

export type FieldErrors<T extends FieldValues = FieldValues> = Partial<
  FieldErrorsImpl<DeepRequired<T>>
> & {
  root?: Record<string, GlobalError> & GlobalError
  form?: GlobalError
}

export type ErrorOption = {
  message?: Message
  type?: LiteralUnion<keyof RegisterOptions, string>
  types?: MultipleFieldErrors
}
```

## Notes

- `ErrorOption` is the error object accepted by `setError`.

## Related

- [UseFormReturn / UseFormProps / ValidateForm](./use-form-return-props.md)
- [UseFormRegister ... UseFormTrigger (method types)](./use-form-method-types.md)
