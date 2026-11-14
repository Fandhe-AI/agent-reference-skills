# useForm — handleSubmit

Receives the form data if form validation is successful.

## Signature / Usage

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
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="email" {...register("email")} />

      <input type="submit" />
    </form>
  )
}
```

Resolver with transformed values (use `useForm`'s third generic `TTransformedValues`):

```tsx
const { register, handleSubmit } = useForm<FormInput, unknown, FormOutput>({
  resolver: zodResolver(schema),
})

const onSubmit: SubmitHandler<FormOutput> = (data) => {
  console.log(data.isEmail, data.isPhone, data.value)
}
```

## Options / Props

`handleSubmit: UseFormHandleSubmit`

| Name | Type | Description |
|------|------|-------------|
| SubmitHandler | `(data: TFieldValues, e?: BaseSyntheticEvent) => TResult \| Promise<TResult>` | A successful callback. |
| SubmitErrorHandler | `(errors: FieldErrors, e?: BaseSyntheticEvent) => unknown \| Promise<unknown>` | An error callback. |

## Notes

- Since 7.84.0, the promise returned by `handleSubmit(onValid)(event)` resolves with whatever `onValid` returns, instead of discarding it.

  ```javascript
  const onValid = (data) => ({ id: data.id })
  const result = await handleSubmit(onValid)() // result: { id: string } | undefined
  ```

- `disabled` inputs appear as `undefined` values in form values. To prevent edits and retain the value, use `readOnly` or disable the entire `<fieldset />`.
- `handleSubmit` does not swallow errors that occur inside your `onSubmit` callback. Use try/catch inside async requests and `setError` in the catch block to register a server-side error; this also ensures `formState.isSubmitSuccessful` is set to `false`.

  ```javascript
  const onSubmit = async (data) => {
    try {
      // await fetch()
    } catch (e) {
      setError("root.serverError", {
        type: e.status,
        message: e.message,
      })
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)} />
  ```

- Without the third generic, the callback is typed as the field input type, causing errors when accessing properties transformed by a resolver (Zod, Yup, Joi, custom).

## Related

- [useForm — setError](./useform-seterror.md)
- [useForm](./useform.md)
