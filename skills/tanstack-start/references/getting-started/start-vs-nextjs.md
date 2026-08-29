---
source: https://tanstack.com/start/latest/docs/framework/react/start-vs-nextjs
---

# Start vs Next.js

Deep philosophical and architectural comparison between TanStack Start and Next.js: default rendering model, explicitness, build pipeline, type system, routing, caching, and server functions.

## Key Differences

- **Defaults for interactivity**: Next.js defaults to Server Components (opt into `"use client"` for interactivity). TanStack Start defaults to interactive components (opt into server-only rendering where useful).
- **Implicit vs explicit**: Next.js layers implicit multi-layer caching tied to file structure. TanStack Start is explicit — loaders, cache config, and middleware chains are visible in code.
- **Build pipeline**: Next.js uses a custom build system (historically Webpack, now Turbopack). TanStack Start uses Vite or Rsbuild (faster dev startup/HMR, standard tooling).
- **Type system**: Next.js Server Actions have a client/server type gap requiring runtime validation. TanStack Start server functions have end-to-end compile-time type safety (input validation, return types, middleware context, route params).
- **Routing**: TanStack Router (Start's router) provides typesafe search params, typesafe path params, typesafe route context, route lifecycle events, code-based routes, built-in devtools, element scroll restoration, and navigation blocking — none of which Next.js has natively.
- **Caching**: Next.js layers request memoization, data cache, full route cache, router cache with complex invalidation. TanStack Start treats RSC output as plain data, cached via TanStack Router's SWR (`staleTime`/`gcTime`), TanStack Query, or CDN/HTTP headers.

## Signature / Usage

Route-level SWR caching in TanStack Start:

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => fetchPost(params.postId),
  staleTime: 10_000, // Fresh for 10 seconds
  gcTime: 5 * 60_000, // Keep in memory for 5 minutes
})
```

Server function vs Server Action:

```tsx
// TanStack Start
export const createPost = createServerFn({ method: 'POST' })
  .validator(z.object({ title: z.string().min(1) }))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    return db.posts.create({ title: data.title })
  })
```

```tsx
// Next.js Server Action
'use server'
export async function createPost(formData: FormData) {
  const title = formData.get('title')
  return db.posts.create({ title })
}
```

## Summary Table

| Aspect | TanStack Start | Next.js |
|---|---|---|
| Philosophy | Developer control, explicit patterns | Platform integration, conventions |
| Components | Interactive by default, opt into RSC | Server Components by default |
| Type safety | End-to-end, compile-time | TypeScript with boundary gaps |
| Server functions | Typed, validated, middleware support | Untyped boundary, no middleware |
| Caching | Explicit SWR primitives | Multi-layer implicit caching |
| Build tool | Vite or Rsbuild | Turbopack/Webpack |
| Deployment | Equal support everywhere | Optimized for Vercel |
| RSC | Supported | Supported |
| Maturity | 2+ years, approaching 1.0 | 8+ years |

## Notes

- Start's server-to-client-only Flight data flow means RSC serialization vulnerabilities reported for React don't apply to Start's model (per official docs).
- Next.js advantages acknowledged by TanStack docs are ecosystem/business, not technical: more tutorials/content, mindshare, tighter Vercel integration, built-in image/font optimization (Start uses pluggable solutions like Unpic).
- This page is about TanStack Start, not the `nextjs-app` skill's App Router internals — consult that skill for Next.js-specific API details.

## Related

- [Comparison](./comparison.md)
- [Migrate from Next.js](./migrate-from-next-js.md)
