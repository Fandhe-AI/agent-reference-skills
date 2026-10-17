---
source: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#types
---

# JSDoc Reference - Types

JSDoc tags that provide type information in JavaScript files: `@type`, `@import`, `@param` / `@returns`, `@typedef` / `@callback`, `@template`, `@satisfies`.

## Signature / Usage

```js
/** @type {{ a: string, b: number }} */
var var9;

/**
 * @template T
 * @param {T} x - A generic parameter that flows through to the return type
 * @returns {T}
 */
function id(x) {
  return x;
}
```

## Notes

- Any tag not explicitly listed in the JSDoc Reference (such as `@async`) is not yet supported. Only documentation tags are supported in TypeScript files; the rest are only supported in JavaScript files.
- The meaning is usually the same as, or a superset of, the tag at jsdoc.app.
- TSDoc comment conventions are covered by the separate tsdoc skill; API doc generation by typedoc.

### `@type`

The type can be a primitive, a type declared in a TypeScript declaration (global or imported), or declared in a JSDoc `@typedef`. Most JSDoc type syntax and any TypeScript syntax is allowed.

```js
/** @type {string | boolean} */
var sb;

/** @type {number[]} */
var ns;
/** @type {Array.<number>} */
var jsdoc;
/** @type {Array<number>} */
var nas;

/**
 * A map-like object that maps arbitrary `string` properties to `number`s.
 *
 * @type {Object.<string, number>}
 */
var stringToNumber;

/** @type {Object.<number, object>} */
var arrayLike;

/** @type {function(string, boolean): number} Closure syntax */
var sbn;
/** @type {(s: string, b: boolean) => number} TypeScript syntax */
var sbn2;

/** @type {Function} */
var fn7;
/** @type {function} */
var fn6;

/**
 * @type {*} - can be 'any' type
 */
var star;
/**
 * @type {?} - unknown type (same as 'any')
 */
var question;
```

- `Object.<string, number>` and `Object.<number, object>` are equivalent to `{ [x: string]: number }` and `{ [x: number]: any }`.
- Changed (7.0): Closure `function(string, boolean): number` syntax is no longer parsed (use `(s: string, b: boolean) => number`); the standalone `?` type is removed (use `any`); JSDoc module namepaths (`module:folder/file.C`) are not parsed (use `import("file").id`); values are no longer resolved as types in JSDoc type positions (use `typeof`); automatic `typeof` insertion is removed. Source: https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/CHANGES.md.

#### Casts

A `@type` tag before any parenthesized expression casts it (syntax borrowed from Google Closure). Casting to `const` also works.

```js
/**
 * @type {number | string}
 */
var numberOrString = Math.random() < 0.5 ? "hello" : 100;
var typeAssertedNumber = /** @type {number} */ (numberOrString);

let one = /** @type {const} */(1);
```

- Changed (7.0): a type assertion with a `@type` tag now prevents narrowing, as with TS assertion syntax (in 6.0 `cu` incorrectly narrowed inside the `if`).

#### Import types

Import types are TypeScript-specific syntax differing from the JSDoc standard; they can also get the type of a value from a module.

```js
/**
 * @param {import("./types").Pet} p
 */
function walk(p) {
  console.log(`Walking ${p.name}...`);
}

/**
 * @type {typeof import("./accounts").userAccount}
 */
var x = require("./accounts").userAccount;
```

### `@import`

References exports from other files. It does not import files at runtime; the symbols it brings into scope can only be used within JSDoc comments for type-checking.

```js
/**
 * @import {Pet} from "./types"
 */

/**
 * @type {Pet}
 */
var myPet;
myPet.name;
```

```js
/** @import { Dog } from "./dog.js" */

const d = new Dog(); // error!
```

### `@param` and `@returns`

`@param` uses the same type syntax as `@type` plus a parameter name. Optionality: `{string=}` (Google Closure), `[p3]` (JSDoc), `[p4="test"]` with default. `@arg` / `@argument` and `@return` are aliases.

```js
/**
 * @param {string}  p1 - A string param.
 * @param {string=} p2 - An optional param (Google Closure syntax)
 * @param {string} [p3] - Another optional param (JSDoc syntax).
 * @param {string} [p4="test"] - An optional param with a default value
 * @returns {string} This is the result
 */
function stringsStringStrings(p1, p2, p3, p4) {
  // TODO
}

/**
 * @return {PromiseLike<string>}
 */
function ps() {}

/**
 * @returns {{ a: string, b: number }} - May use '@returns' as well as '@return'
 */
function ab() {}
```

- Changed (7.0): JSDoc variadic types (`{...number}`) are only synonyms for array types and no longer make a parameter a rest parameter; the parameter must use standard rest syntax (`function sum(...ns)`).
- Changed (7.0): the postfix `=` type no longer adds `undefined` even when `strictNullChecks` is off (`number=` gives `x?: number`); it still makes a parameter optional in `@param`.
- Changed (7.0): `@param` tags apply to at most one function (with `"strict": true` expect noImplicitAny on the untyped parameters).
- Changed (7.0): an `asserts` annotation for an arrow function must be on the declaring variable (`@type {(a: A) => asserts a is B}`), not in `@returns` on the arrow.
- Changed (7.0): `@overload` on arrow functions and function expressions is ignored; write `@type {{ (x: string): string; (x: number): number; }}` instead (works with both TS6 and TS7).

### `@typedef`, `@callback`, and `@param`

`@typedef` defines complex types (`object` or `Object` on the first line); `@param` allows similar one-off syntax with property names prefixed by the parameter name. `@callback` specifies a function type.

```js
/**
 * @typedef {Object} SpecialType - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 * @prop {number} [prop4] - an optional number property of SpecialType
 * @prop {number} [prop5=42] - an optional number property of SpecialType with default
 */

/** @type {SpecialType} */
var specialTypeObject;
specialTypeObject.prop3;
```

```js
/**
 * @param {Object} options - The shape is the same as SpecialType above
 * @param {string} options.prop1
 * @param {number} options.prop2
 * @param {number=} options.prop3
 * @param {number} [options.prop4]
 * @param {number} [options.prop5=42]
 */
function special(options) {
  return (options.prop4 || 1001) + options.prop5;
}

/**
 * @callback Predicate
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */

/** @type {Predicate} */
const ok = (s) => !(s.length % 2);
```

Single-line TypeScript syntax:

```js
/** @typedef {{ prop1: string, prop2: string, prop3?: number }} SpecialType */
/** @typedef {(data: string, index?: number) => boolean} Predicate */
```

- Changed (7.0): identifier-named typedefs (`/** @typedef {T} */ typeName;`) are removed (use `/** @typedef {T} typeName */`).

### `@template`

Declares type parameters. Comma or multiple tags declare several; a constraint may precede the name (only the first type parameter in a list is constrained); a default is allowed.

```js
/**
 * @template T,U,V
 * @template W,X
 */

/**
 * @template {string} K - K must be a string or string literal
 * @template {{ serious(): string }} Seriousalizable - must have a serious method
 * @param {K} key
 * @param {Seriousalizable} object
 */
function seriousalize(key, object) {
  // ????
}

/** @template [T=object] */
class Cache {
    /** @param {T} initial */
    constructor(initial) {
    }
}
let c = new Cache()
```

### `@satisfies`

Provides access to the postfix `satisfies` operator (TypeScript 4.9): declares that a value implements a type without affecting the type of the value.

```js
// @ts-check
/**
 * @typedef {"hello world" | "Hello, world"} WelcomeMessage
 */

/** @satisfies {WelcomeMessage} */
const message = "hello world"

/** @satisfies {WelcomeMessage} */
const failingMessage = "Hello world!"

/** @type {WelcomeMessage} */
const messageUsingType = "hello world"
```

## Related

- [JSDoc Reference - Classes](./jsdoc-classes.md)
- [JSDoc Reference - Documentation / Other](./jsdoc-documentation-and-other.md)
- [Type Checking JavaScript Files](./type-checking-javascript-files.md)
