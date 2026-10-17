---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html
---

# Library Structures

How to identify the structure of a library (module, global, UMD) and which declaration template matches it. The way a declaration file is structured depends on how the library is consumed.

## Signature / Usage

Questions to ask about the library: how do you obtain it (only npm, only a CDN)? How would you import it (adds a global object, uses `require` or `import`/`export`)?

Modular library (module-function template when the module can be called):

```js
const x = require("foo");
// Note: calling 'x' as a function
const y = x(42);
```

Module-class template when the module can be constructed with `new`:

```js
const x = require("bar");
// Note: using 'new' operator on the imported variable
const y = new x("hello");
```

Module-plugin template when importing makes changes to other modules:

```js
const jest = require("jest");
require("jest-matchers-files");
```

UMD detection pattern:

```js
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["libName"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("libName"));
    } else {
        root.returnExports = factory(root.libName);
    }
}(this, function (b) {
```

Dependencies in a declaration file:

```ts
/// <reference types="someLib" />

function getThing(): someLib.thing;
```

```ts
import * as moment from "moment";

function getThing(): moment;
```

## Notes

- Modular libraries typically have unconditional calls to `require` or `define`, declarations like `import * as a from 'b';` or `export c;`, and assignments to `exports` or `module.exports`; rarely assignments to properties of `window` or `global`.
- Four module templates: `module.d.ts` (read first for an overview), `module-function.d.ts`, `module-class.d.ts`, `module-plugin.d.ts`.
- Global libraries are accessible without `import` (e.g. `$` in jQuery) and usually show an HTML `<script>` tag in documentation. Code shows top-level `var`/`function` declarations, assignments to `window.someName`, and DOM assumptions; no module-loader checks. Before writing a global declaration file, make sure the library is not actually UMD. Template: `global.d.ts`.
- A UMD module can be used either as a module (through an import) or as a global. Tests for `typeof define`, `typeof window`, or `typeof module` at the top of the file indicate UMD. The source's UMD section names `module-plugin.d.ts` as the template, but that template is for plugins that change another module. For the UMD library itself use `module.d.ts` (or `module-function.d.ts` if callable, `module-class.d.ts` if constructable); these declare the global via `export as namespace`. Use `module-plugin.d.ts` only for UMD plugins (see template-global-plugin.md).
- Dependencies: global library dependency uses `/// <reference types="..." />`; module dependency uses `import`; a global library depending on a UMD module uses `/// <reference types`; a module or UMD library depending on a UMD library uses `import`. Do not use a `/// <reference` directive to declare a dependency to a UMD library.
- Preventing name conflicts: only declare types namespaced by the global variable the library defines (e.g. `declare namespace cats { interface KittySettings {} }`, not a top-level `interface CatsKittySettings {}`). This also lets the library transition to UMD without breaking declaration file users.
- ES6 module call signatures: the top-level module object can never be callable in ES6-compliant loaders; the common solution is a `default` export. TypeScript can handle this with `"esModuleInterop": true` in tsconfig.json.
- Deprecated (6.0): `esModuleInterop: false` (and `allowSyntheticDefaultImports: false`) are deprecated in TypeScript 6.0 and removed in 7.0 (see the tsconfig interop-constraints page); the source guide text above predates this.

## Related

- [Template: module.d.ts](./template-module.md)
- [Template: module-function.d.ts](./template-module-function.md)
- [Template: module-class.d.ts](./template-module-class.md)
- [Template: module-plugin.d.ts](./template-module-plugin.md)
- [Template: global.d.ts](./template-global.md)
- [Templates (overview)](./templates.md)
