# Middleware

Run code before and after response generation for matched routes. Enables authentication, logging, response header injection, and shared context in a reusable, composable way.

**Status:** Future flag `v8_middleware` required (Framework mode). In Data mode, augment the `Future` interface instead.

## Setup

### Framework Mode

```ts
// react-router.config.ts
export default { future: { v8_middleware: true } } satisfies Config;
```

### Data Mode

```ts
// src/react-router.d.ts
import "react-router";
declare module "react-router" {
  interface Future { v8_middleware: true; }
}
```

## Execution Order

Middleware runs parent → child on the way down, then child → parent on the way up after the Response is generated:

```
Root middleware start
  Parent middleware start
    Child middleware start
      Run loaders → generate Response
    Child middleware end
  Parent middleware end
Root middleware end
```

## Server Middleware

```tsx
// app/context.ts
import { createContext } from "react-router";
export const userContext = createContext<User | null>(null);
```

```tsx
// routes/dashboard.tsx
import { redirect } from "react-router";
import { userContext } from "~/context";

async function authMiddleware({ request, context }) {
  const user = await getUserFromSession(request);
  if (!user) throw redirect("/login");
  context.set(userContext, user);
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  return { user };
}
```

## Client Middleware

Runs in the browser for every client-side navigation, regardless of whether loaders exist.

```tsx
async function timingMiddleware({ request }, next) {
  const start = performance.now();
  await next();
  console.log(`Navigation took ${performance.now() - start}ms`);
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  timingMiddleware,
];
```

Client middleware can inspect loader/action results via the return value of `next()`:

```tsx
async function cmsFallbackMiddleware({ request }, next) {
  const results = await next();
  // results is Record<string, DataStrategyResult> keyed by route id
  const found404 = Object.values(results).some(
    (r) => isRouteErrorResponse(r.result) && r.result.status === 404,
  );
  if (found404) {
    const cmsRedirect = await checkCMSRedirects(request.url);
    if (cmsRedirect) throw redirect(cmsRedirect, 302);
  }
}
```

## `getLoadContext` Migration

When middleware is enabled, `context` changes from a plain object to a `RouterContextProvider` instance.

```ts
// Before (without middleware)
function getLoadContext(req, res) {
  return { db: createDb() };
}

// After (with middleware)
import { createContext, RouterContextProvider } from "react-router";
const dbContext = createContext<Database>();

function getLoadContext(req, res) {
  const context = new RouterContextProvider();
  context.set(dbContext, createDb());
  return context;
}
```

## Notes

- Server middleware must return the `Response` from `next()`; client middleware typically does not
- `next()` can only be called once per middleware function
- Server middleware runs on document requests and `.data` requests, but not on client-side navigations unless a loader/action exists. Add an empty `loader` to force execution on every navigation
- Middleware errors are caught by the nearest `ErrorBoundary`; `next()` never throws
- `AsyncLocalStorage` is compatible with server middleware and works well with RSC

## Related

- [./instrumentation.md](./instrumentation.md)
- [./headers.md](./headers.md)
- [./security.md](./security.md)
- [../utils/createContext.md](../utils/createContext.md)
- [../utils/RouterContextProvider.md](../utils/RouterContextProvider.md)
