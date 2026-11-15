---
source: https://docs.cloud.google.com/nodejs/docs/observability
---

# OpenTelemetry tracing in Node.js client libraries

The Node.js client libraries emit OpenTelemetry-style spans for each logical client request and each low-level RPC attempt. Instrumentation is opt-in and disabled by default; you must enable it and configure a tracer provider and exporter.

## Signature / Usage

### Enable tracing

```bash
export GOOGLE_SDK_NODE_ENABLE_TRACING=true
```

When tracing is enabled and your application has an active OpenTelemetry span in the current context when you call a client method, the library links its spans as children of your span.

### Export traces

Set up a tracer provider and exporter (the page's example, tagged `bash` in the twin, is JavaScript; `TraceExporter`, `BatchSpanProcessor` and `NodeTracerProvider` come from your OpenTelemetry packages):

```js
const cloudTraceExporter = new TraceExporter();
const spanProcessor = new BatchSpanProcessor(cloudTraceExporter);

const provider = new NodeTracerProvider({
  spanProcessors: [spanProcessor],
});
provider.register();
```

## Options / Props

| Name | Where | Description |
|------|-------|-------------|
| `GOOGLE_SDK_NODE_ENABLE_TRACING` | env var | `true` enables tracing. When set, it overrides the client option. |
| `enableTelemetryTracing` | `ClientOptions`, `CallOptions` | `true` enables tracing for the client / call. |

Signals:

| Span | Description |
|------|-------------|
| Client request span | `INFO` span for each logical client request, typically one method call (for example `accessSecretVersion` on `SecretManagerServiceClient`). Named `"{clientName}.{methodName}"` in gax's `traceCall` docstring. |
| Attempt span | `INFO` span for each low-level RPC attempt; more than one if the library retries. |

Standard attributes include `http.response.status_code` and `rpc.system.name`; gax adds `gcp.client.*`, `server.address`, `url.domain`, `error.type`, resend counts (`gcp.grpc.resend_count` / `http.request.resend_count`) (`TracerHelper.d.ts`).

## Notes

- Telemetry may contain sensitive data (resource names, full URLs, error messages). Review span contents and your exporter's documentation before exporting.
- Source inconsistency: the page says "a single method call in the client struct" and "a single method in the client struct"; Node.js client libraries have no struct. The wording appears to be carried over from the Rust observability page; read "client struct" as the client class.
- Source inconsistency: the page tags the exporter example `bash` and omits imports; the block is a JS fragment.
- The configuration sample referenced by the page is `core/packages/gax/samples/observability.js` in `googleapis/google-cloud-node`.
- Option names and the env-var override are confirmed in `clientInterface.d.ts` and `observability/util.d.ts` (`checkTracingEnabled`) of `google-gax` 6.17.0.
- Applies to `google-gax` 6.17.0 (npm). Log-trace correlation fields are in `logging-backends.md`.
- Source: https://docs.cloud.google.com/nodejs/docs/observability (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/clientInterface.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/observability/util.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/observability/TracerHelper.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)

## Related

- [logging.md](./logging.md)
- [logging-backends.md](./logging-backends.md)
- [client-options.md](./client-options.md)
