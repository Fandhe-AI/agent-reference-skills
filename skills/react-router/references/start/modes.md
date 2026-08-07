# Picking a Mode

React Router v8 offers three modes for building applications, each adding progressively more features and structure on top of the previous one: Declarative → Data → Framework.

## Signature / Usage

### Declarative Mode

Basic routing: URL matching, navigation, active states. No data loading APIs.

```jsx
import { BrowserRouter } from "react-router";

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

### Data Mode

Adds `loader`/`action` functions, `useFetcher`, pending UI, and SSR support by moving route configuration outside of React rendering.

```jsx
import { createBrowserRouter, RouterProvider } from "react-router";

let router = createBrowserRouter([
  { path: "/", Component: Root, loader: loadRootData },
]);

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
```

### Framework Mode

Wraps Data Mode with a Vite plugin for a full meta-framework experience: type-safe `href` and route module APIs, code splitting, SPA/SSR/static rendering strategies, file-based routing.

```typescript
import { index, route } from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("products/:pid", "./product.tsx"),
];
```

```typescript
import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  let product = await getProduct(params.pid);
  return { product };
}

export default function Product({ loaderData }: Route.ComponentProps) {
  return <div>{loaderData.product.name}</div>;
}
```

## Options / Props

| Use Framework Mode if you… | Use Data Mode if you… | Use Declarative Mode if you… |
| --- | --- | --- |
| Are new to routing decisions | Want data features with control over bundling | Want simplicity |
| Are considering other meta-frameworks (Next.js, SvelteKit, Astro) | Already have a v6.4+ data router setup | Are coming from older React Router versions |
| Just want to build with React | Need bundling/server control | Have an external data layer handling pending states |
| Might want SSR (or might not) | Are happy with v6.4+ data routers | Are happy with `<BrowserRouter>` / migrating from Create React App |

## Notes

- Modes are additive: Declarative → Data → Framework, each layer keeps the previous layer's capabilities
- Common across all modes: `Link`, `Navigate`, `Outlet`, `Routes`, `useNavigate`, `useLocation`, `useParams`
- Data-mode-and-above features: `useLoaderData`, `useActionData`, `useFetcher`, `useNavigation`, `loader`, `action`
- Framework-mode-only features: `Meta`, `Scripts`, type-safe `href`, file-based routing, `Route` module API
- This `start/` category documents Framework Mode; Data Mode and Declarative Mode have their own doc trees under `/start/data/` and `/start/declarative/` on the official site (not covered here)

## Related

- [installation](./installation.md)
- [routing](./routing.md)
- [route-module](./route-module.md)
