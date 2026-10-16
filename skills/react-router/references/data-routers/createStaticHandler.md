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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| routes | `RouteObject[]` | The route objects to create a static handler for |
| opts.basename | `string` | The base URL for the static handler (default: `/`) |
| opts.future | object | Future flags for the static handler |

Returns a `StaticHandler` that can be used to query data for the provided routes.

## Related

- [createStaticRouter](./createStaticRouter.md)
- [StaticRouterProvider](./StaticRouterProvider.md)
