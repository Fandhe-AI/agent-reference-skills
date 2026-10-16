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

## Related

- [useForm — setError](./useform-seterror.md)
- [useForm — clearErrors](./useform-clearerrors.md)
- [useForm — formState](./useform-formstate.md)
