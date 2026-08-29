---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/clientOnlyComponent.md
---

# ClientOnly

Renders a component only on the client, without breaking server-side rendering due to hydration errors.

## Signature / Usage

```tsx
import { ClientOnly } from '@tanstack/react-router'

function Dashboard() {
  return (
    <ClientOnly fallback={<FallbackCharts />}>
      <Charts />
    </ClientOnly>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | The client-only component rendered once JavaScript is available |
| `fallback` | `React.ReactNode` | Placeholder rendered during SSR / before JavaScript loads |

## Notes

- Intended for components/libraries that require browser-only APIs while preserving SSR for the rest of the app.

## Related

- [SSR](../data-rendering/ssr.md)
