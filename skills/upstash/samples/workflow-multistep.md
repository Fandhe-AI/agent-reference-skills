# Workflow Multi-Step Processing

Define a durable multi-step function with Upstash Workflow; each step is retried independently on failure.

```typescript
// app/api/workflow/onboarding/route.ts
import { serve } from "@upstash/workflow/nextjs";

export const { POST } = serve(async (context) => {
  const { userId, email } = context.requestPayload as {
    userId: string;
    email: string;
  };

  // Step 1: provision account resources
  await context.run("create-account", async () => {
    await db.users.create({ id: userId, email });
  });

  // Step 2: wait 1 day before sending follow-up
  await context.sleep("wait-one-day", "1d");

  // Step 3: send welcome email
  await context.run("send-welcome-email", async () => {
    await sendEmail(email, "Welcome!");
  });
});
```

```typescript
// lib/trigger-workflow.ts — trigger from any server action or API route
import { Client } from "@upstash/workflow";

const client = new Client({ token: process.env.QSTASH_TOKEN! });

export async function startOnboarding(userId: string, email: string) {
  const { workflowRunId } = await client.trigger({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/workflow/onboarding`,
    body: { userId, email },
    retries: 3,
  });
  return workflowRunId;
}
```

```env
QSTASH_TOKEN=...
QSTASH_CURRENT_SIGNING_KEY=...
QSTASH_NEXT_SIGNING_KEY=...
```

## Notes

- Each `context.run()` call is a durable step; if the function crashes mid-run, only the failed step is retried—not the whole workflow
- `context.sleep("label", "1d")` suspends execution without holding a server connection; supports units `s`, `m`, `h`, `d`
- `serve()` returns a Next.js App Router handler; equivalent adapters exist for Cloudflare Workers and other runtimes
- `workflowRunId` can be used to query or cancel the run via the Upstash console or API
