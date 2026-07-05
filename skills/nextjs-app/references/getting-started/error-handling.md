# Error Handling

Display expected errors and handle uncaught exceptions.

## Signature / Usage

```tsx
// app/dashboard/error.tsx — error boundary for uncaught exceptions
'use client' // Error boundaries must be Client Components

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => unstable_retry()}>Try again</button>
    </div>
  )
}
```

```ts
// app/actions.ts — expected errors modeled as return values
'use server'

export async function createPost(prevState: any, formData: FormData) {
  const res = await fetch('https://api.vercel.app/posts', { method: 'POST', body: formData })
  if (!res.ok) {
    return { message: 'Failed to create post' }
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `error.js` | file convention | Client Component error boundary for a route segment; receives `error` and `unstable_retry` |
| `global-error.js` | file convention | Root-level error boundary; must define its own `<html>`/`<body>` |
| `notFound()` | `next/navigation` | Triggers the nearest `not-found.js` 404 UI |
| `not-found.js` | file convention | 404 UI shown after `notFound()` is called |
| `useActionState` | React hook | Recommended way to surface expected Server Function errors to the client instead of `try`/`catch` |
| `unstable_catchError` | `next/error` | Creates a reusable error boundary wrapper for any part of the component tree |

## Notes

- Expected errors (validation, failed requests) should be modeled as return values, not thrown — use `useActionState` to display them
- Uncaught exceptions should be thrown and caught by `error.js` boundaries, which bubble up to the nearest parent boundary
- Error boundaries do not catch errors inside event handlers or async code outside rendering; catch those manually with `useState`/`useReducer`
- Unhandled errors inside `startTransition` (from `useTransition`) do bubble up to the nearest error boundary

## Related

- [mutating-data](./mutating-data.md)
- [fetching-data](./fetching-data.md)
