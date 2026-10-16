---
source: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#classes
---

# JSDoc Reference - Classes

JSDoc tags for classes in JavaScript files: property modifiers (`@public`, `@private`, `@protected`, `@readonly`), `@override`, `@extends` / `@augments`, `@implements`, `@class` / `@constructor`, `@this`.

## Signature / Usage

```js
class C {
  /**
   * @param {number} data
   */
  constructor(data) {
    // property types can be inferred
    this.name = "foo";

    // or set explicitly
    /** @type {string | null} */
    this.title = null;

    // or simply annotated, if they're set elsewhere
    /** @type {number} */
    this.size;

    this.initialize(data); // Should error, initializer expects a string
  }
  /**
   * @param {string} s
   */
  initialize = function (s) {
    this.size = s.length;
  };
}

var c = new C(0);

// C should only be called with new, but
// because it is JavaScript, this is allowed and
// considered an 'any'.
var result = C(1);
```

## Notes

- Classes can be declared as ES6 classes, or as constructor functions using `@constructor` along with `@this`.
- Changed (7.0): constructor functions are no longer supported, and `@class` / `@constructor` does not make a function into a constructor function (they now parse as generic JSDocTag nodes). Use `class` declarations. Source: https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/CHANGES.md ("JSDoc Tags and Types", "Expandos").
- Changed (7.0): a this-property expression with only a type annotation in the constructor (`/** @type {SharedId} */ this.id;`) no longer creates a property; provide an initializer or use a property declaration in the class body.
- Changed (7.0): `@typedef` and `@callback` in a class body are hoisted outside the class and may conflict with similarly named declarations in the outer scope.

### Property Modifiers

`@public`, `@private`, and `@protected` work exactly like `public`, `private`, and `protected` in TypeScript.

```js
class Car {
  constructor() {
    /** @private */
    this.identifier = 100;
  }

  printIdentifier() {
    console.log(this.identifier);
  }
}

const c = new Car();
console.log(c.identifier);
```

- `@public` is always implied and can be left off; it means a property can be reached from anywhere.
- `@private`: only within the containing class.
- `@protected`: within the containing class and all derived subclasses, but not on dissimilar instances of the containing class.
- `@public`, `@private`, and `@protected` do not work in constructor functions.

### `@readonly`

Ensures a property is only written to during initialization.

```js
class Car {
  constructor() {
    /** @readonly */
    this.identifier = 100;
  }

  printIdentifier() {
    console.log(this.identifier);
  }
}

const c = new Car();
console.log(c.identifier);
```

### `@override`

Works the same way as in TypeScript; use it on methods that override a base class method. Set `noImplicitOverride: true` in tsconfig to check overrides.

```js
export class C {
  m() { }
}
class D extends C {
  /** @override */
  m() { }
}
```

### `@extends`

Passes a type argument to a generic base class (no JavaScript syntax exists for it). `@augments` is an alias. Only works with classes; there is currently no way for a constructor function to extend a class.

```js
/**
 * @template T
 * @extends {Set<T>}
 */
class SortableSet extends Set {
  // ...
}
```

### `@implements`

Implements a TypeScript interface, as in TypeScript.

```js
/** @implements {Print} */
class TextBook {
  print() {
    // TODO
  }
}
```

### `@constructor`

The compiler infers constructor functions from this-property assignments; `@constructor` makes checking stricter and suggestions better. With it, `this` is checked inside the constructor function and calling `C` instead of constructing it may produce editor warnings. Constructor functions that are also callable cannot use `@constructor`. Error messages show up only in JS codebases with a jsconfig and `checkJs` enabled.

```js
/**
 * @constructor
 * @param {number} data
 */
function C(data) {
  // property types can be inferred
  this.name = "foo";

  // or set explicitly
  /** @type {string | null} */
  this.title = null;

  // or simply annotated, if they're set elsewhere
  /** @type {number} */
  this.size;

  this.initialize(data);
}
/**
 * @param {string} s
 */
C.prototype.initialize = function (s) {
  this.size = s.length;
};

var c = new C(0);
c.size;

var result = C(1);
```

- Removed (7.0): see the Changed (7.0) note above; this pattern is not supported by the Go compiler.

### `@this`

Specifies the type of `this` when the compiler cannot work it out from context.

```js
/**
 * @this {HTMLElement}
 * @param {*} e
 */
function callbackForLater(e) {
  this.clientHeight = parseInt(e); // should be fine!
}
```

## Related

- [JSDoc Reference - Types](./jsdoc-types.md)
- [JSDoc Reference - Documentation / Other](./jsdoc-documentation-and-other.md)
- [Type Checking JavaScript Files](./type-checking-javascript-files.md)
