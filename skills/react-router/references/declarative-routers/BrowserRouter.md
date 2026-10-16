# BrowserRouter

A declarative `<Router>` using the browser `History` API for client-side routing. Available in Declarative mode.

## Signature / Usage

```tsx
function BrowserRouter({
  basename,
  children,
  useTransitions,
  window,
}: BrowserRouterProps)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `basename` | `string` | — | Application basename. |
| `children` | `React.ReactNode` | — | `<Route>` components describing your route configuration. |
| `useTransitions` | `boolean` | `undefined` | Control whether router state updates are internally wrapped in `React.startTransition`. `undefined`: all router state updates are wrapped. `true`: `Link` and `Form` navigations are wrapped and all router state updates are wrapped. `false`: the router does not use `React.startTransition` on any navigations or state changes. |
| `window` | `Window` | global `window` | `Window` object override. Defaults to the global `window` instance. |

## Notes

- Declarative mode only.

## Related

- [Router](./Router.md)
- [HashRouter](./HashRouter.md)
- [MemoryRouter](./MemoryRouter.md)
- [StaticRouter](./StaticRouter.md)
- [Routes](../components/Routes.md)
