# notFound

`notFound` renders the `not-found` file within a route segment and injects a `<meta name="robots" content="noindex" />` tag.

## Signature / Usage

```jsx
import { notFound } from 'next/navigation'

export default async function Profile({ params }) {
  const { id } = await params
  const user = await fetchUser(id)
  if (!user) {
    notFound()
  }
}
```

## Notes

- Throws a `NEXT_HTTP_ERROR_FALLBACK;404` error and terminates rendering of the segment where it's called.
- Does not require `return notFound()` (uses the TypeScript `never` type).
- Pair with a `not-found.js` file convention to render custom Not Found UI within the segment.
- Introduced in `v13.0.0`.

## Related

- [not-found.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [forbidden](./forbidden.md)
- [redirect](./redirect.md)
