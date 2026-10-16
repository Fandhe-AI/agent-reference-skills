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

Adapter options and the proxy route:

```ts
const inngest = new Inngest({
  id: "my-app",
  endpointAdapter: endpointAdapter.withOptions({
    asyncRedirectUrl: "/wait",
    retries: 5,
  }),
});

Bun.serve({
  port: 3000,
  routes: {
    "/process": ...,
    "/wait": inngest.endpointProxy(),
  },
});
```

## Options / Props

| Option (`endpointAdapter.withOptions(options)`) | Type | Default | Description |
|--------|------|---------|-------------|
| `asyncRedirectUrl` | `string \| ((params: { runId: string; token: string }) => string \| Promise<string>)` | — | Custom URL to redirect to when transitioning from sync to async mode. A string path is resolved relative to the request origin and automatically appends `runId` and `token` query parameters. A function gives full control over URL construction. |
| `functionId` | `string` | auto-detected from the HTTP method and path | Override the auto-detected function ID for this endpoint. |
| `retries` | `number` | `3` | Maximum retries for all steps in this endpoint. Must be between 0 and 20. |
| `asyncResponse` | `"redirect" \| "token"` | `"redirect"` | Response type when transitioning from sync to async mode. |

`endpointAdapter.withOptions(options)` customizes adapter behavior (import `endpointAdapter` from `inngest/edge` or `inngest/node`; it is required, without it `inngest.endpoint()` is not available).

## Notes

- POST body is not yet supported. Use query string parameters to pass data to Durable Endpoints. POST body support is coming soon.
- `inngest.endpointProxy()` creates your own route for the async redirect target (by default the redirect goes to the Inngest Dev Server or Inngest Cloud), which satisfies CORS constraints when the endpoint is used from browsers.

- Go requires `inngestgo` v0.16.5 or later for the API shown in the guide. Durable Endpoints are beta, available in TypeScript and Go.
- The TypeScript v4 reference states Durable Endpoints are only available for Bun and Next.js API endpoints; `inngest/node` also exports `serveEndpoint` / `createEndpointServer` helpers for Node.js `http`.
- If a step fails, only that step and later steps are retried; already-committed steps (like `enrich-data` above) are not re-run.
- On the success path, endpoints behave like normal HTTP endpoints. On failure-triggered retries, the endpoint returns a redirect to a dedicated Inngest Cloud endpoint that must be polled for the final result — `fetch()` cannot auto-follow this redirect due to CORS, so the client must detect `res.redirected` and issue a new `fetch(res.url)`.
- Beta feature. Flow control (concurrency limits, rate limiting) is not supported. POST bodies are not yet supported — prefer query strings. Only standard HTTP responses are supported, except for [streaming](./streaming.md) responses.
- Not yet available in the Python SDK.
- Supports the same step methods as regular Inngest functions (`step.run()`, `step.sleep()`, `step.waitForEvent()`), but requires HTTP middleware setup first (`stephttp.Setup` in Go).

## Related

- [streaming](./streaming.md)
- [create-function](./create-function.md)
- [durable-execution](./durable-execution.md)
