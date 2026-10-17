# Resolver

A `Resolver` lets you plug in an external validation library (such as Zod, Yup, or Joi) in place of React Hook Form's built-in validation. It receives the current form values and must return `{ values, errors }`.

## Signature / Usage

```tsx
import { useForm, Resolver } from "react-hook-form"

type FormValues = {
  firstName: string
  lastName: string
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  }
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })
  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <input {...register("firstName")} placeholder="Bill" />
      {errors?.firstName && <p>{errors.firstName.message}</p>}

      <input {...register("lastName")} placeholder="Luo" />

      <input type="submit" />
    </form>
  )
}
```

## Notes

- Generic parameters shared by many types: `TContext` is the type of `useForm`'s `context` option, forwarded unchanged to the resolver; `TTransformedValues` is the shape the resolver produces after transforming data (defaults to `TFieldValues`).
- TypeScript 4.1 or above is required for React Hook Form.
- Source: https://react-hook-form.com/ts#Resolver

## Related

- [SubmitHandler / SubmitErrorHandler / FormSubmitHandler](./submit-handler.md)
- [UseFormReturn props](./use-form-return-props.md)
- [Custom Hook with Resolver](../advanced/custom-hook-resolver.md)
- [Schema Validation](../get-started/schema-validation.md)
