---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html
---

# Template: global-modifying-module.d.ts

Declaration template for a global-modifying module: a module that alters existing values in the global scope when imported (for example adding members to `String.prototype`).

## Signature / Usage

Documentation that identifies such a module:

```js
// 'require' call that doesn't use its return value
var unused = require("magic-string-time");
/* or */
require("magic-string-time");

var x = "hello, world";
// Creates new methods on built-in types
console.log(x.startsWithHello());

var y = [1, 2, 3];
// Creates new methods on built-in types
console.log(y.reverseAndSort());
```

Template:

```ts
// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the global-modifying module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ Note: If your global-modifying module is callable or constructable, you'll
 *~ need to combine the patterns here with those in the module-class or module-function
 *~ template files
 */
declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */
  interface String {
    fancyFormat(opts: StringFormatOptions): string;
  }
}

/*~ If your module exports types or values, write them as usual */
export interface StringFormatOptions {
  fancinessLevel: number;
}

/*~ For example, declaring a method on the module (in addition to its global side effects) */
export function doSomething(): void;

/*~ If your module exports nothing, you'll need this line. Otherwise, delete it */
export {};
```

## Notes

- This pattern is somewhat dangerous due to the possibility of runtime conflicts, but a declaration file can still be written for it.
- Global-modifying modules are similar to global plugins but need a `require` call to activate their effects.
- If the module is callable or constructable, combine this pattern with the `module-class.d.ts` or `module-function.d.ts` templates.

## Related

- [Template: global-plugin.d.ts](./template-global-plugin.md)
- [Template: module-function.d.ts](./template-module-function.md)
- [Template: module-class.d.ts](./template-module-class.md)
