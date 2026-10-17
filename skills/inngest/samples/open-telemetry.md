# OpenTelemetry

Set up OpenTelemetry and enable Extended Traces so spans from inside a function run appear in Inngest Traces, including custom spans via `tracer`.

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
  middleware: [extendedTracesMiddleware({ behaviour: "off" })],
});
```

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
```

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

- `behaviour: "off"` is for a provider you create yourself with `InngestSpanProcessor`; use `"extendProvider"` to attach to an already-registered provider; avoid `"createProvider"` for new setups (deprecated)
- Keep the client module free of imports of app entrypoints, functions, DB clients, or AI SDK clients, since provider setup imports it
- For ESM apps with a custom provider, the instrumentation hook and dynamic imports must be loaded before app code; a single installed version of `@opentelemetry/instrumentation` avoids silently lost spans
- AI metadata extraction is separate and on by default (`aiMetadata: true`); see the ai-metadata-quickstart sample
- Source: https://www.inngest.com/docs-markdown/examples/open-telemetry (retrieved 2026-10-16)
