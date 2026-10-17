---
source: https://www.typescriptlang.org/docs/handbook/namespaces.html
---

# Namespaces

Organizing code with `namespace` (formerly "internal modules"). Since TypeScript 1.5, "external modules" are simply "modules"; `module X {` is equivalent to the preferred `namespace X {`.

## Signature / Usage

```ts
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
```

## Notes

- Exported members are visible outside the namespace and must be qualified (`Validation.LettersOnlyValidator`); unexported members are implementation details.
- Multi-file namespaces: files contribute to the same namespace; add reference tags for dependencies.

```ts
/// <reference path="Validation.ts" />
namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
}
```

- To load multiple outputs: concatenate with `outFile` (ordered by reference tags), or use per-file compilation and `<script>` tags in order.

```Shell
tsc --outFile sample.js Test.ts
```

- Aliases: `import q = x.y.z` creates a shorter name; not the same as `import x = require("name")`. For values, the alias is a distinct reference from the original symbol.

```ts
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'
```

- Ambient namespaces describe libraries not written in TypeScript (declarations without implementation, typically in `.d.ts` files):

```ts
declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection;
      (element: EventTarget): Selection;
    };
  }
}

declare var d3: D3.Base;
```

- Deprecated (6.0) / Removed (7.0): using the legacy `module` keyword where `namespace` is expected (`module Foo {}`) is a hard deprecation in 6.0 and not allowed in 7.0; the ambient `declare module "some-module"` form still works (6.0 release notes, 7.0 announcement). The page's terminology note refers to `module X {` as equivalent to `namespace X {`; use `namespace`.
- Removed (6.0): `outFile` (used in this page's multi-file example) has been removed from TypeScript 6.0 (6.0 release notes: use an external bundler).

## Related

- [Namespaces and Modules](./namespaces-and-modules.md)
- [Declaration Merging](./declaration-merging.md)
- [Triple-Slash Directives](./triple-slash-directives.md)
