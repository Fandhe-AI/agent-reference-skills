# Middleware

Run code before and after `Response` generation for matched routes. Enables authentication, logging, error handling, and data preprocessing in a reusable, composable way. Available in Framework mode and Data mode (not Declarative mode).

**Status (v8):** Stable — no future flag required. (In v7 this required the `v8_middleware` future flag; that flag no longer exists in v8.)

Middleware runs in a nested chain: parent → child on the way down to route handlers, then child → parent on the way up after the `Response` is generated:

```text
- Root middleware start
  - Parent middleware start
    - Child middleware start
      - Run loaders, generate HTML Response
    - Child middleware end
  - Parent middleware end
- Root middleware end
```

## Signature / Usage

### Quick Start (Framework mode)

```ts
// app/context.ts
import { createContext } from "react-router";
import type { User } from "~/types";

export const userContext = createContext<User | null>(null);
```

```tsx
// app/routes/dashboard.tsx
import { redirect } from "react-router";
import { userContext } from "~/context";

// Server-side authentication middleware
async function authMiddleware({ request, context }) {
  const user = await getUserFromSession(request);
  if (!user) throw redirect("/login");
  context.set(userContext, user);
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

// Client-side timing middleware
async function timingMiddleware({ context }, next) {
  const start = performance.now();
  await next();
  console.log(`Navigation took ${performance.now() - start}ms`);
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [timingMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const profile = await getProfile(user);
  return { profile };
}
```

Optional `getLoadContext` for custom servers:

```ts
import { RouterContextProvider } from "react-router";
import { dbContext, createDb } from "./db";

function getLoadContext(req, res) {
  const context = new RouterContextProvider();
  context.set(dbContext, createDb());
  return context;
}
```

### Quick Start (Data mode)

```tsx
import { redirect, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { userContext } from "~/context";

const routes = [
  {
    path: "/",
    middleware: [timingMiddleware],
    Component: Root,
    children: [
      { path: "dashboard", middleware: [authMiddleware], loader: dashboardLoader, Component: Dashboard },
      { path: "login", Component: Login },
    ],
  },
];

async function authMiddleware({ context }) {
  const user = await getUser();
  if (!user) throw redirect("/login");
  context.set(userContext, user);
}

export async function dashboardLoader({ context }: LoaderFunctionArgs) {
  const user = context.get(userContext);
  return { profile: await getProfile(user) };
}
```

Optional `getContext` to seed every navigation/fetcher call, passed when creating the router (mirrors Framework mode's `getLoadContext`):

```tsx
let sessionContext = createContext();

const router = createBrowserRouter(routes, {
  getContext() {
    let context = new RouterContextProvider();
    context.set(sessionContext, getSession());
    return context;
  },
});
```

### Server vs Client Middleware

Server middleware runs on the server (Framework mode) for document requests and `.data` requests, and returns a `Response` back up the chain via `next()`:

```ts
async function serverMiddleware({ request }, next) {
  console.log(request.method, request.url);
  let response = await next();
  console.log(response.status, request.method, request.url);
  return response;
}

export const middleware: Route.MiddlewareFunction[] = [serverMiddleware];
```

Client middleware runs in the browser (Framework and Data mode) for client-side navigations and fetcher calls. There's no HTTP `Request`, so in most cases you can ignore the return value of `next()` and return nothing:

```ts
async function clientMiddleware({ request }, next) {
  console.log(request.method, request.url);
  await next();
  console.log(`Finished ${request.method} ${request.url}`);
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [clientMiddleware];
```

Client middleware receives the return value of the active `dataStrategy` from `next()` (`Record<string, DataStrategyResult>`, keyed by route id), useful for conditional post-processing (e.g. a CMS redirect on 404):

```tsx
async function cmsFallbackMiddleware({ request }, next) {
  const results = await next();
  const found404 = Object.values(results).some(
    (r) => isRouteErrorResponse(r.result) && r.result.status === 404,
  );
  if (found404) {
    const cmsRedirect = await checkCMSRedirects(request.url);
    if (cmsRedirect) throw redirect(cmsRedirect, 302);
  }
}
```

### When Middleware Runs

- **Server middleware:** document requests (`GET /route`) always run server middleware. Client-side navigations only run server middleware if a `.data` request hits the server (i.e. a `loader`/`action` exists on the route). To force server middleware on every client-side navigation involving a route, add an empty `loader`:

  ```tsx
  export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

  // Forces authMiddleware to run on every client-side navigation to this route
  export async function loader() {
    return null;
  }
  ```

- **Client middleware:** runs on every client navigation regardless of whether `loader`s exist.

### The `next()` Function

- From a non-leaf middleware, `next()` runs the next middleware in the chain
- From the leaf middleware, `next()` executes route handlers and generates the `Response`
- Can only be called once per middleware
- If you don't need post-handler code, you can skip calling `next()` — it's called automatically

```ts
const middleware = async ({ context }, next) => {
  console.log("Before"); // runs before handlers
  const response = await next();
  console.log("After"); // runs after handlers
  return response; // optional on client, required on server
};
```

### Context and `AsyncLocalStorage`

Node's `AsyncLocalStorage` works alongside (or instead of) the `context` API and is especially useful with React Server Components, since it lets `middleware` provide data to Server Components/Server Actions running in the same server execution context.

```tsx
// app/user-context.ts
import { AsyncLocalStorage } from "node:async_hooks";

const USER = new AsyncLocalStorage<User>();

export async function provideUser(request: Request, cb: () => Promise<Response>) {
  let user = await getUser(request);
  return USER.run(user, cb);
}

export function getUser() {
  return USER.getStore();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `middleware` | `Route.MiddlewareFunction[]` | Server middleware chain exported from a route module (Framework) or attached to a route object (Data mode) |
| `clientMiddleware` | `Route.ClientMiddlewareFunction[]` | Client middleware chain, runs in the browser |
| `getLoadContext(req, res)` | `(req, res) => RouterContextProvider` | Framework mode: builds the initial `RouterContextProvider` for a custom server |
| `getContext()` | `() => RouterContextProvider` | Data mode: seeds context on every navigation/fetcher call when creating the router |

## Notes

- Server middleware must return the `Response` from `next()`; client middleware typically does not need to
- `next()` can only be called once per middleware function
- Middleware errors are caught by the nearest `ErrorBoundary`; `next()` never throws. Errors thrown *after* `next()` bubble up as if from the throwing route (`loaderData` available); errors thrown *before* `next()` bubble up to the highest route with a `loader` (no `loaderData` available)
- Sharing context between `action` and `loader` only works reliably for document POST requests (SPA submissions use separate POST/GET requests); it always works in `clientMiddleware`/`clientLoader`/`clientAction`
- `AsyncLocalStorage` is not 100% cross-platform (Node API, though Cloudflare/Bun/Deno support it); React Router's `context` API is the runtime-agnostic alternative

## Related

- [./instrumentation.md](./instrumentation.md)
- [./headers.md](./headers.md)
- [./security.md](./security.md)
- [../utils/createContext.md](../utils/createContext.md)
