---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html
---

# TypeScript 5.5

Inferred type predicates, constant indexed access narrowing, JSDoc `@import`, regular expression syntax checking, `Set` methods, `--isolatedDeclarations`, and the `${configDir}` template variable.

## Signature / Usage

```ts
function makeBirdCalls(countries: string[]) {
  // birds: Bird[]
  const birds = countries
    .map(country => nationalBirds.get(country))
    .filter(bird => bird !== undefined);

  for (const bird of birds) {
    bird.sing();  // ok!
  }
}
```

## Options / Props

| Feature | Description |
|---------|-------------|
| Inferred type predicates | Inferred when: no explicit return type; single `return` and no implicit returns; parameter not mutated; returns a `boolean` expression tied to a refinement of the parameter. "If and only if" semantics (`score => !!score` is not inferred) |
| Constant indexed access narrowing | `obj[key]` narrows when both `obj` and `key` are effectively constant |
| JSDoc `@import` | `/** @import { SomeType } from "some-module" */` (also `@import * as ns from "..."`) type-only imports in JS files |
| Regular expression checking | Syntax errors, nonexistent backreferences / named groups, and features newer than `target` in regex literals (not `new RegExp("...")`) |
| `Set` methods | `union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, `isDisjointFrom` |
| `--isolatedDeclarations` | Errors when exports are not annotated enough for declaration emit without a cross-file type-checker; requires `declaration` or `composite` |
| `${configDir}` | In `tsconfig.json` / `jsconfig.json` path fields, substituted with the directory of the config being compiled |
| `transpileDeclaration` API | Generates a declaration file for a single file (accurate only for code free of `isolatedDeclarations` errors) |
| `package.json` dependencies in declaration emit | Fewer "The inferred type of X cannot be named without a reference to Y" errors when the dependency is declared |

## Notes

- `isolatedDeclarations` does not change emit, only error reporting; computed property declarations were not yet supported at 5.5 (5.8 notes later say computed names are generally permitted in declaration emit, but still an error under `--isolatedDeclarations`).

```ts
export function foo() {
//              ~~~
// error! Function must have an explicit
// return type annotation with --isolatedDeclarations.
    return x;
}
```

- `${configDir}` example:

```json5
{
    "compilerOptions": {
        "typeRoots": [
            "${configDir}/node_modules/@types",
            "${configDir}/custom-types"
        ],
        "outDir": "${configDir}/dist"
    }
}
```

- Behavioral changes: options deprecated in 5.0 (`charset`, `target: ES3`, `importsNotUsedAsValues`, `noImplicitUseStrict`, `noStrictGenericChecks`, `keyofStringsOnly`, `suppressExcessPropertyErrors`, `suppressImplicitAnyIndexErrors`, `out`, `preserveValueImports`, `prepend` in project references, implicit OS-specific `newLine`) no longer have any effect in 5.5 (an error to specify in 6.0); stricter decorator parsing (`@(super.decorate)` needs parentheses); `type undefined = any` is now an error; reference directives are no longer synthesized in declaration emit, and user-written ones are preserved only with `preserve="true"`; inferred predicates can narrow `.filter()` results (explicit annotation restores wider types).
- Package: named imports from `typescript` now work from Node.js ES modules; size reduced from 30.2 MB to 20.4 MB on disk.

## Related

- [TypeScript 5.6](./typescript-5-6.md)
- [TypeScript 5.4](./typescript-5-4.md)
