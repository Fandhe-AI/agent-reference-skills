---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-plugin-d-ts.html
---

# Template: global-plugin.d.ts

Declaration template for a global plugin: global code that changes the shape of some global (for example adding methods to `Array.prototype` or `String.prototype`). The page also summarizes UMD, module plugins, and global-modifying modules.

## Signature / Usage

Template:

```ts
// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This template shows how to write a global plugin. */

/*~ Write a declaration for the original type and add new members.
 *~ For example, this adds a 'toBinaryString' method with overloads to
 *~ the built-in number type.
 */
interface Number {
  toBinaryString(opts?: MyLibrary.BinaryFormatOptions): string;

  toBinaryString(
    callback: MyLibrary.BinaryFormatCallback,
    opts?: MyLibrary.BinaryFormatOptions
  ): string;
}

/*~ If you need to declare several types, place them inside a namespace
 *~ to avoid adding too many things to the global namespace.
 */
declare namespace MyLibrary {
  type BinaryFormatCallback = (n: number) => string;
  interface BinaryFormatOptions {
    prefix?: string;
    padding: number;
  }
}
```

Documentation that identifies a global plugin:

```js
var x = "hello, world";
// Creates new methods on built-in types
console.log(x.startsWithHello());

var y = [1, 2, 3];
// Creates new methods on built-in types
console.log(y.reverseAndSort());
```

## Notes

- UMD: a module usable either through an import or as a global; tests for `typeof define`, `typeof window`, or `typeof module` at the top of a file indicate UMD. Use `module.d.ts`, `module-class.d.ts` (constructed with `new`), or `module-function.d.ts` (called as a function).
- Module plugin or UMD plugin: changes the shape of another module (e.g. `moment-range` adds `range` to `moment`); the declaration is the same whether the target is a plain module or UMD. Template: `module-plugin.d.ts`.
- Global plugins raise the possibility of runtime conflict, as do global-modifying modules. Global-modifying modules need a `require` call (often with an unused return value) to activate their effects; template: `global-modifying-module.d.ts`.
- Dependencies: use `/// <reference types="..." />` for global libraries (and when a global library depends on a UMD module), `import` for modules and for modules or UMD libraries depending on UMD libraries. Do not use a `/// <reference` directive for a dependency on a UMD library.
- Preventing name conflicts: declare types namespaced by the library's global variable (`declare namespace cats { interface KittySettings {} }`, not a top-level `interface CatsKittySettings {}`).
- ES6 impact on module plugins and call signatures: ES6 modules are immutable and the top-level module object is never callable; the common solution is a `default` export.
- The layout of declaration files should mirror the library layout (`@types/myLib/index.d.ts`, `foo.d.ts`, `bar/index.d.ts`, `bar/baz.d.ts`).

## Related

- [Template: global.d.ts](./template-global.md)
- [Template: global-modifying-module.d.ts](./template-global-modifying-module.md)
- [Template: module-plugin.d.ts](./template-module-plugin.md)
- [Library Structures](./library-structures.md)
