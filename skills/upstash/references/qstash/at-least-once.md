# At-Least-Once Delivery

QStash guarantees at-least-once delivery: no message is lost, but in rare cases the same message may be delivered more than once, so handlers must tolerate duplicates.

## Signature / Usage

Adapted (not in the official docs): the official example (an unauthenticated `GET` that stores a processed marker before the business logic) is changed to verify the QStash signature (`verifySignatureAppRouter`), require `Upstash-Message-Id`, distinguish `processing` from `done` (a concurrent redelivery gets a retryable 409, only a finished message is skipped with 200), and remove the claim when the logic throws.

```typescript title="api/handler/route.ts"
import { Redis } from "@upstash/redis";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

const redis = Redis.fromEnv();

async function handler(request: Request): Promise<Response> {
  const messageId = request.headers.get("Upstash-Message-Id");
  if (!messageId) {
    return Response.json({ message: "Missing Upstash-Message-Id" }, { status: 400 });
  }
  const key = `processed:${messageId}`;

  // claim the message; "processing" expires so a crashed attempt can be retried
  const claimed = await redis.set(key, "processing", { nx: true, ex: 60 * 5 });
  if (!claimed) {
    const state = await redis.get(key);
    if (state === "done") {
      return Response.json({ message: "Message already processed" }, { status: 200 });
    }
    // another attempt is still running: ask QStash to retry later
    return Response.json({ message: "Message is being processed" }, { status: 409 });
  }

  try {
    // critical business logic here
  } catch (error) {
    await redis.del(key);
    throw error;
  }

  await redis.set(key, "done", { ex: 60 * 60 * 24 });
  return Response.json({ message: "Message processed" }, { status: 200 });
}

export const POST = verifySignatureAppRouter(handler);
```

## Options / Props

Strategies for duplicate deliveries:

| Strategy | Description |
| --- | --- |
| Idempotency key | Store the unique `Upstash-Message-Id` header and skip messages already processed |
| Idempotent operations | Design operations so that applying them repeatedly leaves the same final state (for example setting a field to `true`) |
| Accept duplicates | Tolerable only when duplicates do not affect correctness (for example a non-critical notification email) |

## Notes

- A duplicate can occur when the QStash server shuts down mid-delivery, cannot determine the final delivery status after restart, and delivers again to avoid losing the message
- True exactly-once delivery cannot be guaranteed in distributed systems; at-least-once plus idempotent handlers is the common approach
- Distinct from publish-time deduplication (`Upstash-Deduplication-Id`), which prevents duplicate enqueueing; see deduplication.md
- Adapted from the official docs: the official example records the message as processed before running the business logic and has no signature check, so a crash or a concurrent redelivery could return 200 without the work done. The adapted example covers thrown errors only; for a process crash the `processing` claim expires after 5 minutes (use a transactional write or a business-side idempotency key for stronger guarantees)
- Source: https://upstash.com/docs/qstash/features/at-least-once (fetched 2026-11-14; no version pin on the site)

## Related

- [deduplication.md](./deduplication.md)
- [retry.md](./retry.md)
- [receiver.md](./receiver.md)
