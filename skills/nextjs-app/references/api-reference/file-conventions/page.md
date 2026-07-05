# page.js

Defines UI that is unique to a route by default-exporting a component. A `page` is always the leaf of the route subtree and is required to make a segment publicly accessible.

## Signature / Usage

```tsx filename="app/blog/[slug]/page.tsx"
export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <h1>My Page</h1>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `params` (optional) | `Promise<object>` | Resolves to [dynamic route parameters](./dynamic-routes.md) from the root segment down to this page. |
| `searchParams` (optional) | `Promise<{ [key: string]: string \| string[] \| undefined }>` | Resolves to the current URL's search parameters (plain object, not `URLSearchParams`). Reading it opts the page into dynamic rendering. |

Use the globally available `PageProps<'/route'>` helper (generated during `next dev`/`build`/`typegen`) for strongly typed `params`/`searchParams` — static routes resolve `params` to `{}`.

## Notes

- Pages are Server Components by default; can be set to Client Components with `"use client"`.
- In the component hierarchy, `page.js` is the innermost convention, wrapped by `loading.js` (Suspense), `error.js` (error boundary), `template.js`, and `layout.js` in the same segment.
- `params` and `searchParams` are promises — use `async/await` or React's `use()`. Were synchronous through v14; still work synchronously in v15 for backwards compatibility but this is deprecated (`v15.0.0-RC` made them promises; a codemod is available).
- Client Component pages can read `params`/`searchParams` via React's `use()`.

## Related

- [layout.js](./layout.md)
- [Dynamic Segments](./dynamic-routes.md)
- [generateStaticParams](../functions/generate-static-params.md)
