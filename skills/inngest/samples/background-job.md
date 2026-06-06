# Background Job

Trigger an async background job on an event and run work reliably with automatic retries.

```typescript
import { Inngest } from "inngest";

const inngest = new Inngest({ id: "my-app" });

// Define the background function
export const sendSignUpEmail = inngest.createFunction(
  { id: "send-signup-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    await step.run("send-welcome-email", async () => {
      await emailClient.send({
        to: event.data.email,
        subject: "Welcome!",
        body: "Thanks for signing up.",
      });
    });
  }
);

// Trigger the background job from your API route
await inngest.send({
  name: "app/user.created",
  data: { email: "user@example.com", userId: "usr_123" },
});
```

## Notes

- `step.run()` wraps each unit of work; failures are retried automatically without re-running earlier steps
- `inngest.send()` returns immediately — the function runs asynchronously in the background
- Event `data` is strongly typed when using the typed client (`EventSchemas`)
- The function must be registered via `serve()` (e.g., Next.js API route at `/api/inngest`)
