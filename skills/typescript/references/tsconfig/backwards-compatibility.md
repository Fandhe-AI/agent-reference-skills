---
source: https://www.typescriptlang.org/tsconfig/#Backwards_Compatibility_6253
---

# Backwards Compatibility options

Nine legacy compiler options kept for backward compatibility. All of them were deprecated in TypeScript 5.0, stopped having any effect in 5.5, and are an error to specify in 6.0.

## Signature / Usage

```json
{
  "compilerOptions": {
    "verbatimModuleSyntax": true
  }
}
```

Replace `importsNotUsedAsValues` / `preserveValueImports` with `verbatimModuleSyntax` rather than setting any option on this page.

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `charset` | `utf8` | — | No longer supported. In early versions, manually set the text encoding for reading files. (Deprecated badge) |
| `importsNotUsedAsValues` | `remove` | `remove`, `preserve`, `error` | Specify emit/checking behavior for imports that are only used for types. |
| `keyofStringsOnly` | — | — | Make keyof only return strings instead of string, numbers or symbols. Legacy option. (Deprecated badge) |
| `noImplicitUseStrict` | — | — | Disable adding 'use strict' directives in emitted JavaScript files. |
| `noStrictGenericChecks` | — | — | Disable strict checking of generic signatures in function types. |
| `out` | — | — | Deprecated setting. Use `outFile` instead. (Deprecated badge) |
| `preserveValueImports` | — | — | Preserve unused imported values in the JavaScript output that would otherwise be removed. |
| `suppressExcessPropertyErrors` | — | — | Disable reporting of excess property errors during the creation of object literals. |
| `suppressImplicitAnyIndexErrors` | — | — | Suppress `noImplicitAny` errors when indexing objects that lack index signatures. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option.
- Deprecated (5.0) / No effect (5.5) / Error (6.0): `charset`, `importsNotUsedAsValues`, `noImplicitUseStrict`, `noStrictGenericChecks`, `keyofStringsOnly`, `suppressExcessPropertyErrors`, `suppressImplicitAnyIndexErrors`, `out`, `preserveValueImports` (TypeScript 5.5 release notes, "Disabling Features Deprecated in TypeScript 5.0"; also deprecated then: `target: ES3`, `prepend` in project references, implicitly OS-specific `newLine`). In 5.5 they no longer have any effect; they may still be specified but are an error to specify in 6.0. In 5.0 to 5.4 `"ignoreDeprecations": "5.0"` silenced the warnings.
- `charset`: today TypeScript assumes UTF-8 encoding and detects UTF-16 (BE and LE) or UTF-8 BOMs.
- `importsNotUsedAsValues` and `preserveValueImports`: deprecated in favor of `verbatimModuleSyntax`. `importsNotUsedAsValues` values: `remove` (drop imports only referencing types), `preserve` (keep all imports, may preserve side effects), `error` (preserve all imports but error when a value import is only used as a type). `preserveValueImports` kept imports TypeScript could not see being used (e.g. `eval`, or Svelte/Vue code).
- `keyofStringsOnly`: made `keyof` return `string` rather than `string | number` for types with a string index signature, to keep pre-TypeScript 2.9 behavior.
- `noImplicitUseStrict`: by default a `"use strict";` prologue is emitted for module files with non-ES6 targets; this setting disabled it ("You shouldn't need this").
- `noStrictGenericChecks`: removed the check that unifies type parameters when comparing two generic function types (e.g. `a = b` between `<T, U>(x: T, y: U) => [T, U]` and `<S>(x: S, y: S) => [S, S]`).
- `out`: computes the final file location in an unpredictable way; use `outFile` instead (which was itself removed in 6.0 per the 6.0 release notes, listed under a "Deprecated" heading; see the emit page).
- `suppressExcessPropertyErrors` was added to help migrate to the stricter object literal checks of TypeScript 1.6; use `// @ts-ignore` for one-off cases. `suppressImplicitAnyIndexErrors` is described as a drastic approach; `// @ts-ignore` is recommended instead.
- Per the 6.0 release notes, TypeScript 7.0 will not support the deprecated options.

`verbatimModuleSyntax` replacement example from the official page:

```ts
import type { A } from "a";
import { b, type c, type d } from "bcd";
```

## Related

- [interop-constraints](./interop-constraints.md)
- [emit](./emit.md)
- [type-checking](./type-checking.md)
