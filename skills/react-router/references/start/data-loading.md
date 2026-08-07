# Data Loading

`loader` and `clientLoader` provide data to a route component.

## Signature / Usage

### Server Loader

```tsx
import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fakeDb.getProduct(params.pid);
  return product;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  return <h1>{loaderData.name}</h1>;
}
```

- Server-only (stripped from the client bundle)
- Runs during SSR and on client navigations

### Client Loader

```tsx
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.pid}`);
  return await res.json();
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}
```

- Browser-only
- Requires a `HydrateFallback` to render while it runs on first load

### Combined (server + client)

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  return fakeDb.getProduct(params.pid);
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  const clientData = getClientData();
  return { ...serverData, ...clientData };
}
clientLoader.hydrate = true as const;
```

### Static (pre-rendering)

```typescript
// react-router.config.ts
export default {
  async prerender() {
    const products = await readProductsFromCSV();
    return products.map((p) => `/products/${p.id}`);
  },
} satisfies Config;
```

The loader runs at build time.

## Options / Props

| Loader | Runs | Server APIs | Use case |
| --- | --- | --- | --- |
| Server (`loader`) | Server (SSR + navigations) | yes | Dynamic server data |
| Client (`clientLoader`) | Browser only | no | Client-side fetches |
| Static (`loader` + `prerender()`) | Build time | yes | Pre-rendered pages |

Supported return types: primitives (string, number, boolean), collections (Array, Object), and `Map`, `Set`, `Date`, `Promise`.

## Notes

- `loader` can safely use server-only APIs
- URLs not covered by `prerender()` fall back to SSR
- `clientLoader.hydrate = true as const` also runs `clientLoader` on initial page load
- No breaking changes to the loader APIs between v7 and v8

## Related

- [modes](./modes.md)
- [route-module](./route-module.md)
- [actions](./actions.md)
- [rendering](./rendering.md)
