# Client Data

Use `clientLoader` and `clientAction` to fetch and mutate data directly in the browser. The primary mechanism for data handling in SPA mode; also useful in SSR to skip the server hop or combine server + client data.

**Available in:** Framework mode only.

## 実装方法

1. Export `clientLoader` from a route module to load data in the browser
2. Set `clientLoader.hydrate = true` to run the loader during initial hydration
3. Export `HydrateFallback` to show UI while the client loader runs on first load
4. Call `serverLoader()` inside `clientLoader` to combine server and client data

## コード例

```tsx
// Fullstack state: merge server DB data with client IndexedDB data
export async function loader({ request }: Route.LoaderArgs) {
  return getPartialDataFromDb({ request });
}

export async function clientLoader({
  request,
  serverLoader,
}: Route.ClientLoaderArgs) {
  const [serverData, clientData] = await Promise.all([
    serverLoader(),
    getClientData(request),
  ]);
  return { ...serverData, ...clientData };
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return <div>{loaderData.title}</div>;
}
```

## 注意点

- `clientLoader` is NOT called on hydration unless `clientLoader.hydrate = true` is set
- When using `hydrate = true` without `HydrateFallback`, ensure `loader` and `clientLoader` return identical data to avoid hydration errors
- In SPA mode (`ssr: false`), `clientLoader` is the primary data loading mechanism

## 関連

- [./spa.md](./spa.md)
- [./fetchers.md](./fetchers.md)
