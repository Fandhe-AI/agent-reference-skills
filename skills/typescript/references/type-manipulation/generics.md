---
source: https://www.typescriptlang.org/docs/handbook/2/generics.html
---

# Generics

Types which take parameters.

## Signature / Usage

Generics let a component work over a variety of types rather than a single one. A _type variable_ captures the type the user provides, so it can be used later (unlike `any`, no information is lost).

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity<string>("myString"); // explicit type argument
let output2 = identity("myString"); // type argument inference
```

### Working with Generic Type Variables

The compiler enforces that generically typed parameters are treated as if they could be any and all types. `arg.length` on a bare `Type` errors (TS2339); work on arrays of `Type` instead:

```ts
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
// alternatively: arg: Array<Type>
```

### Generic Types

```ts
let myIdentity: <Type>(arg: Type) => Type = identity;
let myIdentity2: <Input>(arg: Input) => Input = identity; // different parameter name is fine
let myIdentity3: { <Type>(arg: Type): Type } = identity; // call signature of object literal type

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

// type parameter on the whole interface
interface GenericIdentityFn2<Type> {
  (arg: Type): Type;
}
let myIdentity4: GenericIdentityFn2<number> = identity;
```

### Generic Classes

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
```

### Generic Constraints

Use `extends` to require that a type has certain capabilities:

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

loggingIdentity({ length: 10, value: 3 }); // OK
// loggingIdentity(3);                      // error TS2345
```

### Using Type Parameters in Generic Constraints

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
// getProperty(x, "m"); // error TS2345
```

### Using Class Types in Generics

Refer to class types by their constructor functions:

```ts
function create<Type>(c: { new (): Type }): Type {
  return new c();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
```

### Generic Parameter Defaults

```ts
declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
  element?: T,
  children?: U
): Container<T, U>;
```

Rules:

- A type parameter is deemed optional if it has a default.
- Required type parameters must not follow optional type parameters.
- Default types for a type parameter must satisfy the constraint for the type parameter, if it exists.
- When specifying type arguments, you are only required to specify type arguments for the required type parameters. Unspecified type parameters will resolve to their default types.
- If a default type is specified and inference cannot choose a candidate, the default type is inferred.
- A class or interface declaration that merges with an existing class or interface declaration may introduce a default for an existing type parameter.
- A class or interface declaration that merges with an existing class or interface declaration may introduce a new type parameter as long as it specifies a default.

### Variance Annotations

An advanced feature; TypeScript automatically infers the variance of every generic type. In extremely rare cases involving certain kinds of circular types the measurement can be inaccurate, and an annotation can force a particular variance:

```ts
// Contravariant annotation
interface Consumer<in T> {
  consume: (arg: T) => void;
}

// Covariant annotation
interface Producer<out T> {
  make(): T;
}

// Invariant annotation
interface ProducerConsumer<in out T> {
  consume: (arg: T) => void;
  make(): T;
}
```

## Notes

- It is not possible to create generic enums and namespaces.
- Generic classes are only generic over their instance side, not their static side; static members cannot use the class's type parameter.
- Variance annotations are only in effect during an instantiation-based comparison, not a structural comparison. Never write a variance annotation that does not match the structural variance; they are checked (e.g. `interface Foo<out T> { consume: (arg: T) => void }` errors), but may be stricter than the actual variance (`in out` is valid if the actual variance is covariant). Remove them after "type debugging".
- Whether TypeScript uses instantiation-based or structural comparison is not a specified behavior and may change between versions.
- The `createInstance` class-types pattern is used to power the mixins design pattern.

## Related

- [Keyof Type Operator](./keyof-type-operator.md)
- [Conditional Types](./conditional-types.md)
- [Mapped Types](./mapped-types.md)
