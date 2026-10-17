---
source: https://ui.shadcn.com/docs/forms/react-hook-form
---

# React Hook Form

Build forms in React using React Hook Form and Zod, composed with the shadcn/ui `<Field />` components (library docs: https://react-hook-form.com).

## Signature / Usage

Approach: `useForm` for form state, `<Controller />` for controlled inputs, `<Field />` components for accessible markup, and client-side validation with Zod via `zodResolver`.

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
})

export function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Login button not working on mobile"
                autoComplete="off"
              />
              <FieldDescription>
                Provide a concise title for your bug report.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}
```

## Options / Props

Validation modes, set with `mode` on `useForm`:

| Mode | Description |
| --- | --- |
| `"onChange"` | Validation triggers on every change. |
| `"onBlur"` | Validation triggers on blur. |
| `"onSubmit"` | Validation triggers on submit (default). |
| `"onTouched"` | Validation triggers on first blur, then on every change. |
| `"all"` | Validation triggers on blur and change. |

```tsx
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  mode: "onChange",
})
```

Binding per field type (all inside `<Controller />` with `<Field data-invalid={fieldState.invalid}>`):

| Field type | Binding | Error attribute |
| --- | --- | --- |
| Input | spread `field` onto `<Input />` | `aria-invalid` on `<Input />` |
| Textarea | spread `field` onto `<Textarea />` | `aria-invalid` on `<Textarea />` |
| Select | `name={field.name}`, `value={field.value}`, `onValueChange={field.onChange}` on `<Select />` | `aria-invalid` on `<SelectTrigger />` |
| Checkbox (array) | `checked={field.value.includes(id)}`, `onCheckedChange` building a new array and calling `field.onChange` | `aria-invalid` on `<Checkbox />` |
| Radio Group | `value={field.value}`, `onValueChange={field.onChange}` on `<RadioGroup />` | `aria-invalid` on `<RadioGroupItem />` |
| Switch | `checked={field.value}`, `onCheckedChange={field.onChange}` on `<Switch />` | `aria-invalid` on `<Switch />` |

## Notes

- Adapted (not in the official docs): the official demo also has a `description` field (Textarea) that is not expanded in the local copy; the snippet above keeps only `title` so the schema, default values and inputs agree.
- Display errors with `<FieldError />`. For styling and accessibility, add `data-invalid` to `<Field />` and `aria-invalid` to the control (`<Input />`, `<SelectTrigger />`, `<Checkbox />`, etc.).
- The demos intentionally disable browser validation to show schema validation; the page recommends adding basic browser validation in production code.
- The page uses `zod v3`; any Standard Schema validation library supported by React Hook Form can replace it.
- For checkbox groups, add `data-slot="checkbox-group"` to `<FieldGroup />` for proper styling and spacing.
- Reset with `form.reset()` (restores default values).
- Array fields: use `useFieldArray({ control: form.control, name: "emails" })` for `fields`, `append`, `remove`; map `fields` into `<Controller />` using `field.id` as the key and `name={`emails.${index}.address`}`. Wrap items in `<FieldSet />` with `<FieldLegend />` and `<FieldDescription />`. Validate with `z.array(...)` `.min()` / `.max()`; root array errors are read from `form.formState.errors.emails?.root`.
- Example array snippet from the page:

```tsx
const { fields, append, remove } = useFieldArray({
  control: form.control,
  name: "emails",
})
```

- Component-library imports (`@/components/ui/field`, `input`, `input-group`, `select`, `checkbox`, `radio-group`, `switch`) refer to shadcn/ui components copied into your project, distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- React Hook Form API itself is in skill react-hook-form, Zod schemas in skill zod, and Next.js Server Action forms in skill nextjs-app.

## Related

- [Forms](./forms.md)
- [TanStack Form](./tanstack-form.md)
- [Formisch](./formisch.md)
- [Next.js](./next.md)
