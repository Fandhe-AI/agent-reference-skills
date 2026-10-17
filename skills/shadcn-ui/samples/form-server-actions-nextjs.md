---
source: https://ui.shadcn.com/docs/forms/next
---

# Form with useActionState and Server Actions

Validate a `<Field />` form on the server with a Server Action, `useActionState` and Zod `safeParse`.

```ts
// schema.ts
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

```ts
// actions.ts
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

```tsx
// form.tsx
"use client"

import * as React from "react"
import Form from "next/form"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

import { bugReportFormAction } from "./actions"

export function BugReportForm() {
  const [formState, formAction, pending] = React.useActionState(
    bugReportFormAction,
    {
      errors: null,
      success: false,
    }
  )

  return (
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
          />
          {formState.errors?.title && (
            <FieldError>{formState.errors.title[0]}</FieldError>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={pending}>
            {pending && <Spinner />} Submit
          </Button>
        </Field>
      </FieldGroup>
    </Form>
  )
}
```

## Notes

- Keep the schema and `FormState` in a separate file so both client and server code can import them.
- Return `values` on validation errors to preserve user input; omit `values` on success and React resets the form.
- The `form.tsx` above is assembled from the docs' pending-state and error-display snippets (the docs' full demo imports `./form-next-demo-action` and `./form-next-demo-schema`); `actions.ts` is the docs' "Server-side Validation" snippet, which omits its imports.
- Adapted (not in the official docs): the official demo also has a `description` field (Textarea) that is not expanded in the docs snippets; the sample keeps only `title` so the schema, action and inputs agree.
- Next.js APIs (`next/form`, Server Actions) are in skill nextjs-app, schema API in skill zod.
