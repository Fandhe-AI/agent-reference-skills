---
source: https://www.typescriptlang.org/docs/handbook/2/understanding-errors.html
---

# Understanding Errors

How to read TypeScript errors: the "assignable to" relationship and error elaborations.

## Signature / Usage

```ts
let a: { m: number[] };
let b = { m: [""] };
a = b; // error 2322
```

## Notes

- A type is _assignable to_ another if it is an acceptable substitute (a `Cat` is assignable to an `Animal`). It validates `t = s;` and each argument against its parameter type. The relationship is directional.
- Each error starts with a leading message, optionally followed by sub-messages, each answering "why?" for the message above. For the example above:
  1. Is `b`'s type assignable to `a`'s? No. Why?
  2. Because the type of the `m` property is incompatible. Why?
  3. Because `b`'s `m` (`string[]`) is not assignable to `a`'s `m` (`number[]`). Why?
  4. Because one array's element type (`string`) is not assignable to the other (`number`).
- Further examples in the source: extra properties and union assignments.

```ts
type A = { m: number };
const a: A = { m: 10, n: "" }; // extra property

type Thing = "none" | { name: string };
const t: Thing = { name: 0 }; // union assignment
```

- The source gives no more detail on those two examples than the code and error code 2322.
- Types and error messages are the same in TypeScript 7.0 as in 6.0 (same errors, locations and messages), per the typescript-go README.

## Related

- [Basics](./basics.md)
- [Everyday Types](./everyday-types.md)
- [Object Types](./object-types.md)
