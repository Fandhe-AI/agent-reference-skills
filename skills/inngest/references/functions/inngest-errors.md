# Inngest Errors

Control whether a failed step retries and when its next attempt starts. A standard error follows the default retry policy; `NonRetriableError` and `RetryAfterError` change that behavior.

## Signature / Usage

```ts
import { NonRetriableError, RetryAfterError } from "inngest";

export const fetchItem = inngest.createFunction(
  {
    id: "fetch-item",
    triggers: { event: "store/item.requested" },
  },
  async ({ event, step }) => {
    if (!event.data.itemId) {
      throw new NonRetriableError("itemId is required");
    }

    return await step.run("fetch-item", async () => {
      const response = await fetch(
        `https://api.example.com/items/${event.data.itemId}`
      );

      if (response.status === 404) {
        throw new NonRetriableError("item does not exist");
      }
      if (response.status === 429) {
        throw new RetryAfterError("item API rate limit", "30s");
      }
      if (!response.ok) {
        throw new Error(`item API returned ${response.status}`);
      }

      return response.json();
    });
  }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NonRetriableError` | error class | Bypasses remaining retries for the function or step where it is thrown. |
| `RetryAfterError(message, retryAfter)` | error class | Delays the next attempt. The second argument accepts milliseconds, a duration string such as `"30s"`, or a `Date`. |
| `cause` | `Error` | Optional original error accepted by `NonRetriableError` and `RetryAfterError` to preserve diagnostic context. |

## Notes

- Python: `inngest.NonRetriableError` and `inngest.RetryAfterError("msg", datetime.timedelta(seconds=30))`.
- Go: `inngestgo.NoRetryError(err)` and `inngestgo.RetryAtError(err, time)`. Go takes an absolute retry time rather than a duration.
- Throwing a standard error instead of `RetryAfterError` makes Inngest use its normal backoff.
- If the upstream service supplies a valid `Retry-After` value, pass that duration or time instead of a fixed value.
- After a step exhausts retries it throws a `StepError` into the function. Wrap the step in `try`/`catch` to run a fallback or compensation step; if uncaught, the function fails.
- Avoid treating every error as permanent; ordinary errors are appropriate when another attempt can succeed.
- Source: https://www.inngest.com/docs-markdown/durable-execution/guides-and-advanced/error-handling/inngest-errors (fetched 2026-10).

## Related

- [non-retriable-errors](./non-retriable-errors.md)
- [retries](./retries.md)
- [rollbacks](./rollbacks.md)
