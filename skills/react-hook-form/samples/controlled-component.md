# Controlled Component with Controller

Wrap third-party UI components (e.g., React Select, MUI TextField) using `Controller`.

```tsx
import { useForm, Controller } from "react-hook-form"
import ReactSelect from "react-select"

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
]

type FormValues = {
  framework: { value: string; label: string } | null
  email: string
}

export default function App() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {/* Controlled: third-party component */}
      <Controller
        name="framework"
        control={control}
        rules={{ required: "Please select a framework" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <ReactSelect {...field} options={options} />
            {error && <p>{error.message}</p>}
          </>
        )}
      />

      {/* Uncontrolled: native input */}
      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

## Notes

- `Controller` internally registers the field — do not also call `register` on the same field name
- The `field` object from `render` provides `onChange`, `onBlur`, `value`, `name`, and `ref`; spread it onto the component
- Never pass `undefined` to `field.onChange`; use `null` or `""` to clear a value
- Native inputs and `Controller` fields can coexist in the same form
