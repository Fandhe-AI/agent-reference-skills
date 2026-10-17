---
source: https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
---

# Creating Types from Types

An overview of the ways in which you can create more types from existing types.

## Signature / Usage

TypeScript's type system allows expressing types _in terms of other types_ (and in terms of existing _values_). The simplest form is generics; a wide variety of type operators are also available.

```ts
// generics: types which take parameters
type Box<Type> = { contents: Type };
// keyof / typeof / indexed access / conditional / mapped / template literal
type P = keyof { x: number; y: number };
```

## Notes

- Sections covered: Generics (types which take parameters), Keyof Type Operator, Typeof Type Operator, Indexed Access Types (`Type['a']` syntax to access a subset of a type), Conditional Types (types which act like if statements), Mapped Types (map each property in an existing type), Template Literal Types (mapped types which change properties via template literal strings).
- Combining type operators lets you express complex operations and values in a succinct, maintainable way.

## Related

- [Generics](./generics.md)
- [Keyof Type Operator](./keyof-type-operator.md)
- [Typeof Type Operator](./typeof-type-operator.md)
- [Indexed Access Types](./indexed-access-types.md)
- [Conditional Types](./conditional-types.md)
- [Mapped Types](./mapped-types.md)
- [Template Literal Types](./template-literal-types.md)
- [Utility Types](./utility-types.md)
