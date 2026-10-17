---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
---

# TypeScript 5.0

ECMAScript decorators, `const` type parameters, multiple configs in `extends`, all enums as union enums, `--moduleResolution bundler`, `--verbatimModuleSyntax`, `export type *`, JSDoc `@satisfies` / `@overload`, and a first batch of deprecations.

## Signature / Usage

```ts
function loggedMethod<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}
```

Applied as `@loggedMethod greet() { ... }` on a class method.

## Options / Props

| Feature | Description |
|---------|-------------|
| Decorators | ECMAScript decorators valid without `--experimentalDecorators`; type-checked and emitted differently from legacy decorators; not compatible with `--emitDecoratorMetadata`; parameters cannot be decorated; decorators may be placed before or after `export` / `export default` (not both) |
| `const` type parameters | `function f<const T extends readonly string[]>(args: T)` gives `as const`-like inference; only affects expressions written inside the call; constraint should be `readonly` |
| `extends` array | `"extends": ["a", "b", "c"]`; later entries win on conflict |
| Union enums | All enums are union enums (a unique type per computed member) |
| `--moduleResolution bundler` | Models bundlers' hybrid lookup (extensionless imports, `import` condition preferred) |
| `allowImportingTsExtensions` | Allows `.ts` / `.mts` / `.tsx` imports; only with `--noEmit` or `--emitDeclarationOnly` |
| `resolvePackageJsonExports` / `resolvePackageJsonImports` | Default `true` under `node16`, `nodenext`, `bundler` |
| `allowArbitraryExtensions` | Looks for `{basename}.d.{extension}.ts` for unknown extensions (e.g. `app.d.css.ts`) |
| `customConditions` | Extra `exports` / `imports` conditions; only under `node16`, `nodenext`, `bundler` |
| `--verbatimModuleSyntax` | Imports/exports without `type` are kept; with `type` dropped; replaces `importsNotUsedAsValues` and `preserveValueImports` |
| `export type * from "mod"`, `export type * as ns from "mod"` | Type-only re-export forms |
| JSDoc `@satisfies`, `@overload` | JS equivalents of `satisfies` and function overloads |
| `--build` emit flags | `--declaration`, `--emitDeclarationOnly`, `--declarationMap`, `--sourceMap`, `--inlineSourceMap` accepted under `--build` |

## Notes

- Deprecated (5.0): `--target ES3`, `--out`, `--noImplicitUseStrict`, `--keyofStringsOnly`, `--suppressExcessPropertyErrors`, `--suppressImplicitAnyIndexErrors`, `--noStrictGenericChecks`, `--charset`, `--importsNotUsedAsValues`, `--preserveValueImports`, `prepend` in project references. Silence with `"ignoreDeprecations": "5.0"` (5.0 to 5.4); the 5.0 notes say they would be removed in 5.5 (5.5 notes: they no longer have any effect).
- Default changes: `--newLine` defaults to `LF`; `--forceConsistentCasingInFileNames` defaults to `true`.
- `--verbatimModuleSyntax` interop: ES `import` / `export` are not rewritten to `require`; use `import foo = require("foo")` and `export = {...}` for CommonJS output.

```ts
// Erased away entirely.
import type { A } from "a";

// Rewritten to 'import { b } from "bcd";'
import { b, type c, type d } from "bcd";

// Rewritten to 'import {} from "xyz";'
import { type xyz } from "xyz";
```

- `--moduleResolution bundler` may hide compatibility issues for libraries published to npm; the notes recommend `node16` / `nodenext` for those.
- `extends` array example: `{ "extends": ["@tsconfig/strictest/tsconfig.json", "../../../tsconfig.base.json"] }`.
- Breaking: TypeScript targets ECMAScript 2018 (Node.js 10+); relational operators `>`, `<`, `<=`, `>=` forbid implicit string-to-number coercion of `number | string` (use `+ns`); enum overhaul (out-of-domain literal assignment to enum is an error; indirected mixed string/number enum forms fixed); more accurate checking of constructor parameter decorators under `--experimentalDecorators`.
- Legacy `--experimentalDecorators` continues to exist; without it, decorators follow the ECMAScript proposal.

## Related

- [TypeScript 5.1](./typescript-5-1.md)
- [TypeScript 6.0 Breaking Changes and Deprecations](./typescript-6-0-deprecations.md)
