# Redis Session Cache

Cache session data in Next.js API routes using Upstash Redis with TTL-based expiry.

```typescript
// app/api/session/route.ts
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("session_id")?.value;
  if (!sessionId) {
    return Response.json({ error: "No session" }, { status: 401 });
  }

  const session = await redis.get<{ userId: string; role: string }>(
    `session:${sessionId}`
  );
  if (!session) {
    return Response.json({ error: "Session expired" }, { status: 401 });
  }

  return Response.json(session);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sessionId = crypto.randomUUID();

  // Store session with 1-hour TTL
  await redis.set(`session:${sessionId}`, body, { ex: 3600 });

  return Response.json(
    { sessionId },
    {
      headers: {
        "Set-Cookie": `session_id=${sessionId}; HttpOnly; Path=/; Max-Age=3600`,
      },
    }
  );
}
```

```env
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

## Notes

- `Redis.fromEnv()` reads `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` automatically
- `set(key, value, { ex: 3600 })` sets TTL in seconds; session auto-expires without manual cleanup
- `get<T>()` deserializes JSON into the given type; no need to `JSON.parse` manually
- HTTP-based client requires no persistent connection, safe for Edge Runtime and serverless
