# Non-Retriable Errors

Throw `NonRetriableError` when the same work will fail again (an invalid ID, a record that will not become available). Inngest skips the remaining retries for the step or function where it is thrown.

## Signature / Usage

```ts
import { NonRetriableError } from "inngest";

export const loadOrder = inngest.createFunction(
  {
    id: "load-order",
    triggers: { event: "shop/order.requested" },
  },
  async ({ event, step }) => {
    return await step.run("load-order", async () => {
      const response = await fetch(
        `https://api.example.com/orders/${event.data.orderId}`
      );

      if (response.status === 404) {
        throw new NonRetriableError("order does not exist");
      }
      if (!response.ok) {
        throw new Error(`order API returned ${response.status}`);
      }

      return response.json();
    });
  }
);
```

Validation before any step runs stops retries for the function itself:

```ts
if (!event.data.orderId) {
  throw new NonRetriableError("orderId is required");
}
```

Keep the original cause (TypeScript v4 constructor takes a message and an optional `{ cause }` object):

```ts
throw new NonRetriableError("orderId is invalid", { cause: error });
```

Other SDKs: Python `raise inngest.NonRetriableError("...")` (use `from error` to keep `__cause__`); Go `inngestgo.NoRetryError(errors.New("..."))` (wrap with `%w` so `errors.Is` / `errors.As` still see the original error).

## Notes

- Use a standard `Error` for timeouts or other temporary failures so Inngest can retry; other errors follow the configured retry policy.
- When a `step.run()` fails it throws a `StepError` into the function, even if its handler threw `NonRetriableError`. The caught value is not the original `NonRetriableError` instance.
- Catch the failed step to run a fallback or compensation in another step. If left uncaught, the function fails and a configured failure handler handles that final failure.
- Do not catch a failed step and throw a standard `Error` unless you want the function code to retry.
- `NonRetriableError` does not undo external calls that already completed.
- Source: https://www.inngest.com/docs-markdown/durable-execution/guides-and-advanced/error-handling/non-retriable-errors (fetched 2026-10).

## Related

- [retries](./retries.md)
- [on-failure](./on-failure.md)
- [rollbacks](./rollbacks.md)
- [inngest-errors](./inngest-errors.md)
