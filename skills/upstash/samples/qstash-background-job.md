# QStash Background Job

Offload long-running tasks to a background worker by publishing a message with QStash and processing it in a verified API route.

```typescript
// lib/jobs.ts — publish a job
import { Client } from "@upstash/qstash";

const qstash = new Client({ token: process.env.QSTASH_TOKEN! });

export async function enqueueEmailJob(payload: { to: string; subject: string }) {
  const { messageId } = await qstash.publishJSON({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/send-email`,
    body: payload,
  });
  return messageId;
}
```

```typescript
// app/api/jobs/send-email/route.ts — process the job
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

async function handler(req: Request) {
  const { to, subject } = await req.json();

  // Perform the long-running work here
  await sendEmail(to, subject);

  return Response.json({ success: true });
}

// QStash verifies the request signature before invoking handler
export const POST = verifySignatureAppRouter(handler);

async function sendEmail(to: string, subject: string) {
  // your email sending logic
}
```

```env
QSTASH_TOKEN=...
QSTASH_CURRENT_SIGNING_KEY=...
QSTASH_NEXT_SIGNING_KEY=...
```

## Notes

- `publishJSON()` serializes `body` as JSON and sets `Content-Type: application/json` automatically
- `verifySignatureAppRouter` rejects requests that do not carry a valid QStash signature, preventing unauthorized invocations
- QStash retries failed deliveries with exponential backoff; design the handler to be idempotent
- Set `delay` or `notBefore` in `publishJSON` options to schedule deferred execution
