# StaticRouterProvider

A `DataRouter` that may not navigate to any other `Location`. Useful on the server where there is no stateful UI. Data Mode only.

## Signature / Usage

```tsx
function StaticRouterProvider({
  context,
  router,
  hydrate = true,
  nonce,
}: StaticRouterProviderProps)
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
| context | `StaticHandlerContext` | The context returned from `StaticHandler`'s `query` |
| router | `DataRouter` | The static router from `createStaticRouter` |
| hydrate | `boolean` | Whether to hydrate the router on the client (default `true`) |
| nonce | `string` | The `nonce` for the hydration `<script>` tag |

## Notes

- The official snippet omits `status`; without it errors caught by route ErrorBoundaries are returned with 200. The second fence (`status: context.statusCode`) is the adapted version, not from the official docs.
- Source: https://reactrouter.com/api/data-routers/StaticRouterProvider (docs/api/data-routers/StaticRouterProvider.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/api/data-routers/StaticRouterProvider.md)

## Related

- [createStaticHandler](./createStaticHandler.md)
- [createStaticRouter](./createStaticRouter.md)
