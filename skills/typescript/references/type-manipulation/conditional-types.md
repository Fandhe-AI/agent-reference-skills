---
source: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
---

# Conditional Types

Create types which act like if statements in the type system.

## Signature / Usage

Conditional types look like JavaScript conditional expressions. When the type on the left of `extends` is assignable to the one on the right you get the first ("true") branch; otherwise the second ("false") branch.

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string; // number
type Example2 = RegExp extends Animal ? number : string; // string

type SomeType = any;
type OtherType = any;
type TrueType = any;
type FalseType = any;
type Stuff = SomeType extends OtherType ? TrueType : FalseType;
```

Their power comes from combining with generics, replacing overloads:

```ts
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}
```

### Conditional Type Constraints

In the true branch, the generic is further constrained by the type checked against:

```ts
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

type Flatten<T> = T extends any[] ? T[number] : T;
```

### Inferring Within Conditional Types

The `infer` keyword declaratively introduces a new type variable in the true branch:

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num = GetReturnType<() => number>; // number
```

### Distributive Conditional Types

When a conditional type acts on a generic type given a union, it distributes over each union member:

```ts
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]
```

To avoid distribution, surround each side of `extends` with square brackets:

```ts
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
// 'ArrOfStrOrNum' is no longer a union.
type ArrOfStrOrNum = ToArrayNonDist<string | number>; // (string | number)[]
```

## Notes

- When inferring from a type with multiple call signatures (e.g. an overloaded function), inferences are made from the _last_ signature. Overload resolution based on a list of argument types is not possible.
- Distributivity is typically the desired behavior.

## Related

- [Indexed Access Types](./indexed-access-types.md)
- [Mapped Types](./mapped-types.md)
- [Utility Types](./utility-types.md)
- [Generics](./generics.md)
