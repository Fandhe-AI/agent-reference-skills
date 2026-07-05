# permanentRedirect

`permanentRedirect` redirects the user to another URL with a permanent (308) HTTP redirect (303 in Server Actions), for use in Server/Client Components, Route Handlers, and Server Functions.

## Signature / Usage

```jsx
import { permanentRedirect } from 'next/navigation'

export default async function Profile({ params }) {
  const { id } = await params
  const team = await fetchTeam(id)
  if (!team) {
    permanentRedirect('/login')
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `path` | `string` | Relative or absolute URL to redirect to. |
| `type` | `'replace'` (default) or `'push'` (default in Server Actions) | Browser history behavior; no effect in Server Components. Use the `RedirectType` enum from `next/navigation`. |

## Notes

- Throws a `NEXT_REDIRECT` error and terminates rendering of the segment where it's called.
- Does not require `return permanentRedirect()` (uses the TypeScript `never` type).
- Use `notFound()` instead if the resource simply doesn't exist.
- Use `redirect()` instead for a temporary (307) redirect.
- In a streaming context, inserts a meta tag to emit the redirect client-side.

## Related

- [redirect](./redirect.md)
- [notFound](./not-found.md)
