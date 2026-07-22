# Client Only

The `ClientOnly` component renders its children only on the client side, useful for components that require DOM access or browser APIs unavailable during server-side rendering.

## Signature / Usage

```tsx
import { ClientOnly } from '@ark-ui/react/client-only'

export const App = () => {
  return <ClientOnly fallback={<div>Loading...</div>}>{/* client-only content */}</ClientOnly>
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `fallback` | `any` | — | Content to display while awaiting client-side hydration |

## Notes

- Useful for integrating third-party libraries or custom logic that depend on browser APIs
- `fallback` enables progressive enhancement by showing a placeholder until the client-side component renders

## Related

- [Environment](./environment.md)
- [Frame](./frame.md)
