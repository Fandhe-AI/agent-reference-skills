# MemoryRouter

A declarative `<Router>` that stores all entries in memory. Available in Declarative mode.

## Signature / Usage

```tsx
function MemoryRouter({
  basename,
  children,
  initialEntries,
  initialIndex,
  useTransitions,
}: MemoryRouterProps): React.ReactElement
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `basename` | `string` | — | Application basename. |
| `children` | `React.ReactNode` | — | Your app's React tree; route definitions (`<Route>` elements) must be wrapped in `<Routes>` (docs wording: "Nested `Route` elements describing the route tree"). |
| `initialEntries` | `InitialEntry[]` | — | Initial entries in the in-memory history stack. |
| `initialIndex` | `number` | — | Index of `initialEntries` the application should initialize to. |
| `useTransitions` | `boolean` | `undefined` | Control whether router state updates are internally wrapped in `React.startTransition`. `undefined`: all router state updates are wrapped. `true`: `Link` and `Form` navigations are wrapped and all router state updates are wrapped. `false`: the router does not use `React.startTransition` on any navigations or state changes. |

## Notes

- Declarative mode only.
- `<Route>` elements cannot be direct children of the router; wrap them in `<Routes>` (see Routes / Route).
- Source: https://reactrouter.com/api/declarative-routers/MemoryRouter (docs/api/declarative-routers/MemoryRouter.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/declarative-routers/MemoryRouter.md)

## Related

- [Router](./Router.md)
- [BrowserRouter](./BrowserRouter.md)
- [Route](../components/Route.md)
