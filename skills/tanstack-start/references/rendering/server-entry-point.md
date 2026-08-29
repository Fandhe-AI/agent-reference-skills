---
source: https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point
---

# Server Entry Point

Optional `src/server.ts` file conforming to a universal fetch-handler format (compatible with Cloudflare Workers and other WinterCG runtimes); if omitted, TanStack Start provides a default. It is the entry point for all SSR work, server routes, and server function requests.

## Signature / Usage

```tsx
// src/server.ts
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

export default createServerEntry({
  fetch(request) {
    return handler.fetch(request)
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fetch` | `(req: Request, opts?: RequestOptions) => Response \| Promise<Response>` | Required export shape (`ServerEntry` interface). |
| Request context | via `Register['server']['requestContext']` module augmentation | Typed second argument (`context`) passed to `handler.fetch`, available through server middleware, server routes, server functions, and the router. |

## Notes

- Use `createStartHandler` + `defineHandlerCallback` to wrap/customize the default stream handler (`defaultStreamHandler`) with custom logic.
- Register request-context types by augmenting `@tanstack/react-router`'s `Register` interface with `server.requestContext`.
- Cloudflare Workers deployments can extend `server.ts` for queues, scheduled events, and Durable Objects.

## Related

- [Client Entry Point](./client-entry-point.md)
- [Early Hints](./early-hints.md)
- [CDN Asset URLs](./cdn-asset-urls.md)
