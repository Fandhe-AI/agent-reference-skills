# generateStaticParams

`generateStaticParams` is used with dynamic route segments to statically generate routes at build time instead of on-demand at request time.

## Signature / Usage

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `options.params` (optional) | object | Populated `params` from a parent `generateStaticParams`, for generating params of a child dynamic segment. |

### Return type by route

| Example Route | Return Type |
| --- | --- |
| `/product/[id]` | `{ id: string }[]` |
| `/products/[category]/[product]` | `{ category: string, product: string }[]` |
| `/products/[...slug]` | `{ slug: string[] }[]` |

## Notes

- Usable in Pages, Layouts, and Route Handlers.
- Use `dynamicParams` segment config to control behavior for segments not returned by `generateStaticParams`.
- Must always return an array, even empty, to statically render all paths at runtime (or use `export const dynamic = 'force-static'`); otherwise the route is dynamically rendered.
- `next dev` calls it on navigation; `next build` calls it before generating Layouts/Pages; it is not called again during ISR revalidation.
- Replaces `getStaticPaths` from the Pages Router.
- With Cache Components enabled, must return at least one param — empty arrays cause a build error (use a placeholder param + `notFound()` if actual values aren't known at build time).
- For multiple dynamic segments in one route, params can be generated bottom-up (child generates all segments) or top-down (parent generates its own, child receives them via its function's argument).
- A child segment's `generateStaticParams` runs once per param set the parent generates; can only generate params for segments at or below itself in the route.
- `fetch` calls are automatically memoized across all `generate`-prefixed functions, layouts, pages, and Server Components.
- Introduced in `v13.0.0`.

## Related

- [generateMetadata](./generateMetadata.md)
- [generateSitemaps](./generateSitemaps.md)
