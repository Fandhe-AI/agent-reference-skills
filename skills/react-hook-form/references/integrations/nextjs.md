# React Hook Form with Next.js

Integrations: https://react-hook-form.com/integrations/nextjs

Call `useForm` from a Client Component in the Next.js App Router. Submit with [`handleSubmit`](../api/useform-handlesubmit.md), or pass a Server Action to React Hook Form's [`Form` component](../api/useform-form.md).

## Signature / Usage

### Create the Server Action

```tsx
// app/profile/actions.ts
"use server"

export async function updateProfile(formData: FormData) {
  const name = String(formData.get("name") ?? "")
  if (!name) throw new Error("Name is required")

  // Authenticate, validate again, then update the database.
}
```

### Build the Client Component

```tsx
// app/profile/profile-form.tsx
"use client"

import { Form, useForm } from "react-hook-form"
import { updateProfile } from "./actions"

export function ProfileForm() {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<{ name: string }>({ progressive: true })

  return (
    <Form control={control} action={updateProfile}>
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <p role="alert">{errors.name.message}</p>}
      {errors.root?.server && <p role="alert">Could not save your profile.</p>}
      {isSubmitSuccessful && <p>Profile saved.</p>}
      <button disabled={isSubmitting}>Save</button>
    </Form>
  )
}
```

`progressive: true` forwards compatible validation rules as native HTML attributes, allowing useful validation before hydration. After hydration, React Hook Form manages validation.

### Server validation is still required

Client validation improves feedback but is not a security boundary. Authenticate the request, authorize the operation, and validate every untrusted value inside the Server Action. Map returned field errors with [`setError`](../api/useform-seterror.md) when the server needs to report a specific input.

### Choosing a submission pattern

- Use [`Form`](../api/useform-form.md) for a direct Server Action or conventional API request.
- Use [`handleSubmit`](../api/useform-handlesubmit.md) when you need retries, cancellation, or a data-fetching library.
- Use React's `useActionState` when the action result drives UI beyond React Hook Form's `formState`.

See [Server Actions and useActionState](../advanced/server-actions.md), [Zod validation](./zod.md), and [React 19 forms](./react-19.md).

## Notes

- Source: https://react-hook-form.com/integrations/nextjs (documentation master c0511c9, fetched 2026-11-14)
- Scope is React Hook Form's side of the integration; Next.js routing, caching, and Server Action behavior itself belong to the nextjs-app skill.

## Related

- [useform-form](../api/useform-form.md)
- [useform-handlesubmit](../api/useform-handlesubmit.md)
- [useform-seterror](../api/useform-seterror.md)
- [server-actions](../advanced/server-actions.md)
- [react-19](./react-19.md)
- [zod](./zod.md)
