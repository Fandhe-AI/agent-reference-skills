# generatePath

Returns a path string with dynamic params interpolated into a route pattern.

## Signature

```typescript
function generatePath<Path extends string>(
  originalPath: Path,
  params?: { [key in PathParam<Path>]: string | null },
): string
```

## Usage

```typescript
import { generatePath } from "react-router";

generatePath("/users/:id", { id: "123" });
// -> "/users/123"

generatePath("/files/:folder/:file", { folder: "docs", file: "readme" });
// -> "/files/docs/readme"
```

## Notes

- Parameter keys are type-checked against the path pattern when using TypeScript — typos are caught at compile time
- `null` is accepted for optional parameters
- Available in **Framework Mode**, **Data Mode**, and **Declarative Mode** (all three modes)

## Related

- [href](./href.md)
