# useForm — setError

Manually sets an error on a field. Call it multiple times to set errors on multiple fields.

## Signature / Usage

```tsx
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type FormInputs = {
  username: string
}

const App = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>()
  const onSubmit = (data: FormInputs) => {
    console.log(data)
  }

  useEffect(() => {
    setError("username", {
      type: "manual",
      message: "Dont Forget Your Username Should Be Cool!",
    })
  }, [setError])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      {errors.username && <p>{errors.username.message}</p>}

      <input type="submit" />
    </form>
  )
}
```

Multiple fields (one call per field), multiple messages on one field via `types`, and server error:

```javascript
inputs.forEach(({ name, type, message }) => setError(name, { type, message }))

// criteriaMode: "all"
setError("lastName", {
  types: { required: "This is required", minLength: "This is minLength" },
})

setError("root.serverError", { type: String(response.status) })
```

## Options / Props

`setError: UseFormSetError`

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Input's name. |
| `error.type` | `string` | Optional. Identifier for the error source (e.g. `"required"`, `"custom"`, `"serverError"`). Exposed as `errors[name].type`. |
| `error.message` | `string` | Optional. Human-readable error message. Exposed as `errors[name].message`. |
| `error.types` | `MultipleFieldErrors` | Optional. `Record<string, string \| boolean>` assigning multiple messages to one field, keyed by error type. Exposed as `errors[name].types`. Set `criteriaMode: "all"` on the form if you also want built-in/schema validation to populate `types`. |
| `options.shouldFocus` | `boolean` | Focus the input while setting an error. Only works when the input's reference is registered; does not work for custom register. |

## Notes

- The error is not persisted for an input if it passes `register`'s rules (e.g. `register("registerInput", { minLength: 4 })` then `setError(...)` passes validation once minLength is met).
- An error not associated with an input field persists until cleared with `clearErrors`. This is only applicable for built-in validation at the field level.
- Since 7.43.0, set a server or global error with `root` as the key (`setError("root.serverError", { type: "400" })`). This type of error does not persist with each submission.
- `shouldFocus` does not work when an input has been disabled.
- This method forces `formState.isValid` to `false`; however, `isValid` is always derived from the validation results of registered inputs or schema.
- Avoid `type`, `root`, `ref`, `types`, `message`, or `form` as field names; they collide with the internal shape of `FieldError`/`GlobalError`.
- `setError` sets exactly one error per call.
- Source: https://react-hook-form.com/docs/useform/seterror (documentation master c0511c9, fetched 2026-11-14)
- Scope of the official troubleshooting statement above (verbatim): it describes re-validation of registered fields and `root.*` errors; an error set with `setError` on a path that is not registered is kept until `clearErrors` is called and still blocks submission, as stated in the other notes on this page.
- `error.type` for a server error is a string: the official server-error example now sets `type: String(response.status)` and compares with `errors.root?.serverError?.type === "400"`.

### Tips

- Map field errors from your API onto the form, and focus the first one:

  ```javascript
  const onSubmit = async (data) => {
    const response = await save(data)
    if (!response.ok) {
      const { fieldErrors } = await response.json() // e.g. { email: "Already taken" }
      Object.entries(fieldErrors).forEach(([name, message], index) => {
        setError(
          name,
          { type: "server", message },
          { shouldFocus: index === 0 }
        )
      })
    }
  }
  ```

- Use `root.*` for errors that do not belong to one field, such as "Network error" or "Too many attempts". Root errors are cleared on the next submission. Show them with [ErrorMessage](./errormessage.md) and `name="root.server"`.
- Give server errors a `type` such as `"server"`. Then your UI can show them differently from client-side validation errors.

### Troubleshooting

#### An error set with `setError` disappears on submit and doesn't stop `onSubmit`

- Why: `setError` adds an error to the form state, but it does not add a validation rule. On submit, `handleSubmit` validates the form again and clears errors that are not backed by a rule, including `root.*` errors. If every field passes, your `onSubmit` runs.
- Fix: Use `setError` to show errors that come back from the server after a submit. For errors that must block submission, add the check as a validation rule instead:

```javascript
register("username", {
  validate: async (value) =>
    (await isUsernameFree(value)) || "This username is taken",
})
```

## Related

- [useForm — clearErrors](./useform-clearerrors.md)
- [useForm — getErrors](./useform-geterrors.md)
- [useForm — handleSubmit](./useform-handlesubmit.md)
