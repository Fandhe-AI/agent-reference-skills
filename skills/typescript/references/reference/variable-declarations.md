---
source: https://www.typescriptlang.org/docs/handbook/variable-declarations.html
---

# Variable Declarations

`var`, `let`, `const`, destructuring, spread, and `using` / `await using` declarations, and how TypeScript treats them.

## Signature / Usage

```ts
let hello = "Hello!";
const numLivesForCat = 9;
let [first, ...rest] = [1, 2, 3, 4];
let { a, b } = { a: "foo", b: 12 };
```

## Notes

- `var` is function-scoped (also module / namespace / global scope), allows redeclaration, and captures variables by reference (loop-closure quirk with `setTimeout`).
- `let` is block-scoped; reading before declaration is in the temporal dead zone (TypeScript reports it). Capturing a block-scoped variable before its declaration is allowed, but calling the function before the declaration is illegal (when targeting ES2015 a runtime throws; TypeScript does not currently report it). Redeclaration in the same scope is an error; a `let` in a loop creates a new scope per iteration.

```ts
for (let i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100 * i);
}
```

- `const` prevents re-assignment but not mutation of the referenced object; use `readonly` for members. Use `const` for everything you do not plan to modify (principle of least privilege).
- Array destructuring (including swap, parameters, rest `...`, skipping elements), tuple destructuring (error beyond tuple range; `...` yields a shorter tuple), object destructuring (rest, renaming `{ a: newName1 }`, default values). The colon in renaming does not indicate a type.

```ts
let { a: newName1, b: newName2 }: { a: string; b: number } = o;

function f({ a, b = 0 } = { a: "" }): void {
  // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to { a: "" }, which then defaults b = 0
f({}); // error, 'a' is required if you supply an argument
```

- Spread: shallow copy; later properties overwrite earlier ones in object spread. Object spread includes only own enumerable properties (methods of class instances are lost). The compiler does not allow spreads of type parameters from generic functions.

```ts
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
```

- `using` (Stage 3 Explicit Resource Management): like `const`, but calls `[Symbol.dispose]()` when the block exits; the value may be `null` / `undefined` (nothing disposed); no destructuring. Implement the `Disposable` interface.

```ts
function f() {
  using x = new C();
  doSomethingWith(x);
} // `x[Symbol.dispose]()` is called
```

- `await using`: awaits `[Symbol.asyncDispose]()` at block exit; only in an `async` function / method or at module top level; the `await` applies to disposal, not to the value. Implement `AsyncDisposable`. Await returned promises (`return await g();`) to avoid unhandled-rejection reports.

```ts
async function f() {
  await using x = new C();
} // `await x[Symbol.asyncDispose]()` is invoked
```

- `using` / `await using` work in `for` and `for..of` statements (in `for..of` the value is disposed at the end of each iteration) and when targeting older ECMAScript editions with a compatible polyfill for `Symbol.dispose` / `Symbol.asyncDispose` (such as the one provided in recent NodeJS).

## Related

- [Symbols](./symbols.md)
- [Iterators and Generators](./iterators-and-generators.md)
