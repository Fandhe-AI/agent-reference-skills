# TypeScript Typed Form

Use `SubmitHandler`, `FieldPath`, and other utility types for a fully typed form.

```tsx
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  FieldPath,
  Control,
  useController,
} from "react-hook-form"

interface FormValues {
  username: string
  age: number
  role: "admin" | "user"
}

// Reusable typed input built with useController
function TypedInput<T extends Record<string, unknown>>({
  name,
  control,
  label,
}: {
  name: FieldPath<T>
  control: Control<T>
  label: string
}) {
  const { field, fieldState } = useController({ name, control })
  return (
    <label>
      {label}
      <input {...field} />
      {fieldState.error && <span>{fieldState.error.message}</span>}
    </label>
  )
}

export default function App() {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: { username: "", age: 18, role: "user" },
  })

  const onValid: SubmitHandler<FormValues> = (data) => {
    console.log("valid:", data)
  }

  const onInvalid: SubmitErrorHandler<FormValues> = (errors) => {
    console.warn("errors:", errors)
  }

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <TypedInput<FormValues> name="username" control={control} label="Username" />

      <input
        type="number"
        {...register("age", { valueAsNumber: true, min: 0 })}
      />

      <select {...register("role")}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  )
}
```

## Notes

- `SubmitHandler<T>` types the first `handleSubmit` callback; `SubmitErrorHandler<T>` types the optional second callback
- `FieldPath<T>` constrains a `name` prop to only valid dot-notation keys of `T`, providing autocomplete and refactor safety
- `useController` is the hook equivalent of `Controller` — useful when building reusable input components
- TypeScript 4.3+ is required; generic string literal path types depend on template literal types
