# Draft Mode

Draft Mode lets editors preview unpublished CMS content by bypassing Next.js caching for their request only; other visitors keep seeing the cached/prerendered version.

## Signature / Usage

```ts filename="app/api/draft/route.ts"
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== 'MY_SECRET_TOKEN' || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  const post = await getPostBySlug(slug)
  if (!post) return new Response('Invalid slug', { status: 401 })

  const draft = await draftMode()
  draft.enable()
  redirect(post.slug)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `draftMode().enable()` | function | Sets the `__prerender_bypass` cookie; must be called from a Route Handler or Server Action |
| `draftMode().disable()` | function | Clears the cookie (exit preview) |
| `draftMode().isEnabled` | boolean | Read anywhere, including inside `'use cache'` scopes, to branch UI/fetch behavior |

## Notes

- When enabled: `fetch()` skips the fetch cache, `'use cache'` scopes re-execute every request, `unstable_cache` reads/writes are bypassed, and the page is served with `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`.
- `draftMode().enable()`/`.disable()` cannot be called inside a `'use cache'` scope — toggle from a Route Handler or Server Action instead.
- Use a shared secret + slug query params to secure the enabling endpoint; redirect using the fetched post's slug (not the raw query param) to avoid open-redirect vulnerabilities.
- Trigger the exit flow via `POST` (Server Action or Route Handler); if using a `GET` exit handler, invoke it from a `<form method="GET">`, not a `<Link>`, since `<Link>` prefetching would clear the cookie prematurely.
- If the CMS serves draft content at a different URL, branch the fetch base URL on `isEnabled` rather than relying on the same-endpoint assumption.

## Related

- [Caching (Previous Model)](./caching-without-cache-components.md)
- [ISR](./incremental-static-regeneration.md)
