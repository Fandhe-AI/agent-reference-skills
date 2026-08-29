# Navigation & URL State

`Link` / `useNavigate` / `useSearch` は React Router (`react-router`) の同名 API とは別物。search params の型安全バリデーション (`validateSearch`) は `nuqs` とも異なる。

| Name | Description | Path |
|------|-------------|------|
| Navigation | Shared `from`/`to` navigation interface (`ToOptions`, `NavigateOptions`) used across all navigation APIs | [navigation.md](./navigation.md) |
| Link, useNavigate, Navigate, router.navigate | `<Link>`, `useNavigate()`, `<Navigate>`, `router.navigate()`, `useMatchRoute`/`<MatchRoute>` | [links.md](./links.md) |
| linkOptions | Type-safe reusable navigation option objects for `Link`/`navigate`/`redirect` | [link-options.md](./link-options.md) |
| createLink | Custom `Link` components with full type safety, incl. third-party library wrapping | [custom-link.md](./custom-link.md) |
| Path Params | `$param`, prefix/suffix, optional (`{-$param}`), `params.parse`/`priority` | [path-params.md](./path-params.md) |
| Search Params | JSON-first search params, `validateSearch`, adapters (Zod/Valibot/ArkType/Effect), middlewares | [search-params.md](./search-params.md) |
| Custom Search Param Serialization | `parseSearch`/`stringifySearch`, `parseSearchWith`/`stringifySearchWith`, alternative serializers | [custom-search-param-serialization.md](./custom-search-param-serialization.md) |
| Route Masking | Masking the displayed URL (`mask` option, `routeMasks`, `createRouteMask`) | [route-masking.md](./route-masking.md) |
| Navigation Blocking | `useBlocker`, `<Block>`, `shouldBlockFn`, `beforeunload` handling | [navigation-blocking.md](./navigation-blocking.md) |
| History Types | `createBrowserHistory`, `createHashHistory`, `createMemoryHistory` | [history-types.md](./history-types.md) |
| Scroll Restoration | `scrollRestoration`, `scrollToTopSelectors`, `getScrollRestorationKey`, manual restoration | [scroll-restoration.md](./scroll-restoration.md) |
| Internationalization (i18n) | Locale-prefix routing via optional path params, Paraglide integration | [internationalization-i18n.md](./internationalization-i18n.md) |
