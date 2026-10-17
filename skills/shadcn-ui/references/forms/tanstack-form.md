---
source: https://ui.shadcn.com/docs/forms/tanstack-form
---

# TanStack Form

Build forms in React using TanStack Form and Zod, composed with the shadcn/ui `<Field />` components (library docs: https://tanstack.com/form).

## Signature / Usage

Approach: `useForm` from `@tanstack/react-form` for state, `form.Field` render-prop for controlled inputs, `<Field />` components for accessible markup, client-side Zod validation via `validators`.

```tsx
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
})

export function BugReportForm() {
  const form = useForm({
    defaultValues: {
      title: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success("Form submitted successfully")
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="title"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
    </form>
  )
}
```

## Options / Props

Validation strategies through the `validators` option:

| Mode | Description |
| --- | --- |
| `"onChange"` | Validation triggers on every change. |
| `"onBlur"` | Validation triggers on blur. |
| `"onSubmit"` | Validation triggers on submit. |

```tsx
const form = useForm({
  defaultValues: {
    title: "",
    description: "",
  },
  validators: {
    onSubmit: formSchema,
    onChange: formSchema,
    onBlur: formSchema,
  },
})
```

Binding per field type (inside `form.Field` with `isInvalid = field.state.meta.isTouched && !field.state.meta.isValid`):

| Field type | Binding | Error attribute |
| --- | --- | --- |
| Input / Textarea | `value={field.state.value}`, `onBlur={field.handleBlur}`, `onChange={(e) => field.handleChange(e.target.value)}` | `aria-invalid` on the control |
| Select | `name={field.name}`, `value={field.state.value}`, `onValueChange={field.handleChange}` | `aria-invalid` on `<SelectTrigger />` |
| Checkbox (boolean) | `checked={field.state.value}`, `onCheckedChange={(checked) => field.handleChange(checked === true)}` | `aria-invalid` on `<Checkbox />` |
| Checkbox (array) | `mode="array"` on `form.Field`; `field.pushValue(id)` / `field.removeValue(index)` | `aria-invalid` on `<Checkbox />` |
| Radio Group | `value={field.state.value}`, `onValueChange={field.handleChange}` | `aria-invalid` on `<RadioGroupItem />` |
| Switch | `checked={field.state.value}`, `onCheckedChange={field.handleChange}` | `aria-invalid` on `<Switch />` |

## Notes

- Adapted (not in the official docs): the official demo also has a `description` field (Textarea) that is not expanded in the local copy; the first snippet keeps only `title` so the schema, default values and inputs agree.
- Display errors with `<FieldError />`; add `data-invalid` to `<Field />` and `aria-invalid` to the control.
- The demos intentionally disable browser validation; the page recommends adding basic browser validation in production code.
- The page uses `zod v3`; TanStack Form integrates with Zod and other Standard Schema validation libraries through its validators API. Other validation modes are documented at https://tanstack.com/form/latest/docs/framework/react/guides/dynamic-validation.
- For checkbox groups, add `data-slot="checkbox-group"` to `<FieldGroup />`.
- Reset with `form.reset()`.
- Array fields: put `mode="array"` on the parent `form.Field`, address items with bracket notation `name={`emails[${index}].address`}`, add with `field.pushValue({ address: "" })`, remove with `field.removeValue(index)`; validate with Zod array methods.

```tsx
<Button
  type="button"
  variant="outline"
  size="sm"
  onClick={() => field.pushValue({ address: "" })}
  disabled={field.state.value.length >= 5}
>
  Add Email Address
</Button>
```

- Component imports (`@/components/ui/*`) refer to shadcn/ui components copied into your project, distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- For the form-library comparison on the same `<Field />` pattern, see skill react-hook-form; schemas are in skill zod; Server Action forms in skill nextjs-app.

## Related

- [Forms](./forms.md)
- [React Hook Form](./react-hook-form.md)
- [Formisch](./formisch.md)
- [Next.js](./next.md)
