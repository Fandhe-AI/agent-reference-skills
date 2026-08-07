# generatePath

Returns a path string with dynamic params interpolated into a route pattern.

## Signature / Usage

```typescript
function generatePath<Path extends string>(
  originalPath: Path,
  params: GeneratePathParams<Path> = {} as any,
): string
```

```typescript
import { generatePath } from "react-router";

generatePath("/users/:id", { id: "123" });
// -> "/users/123"

generatePath("/files/:folder/:file", { folder: "docs", file: "readme" });
// -> "/files/docs/readme"

generatePath("/files/:name", { name: "a b" });
// -> "/files/a%20b"
```

## Notes

- Parameter keys are type-checked against the path pattern when using TypeScript — typos are caught at compile time
- `null` is accepted for optional parameters
- Param values are percent-encoded for use in path segments: characters that would change URL structure (`/`, `?`, `#`, `%`, whitespace, non-ASCII) are escaped, while characters allowed literally per RFC 3986 (`$ & + , ; = : @`) are kept as-is; this differs from query-string encoding
- Splat (`*`) values are encoded per segment, preserving `/` separators
- Available in **Framework Mode**, **Data Mode**, and **Declarative Mode** (all three modes)

## Related

- [href](./href.md)
- [matchPath](./matchPath.md)
