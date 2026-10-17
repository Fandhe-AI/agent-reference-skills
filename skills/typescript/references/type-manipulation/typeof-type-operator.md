---
source: https://www.typescriptlang.org/docs/handbook/2/typeof-types.html
---

# Typeof Type Operator

Using the `typeof` operator in type contexts.

## Signature / Usage

JavaScript has a `typeof` operator for _expression_ contexts. TypeScript adds a `typeof` operator for _type_ contexts to refer to the _type_ of a variable or property:

```ts
let s = "hello";
let n: typeof s; // string
```

Combined with `ReturnType<T>` (takes a function type and produces its return type). `ReturnType<f>` on a function name errors, because values and types are not the same thing; use `typeof`:

```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>; // { x: number; y: number }
```

## Notes

- Limitations: it is only legal to use `typeof` on identifiers (variable names) or their properties. This avoids writing code you think is executing but isn't:

```ts
declare const msgbox: (prompt: string) => boolean;
// Meant to use = ReturnType<typeof msgbox>
let shouldContinue: typeof msgbox("Are you sure you want to continue?"); // error TS1005
```

## Related

- [Utility Types](./utility-types.md)
- [Indexed Access Types](./indexed-access-types.md)
- [Keyof Type Operator](./keyof-type-operator.md)
