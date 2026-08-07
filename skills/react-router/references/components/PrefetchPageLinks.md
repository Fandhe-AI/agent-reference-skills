# PrefetchPageLinks

Renders `<link rel="prefetch">` and `<link rel="modulepreload">` tags for all modules and data of a target page, enabling instant navigation. Used internally by `<Link prefetch>` but can be rendered standalone. Framework mode only.

## Signature / Usage

```tsx
function PrefetchPageLinks({ page, ...linkProps }: PageLinkDescriptor)

import { PrefetchPageLinks } from "react-router";

// Prefetch a page as the user types in a search field
function SearchBar({ query }) {
  const topResult = useTopSearchResult(query);
  return (
    <>
      <input value={query} onChange={...} />
      {topResult && <PrefetchPageLinks page={topResult.href} />}
    </>
  );
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `page` | `string` | Absolute path of the page to prefetch (e.g., `"/dashboard"`). |
| `...linkProps` | `HTMLLinkElement` props | Additional HTML `<link>` attributes (e.g., `crossOrigin`, `integrity`, `rel`) spread onto rendered tags. |

## Notes

- **Framework mode only** — not available in Data or Declarative modes.
- `page` must be an **absolute** path (starts with `/`).
- `<Link prefetch="intent|render|viewport">` uses this component internally. Use `PrefetchPageLinks` directly only when you need custom prefetch timing beyond what `Link` provides.

## Related

- [Link](./Link.md)
- [Links](./Links.md)
