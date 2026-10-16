# unstable_preloadRoutePattern

Initialize the route-pattern matcher before creating a Data Router or static handler with `future.unstable_routePatternMatching` enabled. Data Mode only.

## Signature / Usage

```tsx
function unstable_preloadRoutePattern(): void
```

```tsx
import { unstable_preloadRoutePattern } from "react-router/route-pattern";

// Call once during application startup, before creating the router
unstable_preloadRoutePattern();
```

## Notes

- Experimental: subject to breaking changes in minor/patch releases; follow release notes closely.
- Import from `react-router/route-pattern` and call once during application startup.
- Server and browser applications must each preload their own matcher.
- The matcher is statically imported by this module; tree-shaking bundlers can remove it from apps that do not use this function. Initialization is synchronous and repeated calls are safe.
- Returns no value.

## Related

- [createBrowserRouter](./createBrowserRouter.md)
- [createStaticHandler](./createStaticHandler.md)
