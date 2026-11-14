# React Hook Form with Zod

Integrations: https://react-hook-form.com/integrations/zod

Use [`zodResolver`](https://github.com/react-hook-form/resolvers#zod) to validate form values against a Zod schema. Zod issues become React Hook Form errors available through [`formState.errors`](../api/useform-formstate.md).

## Signature / Usage

### Installation

```bash
npm install react-hook-form @hookform/resolvers zod
```

### Complete TypeScript example

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  age: z.number().min(18, "You must be at least 18"),
})

type FormValues = z.infer<typeof schema>

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <input type="number" {...register("age", { valueAsNumber: true })} />
      {errors.age && <p role="alert">{errors.age.message}</p>}
      <button type="submit">Save</button>
    </form>
  )
}
```

`valueAsNumber` converts the browser's input string before Zod receives it. Without it, a `z.number()` schema receives a string unless the schema performs its own coercion.

### Input and output types

Most schemas infer the submitted output automatically. When a schema transforms its input, declare both sides explicitly:

```tsx
useForm<z.input<typeof schema>, unknown, z.output<typeof schema>>({
  resolver: zodResolver(schema),
})
```

Use `z.input` for values entered by the form and `z.output` for the parsed data received by `handleSubmit`.

### Common issues

- Keep validation rules in the schema instead of duplicating them in `register`.
- Use `z.coerce.number()` or `valueAsNumber` for numeric HTML inputs.
- Give controlled components a defined `defaultValue` or `defaultValues` entry.
- For all messages from a field, use `criteriaMode: "all"` and render the collected error types.

See [all schema resolvers](./resolvers.md), [`useForm`](../api/useform.md), and the [TypeScript guide](https://react-hook-form.com/ts).

## Notes

- Source: https://react-hook-form.com/integrations/zod (documentation master c0511c9, fetched 2026-11-14)
- Zod's own schema API is covered by the zod skill; this page covers only `zodResolver` and its use with `useForm`.

## Related

- [useform](../api/useform.md)
- [useform-formstate](../api/useform-formstate.md)
- [resolvers](./resolvers.md)
- [yup](./yup.md)
