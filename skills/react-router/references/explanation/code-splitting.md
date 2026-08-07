# Automatic Code Splitting

React Router automatically splits code by route, reducing the JavaScript footprint for initial page loads.

**Availability**: Framework Mode only.

Route modules become separate bundler entry points. React Router uses URL segments to determine which bundles are needed in the browser. When a user visits `/about`, only the `about.tsx` bundle is loaded — `contact.tsx` is never fetched.

**Route Module Splitting**: React Router can also split client-side route exports (`clientLoader`, `clientAction`, `clientMiddleware`, `HydrateFallback`) into separate chunks that can be loaded independently from the route component, so these exports can be fetched and executed while the component code is still downloading. This is enabled by default in v8 (previously behind the `future.v8_splitRouteModules` flag in v7).

**Server code removal**: All server-only Route Module APIs (`loader`, `action`, `headers`) are automatically stripped from client bundles at build time. You can safely co-locate server-only code in route modules without it leaking to the browser.

## Signature / Usage

```tsx
// app/routes.ts
import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/contact", "./contact.tsx"),
  route("/about", "./about.tsx"),
] satisfies RouteConfig;
```

```tsx
// about.tsx — after build, only Component remains in the client bundle
export async function loader() {
  return { message: "hello" };
}

export async function action() {
  console.log(Date.now());
  return { ok: true };
}

export async function headers() {
  return { "Cache-Control": "max-age=300" };
}

export default function Component({ loaderData }) {
  return <div>{loaderData.message}</div>;
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `splitRouteModules` (`react-router.config.ts`) | `boolean \| "enforce"` | `true` | Controls route module splitting. `false` opts out; `"enforce"` requires all routes to be splittable |

## Notes

- `loader`, `action`, and `headers` exports are stripped from client bundles automatically — no manual tree-shaking required
- Framework Mode handles bundle splitting transparently; no Vite/webpack config is needed
- Not available in Data or Declarative modes
- `splitRouteModules` is stable in v8 and enabled by default; in v7 it was the `future.v8_splitRouteModules` future flag

## Related

- [Lazy Route Discovery](./lazy-route-discovery.md)
- [Hot Module Replacement](./hot-module-replacement.md)
- [Type Safety](./type-safety.md)
