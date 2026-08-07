# Route Module

A route module is a file referenced from `routes.ts` that defines automatic code splitting, data loading, actions, and more for that route.

## Signature / Usage

| Export | Runs on | Description |
| --- | --- | --- |
| `default` | both | Route component |
| `loader` | server | Data loading |
| `clientLoader` | client | Client-side data loading |
| `action` | server | Data mutation |
| `clientAction` | client | Client-side data mutation |
| `middleware` | server | Server middleware (stable in v8) |
| `clientMiddleware` | client | Client middleware (stable in v8) |
| `ErrorBoundary` | both | Error display |
| `HydrateFallback` | client | Shown while `clientLoader` runs |
| `headers` | server | HTTP response headers |
| `handle` | both | Arbitrary data for `useMatches()` |
| `links` | both | `<link>` element definitions |
| `meta` | both | Meta tag definitions |
| `shouldRevalidate` | client | Controls revalidation |

### Component (`default`)

```tsx
import type { Route } from "./+types/route-name";

export default function MyRoute({ loaderData, actionData, params, matches }: Route.ComponentProps) {
  return <h1>{loaderData.name}</h1>;
}
```

### `loader`

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  const product = await db.getProduct(params.pid);
  return product;
}
```

### `clientLoader`

```tsx
export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  return { ...serverData, clientData: getClientData() };
}
clientLoader.hydrate = true as const;
```

### `action`

```tsx
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  return await db.updateProject({ title: formData.get("title") });
}
```

### `middleware`

```tsx
export const middleware: Route.MiddlewareFunction[] = [
  async function auth({ request, context }, next) {
    const user = await getUser(request);
    if (!user) throw redirect("/login");
    context.set(userContext, user);
    return next();
  },
];
```

### `clientMiddleware`

```tsx
export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  async function logging({ request }, next) {
    console.log(request.method, request.url);
    await next();
    console.log(`Finished ${request.method} ${request.url}`);
  },
];
```

### `ErrorBoundary`

```tsx
import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <h1>{error.status} {error.statusText}</h1>;
  }
  return <h1>Error</h1>;
}
```

### `meta` (React 19+ recommends native `<meta>`/`<title>` elements instead)

```tsx
export function meta() {
  return [
    { title: "My App" },
    { name: "description", content: "Description" },
  ];
}
```

## Options / Props

Type-safe access to route module APIs is provided via generated types:

```tsx
import type { Route } from "./+types/route-name";
```

## Notes

- `loader`/`action`/`headers`/`middleware` are server-only and stripped from the client bundle
- `meta` replaces the parent route's meta entirely (not merged)
- `clientLoader.hydrate = true as const` makes `clientLoader` also run on initial page load
- **v8 change**: `middleware`/`clientMiddleware` are now stable and production-ready. In v7 they required the `future.unstable_middleware` flag; no flag is needed in v8
- Both server and client middleware take a `next` callback; server middleware must `return next()` and forward the `Response`, client middleware calls `await next()` but has no `Response` to return
- No other route module exports were added, removed, or renamed between v7 and v8

## Related

- [modes](./modes.md)
- [data-loading](./data-loading.md)
- [actions](./actions.md)
- [pending-ui](./pending-ui.md)
