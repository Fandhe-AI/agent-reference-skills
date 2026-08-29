---
source: https://tanstack.com/router/latest/docs/framework/react/guide/internationalization-i18n
---

# Internationalization (i18n)

Primitives (optional path params, URL rewrites, type-safe params) composed to support locale-prefix routing patterns, with recommended integration patterns for Paraglide.

## Signature / Usage

```tsx
// Route: /{-$locale}/about
export const Route = createFileRoute('/{-$locale}/about')({
  component: AboutComponent,
})

function AboutComponent() {
  const { locale } = Route.useParams()
  const currentLocale = locale || 'en'
  return <h1>{content[currentLocale].title}</h1>
}
```

```ts
// Client-side URL localization via router rewrite (with Paraglide)
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime'

const router = createRouter({
  routeTree,
  rewrite: {
    input: ({ url }) => deLocalizeUrl(url),
    output: ({ url }) => localizeUrl(url),
  },
})
```

## Notes

- Core pattern is the optional path param `/{-$locale}/about`, matching `/about`, `/en/about`, `/fr/about`, etc.
- Language switching uses function-style `params` updates on `<Link>`, e.g. `params={(prev) => ({ ...prev, locale: prev.locale === 'en' ? undefined : 'fr' })}`.
- TanStack Router is library-agnostic for i18n; official example integration is with Paraglide (client-only via `rewrite`, or server-side with TanStack Start middleware `paraglideMiddleware`).
- Other integration references mentioned (Intlayer, use-intl) are external, non-official-doc links.
- `rewrite` option is covered in more depth in the separate URL Rewrites guide (not part of this scope).

## Related

- [path-params.md](./path-params.md)
- [navigation.md](./navigation.md)
