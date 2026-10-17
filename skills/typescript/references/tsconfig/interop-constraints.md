---
source: https://www.typescriptlang.org/tsconfig/#Interop_Constraints_6252
---

# Interop Constraints options

Options that constrain or support interoperability between modules and between compilers: default-import synthesis, erasable syntax, per-file transpilation safety, and verbatim import/export emit.

## Signature / Usage

```json
{
  "compilerOptions": {
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "erasableSyntaxOnly": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `allowSyntheticDefaultImports` | `true` if `esModuleInterop` is enabled, `module` is `system`, or `moduleResolution` is `bundler`; `false` otherwise. | — | Allow 'import x from y' when a module doesn't have a default export. |
| `erasableSyntaxOnly` | — | — | Do not allow runtime constructs that are not part of ECMAScript. |
| `esModuleInterop` | `true` if `module` is `node16`, `nodenext`, or `preserve`; `false` otherwise. | — | Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. (Recommended) |
| `forceConsistentCasingInFileNames` | `true` | — | Ensure that casing is correct in imports. (Recommended) |
| `isolatedDeclarations` | — | — | Require sufficient annotation on exports so other tools can trivially generate declaration files. |
| `isolatedModules` | `true` if `verbatimModuleSyntax`; `false` otherwise. | — | Ensure that each file can be safely transpiled without relying on other imports. |
| `preserveSymlinks` | — | — | Disable resolving symlinks to their realpath. This correlates to the same flag in node. |
| `verbatimModuleSyntax` | — | — | Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option. "(Recommended)" is the page's Recommended badge.
- Deprecated (6.0) / Removed (7.0): `esModuleInterop: false` and `allowSyntheticDefaultImports: false`. Neither can be set to `false` in 6.0; the safer interop behavior is always enabled. Imports relying on the old behavior need adjusting, e.g. `import * as express from "express"` becomes `import express from "express"`. Per the 6.0 release notes, TypeScript 7.0 will not support the deprecated options; in 6.0 they can be silenced with `"ignoreDeprecations": "6.0"`.
- `allowSyntheticDefaultImports` affects only type checking, not emitted JavaScript; it brings TypeScript in line with Babel where a default is synthesized for modules without one. `esModuleInterop` also enables `allowSyntheticDefaultImports`.
- `esModuleInterop`: fixes two flawed assumptions (namespace imports acting like `require`, default imports acting like `require(...).default`) with two shim helper functions in emitted JS. A namespace import only accounts for own properties of the imported object; for inherited-property APIs use the default import form. Combine with `importHelpers` for terser emit.
- `erasableSyntaxOnly`: errors on TypeScript-only constructs with runtime behavior, so files can run under Node.js type stripping (supported as of v23.6): `enum` declarations, `namespace`s / `module`s with runtime code, class parameter properties, `import =` / `export =`, and `<prefix>`-style type assertions. Typically combined with `verbatimModuleSyntax`.
- `isolatedDeclarations` (see the 5.5 release notes): requires enough annotation on exports for other tools to generate `.d.ts` files trivially.
- `isolatedModules`: warns about code that single-file transpilers (Babel, `ts.transpileModule`) cannot interpret: re-exporting a type-only name, namespaces in non-module files (not applied to `.d.ts`), and references to ambient `const enum` members. It does not change emit or checking behavior.
- `verbatimModuleSyntax` (TypeScript 5.0): any import or export without a `type` modifier is kept; anything with `type` is dropped. ECMAScript `import`/`export` are not rewritten to `require`; use `import foo = require("foo")` and `export = ...` when CommonJS output is needed. `importsNotUsedAsValues` and `preserveValueImports` are deprecated in its favor.
- `forceConsistentCasingInFileNames`: errors if a program includes a file by a casing different from the casing on disk.
- `preserveSymlinks`: mirrors the Node.js flag and is the opposite of Webpack's `resolve.symlinks` (setting TypeScript's to true parallels setting Webpack's to false).

`verbatimModuleSyntax` example from the official page:

```ts
// Erased away entirely.
import type { A } from "a";

// Rewritten to 'import { b } from "bcd";'
import { b, type c, type d } from "bcd";

// Rewritten to 'import {} from "xyz";'
import { type xyz } from "xyz";
```

## Related

- [modules](./modules.md)
- [backwards-compatibility](./backwards-compatibility.md)
- [language-and-environment](./language-and-environment.md)
