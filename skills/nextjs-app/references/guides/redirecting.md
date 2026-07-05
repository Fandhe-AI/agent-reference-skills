# Redirecting

Next.js offers several ways to redirect: the `redirect`/`permanentRedirect` functions, `useRouter`, `redirects` in `next.config.js`, and `NextResponse.redirect` in Proxy.

## Signature / Usage

```ts filename="app/actions.ts"
'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createPost(id: string) {
  // Call database
  revalidatePath('/posts')
  redirect(`/post/${id}`)
}
```

## Options / Props

| Name | Where | Status Code | Purpose |
|------|-------|--------------|---------|
| `redirect()` | Server Components, Server Functions, Route Handlers | 307 (303 in a Server Action) | Redirect after a mutation/event |
| `permanentRedirect()` | Server Components, Server Functions, Route Handlers | 308 | Redirect after a canonical URL change |
| `useRouter().push()` | Client Component event handlers | N/A (client-side nav) | Programmatic navigation, not for render-time redirects |
| `redirects()` in `next.config.js` | config file | 307 or 308 (`permanent` option) | Known redirects, runs before Proxy |
| `NextResponse.redirect()` | Proxy | any | Conditional redirects (auth, session), runs after `next.config.js` redirects |

## Notes

- `redirect()` throws internally — call it **outside** any `try/catch` block, or the throw will be swallowed.
- `redirect()` can be called in Client Components during render but not inside event handlers — use `useRouter().push()` there instead.
- Both `redirect()` and `permanentRedirect()` accept absolute URLs (including external links).
- `next.config.js` `redirects` may hit platform limits (e.g. 1,024 on Vercel) — for 1000+ redirects, build a custom Proxy-based solution using a redirect map (Edge Config/Redis) plus a Bloom filter to avoid loading the full dataset on every request.
- Order of execution: `next.config.js` `redirects` run first, then Proxy.

## Related

- [Internationalization](./internationalization.md)
