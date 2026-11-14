# Redis Session Cache

Cache session data in Next.js API routes using Upstash Redis with TTL-based expiry.

Adapted (not in the official docs): curated sample; the `Set-Cookie` header adds `Secure; SameSite=Lax` to `HttpOnly`, and the `POST` handler stores the request body only to keep the example short.

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
        "Set-Cookie": `session_id=${sessionId}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`,
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
- Demonstration only: the `POST` handler stores the request body as the session. In a real application build the session object on the server after authenticating the user (never accept a client-supplied `userId` / `role`), and keep the REST token in server-side environment variables
- Adapted (not in the official docs): the example is a curated sample, and the `Set-Cookie` header adds `Secure; SameSite=Lax` to the usual `HttpOnly` flag
- Since `@upstash/redis` 1.40.0 the client requests plain (non-base64) responses by default (`responseEncoding: false`), so `get` returns the stored value without extra decoding
- Source: https://upstash.com/docs/redis/sdks/ts/getstarted and https://upstash.com/docs/redis/sdks/ts/troubleshooting (fetched 2026-11-14; no version pin on the site)
