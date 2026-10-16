# HashRouter

A declarative `<Router>` that stores the location in the `hash` portion of the URL so it is not sent to the server. Available in Declarative mode.

## Signature / Usage

```tsx
function HashRouter({
  basename,
  children,
  useTransitions,
  window,
}: HashRouterProps)
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
- [BrowserRouter](./BrowserRouter.md)
- [MemoryRouter](./MemoryRouter.md)
