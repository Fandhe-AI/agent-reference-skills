# Using Handle

The `handle` export lets routes attach arbitrary metadata that ancestor components can read via `useMatches()`. The most common use case is building breadcrumb navigation.

**Available in:** Framework mode only.

## 実装方法

1. Export a `handle` object from route modules with any properties you need
2. In a layout or root component, call `useMatches()` to get all active matches
3. Filter matches that have the relevant `handle` property and render them

## コード例

```tsx
// app/routes/parent.tsx
import { Link } from "react-router";

export const handle = {
  breadcrumb: () => <Link to="/parent">Parent</Link>,
};
```

```tsx
// app/routes/parent.child.tsx
import { Link } from "react-router";

export const handle = {
  breadcrumb: () => <Link to="/parent/child">Child</Link>,
};
```

```tsx
// app/root.tsx — consume handles
import { useMatches, Outlet } from "react-router";

export function Layout() {
  const matches = useMatches();

  return (
    <html lang="en">
      <body>
        <nav>
          <ol>
            {matches
              .filter((m) => m.handle?.breadcrumb)
              .map((m, i) => (
                <li key={i}>{m.handle.breadcrumb(m)}</li>
              ))}
          </ol>
        </nav>
        <Outlet />
      </body>
    </html>
  );
}
```

## 注意点

- The `match` object passed to handle functions includes `match.data` (loader data) for dynamic values
- `handle` can carry any shape of data — not limited to breadcrumbs

## 関連

- [./file-route-conventions.md](./file-route-conventions.md)
