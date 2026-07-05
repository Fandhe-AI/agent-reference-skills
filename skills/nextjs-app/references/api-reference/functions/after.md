# after

`after` schedules work to be executed after a response (or prerender) is finished, useful for logging/analytics that shouldn't block the response.

## Signature / Usage

```tsx
import { after } from 'next/server'

export default function Layout({ children }: { children: React.ReactNode }) {
  after(() => {
    // Executes after the layout is rendered and sent to the user
    log()
  })
  return <>{children}</>
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| callback | `() => void \| Promise<void>` | Function executed after the response (or prerender) is finished. |

## Notes

- Usable in Server Components (including `generateMetadata`), Server Functions, Route Handlers, and Proxy.
- Not a Request-time API; calling it alone does not opt a route into dynamic rendering.
- Runs for the platform's default/configured max duration (`maxDuration` route segment config).
- Executes even if the response errors or `notFound`/`redirect` is called.
- Can be nested inside other `after` calls.
- In Server Components, `cookies`/`headers` cannot be called inside the `after` callback (throws a runtime error) — read them beforehand and pass values in via closure.
- In Route Handlers and Server Functions, `cookies`/`headers` can be called directly inside `after`.
- Not supported with Static export; supported on Node.js server, Docker, and platform-specific for Adapters.
- Stable since `v15.1.0` (previously `unstable_after` in `v15.0.0-rc`).

## Related

- [cookies](./cookies.md)
- [headers](./headers.md)
- [generateMetadata](./generateMetadata.md)
