# Rate Limiting on Edge Runtime

Protect API routes from abuse using `@upstash/ratelimit` with sliding window algorithm on Edge Runtime.

```typescript
// middleware.ts (Next.js Edge Middleware)
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

export const config = {
  matcher: "/api/:path*",
};

export default async function middleware(req: NextRequest) {
  const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "anonymous";

  const { success, pending, limit, remaining, reset } =
    await ratelimit.limit(ip);

  // Drain analytics writes in Edge Runtime
  if (pending) {
    req.waitUntil(pending);
  }

  if (!success) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(remaining),
        "X-RateLimit-Reset": String(reset),
      },
    });
  }

  return NextResponse.next();
}
```

```env
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

## Notes

- `slidingWindow(10, "10 s")` allows 10 requests per 10-second rolling window; use `fixedWindow` for fixed-period buckets
- `analytics: true` enables request analytics in the Upstash console; `pending` must be awaited via `waitUntil` in Edge/Cloudflare environments
- The `identifier` string is the rate-limit key—use IP, user ID, or API key depending on the use case
- `limit`, `remaining`, `reset` can be forwarded as response headers for client-side backoff
