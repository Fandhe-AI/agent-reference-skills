# Open Telemetry Support

Experimental OpenTelemetry integration that generates spans scoped to each test worker, for debugging performance and behavior inside tests.

## Signature / Usage

```js
// otel.js - export the SDK as default so Vitest can flush before exit; Vitest does not call start()
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { NodeSDK } from '@opentelemetry/sdk-node'

const sdk = new NodeSDK({
  serviceName: 'vitest',
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
})

sdk.start()
export default sdk
```

```js
// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    experimental: {
      openTelemetry: {
        enabled: true,
        sdkPath: './otel.js',
      },
    },
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `experimental.openTelemetry.enabled` | boolean | Enables instrumentation of the process and each worker |
| `experimental.openTelemetry.sdkPath` | string | Path to the SDK module (default export) |
| `experimental.openTelemetry.browserSdkPath` | string | Browser-compatible SDK for browser mode |

## Notes

- Install: `npm i @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-proto`.
- Initialization increases startup time of every test unless isolation is disabled; visible as the `vitest.runtime.traces` span inside `vitest.worker.start`.
- With fake timers, reset them before the test ends or traces may not be tracked properly.
- Vitest does not process the `sdkPath` module; prefer a `.js` file (other extensions slow tests and may need extra Node arguments; TypeScript follows Node type stripping rules).
- `startActiveSpan` does not end the span automatically; call `span.end()` (the official snippet omits it).
- Custom spans inherit the Vitest context:

```ts
import { trace } from '@opentelemetry/api'
import { test } from 'vitest'

const tracer = trace.getTracer('vitest')

test('db connects properly', async () => {
  // shown inside `vitest.test.runner.test.callback` span
  await tracer.startActiveSpan('db.connect', async (span) => {
    try {
      await db.connect()
    } finally {
      span.end()
    }
  })
})
```

- Browser mode: trace context is propagated between Node.js and the browser; Node-side traces need no extra config. For browser-runtime traces provide `browserSdkPath` (e.g. `@opentelemetry/sdk-trace-web` `WebTracerProvider` exported as default). Browsers have no automatic async context propagation, so deeply nested async custom spans may not propagate.
- Vitest calls `sdk.shutdown()` after everything finishes (watch or run mode). View traces in any OpenTelemetry backend; Jaeger is suggested as easy to set up.
- `@opentelemetry/api` is an optional peer dependency, only used when tracing is enabled; `@opentelemetry/sdk-node` brings it transitively, otherwise install it explicitly.
- Parent-process context is picked up from the `TRACEPARENT` and `TRACESTATE` environment variables.
- Source: https://vitest.dev/guide/open-telemetry (Vitest v5.0.5)

## Related

- [Profiling Test Performance](./profiling-test-performance.md)
- [Config](./config.md)
