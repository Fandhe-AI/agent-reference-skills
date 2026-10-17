# OpenTelemetry

Set up OpenTelemetry and enable Extended Traces so spans from inside a function run appear in Inngest Traces, including custom spans via `tracer`.

## (A) Automatic setup with `@inngest/otel`

```shell
npm install @inngest/otel
node --import @inngest/otel/node ./app.js
```

```ts
// inngest/client.ts
import { Inngest } from "inngest";
import { extendedTracesMiddleware } from "inngest/experimental";

export const inngest = new Inngest({
  id: "my-app",
  middleware: [extendedTracesMiddleware()],
});
```

Because `@inngest/otel` is preloaded, the middleware's default behavior extends the existing provider.

## (B) Manual provider

Use the client below with `behaviour: "off"` and the provider in `instrumentation.ts`. Load the instrumentation file before the app with `node --import ./instrumentation.mjs` (ESM) or `--require ./instrumentation.cjs` (CJS).

```ts
// inngest/client.ts
import { Inngest } from "inngest";
import { extendedTracesMiddleware } from "inngest/experimental";

export const inngest = new Inngest({
  id: "my-app",
  middleware: [extendedTracesMiddleware({ behaviour: "off" })],
});
```

Adapted (not in the official docs): `provider.register()` is added from the manual setup section of the same guide.

```ts
// instrumentation.ts — when you create the provider yourself
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { InngestSpanProcessor } from "inngest/experimental";
import { inngest } from "./inngest/client";

const provider = new NodeTracerProvider({
  spanProcessors: [
    new BatchSpanProcessor(new OTLPTraceExporter()),
    new InngestSpanProcessor(inngest),
  ],
});
provider.register();
```

## Custom span via `tracer`

```ts
// workflow.ts — custom span through the `tracer` argument
import { inngest } from './client'
import { sendEmail } from './emails'

export const userOnboarding = inngest.createFunction(
  { id: "user-onboarding", triggers: { event: "user.onboarding" } },
  async ({ event, step, tracer }) => {
    await step.run("create-user", async () => {
      // ...
    });

    await step.run("send-welcome-email", async () => {
      await tracer.startActiveSpan("call-email-service", async (span) => {
        const { name, email } = event.data;

        try {
          span.setAttributes({ name, email });

          await sendEmail({ name, email });
        } catch (error) {
          span.recordException(
            error instanceof Error ? error : new Error(String(error))
          );
          throw error;
        } finally {
          span.end();
        }
      });
    });
  }
);
```

## Notes

- Preload `@inngest/otel` -> default / `"extendProvider"` behavior; your own provider with `InngestSpanProcessor` -> `behaviour: "off"`; avoid `"createProvider"` for new setups (deprecated)
- Do not combine the `@inngest/otel` preload with a `behaviour: "off"` client unless you add `InngestSpanProcessor` yourself, otherwise Extended Traces are not sent to Inngest
- Keep the client module free of imports of app entrypoints, functions, DB clients, or AI SDK clients, since provider setup imports it
- For ESM apps with a custom provider, the instrumentation hook and dynamic imports must be loaded before app code; a single installed version of `@opentelemetry/instrumentation` avoids silently lost spans
- AI metadata extraction is separate and on by default (`aiMetadata: true`); see the ai-metadata-quickstart sample
- Source: https://www.inngest.com/docs-markdown/examples/open-telemetry (retrieved 2026-10-16)
