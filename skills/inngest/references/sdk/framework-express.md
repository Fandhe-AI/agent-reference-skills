# Express Integration

Integrate Inngest into an Express application using the `inngest/express` serve handler.

## Signature / Usage

```ts
import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client";
import { myFunction } from "./inngest/functions";

const app = express();
app.use(express.json());

app.use(
  "/api/inngest",
  serve({ client: inngest, functions: [myFunction] })
);

app.listen(3000);
```

## Notes

- Import from `"inngest/express"`.
- **You must add `express.json()` middleware** before the Inngest handler; otherwise POST request bodies will not be parsed.
- Configure Express to accept request bodies up to **4 MB**: `express.json({ limit: "4mb" })`.
- NestJS uses the Express adapter internally; import from `"inngest/express"` and mount via `app.use()`.
- Set `INNGEST_SIGNING_KEY` as an environment variable for production authentication.

## Related

- [serve()](./serve.md)
- [Inngest Client](./inngest-client.md)
- [Environment Variables](./environment-variables.md)
