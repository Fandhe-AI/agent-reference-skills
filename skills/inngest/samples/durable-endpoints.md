# Durable Endpoints

Make a regular HTTP handler durable with `inngest.endpoint()` and inline `step.run()`, without separate function definitions or event triggers.

```typescript
// inngest/client.ts
import { Inngest } from "inngest";
import { endpointAdapter } from "inngest/next";

export const inngest = new Inngest({
  id: "my-app",
  endpointAdapter,
});
```

```typescript
// app/api/process/route.ts (Next.js)
import { step } from "inngest";
import { inngest } from "@/inngest/client";
import { NextRequest } from "next/server";

export const POST = inngest.endpoint(async (req: NextRequest) => {
  const { userId, data } = await req.json();

  // Step 1: Validate and enrich the data
  const enriched = await step.run("enrich-data", async () => {
    const user = await db.users.find(userId);
    return { ...data, account: user.accountId };
  });

  // Step 2: Process the enriched data
  const result = await step.run("process", async () => {
    return await processData(enriched);
  });

  // Step 3: Send notification
  await step.run("notify", async () => {
    await sendNotification(userId, result);
  });

  return Response.json({ success: true, result });
});
```

## Notes

- `step` is imported directly from `"inngest"`, not taken from a function context; no separate `/api/inngest` serve endpoint is needed
- `endpointAdapter` comes from `"inngest/next"` for Next.js or `"inngest/edge"` for Bun
- Completed steps are memoized: if the handler is re-executed after a crash or retry, finished steps return their cached results
- Independent steps can run in parallel with `Promise.all([step.run(...), step.run(...)])`, each retried on its own
