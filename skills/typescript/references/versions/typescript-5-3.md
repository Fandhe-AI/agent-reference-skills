---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html
---

# TypeScript 5.3

Import attributes, stable `resolution-mode` in import types, `switch (true)` narrowing, boolean-comparison narrowing, `Symbol.hasInstance` narrowing, and `super` property access checks.

## Signature / Usage

```ts
// We only want this to be interpreted as JSON,
// not a runnable/malicious JavaScript file with a `.json` extension.
import obj from "./something.json" with { type: "json" };

const obj2 = await import("./something.json", {
    with: { type: "json" }
});
```

## Options / Props

| Feature | Description |
|---------|-------------|
| Import attributes | `with { ... }` on imports and a second `import()` argument (`ImportCallOptions` expects `with`); attribute contents are not checked by TypeScript (checked against `ImportAttributes` from 5.4) |
| `resolution-mode` on `import type` | `import type { T } from "pkg" with { "resolution-mode": "require" }` (also `import("pkg", { with: { "resolution-mode": "import" } })`) |
| `resolution-mode` in all module modes | Works under `bundler`, `node10`; does not error under `classic` |
| `switch (true)` narrowing | Each `case` condition narrows |
| Boolean comparison narrowing | `if (isA(x) === true)` narrows through type predicates |
| `instanceof` via `Symbol.hasInstance` | A static `[Symbol.hasInstance](val): val is T` narrows the left operand |
| `super` checks | Error when `super.x` refers to a class field (instance property) rather than a prototype member |
| `typescript.preferences.preferTypeOnlyAutoImports` | VS Code setting to prefer `type` auto-imports |
| `JSDocParsingMode` | API option; `tsc` avoids parsing JSDoc |

## Notes

- Deprecated (planned, 5.3): old import-assertion syntax (`assert`) is to be deprecated in favor of `with` (removed/errors in 6.0, see TypeScript 6.0 deprecations).
- `tsserverlibrary.js` now re-exports `typescript.js` (package size reduced over 20%).
- Narrowing by `Symbol.hasInstance` example:

```ts
class Point implements PointLike {
    static [Symbol.hasInstance](val: unknown): val is PointLike {
        return !!val && typeof val === "object" &&
            "x" in val && "y" in val &&
            typeof val.x === "number" &&
            typeof val.y === "number";
    }
}
```

## Related

- [TypeScript 5.4](./typescript-5-4.md)
- [TypeScript 5.2](./typescript-5-2.md)
