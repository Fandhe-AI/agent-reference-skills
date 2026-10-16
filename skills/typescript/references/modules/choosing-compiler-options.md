---
source: https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html
---

# Modules - Choosing Compiler Options

How to choose module-related compiler options for apps (bundler, Node.js, ts-node, tsx, browser) and libraries.

## Signature / Usage

Node.js app (compiling and running outputs):

```json5
{
  "compilerOptions": {
    // Required
    "module": "nodenext",

    // Implied by `"module": "nodenext"`:
    // "moduleResolution": "nodenext",
    // "esModuleInterop": true,
    // "target": "esnext",

    // Recommended
    "verbatimModuleSyntax": true,
  }
}
```

## Options / Props

| Scenario | Settings |
|----------|----------|
| App with a bundler | `module: esnext`, `moduleResolution: bundler`, `esModuleInterop: true`, `customConditions` per bundler docs; recommended `noEmit` (or `emitDeclarationOnly`), `allowImportingTsExtensions`, `allowArbitraryExtensions`, `verbatimModuleSyntax` (or `isolatedModules`) |
| App compiled and run in Node.js | `module: nodenext`; recommended `verbatimModuleSyntax` |
| ts-node | Same as Node.js (compatible with the same tsconfig settings) |
| tsx | Behaves like a bundler; use the bundler settings |
| ES modules in browser, no bundler | `module: nodenext` + `paths` as a substitute for URL / import map support |
| Library | `module: node18`, `target` = lowest supported (e.g. `es2020`), `strict`, `verbatimModuleSyntax`, `declaration`, `sourceMap`, `declarationMap`, `rootDir: src`, `outDir: dist` |

## Notes

- A single tsconfig.json represents a single environment; server, DOM, worker and test code should each have their own tsconfig.json connected with project references. Use this guide once per tsconfig.json.
- Bundler projects: it is recommended not to set `"type": "module"` or use `.mts` for now, because some bundlers adopt different ESM/CJS interop in that case, which TypeScript cannot analyze under `moduleResolution: bundler` (microsoft/TypeScript#54102).

```json5
{
  "compilerOptions": {
    // Required
    "module": "esnext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    // Consult your bundler's documentation
    "customConditions": ["module"],
    // Recommended
    "noEmit": true, // or `emitDeclarationOnly`
    "allowImportingTsExtensions": true,
    "allowArbitraryExtensions": true,
    "verbatimModuleSyntax": true, // or `isolatedModules`
  }
}
```

- Node.js: set `"type": "module"` or use `.mts` to emit ES modules.
- Browser without bundler (no dedicated options): combine `nodenext` ESM resolution with `paths` to point remote URLs at local types; `"*": ["./empty-file.ts"]` optionally prohibits node_modules specifiers not listed.

```json5
{
  "compilerOptions": {
    "module": "nodenext",
    "paths": {
      "https://esm.sh/lodash@4.17.21": ["./node_modules/@types/lodash/index.d.ts"],
      "*": ["./empty-file.ts"]
    }
  }
}
```

- Library rationale: `node18` because code compatible with Node.js's module system almost always works in bundlers (if using a third-party ESM emitter, set `"type": "module"`); `target` ensures no later language features and a matching `lib`; `strict` avoids declaration output that errors under consumers' `strict`; `verbatimModuleSyntax` avoids imports ambiguous under `esModuleInterop` / `allowSyntheticDefaultImports` and prevents `export default` in CommonJS-emitted modules; `declaration` is needed for consumer types; `sourceMap` / `declarationMap` only help when shipping source; a separate `outDir` is necessary for libraries publishing input files, otherwise extension substitution makes consumers load `.ts` instead of `.d.ts`.
- Bundling libraries: `module: esnext` + `moduleResolution: bundler` is acceptable with two caveats: TypeScript cannot model a split between bundled and externalized imports in one compilation, and declaration files must also be bundled (each declaration file represents exactly one JavaScript file); if the bundler does not bundle declarations, use `moduleResolution: nodenext`.
- Dual-emit solutions (two outputs with different module formats while type checking once) leave at least one output unchecked; test and run static analysis (e.g. `@arethetypeswrong/cli`) against all output bundles before publishing.
- `verbatimModuleSyntax` only works when the JS emitter emits the same module kind as `tsc` would; configurations producing both ESM and CJS from the same source are incompatible with it.
- Deprecated (6.0) / Removed (7.0): the bundler template's `esModuleInterop` cannot be set `false` in 6.0/7.0 (always enabled); `moduleResolution: node10` / `classic` and `baseUrl` are not used by these templates (6.0 release notes, TypeScript 7.0 announcement).

## Related

- [Theory](./theory.md)
- [The module compiler option](./module-option.md)
- [The moduleResolution compiler option](./module-resolution-option.md)
- [ESM/CJS Interoperability](./esm-cjs-interop.md)
