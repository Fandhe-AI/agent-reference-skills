---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html
---

# Do's and Don'ts

Recommendations for writing d.ts files: common mistakes and their fixes.

## Signature / Usage

```ts
/* WRONG */
function reverse(s: String): String;

/* OK */
function reverse(s: string): string;
```

Overload ordering (TypeScript chooses the first matching overload; put specific before general):

```ts
/* OK */
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: unknown): unknown;
```

Optional parameters instead of trailing-parameter overloads:

```ts
/* OK */
interface Example {
  diff(one: string, two?: string, three?: boolean): number;
}
```

Union types instead of overloads that differ in one argument position:

```ts
/* OK */
interface Moment {
  utcOffset(): number;
  utcOffset(b: number | string): Moment;
}
```

## Notes

- General types: do not use `Number`, `String`, `Boolean`, `Symbol`, or `Object` (non-primitive boxed objects); use `number`, `string`, `boolean`, `symbol`, and the non-primitive `object` instead of `Object`.
- Do not have a generic type which does not use its type parameter.
- Do not use `any` unless migrating a JavaScript project; it effectively turns off type checking for that thing. Use `unknown` when accepting anything that is passed through blindly.
- Callback return types: use `void`, not `any`, for callbacks whose value is ignored. `void` prevents using the return value in an unchecked way.

```ts
/* OK */
function fn(x: () => void) {
  x();
}
```

- Optional parameters in callbacks: do not use them unless you really mean it (it means the callback might be invoked with 1 or 2 arguments). It is always legal to provide a callback that accepts fewer arguments.

```ts
/* OK */
interface Fetcher {
  getObject(done: (data: unknown, elapsedTime: number) => void): void;
}
```

- Overloads and callbacks: do not write separate overloads that differ only on callback arity; write a single overload using the maximum arity.

```ts
/* OK */
declare function beforeAll(
  action: (done: DoneFn) => void,
  timeout?: number
): void;
```

- Overload ordering: do not put more general overloads before more specific ones; the later one becomes hidden and cannot be called.
- Use optional parameters whenever possible instead of several overloads differing only in trailing parameters; collapse only when all overloads have the same return type. Reasons: signature compatibility allows extraneous arguments, and under strict null checking it is fine to pass an explicit `undefined` to an optional parameter.
- Use union types whenever possible instead of overloads that differ by type in only one argument position. `b` is not made optional in the example because the return types differ. This helps consumers who pass a value through to the function.

## Related

- [Declaration Reference (By Example)](./by-example.md)
- [Deep Dive](./deep-dive.md)
