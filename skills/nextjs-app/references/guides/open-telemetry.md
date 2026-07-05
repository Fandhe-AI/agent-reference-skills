# OpenTelemetry

Next.js has built-in OpenTelemetry instrumentation support for observability (traces, spans) in a platform-agnostic way, via the `@vercel/otel` package or manual SDK setup.

## Signature / Usage

```ts filename="instrumentation.ts"
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel({ serviceName: 'next-app' })
}
```

```ts
import { trace } from '@opentelemetry/api'

export async function fetchGithubStars() {
  return await trace
    .getTracer('nextjs-example')
    .startActiveSpan('fetchGithubStars', async (span) => {
      try {
        return await getValue()
      } finally {
        span.end()
      }
    })
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `registerOTel({ serviceName })` | `@vercel/otel` function | Quick-start OpenTelemetry registration inside `instrumentation.ts` |
| `NodeSDK` (manual) | `@opentelemetry/sdk-node` | Manual configuration; Node.js runtime only, not Edge-compatible |
| `NEXT_OTEL_VERBOSE=1` | env var | Emits additional internal Next.js spans |
| `NEXT_OTEL_FETCH_DISABLED=1` | env var | Disables the automatic `fetch` span (for custom fetch instrumentation) |

## Notes

- Default Next.js spans include the root request span (`[http.method] [next.route]`), `render route (app)`, `fetch`, `executing api route (app)`, `generateMetadata`, and others, all under the `next.*` attribute namespace.
- Manual `NodeSDK` configuration must be conditionally imported only when `process.env.NEXT_RUNTIME === 'nodejs'` (not Edge-compatible); use `@vercel/otel` if Edge support is required.
- Custom spans use the standard `@opentelemetry/api` `trace.getTracer().startActiveSpan()` pattern.
- Test locally with an OpenTelemetry collector + compatible backend; works out of the box when deployed to Vercel.

## Related

- [Instrumentation](./instrumentation.md)
- [Analytics](./analytics.md)
