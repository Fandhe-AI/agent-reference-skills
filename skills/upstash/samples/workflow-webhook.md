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

    let event: WebhookEvent;
    try {
    	event = await validateRequest(payloadString, headerPayload);
    } catch {
    	return
    }

    // Next steps based on the event

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
        const { id: clerkUserId, email_addresses, first_name } = event.data;
        const primaryEmail = email_addresses.find(
          (email) => (email.id = event.data.primary_email_address_id)
        );

        if (!primaryEmail) {
          return false;
        }

        return {
          event: event.type,
          userId: clerkUserId,
          email: primaryEmail.email_address,
          firstName: first_name,
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
    return await stripe.customers.create({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      metadata: {
        userId: user.userId,
      },
    });
  });

  /// ... Additional steps
});
```

## Notes

- Always validate incoming webhook requests so that only the original webhook source can trigger the workflow; the official example uses Clerk webhooks with Svix
- The snippets are fragments of one route (`// ...` marks code from the previous snippet); `UserPayload` and the `stripe` client are not defined in the official guide
- `webhookSecret` is a placeholder in the official example; supply the real secret from your webhook provider
- Official example project: `upstash/workflow-js` `examples/nextjs-webhook-stripe`
