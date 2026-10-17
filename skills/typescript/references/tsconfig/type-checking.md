---
source: https://www.typescriptlang.org/tsconfig/#Type_Checking_6248
---

# Type Checking options

20 compiler options that control how strictly the type checker validates code, from the `strict` family to unused-code and implicit-return checks.

## Signature / Usage

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `allowUnreachableCode` | — | — | Disable error reporting for unreachable code. |
| `allowUnusedLabels` | — | — | Disable error reporting for unused labels. |
| `alwaysStrict` | `true` if `strict`; `false` otherwise. | — | Ensure 'use strict' is always emitted. (Recommended) |
| `exactOptionalPropertyTypes` | — | — | Interpret optional property types as written, rather than adding `undefined`. (Recommended) |
| `noFallthroughCasesInSwitch` | — | — | Enable error reporting for fallthrough cases in switch statements. |
| `noImplicitAny` | `true` if `strict`; `false` otherwise. | — | Enable error reporting for expressions and declarations with an implied `any` type. (Recommended) |
| `noImplicitOverride` | — | — | Ensure overriding members in derived classes are marked with an override modifier. |
| `noImplicitReturns` | — | — | Enable error reporting for codepaths that do not explicitly return in a function. |
| `noImplicitThis` | `true` if `strict`; `false` otherwise. | — | Enable error reporting when `this` is given the type `any`. (Recommended) |
| `noPropertyAccessFromIndexSignature` | — | — | Enforces using indexed accessors for keys declared using an indexed type. |
| `noUncheckedIndexedAccess` | — | — | Add `undefined` to a type when accessed using an index. |
| `noUnusedLocals` | — | — | Enable error reporting when local variables aren't read. |
| `noUnusedParameters` | — | — | Raise an error when a function parameter isn't read. |
| `strict` | `true` | — | Enable all strict type-checking options. (Recommended) |
| `strictBindCallApply` | `true` if `strict`; `false` otherwise. | — | Check that the arguments for `bind`, `call`, and `apply` methods match the original function. (Recommended) |
| `strictBuiltinIteratorReturn` | `true` if `strict`; `false` otherwise. | — | Built-in iterators are instantiated with a `TReturn` type of undefined instead of `any`. (Recommended) |
| `strictFunctionTypes` | `true` if `strict`; `false` otherwise. | — | When assigning functions, check to ensure parameters and the return values are subtype-compatible. (Recommended) |
| `strictNullChecks` | `true` if `strict`; `false` otherwise. | — | When type checking, take into account `null` and `undefined`. (Recommended) |
| `strictPropertyInitialization` | `true` if `strict`; `false` otherwise. | — | Check for class properties that are declared but not set in the constructor. (Recommended) |
| `useUnknownInCatchVariables` | `true` if `strict`; `false` otherwise. | — | Default catch clause variables as `unknown` instead of `any`. (Recommended) |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option. "(Recommended)" is the page's Recommended badge.
- Default changed (6.0): `strict` is now `true` by default (6.0 release notes, "Simple Default Changes"). If you relied on the previous default of `false`, set `"strict": false` explicitly. The rendered tsconfig page lists `strict` Default as `true`.
- Deprecated (6.0) / Removed (7.0): `alwaysStrict: false`. In 6.0 all code is assumed to be in JavaScript strict mode; sloppy-mode code that uses reserved words like `await`, `static`, `private` or `public` as identifiers must be renamed. Per the 6.0 release notes, TypeScript 7.0 will not support the deprecated options; in 6.0 they can be silenced with `"ignoreDeprecations": "6.0"`.
- Changed (7.0): with `"strict": false`, the Go-based compiler no longer allows omitting arguments for parameters of type `undefined`, `unknown` or `any` in JavaScript files (`void` can still be omitted). Source: typescript-go CHANGES.md.
- `strict`: equivalent to enabling all of the strict mode family options (`alwaysStrict`, `strictNullChecks`, `strictBindCallApply`, `strictBuiltinIteratorReturn`, `strictFunctionTypes`, `strictPropertyInitialization`, `noImplicitAny`, `noImplicitThis`, `useUnknownInCatchVariables`). Individual checks can be turned off. Future versions may add stricter checks under this flag.
- `allowUnreachableCode` / `allowUnusedLabels`: `undefined` (default) provides suggestions as warnings to editors; `true` ignores; `false` raises compiler errors. Only provably unreachable code due to JavaScript syntax is affected, not code that appears unreachable by type analysis.
- `exactOptionalPropertyTypes`: with the flag on, `colorThemeOverride?: "dark" | "light"` cannot be assigned `undefined`; without it the type is effectively `"dark" | "light" | undefined`.
- `noUncheckedIndexedAccess`: adds `undefined` to any undeclared field accessed through an index signature (e.g. `env.NODE_ENV` becomes `string | undefined`).
- `noPropertyAccessFromIndexSignature`: unknown keys on a type with an index signature must use `obj["key"]` instead of `obj.key`.
- `noUnusedParameters`: parameter names starting with an underscore (`_`) are exempt.
- `strictFunctionTypes`: applies only to functions written in function syntax, not method syntax.
- `strictNullChecks`: when `false`, `null` and `undefined` are effectively ignored by the language.
- `useUnknownInCatchVariables`: `catch (err)` is typed `unknown`, so `err instanceof Error` must be checked before use.
- Project-wide unused files, exports and dependencies detection is the separate knip skill; lint and format rules are covered by the biome skill. `noUnusedLocals` / `noUnusedParameters` are compiler checks only.

Minimal `strict` / `noUncheckedIndexedAccess` snippet from the official page:

```ts
interface EnvironmentVars {
  NAME: string;
  OS: string;
  [propName: string]: string;
}

declare const env: EnvironmentVars;
const nodeEnv = env.NODE_ENV; // string | undefined with noUncheckedIndexedAccess
```

## Related

- [interop-constraints](./interop-constraints.md)
- [language-and-environment](./language-and-environment.md)
- [backwards-compatibility](./backwards-compatibility.md)
