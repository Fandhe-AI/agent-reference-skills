# Dynamic Segments

Use Dynamic Segments to read URL path params and generate routes from dynamic data. A folder wrapped in square brackets (`[folderName]`) becomes a Dynamic Segment whose value is passed via `params`.

## Signature / Usage

```tsx filename="app/blog/[slug]/page.tsx"
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>My Post: {slug}</div>
}
```

## Options / Props

| Convention | Example | Matches |
|------|------|-------------|
| `[folderName]` | `app/blog/[slug]/page.js` | `/blog/a` → `{ slug: 'a' }` |
| `[...folderName]` (catch-all) | `app/shop/[...slug]/page.js` | `/shop/a/b/c` → `{ slug: ['a','b','c'] }` (does not match `/shop`) |
| `[[...folderName]]` (optional catch-all) | `app/shop/[[...slug]]/page.js` | Also matches `/shop` → `{ slug: undefined }` |

## Notes

- `params` is passed to `layout`, `page`, `route`, and `generateMetadata`; it is a promise — use `async`/`await` or React's `use()`. Synchronous access still works in v15 for backwards compat but is deprecated (was sync in v14 and earlier).
- In Client Component pages, read `params` with React's `use()`, or use the `useParams()` hook anywhere in the Client Component tree.
- For TypeScript, use the `PageProps<'/route'>`, `LayoutProps<'/route'>`, or `RouteContext<'/route'>` helpers to type `params`; values are always `string`, `string[]`, or `undefined` since they come from the URL at runtime.
- With Cache Components: without `generateStaticParams`, params are runtime-only and access must be wrapped in `<Suspense>`; with `generateStaticParams`, sample params are prerendered at build time and other params are validated/saved on first request.

## Related

- [generateStaticParams](../functions/generate-static-params.md)
- [layout.js](./layout.md)
- [page.js](./page.md)
- [route.js](./route.md)
