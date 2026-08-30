---
source: https://tediousjs.github.io/node-mssql/#example-opentelemetry-spans
---

# Diagnostics Channel: OpenTelemetry spans

Wrap `request.query()` calls with OpenTelemetry spans using Node's `diagnostics_channel` and `TracingChannel`.

```js
const dc = require('node:diagnostics_channel')
const { trace, SpanKind, SpanStatusCode } = require('@opentelemetry/api')
const { CHANNELS } = require('mssql')

const tracer = trace.getTracer('mssql')
const queryTC = dc.tracingChannel(CHANNELS.TRACE_QUERY)

queryTC.subscribe({
  start (ctx) {
    ctx.span = tracer.startSpan('mssql.query', {
      kind: SpanKind.CLIENT,
      attributes: { 'db.system': 'mssql', 'db.query.text': ctx.command },
    })
  },
  asyncEnd (ctx) { ctx.span?.end() },
  error (ctx) {
    if (ctx.span) {
      ctx.span.recordException(ctx.error)
      ctx.span.setStatus({ code: SpanStatusCode.ERROR })
      ctx.span.end()
    }
  },
})
```

## Notes

- `CHANNELS` exports the channel name constants; `dc.tracingChannel(CHANNELS.TRACE_QUERY)` wraps `request.query()` lifecycle events (`start` / `asyncEnd` / `error`)
- `ctx.command` contains the SQL text as sent to the server (parameter values never appear, only their names) — avoid inlining secrets as raw SQL literals
- When no subscribers are attached, diagnostics_channel overhead is near-zero, so this instrumentation is safe to leave wired in production
