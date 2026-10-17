---
source: https://www.typescriptlang.org/docs/handbook/modules/reference.html#module-syntax
---

# Module syntax

TypeScript recognizes standard ECMAScript module syntax in TypeScript and JavaScript files and many forms of CommonJS syntax in JavaScript files, plus a few TypeScript-specific extensions usable in TypeScript files and/or JSDoc comments.

## Signature / Usage

```ts
// Standard JavaScript syntax...
export function f() {}
// ...extended to type declarations
export type SomeType = /* ... */;
export interface SomeInterface { /* ... */ }

export { f, SomeType, SomeInterface };

import { f, type SomeInterface } from "./module.js";
import type { SomeType } from "./module.js";
```

## Notes

- Importing/exporting TypeScript-specific declarations: type aliases, interfaces, enums and namespaces are exported with `export`. With namespace imports, exported types are available on the namespace only in a type position:

```ts
import * as mod from "./module.js";
mod.f();
mod.SomeType; // Property 'SomeType' does not exist on type 'typeof import("./module.js")'
let x: mod.SomeType; // Ok
```

- Type-only imports and exports: by default, imports used only in type positions and exports referring only to types are elided. `import type`, `export type { ... }`, and `type`-prefixed specifiers are guaranteed to be elided. Values imported with `import type` can only be used in non-emitting positions (`typeof f`).
- A type-only import may not declare both a default import and named bindings; split it or use `default` as a named binding:

```ts
import type fs, { BigIntOptions } from "fs";
// Error: A type-only import can specify a default import or named bindings, but not both.

import type { default as fs, BigIntOptions } from "fs"; // Ok
```

- `import()` types reference the type of a module without an import declaration; especially useful in JSDoc in JavaScript files:

```ts
type WriteFileOptions = import("fs").WriteFileOptions;
type WriteFileFunction = typeof import("fs").writeFile;
```

- `export =` and `import = require()`: when emitting CommonJS, direct analogs of `module.exports = ...` and `require("...")`. They exist because variable declarations and property assignments cannot refer to TypeScript types.

```ts
// main.ts
import fs = require("fs");
export = fs.readFileSync("...");

// main.js
"use strict";
const fs = require("fs");
module.exports = fs.readFileSync("...");
```

- Ambient modules: `declare module "path" { ... }` in a script (non-module) file declares a runtime-provided module with no file. The same syntax becomes a module augmentation when the file is a module (top-level `import` / `export`, or affected by `--moduleDetection force` / `auto`). Imports inside the declaration body do not turn the file into a module.
- Pattern ambient modules use a single `*` wildcard matching zero or more characters:

```ts
declare module "*.html" {
  const content: string;
  export default content;
}
```

- Changed (6.0 / 7.0): the legacy `module Foo {}` namespace syntax is deprecated in 6.0 and not allowed in 7.0; the ambient form `declare module "some-module" { ... }` remains supported (6.0 release notes https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html, TypeScript 7.0 announcement https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/). The import assertions keyword `assert` (`import ... assert { ... }`, also in `import(..., { assert: {...} })`) is deprecated in 6.0 and must be `with` (import attributes) in 7.0. The 6.0 release notes heading spells it `asserts`; TypeScript 5.3 release notes (https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html) give the keyword as `assert`.

## Related

- [The module compiler option](./module-option.md)
- [ESM/CJS Interoperability](./esm-cjs-interop.md)
