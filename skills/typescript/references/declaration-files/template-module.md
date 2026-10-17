---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html
---

# Template: module.d.ts

Declaration template for a module (CommonJS or ES module style) that is neither callable nor constructable; includes common CommonJS patterns, many-import handling, types in modules, and the reference `.d.ts`.

## Signature / Usage

CommonJS module:

```js
const maxInterval = 12;

function getArrayLength(arr) {
  return arr.length;
}

module.exports = {
  getArrayLength,
  maxInterval,
};
```

Equivalent `.d.ts`:

```ts
export function getArrayLength(arr: any[]): number;
export const maxInterval: 12;
```

Default (`export =`) exports:

```ts
declare const helloWorld: RegExp;
export = helloWorld;
```

A function with extra fields:

```ts
declare function getArrayLength(arr: any[]): number;
declare namespace getArrayLength {
  declare const maxInterval: 12;
}

export = getArrayLength;
```

Generic exported types:

```ts
export type ArrayMetadata<ArrType> = {
  length: number;
  firstObject: ArrType | undefined;
};

export function getArrayMetadata<ArrType>(
  arr: ArrType[]
): ArrayMetadata<ArrType>;
```

Namespace merged with an exported class:

```ts
export class API {
  constructor(baseURL: string);
  getInfo(opts: API.InfoRequest): API.InfoResponse;
}

declare namespace API {
  export interface InfoRequest {
    id: string;
  }

  export interface InfoResponse {
    width: number;
    height: number;
  }
}
```

Optional global usage in UMD contexts:

```ts
export as namespace moduleName;
```

Reference `.d.ts` to start from:

```ts
// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
export as namespace myLib;

/*~ If this module exports functions, declare them like so.
 */
export function myFunction(a: string): string;
export function myOtherFunction(a: number): number;

/*~ You can declare types that are available via importing the module */
export interface SomeType {
  name: string;
  length: number;
  extras?: string[];
}

/*~ You can declare properties of the module using const, let, or var */
export const myField: number;
```

## Notes

- The `.d.ts` syntax intentionally looks like ES Modules syntax.
- Supporting every consuming import style (`require`, `import x = require`, `import * as`, named, default, default + named) requires the JavaScript code itself to support it, e.g. `fastify.fastify = fastify;` (allows `{ fastify }`), `fastify.default = fastify;` (strict ES Module support), `module.exports = fastify;`.
- Exported types can be re-used by consumers via `import` or `import type` in TypeScript, or JSDoc imports.
- The layout of declaration files should mirror the layout of the library (`myLib/index.js`, `foo.js`, `bar/index.js`, `bar/baz.js` map to `@types/myLib/index.d.ts`, `foo.d.ts`, `bar/index.d.ts`, `bar/baz.d.ts`).
- Testing types for DefinitelyTyped: create `node_modules/@types/[libname]/index.d.ts`, copy the example in, fill it out where usage breaks, then follow DefinitelyTyped README. Otherwise create `[libname].d.ts` at the source root, add `declare module "[libname]" {  }`, and put the template inside the braces.
- Source-text caveat: inside `declare namespace` the context is already ambient, so the inner `declare` (as in `declare const maxInterval: 12;`) is an error (TS1038: A 'declare' modifier cannot be used in an already ambient context). Write `const maxInterval: 12;` instead.
- Source-text caveat: `export as namespace myLib;` plus the file being a module is the UMD global declaration.

## Related

- [Template: module-function.d.ts](./template-module-function.md)
- [Template: module-class.d.ts](./template-module-class.md)
- [Template: module-plugin.d.ts](./template-module-plugin.md)
- [Deep Dive](./deep-dive.md)
- [Library Structures](./library-structures.md)
