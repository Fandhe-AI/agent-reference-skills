---
source: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
---

# Mapped Types

Generating types by re-using an existing type.

## Signature / Usage

A mapped type is a generic type which uses a union of `PropertyKey`s (frequently created via `keyof`) to iterate through keys to create a type. It builds on index signature syntax.

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>;
// { darkMode: boolean; newUserProfile: boolean }
```

### Mapping Modifiers

`readonly` and `?` can be added or removed by prefixing with `+` or `-` (no prefix means `+`).

```ts
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
```

### Key Remapping via `as`

In TypeScript 4.1 and onwards, keys can be re-mapped with an `as` clause:

```ts
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

// Remove the 'kind' property (filter keys by producing never)
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

// Map over arbitrary unions
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}
```

### With conditional types

```ts
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
```

## Notes

- `Getters<Person>` with `name: string; age: number; location: string` yields `getName`, `getAge`, `getLocation` as `() => ...` members.
- You can map over arbitrary unions, not just unions of `string | number | symbol`.

## Related

- [Keyof Type Operator](./keyof-type-operator.md)
- [Conditional Types](./conditional-types.md)
- [Template Literal Types](./template-literal-types.md)
- [Utility Types](./utility-types.md)
