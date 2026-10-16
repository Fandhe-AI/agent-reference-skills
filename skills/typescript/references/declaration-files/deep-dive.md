---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/deep-dive.html
---

# Deep Dive

Declaration file theory: how types, values, and namespaces combine so a module can expose exactly the API shape wanted. Focuses on module (or UMD) libraries.

## Signature / Usage

One name used as both a value and a type:

```ts
export var Bar: { a: Bar };
export interface Bar {
  count: number;
}
```

Consumed with:

```ts
import { Bar } from "./foo";
let x: Bar = Bar.a;
console.log(x.count);
```

Adding a static member and a namespaced type to a class via `namespace`:

```ts
class C {}
// ... elsewhere ...
namespace C {
  export let x: number;
}
let y = C.x; // OK
```

```ts
class C {}
// ... elsewhere ...
namespace C {
  export interface D {}
}
let y: C.D; // OK
```

## Notes

- A type is introduced by: a type alias declaration, an interface declaration, a class declaration, an enum declaration, or an `import` declaration which refers to a type.
- A value (runtime name usable in expressions) is created by: `let`/`const`/`var`, a `namespace` or `module` declaration which contains a value, an `enum`, a `class`, an `import` which refers to a value, or a `function`.
- Types can exist in namespaces: in `let x: A.B.C`, type `C` comes from the `A.B` namespace; `A.B` is not necessarily a type or a value.
- A name `A` can have up to three meanings (type, value, namespace), interpreted by context; in `let m: A.A = A;`, `A` is used first as a namespace, then as a type name, then as a value.
- Built-in combinations: `class C { }` creates a type `C` (instance shape) and a value `C` (constructor function). Enums behave similarly.
- Advanced combinations: `class C { }` and `interface C { }` can co-exist and both contribute properties, as long as there is no conflict. Rule of thumb: values always conflict with other values of the same name unless declared as `namespace`s; types conflict if declared with a type alias declaration (`type s = string`); namespaces never conflict.
- An interface can add members to another interface or to a class, but cannot add to type aliases.
- A `namespace` declaration can add new types, values, and namespaces in any way which does not create a conflict. An added value goes on the static side of the class (the container for all values is another value; types are contained by namespaces, and namespaces by other namespaces).
- Merge example from the source: `namespace X { export interface Y {} export class Z {} }` plus, elsewhere, `namespace X { export var Y: number; export namespace Z { export class C {} } }` and `type X = string;` produce the combinations of type/value/namespace meanings listed on the official page.

## Related

- [Declaration Reference (By Example)](./by-example.md)
- [Template: module.d.ts](./template-module.md)
- [Do's and Don'ts](./dos-and-donts.md)
