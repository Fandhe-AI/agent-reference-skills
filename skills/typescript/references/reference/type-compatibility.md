---
source: https://www.typescriptlang.org/docs/handbook/type-compatibility.html
---

# Type Compatibility

Type compatibility in TypeScript is based on structural subtyping: types are related solely by their members, in contrast to nominal typing.

## Signature / Usage

```ts
interface Pet {
  name: string;
}

class Dog {
  name: string;
}

let pet: Pet;
// OK, because of structural typing
pet = new Dog();
```

## Options / Props

| From \ To | any | unknown | object | void | undefined | null | never |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| any | | yes | yes | yes | yes | yes | no |
| unknown | yes | | no | no | no | no | no |
| object | yes | yes | | no | no | no | no |
| void | yes | yes | no | | no | no | no |
| undefined | yes | yes | strictNullChecks off | yes | | strictNullChecks off | no |
| null | yes | yes | strictNullChecks off | strictNullChecks off | strictNullChecks off | | no |
| never | yes | yes | yes | yes | yes | yes | |

## Notes

- The table above covers assignability between `any`, `unknown`, `object`, `void`, `undefined`, `null`, `never` (row is assignable to column; "strictNullChecks off" means compatible only when `strictNullChecks` is off).
- `x` is compatible with `y` if `y` has at least the same members as `x`; only members of the target type are considered, recursively. Object literals may only specify known properties (excess property checks).

```ts
let dog: Pet = { name: "Lassie", owner: "Rudd Weatherwax" }; // Error
```

- TypeScript's type system is not "sound": it allows some operations that cannot be known safe at compile time (function parameter bivariance, optional / rest parameters).
- Functions: parameter names are not considered, only types; the source may have fewer parameters. The source return type must be a subtype of the target return type.

```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

- Function parameter bivariance: assignment succeeds if either the source parameter is assignable to the target parameter, or vice versa; `strictFunctionTypes` raises errors for this.
- Optional and required parameters are interchangeable; a rest parameter is treated as an infinite series of optional parameters. With overloads, each target overload must be matched by a compatible source signature.
- Enums are compatible with numbers and vice versa; values from different enum types are incompatible. Changed (5.0): assigning a numeric literal outside the enum's domain is an error (see TypeScript 5.0 version notes).
- Classes: only instance members are compared; static members and constructors do not affect compatibility. A private / protected member in the target requires the source to have a member originating from the same class.

```ts
class Animal {
  feet: number;
  constructor(name: string, numFeet: number) {}
}

class Size {
  feet: number;
  constructor(numFeet: number) {}
}

let a: Animal;
let s: Size;

a = s; // OK
s = a; // OK
```

- Generics: type parameters only affect the resulting type when used in a member; unspecified type arguments are compared as `any`.

```ts
interface NotEmpty<T> {
  data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y; // Error, because x and y are not compatible
```

- Two kinds of compatibility exist: subtype and assignment. Assignment extends subtype compatibility with rules for `any` and for `enum` with corresponding numeric values; practical compatibility, including `implements` / `extends`, is dictated by assignment compatibility.
- With `strictNullChecks` on, `null` and `undefined` are not assignable to other types except `any`, `unknown`, and (for `undefined`) `void`; only `any` and `never` are assignable to them. The handbook prose summarizes this as "to or from anything except `any`, `unknown`, and `void`", which is directional shorthand; the assignability table is authoritative. `unknown` is assignable only to `any`; `never` is assignable to everything and nothing is assignable to `never`.

## Related

- [Enums](./enums.md)
- [Type Inference](./type-inference.md)
