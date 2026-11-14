# Vercel Functions Overview

Run server-side code on Vercel without managing servers. Functions scale automatically to user demand, handle API/database connections, and offer enhanced concurrency via fluid compute.

## Signature / Usage

```ts
// api/hello.ts — fetch Web Standard export (recommended)
export default {
  fetch(request: Request) {
    return new Response('Hello from Vercel!');
  },
};

// Or export individual HTTP methods
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```ts
// api/hello.ts — run work after the response (within max duration)
import { waitUntil } from '@vercel/functions';

async function getProducts() {
  const response = await fetch('https://api.vercel.app/products');
  return response.json();
}

export default {
  fetch() {
    waitUntil(getProducts().then((json) => console.log({ json })));
    return new Response('Accepted', { status: 202 });
  },
};
```

## Lifecycle

1. User sends request → Vercel routes to function
2. If a previous instance is idle, it is reused (fluid compute concurrency)
3. New invocation is created if no idle instance is available
4. Function scales to zero when no requests arrive

## Key Concepts

| Concept | Description |
|---------|-------------|
| Invocation | Each incoming request triggers a new invocation |
| Cold start | First run of a new instance; subsequent runs reuse the instance |
| Default region | `iad1` (Washington D.C., USA) for all new projects |
| Fluid compute | Shares one instance across concurrent requests; reduces cold starts |
| Max duration | Configurable time limit before Vercel terminates the function |

## Notes

- Functions run in a single region by default; Pro/Enterprise can use multiple regions
- Functions using the Node.js runtime support all Node.js APIs
- Fluid compute is enabled by default for new projects (as of April 23, 2025)
- Deploy a Node.js server via a `server.{js,ts}` entrypoint; individual functions go in `/api`
- Static assets are always served from the nearest CDN region regardless of function region

- Use `waitUntil` for short tasks that continue after the response, within the function's maximum duration; for retries, durable waits or a continuous worker, compare the background worker options (https://vercel.com/docs/background-workers)
- Use Vercel Workflows or eve when an agent must preserve progress across pauses or deployments
- To stream responses with Next.js you must use Route Handlers in the App Router, even if the rest of the app uses the Pages Router
- Metrics (Active CPU, Provisioned Memory, Invocations, savings from optimized concurrency) are under project **Observability** → **Vercel Functions**
- Pricing is based on active CPU, provisioned memory and invocations; projects not on fluid compute use the legacy pricing docs
- Source: https://vercel.com/docs/functions (fetched 2026-11-14)

## Related

- [fluid-compute.md](./fluid-compute.md)
- [node-js-runtime.md](./node-js-runtime.md)
- [edge-runtime.md](./edge-runtime.md)
- [configuring-functions.md](./configuring-functions.md)
- [limitations.md](./limitations.md)
