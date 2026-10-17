---
source: https://ai-sdk.dev/docs/advanced/rate-limiting
---

# Rate Limiting

Protect an API endpoint from abuse by capping the number of requests a client can make in a timeframe; the official example uses Upstash Redis and Upstash Ratelimit in front of `streamText`.

## Signature / Usage

```tsx
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';
import { ipAddress } from '@vercel/functions';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create Rate limit
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(5, '30s'),
});

export async function POST(req: NextRequest) {
  // call ratelimit with the client IP (or an authenticated user ID);
  // never fall back to one shared key
  const ip = ipAddress(req);
  if (!ip) {
    return new Response('Cannot identify client', { status: 400 });
  }
  const { success, remaining } = await ratelimit.limit(ip);

  // block the request if unsuccessful
  if (!success) {
    return new Response('Ratelimited!', { status: 429 });
  }

  const { messages } = await req.json();

  const result = streamText({
    model,
    messages,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

## Notes

- Rate limiting sets a maximum threshold on the number of requests a client can make within a specified timeframe, preventing excessive usage that degrades service performance and incurs unnecessary costs.
- The rate limiter in this example is application code placed before the AI SDK call (Upstash Redis + Upstash Ratelimit). The Upstash SDK (Redis, Ratelimit) is covered by the upstash skill; this page only shows how it wraps a `streamText` route.
- Modified from the official example: it uses `req.ip ?? 'ip'`, but `NextRequest.ip` was removed in Next.js 15, so this version reads the client IP with `ipAddress` from `@vercel/functions` (an authenticated user ID also works).
- A shared fallback key such as `'ip'` is not used because every client would then share a single 5 requests / 30s window; requests that cannot be identified are rejected instead.
- See the Upstash Ratelimit documentation for configuration of limiters.

## Related

- [Caching](./caching.md)
- [Vercel Deployment Guide](./vercel-deployment-guide.md)
