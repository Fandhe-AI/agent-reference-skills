# SPA Mode

Build a Single Page Application with React Router by disabling runtime server rendering (`ssr: false`). The root route is still server-rendered at build time to generate `index.html`.

**Available in:** Framework mode only.

## Signature / Usage

1. Set `ssr: false` in `react-router.config.ts`
2. Export `HydrateFallback` from the root route for the loading UI
3. Optionally export a root `loader` (runs at build time only)
4. Use `clientLoader` and `clientAction` for all route data and mutations
5. Deploy `build/client/` to a static host and configure all paths to serve `index.html`

```ts
// react-router.config.ts
export default { ssr: false } satisfies Config;
```

```tsx
// app/root.tsx
export async function loader() {
  return { version: await getVersion() };
}

export function HydrateFallback({ loaderData }: Route.ComponentProps) {
  return <div>Loading v{loaderData.version}...</div>;
}

export default function App() {
  return <Outlet />;
}
```

```tsx
// routes/some-route.tsx
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return fetch(`/api/data/${params.id}`).then((r) => r.json());
}
```

```
# _redirects (Netlify / Cloudflare Pages example)
/*    /index.html   200
```

## Notes

- `ssr: false` disables **runtime** server rendering only; the root route is still rendered at build time — code must be SSR-safe (no bare `window` access during initial render)
- `headers` and `action` exports are not allowed in SPA mode (no runtime server)
- Non-root route `loader` exports are not allowed unless you also configure `prerender`
- If you want a SPA frontend backed by React Router server loaders and actions, see experimental API-only Mode in [Rendering](../start/rendering.md) (`ssr: "unstable_api-only"`, 8.5.0)
- Source: https://reactrouter.com/how-to/spa (docs/how-to/spa.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/how-to/spa.md)

## Related

- [./pre-rendering.md](./pre-rendering.md)
- [./client-data.md](./client-data.md)
