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
- `formState.isSubmitting` stays `true` until the promise returned by `onSubmit` settles, so `await` (or return) your async work:

  ```javascript
  const onSubmit = async (data) => {
    await fetch("/api", { method: "POST", body: JSON.stringify(data) }) // ✅ isSubmitting stays true until this resolves
  }
  ```

- To submit from a button outside the `<form>`, either link the button to the form with the native `form` attribute, or call the returned function directly:

  ```javascript
  <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>...</form>

  <button type="submit" form="profile-form">Save</button> // ✅ native form attribute
  <button type="button" onClick={handleSubmit(onSubmit)}>Save</button> // ✅ call handleSubmit directly
  ```

- React's `submit` event bubbles through the component tree, including portals. If a form is rendered inside another form (for example in a modal), stop propagation so the outer form doesn't submit too:

  ```javascript
  <form
    onSubmit={(event) => {
      event.stopPropagation()
      handleSubmit(onInnerSubmit)(event)
    }}
  />
  ```

- For submitting with React Server Actions or `useActionState`, see [Server Actions](../advanced/server-actions.md). To test your submit flow, see [Testing Form](../advanced/testing-form.md).
- Source: https://react-hook-form.com/docs/useform/handlesubmit (documentation master c0511c9, fetched 2026-11-14)

### Tips

- `handleSubmit` does not block a second submission while the first one is still pending. Disable the submit button with `formState.isSubmitting`, or check it at the start of your handler.
- Use the second argument, `onInvalid`, to react to failed validation, for example to log analytics or open the section that contains the first error:

  ```javascript
  handleSubmit(onValid, (errors) => {
    analytics.track("form_invalid", { fields: Object.keys(errors) })
  })
  ```

- Transform the data inside `onValid` (or in your resolver) and not in the inputs. Inputs keep their raw values, and you send the shape your API needs.
- When you call `handleSubmit(onValid)()` without an event, nothing calls `preventDefault`. Use this to submit from a keyboard shortcut or a timer.

### Troubleshooting

#### `onSubmit` is never called and nothing happens

- Why: Validation failed. `handleSubmit` only calls your handler when every field is valid. If you do not render `errors`, the form looks like it ignores the click.
- Fix: Render `formState.errors`, or pass a second callback to see what failed:

```javascript
<form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
```

#### The page reloads and `onSubmit` never runs

- Why: `handleSubmit(onSubmit)` returns the submit handler. Wrapping it in an arrow function, as in `onSubmit={() => handleSubmit(onSubmit)}`, creates that handler but never calls it, so the browser submits the form natively and reloads the page.
- Fix: Pass the result directly:

```javascript
<form onSubmit={handleSubmit(onSubmit)}>
```

#### An error thrown in `onSubmit` is not shown to the user

- Why: If `onSubmit` throws (or its promise rejects), `handleSubmit` rethrows the error and sets `isSubmitSuccessful` to `false`. Nothing is added to `formState.errors`.
- Fix: Catch the error and store it with [setError](./useform-seterror.md) under a `root` key:

```javascript
const onSubmit = async (data) => {
  try {
    await save(data)
  } catch {
    setError("root.server", { message: "Could not save. Try again." })
  }
}

{
  errors.root?.server && <p role="alert">{errors.root.server.message}</p>
}
```

### Changes since v7.90

From the v7.91.0 release notes:

- "Fix `handleSubmit` leaving `isSubmitting` active when validation throws (#13905)"

From the v7.92.0 release notes:

- "Fix rejected submission callbacks with falsy rejection reasons (#13967)"
- "Fix `handleSubmit` incorrectly updating form state after `reset()` during asynchronous callbacks (#13991)"
- "Fix `handleSubmit` not supporting nullish and primitive transformed values with disabled fields (#13999, #14011)"

## Related

- [useForm — setError](./useform-seterror.md)
- [useForm](./useform.md)
