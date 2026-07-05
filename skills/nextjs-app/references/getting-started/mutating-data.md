# Mutating Data

Mutate data using Server Functions and Server Actions.

## Signature / Usage

```ts
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  // Mutate data, then revalidate cache
}
```

```tsx
// app/ui/form.tsx — invoking a Server Function from a <form>
import { createPost } from '@/app/actions'

export function Form() {
  return (
    <form action={createPost}>
      <input type="text" name="title" />
      <button type="submit">Create</button>
    </form>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `"use server"` | directive | Marks an async function (or all exports of a file) as a Server Function, invocable via network request |
| `useActionState(action, initialState)` | React hook | Returns `[state, action, pending]`; shows pending state while a Server Function executes |
| `revalidatePath(path)` / `revalidateTag(tag)` | `next/cache` | Invalidates cached data after a mutation |
| `redirect(path)` | `next/navigation` | Redirects after a mutation; throws a control-flow exception, so call `revalidatePath`/`revalidateTag` before it |
| `refresh()` | `next/cache` | Refreshes the client router without revalidating tagged data |
| `cookies()` | `next/headers` | `get`/`set`/`delete` cookies inside a Server Action; setting/deleting re-renders the current page on the server |

## Notes

- A Server Action is a Server Function used with `startTransition`, automatically applied when passed to a `<form action>` or `<button formAction>`
- Server Functions are reachable via direct POST requests, not just through the app UI — always verify authentication/authorization inside every Server Function
- Server Functions can't be defined in Client Components, but can be imported from a `"use server"` file and invoked via event handlers, `useEffect`, or forms
- The client dispatches and awaits Server Functions one at a time; use Route Handlers for parallel server-side work

## Related

- [fetching-data](./fetching-data.md)
- [revalidating](./revalidating.md)
- [error-handling](./error-handling.md)
