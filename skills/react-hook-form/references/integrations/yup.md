# React Hook Form with Yup

Integrations: https://react-hook-form.com/integrations/yup

Use [`yupResolver`](https://github.com/react-hook-form/resolvers#yup) to connect a Yup object schema to React Hook Form. The resolver validates before submission and maps Yup errors into [`formState.errors`](../api/useform-formstate.md).

## Signature / Usage

### Installation

```bash
npm install react-hook-form @hookform/resolvers yup
```

### Complete TypeScript example

```tsx
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Enter a valid email").required(),
  })
  .required()

type FormValues = yup.InferType<typeof schema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("name")} />
      {errors.name && <p role="alert">{errors.name.message}</p>}
      <input {...register("email")} />
      {errors.email && <p role="alert">{errors.email.message}</p>}
      <button type="submit">Send</button>
    </form>
  )
}
```

### Passing context to Yup

Pass dynamic validation context through `useForm`, not through the resolver's schema options. React Hook Form's context takes precedence.

```tsx
useForm<FormValues, { plan: "free" | "paid" }>({
  resolver: yupResolver(schema),
  context: { plan: "paid" },
})
```

### Common issues

- Use `yup.InferType<typeof schema>` to keep form values aligned with the schema.
- Decide whether Yup should cast values or whether inputs should use `valueAsNumber` and `setValueAs`.
- Avoid defining the same rule in both Yup and `register`.
- Set `criteriaMode: "all"` when the UI should show every failing rule for a field.

See [all schema resolvers](./resolvers.md), [`useForm`](../api/useform.md), and the [TypeScript guide](https://react-hook-form.com/ts).

## Notes

- Source: https://react-hook-form.com/integrations/yup (documentation master c0511c9, fetched 2026-11-14)
- `yupResolver` comes from `@hookform/resolvers`; Yup's own API is not covered by this skill.

## Related

- [useform](../api/useform.md)
- [useform-formstate](../api/useform-formstate.md)
- [resolvers](./resolvers.md)
- [zod](./zod.md)
