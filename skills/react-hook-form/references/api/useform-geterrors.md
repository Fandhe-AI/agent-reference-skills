# useForm — getErrors

Reads the errors currently stored in the form without running validation, subscribing to error changes, or triggering re-renders (Since 7.86.0).

## Signature / Usage

```tsx
import { useForm } from "react-hook-form"

type FormInputs = {
  email: string
  user: {
    firstName: string
  }
}

export default function App() {
  const { register, getErrors } = useForm<FormInputs>({
    mode: "onChange",
  })

  const readErrors = () => {
    const allErrors = getErrors()
    const userErrors = getErrors("user")
    const [emailError, firstNameError] = getErrors(["email", "user.firstName"])

    console.log({
      allErrors,
      userErrors,
      emailError,
      firstNameError,
    })
  }

  return (
    <form>
      <input {...register("email", { required: true })} />
      <input {...register("user.firstName", { required: true })} />
      <button type="button" onClick={readErrors}>
        Read errors
      </button>
    </form>
  )
}
```

## Options / Props

`getErrors: UseFormGetErrors`

| Name | Type | Description |
|------|------|-------------|
| `name` | `undefined` | Returns all currently stored errors. |
| `name` | `string` | Returns the error at a field, parent, or global error path (`root`, `root.*`, `form`, or `form.*`), or `undefined`. Parent paths may return a nested error subtree. |
| `name` | `string[]` | Returns one result for each path in the same order. Missing errors remain `undefined`. |

## Notes

- Use `formState.errors` or `useFormState` for reactive error UI.
- Treat returned errors as read-only. Use `setError` and `clearErrors` to update the form's stored errors.
- Source: https://react-hook-form.com/docs/useform/geterrors (documentation master c0511c9, fetched 2026-11-14)

### Tips

- Use `getErrors` in event handlers and effects where you need the current errors but do not want a re-render. For example, in a multi-step form, find which steps have errors after validation:

```javascript
const onNext = async () => {
  await trigger()
  const [account, address] = getErrors(["account", "address"])
  setStepsWithErrors({ account: !!account, address: !!address })
}
```

- Do not render from `getErrors`. The value is not reactive, so the UI does not update when errors change. Use [formState.errors](./useform-formstate.md) or [ErrorMessage](./errormessage.md) for UI.

### Troubleshooting

#### `getErrors()` is empty even though a field value is invalid

- Why: `getErrors` reads errors that are already stored; it does not run validation. If the current validation mode has not checked the field yet, there is no error to return.
- Fix: Validate first, then read the result:

```javascript
await trigger("email")
const emailError = getErrors("email")
```

#### An error rendered with `getErrors` does not update

- Why: `getErrors` intentionally does not subscribe or cause a re-render. It is a snapshot API for handlers and effects.
- Fix: Render errors with [ErrorMessage](./errormessage.md), `formState.errors`, or `useFormState({ name })`. Keep `getErrors` for imperative reads.

## Related

- [useForm — setError](./useform-seterror.md)
- [useForm — clearErrors](./useform-clearerrors.md)
- [useForm — formState](./useform-formstate.md)
- [useForm — trigger](./useform-trigger.md)
- [ErrorMessage](./errormessage.md)
