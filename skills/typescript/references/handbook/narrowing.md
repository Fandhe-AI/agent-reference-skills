---
source: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
---

# Narrowing

How TypeScript refines a declared type to a more specific type using control flow analysis and type guards.

## Signature / Usage

```ts
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```

## Notes

Narrowing constructs TypeScript understands:

- `typeof` type guards: results `"string"`, `"number"`, `"bigint"`, `"boolean"`, `"symbol"`, `"undefined"`, `"object"`, `"function"`. `typeof null` is `"object"`, so `typeof strs === "object"` narrows `string | string[] | null` only to `string[] | null`.
- Truthiness narrowing: `0`, `NaN`, `""`, `0n`, `null`, `undefined` coerce to `false`. `Boolean("hello")` has type `boolean`; `!!"world"` has literal type `true`. Wrapping a whole body in `if (strs)` can mishandle the empty string.
- Equality narrowing: `===`, `!==`, `==`, `!=` and `switch`. `x != null` removes both `null` and `undefined`.
- The `in` operator: `"swim" in animal` narrows the true branch to types with (optional or required) `swim`, the false branch to types with optional or missing `swim`; optional properties appear on both sides.
- `instanceof` narrowing (prototype-chain check).
- Assignments narrow the observed type, but assignability is checked against the declared type.
- Control flow analysis: reachability (early `return`) narrows the rest of the function.
- User-defined type guards with type predicates `parameterName is Type`; classes can use `this is Type`. Assertion functions also narrow (TypeScript 3.7).
- Discriminated unions: a union whose members share a literal-typed property (`kind`) narrows via `if` or `switch`.
- `never` represents a state that should not exist; assigning to `never` in `default` gives exhaustiveness checking.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

interface Circle { kind: "circle"; radius: number }
interface Square { kind: "square"; sideLength: number }
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

- Runtime schema validation with inferred static types (`z.infer`) is the separate zod skill; narrowing here is purely compile-time.
- Adding a new member (e.g. `Triangle`) to `Shape` makes the `never` assignment in `default` a compile error (2322).
- `zoo.filter(isFish)` yields `Fish[]`; for more complex predicates the predicate may need repeating: `zoo.filter((pet): pet is Fish => ...)`.

## Related

- [Everyday Types](./everyday-types.md)
- [Object Types](./object-types.md)
- [Classes](./classes.md)
