---
source: https://www.typescriptlang.org/docs/handbook/modules/reference.html#the-moduleresolution-compiler-option
---

# The `moduleResolution` compiler option

`moduleResolution` controls how TypeScript resolves module specifiers (string literals in `import` / `export` / `require`) to files on disk; set it to match the runtime or bundler resolver. This page covers features shared by modes, then each mode.

## Signature / Usage

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@app/*": ["./src/*"]
    }
  }
}
```

## Options / Props

| Mode | Summary |
|------|---------|
| `node16`, `nodenext` | Node.js v12+; `import` and `require` use different algorithms; must pair with `module` `node16` / `node18` / `node20` / `nodenext` |
| `bundler` | Models common bundler behavior; node_modules lookups, directory modules, extensionless paths, plus `"exports"` / `"imports"`; must pair with `module` `esnext` or `preserve` (6.0 also allows `commonjs`); implies `allowSyntheticDefaultImports` |
| `node10` | Formerly `node` (renamed in 5.0, `node` kept as alias); pre-v12 CommonJS algorithm; "should no longer be used" |
| `classic` | "Do not use `classic`." |

Supported features (in order of precedence):

| Feature | node16 / nodenext `import` | node16 / nodenext `require` | bundler | node10 |
|---------|----|----|----|----|
| `paths` | yes | yes | yes | yes |
| `baseUrl` | yes | yes | yes | yes |
| `node_modules` package lookups | yes | yes | yes | yes |
| package.json `"exports"` | yes (`types`, `node`, `import`) | yes (`types`, `node`, `require`) | yes (`types`, `import`/`require` by syntax) | no |
| package.json `"imports"` / self-name | yes (`types`, `node`, `import`) | yes (`types`, `node`, `require`) | yes | no |
| package.json `"typesVersions"` | yes | yes | yes | yes |
| Package-relative paths | when `exports` absent | when `exports` absent | when `exports` absent | yes |
| Full relative paths | yes | yes | yes | yes |
| Extensionless relative paths | no | yes | yes | yes |
| Directory modules | no | yes | yes | yes |

## Notes

### Common features and processes

- File extension substitution: for a runtime lookup of `/mod.js`, TypeScript tries `/mod.ts`, `/mod.tsx`, `/mod.d.ts`, `/mod.js`, `./mod.jsx`; for `.mjs`: `.mts`, `.d.mts`, `.mjs`; for `.cjs`: `.cts`, `.d.cts`, `.cjs`. Independent of the written specifier:

```ts
import x from "./mod.js";
// Runtime lookup: "./mod.js"
// TypeScript lookup #1: "./mod.ts"
// TypeScript lookup #2: "./mod.d.ts"
// TypeScript lookup #3: "./mod.js"
```

- Relative file paths with an extension work in every mode. Extensionless relative paths and directory modules (`index.js`, plus `"main"` / `"types"` / `"typesVersions"` in a directory's package.json) are supported only where the runtime/bundler supports them. TypeScript never supports omitting `.mjs`/`.mts` or `.cjs`/`.cts` extensions.
- `paths`: overrides resolution for bare specifiers. Does not change emitted import paths (aliases that type check can crash at runtime); published libraries should not set it, `package.json` `"imports"` is a standard replacement. Should not point at monorepo or node_modules packages (`exports`, `main`, `types`, `typesVersions` are overridden); use workspaces (npm / yarn / pnpm) instead. Values resolve relative to `baseUrl` if set, otherwise to the defining tsconfig.json. A single `*` wildcard is allowed; the longest matching prefix wins; multiple targets act as fallbacks.

```json
{
  "compilerOptions": {
    "paths": {
      "*": ["./src/foo/one.ts"],
      "foo/*": ["./src/foo/two.ts"],
      "foo/bar": ["./src/foo/three.ts"]
    }
  }
}
```

- `baseUrl`: designed for AMD loaders; since TypeScript 4.1 not required for `paths`. Specifies a directory bare specifiers resolve from, with higher precedence than `node_modules` lookups; never affects relative specifiers.
- Deprecated (6.0) / Removed (7.0): `baseUrl` is deprecated in 6.0 and no longer a look-up root; in 7.0 it is no longer supported. Move the prefix into `paths` (e.g. `"@app/*": ["./src/app/*"]`) or add a catch-all `"*": ["./src/*"]`.
- `node_modules` package lookups: for each ancestor `node_modules`, try the package directory for types, then `node_modules/@types`; then repeat allowing JavaScript. All modes except `classic` support this (`classic` only looks in `node_modules/@types`).
- package.json `"exports"`: followed for `node16`, `nodenext`, `bundler` when `resolvePackageJsonExports` is not disabled. `"types"` and `"default"` conditions always match; versioned `"types@{selector}"` is supported; extra conditions via `customConditions`. Presence of `"exports"` blocks unlisted subpaths.

```json
{
  "name": "pkg",
  "exports": {
    "./subpath": {
      "types@>=5.2": "./ts5.2/subpath/index.d.ts",
      "types@>=4.6": "./ts4.6/subpath/index.d.ts",
      "types": "./tsold/subpath/index.d.ts",
      "default": "./dist/subpath/index.js"
    }
  }
}
```

- `"exports"` subpath patterns use `*` substitution (e.g. `"./*.js": { "types": "./types/*.d.ts", "default": "./dist/*.js" }`); if only a string is given, it is the package root, so `pkg/dist/index.js` fails to resolve.
- package.json `"typesVersions"`: supported in all modes but not read where `"exports"` is read. Redirects by compiler version and subpath, e.g. `{ ">=3.1": { "*": ["ts3.1/*"] } }`.
- package.json `"main"` and `"types"`: when `"exports"` is not read and no subpath is requested, order is `"types"`, `"typings"` (legacy), `"main"` (with extension substitution). Include `"types"` when publishing because npm shows a TS icon only if present.
- Package-relative paths resolve per relative-path rules; blocked by mere presence of `"exports"`; `typesVersions` failure falls back to package-relative.
- package.json `"imports"` and self-name imports: for `node16`, `nodenext`, `bundler` when `resolvePackageJsonImports` is not disabled, `#`-prefixed specifiers resolve through the nearest package.json `"imports"`; self-name imports resolve through `"exports"`. For the local project, output paths are remapped to input files using `outDir` / `declarationDir` and `rootDir` (usually requires explicit `rootDir`); for `node_modules` packages, extension substitution is applied.

```json5
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node16",
    "resolvePackageJsonImports": true,
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

- The snippet above is an excerpt from the official page. As a standalone tsconfig it is invalid: `moduleResolution` `node16` must be paired with `"module": "node16"` or `"node18"` (`nodenext` with `nodenext`), per the mode table above and module-option.md.

### `node16`, `nodenext`

- "Identical" refers to the `moduleResolution` algorithm only. Whether CommonJS can `require()` an ES module is set by `--module`: `nodenext` (TS 5.8+, Node.js v22.12+) allows it, `node16` / `node18` do not (see [module-option.md](./module-option.md); source: Reference.md).
- `node16` and `nodenext` are currently identical; `node16` will be frozen if Node.js changes significantly. The syntax and module format of the importing file determine whether a specifier uses the `import` or `require` algorithm. Dynamic `import()` always uses the `import` algorithm; `import()` types follow the importing file's format.

```ts
// module.mts
import x from "./mod.js";                 // `import` algorithm due to file format
import("./mod.js");                       // `import` algorithm due to syntax
type Mod = typeof import("./mod.js");     // `import` algorithm due to file format
import mod = require("./mod");            // `require` algorithm due to syntax
```

- `verbatimModuleSyntax` prohibits `import` statements that would be emitted as `require` calls, if that confuses.

### `bundler`

- Under `module esnext` / `preserve`, ESM `import` always emits as `import`, so the `"import"` condition is used. `--module preserve` is the best choice when a runtime or bundler operates on raw `.ts` files; imports and `import x = require()` in the same file resolve with `"import"` and `"require"` conditions respectively.

```ts
// index.ts
import pkg1 from "pkg";       // Resolved with "import" condition
import pkg2 = require("pkg"); // Resolved with "require" condition
```

- Changed (6.0): `moduleResolution bundler` may be combined with `module commonjs`. Also in 6.0, subpath imports starting with `#/` (written `"#/*": "./dist/*"`) are supported under `nodenext` and `bundler` (6.0 release notes).

### `node10` and `classic`

- Deprecated (6.0) / Removed (7.0): `moduleResolution node` / `node10` is deprecated in 6.0 (migrate to `nodenext` or `bundler`) and no longer supported in 7.0.
- Deprecated (6.0) / Removed (7.0): `moduleResolution classic` is removed in 6.0 per the release notes and no longer supported in 7.0; use `bundler` or `nodenext`.

## Related

- [Theory](./theory.md)
- [The module compiler option](./module-option.md)
- [Choosing Compiler Options](./choosing-compiler-options.md)
- [ESM/CJS Interoperability](./esm-cjs-interop.md)
