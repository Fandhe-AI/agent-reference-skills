# redirect

`redirect` redirects the user to another URL with a temporary (307) HTTP redirect (303 in Server Actions), for use in Server/Client Components, Route Handlers, and Server Functions.

## Signature / Usage

```tsx
import { redirect } from 'next/navigation'

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const team = await fetchTeam(id)
  if (!team) {
    redirect('/login')
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `path` | `string` | Relative or absolute URL to redirect to (accepts external links too). |
| `type` | `'replace'` (default) or `'push'` (default in Server Actions) | Browser history behavior; no effect in Server Components. Use the `RedirectType` enum from `next/navigation`. |

## Notes

- Throws a `NEXT_REDIRECT` error and terminates rendering of the segment; must be called **outside** `try/catch` blocks.
- Does not require `return redirect()` (uses the TypeScript `never` type).
- Usable in Client Components during rendering, but **not** inside event handlers — use `useRouter` instead.
- Uses 307 (not 302) so the request method (e.g. `POST`) is preserved; use `permanentRedirect` for a 308.
- For pre-render redirects, use `next.config.js` redirects or Proxy `NextResponse.redirect` instead.
- Use `notFound()` instead if the resource simply doesn't exist.
- Introduced in `v13.0.0`.

## Related

- [permanentRedirect](./permanentRedirect.md)
- [notFound](./not-found.md)
- [useRouter](./use-router.md)
