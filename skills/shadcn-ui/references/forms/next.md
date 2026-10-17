---
source: https://ui.shadcn.com/docs/forms/next
---

# Next.js

Build forms in React using `useActionState` and Server Actions with the shadcn/ui `<Field />` components.

## Signature / Usage

Approach: Next.js `<Form />` (from `next/form`) for navigation and progressive enhancement, `useActionState` for form state/errors/pending, Server Actions for submission, server-side validation with Zod.

```tsx
<Form action={formAction}>
  <FieldGroup>
    <Field data-invalid={!!formState.errors?.title?.length}>
      <FieldLabel htmlFor="title">Bug Title</FieldLabel>
      <Input
        id="title"
        name="title"
        defaultValue={formState.values?.title ?? ""}
        disabled={pending}
        aria-invalid={!!formState.errors?.title?.length}
        placeholder="Login button not working on mobile"
        autoComplete="off"
      />
      {formState.errors?.title && (
        <FieldError>{formState.errors.title[0]}</FieldError>
      )}
    </Field>
  </FieldGroup>
  <Button type="submit">Submit</Button>
</Form>
```

Schema (`schema.ts`) and form state type, defined in a separate file so both client and server can import them:

```tsx
import { z } from "zod"

export const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
})

export type FormState = {
  values?: z.infer<typeof formSchema>
  errors: null | Partial<Record<keyof z.infer<typeof formSchema>, string[]>>
  success: boolean
}
```

Server Action with `safeParse()`:

```tsx
"use server"

export async function bugReportFormAction(
  _prevState: FormState,
  formData: FormData
) {
  const values = {
    title: formData.get("title") as string,
  }

  const result = formSchema.safeParse(values)

  if (!result.success) {
    return {
      values,
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  return {
    errors: null,
    success: true,
  }
}
```

## Notes

- Adapted (not in the official docs): the official snippet reads `formState.values.title`; optional chaining added because `values` is omitted from the success return shown above.
- Adapted (not in the official docs): the official demo also has a `description` field (Textarea) that is not expanded in the local copy; the snippets here keep only `title` in the schema and action so the schema, action and inputs agree.
- Client usage: `const [formState, formAction, pending] = React.useActionState<FormState, FormData>(action, { values: {...}, errors: null, success: false })`.
- Pending states: use `pending` to disable inputs and show a spinner; `<Field data-disabled={pending}>` applies the disabled styling to a field.

```tsx
<Button type="submit" disabled={pending}>
  {pending && <Spinner />} Submit
</Button>
```

- Business-logic validation: add checks after `safeParse` in the action (e.g. a database lookup) and return `{ values, success: false, errors: { email: ["This email is already registered"] } }`. Always return `values` on errors so the form keeps the user's input.
- Resetting: after a Server Action submit React resets the form to its initial values. Omit `values` from the success return to reset; return `values` on validation errors to preserve input. Both are standard React behavior.
- Displaying errors: add `data-invalid` to `<Field />`, `aria-invalid` to the control, and `<FieldError>{formState.errors.email[0]}</FieldError>`.
- The page uses `zod v3`; any schema library conforming to the Standard Schema specification can replace it. The demos intentionally disable browser validation to show server-side errors.
- The complex form example uses native `name` attributes (`RadioGroup name="plan"`, `Select name="billingPeriod"`, `Checkbox name="addons" value={addon.id}`, `Switch name="emailNotifications"`) with `defaultValue` / `defaultChecked` from `formState.values`; its schema, form and action are `<ComponentSource>` includes (`form-next-complex-schema.ts`, `form-next-complex.tsx`, `form-next-complex-action.ts`) not expanded in the local copy.
- Components are shadcn/ui copy-in components, distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). Next.js Server Actions / `next/form` themselves are in skill nextjs-app; schemas in skill zod; client-side RHF forms in skill react-hook-form.

## Related

- [Forms](./forms.md)
- [React Hook Form](./react-hook-form.md)
- [TanStack Form](./tanstack-form.md)
- [Formisch](./formisch.md)
