---
source: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html
---

# TypeScript for Java/C# Programmers

Structural typing: an object satisfies an interface by shape, with no declared relationship.

```ts
interface Pointlike {
  x: number;
  y: number;
}
interface Named {
  name: string;
}

function logPoint(point: Pointlike) {
  console.log("x = " + point.x + ", y = " + point.y);
}

function logName(x: Named) {
  console.log("Hello, " + x.name);
}

const obj = {
  x: 0,
  y: 0,
  name: "Origin",
};

logPoint(obj);
logName(obj);

class Empty {}

function fn(arg: Empty) {
  // do something?
}

// No error, but this isn't an 'Empty' ?
fn({ k: 10 });

class Car {
  drive() {
    // hit the gas
  }
}
class Golfer {
  drive() {
    // hit the ball far
  }
}

// No error?
let w: Car = new Golfer();
```

## Notes

- Types are sets of values: `obj` belongs to both the `Pointlike` and `Named` sets, and `string | number` is the union of two sets.
- The type system is structural and erased: nothing at runtime tells that `obj` is `Pointlike`, and `typeof (new Car())` is `"object"`.
- `fn({ k: 10 })` and `let w: Car = new Golfer()` compile because the structures are compatible.
- Free functions and plain data are idiomatic; singletons and static classes are unnecessary.
