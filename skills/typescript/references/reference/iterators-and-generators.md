---
source: https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html
---

# Iterators and Generators

An object is iterable if it implements the `Symbol.iterator` property. `Iterable` types are consumed with `for..of`.

## Signature / Usage

```ts
function toArray<X>(xs: Iterable<X>): X[] {
  return [...xs]
}
```

## Notes

- Built-in types such as `Array`, `Map`, `Set`, `String`, `Int32Array`, `Uint32Array` already implement `Symbol.iterator`.
- `for..in` returns a list of keys; `for..of` returns the values of the numeric properties of the iterated object. `for..in` operates on any object; `for..of` is mainly interested in values of iterable objects.

```ts
let list = [4, 5, 6];

for (let i in list) {
  console.log(i); // "0", "1", "2",
}

for (let i of list) {
  console.log(i); // 4, 5, 6
}
```

- Targeting ES5: iterators are only allowed on values of `Array` type; `for..of` on a non-Array value is an error even if it implements `Symbol.iterator`. The compiler generates a simple `for` loop:

```js
var numbers = [1, 2, 3];
for (var _i = 0; _i < numbers.length; _i++) {
  var num = numbers[_i];
  console.log(num);
}
```

- Targeting ECMAScript 2015 and higher: the compiler generates `for..of` loops that target the engine's built-in iterator implementation.
- Deprecated (6.0) / Removed (7.0): `target: es5` and `downlevelIteration` (the ES5 section above) are deprecated in 6.0 and no longer supported in 7.0 (6.0 release notes, 7.0 announcement).

## Related

- [Symbols](./symbols.md)
