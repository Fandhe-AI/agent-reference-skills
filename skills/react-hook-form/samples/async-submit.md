# Async Form Submission

Submit form data to an API endpoint with loading state and error handling.

```tsx
import { useForm } from "react-hook-form"

type FormValues = {
  username: string
  password: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const { message } = await res.json()
        // Surface server error on a specific field
        setError("username", { type: "server", message })
        return
      }

      // Handle success (e.g., redirect)
    } catch {
      setError("root", { type: "network", message: "Network error — please try again" })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: "Username is required" })} />
      {errors.username && <p>{errors.username.message}</p>}

      <input type="password" {...register("password", { required: "Password is required" })} />
      {errors.password && <p>{errors.password.message}</p>}

      {errors.root && <p role="alert">{errors.root.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in…" : "Log in"}
      </button>
    </form>
  )
}
```

## Notes

- `isSubmitting` is `true` while the async `onSubmit` is pending — use it to disable the button and prevent double-submits
- `setError` places a server-returned error onto a specific field or onto `errors.root` for form-level errors
- `handleSubmit` does not swallow errors thrown inside `onSubmit`; always wrap async calls in `try-catch`
- `disabled` inputs return `undefined` in form data; use `readOnly` if the value must be submitted
