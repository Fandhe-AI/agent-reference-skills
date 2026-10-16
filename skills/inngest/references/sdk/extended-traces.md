# Extended Traces

`extendedTracesMiddleware` exports OpenTelemetry spans from your functions to Inngest Traces, giving insight into function execution, step timing and performance.

## Signature / Usage

Preload `@inngest/otel` (sets up a Node.js OpenTelemetry provider and common instrumentations):

```shell
node --import @inngest/otel/node ./app.js
```

Then add the middleware:

```ts
import { Inngest } from "inngest";
import { extendedTracesMiddleware } from "inngest/experimental";

const inngest = new Inngest({
  id: "my-app",
  middleware: [extendedTracesMiddleware()],
});
```

## Options / Props

| Name (`extendedTracesMiddleware({ behaviour })`) | Type | Description |
|------|------|-------------|
| behaviour | `"auto"` (default) | Extend a provider if one exists. For backward compatibility may create a provider if none exists, but provider creation is deprecated in favor of `@inngest/otel`. |
| behaviour | `"extendProvider"` | Only extend a provider; fails if none exists. |
| behaviour | `"createProvider"` | Deprecated. Only create a provider. Use `@inngest/otel` instead. |
| behaviour | `"off"` | Do nothing. |

## Examples

Bootstrap file when `--import` is unavailable (keep the dynamic import):

```ts
import "@inngest/otel/node";

await import("./app.js");
```

Manually add the span processor to your own provider:

```ts
import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
import { InngestSpanProcessor } from "inngest/experimental";

// client created with extendedTracesMiddleware({ behaviour: "off" })
const provider = new BasicTracerProvider({
  spanProcessors: [new InngestSpanProcessor(inngest)],
});
provider.register();
```

## Notes

- Load `@inngest/otel/node` before importing code that uses libraries you want instrumented; loading later can miss instrumentation patches. A static `import "./app.js"` in the bootstrap file can load app modules before instrumentation is registered.
- Serverless: if Node.js flags are unavailable, import `@inngest/otel/node` before your Inngest client and functions in the route module.
- A JavaScript process can only have a single OpenTelemetry provider. Existing providers (e.g. Sentry, Deno's built-in) are extended by default; for Sentry the middleware must run after `Sentry.init()`.
- `@inngest/otel` instruments common Node packages, OpenAI, Anthropic and Google Generative AI. If you configure OpenTelemetry yourself, manage your own instrumentation list and add `InngestSpanProcessor` (with `behaviour: "off"`).
- AI metadata extraction is configured separately: set `aiMetadata: false` on the Inngest client to disable it; Extended Traces keeps exporting spans.
- The middleware is imported from `inngest/experimental`.

## Related

- [Inngest Client](./inngest-client.md)
- [Middleware](./middleware.md)
- [Sentry Middleware](./middleware-sentry.md)
