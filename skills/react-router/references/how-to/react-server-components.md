# React Server Components

Experimental support for React Server Components (RSC), enabling server-side rendering with direct data access, Server Functions, and mixed server/client component trees.

**Status:** Experimental — subject to breaking changes in minor/patch releases (still true in v8; the `unstable_` prefix on the RSC APIs remains). Requires React 19+.
**Available in:** Framework Mode and Data Mode (not Declarative Mode).

## Signature / Usage

### Quick Start Templates

```bash
# RSC Framework Mode (uses unstable_reactRouterRSC + @vitejs/plugin-rsc)
npx create-react-router@latest --template remix-run/react-router-templates/unstable_rsc-framework-mode

# RSC Data Mode (Vite, uses @vitejs/plugin-rsc)
npx create-react-router@latest --template remix-run/react-router-templates/unstable_rsc-data-mode-vite
```

### RSC Framework Mode

Uses a dedicated Vite plugin, `unstable_reactRouterRSC`, with a peer dependency on `@vitejs/plugin-rsc` (must be placed **after** `reactRouterRSC()`):

```ts
// vite.config.ts
import { unstable_reactRouterRSC as reactRouterRSC } from "@react-router/dev/vite";
import rsc from "@vitejs/plugin-rsc";

export default defineConfig({ plugins: [reactRouterRSC(), rsc()] });
```

Loaders/actions can return React elements directly:

```tsx
export async function loader() {
  return { message: "Message from the server!", element: <p>Element from the server!</p> };
}

export default function Route({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>{loaderData.message}</h1>
      {loaderData.element}
    </>
  );
}
```

Routes export `ServerComponent` instead of `default` to render on the server (a route cannot export both). `clientLoader`/`clientAction` remain available alongside `ServerComponent`. Server/client export counterparts:

| Server Export | Client Export |
|---|---|
| `ServerComponent` | `default` |
| `ServerErrorBoundary` | `ErrorBoundary` |
| `ServerLayout` | `Layout` |
| `ServerHydrateFallback` | `HydrateFallback` |

```tsx
export function ServerComponent({ loaderData }: Route.ServerComponentProps) {
  return <h1>{loaderData.message}</h1>;
}
```

Client-only features (Hooks, event handlers) must be extracted into a `"use client"` module:

```tsx
// counter.tsx
"use client";
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

`.server`/`.client` file-naming conventions are **not** supported in RSC Framework Mode (conflicts with `"use server"`/`"use client"`); use the `"server-only"` / `"client-only"` imports from `@vitejs/plugin-rsc` instead, or the `vite-env-only` plugin to migrate existing `.server`/`.client` files.

Custom entry files are auto-detected in `app/`: `entry.rsc.ts(x)`, `entry.ssr.ts(x)`, `entry.client.tsx`. Inspect defaults with `react-router reveal entry.client|entry.rsc|entry.ssr`.

**Unsupported config options in RSC Framework Mode:** `buildEnd`, `presets`, `serverBundles`, `splitRouteModules`.

### RSC Data Mode

Lower-level APIs for custom bundler/framework integration (missing `routes.ts` file-system routing, HMR/HDR, but more flexible).

Routes are configured via `matchRSCServerRequest`, ideally using `lazy()` + Route Module exports (`loader`, `action`, `meta`, `links`, `headers`, `ErrorBoundary`, `HydrateFallback`, client annotations):

```tsx
// app/routes.ts
import type { unstable_RSCRouteConfig as RSCRouteConfig } from "react-router";

export function routes() {
  return [
    {
      id: "root",
      path: "",
      lazy: () => import("./root/route"),
      children: [
        { id: "home", index: true, lazy: () => import("./home/route") },
      ],
    },
  ] satisfies RSCRouteConfig;
}
```

A route's `default` export renders as a Server Component, and can be `async` to fetch data directly:

```tsx
export default async function Home() {
  let user = await getUserData();
  return <p>Hello, {user ? user.name : "anonymous person"}!</p>;
}
```

Server Functions use the `"use server"` directive and are called like normal async functions; React Router automatically revalidates the route after a Server Function call:

```tsx
"use server";
export async function updateFavorite(formData: FormData) {
  const movieId = formData.get("id");
  // ...
}
```

`clientLoader`, `clientAction`, and `shouldRevalidate` are provided via a `"use client"` module and re-exported from the lazy-loaded route module:

```tsx
// client.tsx
"use client";
export function clientLoader() {}
export function clientAction() {}
export function shouldRevalidate() {}
```

Key APIs for wiring a custom RSC-compatible bundler:

- `unstable_matchRSCServerRequest` — RSC server entry: matches the request to a route, generates RSC payloads
- `unstable_routeRSCServerRequest` + `unstable_RSCStaticRouter` — SSR entry: converts RSC payload to HTML
- `unstable_createCallServer` + `unstable_getRSCStream` + `unstable_RSCHydratedRouter` — browser entry: hydrates HTML, sets `callServer` for post-hydration Server Function calls

See the `@vitejs/plugin-rsc` docs and the Vite RSC Data Mode template for a full working `vite.config.ts` / `entry.ssr.tsx` / `entry.rsc.tsx` / `entry.browser.tsx` wiring example.

### Content Security Policy nonces

A per-response CSP nonce can allow inline hydration scripts without allowing arbitrary inline scripts. Generate a fresh nonce per document response and pass it to `routeRSCServerRequest`, `RSCStaticRouter`, and the CSP response header:

```tsx
// app/entry.ssr.tsx
export async function generateHTML(request: Request, serverResponse: Response) {
  const nonce = crypto.randomUUID();
  const response = await routeRSCServerRequest({
    request,
    serverResponse,
    createFromReadableStream,
    nonce,
    async renderHTML(getPayload, options) {
      const payload = getPayload();
      return renderHTMLToReadableStream(
        <RSCStaticRouter getPayload={getPayload} nonce={options.nonce} />,
        { ...options, formState: await payload.formState, signal: request.signal },
      );
    },
  });
  response.headers.set("Content-Security-Policy", `script-src 'self' 'nonce-${nonce}'`);
  return response;
}
```

## Notes

- `.server`/`.client` module conventions are NOT supported in RSC Framework Mode; use `"server-only"`/`"client-only"` from `@vitejs/plugin-rsc` instead
- Loaders and actions can return React elements directly in RSC Framework Mode
- `AsyncLocalStorage` works with server middleware in RSC mode via the same middleware integration described in the middleware guide
- MDX routes are supported in RSC Framework Mode with `@mdx-js/rollup` v3.1.1+, but exported components must remain valid in RSC environments (no Hooks)
- The default RSC Framework entry does not generate a CSP nonce; only add one if your app also sends a matching CSP header — prefer CSP hashes or external scripts for statically prerendered pages

## Related

- [./spa.md](./spa.md)
- [./client-data.md](./client-data.md)
- [./middleware.md](./middleware.md)
