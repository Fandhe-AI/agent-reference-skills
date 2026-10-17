---
source: https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
---

# Keyof Type Operator

Using the `keyof` operator in type contexts.

## Signature / Usage

The `keyof` operator takes an object type and produces a string or numeric literal union of its keys.

```ts
type Point = { x: number; y: number };
type P = keyof Point; // "x" | "y"
```

If the type has a `string` or `number` index signature, `keyof` returns those types instead:

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // string | number
```

## Notes

- `M` is `string | number` because JavaScript object keys are always coerced to a string, so `obj[0]` is always the same as `obj["0"]`.
- `keyof` types become especially useful when combined with mapped types.

## Related

- [Mapped Types](./mapped-types.md)
- [Indexed Access Types](./indexed-access-types.md)
- [Typeof Type Operator](./typeof-type-operator.md)
