# createContext

Creates a type-safe context slot for passing arbitrary values through the request lifecycle — loaders, actions, and middleware — without prop drilling.

## Signature

```typescript
function createContext<T>(defaultValue?: T): RouterContext<T>
```

`RouterContext<T>` is used with `context.get(slot)` and `context.set(slot, value)` inside loaders, actions, and middleware.

## Usage

Define a context slot (typically in a shared file):

```typescript
// app/context.ts
import { createContext } from "react-router";

export const userContext = createContext<User | null>(null);
```

Set the value in middleware:

```typescript
// app/middleware/auth.ts
import { userContext } from "~/context";

export async function authMiddleware({ context, request }) {
  const user = await getUserFromSession(request);
  context.set(userContext, user);
}
```

Read the value in a loader:

```typescript
import { userContext } from "~/context";

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  if (!user) throw new Response("Unauthorized", { status: 401 });
  return { user };
}
```

## Notes

- If no `defaultValue` is provided and the context has not been `set`, calling `context.get()` will **throw an error**
- Follows familiar patterns similar to React's `createContext`, but is designed for the server-side routing lifecycle
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [sessions-and-cookies](./sessions-and-cookies.md)
