# StaticRouter

A `<Router>` that may not navigate to any other `Location`. Useful on the server where there is no stateful UI. Available in Declarative mode.

## Signature / Usage

```tsx
function StaticRouter({
  basename,
  children,
  location: locationProp = "/",
}: StaticRouterProps)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `basename` | `string` | `/` | The base URL for the static router. |
| `children` | `React.ReactNode` | — | The child elements to render inside the static router. |
| `location` | `Partial<Location> \| string` | `"/"` | The `Location` to render the static router at. |

## Notes

- Declarative mode only.

## Related

- [Router](./Router.md)
- [BrowserRouter](./BrowserRouter.md)
