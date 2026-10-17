---
source: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
---

# TypeScript 7.0 (native Go port)

TypeScript 7.0 is a native port of the compiler (Go, "Corsa") with shared-memory multithreading, typically 8x-12x faster on full builds. It ships the new `tsc` executable via the `typescript` package; this version ships no programmatic API (a new API is expected in 7.1).

Also sourced from: https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/README.md and https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/CHANGES.md

## Signature / Usage

```sh
npm install -D typescript
npx tsc
```

Side-by-side with TypeScript 6.0 (for tools that need the compiler API, such as typescript-eslint):

```json
{
  "devDependencies": {
    "@typescript/native": "npm:typescript@^7.0.2",
    "typescript": "npm:@typescript/typescript6@^6.0.2"
  }
}
```

`@typescript/typescript6` provides an executable named `tsc6` and re-exports the TypeScript 6.0 API. Nightly builds resume under the `typescript` package with the `next` tag (`npm install -D typescript@next`), replacing `@typescript/native-preview`.

## Options / Props

| Flag (new in 7.0) | Description |
|------|-------------|
| `--checkers` | Number of type-checker workers (experimental). Default 4. `--checkers 1` makes type-checking effectively single-threaded. |
| `--builders` | Number of parallel project reference builders under `--build` (experimental). Multiplies with `--checkers`. |
| `--singleThreaded` | Disables parallelization entirely (type-checking workers capped at 1; parsing and emitting single-threaded). |

| Option (default adopted from 6.0) | 7.0 behavior |
|--------|--------------|
| `strict` | `true` by default |
| `module` | defaults to `esnext` |
| `target` | defaults to the current stable ECMAScript version immediately preceding `esnext` |
| `noUncheckedSideEffectImports` | `true` by default |
| `libReplacement` | `false` by default |
| `stableTypeOrdering` | `true` by default, cannot be turned off |
| `rootDir` | defaults to `./`; inner source directories must be set explicitly |
| `types` | defaults to `[]`; `["*"]` restores the old behavior |

Deprecations that are now hard errors with no-op behavior:

- `target: es5`, `downlevelIteration`
- `moduleResolution: node` / `node10` and `classic`
- `module: amd, umd, systemjs, none` (use `esnext` or `preserve` with bundlers)
- `baseUrl` (make `paths` relative to the project root)
- `esModuleInterop` and `allowSyntheticDefaultImports` cannot be `false`; `alwaysStrict` cannot be `false`
- the `module` keyword in namespace declarations; the `asserts` keyword on imports (use `with`)
- `/// <reference no-default-lib />` is no longer respected under `skipDefaultLibCheck`
- command-line builds cannot take file paths when the current directory contains a `tsconfig.json`, unless `--ignoreConfig` is passed

## Notes

- Compatibility: practically any code that compiles cleanly with TypeScript 6.0 (with `stableTypeOrdering` on, and no `ignoreDeprecations`) should compile identically in 7.0. typescript-go README status table: program creation, parsing, type resolution, type checking ("Same errors, locations, and messages as TS 6.0"; types printback in errors may display differently), JSX, declaration emit, emit, build mode / project references, incremental build are "done"; watch mode was "prototype" in the README table (the blog describes a rebuilt `--watch`); language service (LSP) "in progress"; API "not ready".
- Changed (7.0): `--watch` is rebuilt on a file-watcher foundation based on Parcel's `@parcel/watcher` (ported to Go).
- Changed (7.0): template literal type inference preserves Unicode code points.

```ts
type HeadTail<S> = S extends `${infer Head}${infer Tail}` ? [Head, Tail] : never;

type Result = HeadTail<"😀abc">;
//   ^
// In 7.0: ["😀", "abc"]
// Previously: ["\ud83d", "\ude00abc"]
```

- Changed (7.0): JavaScript support was reworked to be consistent with `.ts` analysis. Differences listed in the blog: values cannot be used where types are expected (write `typeof someValue`); `@enum` is not specially recognized; a standalone `?` is not a type (use `any`); `@class` does not make a function a constructor (use `class`); postfix `!` is unsupported; type names must be defined inside `@typedef` (`/** @typedef {T} TypeAliasName */`); Closure-style function types (`function(string): void`) are unsupported (use `(s: string) => void`); aliasing `this` and reassigning a function's whole `prototype` are no longer specially treated.
- CHANGES.md (typescript-go v7.0.2) additionally lists: constructor functions (expando `this.x` / `C.prototype.m`) are no longer supported (use classes); node positions use UTF-8 offsets; with `"strict": false`, arguments can no longer be omitted for parameters typed `undefined`, `unknown` or `any` (`void` can still be omitted); `arguments` in a JS function body no longer implies `...args: any[]`; `@param` tags apply to at most one function; `@overload` on arrow functions / function expressions is ignored; a CommonJS module may not mix `module.exports = ...` with `module.exports.xxx = ...` assignments; declaration emit from `.js` input differs substantially from 6.0.
- Embedded-language tooling (Vue, MDX, Astro, Svelte, Angular template checking) cannot yet use 7.0 because there is no stable programmatic API; keep TypeScript 6.0 for those (in VS Code, run "Disable TypeScript 7 Language Server").
- typescript-go README: for the 7.0 RC and later the command name is `tsc` (the preview package `@typescript/native-preview` used `tsgo`).
- 7.1 (new API) is not covered by this skill.

## Related

- [TypeScript 6.0](./typescript-6-0.md)
- [TypeScript 6.0 Breaking Changes and Deprecations](./typescript-6-0-deprecations.md)
