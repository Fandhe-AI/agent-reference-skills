# Streaming

Streaming sends parts of the HTML response as they become ready (chunked transfer encoding) instead of waiting for the full page, using React `<Suspense>` boundaries integrated into the App Router.

## Signature / Usage

```tsx filename="app/dashboard/page.tsx"
import { Suspense } from 'react'
import { Revenue } from './revenue'
import { RecentOrders } from './recent-orders'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading revenue...</p>}>
        <Revenue />
      </Suspense>
      <Suspense fallback={<p>Loading orders...</p>}>
        <RecentOrders />
      </Suspense>
    </div>
  )
}
```

```tsx filename="app/dashboard/loading.tsx"
export default function Loading() {
  return <div className="animate-pulse">Loading...</div>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `loading.js` | file convention | Automatically wraps the page in a `<Suspense>` boundary using the file as fallback; prefetched as instant navigation fallback |
| `<Suspense fallback={...}>` | React component | Explicit, granular streaming boundary around any component |
| `use(promise)` | React API | Reads a promise passed down from a Server Component inside a Client Component, suspending until resolved |

## Notes

- Each `<Suspense>` boundary streams and hydrates independently (selective hydration) — sibling boundaries don't block each other; nested boundaries create a progressive reveal.
- Push dynamic access (`params`, `searchParams`, `cookies()`, `headers()`, data fetches) down into the component that needs it — awaiting at the top of a layout/page makes everything below dynamic and un-prerenderable.
- Once streaming starts, HTTP status/headers are already sent and cannot change: `notFound()` mid-stream injects `<meta name="robots" content="noindex">` instead of a real 404; `redirect()` mid-stream becomes a client-side redirect. Call `notFound()`/`redirect()` before any `await`/Suspense boundary to get a real HTTP status.
- Buffering by reverse proxies, CDNs, serverless platforms, or compression can defeat streaming — e.g. disable Nginx buffering via `X-Accel-Buffering: no` response header; enable AWS Lambda response streaming mode explicitly.
- Web Vitals: keep LCP elements outside/above Suspense boundaries; size skeleton fallbacks to match final content dimensions to avoid CLS; Suspense-driven selective hydration improves INP.
- Not supported with Static Export.

## Related

- [Prefetching](./prefetching.md)
- [PPR Platform Guide](./ppr-platform-guide.md)
- [Draft Mode](./draft-mode.md)
