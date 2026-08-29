---
source: https://tanstack.com/router/latest/docs/framework/react/devtools
---

# Devtools

Dedicated devtools to visualize the router's inner workings and assist debugging. Available as a separate package.

## Signature / Usage

```tsx
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
// or for Solid: '@tanstack/solid-router-devtools'

function App() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| position | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | Corner placement in floating mode |
| shadowDOMTarget | Element | Target for Shadow DOM rendering in fixed mode |
| containerElement | Element | Custom container for embedded mode |

## Notes

- **Floating Mode**: fixed, floating element with toggleable corner button; state persists via localStorage
- **Fixed Mode**: use `TanStackRouterDevtoolsPanel` with a Shadow DOM target for precise positioning
- **Embedded Mode**: integrate the panel as a regular component with standard `style`/`className` props
- `TanStackRouterDevtools` hides by default in production; use `TanStackRouterDevtoolsInProd` (same config options) to show in `NODE_ENV === 'production'`

## Related

- [Overview](./overview.md)
