# Server Actions Form Submission with useActionState

Submit a `<form>` with a Server Action, validate on the server, and surface pending/error state to the client with `useActionState`.

```ts
// app/actions.ts
'use server'

import { z } from 'zod'

const schema = z.object({
  email: z.string({ invalid_type_error: 'Invalid Email' }),
})

export async function createUser(initialState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return { message: validatedFields.error.flatten().fieldErrors }
  }

  // mutate data here
  return { message: '' }
}
```

```tsx
// app/ui/signup.tsx
'use client'

import { useActionState } from 'react'
import { createUser } from '@/app/actions'

const initialState = { message: '' }

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      <p aria-live="polite">{state?.message}</p>
      <button disabled={pending}>Sign up</button>
    </form>
  )
}
```

## Notes

- `useActionState` changes the action's signature: it receives `(prevState, formData)` instead of just `(formData)`.
- `pending` (the third value returned by `useActionState`) can disable the submit button or show a spinner while the action runs.
- The component that renders `<form>` must be a Client Component (`'use client'`) to use `useActionState`; the action itself stays server-only via `'use server'`.
- Always re-verify authentication/authorization inside the Server Action, even if the form only renders on an authenticated page.
