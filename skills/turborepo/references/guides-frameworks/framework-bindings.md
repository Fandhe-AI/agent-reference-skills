# Framework Bindings for Libraries

## Usage

Declare framework APIs used inside a library package as `peerDependencies` so the consumer's installed framework version is resolved.

### peerDependencies setup

```json
{
  "name": "@repo/ui",
  "peerDependencies": {
    "next": "*"
  }
}
```

A version range is recommended over a wildcard (e.g. `">=15"`).

### Example implementation

```tsx
import { ComponentProps } from "react";
import { Link } from "next/link";

type CustomLinkProps = ComponentProps<typeof Link>;

export function CustomLink({ children, ...props }: CustomLinkProps) {
  return (
    <Link className="text-underline hover:text-green-400" {...props}>
      {children}
    </Link>
  );
}
```

### Entry point splitting (multi-framework support)

```json
{
  "exports": {
    "./link": "./dist/link.js",
    "./next-js/link": "./dist/next-js/link.js"
  },
  "peerDependencies": {
    "next": "*"
  }
}
```

- `./link` — framework-agnostic generic `Link`
- `./next-js/link` — Next.js-specific `Link`
