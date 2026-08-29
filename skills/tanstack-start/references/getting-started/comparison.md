---
source: https://tanstack.com/start/latest/docs/framework/react/comparison
---

# Comparison (TanStack Start vs Next.js vs React Router)

Full-stack framework capability comparison table across TanStack Start, Next.js, and React Router (SSR, server functions, middleware, deployment, tooling). Routing-only comparison lives on a separate page in TanStack Router docs.

## Signature / Usage

Next.js Server Actions (compared against TanStack Start's `createServerFn`, see `server-functions.md`):

```tsx
'use server'
export async function getTodos(userId: string) {
  // Runs on server, called from client
  return db.todos.findMany({ where: { userId } })
}

// Call from client component
const todos = await getTodos('123')
```

## Feature Comparison Table

| Feature | TanStack Start | Next.js | React Router |
|---|---|---|---|
| SSR | ✅ | ✅ | ✅ |
| Streaming SSR | ✅ | ✅ | ✅ |
| Selective SSR (per-route) | ✅ | 🔶 | 🔶 |
| SPA Mode | ✅ | 🔶 (via "use client") | ✅ |
| Built-in Client-Side SWR Caching | ✅ (via TanStack Router) | 🔶 (fetch cache only) | 🛑 |
| Static Prerendering (SSG) | ✅ | ✅ | ✅ |
| Incremental Static Regeneration (ISR) | ✅ (Cache-Control headers) | ✅ (proprietary) | ✅ (Cache-Control headers) |
| React Server Components | 🟡 Experimental | ✅ | 🟡 Experimental |
| Server Functions | ✅ (RPC-based) | ✅ (Server Actions) | ✅ (Actions) |
| Server Function Client Middleware | ✅ | 🛑 | 🛑 |
| Server Function Server Middleware | ✅ | 🛑 | ✅ |
| Request Middleware (all routes) | ✅ | ✅ | ✅ |
| Server Function Input Validation | ✅ | 🔶 manual | 🔶 manual |
| API Routes | ✅ | ✅ | ✅ |
| `<Form>` API | 🛑 | 🟠 (React 19 `useActionState`) | ✅ |
| Devtools | ✅ | 🛑 | 🟠 3rd party |
| Dev Server Startup / HMR Speed | ✅ Fast | 🛑 Slow | ✅ Fast |
| Type-First Architecture | ✅ | 🛑 | 🛑 |
| Deployment Flexibility | ✅ (Vite/Rsbuild) | 🟡 (Vercel-optimized) | ✅ (multiple adapters) |
| Official Vercel Support | ✅ (via Nitro) | ✅ | ✅ |

Legend: ✅ 1st-class, 🟡 partial, 🟠 addon/community, 🔶 possible with custom code, 🛑 not officially supported.

## Notes

- TanStack Start philosophy: maximum developer freedom, best-in-class type safety, router-first architecture, deployment agnostic.
- Next.js philosophy: production-ready with optimal defaults, best on Vercel, RSC-first.
- React Router philosophy: web fundamentals, progressive enhancement, works without JS by default.
- Not a comparison against `nextjs-app` skill's routing details — see the TanStack Router skill for the full router-specific comparison.

## Related

- [Start vs Next.js](./start-vs-nextjs.md)
- [Overview](./overview.md)
