---
source: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
---

# Declaration Merging

The compiler merges two or more separate declarations with the same name into a single definition that has the features of all of them. Covers interface merging, namespace merging, merging namespaces with classes / functions / enums, module augmentation, and global augmentation.

## Signature / Usage

```ts
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

let box: Box = { height: 5, width: 6, scale: 10 };
```

## Options / Props

| Declaration Type | Namespace | Type | Value |
| --- | :---: | :---: | :---: |
| Namespace | X | | X |
| Class | | X | X |
| Enum | | X | X |
| Interface | | X | |
| Type Alias | | X | |
| Function | | | X |
| Variable | | | X |

## Notes

- The table above shows what each declaration creates (namespace, type, value).
- Interface merging: non-function members must be unique, or of the same type (otherwise an error). Function members of the same name become overloads; a later interface has higher precedence, so its overload set is ordered first. Exception: a signature with a parameter of a single string literal type is bubbled to the top of the merged overload list.

```ts
interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}
```

- Namespace merging: exported members are added to the existing namespace. Non-exported members are only visible in the original (un-merged) namespace declaration.

```ts
namespace Animal {
  let haveMuscles = true;

  export function animalsHaveMuscles() {
    return haveMuscles;
  }
}

namespace Animal {
  export function doAnimalsHaveMuscles() {
    return haveMuscles; // Error, because haveMuscles is not accessible here
  }
}
```

- A namespace can merge with a class (inner classes / static members), a function, or an enum, but the namespace declaration must follow the declaration it merges with.

```ts
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}
```

- Disallowed: classes cannot merge with other classes or with variables (see Mixins for mimicking class merging).
- Module augmentation: `declare module "./observable"` patches existing declarations of a module. Limitations: no new top-level declarations (only patches to existing ones), and default exports cannot be augmented (only named exports).

```ts
// map.ts
import { Observable } from "./observable";
declare module "./observable" {
  interface Observable<T> {
    map<U>(f: (x: T) => U): Observable<U>;
  }
}
Observable.prototype.map = function (f) {
  // ... another exercise for the reader
};
```

- Global augmentation: `declare global { ... }` inside a module adds declarations to the global scope, with the same behavior and limits as module augmentation.

```ts
declare global {
  interface Array<T> {
    toObservable(): Observable<T>;
  }
}
```

- Deprecated (6.0) / Removed (7.0): the legacy `module Foo {}` namespace syntax (use `namespace`); the ambient `declare module "some-module" {}` form remains supported (6.0 release notes, 7.0 announcement).

## Related

- [Namespaces](./namespaces.md)
- [Mixins](./mixins.md)
- [Enums](./enums.md)
