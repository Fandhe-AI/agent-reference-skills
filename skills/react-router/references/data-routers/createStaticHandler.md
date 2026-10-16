# createStaticHandler

Create a static handler to perform server-side data loading. Data Mode only.

## Signature / Usage

```tsx
function createStaticHandler(
  routes: RouteObject[],
  opts?: CreateStaticHandlerOptions,
): StaticHandler
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
| routes | `RouteObject[]` | The route objects to create a static handler for |
| opts.basename | `string` | The base URL for the static handler (default: `/`) |
| opts.future | object | Future flags for the static handler |

Returns a `StaticHandler` that can be used to query data for the provided routes.

## Notes

- The official snippet omits `status`; without it errors caught by route ErrorBoundaries are returned with 200. The second fence (`status: context.statusCode`) is the adapted version, not from the official docs.
- Source: https://reactrouter.com/api/data-routers/createStaticHandler (docs/api/data-routers/createStaticHandler.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/data-routers/createStaticHandler.md)

## Related

- [createStaticRouter](./createStaticRouter.md)
- [StaticRouterProvider](./StaticRouterProvider.md)
