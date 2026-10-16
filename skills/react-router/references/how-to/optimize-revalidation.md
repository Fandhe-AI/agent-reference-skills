# Revalidation Optimization

After a mutation or some navigations, React Router re-runs loaders so the UI stays in sync with the server. When a loader is expensive, or a mutation cannot affect that route's data, you can skip the reload. Available in Framework mode and Data mode.

## Signature / Usage

Skip a route's loader with `shouldRevalidate`, exported from the route module (Framework Mode) or set on the route object (Data Mode). Returning `false` skips **that route's** loader.

```tsx
// app/routes/dashboard.tsx — Framework Mode
export function shouldRevalidate() {
  return false;
}
```

```tsx
// src/main.tsx — Data Mode
createBrowserRouter([
  {
    path: "/dashboard",
    loader: dashboardLoader,
    shouldRevalidate: () => false,
    Component: Dashboard,
  },
]);
```

Opt out of specific requests by inspecting `ShouldRevalidateFunctionArgs` and returning `defaultShouldRevalidate` for everything else:

```tsx
import type { ShouldRevalidateFunctionArgs } from "react-router";

export function shouldRevalidate({
  formMethod,
  formAction,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  if (
    formMethod === "POST" &&
    formAction?.endsWith("/analytics")
  ) {
    return false;
  }

  return defaultShouldRevalidate;
}
```

Ignore search-param-only updates while still revalidating when the pathname changes:

```tsx
export function shouldRevalidate({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  if (currentUrl.pathname === nextUrl.pathname) {
    return false;
  }

  return defaultShouldRevalidate;
}
```

Adapted (not in the official docs): also keep revalidating for mutations, same-URL navigations and explicit revalidations

```tsx
export function shouldRevalidate({
  formMethod,
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  if (formMethod && formMethod !== "GET") {
    return defaultShouldRevalidate;
  }

  if (
    currentUrl.pathname === nextUrl.pathname &&
    currentUrl.search !== nextUrl.search
  ) {
    return false;
  }

  return defaultShouldRevalidate;
}
```

Skip revalidation for one event by passing `defaultShouldRevalidate={false}` at the call site:

```tsx
<Link to="/search?q=shoes" defaultShouldRevalidate={false}>
  Search Shoes
</Link>

<Form method="post" action="/analytics" defaultShouldRevalidate={false}>
  <button>Track Click</button>
</Form>
```

```tsx
fetcher.submit(
  { intent: "save-progress" },
  {
    method: "post",
    action: "/save-progress",
    defaultShouldRevalidate: false,
  },
);
```

## Options / Props

Fields of `ShouldRevalidateFunctionArgs` called out in the guide (besides `defaultShouldRevalidate`, `formMethod`, `formAction`, `currentUrl`, `nextUrl` used above):

| Name | Type | Description |
|------|------|-------------|
| formData, json, text | — | The submission body |
| actionResult, actionStatus | — | The action's return value |
| currentUrl, nextUrl, currentParams, nextParams | — | The navigation |

`defaultShouldRevalidate={false}` call-site support: `<Form>`, `<Link>`, `<fetcher.Form>`, and as an option to `useSubmit`, `fetcher.submit`, `useNavigate`, `useSearchParams`.

## Notes

- Skipping revalidation can leave the UI out of sync with the server. Prefer targeting a specific action or navigation, and fall back to `defaultShouldRevalidate` instead of always returning `false`.
- Default behavior, Framework Mode with SSR: opt-out — active loaders are revalidated on navigations and successful submissions (`Link`, `Form`, `fetcher.submit`). Failed submissions returning 4xx/5xx do not trigger revalidation by default.
- Default behavior, Framework "SPA Mode" and Data Mode: successful submissions revalidate active loaders (4xx/5xx do not). GET navigations (`Link`) are opt-in — loaders revalidate only if their dynamic params or any search params changed. A GET navigation to the exact same URL is treated like a page refresh and all loaders revalidate.
- Matched routes are handled independently; a child that skips revalidation does not skip any ancestor routes.
- `fetcher.load` only revalidates by default after action submissions and explicit `useRevalidator` calls, not on search-param or param-driven navigations.
- A plain `fetch()` to a resource route does not go through the router, so it does not revalidate loaders.
- Always returning `false` opts that route out of the default behavior completely, including param changes and explicit `useRevalidator` calls.
- If a matched route does not export `shouldRevalidate`, the call-site `defaultShouldRevalidate` value is used directly for that loader. If it does, the value is passed in as `defaultShouldRevalidate` and the route still has the final say. Hence a child `shouldRevalidate` that always returns `false` cannot hide a root reload after `fetcher.submit`: also opt `root` out, or pass `defaultShouldRevalidate: false` at the call site when `root` has no `shouldRevalidate`.
- In the search-param-only section, the first fence is the official snippet and the second fence is the adapted version (not from the official guide): it additionally skips the shortcut for mutations (non-GET `formMethod`) and only returns `false` when the search actually changed, so same-URL submissions and explicit revalidations still use `defaultShouldRevalidate`.
- Source: https://reactrouter.com/how-to/optimize-revalidation (docs/how-to/optimize-revalidation.md at tag react-router@8.4.0: https://github.com/remix-run/react-router/blob/react-router@8.4.0/docs/how-to/optimize-revalidation.md)

## Related

- [Resource Routes](./resource-routes.md)
- [Fetchers](./fetchers.md)
