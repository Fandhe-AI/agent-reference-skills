# Dynamic Route with generateStaticParams

Statically generate every page for a dynamic segment (`[slug]`) at build time, and read the resolved `params` with `await`.

```tsx
// app/blog/[slug]/page.tsx

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}

// One version of this page is statically generated per entry
// returned by generateStaticParams
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await fetch(`https://.../posts/${slug}`).then((res) =>
    res.json()
  )

  return <h1>{post.title}</h1>
}
```

## Notes

- `params` is a `Promise` in the current App Router API; always `await params` before reading its properties.
- `generateStaticParams` can also be used on `layout.tsx` and `route.ts` files, not only `page.tsx`.
- Return an empty array to render all paths on-demand at runtime instead of at build time (`export const dynamic = 'force-static'` achieves the same for a single path).
- `export const dynamicParams = false` makes any path not returned by `generateStaticParams` 404 instead of being rendered on-demand.
