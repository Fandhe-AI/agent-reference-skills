# unstable_rethrow

`unstable_rethrow` re-throws internal Next.js control-flow errors (from `notFound()`, `redirect()`, request-time APIs, etc.) so they aren't accidentally swallowed by a `try/catch`.

## Signature / Usage

```tsx
import { notFound, unstable_rethrow } from 'next/navigation'

export default async function Page() {
  try {
    const post = await fetch('https://.../posts/1').then((res) => {
      if (res.status === 404) notFound()
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
  } catch (err) {
    unstable_rethrow(err)
    console.error(err)
  }
}
```

## Notes

- **Unstable**: subject to change, not recommended for production.
- Must be called at the top of the `catch` block (or in a `.catch` handler), passing the caught error as the only argument.
- APIs whose thrown errors should be rethrown: `notFound()`, `redirect()`, `permanentRedirect()`, plus Request-time API errors from `cookies`, `headers`, `searchParams`, `fetch(..., { cache: 'no-store' })`, `fetch(..., { next: { revalidate: 0 } })` (affected by PPR).
- Only needed when a `catch` block might handle both application errors and framework-controlled exceptions; consider encapsulating throwing API calls so the caller handles exceptions instead.
- Any resource cleanup must happen before calling `unstable_rethrow` or in a `finally` block.

## Related

- [notFound](./not-found.md)
- [redirect](./redirect.md)
