---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-plugin-d-ts.html
---

# Template: module-plugin.d.ts

Declaration template for JavaScript code that extends another library (a module plugin), using declaration merging.

## Signature / Usage

JavaScript usage being described:

```ts
import { greeter } from "super-greeter";

// Normal Greeter API
greeter(2);
greeter("Hello world");

// Now we extend the object with a new function at runtime
import "hyper-super-greeter";
greeter.hyperGreet();
```

The definition for "super-greeter":

```ts
/*~ This example shows how to have multiple overloads for your function */
export interface GreeterFunction {
  (name: string): void
  (time: number): void
}

/*~ This example shows how to export a function specified by an interface */
export const greeter: GreeterFunction;
```

Extending the existing module (template as published):

```ts
// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module plugin template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ On this line, import the module which this module adds to */
import { greeter } from "super-greeter";

/*~ Here, declare the same module as the one you imported above
 *~ then we expand the existing declaration of the greeter function
 */
export module "super-greeter" {
  export interface GreeterFunction {
    /** Greets even better! */
    hyperGreet(): void;
  }
}
```

## Notes

- This uses declaration merging.
- Impact of ES6 on module plugins: some plugins add or modify top-level exports on existing modules. This is legal in CommonJS and other loaders, but ES6 modules are considered immutable and the pattern will not be possible. There is no compile-time enforcement because TypeScript is loader-agnostic.
- Deprecated (6.0) / Removed (7.0) applies to the legacy `module Foo {}` namespace syntax only; the 6.0 deprecations page states that ambient `declare module "x"` (string-named module) still works. The template as published writes `export module "super-greeter"`; the source does not show an alternative spelling.

## Related

- [Template: module.d.ts](./template-module.md)
- [Library Structures](./library-structures.md)
- [Template: global-plugin.d.ts](./template-global-plugin.md)
