# Headers

Set HTTP response headers from route modules using the `headers` export. Headers can be static, derived from loader/action data, or merged from parent routes.

**Available in:** Framework mode only.

## 実装方法

1. Export a `headers` function from a route module returning a `Headers` instance or plain object
2. Use `loaderHeaders` / `actionHeaders` args to forward dynamic headers set via `data()`
3. Use `parentHeaders` to merge or override ancestor route headers
4. For app-wide headers, add them in `entry.server.tsx` via `handleRequest`

## コード例

```tsx
// Static headers
export function headers(_: Route.HeadersArgs) {
  return {
    "Cache-Control": "max-age=3600, s-maxage=86400",
    "X-Frame-Options": "DENY",
  };
}

// Dynamic headers from loader
import { data } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const [page, ms] = await fakeTimeCall(getPage(params.id));
  return data(page, {
    headers: { "Server-Timing": `page;dur=${ms}` },
  });
}

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return loaderHeaders;
}

// Merging parent headers
export function headers({ parentHeaders }: Route.HeadersArgs) {
  parentHeaders.set("Cache-Control", "max-age=3600");
  return parentHeaders;
}
```

## 注意点

- `Set-Cookie` headers are automatically preserved from parent routes without an explicit `headers` export
- Best practice: define headers only in leaf routes to avoid complex merging
- `react-router reveal` generates `entry.server.tsx` for global header configuration

## 関連

- [./status.md](./status.md)
- [./security.md](./security.md)
