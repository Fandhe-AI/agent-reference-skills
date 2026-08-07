# Data Loading

Load route data server-side with `loader` and access it via `loaderData` in the component.

```tsx
// app/routes/product.tsx
import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fakeDb.getProduct(params.pid);
  if (!product) throw data("Not Found", { status: 404 });
  return product;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>{loaderData.name}</h1>
      <p>{loaderData.description}</p>
    </div>
  );
}
```

## Notes

- `loader` runs server-side only — safe to use database clients and secrets
- `loaderData` is typed automatically from the `loader` return type via `Route.ComponentProps`
- Throw `data("message", { status: 404 })` for expected errors; the `ErrorBoundary` renders instead
- All loaders re-run automatically after a successful action completes
