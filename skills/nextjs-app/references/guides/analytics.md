# Analytics

Measure and report Web Vitals performance metrics using the built-in `useReportWebVitals` hook, `instrumentation-client.js`, or Vercel's managed Speed Insights.

## Signature / Usage

```jsx filename="app/_components/web-vitals.js"
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
}
```

```jsx filename="app/layout.js"
import { WebVitals } from './_components/web-vitals'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `useReportWebVitals(callback)` | hook | Reports TTFB, FCP, LCP, FID, CLS, INP metrics via `metric.name`/`metric.value`/`metric.id` |
| `instrumentation-client.js\|ts` | file convention | Runs before the app's frontend code starts; ideal for global analytics/error tracking setup |

## Notes

- `useReportWebVitals` requires `'use client'` — isolate it in its own small component (e.g. `WebVitals`) so the client boundary doesn't spread to the whole layout.
- Send metrics to an external endpoint with `navigator.sendBeacon()`, falling back to `fetch(url, { method: 'POST', keepalive: true })`.
- For Google Analytics, use `metric.id` to build percentile distributions; multiply `CLS` by 1000 before rounding since GA requires integer values.

## Related

- [Instrumentation](./instrumentation.md)
- [OpenTelemetry](./open-telemetry.md)
