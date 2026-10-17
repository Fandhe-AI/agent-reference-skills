---
source: https://docs.expo.dev/router/web/async-routes/
---

# Async routes

Expo Router splits the JavaScript bundle per route file using React Suspense, so only routes you navigate to are bundled or loaded.

## Signature / Usage

Configure `asyncRoutes` in the `expo-router` config plugin:

```json
{
  "expo": {
    "plugins": [["expo-router", { "asyncRoutes": false }]]
  }
}
```

Per-platform and per-mode form:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-router",
        {
          "origin": "https://acme.com",
          "asyncRoutes": {
            "web": true,
            "android": false,
            "default": "development"
          }
        }
      ]
    ]
  }
}
```

Clear the Metro cache after changing the setting:

```sh
npx expo start --clear
npx expo export --clear
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `asyncRoutes` | boolean \| `"development"` \| `"production"` \| object | `false` disables on all platforms. `"development"` / `"production"` enable only in that mode. |
| `asyncRoutes.default` / `android` / `ios` / `web` | boolean \| `"development"` \| `"production"` | Per-platform settings. An explicit platform value takes precedence over `default`. |
| `experiments.chunking.mode` | `"granular"` \| `"legacy"` | SDK 58 and later, experimental. Groups shared dependencies by the routes that need them for production web exports. |

## Notes

- Distinct from Next.js dynamic imports / App Router code splitting; this is Expo Router route-file splitting (see nextjs-app skill).
- SDK 58 and later: async routes on web are stable and enabled by default in development and production. Native platforms default to disabled, remain experimental, and are supported only in development. In SDK 57 and earlier, an explicit opt-in is needed on every platform.
- `{ "default": false }` disables async routes on web unless `web` explicitly enables them. In SDK 58 and later, setting only native platforms keeps the web default (for example `{ "android": true }` behaves as `{ "android": true, "web": true }`). Native production builds still load routes synchronously.
- All routes are wrapped in a Suspense boundary. Loading errors are handled by the parent route's `ErrorBoundary` export. In development all files are treated as routes (cannot be statically analyzed); invalid routes show a fallback warning screen after loading.
- On native production builds all Suspense boundaries are disabled and there are no loading states. Hermes apps benefit less from splitting (bytecode is memory mapped).
- Static rendering: production web renders Suspense boundaries synchronously in Node.js and links async chunks in the HTML. All layout routes leading to the leaf route, and anchor routes (`unstable_settings = { anchor: '...' }`), are included in the initial response.
- Granular splitting applies only to production web client exports with bundle splitting enabled; development, native and DOM component bundles use the legacy strategy; projects with React Server Components use legacy for every bundle; if a web worker or its dependency has an async import, Expo falls back to legacy for the entire graph. Enabling async routes does not opt into granular splitting.
- Caveat: custom `SuspenseFallback` exports do not work with async routes. In SDK 58 and later web apps use the default loading fallback unless async routes are disabled (`asyncRoutes: { web: false }`).
- Pinned: documentation fetched 2026-10-17 (page modificationDate October 13, 2026), Expo SDK 58.

## Related

- [Static rendering](./static-rendering.md)
- [Server rendering](./server-rendering.md)
