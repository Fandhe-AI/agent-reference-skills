---
source: https://www.typescriptlang.org/docs/handbook/2/modules.html
---

# Modules (handbook chapter)

How JavaScript handles communicating across file boundaries: what counts as a module, ES Module and CommonJS syntax, module resolution, and module output options. Detailed option semantics live in the modules category.

## Signature / Usage

```ts
// ES module exports / imports
export default function helloWorld() {
  console.log("Hello, world!");
}
export const pi = 3.14;

import helloWorld from "./hello.js";
import { pi as π } from "./maths.js";
import * as math from "./maths.js";
import "./maths.js";

// Type-only imports
import type { Cat, Dog } from "./animal.js";
import { createCatName, type Cat as CatAlias } from "./animal.js";

// Force a file to be a module
export {};

// ES module syntax with CommonJS behavior
import fs = require("fs");
```

```ts
// CommonJS
module.exports = { pi: 3.14, absolute };
const { squareTwo } = require("./maths");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `module` | compiler option | Module code generation / loader format |
| `moduleResolution` | compiler option | Strategy for resolving import strings to files |
| `target` | compiler option | Which JS features are downleveled |
| `esModuleInterop` | compiler option | Reduces friction between CommonJS default imports and ES namespace imports |
| `outFile` | compiler option | Joins script-file outputs into one file |

## Notes

- Any file with a top-level `import` or `export` (or top-level `await`) is a module; otherwise it is a script whose declarations are global.
- Three concerns: syntax, module resolution (module names/paths to files), and module output target.
- `import type` can only import types; inline `type` modifiers (TypeScript 4.5) mark individual imports. Together they let Babel, swc or esbuild know what imports can be removed.
- Side-effect import `import "./maths.js"` evaluates the file without binding names.
- Output: `target` selects which JS features are downleveled; `module` selects the module loader format (the page shows ES2020, CommonJS, UMD emit of the same file; ES2020 output equals the input).
- Resolution flags named by the source: `moduleResolution`, `baseUrl`, `paths`, `rootDirs`.
- Namespaces pre-date ES Modules; not deprecated per the source, but ES Modules are recommended.

- Deprecated (6.0) / Removed (7.0): `module: amd | umd | systemjs | none` (the page's UMD emit example is no longer supported), `moduleResolution: node` / `node10` and `classic` (the source describes "Classic and Node" strategies), `baseUrl`, `esModuleInterop: false` and `allowSyntheticDefaultImports: false`, `outFile` (removed in 6.0 per the announcement), and the legacy `module Foo {}` namespace keyword. Recommended replacements: `nodenext` or `bundler` resolution. Source: TypeScript 6.0 and 7.0 announcements.
- Default changed (6.0): `module` defaults to `esnext`. The source text's remark that Classic is the default when `module` is not `commonjs` is outdated. Source: TypeScript 6.0 announcement.
- Deprecated (6.0): the `asserts` keyword on imports; use `with { type: "json" }` import attributes.

## Related

- [Basics](./basics.md)
- [Type Declarations](./type-declarations.md)
