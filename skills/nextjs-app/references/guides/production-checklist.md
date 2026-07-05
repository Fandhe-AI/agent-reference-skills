# Production Checklist

Recommendations to ensure the best performance and user experience before taking a Next.js application to production.

## Automatic optimizations

Enabled by default, no configuration required:

- **Server Components**: render on the server, no client-side JS impact
- **Code-splitting**: automatic by route segment; consider lazy loading Client Components/third-party libraries further
- **Prefetching**: links prefetch when they enter the viewport
- **Prerendering**: Server/Client Components prerendered at build time and cached
- **Caching**: data requests, render output, and static assets cached to reduce network/backend requests

## During development

| Area | Recommendations |
| --- | --- |
| Routing/rendering | Use layouts for shared UI, `<Link>` for navigation, custom `error.js`/`not-found.js`, mind `"use client"` boundaries, wrap Request-time APIs (`cookies`, `searchParams`) in `<Suspense>` |
| Data fetching | Fetch in Server Components, use Route Handlers only from Client Components, stream with `loading.js`/Suspense, fetch in parallel, cache non-`fetch` requests with `unstable_cache` |
| UI/accessibility | Server Actions for forms, `global-error.tsx`/`global-not-found.tsx`, Font Module, `<Image>`, `<Script>`, `eslint-plugin-jsx-a11y` |
| Security | Taint sensitive data, verify auth inside each Server Action (not just Proxy/layout checks), keep `.env.*` out of git, add a Content Security Policy |
| Metadata/SEO | Metadata API, Open Graph images, sitemaps and robots files |
| Type safety | TypeScript + the Next.js TS plugin |

## Before going to production

- Run `next build` then `next start` to measure production-like performance
- Run Lighthouse in incognito and monitor Core Web Vitals with `useReportWebVitals`
- Analyze bundles with `@next/bundle-analyzer` (see [Package Bundling](./package-bundling.md)); Import Cost, Package Phobia, Bundle Phobia, and bundlejs can help evaluate new dependencies

## Related

- [Package Bundling](./package-bundling.md)
- [Content Security Policy](./content-security-policy.md)
- [Self-Hosting](./self-hosting.md)
