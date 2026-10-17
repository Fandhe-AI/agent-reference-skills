---
source: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html
---

# TypeScript for Functional Programmers

Discriminated unions, unit types, contextual typing, and readonly data as the closest equivalents to Haskell / ML constructs.

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

function area(s: Shape) {
  if (s.kind === "circle") {
    return Math.PI * s.radius * s.radius;
  } else if (s.kind === "square") {
    return s.x * s.x;
  } else {
    return (s.x * s.y) / 2;
  }
}

function height(s: Shape) {
  if (s.kind === "circle") {
    return 2 * s.radius;
  } else {
    // s.kind: "square" | "triangle"
    return s.x;
  }
}

declare function pad(s: string, n: number, direction: "left" | "right"): string;
let s: "left" | "right" = "right";
pad("hi", 10, s);

declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];
let sns = map((n) => n.toString(), [1, 2, 3]);

function firstish<T extends { length: number }>(t1: T, t2: T): T {
  return t1.length > t2.length ? t1 : t2;
}

let a = [1, 2, 3] as const;
let b: readonly number[] = [1, 2, 3];
```

## Notes

- Unions are untagged; the discriminant is an ordinary property whose type is a unit type (`kind: "circle"`).
- `area` is inferred to return `number` because the function is total; an uncovered variant makes it `number | undefined`.
- `let s = "right"; pad("hi", 10, s)` is an error because `s` widens to `string`; annotate `s` as `"left" | "right"`.
- `a.push(102)` and `a[0] = 101` are errors on `as const` and `readonly` arrays; none of these options are the default.
- TypeScript has no higher-kinded types, so `function length<T extends ArrayLike<unknown>, U>(m: T<U>) {}` is not legal.
