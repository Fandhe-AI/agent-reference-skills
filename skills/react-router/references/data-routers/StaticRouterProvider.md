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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| context | `StaticHandlerContext` | The context returned from `StaticHandler`'s `query` |
| router | `DataRouter` | The static router from `createStaticRouter` |
| hydrate | `boolean` | Whether to hydrate the router on the client (default `true`) |
| nonce | `string` | The `nonce` for the hydration `<script>` tag |

## Related

- [createStaticHandler](./createStaticHandler.md)
- [createStaticRouter](./createStaticRouter.md)
