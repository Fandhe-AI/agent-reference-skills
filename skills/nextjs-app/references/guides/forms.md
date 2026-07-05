# Forms with Server Actions

React extends `<form>` to invoke Server Actions via the `action` attribute, receiving a `FormData` object automatically. Covers form validation, pending states, and optimistic updates.

## Signature / Usage

```tsx filename="app/invoices/page.tsx"
import { auth } from '@/lib/auth'

export default function Page() {
  async function createInvoice(formData: FormData) {
    'use server'

    const session = await auth()
    if (!session?.user) throw new Error('Unauthorized')

    const rawFormData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    }
    // mutate data, revalidate cache
  }

  return <form action={createInvoice}>...</form>
}
```

## Notes

- Always verify authentication/authorization **inside** each Server Action, even if the form is rendered only on an authenticated page.
- Pass additional arguments outside form fields using `Function.prototype.bind`, e.g. `updateUser.bind(null, userId)`; the bound value is not part of the rendered HTML (unlike a hidden input).
- Server-side validation with a library like zod; return `{ errors }` from the action on `safeParse` failure.
- Use `useActionState` (React) to surface validation errors/messages and a `pending` boolean; the action's signature gains a leading `prevState`/`initialState` argument.
- `useFormStatus` is an alternative for pending state but requires a separate nested component (it reads the nearest parent `<form>`).
- `useOptimistic` updates the UI immediately before the action resolves.
- Nested elements (`<button formAction>`, `<input type="submit">`, `<input type="image">`) can invoke different Server Actions within the same form.
- Programmatic submission via `formEl.requestSubmit()`, e.g. for a `Cmd+Enter` shortcut.

## Related

- [Server Actions and Mutations](./server-actions.md)
- [Authentication](./authentication.md)
