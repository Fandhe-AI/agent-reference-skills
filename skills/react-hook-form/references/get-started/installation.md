# Installation & Example

Quick start: React Hook Form manages form values, validation, errors, and submission while working with standard React inputs. A minimal form uses `register`, `handleSubmit`, and `formState.errors`.

## Signature / Usage

```bash
npm install react-hook-form
```

```tsx
import { useForm, type SubmitHandler } from "react-hook-form"

type FormValues = {
  email: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "" },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

## Notes

- The example registers an email field, validates it when the form is submitted, and passes valid data to `onSubmit`.
- It uses four fundamental pieces: `useForm` creates the form and its methods; `register` connects a native input to the form and attaches validation rules; `handleSubmit` validates the form before it calls your submit handler; `formState.errors` contains the current validation errors.
- Use `defaultValues` for the initial value of every field. This gives React Hook Form one consistent baseline for dirty state, resetting, and controlled components.
- The official page also shows the JS version of the same example (no type annotations, `useForm({ defaultValues: { email: "" } })`).
- Next steps: validate native inputs (Register fields, Apply validation); Zod / Yup / other schema libraries (Schema validation); shadcn/ui, MUI, React-Select, AntD (Controlled inputs); submit to an API or Server Action (Form component); React Native; TypeScript.
- Source: https://react-hook-form.com/get-started#Quickstart (documentation master c0511c9, fetched 2026-11-14)

## Related

- [Register fields](./register-fields.md)
- [Apply validation](./apply-validation.md)
- [Schema validation](./schema-validation.md)
- [Controlled inputs](./controlled-inputs.md)
- [Integrating with services](./integrating-services.md)
- [React Native](./react-native.md)
- [TypeScript](./typescript-quickstart.md)
