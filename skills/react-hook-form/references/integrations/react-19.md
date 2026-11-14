# React Hook Form with React 19

Integrations: https://react-hook-form.com/integrations/react-19

React 19 form actions and React Hook Form solve complementary problems. React actions coordinate mutations and returned state; React Hook Form manages field registration, client validation, errors, dirty state, and fine-grained subscriptions.

## Signature / Usage

### Submit to an action

Pass a function to the [`Form` component's `action` prop](../api/useform-form.md). The action receives `FormData` after client validation succeeds.

```tsx
"use client"

import { Form, useForm } from "react-hook-form"
import { createAccount } from "./actions"

export function AccountForm() {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<{ email: string }>({ progressive: true })

  return (
    <Form control={control} action={createAccount}>
      <input
        type="email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p role="alert">{errors.email.message}</p>}
      {errors.root?.server && <p role="alert">Could not create the account.</p>}
      {isSubmitSuccessful && <p>Account created.</p>}
      <button disabled={isSubmitting}>Create account</button>
    </Form>
  )
}
```

With `progressive: true`, compatible rules are rendered as native attributes before hydration. React Hook Form takes over validation after hydration.

### When to use useActionState

Use React's `useActionState` when the value returned by an action drives additional UI, such as a server-generated confirmation or multiple field errors. Map server field errors to React Hook Form with [`setError`](../api/useform-seterror.md).

Use React Hook Form's `formState` when you mainly need:

- `errors`, `isValid`, and validation state
- `isDirty`, `dirtyFields`, and touched state
- `isSubmitting` and `isSubmitSuccessful`
- isolated subscriptions through [`useFormState`](../api/useformstate.md)

### Avoid duplicate submissions

Choose one owner for the request. Give `Form` an `action`, or omit it and send the request inside `onSubmit`. Supplying both means `onSubmit` runs first and then the action runs.

See the [Next.js guide](./nextjs.md), [`Form` API](../api/useform-form.md), and [advanced useActionState example](../advanced/server-actions.md).

## Notes

- Source: https://react-hook-form.com/integrations/react-19 (documentation master c0511c9, fetched 2026-11-14)
- `useActionState` and form actions are React APIs; see the react skill for their own reference.

## Related

- [useform-form](../api/useform-form.md)
- [useformstate](../api/useformstate.md)
- [useform-seterror](../api/useform-seterror.md)
- [server-actions](../advanced/server-actions.md)
- [nextjs](./nextjs.md)
