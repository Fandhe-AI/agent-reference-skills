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

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create Rate limit
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(5, '30s'),
});

export async function POST(req: NextRequest) {
  // call ratelimit with request ip
  const ip = req.ip ?? 'ip';
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
- See the Upstash Ratelimit documentation for configuration of limiters.

## Related

- [Caching](./caching.md)
- [Vercel Deployment Guide](./vercel-deployment-guide.md)
