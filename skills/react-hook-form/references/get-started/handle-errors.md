# Handle errors

React Hook Form provides an `errors` object (via `formState.errors`) to show errors in the form. The type of `errors` follows the given validation constraints.

## Signature / Usage

```javascript
import { useForm } from "react-hook-form"

export default function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", { required: true })}
        aria-invalid={errors.firstName ? "true" : "false"}
      />
      {errors.firstName?.type === "required" && (
        <p role="alert">First name is required</p>
      )}

      <input
        {...register("mail", { required: "Email Address is required" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />
      {errors.mail && <p role="alert">{errors.mail.message}</p>}

      <input type="submit" />
    </form>
  )
}
```

## Notes

- Source: https://react-hook-form.com/get-started#Handleerrors

## Related

- [useForm — formState](../api/useform-formstate.md)
- [ErrorMessage](../api/errormessage.md)
