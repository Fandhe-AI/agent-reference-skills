---
source: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#documentation
---

# JSDoc Reference - Documentation / Other

Documentation tags (`@deprecated`, `@see`, `@link`; they work in both TypeScript and JavaScript) and other tags and patterns (`@enum`, `@author`, other supported patterns, unsupported patterns and tags, legacy type synonyms).

## Signature / Usage

```ts
/** @deprecated */
const apiV1 = {};
const apiV2 = {};

type Box<T> = { t: T }
/** @see Box for implementation details */
type Boxify<T> = { [K in keyof T]: Box<T> };
```

## Notes

- TSDoc comment conventions are covered by the separate tsdoc skill; API doc generation by typedoc.
- `@deprecated` is surfaced in completion lists and as a suggestion diagnostic that editors can handle specially (e.g. strike-through in VS Code).
- `@see` lets you link to other names in the program; some editors turn the name into a link.

### `@link`

Like `@see`, but usable inside other tags; it can also link a property, with an optional name.

```ts
type Box<T> = { t: T }
/** @returns A {@link Box} containing the parameter. */
function box<U>(u: U): Box<U> {
  return { t: u };
}

type Pet = {
  name: string
  hello: () => string
}

/**
 * Note: you should implement the {@link Pet.hello | hello} method of Pet.
 */
function hello(p: Pet) {
  p.hello()
}
```

### `@enum`

Creates an object literal whose members are all of a specified type; it does not allow other members. Intended for compatibility with Google Closure's `@enum`; much simpler than TypeScript's `enum`, but can have any type.

```js
/** @enum {number} */
const JSDocState = {
  BeginningOfLine: 0,
  SawAsterisk: 1,
  SavingComments: 2,
};

JSDocState.SawAsterisk;

/** @enum {function(number): number} */
const MathFuncs = {
  add1: (n) => n + 1,
  id: (n) => -n,
  sub1: (n) => n - 1,
};
```

- Removed (7.0): `@enum` has no specific semantics in the Go compiler (parsed as a generic JSDocTag). Substitute: `/** @typedef {number} E */` plus `/** @type {Record<string, E>} */ const E = { A: 1, B: 2 };`. Source: https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/CHANGES.md ("JSDoc Tags and Types").

### `@author`

Specifies the author. Surround the email address with angle brackets, otherwise `@example` is parsed as a new tag.

```ts
/**
 * Welcome to awesome.ts
 * @author Ian Awesome <i.am.awesome@example.com>
 */
```

- Changed (7.0): in the Go compiler `@treehouse` in `@author Finn <finn@treehouse.com>` parses as a new tag; `@author` itself is now a generic JSDocTag.

### Other supported patterns

```js
var someObj = {
  /**
   * @param {string} param1 - JSDocs on property assignments work
   */
  x: function (param1) {},
};

/**
 * As do jsdocs on variable assignments
 * @return {Window}
 */
let someFunc = function () {};

/**
 * And class methods
 * @param {string} greeting The greeting to use
 */
Foo.prototype.sayHi = (greeting) => console.log("Hi!");

/**
 * And arrow function expressions
 * @param {number} x - A multiplier
 */
let myArrow = (x) => x * x;

/**
 * A parameter can be a class constructor, using Google Closure syntax.
 *
 * @param {{new(...args: any[]): object}} C - The class to register
 */
function registerClass(C) {}

/**
 * @param {...string} p1 - A 'rest' arg (array) of strings. (treated as 'any')
 */
function fn10(p1) {}
```

### Unsupported patterns

- Postfix equals on a property type in an object literal type does not specify an optional property; use postfix question on the property name.
- Nullable types (`?number`) only have meaning if `strictNullChecks` is on; the TypeScript-native syntax is a union (`number | null`).
- Non-nullable types (`!number`) have no meaning and are treated as the original type. TypeScript only allows marking types as containing null or not; with `strictNullChecks` on, `number` is not nullable, with it off it is.

```js
/**
 * @type {{ a: string, b: number= }}
 */
var wrong;
/**
 * Use postfix question on the property name instead:
 * @type {{ a: string, b?: number }}
 */
var right;
```

### Unsupported tags

- TypeScript ignores any unsupported JSDoc tags. Open issues exist for `@memberof` (#7237), `@yields` (#23857), `@member` (#56674).

### Legacy type synonyms

Aliases for compatibility with old JavaScript code (the capitalized primitive types are wrapper types in TypeScript, almost always a mistake):

- `String -> string`, `Number -> number`, `Boolean -> boolean`, `Void -> void`, `Undefined -> undefined`, `Null -> null`
- `function -> Function`, `array -> Array<any>`, `promise -> Promise<any>`, `Object -> any`, `object -> any`
- The last four aliases are turned off when `noImplicitAny: true`. `object` and `Object` are built-in types (`Object` rarely used); `array` and `promise` are not built-in but might be declared somewhere in the program.

## Related

- [JSDoc Reference - Types](./jsdoc-types.md)
- [JSDoc Reference - Classes](./jsdoc-classes.md)
- [Type Checking JavaScript Files](./type-checking-javascript-files.md)
