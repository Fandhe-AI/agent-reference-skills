---
source: https://www.typescriptlang.org/docs/handbook/2/objects.html
---

# Object Types

How TypeScript describes the shapes of JavaScript objects: property modifiers, index signatures, excess property checks, extending, intersections, generic object types, arrays, tuples.

## Signature / Usage

```ts
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

interface SomeType {
  readonly prop: string;
}

interface StringArray {
  [index: number]: string;
}

interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
interface ColorfulCircle extends Colorful, Circle {}
type ColorfulCircle2 = Colorful & Circle;

interface Box<Type> {
  contents: Type;
}

type StringNumberPair = [string, number];
type StringNumberBooleans = [string, number, ...boolean[]];
```

## Notes

- Object types can be anonymous, an `interface`, or a `type` alias.
- Optional properties (`xPos?: number`) read as `number | undefined` under `strictNullChecks`; destructuring defaults (`{ shape, xPos = 0, yPos = 0 }: PaintOptions`) supply values. Type annotations cannot be placed inside destructuring patterns (`shape: Shape` renames the variable).
- `readonly` properties cannot be written but are not deeply immutable and are not considered in assignability, so aliasing can still change them. Mapping modifiers can remove `readonly`.
- Index signatures: allowed key types are `string`, `number`, `symbol`, template string patterns, and unions of these. With both `number` and `string` indexers, the number indexer's type must be a subtype of the string indexer's type. A string index signature forces all properties to match its type unless it is a union of the property types. Index signatures can be `readonly`.
- Excess property checks apply to object literals assigned or passed as arguments. Work-arounds: a type assertion (`as SquareConfig`), adding `[propName: string]: unknown`, or assigning the literal to a variable first (works only when at least one property is shared). Most excess property errors are bugs.
- `interface A extends B, C` copies members; `&` intersections combine object types. Conflict handling differs: incompatible same-name properties across merged interfaces are an error, whereas an intersection compiles and the property becomes `never`.
- Generic object types (`Box<Type>`) avoid per-type duplicates and overloads; type aliases can also be generic (`OrNull<Type>`, `OneOrMany<Type>`).
- `Array<Type>` is generic; `number[]` is shorthand. `ReadonlyArray<Type>` / `readonly Type[]` has no constructor, regular arrays are assignable to it but not the reverse.
- Tuples: fixed length and per-position types; optional elements (`[number, number, number?]`) only at the end; rest elements (`[string, ...boolean[]]`); `readonly [string, number]`. `as const` array literals infer `readonly` tuples, which are not assignable to mutable tuple parameters.
- Tuple rest elements correspond to parameter lists: `(...args: [string, number, ...boolean[]])` is basically equivalent to `(name: string, version: number, ...input: boolean[])`.

## Related

- [Everyday Types](./everyday-types.md)
- [More on Functions](./more-on-functions.md)
- [Classes](./classes.md)
