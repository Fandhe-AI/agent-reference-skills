---
source: https://ui.shadcn.com/docs/forms/formisch
---

# Formisch

Build forms in React using Formisch and Valibot, composed with the shadcn/ui `<Field />` components (library docs: https://formisch.dev).

## Signature / Usage

Approach: `useForm` from `@formisch/react` for state, `<Form />` wrapping the native `<form>`, Formisch's render-prop `<Field />` (imported as `FormischField`) for controlled inputs, Valibot schemas passed directly to `useForm` (no resolver), type-safe field paths inferred from the schema.

```tsx
import { Form, Field as FormischField, useForm } from "@formisch/react"
import type { SubmitHandler } from "@formisch/react"
import * as v from "valibot"

const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(5, "Bug title must be at least 5 characters."),
    v.maxLength(32, "Bug title must be at most 32 characters.")
  ),
})

export function BugReportForm() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      title: "",
    },
  })

  const handleSubmit: SubmitHandler<typeof FormSchema> = (output) => {
    // Do something with the validated form values.
    console.log(output)
  }

  return (
    <Form of={form} onSubmit={handleSubmit}>
      <FieldGroup>
        <FormischField of={form} path={["title"]}>
          {(field) => (
            <Field data-invalid={field.errors !== null}>
              <FieldLabel htmlFor="form-title">Bug Title</FieldLabel>
              <Input
                {...field.props}
                id="form-title"
                value={field.input}
                aria-invalid={field.errors !== null}
              />
              {field.errors && (
                <FieldError errors={field.errors.map((message) => ({ message }))} />
              )}
            </Field>
          )}
        </FormischField>
      </FieldGroup>
    </Form>
  )
}
```

## Options / Props

Validation timing on `useForm` (first validation vs. subsequent):

| Option | Value | Description |
| --- | --- | --- |
| `validate` | `"submit"` | Validate on form submission (default). |
| `validate` | `"blur"` | Validate when a field loses focus. |
| `validate` | `"input"` | Validate on every input change. |
| `validate` | `"initial"` | Validate immediately on form creation. |
| `revalidate` | `"input"` | Revalidate on every input change after the first run (default). |
| `revalidate` | `"blur"` | Revalidate on blur after the first run. |
| `revalidate` | `"submit"` | Revalidate only on form submission. |

```tsx
const form = useForm({
  schema: FormSchema,
  validate: "blur",
  revalidate: "input",
})
```

Binding per element kind:

| Element | Binding |
| --- | --- |
| Native HTML (`<Input />`, `<Textarea />`) | spread `field.props` and provide `value={field.input}`; Formisch wires `name`, `ref`, `onChange`, `onBlur`, `onFocus` |
| Component-library inputs (`<Select />`, `<Checkbox />`, `<RadioGroup />`, `<Switch />`) | read `field.input` and call `field.onChange(value)` |

## Notes

- Adapted (not in the official docs): the official demo also has a `description` field (Textarea) that is not expanded in the local copy; the snippet above keeps only `title` so the schema, initial input and inputs agree.
- Form operations are top-level functions; the first parameter is always the form store and the second (if needed) a config object.

```ts
import { getInput, insert, reset, submit } from "@formisch/react"

// Read a field value
const email = getInput(form, { path: ["email"] })

// Reset the form with new initial values
reset(form, { initialInput: { email: "", password: "" } })

// Move an item in a field array
move(form, { path: ["items"], from: 0, to: 3 })
```

- Methods named on the page: reading (`getInput`, `getErrors`), writing (`setInput`, `setErrors`), control (`submit`, `validate`, `focus`), arrays (`insert`, `remove`, `move`, `swap`, `replace`). Full reference: https://formisch.dev/react/guides/form-methods.
- Formisch ships its own `Field`; the examples import it as `FormischField` to avoid a clash with the shadcn `Field`.
- `<Form />` calls `event.preventDefault()`, runs validation, and only invokes `onSubmit` when data is valid; `output` is typed from the schema.
- Errors are an array of strings (`field.errors`, `null` when valid); map to the shape `<FieldError />` expects: `field.errors.map((message) => ({ message }))`. Add `data-invalid` to `<Field />` and `aria-invalid` to the control.
- Reset: `reset(form)`; also `reset(form, { initialInput: { title: "", description: "" } })` or `reset(form, { initialInput: serverData, keepInput: true })` to sync the baseline while keeping the user's edits.
- Array fields use `<FieldArray of={form} path={["emails"]}>` whose `items` array gives stable keys; add with `insert(form, { path: ["emails"], initialInput: { address: "" } })`, remove with `remove(form, { path: ["emails"], at: index })`.

```tsx
<FieldArray of={form} path={["emails"]}>
  {(fieldArray) => (
    <FieldGroup className="gap-4">
      {fieldArray.items.map((item, index) => (
        <FormischField key={item} of={form} path={["emails", index, "address"]}>
          {(field) => /* ... */}
        </FormischField>
      ))}
    </FieldGroup>
  )}
</FieldArray>
```

- Demos intentionally disable browser validation; add basic browser validation in production code. For checkbox groups, add `data-slot="checkbox-group"` to `<FieldGroup />`.
- shadcn/ui `@/components/ui/*` imports are copy-in components, distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). Valibot is not covered by another skill here; Zod-based guides are in skill zod.

## Related

- [Forms](./forms.md)
- [React Hook Form](./react-hook-form.md)
- [TanStack Form](./tanstack-form.md)
- [Next.js](./next.md)
