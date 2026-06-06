# Error Handling & Retries

Inngest distinguishes errors (which trigger retries) from failures (which occur after all retries are exhausted). Each step retries independently.

## Signature / Usage

```ts
// Configure retries at the function level
inngest.createFunction(
  { id: "process-order", retries: 5 },
  { event: "app/order.created" },
  async ({ event, step, attempt }) => {
    const order = await step.run("fetch-order", async () => {
      return db.orders.findOne({ id: event.data.orderId });
    });
  }
);
```

Catch a failed step and fall back to an alternative:

```ts
let data;
try {
  data = await step.run("primary-api", () => fetch("https://api.primary.com").then(r => r.json()));
} catch (err) {
  // err is a StepError after all retries are exhausted
  data = await step.run("fallback-api", () => fetch("https://api.fallback.com").then(r => r.json()));
}
```

## Error Types

| Type | Import | Description |
|------|--------|-------------|
| `NonRetriableError` | `inngest` | Stops all retries immediately; use for permanent failures (user not found, invalid input) |
| `RetryAfterError` | `inngest` | Specifies a custom delay before the next retry; use for rate limits |
| `StepError` | `inngest` | Thrown when a step exhausts all retries; can be caught with `try/catch` (TypeScript SDK v3.12+) |

### NonRetriableError

```ts
import { NonRetriableError } from "inngest";

throw new NonRetriableError("User not found", { cause: originalError });
```

### RetryAfterError

```ts
import { RetryAfterError } from "inngest";

// retryAfter: milliseconds, ms-string, or Date
throw new RetryAfterError("Rate limited", retryAfterHeader);
```

## Notes

- Default: 4 retries (5 total attempts) per step; set `retries: 0` to disable
- Each `step.run()` has its own independent retry counter — 3 steps × 5 attempts = up to 15 total attempts
- `attempt` parameter (zero-indexed) is available in the handler and resets when a step completes
- Retries use exponential backoff with jitter
- After a step exhausts all retries and throws `StepError`, subsequent steps in the function are cancelled unless caught
- `onFailure` handler: triggered once after the entire function (including all step retries) fails; useful for notifications, rollbacks, and metrics

### onFailure handler

```ts
inngest.createFunction(
  {
    id: "process-order",
    onFailure: async ({ error, event, step }) => {
      await step.run("notify-team", () =>
        slack.postMessage({ text: `Function failed: ${error.message}` })
      );
    },
  },
  { event: "app/order.created" },
  async ({ event, step }) => { /* ... */ }
);
```

## Related

- [step.run](./step-run.md)
- [step.invoke](./step-invoke.md)
