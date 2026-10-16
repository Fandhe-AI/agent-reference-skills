---
source: https://www.typescriptlang.org/docs/handbook/2/classes.html
---

# Classes

How classes work in TypeScript: members, heritage, visibility, static members, generics, `this`, parameter properties, abstract classes and structural relationships.

## Signature / Usage

```ts
interface Pingable {
  ping(): void;
}

abstract class Base {
  abstract getName(): string;
  printName() {
    console.log("Hello, " + this.getName());
  }
}

class Derived extends Base implements Pingable {
  readonly id: number = 1;
  name!: string;
  static count = 0;
  #secret = 0;

  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    super();
  }

  getName() {
    return "world";
  }
  ping() {
    console.log("ping!");
  }
}
```

## Notes

- Fields: a declaration creates a public writable property; initializers run at instantiation and infer the type. `strictPropertyInitialization` requires initialization in the constructor itself (not in methods it calls); `name!: string` is the definite assignment assertion.
- `readonly` fields can only be assigned in the constructor.
- Constructors can have defaults and overloads, but no type parameters and no return type annotation. Call `super()` before using `this.` in a derived constructor.
- Accessors: `get` without `set` is `readonly`; setter parameter type is inferred from the getter; since TypeScript 4.3 getter and setter may have different types.
- Index signatures work as on other object types, but generally store indexed data elsewhere.
- `implements` only checks that the class is assignable to the interface; it does not change the class type or create optional properties.
- `extends`: derived classes must remain subtypes of the base class. Overriding may use `super.method()`.
- Type-only field declarations: `declare resident: Dog;` emits no JavaScript (relevant when `target >= ES2022` or `useDefineForClassFields` is `true`).
- Initialization order: base fields, base constructor, derived fields, derived constructor.
- Inheriting built-ins (`Error`, `Array`, `Map`) can break `instanceof` and methods when targeting ES5; set the prototype after `super(...)` with `Object.setPrototypeOf(this, MsgError.prototype)`.
- Visibility: `public` (default), `protected` (subclasses only; sibling-class access is not allowed; derived class may widen to public), `private` (not even subclasses; cross-instance access of the same class is allowed). TypeScript visibility is checked only at type check time (bracket notation `s["secretKey"]` is allowed for `private`); JavaScript `#private` fields are hard private (WeakMaps are used when compiling to ES2021 or less).
- `static` members (`private static`, inherited); names like `name`, `length`, `call` cannot be static; no "static class" construct; `static { ... }` blocks can access private fields. Static members cannot reference class type parameters.
- `this` at runtime depends on how a function is called. Arrow-function properties keep `this` (more memory per instance; no `super.getName`). A `this` parameter (`getName(this: MyClass)`) enforces the call context statically.
- `this` types: return type `this`, parameter `other: this`, and `this is Type` guards in return position.
- Parameter properties: constructor parameters prefixed with `public`, `private`, `protected` or `readonly` become fields.
- Class expressions: `const someClass = class<Type> { ... }`. `InstanceType<typeof Point>` models `new`.
- Abstract classes cannot be instantiated; accept constructors with `new () => Base` instead of `typeof Base`.
- Classes are compared structurally; an empty class is a supertype of nearly everything.
- Deprecated (6.0) / Removed (7.0): the source's guidance on inheriting built-ins and on emitting `#private` as WeakMaps targets ES5 / older ES versions; `target: es5` is deprecated in 6.0 and no longer supported in 7.0 (lowest target ES2015). Source: TypeScript 6.0 and 7.0 announcements.
- Default changed (6.0): `target` defaults to the current-year ES version, so `useDefineForClassFields` semantics (ES2022+) apply by default. The relation to `useDefineForClassFields` comes from the source text above; the new default target comes from the 6.0 announcement.

## Related

- [Object Types](./object-types.md)
- [More on Functions](./more-on-functions.md)
- [Narrowing](./narrowing.md)
