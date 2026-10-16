---
source: https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html
---

# Type Checking JavaScript Files

Notable differences in how checking works in `.js` files compared to `.ts` files.

## Signature / Usage

```js
class C {
  constructor() {
    this.constructorOnly = 0;
    this.constructorUnknown = undefined;
  }
  method() {
    this.constructorOnly = false;
    this.constructorUnknown = "plunkbat"; // ok, constructorUnknown is string | undefined
    this.methodOnly = "ok"; // ok, but methodOnly could also be undefined
  }
  method2() {
    this.methodOnly = true; // also, ok, methodOnly's type is string | boolean | undefined
  }
}
```

## Notes

### Properties are inferred from assignments in class bodies

- ES2015 has no means of declaring class properties; the compiler infers them from property assignments inside the class body.
- The type is the type given in the constructor, unless it is not defined there, or is undefined or null; then it is the union of the types of all right-hand values in these assignments.
- Properties defined in the constructor are always assumed to exist; ones defined only in methods, getters, or setters are considered optional.
- Properties never set in the class body are unknown. For read-only properties, add and annotate a declaration in the constructor with JSDoc (a value is not required):

```js
class C {
  constructor() {
    /** @type {number | undefined} */
    this.prop = undefined;
    /** @type {number | undefined} */
    this.count;
  }
}
```

### Constructor functions are equivalent to classes

- The compiler understands pre-ES2015 constructor functions as equivalent to ES2015 classes; the property inference rules work the same way.
- Changed (7.0): constructor functions are no longer supported; use `class`. See the 7.0 section below.

```js
function C() {
  this.constructorOnly = 0;
  this.constructorUnknown = undefined;
}
C.prototype.method = function () {
  this.constructorOnly = false;
  this.constructorUnknown = "plunkbat"; // OK, the type is string | undefined
};
```

### CommonJS modules are supported

- Assignments to `exports` and `module.exports` are recognized as export declarations; `require` calls are recognized as module imports. Most combinations of assignments and declarations are supported.

```js
// same as `import module "fs"`
const fs = require("fs");

// same as `export function readFile`
module.exports.readFile = function (f) {
  return fs.readFileSync(f);
};
```

### Classes, functions, and object literals are namespaces

- Classes are namespaces in `.js` files (nesting classes, simulating static methods for pre-ES2015 code, simple namespaces).

```js
class C {}
C.D = class {};

var ns = {};
ns.C = class {};
ns.func = function () {};

// IIFE
var ns = (function (n) {
  return n || {};
})();
ns.CONST = 1;

// defaulting to global
var assign =
  assign ||
  function () {
    // code goes here
  };
assign.extra = 1;
```

### Object literals are open-ended

- In a `.js` file object literals have an open-ended type (an index signature `[x:string]: any`), so properties not originally defined can be added and looked up. Specifying a JSDoc type for the variable changes this.

```js
var obj = { a: 1 };
obj.b = 2; // Allowed

/** @type {{a: number}} */
var obj2 = { a: 1 };
obj2.b = 2; // error
```

### null, undefined, and empty array initializers are of type any or any[]

- Any variable, parameter or property initialized with `null` or `undefined` has type `any`, even with strict null checks on; one initialized with `[]` has type `any[]`. The only exception is properties with multiple initializers.

```js
function Foo(i = null) {
  if (!i) i = 1;
  var j = undefined;
  j = 2;
  this.l = [];
}

var foo = new Foo();
foo.l.push(foo.i);
foo.l.push("end");
```

### Function parameters are optional by default

- All function parameters in a `.js` file are considered optional; calls with fewer arguments are allowed, but too many arguments is an error.
- JSDoc annotated functions are excluded from this rule. Use JSDoc optional parameter syntax (`[` `]`).

```js
/**
 * @param {string} [somebody] - Somebody's name.
 */
function sayHello(somebody) {
  if (!somebody) {
    somebody = "John Doe";
  }
  console.log("Hello " + somebody);
}

sayHello();
```

- Changed (7.0): with `"strict": false`, omitting arguments for parameters of type `undefined`, `unknown`, or `any` is no longer allowed; `void` can still be omitted regardless of strict mode.

### Var-args parameter declaration inferred from use of `arguments`

- A function body referencing `arguments` is implicitly considered to have a var-arg parameter `(...arg: any[]) => any`. Use JSDoc var-arg syntax to specify the type.
- Changed (7.0): `arguments` usage no longer implies a `...args: any[]` parameter; use an explicit spread parameter.

```js
/** @param {...number} args */
function sum(/* numbers */) {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
```

### Unspecified type parameters default to `any`

- With no JavaScript syntax for generic type parameters, an unspecified type parameter defaults to `any`: in an `extends` clause (use `@augments`), in JSDoc references (`Array` is `Array<any>`), and in function calls where inference has no sources (`new Promise(...)` is `Promise<any>`).

```js
import { Component } from "react";

/**
 * @augments {Component<{a: number}, State>}
 */
class MyComponent extends Component {
  render() {
    this.props.b; // Error: b does not exist on {a:number}
  }
}
```

### Changed (7.0): JavaScript support in the Go compiler

Source: https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/CHANGES.md ("JavaScript support", "Component-Level Changes"). The intent stated there: expose TypeScript features in a `.js` file working as they do in TypeScript with different syntax, using the same rule for checking calls in TypeScript and JavaScript; unused or underused features (most Closure-specific ones, including Closure header files) are removed.

- Removed (7.0): constructor functions (expando property in the constructor function or on its prototype, and `@class` / `@constructor` making a function a constructor); use `class`.
- Removed (7.0), expando declarations: fallback initialisers (`f.x = f.x || init`), nested undeclared expandos (every intermediate expando must be assigned), identifier declarations (`this.identifier` with only a `@type` in a constructor), `this` aliases (`var that = this`), `this` alias for `globalThis` at script top level.
- Changed (7.0), expandos: `o.y = void 0` is no longer ignored (creates `y: undefined`); a this-property expression with a type annotation in the constructor no longer creates a property (provide an initializer or a class-body property declaration).
- Removed (7.0), CommonJS: nested undeclared exports (`exports.N.X.p = 1` needs every intermediate assigned), ignored empty `module.exports = {}` assignment, `this` alias for `module.exports`, aliasing of `module.exports` (`var mod = module.exports`), single-property access `require('fs').readFile` (use destructuring).
- Changed (7.0), CommonJS: multiple assignments no longer narrow with control flow (they union); a module must not mix assignments to the full `module.exports` with assignments to `module.exports.xxx`.
- Changed (7.0): values are no longer resolved as types in JSDoc type positions (use `typeof FORWARD`); `@param` tags apply to at most one function; `@type` type assertions prevent narrowing; `@typedef` / `@callback` in a class body are hoisted outside the class.
- Component-level: node positions use UTF8 offsets, not UTF16.

```js
// 7.0: use classes instead of constructor functions
class C {
  constructor() {
    this.property = 1;
  }
  method() {}
}
```

## Related

- [JS Projects Utilizing TypeScript](./intro-to-js-with-ts.md)
- [JSDoc Reference - Types](./jsdoc-types.md)
- [JSDoc Reference - Classes](./jsdoc-classes.md)
- [Creating .d.ts Files from .js files](./creating-dts-from-js.md)
