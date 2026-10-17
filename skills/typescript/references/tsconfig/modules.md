---
source: https://www.typescriptlang.org/tsconfig/#Modules_6244
---

# Modules options

19 compiler options for the module system, module resolution, path mapping, root directories and the set of ambient `@types` packages.

## Signature / Usage

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "rootDir": "./src",
    "types": ["node"]
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `allowArbitraryExtensions` | — | — | Enable importing files with any extension, provided a declaration file is present. |
| `allowImportingTsExtensions` | `true` if `rewriteRelativeImportExtensions`; `false` otherwise. | — | Allow imports to include TypeScript file extensions. |
| `allowUmdGlobalAccess` | — | — | Allow accessing UMD globals from modules. |
| `baseUrl` | — | — | Specify the base directory to resolve bare specifier module names. |
| `customConditions` | — | — | Conditions to set in addition to the resolver-specific defaults when resolving imports. |
| `module` | `CommonJS` if `target` is `ES5`; `ES6`/`ES2015` otherwise. | `none`, `commonjs`, `amd`, `umd`, `system`, `es6`/`es2015`, `es2020`, `es2022`, `esnext`, `node16`, `node18`, `node20`, `nodenext`, `preserve` | Specify what module code is generated. |
| `moduleResolution` | `Node10` if `module` is `CommonJS`; `Node16` if `module` is `Node16`, `Node18`, or `Node20`; `NodeNext` if `module` is `NodeNext`; `Bundler` if `module` is `Preserve`; `Classic` otherwise. | `classic`, `node10`/`node`, `node16`, `nodenext`, `bundler` | Specify how TypeScript looks up a file from a given module specifier. |
| `moduleSuffixes` | — | — | List of file name suffixes to search when resolving a module. |
| `noResolve` | — | — | Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project. |
| `noUncheckedSideEffectImports` | `true` | — | Check side effect imports. |
| `paths` | — | — | Specify a set of entries that re-map imports to additional lookup locations. |
| `resolveJsonModule` | — | — | Enable importing .json files. |
| `resolvePackageJsonExports` | `true` when `moduleResolution` is `node16`, `nodenext`, or `bundler`; otherwise `false` | — | Use the package.json 'exports' field when resolving package imports. |
| `resolvePackageJsonImports` | `true` when `moduleResolution` is `node16`, `nodenext`, or `bundler`; otherwise `false` | — | Use the package.json 'imports' field when resolving imports. |
| `rewriteRelativeImportExtensions` | — | — | Rewrite `.ts`, `.tsx`, `.mts`, and `.cts` file extensions in relative import paths to their JavaScript equivalent in output files. |
| `rootDir` | Computed from the list of input files. | — | Specify the root folder within your source files. |
| `rootDirs` | Computed from the list of input files. | — | Allow multiple folders to be treated as one when resolving modules. |
| `typeRoots` | — | — | Specify multiple folders that act like `./node_modules/@types`. |
| `types` | — | — | Specify type package names to be included without being referenced in a source file. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page. It predates several 6.0 default changes; see the `Default changed (6.0)` lines below.
- Default changed (6.0): `module` defaults to `esnext` (6.0 release notes, "Simple Default Changes"); `noUncheckedSideEffectImports` is `true` by default; `rootDir` now defaults to `.` (the directory containing `tsconfig.json`) and is only inferred when running `tsc` without a `tsconfig.json`; `types` defaults to `[]` (previously every visible `@types` package was included; `"types": ["*"]` restores the 5.9 behavior, and the option page states "By default `types` is set to `[]`. For versions below TypeScript 6.0, by default all visible `@types` packages are included").
- Deprecated (6.0) / Removed (7.0): `baseUrl`. It is no longer considered a look-up root for module resolution in 6.0. Remove it and put the prefix in `paths` entries instead (e.g. `"@app/*": ["./src/app/*"]`). The experimental `ts5to6` tool can adjust `baseUrl` and `rootDir` automatically. As of TypeScript 4.1, `baseUrl` is not required to use `paths`.
- Deprecated (6.0) / Removed (7.0): `module` values `amd`, `umd`, `system` (the 6.0 notes list `systemjs`) and `none`. Also drops support for the `amd-module` directive. Use an ECMAScript module-emitting target, a bundler, or stay on TypeScript 5.x.
- Deprecated (6.0) / Removed (7.0): `moduleResolution` values `node10` (a.k.a. `node`) and `classic`. Migrate to `nodenext` (targeting Node.js directly) or `bundler` (bundler or Bun). Per the 6.0 release notes, TypeScript 7.0 will not support the deprecated options; in 6.0 they can be silenced with `"ignoreDeprecations": "6.0"`.
- `module`: you very likely want `nodenext` for modern Node.js projects and `preserve` or `esnext` for code that will be bundled. `node18` (TypeScript 5.8) replaces `node16` with import attributes support; `node20` adds support for require(ESM); `nodenext` implies the floating `--target esnext`; `preserve` (TypeScript 5.4) preserves the format of each import/export statement.
- `moduleResolution`: `node16`/`nodenext` pick the right algorithm per resolution depending on whether Node.js will see `import` or `require`; `bundler` supports package.json `exports`/`imports` but never requires file extensions on relative paths.
- `allowImportingTsExtensions`: only allowed when `noEmit` or `emitDeclarationOnly` is enabled; your resolver (bundler, runtime, other tool) must make the `.ts` imports work.
- `allowArbitraryExtensions`: for an import path with an unknown extension (e.g. `./app.css`), TypeScript looks for a declaration file named `{file basename}.d.{extension}.ts` (e.g. `app.d.css.ts`).
- `customConditions`: only valid under `node16`, `nodenext` and `bundler` for `moduleResolution`.
- `paths`: re-maps imports to lookup locations relative to `baseUrl` if set, otherwise to the tsconfig file. It does not change how import paths are emitted by `tsc`; use it only to inform TypeScript of a mapping another tool applies at runtime or bundling.
- `rootDir`: does not affect which files become part of the compilation (no interaction with `include`, `exclude`, `files`); it enforces that all files to be emitted are under the `rootDir` path.
- `types`: modules not in the `types` array add no globals (e.g. `process`, `expect`) and have no auto-import suggestions; it does not affect `import`ed `@types/*` modules. `typeRoots` instead selects whole folders; when set, only packages under `typeRoots` are included.
- `resolvePackageJsonImports` applies to lookups starting with `#` (subpath imports) from a file whose ancestor directory contains a `package.json`.
- `noUncheckedSideEffectImports`: errors when a side-effect import such as `import "oops-this-module-does-not-exist"` cannot be resolved; for CSS/asset imports add an ambient wildcard declaration such as `declare module "*.css" {}`.
- Changed (7.0): the Go-based compiler is documented to keep the same types and errors as 6.0; options deprecated in 6.0 are not supported in 7.0 (see the 6.0 release notes above).

`paths` example from the official page:

```json
{
  "compilerOptions": {
    "paths": {
      "app/*": ["./src/app/*"],
      "config/*": ["./src/app/_config/*"]
    }
  }
}
```

## Related

- [language-and-environment](./language-and-environment.md)
- [interop-constraints](./interop-constraints.md)
- [emit](./emit.md)
