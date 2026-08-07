# Middleware Auth

Protect routes with reusable authentication middleware using `createContext` and the `middleware` export.

```typescript
// app/context.ts
import { createContext } from "react-router";
export type User = { id: string; name: string };
export const userContext = createContext<User | null>(null);
```

```tsx
// app/routes/dashboard.tsx
import { redirect } from "react-router";
import { userContext } from "~/context";
import type { Route } from "./+types/dashboard";

async function authMiddleware({ request, context }: Route.MiddlewareFunctionArgs, next: () => Promise<Response>) {
  const user = await getUserFromSession(request);
  if (!user) throw redirect("/login");
  context.set(userContext, user);
  return next();
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  return { user };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return <h1>Welcome, {loaderData.user.name}</h1>;
}
```

## Notes

- Middleware is always enabled in v8 — no `future.v8_middleware` flag needed (it was required in v7)
- `context` is always a `RouterContextProvider` instance; a custom `getLoadContext` must also return `new RouterContextProvider({ ... })` instead of a plain object
- Middleware executes parent → child on the way down, child → parent on the way up
- Server middleware must return `await next()`; client middleware typically does not
- `next()` can only be called once per middleware function
