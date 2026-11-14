# Custom Fetch

Customize the JavaScript-issued requests React Router makes for server loader/action data and lazy route discovery through the `unstable_fetch` prop of `HydratedRouter`. Add headers, customize fetch options, or apply a request policy based on the operation that initiated the request.

**Available in:** Framework mode only (experimental, 8.5.0; not supported in RSC Framework Mode). In Data Mode, control fetching in your loaders/actions or through a `dataStrategy` (see [Data Strategy](./data-strategy.md)).

## Signature / Usage

If you don't have an `app/entry.client.tsx`, reveal the default entry:

```shellscript nonumber
npx react-router reveal entry.client
```

Pass a custom implementation to `HydratedRouter`:

```tsx filename=app/entry.client.tsx
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import {
  HydratedRouter,
  type unstable_RouterFetch,
} from "react-router/dom";

const customFetch: unstable_RouterFetch = (
  request,
  context,
) => {
  console.log(context.type, request.method, request.url);
  return fetch(request);
};

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter unstable_fetch={customFetch} />
    </StrictMode>,
  );
});
```

### Request context

```ts
import type { NavigationType } from "react-router";

type unstable_RouterFetchContext =
  | { type: "manifest" }
  | {
      type: "navigation";
      fetcherKey: string | null;
      navigationType: NavigationType;
    }
  | {
      type: "initialization" | "fetcher" | "revalidation";
      fetcherKey: string | null;
      navigationType: null;
    };
```

### Authentication and custom headers

```ts
import type { unstable_RouterFetch } from "react-router/dom";
import { authStore } from "./auth";

const customFetch: unstable_RouterFetch = (request) => {
  let headers = new Headers(request.headers);
  let token = authStore.getAccessToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  headers.set("X-App-Version", "1.0");
  return fetch(request, { headers });
};
```

### Back/forward traversal cache

```ts
import type { unstable_RouterFetch } from "react-router/dom";

const customFetch: unstable_RouterFetch = (
  request,
  context,
) => {
  let isTraversal =
    import.meta.env.PROD &&
    request.method === "GET" &&
    context.type === "navigation" &&
    context.navigationType === "POP";

  return fetch(request, {
    cache: isTraversal ? "force-cache" : "default",
  });
};
```

## Notes

- The callback receives a constructed `Request` (URL, headers, body, abort signal) and must return a `Promise<Response>`; pass that request to the browser's `fetch` to preserve those settings, including cancellation. `HydratedRouter` reads `unstable_fetch` only during initialization, so read changing values such as auth tokens inside the callback
- `type` identifies the initiator: `"manifest"` (lazy route discovery), `"initialization"` (router initialization data loading), `"navigation"` (navigation, including action submissions and the following loader revalidation), `"fetcher"` (fetcher operations including loader revalidation after a fetcher action), `"revalidation"` (explicit revalidation such as `useRevalidator().revalidate()`). `fetcherKey` is `null` for route loader/action requests; a fetcher reloaded by a navigation or revalidation retains that `type` and includes its key. `navigationType` is `"PUSH"`, `"REPLACE"` or `"POP"` for navigation-initiated data requests, otherwise `null`
- Only send credentials to trusted origins; custom headers on cross-origin requests may require a CORS preflight. In API-only Mode `unstable_apiServerOrigin` sets a separate API origin but does not enable cross-origin cookies; customize the credential policy in the callback if you need them
- The `force-cache` traversal example is not a router-managed data cache and adds no mutation or authentication invalidation guarantees; use it only when serving potentially stale data is appropriate
- Custom fetch does not intercept the initial document request, server-side loader execution, static assets, or fetches in your own code including `clientLoader` / `clientAction` (their `serverLoader` / `serverAction` helpers do use it). Data prefetches from `<Link prefetch>`, `<NavLink prefetch>`, and `PrefetchPageLinks` use native `<link rel="prefetch">` and bypass it; use `prefetch="none"` and avoid `PrefetchPageLinks` when such requests need custom headers
- To choose headers from a form field such as `intent`, read `await request.clone().formData()` for form-encoded submissions and send the original request; do not consume the body directly. Return the response from `fetch` unchanged: React Router decodes its manifest/data protocol (including Turbo Stream-encoded data) itself
- Unstable API: may change in minor or patch releases
- Source: https://reactrouter.com/how-to/custom-fetch (docs/how-to/custom-fetch.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/how-to/custom-fetch.md)

## Related

- [HydratedRouter](../routers/HydratedRouter.md) — `unstable_fetch` prop
- [Data Strategy](./data-strategy.md) — request metadata for Data Mode
- [Rendering](../start/rendering.md) — API-only Mode and `unstable_apiServerOrigin`
