# unstable_useRouteDiscovery

Controls lazy route discovery in Framework Mode with `future.unstable_customRouteDiscovery` enabled. Imperatively discover routes and add custom handling when a manifest version mismatch is detected. Calling `loadAllRoutes` loads the entire route manifest for the current (potentially stale) client version; this requires that prior client artifacts are still available on your CDN and that you have not made breaking changes to the API contracts of your loaders and actions.

## Signature / Usage

```tsx
function useRouteDiscovery(options: RouteDiscoveryOptions = {})
```

```tsx
let { state, discoverRoutes, loadAllRoutes } = unstable_useRouteDiscovery({
  onManifestMismatch: async (event) => {
    // Eagerly load the complete route tree for this client without requiring a hard reload
    await event.loadAllRoutes();
  },
});

// Eagerly discover specific routes
discoverRoutes(["/a", "/b"]);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `options` | `RouteDiscoveryOptions` | An awaited manifest-mismatch handler (`onManifestMismatch`). |

Returns the client version, full-manifest loading state, and discovery operations (`state`, `discoverRoutes`, `loadAllRoutes`).

## Notes

- Framework Mode only. Experimental (`unstable_`, added in 8.5.0): subject to breaking changes in minor/patch releases; requires `future.unstable_customRouteDiscovery: true` in `react-router.config.ts`. See [Route Discovery](../how-to/route-discovery.md) for the full guide
- Exported as `unstable_useRouteDiscovery`; the function is documented as `useRouteDiscovery`
- Source: https://reactrouter.com/api/hooks/useRouteDiscovery (docs/api/hooks/useRouteDiscovery.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/api/hooks/useRouteDiscovery.md)

## Related

- [Route Discovery](../how-to/route-discovery.md) — guide with examples
- [Lazy Route Discovery](../explanation/lazy-route-discovery.md) — default discovery behavior
- [HydratedRouter](../routers/HydratedRouter.md) — Framework Mode client router
