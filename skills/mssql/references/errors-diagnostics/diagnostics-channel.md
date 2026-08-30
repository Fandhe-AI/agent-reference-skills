---
source: https://tediousjs.github.io/node-mssql/#diagnostics-channel
---

# Diagnostics Channel

node-mssql publishes telemetry through Node.js `diagnostics_channel`, enabling APM tools and custom instrumentation to observe queries, connections, and internal events without modifying application code. When no subscribers are active, overhead is near-zero.

## Signature / Usage

```js
const { CHANNELS } = require('mssql')
```

### TracingChannels (async lifecycle)

These use `TracingChannel` to wrap async operations, emitting `start`, `end`, `asyncStart`, `asyncEnd`, and `error` sub-events. Subscribe via `tracing:<name>:<event>`:

```js
const dc = require('node:diagnostics_channel')
const { CHANNELS } = require('mssql')

dc.subscribe(`tracing:${CHANNELS.TRACE_QUERY}:start`, ({ command, requestId }) => {
  console.log(`[${requestId}] Query: ${command}`)
})

dc.subscribe(`tracing:${CHANNELS.TRACE_QUERY}:error`, ({ requestId, error }) => {
  console.error(`[${requestId}] Failed:`, error.message)
})
```

| Constant | Channel name | Wraps |
|---|---|---|
| `TRACE_QUERY` | `mssql:query` | `request.query()` |
| `TRACE_BATCH` | `mssql:batch` | `request.batch()` |
| `TRACE_EXECUTE` | `mssql:execute` | `request.execute()` |
| `TRACE_BULK` | `mssql:bulk` | `request.bulk()` |
| `TRACE_CONNECT` | `mssql:connect` | `pool.connect()` |
| `TRACE_POOL_ACQUIRE` | `mssql:pool:acquire` | Pool connection acquire (wait time) |
| `TRACE_PREPARED_STATEMENT_PREPARE` | `mssql:prepared-statement:prepare` | `ps.prepare()` |
| `TRACE_PREPARED_STATEMENT_EXECUTE` | `mssql:prepared-statement:execute` | `ps.execute()` |

TracingChannel contexts include identifiers (`requestId`, `poolId`), operation details (SQL text, procedure name, parameter names), and — on completion — `result` or `error`. Parameter **values** are never included (only their names).

### Point-event channels

These emit single events at state transitions via `dc.subscribe()`:

```js
dc.subscribe(CHANNELS.CONNECTION_RELEASE, ({ connectionId, poolId }) => {
  console.log(`Pool ${poolId}: connection ${connectionId} released`)
})
```

| Constant | Channel name | Description |
|---|---|---|
| `CONNECTION_ACQUIRE` | `mssql:connection:acquire` | Connection borrowed from pool |
| `CONNECTION_RELEASE` | `mssql:connection:release` | Connection returned to pool |
| `CONNECTION_CREATE` | `mssql:connection:create` | New connection created in pool |
| `CONNECTION_DESTROY` | `mssql:connection:destroy` | Connection destroyed |
| `POOL_CLOSE` | `mssql:pool:close` | Pool closed (includes `reason`: `'closed'` or `'error'`; `error` on failure) |
| `TRANSACTION_BEGIN` | `mssql:transaction:begin` | Transaction begun (includes numeric `isolationLevel` and `isolationLevelName`) |
| `TRANSACTION_COMMIT` | `mssql:transaction:commit` | Transaction committed |
| `TRANSACTION_ROLLBACK` | `mssql:transaction:rollback` | Transaction rolled back (includes `aborted` flag) |
| `REQUEST_CANCEL` | `mssql:request:cancel` | Request cancelled |
| `PREPARED_STATEMENT_UNPREPARE` | `mssql:prepared-statement:unprepare` | Prepared statement released |

### Example: OpenTelemetry Spans

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

- **Note on SQL text in trace contexts:** `command` / `procedure` / `statement` fields contain the SQL text as sent to the server, to support OTel `db.query.text` conventions. Because node-mssql is parameterised-query-first, user-supplied values flow through `parameters` and do not appear in the SQL text. Avoid hard-coding credentials, tokens, or PII as inline SQL literals — anything hard-coded into a raw query will appear verbatim in trace contexts.
- **Note on identifiers:** `connectionId`, `poolId`, `requestId`, `transactionId`, and `preparedStatementId` are monotonically increasing integers scoped to the current node process. They are not stable across restarts and cannot be used to correlate activity across processes.
- TracingChannel instrumentation fires for both the promise and callback APIs. The callback API is traced via Node's `TracingChannel#traceCallback`, which emits the same `start` / `end` / `asyncStart` / `asyncEnd` / `error` sub-events as the promise path, so subscribers do not need to branch by API style. Point-event channels (connection, transaction, pool lifecycle) likewise fire regardless of API style.

## Related

- [errors.md](./errors.md)
