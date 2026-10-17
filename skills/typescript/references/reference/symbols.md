---
source: https://www.typescriptlang.org/docs/handbook/symbols.html
---

# Symbols

`symbol` is a primitive data type (ECMAScript 2015), created by calling the `Symbol` constructor. Symbols are immutable and unique.

## Signature / Usage

```ts
let sym1 = Symbol();

let sym2 = Symbol("key"); // optional string key

let sym3 = Symbol("key");
sym2 === sym3; // false, symbols are unique
```

Symbols as property keys and class members (computed property declarations):

```ts
const getClassNameSymbol = Symbol();

class C {
  [getClassNameSymbol]() {
    return "C";
  }
}

let c = new C();
let className = c[getClassNameSymbol](); // "C"
```

## Options / Props

| Well-known symbol | Description |
| --- | --- |
| `Symbol.asyncIterator` | Method that returns an async iterator for an object, for use with `for await..of` |
| `Symbol.hasInstance` | Determines if a constructor object recognizes an object as one of its instances; called by `instanceof` |
| `Symbol.isConcatSpreadable` | Boolean: object should be flattened to its array elements by `Array.prototype.concat` |
| `Symbol.iterator` | Method that returns the default iterator for an object; called by `for-of` |
| `Symbol.match` | Regular expression method that matches against a string; called by `String.prototype.match` |
| `Symbol.replace` | Regular expression method that replaces matched substrings; called by `String.prototype.replace` |
| `Symbol.search` | Regular expression method returning the index of a match; called by `String.prototype.search` |
| `Symbol.species` | Function-valued property: the constructor used to create derived objects |
| `Symbol.split` | Regular expression method that splits a string at matching indices; called by `String.prototype.split` |
| `Symbol.toPrimitive` | Method that converts an object to a primitive value; called by the `ToPrimitive` abstract operation |
| `Symbol.toStringTag` | String used in the default string description of an object; called by `Object.prototype.toString` |
| `Symbol.unscopables` | Object whose own property names are excluded from the `with` environment bindings of the associated object |

## Notes

- `unique symbol` is a subtype of `symbol`, produced only by `Symbol()` / `Symbol.for()` or explicit type annotations. It is only allowed on `const` declarations and `readonly static` properties; reference a specific one with `typeof`. No two `unique symbol` types are assignable or comparable to each other.

```ts
declare const sym1: unique symbol;

// sym2 can only be a constant reference.
let sym2: unique symbol = Symbol();

// Works - refers to a unique symbol, but its identity is tied to 'sym1'.
let sym3: typeof sym1 = sym1;

// Also works.
class C {
  static readonly StaticSymbol: unique symbol = Symbol();
}
```

## Related

- [Iterators and Generators](./iterators-and-generators.md)
