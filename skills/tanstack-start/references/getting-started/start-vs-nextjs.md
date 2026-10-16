---
source: https://tanstack.com/start/latest/docs/framework/react/start-vs-nextjs
---

# Start vs Next.js

Comparison of TanStack Start and Next.js for routing, rendering, server functions, caching, deployment, and the work each framework handles for you. Checked September 11, 2026 by the official page against the linked documentation, including Next.js 16.3. Start fits when you want TanStack Router's typed navigation, search parameters, and loaders in a full-stack app; Next.js fits when you want the App Router's Server Component model and integrated image, font, and metadata tools.

## Signature / Usage

Route-level loader caching in TanStack Start (options such as `staleTime` / `gcTime`):

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

## Rendering and interactivity

- Start: React components are server-rendered and hydrated by default; rendering is changeable per route with selective SSR (data-only, client-only). React Server Components are not needed for server functions or SSR.
- Next.js: App Router layouts and pages are Server Components by default; a `use client` boundary applies to the imported module tree, and Client Components can still contribute server-rendered HTML on the initial request.
- Start's Server Components support is **experimental and opt-in** (client-led composition of server-produced UI), a different model from Next.js; experimental support should not be presented as production feature parity.

## Routing

Start inherits TanStack Router's routing model: route definitions connect the types for links, path parameters, validated search parameters, loaders, and route context. Next.js also provides compile-time link checking via the stable, opt-in `typedRoutes` option (describing it as only IDE hints is inaccurate). In either framework a valid route type does not prove a record exists or that a user may access it; handle missing data and authorization at runtime.

## Server Functions vs Server Actions

- Start server functions: callable server endpoints with inferred inputs and outputs, GET or POST, an input validator, and function middleware. Use runtime validation and server-side authorization.
- Next.js Server Actions: integrate with forms and React's pending and error-state APIs; they can validate input with a schema too. A TypeScript annotation does not perform validation in either framework.
- A typed RPC call and a form action solve overlapping problems but are not interchangeable in every workflow.

## Caching

- Start: TanStack Router's loader cache for navigation data (`staleTime`, `gcTime`), optionally the official Query integration. Browser data, server data, and CDN response caching serve different purposes. The ISR guide describes HTTP caching and provider-specific options; a `Cache-Control` header alone does not guarantee identical regeneration or invalidation on every host.
- Next.js: explicit caching via Cache Components (`cacheComponents: true`) with `use cache`, `cacheLife`, and tag-based revalidation; applications without that option use a different documented model.

## Build tools

Start supports Vite and Rsbuild; Next.js integrates Turbopack. The page establishes no startup, HMR, build-time, memory, or runtime-size winner; measure the same application before drawing performance conclusions.

## Deployment

Start has deployment guides for several providers and runtimes. Next.js supports self-hosting: the image optimizer works with `next start`, and its docs cover ISR, shared caches, streaming, and multi-instance deployments (not inherently Vercel-only, but self-operation requires infrastructure configuration).

## Where Next.js Has the Advantage

Established Server Component integration, and built-in `next/image`, `next/font`, and metadata conventions (replacing them is migration work). An existing working Next.js application and team experience belong in the decision; a different routing model alone is not a reason to rewrite a healthy application.

## When to Choose TanStack Start

When typed URL state, route context, explicit loaders, and callable server functions fit how you build applications (Router integration, selective SSR, middleware). Build one representative route first: load real data, validate search parameters, submit a mutation, handle unauthorized access, and deploy it.

## Notes

- Page rewritten for 1.169: the earlier "Key Differences" bullets, Summary Table (including the "Maturity" and "RSC: Supported" rows), and the RSC-serialization-vulnerability note are not in the current official page.
- This page is about TanStack Start, not the `nextjs-app` skill's App Router internals — consult that skill for Next.js-specific API details.

## Related

- [Comparison](./comparison.md)
- [Migrate from Next.js](./migrate-from-next-js.md)
