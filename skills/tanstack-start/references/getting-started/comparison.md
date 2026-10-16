---
source: https://tanstack.com/start/latest/docs/framework/react/comparison
---

# Comparison (TanStack Start vs Next.js vs React Router)

Full-stack framework capability matrix across TanStack Start, Next.js App Router, and React Router Framework Mode (rendering, server APIs, caching, forms, deployment). Checked September 11, 2026 by the official page against Start's current guides, Next.js 16.3 App Router, and React Router 8.3 Framework Mode. Navigation and URL-state APIs are compared on a separate page in the TanStack Router docs.

## Signature / Usage

Server call comparison (Start `createServerFn` vs Next.js Server Actions; see `server-functions.md`):

```tsx
// TanStack Start
export const createPost = createServerFn({ method: 'POST' })
  .validator(z.object({ title: z.string().min(1) }))
  .handler(async ({ data }) => db.posts.create({ title: data.title }))
```

```tsx
// Next.js Server Action
'use server'
export async function createPost(formData: FormData) {
  const title = formData.get('title')
  return db.posts.create({ title })
}
```

## Rendering and data

| Capability | TanStack Start | Next.js App Router | React Router Framework Mode |
| --- | --- | --- | --- |
| Server rendering | SSR with hydration by default | Server and Client Components contribute to initial HTML | Server rendering is configurable |
| Rendering control | Per-route full, data-only, or disabled SSR | Server/Client Component boundaries; `use client` does not disable initial SSR | Global SSR setting and route-level client loaders |
| SPA applications | Dedicated SPA mode | Documented SPA patterns | `ssr: false` |
| Static output | Prerendering configuration | Static export, with server-feature limitations | Prerender selected URLs |
| React Server Components | Experimental, opt-in | Core App Router component model | Unstable RSC integration |
| Client data reuse | Router loader caching, plus Query integration | Navigation caching and server cache APIs; a query library can manage additional client data | Loader/action revalidation; separate client-data tools can be added |
| Revalidation after deployment | HTTP caching and provider-specific ISR configuration | ISR and cache coordination | HTTP response headers and deployment infrastructure |

A client loader cache, a cached server result, and a cached HTML response are different things. Compare invalidation behavior, persistence, and multi-instance coordination for the layer your application needs. A CDN honoring `stale-while-revalidate` is not proof of identical ISR behavior across providers.

## Server APIs and forms

| Capability | TanStack Start | Next.js App Router | React Router Framework Mode |
| --- | --- | --- | --- |
| Server calls and mutations | Typed server functions with GET or POST | Server Actions | Route actions and fetchers |
| Input validation | Validator API with inferred types | Validate action input with application code or a schema | Validate action input with application code |
| Middleware | Request middleware and client/server function middleware | Request interception with Proxy; action authorization belongs in server code | Server and client route middleware |
| Form handling | Server functions can be called from event handlers; use a form library when needed | Built-in `next/form`, plus Server Action forms | `Form`, actions, and fetchers |
| Server endpoints | Server routes | Route Handlers | Resource routes |

Type inference helps callers write valid code. It does not validate an incoming HTTP request or authorize access to a record. All three frameworks need runtime validation and server-side authorization for private operations.

## Tooling and deployment

| Capability | TanStack Start | Next.js App Router | React Router Framework Mode |
| --- | --- | --- | --- |
| Build integration | Vite or Rsbuild | Turbopack | Framework tooling |
| Type support | Router inference and server function inference | Stable opt-in typed links (`typedRoutes`) and TypeScript APIs | Generated route-module types |
| Metadata | Route head management and SEO guide | Metadata API and file conventions | Route-module metadata |
| Image and font handling | Choose CSS, an image service, or an integration for your deployment | Built-in `next/image` and `next/font` | Choose CSS, an image service, or an integration for your deployment |
| Hosting | Provider and runtime guides | Self-hosting or a deployment provider | Deployment templates and hosting options |

Deployment support depends on the adapter, runtime, and features you use. Check streaming, image processing, filesystem access, background work, and shared-cache behavior on your chosen target. Next.js self-hosting includes image optimization and ISR configuration; those features should not be labeled Vercel-only.

## Performance Considerations

The page does not establish a performance winner. Startup time, HMR, memory use, JavaScript shipped, and response latency require separate measurements; comparing a router package's bundle size with an entire framework is not a valid application benchmark. Build the same representative application in each framework and record package versions, hardware, dependencies, route count, rendering and caching settings, deployment target, warm and cold runs, and raw results.

## When to Choose Each Framework

- **TanStack Start:** typed route context and URL state, explicit loaders and server functions, and control over per-route rendering.
- **Next.js:** its Server Component model and integrated image, font, metadata, and form facilities; existing team experience and integrations can also favor staying.
- **React Router Framework Mode:** route loaders and actions, fetchers, and form-driven workflows; check its progressive enhancement guide if operation before JavaScript loads matters.

## Notes

- Page rewritten for 1.169: the earlier emoji feature table, philosophy summaries, and the "Experimental RSC" row wording were replaced by the capability matrices above; the official page makes no performance or maturity claims.
- Check Start's overview and Server Components guide for current release and experimental-feature status before adopting those features.
- Not a comparison against `nextjs-app` skill's routing details — see the TanStack Router skill for the full router-specific comparison.

## Related

- [Start vs Next.js](./start-vs-nextjs.md)
- [Overview](./overview.md)
