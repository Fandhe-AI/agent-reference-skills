# Durable Endpoints

Wraps a regular HTTP API endpoint so its critical logic runs inside `step.run()` blocks, adding retry-from-point-of-failure, tracing, and observability while keeping the normal request/response mental model. Available in the TypeScript and Go SDKs.

## Signature / Usage

```ts
import { Inngest } from "inngest";
import { endpointAdapter } from "inngest/next";
import { step } from "inngest";
import { NextRequest } from "next/server";

const inngest = new Inngest({ id: "my-app", endpointAdapter });

export const POST = inngest.endpoint(async (req: NextRequest) => {
  const { userId, data } = await req.json();

  const enriched = await step.run("enrich-data", async () => {
    const user = await db.users.find(userId);
    return { ...data, account: user.accountId };
  });

  const result = await step.run("process", async () => {
    return await processData(enriched);
  });

  await step.run("notify", async () => {
    await sendNotification(userId, result);
  });

  return Response.json({ success: true, result });
});
```

## Notes

- If a step fails, only that step and later steps are retried; already-committed steps (like `enrich-data` above) are not re-run.
- On the success path, endpoints behave like normal HTTP endpoints. On failure-triggered retries, the endpoint returns a redirect to a dedicated Inngest Cloud endpoint that must be polled for the final result — `fetch()` cannot auto-follow this redirect due to CORS, so the client must detect `res.redirected` and issue a new `fetch(res.url)`.
- Beta feature. Flow control (concurrency limits, rate limiting) is not supported. POST bodies are not yet supported — prefer query strings. Only standard HTTP responses are supported, except for [streaming](./streaming.md) responses.
- Not yet available in the Python SDK.
- Supports the same step methods as regular Inngest functions (`step.run()`, `step.sleep()`, `step.waitForEvent()`), but requires HTTP middleware setup first (`stephttp.Setup` in Go).

## Related

- [streaming](./streaming.md)
- [create-function](./create-function.md)
- [durable-execution](./durable-execution.md)
