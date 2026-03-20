# File Route Conventions

The `@react-router/fs-routes` package enables file-system based routing where filenames in `app/routes/` automatically map to URL paths.

**Available in:** Framework mode only.

## 実装方法

1. Install: `npm i @react-router/fs-routes`
2. Use `flatRoutes()` in `app/routes.ts`
3. Name files following the conventions below

## コード例

```ts
// app/routes.ts
import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes() satisfies RouteConfig;
```

| Filename | URL |
|---|---|
| `_index.tsx` | `/` |
| `about.tsx` | `/about` |
| `concerts.$city.tsx` | `/concerts/:city` |
| `concerts._index.tsx` | `/concerts` |
| `_auth.login.tsx` | `/login` (nested under `_auth.tsx` layout) |
| `concerts_.mine.tsx` | `/concerts/mine` (no layout nesting) |
| `($lang)._index.tsx` | `/` or `/:lang` |
| `$.tsx` | catch-all |
| `sitemap[.]xml.tsx` | `/sitemap.xml` |

```tsx
// Folder routes: app/routes/concerts.$city/route.tsx
export async function loader({ params }) {
  return fakeDb.getAllConcertsForCity(params.city);
}
```

## 注意点

- Supported extensions: `.js`, `.jsx`, `.ts`, `.tsx`
- Files inside a folder route (other than `route.tsx`) are NOT treated as routes
- For catch-all routes, return `data({}, 404)` from the loader for a proper 404 response
- Configure `ignoredRouteFiles` or `rootDirectory` options in `flatRoutes()` as needed

## 関連

- [./resource-routes.md](./resource-routes.md)
- [./route-module-type-safety.md](./route-module-type-safety.md)
