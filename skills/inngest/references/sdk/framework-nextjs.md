# Next.js Integration

Integrate Inngest into a Next.js project using the `inngest/next` serve handler. Supports both App Router and Pages Router.

## Signature / Usage

### App Router (`app/api/inngest/route.ts`)

```ts
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { myFunction } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [myFunction],
});
```

### Pages Router (`pages/api/inngest.ts`)

```ts
import { serve } from "inngest/next";
import { inngest } from "../../inngest/client";
import { myFunction } from "../../inngest/functions";

export default serve({
  client: inngest,
  functions: [myFunction],
});
```

## Notes

- Import from `"inngest/next"` — this adapter exports the correct handler shape for Next.js.
- App Router: export named `GET`, `POST`, `PUT` from the route file.
- Pages Router: export a default handler; disable the built-in body parser if needed.
- Enable streaming via `streaming: true` to extend timeouts on Vercel (up to 800 s with Fluid compute).
- Set `INNGEST_SIGNING_KEY` and `INNGEST_EVENT_KEY` environment variables in `.env.local` / Vercel dashboard.
- The endpoint must be accessible by Inngest Cloud; use a tunnel (e.g. ngrok) during local development with `INNGEST_DEV=1`.

## Related

- [serve()](./serve.md)
- [Inngest Client](./inngest-client.md)
- [Environment Variables](./environment-variables.md)
