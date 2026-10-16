# createStaticRouter

Create a static `DataRouter` for server-side rendering. Data Mode only.

## Signature / Usage

```tsx
function createStaticRouter(
  routes: RouteObject[],
  context: StaticHandlerContext,
  opts: {},
)
```

```tsx
export async function handleRequest(request: Request) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let context = await query(request);

  if (context instanceof Response) {
    return context;
  }

  let router = createStaticRouter(dataRoutes, context);
  return new Response(
    ReactDOMServer.renderToString(<StaticRouterProvider ... />),
    { headers: { "Content-Type": "text/html" } }
  );
}
```

Adapted (not in the official docs): propagate the status code of errors caught by ErrorBoundaries

```tsx
return new Response(
  ReactDOMServer.renderToString(<StaticRouterProvider ... />),
  { status: context.statusCode, headers: { "Content-Type": "text/html" } }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| routes | `RouteObject[]` | The route objects to create a static `DataRouter` for |
| context | `StaticHandlerContext` | The context returned from `StaticHandler`'s `query` |
| opts.future | object | Future flags for the static `DataRouter` |
| opts.branches | — | Deprecated optional pre-computed route branches |

Returns a static `DataRouter` that can be used to render the provided routes.

## Notes

- `opts.branches` is deprecated: it is no longer used because branch caching is done automatically inside the static router.
- The official snippet omits `status`; without it errors caught by route ErrorBoundaries are returned with 200. The second fence (`status: context.statusCode`) is the adapted version, not from the official docs.
- Source: https://reactrouter.com/api/data-routers/createStaticRouter (docs/api/data-routers/createStaticRouter.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/data-routers/createStaticRouter.md)

## Related

- [createStaticHandler](./createStaticHandler.md)
- [StaticRouterProvider](./StaticRouterProvider.md)
