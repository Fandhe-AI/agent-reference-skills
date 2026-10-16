# unstable_HistoryRouter

A declarative `<Router>` that accepts a pre-instantiated `history` object. Available in Declarative mode.

## Signature / Usage

```tsx
// Exported as `unstable_HistoryRouter` (e.g. `import { unstable_HistoryRouter } from "react-router"`).
// The official signature block names the function `HistoryRouter`:
function HistoryRouter({
  basename,
  children,
  history,
  useTransitions,
}: HistoryRouterProps)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `basename` | `string` | — | Application basename. |
| `children` | `React.ReactNode` | — | Your app's React tree; route definitions (`<Route>` elements) must be wrapped in `<Routes>` (docs wording: "`<Route>` components describing your route configuration"). |
| `history` | `History` | — | A `History` implementation for use by the router. |
| `useTransitions` | `boolean` | `undefined` | Control whether router state updates are internally wrapped in `React.startTransition`. `undefined`: all router state updates are wrapped. `true`: `Link` and `Form` navigations are wrapped and all router state updates are wrapped. `false`: the router does not use `React.startTransition` on any navigations or state changes. |

## Notes

- Experimental (`unstable_`): subject to breaking changes in minor/patch releases. Pay close attention to release notes.
- Using your own `history` object is highly discouraged and may add two versions of the `history` library to your bundles unless you use the same version that React Router uses internally.
- Declarative mode only.
- Naming: the export is `unstable_HistoryRouter` (API reference: `react-router.unstable_HistoryRouter`); the doc file/title is `HistoryRouter` and the signature block in the official page reads `function HistoryRouter`.
- `<Route>` elements cannot be direct children of the router; wrap them in `<Routes>` (see Routes / Route).
- Source: https://reactrouter.com/api/declarative-routers/HistoryRouter (docs/api/declarative-routers/HistoryRouter.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/declarative-routers/HistoryRouter.md)

## Related

- [Router](./Router.md)
- [BrowserRouter](./BrowserRouter.md)
