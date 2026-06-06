# Basic Form

Register inputs with `useForm` and handle submission with built-in validation.

```tsx
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  firstName: string
  email: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", { required: "First name is required" })}
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="submit" />
    </form>
  )
}
```

## Notes

- Spread the return value of `register` directly onto the input element to wire up ref, onChange, and onBlur
- `handleSubmit` runs validation before calling `onSubmit`; it absorbs the native submit event automatically
- Error messages are strings when passed as the second argument to a rule (e.g., `{ required: "message" }`)
- Each field name must be unique; use dot notation for nested objects (`"user.email"`)
