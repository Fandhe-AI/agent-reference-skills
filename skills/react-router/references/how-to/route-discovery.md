# Route Discovery

Application-controlled route discovery (experimental, 8.5.0): discover selected destinations imperatively, complete the route tree after startup, or control manifest-mismatch recovery with `unstable_useRouteDiscovery`.

**Available in:** Framework mode only (conventional Framework Mode; RSC modes are not supported).

## Signature / Usage

Enable the future flag in `react-router.config.ts`:

```ts
import type { Config } from "@react-router/dev/config";

export default {
  future: { unstable_customRouteDiscovery: true },
} satisfies Config;
```

Keep `routeDiscovery.mode: "lazy"` (the default for SSR) and use `unstable_useRouteDiscovery` to choose when to discover destinations or load the complete route manifest:

```tsx
let { state, discoverRoutes, loadAllRoutes } =
  unstable_useRouteDiscovery({
    onManifestMismatch: async (event) => {
      // Handle mismatch, potentially by loading the entire manifest
      await loadAllRoutes();
    },
  });

// state: "partial" | "loading" | "complete"

// Eagerly discover specific paths
let result = await discoverRoutes(paths);
```

### Imperative route discovery

```tsx
import { useEffect } from "react";
import {
  Link,
  unstable_useRouteDiscovery,
} from "react-router";

function Cart() {
  let { discoverRoutes } = unstable_useRouteDiscovery();

  useEffect(() => {
    let controller = new AbortController();

    discoverRoutes(
      ["/checkout/billing", "/checkout/review"],
      { signal: controller.signal },
    ).catch(console.error);

    return () => controller.abort();
  }, [discoverRoutes]);

  return (
    <>
      {/* Render cart items and totals here. */}
      <Link to="/checkout/shipping">
        Proceed to checkout
      </Link>
    </>
  );
}
```

### Handling manifest mismatches

```tsx
unstable_useRouteDiscovery({
  async onManifestMismatch(event) {
    if (hasUnsavedChanges) {
      event.stopPropagation();
      setShowReloadDialog(true);
      return;
    }
    await event.defaultBehavior();
  },
});
```

## Notes

- Without the flag, React Router keeps its existing discovery implementation and the hook is unavailable. Enabling the flag does not require a custom implementation: React Router continues to discover routes automatically and uses its built-in manifest-mismatch recovery unless you provide a custom `onManifestMismatch` handler
- `discoverRoutes(paths, { signal })` accepts application-root paths beginning with `/`; the configured `basename` is applied and query strings and hashes are ignored. Relative paths and external URLs are not supported. Discovery only loads route metadata: it does not navigate, run loaders/actions, or prefetch route modules/stylesheets. Paths are batched within the manifest request URL limit and previously discovered paths are skipped
- The result is `{ type: "success" }`, `{ type: "version-mismatch" }`, or `{ type: "aborted" }`. Unrecovered request failures and unrelated handler errors reject. Imperative mismatches do not automatically trigger a reload
- `loadAllRoutes()` loads the running client's versioned manifest asset to complete its route tree, even if that client is stale, and prevents further incremental discovery. The shared `state` moves from `partial` to `loading` to `complete`; concurrent calls share a load. Failures reject and return the state to `partial`. With `routeDiscovery.mode: "initial"`, SPA Mode, or development's full manifest, the state is already `complete` and the operations are successful no-ops
- Retain the client's versioned manifest and its referenced assets for as long as that client is supported; server routing and loader/action contracts must also remain compatible
- After mismatch handlers settle, surviving operations continue only if the tree is complete; otherwise navigations and fetchers are canceled and their pending state settles. Canceling a navigation also cancels any pending revalidation. If an action already changed server data, the displayed data may remain stale until a later navigation or explicit revalidation. Router-managed Back/Forward cancellations restore the prior history position
- Custom mismatch handlers override built-in recovery; calling the hook without a handler overrides nothing. `event.defaultBehavior()` explicitly runs built-in recovery (eager mismatches warn, navigation mismatches reload the destination, fetcher mismatches reload the current document, imperative mismatches return without reloading). Custom handlers run in reverse registration order, each awaited before the next; `stopPropagation()` prevents earlier handlers from running but does not complete discovery. Deployment polling and staleness policy remain application-owned
- Full-manifest load failures remain catchable and do not render route error boundaries; uncaught failures are reported through `<HydratedRouter onError>` or `console.error`, and the incomplete operation is canceled
- Unstable API: may change without a major release
- Source: https://reactrouter.com/how-to/route-discovery (docs/how-to/route-discovery.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/how-to/route-discovery.md)

## Related

- [unstable_useRouteDiscovery](../hooks/useRouteDiscovery.md) — hook reference
- [Lazy Route Discovery](../explanation/lazy-route-discovery.md) — default discovery behavior
- [react-router.config.ts](../conventions/react-router-config-ts.md) — `routeDiscovery` and `future` options
