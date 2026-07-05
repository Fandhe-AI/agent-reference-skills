# loading.js

Creates meaningful Loading UI with React Suspense — shows an instant loading state from the server while a route segment's content streams in.

## Signature / Usage

```tsx filename="app/dashboard/loading.tsx"
export default function Loading() {
  // Or a custom loading skeleton component
  return <p>Loading...</p>
}
```

## Options / Props

Loading UI components do not accept any parameters.

## Notes

- Is a Server Component by default, but can be a Client Component via `"use client"`.
- Fallback UI is prefetched, making navigation feel immediate; navigation is interruptible and shared layouts stay interactive while new segments load.
- In the component hierarchy, `loading.js` wraps `not-found.js`, `page.js`, and nested `layout.js` in a `<Suspense>` boundary — it does **not** wrap `layout.js`, `template.js`, or `error.js` in the same segment.
- If the layout itself accesses uncached/runtime data (`cookies()`, `headers()`, uncached fetch), `loading.js` won't show a fallback for it; with Cache Components, that access must be wrapped in its own `<Suspense>` or a build-time error occurs.
- Streaming responses always return a `200` status; `notFound()`/`redirect()` communicate outcomes within the streamed content rather than via HTTP status once headers are sent.
- Static export does not support `loading.js` streaming (see Platform Support: Node.js server / Docker — yes; Static export — no; Adapters — platform-specific).
- Introduced in `v13.0.0`.

## Related

- [layout.js](./layout.md)
- [not-found.js](./not-found.md)
- [error.js](./error.md)
- [proxy.js](./proxy.md)
