---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html
---

# TypeScript 5.6

Disallowed nullish and truthy checks, iterator helper types, `--strictBuiltinIteratorReturn`, arbitrary module identifiers, `--noUncheckedSideEffectImports`, `--noCheck`, and `--build` with intermediate errors.

## Signature / Usage

```ts
if (/0x[0-9a-f]/) {
//  ~~~~~~~~~~~~
// error: This kind of expression is always truthy.
}

function isValid(value: string | number, options: any, strictness: "strict" | "loose") {
    if (strictness === "loose") {
        value = +value
    }
    return value < options.max ?? 100;
    //     ~~~~~~~~~~~~~~~~~~~
    // error: Right operand of ?? is unreachable because the left operand is never nullish.
}
```

## Options / Props

| Feature | Description |
|---------|-------------|
| Disallowed nullish / truthy checks | Errors when a truthy or nullish check always evaluates the same way syntactically; `true`, `false`, `0`, `1` still allowed |
| `IteratorObject` / `AsyncIteratorObject` | New types for built-in iterable iterators (`ArrayIterator`, `SetIterator`, `MapIterator`, ...); `Iterator` runtime value has helpers like `map`, `take`, `Iterator.from` |
| `--strictBuiltinIteratorReturn` | Enabled via `--strict`; `BuiltinIteratorReturn` is `undefined` under it (default `any`) |
| Arbitrary module identifiers | `export { banana as "🍌" }` and `import { "🍌" as banana } from "./foo"` |
| `--noUncheckedSideEffectImports` | Error if a side-effect `import "x"` cannot be resolved (off by default in 5.6; default `true` in 6.0) |
| `--noCheck` | Skip type checking for all input files; useful with `--isolatedDeclarations` for fast `.d.ts` emit |
| `--build` with intermediate errors | Continues building despite errors in dependencies; `--stopOnBuildErrors` stops at first project with errors (as named in the 5.6 notes) |
| Region-prioritized diagnostics | Editors can request diagnostics for the visible region first (VS Code, 5.6+) |
| Granular commit characters | Language service provides commit characters per completion item |
| Auto-import exclude patterns | `typescript.preferences.autoImportSpecifierExcludeRegexes` (and `javascript.preferences...` in VS Code) |

## Notes

- `--noUncheckedSideEffectImports` workaround for asset imports:

```ts
// ./src/globals.d.ts

// Recognize all CSS files as module imports.
declare module "*.css" {}
```

- `--noCheck` workflow: run `tsc --noCheck` while iterating, then `tsc --noEmit` for a thorough check; use separate `--tsBuildInfoFile` paths when running both at once.
- Behavioral changes: a `.tsbuildinfo` is always written for any project in a `--build` invocation; `.mts` files never emit CommonJS and `.cts` files never emit ESM; module format (`.mts` / `.cts`, `package.json` `"type"` inside `node_modules`) is respected in all `module` modes except `amd`, `umd`, `system`; `override` checks on computed property names are now correct.
- Stricter iterator example: with `--strictBuiltinIteratorReturn`, `iter.next()` on `Iterator<string, BuiltinIteratorReturn>` gives `value` possibly `undefined`.

## Related

- [TypeScript 5.7](./typescript-5-7.md)
- [TypeScript 5.5](./typescript-5-5.md)
