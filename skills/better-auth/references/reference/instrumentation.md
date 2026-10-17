# Instrumentation (Experimental)

## Notes

- OpenTelemetry-based distributed tracing for monitoring and debugging Better Auth authentication operations. Provides traces for endpoints, hooks, DB operations, and plugin lifecycle events.
- Experimental: the API and span structure may change in the future.
- Setup: follow the OpenTelemetry official setup guide for Node.js apps and configure two components — a `TracerProvider` (the central component managing span creation) and a `SpanExporter` (collects and exports trace data).
- Endpoint spans capture HTTP operations, tracking request handlers, before/after hooks, and plugin middleware.
- DB spans instrument adapter operations (create, read, update, delete), including the before/after hooks of mutation operations. Operations: `create`, `findOne`, `findMany`, `update`, `updateMany`, `delete`, `deleteMany`, `consumeOne`, `incrementOne`, `count`.
- Disable Instrumentation: instrumentation is enabled by default. To prevent Better Auth from creating OpenTelemetry spans, set `experimental.instrumentation.enabled` to `false`; it affects only this auth instance, leaving spans from your application and other libraries unchanged.

```typescript
export const auth = betterAuth({
  experimental: {
    instrumentation: {
      enabled: false,
    },
  },
});
```

## Options / Props

Endpoint span attributes:

| Name | Description |
| --- | --- |
| `http.route` | Route template (low cardinality) |
| `http.response.status_code` | HTTP status code |
| `better_auth.context` | Execution origin (user or plugin-specific) |

DB span attributes:

| Name | Description |
| --- | --- |
| `db.operation.name` | DB operation type |
| `better_auth.context` | Collection identifier |

## Related

- [options](./options.md)
- [telemetry](./telemetry.md)
