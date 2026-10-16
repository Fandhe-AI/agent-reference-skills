---
source: https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html
---

# Declaration Reference (By Example)

How to write a declaration for common API patterns, given documentation and sample usage of the API. Examples are ordered in approximately increasing complexity.

## Signature / Usage

Objects with properties: use `declare namespace` to describe types or values accessed by dotted notation.

```ts
declare namespace myLib {
  function makeGreeting(s: string): string;
  let numberOfGreetings: number;
}
```

Overloaded functions:

```ts
declare function getWidget(n: number): Widget;
declare function getWidget(s: string): Widget[];
```

Reusable types (interfaces): use an `interface` to define a type with properties.

```ts
interface GreetingSettings {
  greeting: string;
  duration?: number;
  color?: string;
}

declare function greet(setting: GreetingSettings): void;
```

Reusable types (type aliases):

```ts
type GreetingLike = string | (() => string) | MyGreeter;

declare function greet(g: GreetingLike): void;
```

Organizing types: use namespaces.

```ts
declare namespace GreetingLib {
  interface LogOptions {
    verbose?: boolean;
  }
  interface AlertOptions {
    modal: boolean;
    title?: string;
    color?: string;
  }
}
```

Nested namespaces in one declaration:

```ts
declare namespace GreetingLib.Options {
  // Refer to via GreetingLib.Options.Log
  interface Log {
    verbose?: boolean;
  }
  interface Alert {
    modal: boolean;
    title?: string;
    color?: string;
  }
}
```

Classes: use `declare class` to describe a class or class-like object (properties, methods, constructor).

```ts
declare class Greeter {
  constructor(greeting: string);

  greeting: string;
  showGreeting(): void;
}
```

Global variables: use `declare var`; for read-only use `declare const`; for block-scoped use `declare let`.

```ts
/** The number of widgets present */
declare var foo: number;
```

Global functions: use `declare function`.

```ts
declare function greet(greeting: string): void;
```

## Related

- [Library Structures](./library-structures.md)
- [Deep Dive](./deep-dive.md)
- [Do's and Don'ts](./dos-and-donts.md)
