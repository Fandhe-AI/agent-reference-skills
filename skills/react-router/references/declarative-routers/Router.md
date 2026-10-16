# Router

Provides location context for the rest of the app. Available in Declarative mode.

## Signature / Usage

```tsx
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = NavigationType.Pop,
  navigator,
  static: staticProp = false,
  useTransitions,
}: RouterProps): React.ReactElement | null
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `basename` | `string` | `"/"` | The base path for the application. Prepended to all locations. |
| `children` | `React.ReactNode` | `null` | Nested `Route` elements describing the route tree. |
| `location` | `Partial<Location> \| string` | — | The location to match against. Defaults to the current location. Can be a string or a `Location` object. |
| `navigationType` | `NavigationType` | `NavigationType.Pop` | The type of navigation that triggered this `location` change. |
| `navigator` | `Navigator` | — | The navigator to use for navigation. Usually a history object or a custom navigator implementing the `Navigator` interface. |
| `static` | `boolean` | `false` | Whether this router is static (used for SSR). If `true`, the router will not be reactive to location changes. |
| `useTransitions` | `boolean` | `undefined` | Control whether router state updates are internally wrapped in `React.startTransition`. `undefined`: all router state updates are wrapped. `true`: `Link` and `Form` navigations are wrapped and all router state updates are wrapped. `false`: the router does not use `React.startTransition` on any navigations or state changes. |

## Notes

- You usually won't render a `<Router>` directly. Render a router specific to your environment, such as `BrowserRouter` in web browsers or `ServerRouter` for server rendering.

## Related

- [BrowserRouter](./BrowserRouter.md)
- [HashRouter](./HashRouter.md)
- [MemoryRouter](./MemoryRouter.md)
- [StaticRouter](./StaticRouter.md)
- [Route](../components/Route.md)
