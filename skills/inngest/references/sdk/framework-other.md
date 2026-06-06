# Other Framework Integrations

Inngest provides first-class `serve()` adapters for 25+ frameworks. Below are examples for common frameworks beyond Next.js, Express, and Hono.

## Signature / Usage

```ts
import { serve } from "inngest/<framework>";
import { inngest } from "./inngest/client";
import { myFunction } from "./inngest/functions";

// Wire up the handler via the framework-specific export pattern
export default serve({ client: inngest, functions: [myFunction] });
```

### Remix

```ts
// app/routes/api.inngest.ts
import { serve } from "inngest/remix";
import { inngest } from "~/inngest/client";
import { myFunction } from "~/inngest/functions";

const handler = serve({ client: inngest, functions: [myFunction] });

export const { loader, action } = handler;
```

### SvelteKit

```ts
// src/routes/api/inngest/+server.ts
import { serve } from "inngest/sveltekit";
import { inngest } from "$lib/inngest/client";
import { myFunction } from "$lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [myFunction],
});
```

### Nuxt / H3

```ts
// server/routes/api/inngest.ts
import { serve } from "inngest/h3";
import { inngest } from "~/server/inngest/client";
import { myFunction } from "~/server/inngest/functions";

export default serve({ client: inngest, functions: [myFunction] });
```

### Fastify

```ts
import Fastify from "fastify";
import { serve } from "inngest/fastify";
import { inngest } from "./inngest/client";
import { myFunction } from "./inngest/functions";

const app = Fastify();

app.route(serve({ client: inngest, functions: [myFunction] }));

app.listen({ port: 3000 });
```

## Options / Props

| Framework | Import |
|-----------|--------|
| Remix | `inngest/remix` |
| SvelteKit | `inngest/sveltekit` |
| Nuxt / H3 / Nitro | `inngest/h3` |
| Fastify | `inngest/fastify` |
| Koa | `inngest/koa` |
| NestJS | `inngest/express` |
| AWS Lambda | `inngest/lambda` |
| Cloudflare Pages | `inngest/cloudflare` |
| Supabase Edge Functions | `inngest/edge` |
| Deno Fresh | `inngest/fresh` |
| Tanstack Start | `inngest/tanstack-start` |

## Notes

- All adapters accept the same `{ client, functions, serveOrigin, servePath, streaming }` options.
- For unsupported frameworks, implement a custom handler using `InngestCommHandler` from the SDK.
- Allow requests up to 4 MB in size — configure this in each framework's settings.

## Related

- [serve()](./serve.md)
- [Next.js Integration](./framework-nextjs.md)
- [Express Integration](./framework-express.md)
- [Hono Integration](./framework-hono.md)
