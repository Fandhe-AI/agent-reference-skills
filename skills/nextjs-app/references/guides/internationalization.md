# Internationalization

Configure routing and rendering to support multiple languages/locales: internationalized routing (sub-path or domain) plus localized content.

## Signature / Usage

```js filename="proxy.js"
import { NextResponse } from 'next/server'

let locales = ['en-US', 'nl-NL', 'nl']

export function proxy(request) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = { matcher: ['/((?!_next).*)'] }
```

```tsx filename="app/[lang]/page.tsx"
export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  return <div>{lang}</div>
}
```

## Notes

- Nest all special files under `app/[lang]` so Next.js forwards the `lang` param to every layout/page; the root layout can also live at `app/[lang]/layout.js`.
- Use `@formatjs/intl-localematcher` + `negotiator` to match the `Accept-Language` header against supported locales, then redirect in Proxy.
- Maintain per-locale dictionaries (JSON) and a `getDictionary(locale)` loader; guard with a `hasLocale()` type predicate and call `notFound()` for unsupported locales instead of throwing at runtime.
- Since layouts/pages default to Server Components, dictionary size does not affect client-side JS bundle — only the resulting HTML ships to the browser.
- Use `generateStaticParams` (e.g. returning `[{ lang: 'en-US' }, { lang: 'de' }]`) to statically prerender routes per locale.
- Community libraries: `next-intl`, `next-international`, `next-i18n-router`, `paraglide-next`, `lingui`, `tolgee`, `next-intlayer`, `gt-next`.

## Related

- [Redirecting](./redirecting.md)
- [Static Exports](./static-exports.md)
