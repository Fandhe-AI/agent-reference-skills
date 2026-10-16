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
- Status codes: a streamed page response begins with `200`; the initial response headers fix the status for the rest of the response. Next.js can then stream `redirect`, `notFound`, `forbidden` or `unauthorized` outcomes within the content (a streamed 404 page includes `<meta name="robots" content="noindex">`; some crawlers may label these "soft 404s").
- To return `404` / `403` / `401` for compliance or analytics, run the check before the body starts streaming (for example in Proxy: check the slug, then rewrite to a not-found route or return a `404` response). Keep Proxy checks fast and avoid fetching full content there.
- Static export does not support `loading.js` streaming (see Platform Support: Node.js server / Docker — yes; Static export — no; Adapters — platform-specific).
- Introduced in `v13.0.0`.

## Related

- [layout.js](./layout.md)
- [not-found.js](./not-found.md)
- [error.js](./error.md)
- [proxy.js](./proxy.md)
