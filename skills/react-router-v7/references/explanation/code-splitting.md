# Automatic Code Splitting

React Router automatically splits code by route, reducing the JavaScript footprint for initial page loads.

**Availability**: Framework Mode only.

## 詳細説明

Route modules become separate bundler entry points. React Router uses URL segments to determine which bundles are needed in the browser. When a user visits `/about`, only the `about.tsx` bundle is loaded — `contact.tsx` is never fetched.

**Server code removal**: All server-only Route Module APIs (`loader`, `action`, `headers`) are automatically stripped from client bundles at build time. You can safely co-locate server-only code in route modules without it leaking to the browser.

## コード例

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

export default function Component({ loaderData }) {
  return <div>{loaderData.message}</div>;
}
```

## 注意点

- `loader`, `action`, and `headers` exports are stripped from client bundles automatically — no manual tree-shaking required
- Framework Mode handles bundle splitting transparently; no Vite/webpack config is needed
- Not available in Data or Declarative modes

## 関連

- [Lazy Route Discovery](./lazy-route-discovery.md)
- [Hot Module Replacement](./hot-module-replacement.md)
- [Type Safety](./type-safety.md)
