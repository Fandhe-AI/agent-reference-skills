# Middleware

Run code before and after response generation for matched routes. Enables authentication, logging, response header injection, and shared context in a reusable, composable way.

**Status:** Future flag `v8_middleware` required (Framework mode). No flag needed in Data mode.

## 実装方法

1. Enable `future.v8_middleware: true` in `react-router.config.ts` (Framework mode)
2. Create typed context with `createContext<T>()`
3. Export a `middleware` array of `MiddlewareFunction` from route modules
4. Call `await next()` to continue; return the response on the server

## コード例

```ts
// react-router.config.ts
export default { future: { v8_middleware: true } } satisfies Config;
```

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

## 注意点

- Execution order: parent → child on the way "down", child → parent on the way "up"
- Server middleware must return the `Response` from `next()`; client middleware typically does not
- `next()` can only be called once per middleware function
- Middleware only runs when a loader/action exists on the route. Add an empty `loader` export to force middleware to run on routes without data functions
- When using middleware, `getLoadContext` must return a `RouterContextProvider` instance

## 関連

- [./instrumentation.md](./instrumentation.md)
- [./headers.md](./headers.md)
- [./security.md](./security.md)
