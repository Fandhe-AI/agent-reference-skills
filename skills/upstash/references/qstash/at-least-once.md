# At-Least-Once Delivery

QStash guarantees at-least-once delivery: no message is lost, but in rare cases the same message may be delivered more than once, so handlers must tolerate duplicates.

## Signature / Usage

Adapted (not in the official docs): wrapped the business logic in try/catch that removes the processed marker on failure, so a redelivery is not skipped when the first attempt did not finish.

```typescript title="api/handler/route.ts"
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET(request: Request): Promise<Response> {
  const messageId = request.headers.get("Upstash-Message-Id");

  const isNew = await redis.set(`processed:${messageId}`, "true", {
    nx: true,
    ex: 60 * 60 * 24,
  });

  if (!isNew) {
    return Response.json({ message: "Message already processed" }, { status: 200 });
  }

  try {
    // critical business logic here
  } catch (error) {
    await redis.del(`processed:${messageId}`);
    throw error;
  }

  return Response.json({ message: "Message processed" }, { status: 200 });
}
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
- Adapted from the official docs: the official example records the message as processed before running the business logic, so a crash after the `SET NX` would make the redelivery return 200 without the work done. The `try/catch` only covers thrown errors; for a process crash use a transactional write or a resumable processing state keyed by `Upstash-Message-Id`
- Source: https://upstash.com/docs/qstash/features/at-least-once (fetched 2026-11-14; no version pin on the site)

## Related

- [deduplication.md](./deduplication.md)
- [retry.md](./retry.md)
- [receiver.md](./receiver.md)
