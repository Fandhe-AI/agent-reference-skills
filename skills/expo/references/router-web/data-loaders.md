---
source: https://docs.expo.dev/router/web/data-loaders/
---

# Data loaders

Export a `loader` function from a route file to fetch data on the server, and read it with the `useLoaderData` hook from `expo-router`.

## Signature / Usage

```tsx
// src/app/index.tsx
import { Text, View } from 'react-native';
import { useLoaderData } from 'expo-router';

export async function loader() {
  // Fetch data from an API, database, or any server-side source
  const response = await fetch('https://api.example.com/data');
  return response.json();
}

export default function Home() {
  const data = useLoaderData<typeof loader>();

  return (
    <View>
      <Text>Data: {JSON.stringify(data)}</Text>
    </View>
  );
}
```

Dynamic routes receive params as the second argument; server rendering passes the request as the first:

```tsx
export async function loader(request, params) {
  const response = await fetch(`https://api.example.com/posts/${params.postId}`);
  return response.json();
}
```

Typed helpers:

```tsx
import { createStaticLoader, createServerLoader, type LoaderFunction } from 'expo-router/server';

export const loader = createStaticLoader(async params => {
  const response = await fetch(`https://api.example.com/posts/${params.postId}`);
  return response.json();
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `createStaticLoader(fn)` | `(params) => T \| Promise<T>` | Route params only. Safe with static and server rendering. |
| `createServerLoader(fn)` | `(request: ImmutableRequest, params) => T \| Promise<T>` | Needs the incoming request. Throws during static site generation (SSG). |
| `LoaderFunction<T>` | type | Type loaders directly with both `request` and `params`. |

Static vs server rendering:

| Aspect | Static rendering | Server rendering |
| --- | --- | --- |
| Loader execution | Build time | Request time |
| `request` parameter | `undefined` | `ImmutableRequest` |
| Best for | Blogs, marketing pages, documentation | Personalized content, authentication-dependent pages |

Cache defaults when a loader does not declare `Cache-Control` (SDK 58 and later):

| Mode | Default `Cache-Control` | Applies to |
| --- | --- | --- |
| Development | `no-store` | Loader responses |
| Server export | `no-store` | Loader responses |
| Static export | `private, must-revalidate, max-age=0` | Loader data files and the HTML pages that embed their data |

## Notes

- Not the Next.js App Router data fetching API (server components / `fetch` caching); see nextjs-app skill. Loaders are Expo Router route exports served by `expo-server`; hono / fastify handlers are unrelated.
- Stable in SDK 58 and later. For SDK 55-57 enable `unstable_useServerDataLoaders` in the `expo-router` plugin. Requires `web.output` of `static` or `server`.
- Loaders return JSON-serializable data or a `Response` with a JSON body (SDK 58 and later, for setting headers, e.g. `Response.json(posts, { headers: { 'Cache-Control': 'public, max-age=60' } })`). `undefined` / `null` normalize to `null`. Streaming loader data is not supported.
- The `request` parameter is `undefined` in static rendering (no HTTP request at build time).
- `useLoaderData` can be called in any child component; it suspends until data is ready (nearest `<Suspense>`). Loader errors propagate to the route's exported `ErrorBoundary` (`{ error, retry }`).
- Loaders have access to the `expo-server` Runtime API (`setResponseHeaders`, `StatusError`, ...) and `process.env`; env vars used in loaders are never exposed to the client bundle. `loader` exports are dropped from the client bundle, but modules imported from outside **src/app** by client code may still be included.
- Caching (SDK 58 and later): data from the initial HTML is used for hydration; on revisit `useLoaderData` fetches again and the platform HTTP cache decides reuse via `Cache-Control`. There is no permanent in-memory cache and no public API to invalidate a mounted route's data. In SDK 55-57 loader data is cached on the client during navigation. For static exports other static hosts need their own header configuration; HTTP caching does not rerun a static loader.
- Source pages import the typed helpers from `expo-router/server` (guide) while the `expo-server` API reference imports them from `expo-server`; both appear in the original docs.
- Pinned: documentation fetched 2026-10-17 (page modificationDate October 13, 2026), Expo SDK 58.

## Related

- [Server (expo-server)](./server.md)
- [Static rendering](./static-rendering.md)
- [Server rendering](./server-rendering.md)
- [API Routes](./api-routes.md)
