---
source: https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
---

# Indexed Access Types

Using `Type['a']` syntax to access a subset of a type.

## Signature / Usage

An _indexed access type_ looks up a specific property on another type:

```ts
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // number
```

The indexing type is itself a type, so unions, `keyof`, or other types can be used:

```ts
type I1 = Person["age" | "name"]; // string | number
type I2 = Person[keyof Person]; // string | number | boolean
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; // boolean | string
```

Indexing with `number` gets the element type of an array; combine with `typeof` to capture the element type of an array literal:

```ts
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = typeof MyArray[number];
type Age = typeof MyArray[number]["age"]; // number
// Or
type Age2 = Person["age"];
```

## Notes

- Indexing a property that does not exist is an error (`Person["alve"]`, TS2339).
- Only types can be used when indexing; a `const` variable cannot be used as the index (`const key = "age"; type Age = Person[key];` errors). A type alias works instead:

```ts
type key = "age";
type Age = Person[key];
```

## Related

- [Keyof Type Operator](./keyof-type-operator.md)
- [Typeof Type Operator](./typeof-type-operator.md)
- [Mapped Types](./mapped-types.md)
