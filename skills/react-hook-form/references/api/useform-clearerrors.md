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

## Related

- [useForm — setError](./useform-seterror.md)
- [useForm — formState](./useform-formstate.md)
