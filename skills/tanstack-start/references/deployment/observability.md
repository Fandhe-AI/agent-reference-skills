---
source: https://tanstack.com/start/latest/docs/framework/react/guide/observability
---

# Observability

Monitoring, tracing, and debugging patterns for a TanStack Start app: built-in logging/middleware patterns plus integration points for external tools.

## Signature / Usage

```tsx
// Client-side (app.tsx)
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
})

// Server functions
import * as Sentry from '@sentry/node'

const serverFn = createServerFn().handler(async () => {
  try {
    return await riskyOperation()
  } catch (error) {
    Sentry.captureException(error)
    throw error
  }
})
```

```tsx
// Request/response logging middleware
import { createMiddleware } from '@tanstack/react-start'

const requestLogger = createMiddleware().server(async ({ request, next }) => {
  const startTime = Date.now()
  const timestamp = new Date().toISOString()

  console.log(`[${timestamp}] ${request.method} ${request.url} - Starting`)

  try {
    const result = await next()
    const duration = Date.now() - startTime
    console.log(
      `[${timestamp}] ${request.method} ${request.url} - ${result.response.status} (${duration}ms)`,
    )
    return result
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(
      `[${timestamp}] ${request.method} ${request.url} - Error (${duration}ms):`,
      error,
    )
    throw error
  }
})
```

## Notes

- **Partner solution**: Sentry — real-time error tracking, performance monitoring, release health, user impact analysis, and native server-function/client integration (`@sentry/react` client-side, `@sentry/node` in server functions).
- **Other built-in patterns** documented on the page (code omitted here for brevity, see source): route performance monitoring via loaders, health-check server routes (`/health`), client/server error boundaries, an in-memory `MetricsCollector` + `/metrics` route, debug response headers in development, an isomorphic logger built with `createIsomorphicFn` (JSON logs in production, verbose console logs in development), and a simple in-memory error-report store.
- **External tools** mentioned as alternatives to Sentry: DataDog, New Relic, Honeycomb (APM); Bugsnag, Rollbar (error tracking); PostHog, Mixpanel (analytics).
- **New Relic integration** is documented in detail for SSR (`newrelic.js` config + wrapping `createStartHandler`/`defaultStreamHandler` with a custom handler, started via `node -r newrelic .output/server/index.mjs`), for server functions/routes (`createMiddleware` + `createStart({ requestMiddleware: [...] })`), and for SPA/browser (integration script added to the root route's `head`).
- **OpenTelemetry integration is experimental** — manual setup via `@opentelemetry/sdk-node` (`NodeSDK` + `getNodeAutoInstrumentations`), a `tracer.startActiveSpan` wrapper inside server functions, and a tracing `createMiddleware`. First-class, automatically-instrumented OpenTelemetry support is planned but not yet available.
- Recommended split: verbose `console[level]` logging in development, structured JSON logging in production; never log secrets/PII (passwords, tokens).

## Related

- [Hosting: Nitro](./nitro.md)
