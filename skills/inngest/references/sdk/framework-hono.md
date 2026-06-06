# Hono Integration

Integrate Inngest into a Hono application using the `inngest/hono` serve handler. Works with Cloudflare Workers, Bun, Node.js, and other Hono-compatible runtimes.

## Signature / Usage

```ts
import { Hono } from "hono";
import { serve } from "inngest/hono";
import { inngest } from "./inngest/client";
import { myFunction } from "./inngest/functions";

const app = new Hono();

app.on(
  ["GET", "POST", "PUT"],
  "/api/inngest",
  serve({ client: inngest, functions: [myFunction] })
);

export default app;
```

## Notes

- Import from `"inngest/hono"`.
- Register `GET`, `POST`, and `PUT` methods on the route; Hono's `app.on()` accepts an array of methods.
- When running on Cloudflare Workers, pass environment variables using `inngest.setEnvVars(env)` inside the handler or use the Cloudflare binding pattern to forward `INNGEST_SIGNING_KEY` and `INNGEST_EVENT_KEY`.
- The Hono adapter supports Cloudflare Workers, Bun, and Deno environments in addition to Node.js.

## Related

- [serve()](./serve.md)
- [Inngest Client](./inngest-client.md)
- [Environment Variables](./environment-variables.md)
