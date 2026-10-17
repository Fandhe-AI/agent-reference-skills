---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#breaking-changes-and-deprecations-in-typescript-60
---

# TypeScript 6.0 Breaking Changes and Deprecations

TypeScript 6.0 is a transition release preparing for 7.0. Deprecations can be silenced in 6.0 with `"ignoreDeprecations": "6.0"`, but TypeScript 7.0 does not support any of these deprecated options.

## Signature / Usage

```json
{
  "compilerOptions": {
    "ignoreDeprecations": "6.0",
    "types": ["node"],
    "rootDir": "./src"
  }
}
```

Up-front adjustments many projects need: set `"types"` (typically `["node"]`; `["*"]` restores the 5.9 behavior), and set `"rootDir": "./src"` if it was previously inferred (symptom: files written to `./dist/src/index.js` instead of `./dist/index.js`).

## Options / Props

| Item | 6.0 change | 7.0 |
|------|-----------|-----|
| `strict` | default `true` | same |
| `module` | default `esnext` | same |
| `target` | default is current-year ES version (currently `es2025`) | same |
| `noUncheckedSideEffectImports` | default `true` | same |
| `libReplacement` | default `false` | same |
| `rootDir` | default `.` (dir containing `tsconfig.json`); inferred only with `tsc` and no `tsconfig.json` | same |
| `types` | default `[]` | same |
| `target: es5` | Deprecated; lowest target is ES2015 | Removed |
| `downlevelIteration` | Deprecated; any setting errors | Removed |
| `moduleResolution: node` / `node10` | Deprecated; migrate to `nodenext` or `bundler` | Removed |
| `module: amd`, `umd`, `systemjs`, `none` | Deprecated; `amd-module` directive no longer has effect | Removed |
| `baseUrl` | Deprecated; no longer a look-up root | Removed |
| `moduleResolution: classic` | Deprecated (removed) | Removed |
| `esModuleInterop: false`, `allowSyntheticDefaultImports: false` | cannot be set to `false` | Removed |
| `alwaysStrict: false` | Deprecated; all code assumed strict | Removed |
| `outFile` | Removed from 6.0 (use an external bundler) | Removed |
| legacy `module Foo {}` namespace syntax | hard deprecation; ambient `declare module "x"` still works | Removed |
| `asserts` on imports | Deprecated (error); use `with` | Removed |
| `/// <reference no-default-lib="true"/>` | no longer supported; use `--noLib` or `--libReplacement` | Removed |
| `tsc foo.ts` with a `tsconfig.json` present | error TS5112; use `--ignoreConfig` | Hard error |

## Notes

- The 7.0 column follows the TypeScript 7.0 announcement blog's list of deprecations that became hard errors (see the TypeScript 7.0 page). The blog lists `systemjs` and `none` under `module`.
- Migration snippet for `baseUrl` (verbatim from 6.0 release notes):

```diff json5
  {
    "compilerOptions": {
      // ...
-     "baseUrl": "./src",
      "paths": {
-       "@app/*": ["app/*"],
-       "@lib/*": ["lib/*"]
+       "@app/*": ["./src/app/*"],
+       "@lib/*": ["./src/lib/*"]
      }
    }
  }
```

- `esModuleInterop` migration: `import * as express from "express";` becomes `import express from "express";`.
- Namespaces: `module Foo { ... }` becomes `namespace Foo { ... }`. Imports: `import blob from "./blahb.json" with { type: "json" }`.
- `tsc --ignoreConfig foo.ts` compiles a file with TypeScript's defaults, ignoring `tsconfig.json`.
- The experimental `ts5to6` tool (https://github.com/andrewbranch/ts5to6) can adjust `baseUrl` and `rootDir` automatically.

## Related

- [TypeScript 6.0](./typescript-6-0.md)
- [TypeScript 7.0 (native Go port)](./typescript-7-0.md)
