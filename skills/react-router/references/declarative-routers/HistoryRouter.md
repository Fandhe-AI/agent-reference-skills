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
| `children` | `React.ReactNode` | — | `<Route>` components describing your route configuration. |
| `history` | `History` | — | A `History` implementation for use by the router. |
| `useTransitions` | `boolean` | `undefined` | Control whether router state updates are internally wrapped in `React.startTransition`. `undefined`: all router state updates are wrapped. `true`: `Link` and `Form` navigations are wrapped and all router state updates are wrapped. `false`: the router does not use `React.startTransition` on any navigations or state changes. |

## Notes

- Experimental (`unstable_`): subject to breaking changes in minor/patch releases. Pay close attention to release notes.
- Using your own `history` object is highly discouraged and may add two versions of the `history` library to your bundles unless you use the same version that React Router uses internally.
- Declarative mode only.
- Naming: the export is `unstable_HistoryRouter` (API reference: `react-router.unstable_HistoryRouter`); the doc file/title is `HistoryRouter` and the signature block in the official page reads `function HistoryRouter`.

## Related

- [Router](./Router.md)
- [BrowserRouter](./BrowserRouter.md)
