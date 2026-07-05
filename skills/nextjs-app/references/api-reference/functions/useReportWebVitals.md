# useReportWebVitals

`useReportWebVitals` reports Core Web Vitals, for use with an analytics service.

## Signature / Usage

```jsx
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  return null
}
```

## Options / Props

### `metric` object

| Property | Description |
| --- | --- |
| `id` | Unique identifier for the metric within the current page load. |
| `name` | Metric name (TTFB, FCP, LCP, FID, CLS, INP). |
| `delta` | Difference between current and previous value (ms). |
| `entries` | Array of associated `PerformanceEntry` objects. |
| `navigationType` | Navigation type that triggered collection (`navigate`, `reload`, `prerender`, `back-forward`, `back-forward-cache`, `restore`). |
| `rating` | Qualitative rating: `'good'`, `'needs-improvement'`, `'poor'`. |
| `value` | Actual metric value/duration (ms). |

## Notes

- New functions passed must keep a stable reference to avoid reporting duplicate data.
- Requires `'use client'` — create a dedicated `WebVitals` component imported into the root layout to confine the client boundary.
- Can send results to an external endpoint via `navigator.sendBeacon()` (falling back to `fetch(..., { keepalive: true })`).

## Related

- [Link Component](https://nextjs.org/docs/app/api-reference/components/link)
