# href

Returns a resolved URL path for the specified route, with the route's params percent-encoded. Useful for type-safe link generation with dynamic routes.

## Signature / Usage

```typescript
function href<Path extends keyof Args>(
  path: Path,
  ...args: Args[Path]
): string
```

`path` is generated from the app's route config (e.g. `"/products/:id"`); `args` supplies the route params to interpolate.

```typescript
import { href } from "react-router";

// Static path
const path = href("/about");
// -> "/about"

// Dynamic segment
const path = href("/products/:id", { id: "abc123" });
// -> "/products/abc123"

// Optional segment
const path = href("/:lang?/about", { lang: "en" });
// -> "/en/about"

// Use with Link
<Link to={href("/products/:id", { id: product.id })} />
```

## Notes

- Percent-encodes characters that would change URL structure: `/`, `?`, `#`, `%`, whitespace, non-ASCII characters
- Preserves characters allowed literally in path segments per RFC 3986 §3.3: `$ & + , ; = : @`
- Splat (`*`) values are encoded per segment while preserving `/` separators
- This differs from query-string encoding, where characters like `&`, `=`, `;` must be escaped
- Supports required (`:param`) and optional (`/:param?`) path parameters
- Available in **Framework Mode** only (not Data Mode or Declarative Mode)
- Provides a compile-time-friendly way to generate paths without string concatenation

## Related

- [generatePath](./generatePath.md)
