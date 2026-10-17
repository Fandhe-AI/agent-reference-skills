---
source: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
---

# TypeScript for JavaScript Programmers

Describe an object shape with an `interface`, check it structurally, and use unions and generics.

```ts
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);

type WindowStates = "open" | "closed" | "minimized";

function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
  }
  return obj;
}

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare const backpack: Backpack<string>;
const object = backpack.get();

interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
```

## Notes

- Types are inferred from values (`let helloWorld = "Hello World"` is `string`); annotate only where inference is not enough.
- Structural typing: `logPoint` accepts any value that has numeric `x` and `y`, including extra properties and class instances. `logPoint({ hex: "#187ABF" })` is an error (TS2345).
- `backpack.add(23)` is an error (TS2345) because `Backpack<string>` fixes the type parameter.
- The source recommends preferring `interface` and using `type` when specific features are needed.
