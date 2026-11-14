# useForm — clearErrors

Manually clear errors in the form.

## Signature / Usage

```tsx
import { useForm } from "react-hook-form"

type FormInputs = {
  firstName: string
  lastName: string
  username: string
}

const App = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<FormInputs>()

  const onSubmit = (data: FormInputs) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
      <input {...register("username", { required: true })} />
      <button type="button" onClick={() => clearErrors("firstName")}>
        Clear First Name Errors
      </button>
      <button
        type="button"
        onClick={() => clearErrors(["firstName", "lastName"])}
      >
        Clear First and Last Name Errors
      </button>
      <button type="button" onClick={() => clearErrors()}>
        Clear All Errors
      </button>
      <input type="submit" />
    </form>
  )
}
```

## Options / Props

`clearErrors: UseFormClearErrors`

| Type | Description | Example |
|------|-------------|---------|
| `undefined` | Remove all errors. | `clearErrors()` |
| `string` | Remove single error (a single field or by key name). | `clearErrors("yourDetails.firstName")` |
| `string[]` | Remove multiple errors. | `clearErrors(["yourDetails.lastName"])` |

```javascript
register("test.firstName", { required: true })
register("test.lastName", { required: true })
clearErrors("test") // will clear both errors from test.firstName and test.lastName
clearErrors("test.firstName") // for clear single input error
```

## Notes

- This method does not affect the validation rules attached to inputs and does not impact `formState.isValid`.
- Source: https://react-hook-form.com/docs/useform/clearerrors (documentation master c0511c9, fetched 2026-11-14)

### Tips

- Clear a server error as soon as the user starts to fix it:

```javascript
<input
  {...register("email", {
    onChange: () => clearErrors("root.server"),
  })}
/>
```

- `clearErrors("root")` clears every root error, for example `root.server` and `root.network`, because it removes everything under that path.
- `clearErrors` does not re-validate. If a field is still invalid, its error comes back the next time validation runs. To check a field again right away, use [trigger](./useform-trigger.md).

### Troubleshooting

#### The error comes back after calling `clearErrors`

- Why: `clearErrors` removes the stored error, but it does not change the field value or its validation rules. The next blur, change, or submit validates the same invalid value and creates the error again.
- Fix: Correct the value before clearing the error, or change the validation rule. To immediately check the current value again, call `trigger("fieldName")` instead of clearing the error.

#### `isValid` stays `false` after all errors are cleared

- Why: `isValid` is derived from validation, not from whether the `errors` object was manually emptied. Calling `clearErrors` does not run validation or make an invalid form valid.
- Fix: Fix the invalid values and call `trigger()` if you need to recompute validity immediately.

## Related

- [useForm — trigger](./useform-trigger.md)
- [useForm — setError](./useform-seterror.md)
- [useForm — formState](./useform-formstate.md)
