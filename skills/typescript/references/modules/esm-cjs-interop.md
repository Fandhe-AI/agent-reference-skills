---
source: https://www.typescriptlang.org/docs/handbook/modules/appendices/esm-cjs-interop.html
---

# Modules - ESM/CJS Interoperability

A detailed look at how ES modules and CommonJS interoperate, why `allowSyntheticDefaultImports` and `esModuleInterop` exist, how Node.js differs from bundlers/transpilers, and what that means for apps and libraries.

## Signature / Usage

```ts
// Default import of a CJS module that exports a function
import hello from "./exports-function"; // OK with esModuleInterop

// Namespace import is invalid per spec (always a Module Namespace Object)
import * as hello2 from "./exports-function"; // error with esModuleInterop

// Older TypeScript workaround
import hello3 = require("./exports-function");
```

## Notes

- Transpilers mapped ESM to CJS as `exports.A = {}; exports.default = "Hello, world!";` and imports as `module_1.default`. Existing CJS modules assigning `module.exports = function ...` could not be reached with a spec-compliant `import *`, because a namespace import always resolves to a Module Namespace Object.
- Babel and others added an `__esModule` flag (`exports.__esModule = true`) and import code like `_mod.__esModule ? _mod.default : _mod`. TypeScript added `allowSyntheticDefaultImports` in 1.8 (type checking only; emit unchanged, so it could silence a build error while emitting code that crashes in Node), and `esModuleInterop` in 2.7 (refined type checking plus the same `__esModule`-conditional emit, with an `import *` helper that always yields an object with call signatures stripped).
- Node.js: synthesizes a default export from CJS `exports` (v12); cannot respect `__esModule`, causing the "double default" problem (`doSomething.default()` works in Node ESM, `doSomething()` after transpilation); synthesizes named exports through static analysis (cjs-module-lexer) before code runs, so dynamic names like `exports["worl" + "d"]` are missing; CommonJS could not `require` a true ES module before v22.12.0; ESM and CJS use different module resolution algorithms (e.g. `export * from "./add"` needs `"./add.js"` in Node ESM).

```ts
// named-exports.cjs
exports.hello = "world";
exports["worl" + "d"] = "hello";

// transpile-vs-run-directly.{js/mjs}
import { hello, world } from "./named-exports.cjs";
// `hello` works, but `world` is missing in Node.js
import mod from "./named-exports.cjs";
mod.world; // Accessing properties from the default always works
```

- Conclusion 1: setting `module` correctly is critical; output is not checked for Node.js compatibility unless `module` is `node16`, `node18`, or `nodenext`.
- Conclusion 2: applications with CommonJS code should always enable `esModuleInterop`. `allowSyntheticDefaultImports` without `esModuleInterop` should be avoided (changes checking without changing emit). To avoid `__importDefault` / `__importStar` helper size, use `importHelpers` (imports from `tslib`); to avoid import transformations, enabling `verbatimModuleSyntax` is better than disabling `esModuleInterop`.
- Conclusion 3: libraries shipping CommonJS should avoid default exports (accessed as `pkg.default()` in Node ESM and vanilla CJS, as `pkg()` in most bundlers). Use `export =` for a single main export, or named exports:

```diff
- export default function doSomething() { /* ... */ }
+ export = function doSomething() { /* ... */ }
```

- Libraries shipping declarations should ensure types are error-free under many compiler options; a default import in a `.d.ts` that only works with `esModuleInterop` is "infectious" (prefer `import express = require("express");`). `verbatimModuleSyntax` sidesteps this by forcing CommonJS-style syntax in CommonJS-emitting files.
- Deprecated (6.0) / Removed (7.0): 6.0 deprecates `esModuleInterop: false` and `allowSyntheticDefaultImports: false` and enables the safer interop by default; setting `"ignoreDeprecations": "6.0"` lets them keep working without errors in 6.0 as a transition period, and 7.0 removes them so they cannot be set to `false` (source: https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/). Where the text above says interop "when disabled" it describes behavior prior to 6.0 or under `ignoreDeprecations: "6.0"`. Adjust imports that relied on the old behavior (e.g. `import * as express from "express"` becomes `import express from "express"`).

## Related

- [Theory](./theory.md)
- [The module compiler option](./module-option.md)
- [Choosing Compiler Options](./choosing-compiler-options.md)
