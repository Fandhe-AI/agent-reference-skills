# next/root-params

The `next/root-params` module provides async getter functions for accessing root-level dynamic segment parameters — the segments before the root layout — from any Server Component without prop drilling.

## Signature / Usage

```tsx filename="app/[lang]/layout.tsx"
import { lang } from 'next/root-params'

export default async function RootLayout(props: LayoutProps<'/[lang]'>) {
  return (
    <html lang={await lang()}>
      <body>{props.children}</body>
    </html>
  )
}
```

## Options / Props

| Segment type | Example | Return type |
| --- | --- | --- |
| Dynamic | `[id]` | `string` |
| Catch-all | `[...path]` | `string[]` |
| Optional catch-all | `[[...path]]` | `string[] \| undefined` |

## Notes

- Export names are generated from the dynamic segment folder names of the root layout (e.g. `app/[locale]` → `import { locale } from 'next/root-params'`).
- Root parameter names must be valid JavaScript identifiers; kebab-cased segments (e.g. `[post-slug]`) error at dev/build time.
- Server Components only — errors at build time if imported into a Client Component, and cannot be used in Server Actions or (yet) Route Handlers.
- Throws a runtime error inside `unstable_cache`; use `"use cache"` instead, where the getter's return value is automatically tracked as part of the cache key.
- With [Cache Components](../config/caching.md), each root parameter needs at least one value from `generateStaticParams` or the build fails; without Cache Components, root parameters are available as soon as the routes exist.
- With multiple root layouts defining different parameters, getters are typed `string | undefined` for parameters absent from some layouts.
- Introduced in `v16.3.0`.

## Related

- [layout.js](../file-conventions/layout.md)
- [generateStaticParams](./generateStaticParams.md)
- [use cache](../directives/use-cache.md)
- [Dynamic Segments](../file-conventions/dynamic-routes.md)
