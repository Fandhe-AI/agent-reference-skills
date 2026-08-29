---
source: https://tanstack.com/router/latest/docs/framework/react/devtools
---

# Devtools

Mount TanStack Router's devtools panel to visualize routing internals. Install first (see `install.md`).

## Devtools を組み込む（Floating Mode、既定）

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

- **Floating Mode**: fixed, floating element with toggleable corner button; state persists via localStorage
- **Fixed Mode**: use `TanStackRouterDevtoolsPanel` with a Shadow DOM target for precise positioning
- **Embedded Mode**: integrate the panel as a regular component with standard `style`/`className` props
- `TanStackRouterDevtools` hides by default in production; use `TanStackRouterDevtoolsInProd` (same config options) to show it when `NODE_ENV === 'production'`

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| position | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | Corner placement in floating mode |
| shadowDOMTarget | Element | Target for Shadow DOM rendering in fixed mode |
| containerElement | Element | Custom container for embedded mode |
