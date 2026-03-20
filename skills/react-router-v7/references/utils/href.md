# href

Returns a fully resolved URL pathname by interpolating params into a route path pattern. Useful for type-safe link generation with dynamic routes.

## Signature

```typescript
function href(pattern: string, params?: Record<string, string>): string
```

## Usage

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

- Supports required (`:param`) and optional (`/:param?`) path parameters
- Available in **Framework Mode** only (not Data Mode or Declarative Mode)
- Provides a compile-time-friendly way to generate paths without string concatenation

## Related

- [generatePath](./generatePath.md)
