---
source: https://www.typescriptlang.org/docs/handbook/2/functions.html
---

# More on Functions

How to write types that describe functions: function type expressions, call and construct signatures, generics, optional and rest parameters, overloads, `this`, and related special types.

## Signature / Usage

```ts
// Function type expression
type GreetFunction = (a: string) => void;

// Call signature with properties
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

// Construct signature
type SomeConstructor = {
  new (s: string): object;
};

// Generic function with a constraint
function longest<Type extends { length: number }>(a: Type, b: Type) {
  return a.length >= b.length ? a : b;
}

// Overloads
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
```

## Notes

- The parameter name is required in a function type: `(string) => void` is a parameter named `string` of type `any`.
- Call signatures use `:` between parameter list and return type; construct signatures add `new`. Both can be combined in one type (e.g. `Date`).
- Generics relate input and output types via type parameters; inference picks them (`firstElement<Type>(arr: Type[]): Type | undefined`). Specify type arguments manually when inference fails: `combine<string | number>(...)`.
- Guidelines: push type parameters down (use `Type[]` rather than `Type extends any[]`), use fewer type parameters, and a type parameter should appear at least twice.
- Optional parameters (`x?: number`) are `number | undefined`; defaults (`x = 10`) give type `number` in the body. Do not write optional parameters in callback types unless the callback is called without that argument.
- Overloads: the implementation signature is not visible from outside and must be compatible with all overloads. Prefer a union-typed parameter over overloads when possible.
- `this` parameter declares the type of `this`; erased in output; requires `function`, not arrow functions.
- Special types: `void` (not the same as `undefined`), `object` (not `Object`), `unknown` (safe `any`), `never`, `Function` (untyped call returning `any`).
- Rest parameters (`...m: number[]`) and spread arguments; use `as const` to make `[8, 5]` a 2-tuple for `Math.atan2(...args)`.
- Parameter destructuring takes the type annotation after the pattern: `function sum({ a, b, c }: { a: number; b: number; c: number })`.
- Assignability: a contextual `() => void` function type may be implemented by a function returning a value (ignored), but a literal function declared with return type `void` must not return a value.
- Deprecated (6.0) / Removed (7.0): the source notes that rest arguments "may require turning on `downlevelIteration` when targeting older runtimes". `downlevelIteration` is deprecated in 6.0 and no longer supported in 7.0 (it only affected ES5 emit, and `target: es5` is gone). Source: TypeScript 6.0 and 7.0 announcements.

## Related

- [Everyday Types](./everyday-types.md)
- [Object Types](./object-types.md)
- [Classes](./classes.md)
