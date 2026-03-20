# Lazy Route Discovery

Lazy Route Discovery loads route metadata progressively as users navigate, rather than sending the full route manifest on initial load. This is the default behavior in Framework Mode.

**Availability**: Framework Mode only.

## 詳細説明

On the initial SSR response, only routes required for that render are included in the manifest. As users navigate to new routes, React Router fetches the missing metadata from a `/__manifest` endpoint.

**What the manifest contains**: metadata about routes (JS/CSS imports, whether a loader/action exists) — not the actual module implementations. Modules are loaded separately on demand.

**Route Discovery Flow:**
1. User navigates to a route not in the current manifest
2. React Router requests `/__manifest`
3. Server responds with the required route metadata patch
4. React Router loads route modules and data
5. Navigation completes

**Eager Discovery (anti-waterfall optimization):** React Router automatically discovers all rendered `<Link>` and `<NavLink>` components via a batched manifest request — typically completing before the user clicks, making subsequent navigation feel synchronous.

## コード例

```tsx
// Links are discovered automatically by default
<Link to="/dashboard">Dashboard</Link>

// Opt out of discovery for a specific link
<Link to="/admin" discover="none">Admin</Link>
```

**Configuration in `react-router.config.ts`:**
```tsx
export default {
  // Default: lazy discovery
  routeDiscovery: {
    mode: "lazy",
    manifestPath: "/__manifest",
  },

  // Custom manifest path (multiple apps on same domain)
  routeDiscovery: {
    mode: "lazy",
    manifestPath: "/my-app-manifest",
  },

  // Disable — include all routes in initial manifest
  routeDiscovery: { mode: "initial" },
} satisfies Config;
```

## 注意点

- Ensure `/__manifest` requests reach your React Router handler (not blocked by CDN or reverse proxy)
- When caching the manifest endpoint via CDN, include the `version` and `paths` query parameters in the cache key
- When running multiple React Router apps on the same domain, set a unique `manifestPath` per app to avoid conflicts
- Applications with many routes benefit most from this optimization

## 関連

- [Code Splitting](./code-splitting.md)
- [Hot Module Replacement](./hot-module-replacement.md)
