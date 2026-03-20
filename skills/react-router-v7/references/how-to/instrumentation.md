# Instrumentation

Add observability (logging, error reporting, performance tracing) by wrapping request handlers and route functions without modifying runtime logic.

**Status:** Experimental (`unstable_instrumentations`) — subject to breaking changes.

## 実装方法

**Server (Framework mode):** Export `unstable_instrumentations` array from `entry.server.tsx`.

**Client (Framework mode):** Pass `unstable_instrumentations` prop to `<HydratedRouter>`.

**Data mode:** Pass `unstable_instrumentations` option to `createBrowserRouter()`.

## コード例

```tsx
// entry.server.tsx
export const unstable_instrumentations = [
  {
    handler(handler) {
      handler.instrument({
        async request(handleRequest, { request }) {
          console.log(`→ ${request.method} ${request.url}`);
          await handleRequest();
          console.log(`← ${request.url}`);
        },
      });
    },
    route(route) {
      route.instrument({
        async loader(callLoader, { request }) {
          const start = Date.now();
          await callLoader();
          console.log(`loader ${route.id} (${Date.now() - start}ms)`);
        },
      });
    },
  },
];
```

```tsx
// entry.client.tsx
<HydratedRouter
  unstable_instrumentations={[
    {
      router(router) {
        router.instrument({
          async navigate(callNavigate, { to }) {
            console.log(`navigate → ${to}`);
            await callNavigate();
          },
        });
      },
    },
  ]}
/>
```

## 注意点

- Instrumentation is read-only: cannot modify arguments or return values
- Errors thrown inside instrumentation are caught internally and will not break the app
- Available hooks — Handler: `request`; Router: `navigate`, `fetch`; Route: `loader`, `action`, `middleware`, `lazy`
- Use conditional instrumentation to avoid overhead in production

## 関連

- [./middleware.md](./middleware.md)
- [./error-reporting.md](./error-reporting.md)
