# Script Component (`next/script`)

The `<Script>` component optimizes loading of third-party scripts in a Next.js application via configurable loading strategies.

## Signature / Usage

```tsx
import Script from 'next/script'

export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | Required unless inline script | URL of an external script (absolute or internal path) |
| `strategy` | `string` | - | Loading strategy: `beforeInteractive`, `afterInteractive` (default), `lazyOnload`, `worker` (experimental) |
| `onLoad` | `function` | - | Runs after script loads. Client Components only; cannot be used with `beforeInteractive` |
| `onReady` | `function` | - | Runs after load and on every subsequent component mount. Client Components only |
| `onError` | `function` | - | Runs if the script fails to load. Client Components only; cannot be used with `beforeInteractive` |

### `strategy` values

- `beforeInteractive`: injected in the initial server HTML, downloaded before any Next.js module; does not block hydration. Must be placed in the root layout (`app/layout.tsx`). Use only for critical scripts (bot detectors, cookie consent managers).
- `afterInteractive` (default): injected client-side, loads after some hydration. Usable in any page/layout. Good for tag managers, analytics.
- `lazyOnload`: injected client-side during browser idle time, after all resources load. Good for chat widgets, social media widgets.
- `worker` (experimental, unstable): offloads to a web worker; requires `experimental.nextScriptWorkers` in `next.config.js`; currently only usable in the `pages/` directory, not App Router.

## Notes

- `beforeInteractive` scripts are always injected inside `<head>` regardless of component placement.
- `onLoad`/`onReady`/`onError` require a Client Component (`'use client'`).
- The `worker` strategy does not yet work with the App Router.

## Related

- [Font Module](./font.md)
