# Workflow Webhook Handling

Receive an external webhook with Upstash Workflow: parse the initial payload, verify the signature, and process the event in a durable step.

```typescript
// Workflow endpoint: parse the payload with initialPayloadParser
import { serve } from "@upstash/workflow/nextjs";

export const { POST } = serve(
  async (context) => {
    // Your webhook handling logic here
  },
  {
    initialPayloadParser: (payload) => {
      return payload;
    },
  }
);
```

```typescript
// Validate and parse inside the workflow (Clerk webhook verified with Svix)
export const { POST } = serve<string>(async (context) => {
  const payloadString = context.requestPayload;
  const headerPayload = context.headers;

  // Verify inside a step so the result is recorded and not re-verified on re-entry
  const event = await context.run("validate-webhook", async () => {
    try {
      return await validateRequest(payloadString, headerPayload);
    } catch {
      return null;
    }
  });
  if (!event) return;

  // Next steps based on the event
}, {
  // Keep the raw body string so the Svix signature can be verified
  initialPayloadParser: (payload) => payload,
})
```

```typescript
// Validation function
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

const webhookSecret = "YOUR_WEBHOOK_SECRET";

async function validateRequest(payloadString: string, headerPayload: Headers) {
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id") as string,
    "svix-timestamp": headerPayload.get("svix-timestamp") as string,
    "svix-signature": headerPayload.get("svix-signature") as string,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}
```

```typescript
// Process the event in a discrete, trackable step
export const { POST } = serve(async (context) => {
  // ... Parse and validate the incoming request

  const user = await context.run<false | UserPayload>(
    "handle-webhook-event",
    async () => {
      if (event.type === "user.created") {
        const { id: clerkUserId, email_addresses, first_name, last_name } = event.data;
        const primaryEmail = email_addresses.find(
          (email) => email.id === event.data.primary_email_address_id
        );

        if (!primaryEmail) {
          return false;
        }

        return {
          event: event.type,
          userId: clerkUserId,
          email: primaryEmail.email_address,
          firstName: first_name,
          lastName: last_name,
        } as UserPayload;
      }
      return false;
    }
  );
});
```

```typescript
// Follow-up steps after validation and extraction
export const { POST } = serve(async (context) => {
  // ... Previous validation and user data extraction

  if (!user) {
    return;
  }

  const customer = await context.run("create-stripe-customer", async () => {
    return await stripe.customers.create(
      {
        email: user.email,
        name: [user.firstName, user.lastName].filter(Boolean).join(" "),
        metadata: {
          userId: user.userId,
        },
      },
      { idempotencyKey: `clerk-user-created-${user.userId}` }
    );
  });

  /// ... Additional steps
});
```

## Notes

- Always validate incoming webhook requests so that only the original webhook source can trigger the workflow; the official example uses Clerk webhooks with Svix
- The snippets are fragments of one route (`// ...` marks code from the previous snippet); `UserPayload` and the `stripe` client are not defined in the official guide (your `UserPayload` needs a `lastName` field)
- Differences from the original guide: it uses `=` (assignment) in the `find` callback, corrected to `===`; it omits `last_name` from the extraction but uses `user.lastName`, so `lastName` is added to the extraction and the Stripe name is built from the non-empty parts
- Pass a stable `idempotencyKey` to `stripe.customers.create` because `context.run` may retry (at-least-once delivery); the `idempotencyKey` option is an addition to the official snippet
- Differences from the official snippet: verification is wrapped in `context.run`; outside a step it re-runs on every step invocation with the original `svix-timestamp`, and Svix rejects stale timestamps (default tolerance 5 minutes)
- `webhookSecret` is a placeholder in the official example; supply the real secret from your webhook provider
- Official example project: `upstash/workflow-js` `examples/nextjs-webhook-stripe`
