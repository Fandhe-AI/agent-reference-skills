# SubmitHandler / SubmitErrorHandler / FormSubmitHandler

Types for the callbacks passed to `handleSubmit` (`SubmitHandler`, `SubmitErrorHandler`) and for the `Form` component's `onSubmit` prop (`FormSubmitHandler`).

## Signature / Usage

SubmitHandler:

```tsx
export type SubmitHandler<T, TResult = unknown> = (
  data: T,
  event?: React.BaseSyntheticEvent
) => TResult
```

```tsx
import { useForm, SubmitHandler } from "react-hook-form"

type FormValues = {
  firstName: string
  lastName: string
  email: string
}

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="email" {...register("email")} />

      <input type="submit" />
    </form>
  )
}
```

SubmitErrorHandler:

```tsx
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

type FormValues = {
  firstName: string
  lastName: string
  email: string
}

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)
  const onError: SubmitErrorHandler<FormValues> = (errors) =>
    console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { minLength: 2 })} />
      <input type="email" {...register("email")} />

      <input type="submit" />
    </form>
  )
}
```

FormSubmitHandler:

```tsx
export type FormSubmitHandler<TTransformedValues> = (payload: {
  data: TTransformedValues
  event?: React.BaseSyntheticEvent
  formData: FormData
  formDataJson: string
  method?: "post" | "put" | "delete"
}) => unknown | Promise<unknown>
```

## Notes

- `FormSubmitHandler` is the type of the `Form` component's `onSubmit` prop. Unlike `SubmitHandler`, the payload includes the raw `FormData` and `formDataJson` from the submission.
- Source: https://react-hook-form.com/ts#SubmitHandler, https://react-hook-form.com/ts#SubmitErrorHandler, https://react-hook-form.com/ts#FormSubmitHandler
- `SubmitHandler` takes a second generic `TResult` (default `unknown`); `handleSubmit` returns `Promise<Awaited<TResult> | undefined>`, so the value returned from your submit callback is available to the caller.

### Changes since v7.90

- v7.92.0: "Fix TypeScript type regression (#13963)"
- v7.92.0: "Fix `handleSubmit` not supporting nullish and primitive transformed values with disabled fields (#13999, #14011)"

## Related

- [Resolver](./resolver.md)
- [UseForm method types](./use-form-method-types.md)
- [useForm — handleSubmit](../api/useform-handlesubmit.md)
- [useForm — Form](../api/useform-form.md)
