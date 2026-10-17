---
source: https://www.typescriptlang.org/docs/handbook/advanced-types.html
---

# Advanced Types

Legacy page listing advanced ways to model types. Marked deprecated by the source (`deprecated_by: /docs/handbook/2/types-from-types.html`); its sections now live in the handbook-v2 pages (narrowing, everyday types, objects, classes, mapped / conditional / indexed access types) and in Utility Types.

## Signature / Usage

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

## Notes

- Type guards: the `in` operator narrows (true branch: types with optional or required property `n`; false branch: optional or missing). A type predicate has the form `parameterName is Type`. `typeof v === "typename"` / `!==` (`"undefined"`, `"number"`, `"string"`, `"boolean"`, `"bigint"`, `"symbol"`, `"object"`, `"function"`) are recognized inline. `instanceof` narrows to the `prototype` property type (if not `any`), then the union of construct-signature return types.

```ts
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}
```

- Nullable types: with `strictNullChecks`, `null` and `undefined` must be included explicitly in unions; `string | null` differs from `string | undefined`. Optional parameters / properties add `| undefined`. Eliminate with a guard, `??`, or postfix `!` (`user!.email!.length`).
- Type aliases name any type (primitives, unions, tuples), can be generic and self-referencing; interfaces are always extendable while a type cannot be re-opened. The page recommends interfaces where possible and type aliases when a union or tuple is needed.

```ts
type Tree<T> = {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};
```

- Enum member types: members have types when every member is literal-initialized (see Enums).
- Polymorphic `this` types (F-bounded polymorphism, fluent APIs): methods returning `this` keep the subclass type.

```ts
class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
}
```

- Index types: `keyof T` is the union of known public property names; `T[K]` is the indexed access type. With a string index signature `keyof T` is `string | number`; with a number index signature it is `number`.

```ts
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}
```

- Mapped types transform each property of an existing type; homomorphic ones (`Readonly`, `Partial`, `Pick`) copy modifiers, `Record` is not homomorphic. `keyof any` is `string | number | symbol`. Unwrapping inference works only on homomorphic mapped types. Add members with an intersection, not inside the mapped type.

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

- Conditional types `T extends U ? X : Y` are resolved or deferred; distributive over naked type parameters when instantiated with a union (e.g. `Diff`, `Filter`, `NotNullable`); `infer` declares a type variable in the `extends` clause (multiple covariant candidates give a union, contravariant give an intersection; overloads infer from the last signature; `infer` is not allowed in constraint clauses of regular type parameters). The legacy page states that conditional types cannot reference themselves recursively (`type ElementType<T> = T extends any[] ? ElementType<T[number]> : T; // Error`); this restriction was lifted in TypeScript 4.1 (Recursive Conditional Types), so the example is valid in 6.0 / 7.0.

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

- Predefined conditional types are listed in Utility Types.

## Related

- [Type Inference](./type-inference.md)
- [Enums](./enums.md)
