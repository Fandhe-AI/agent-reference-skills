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
| `children` | `React.ReactNode` | — | Your app's React tree; route definitions (`<Route>` elements) must be wrapped in `<Routes>` (docs wording: "`<Route>` components describing your route configuration"). |
| `useTransitions` | `boolean` | `undefined` | Control whether router state updates are internally wrapped in `React.startTransition`. `undefined`: all router state updates are wrapped. `true`: `Link` and `Form` navigations are wrapped and all router state updates are wrapped. `false`: the router does not use `React.startTransition` on any navigations or state changes. |
| `window` | `Window` | global `window` | `Window` object override. Defaults to the global `window` instance. |

## Notes

- Declarative mode only.
- `<Route>` elements cannot be direct children of the router; wrap them in `<Routes>` (see Routes / Route).
- Source: https://reactrouter.com/api/declarative-routers/HashRouter (docs/api/declarative-routers/HashRouter.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/declarative-routers/HashRouter.md)

## Related

- [Router](./Router.md)
- [BrowserRouter](./BrowserRouter.md)
- [MemoryRouter](./MemoryRouter.md)
