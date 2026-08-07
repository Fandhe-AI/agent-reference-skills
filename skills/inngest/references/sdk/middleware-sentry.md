# Sentry Middleware

Captures exceptions, adds distributed tracing, and enriches error data with contextual information (function ID, event names) for each function run.

## Signature / Usage

```ts
import * as Sentry from "@sentry/node";
import { Inngest } from "inngest";
import { sentryMiddleware } from "@inngest/middleware-sentry";

Sentry.init({ /* ... */ });

const inngest = new Inngest({
  id: "my-app",
  middleware: [sentryMiddleware()],
});
```

## Notes

- Requires the separate `@inngest/middleware-sentry` package.
- Requires `inngest@>=4.0.0` and `@sentry/*@>=8.0.0`.

## Related

- [Middleware](./middleware.md)
- [Inngest Client](./inngest-client.md)
