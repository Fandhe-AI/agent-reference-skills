---
source: https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html
---

# Namespaces and Modules

How to organize code via modules or namespaces, and common pitfalls of each.

## Signature / Usage

```ts
// shapes.ts
export class Triangle {
  /* ... */
}
export class Square {
  /* ... */
}

// shapeConsumer.ts
import * as shapes from "./shapes";
let t = new shapes.Triangle();
```

## Notes

- Modules can contain code and declarations, depend on a module loader (such as CommonJS / Require.js) or a runtime supporting ES Modules, and provide better code reuse, stronger isolation and better bundling tooling. For Node.js applications modules are the default and modules are recommended over namespaces in modern code.
- Namespaces are a TypeScript-specific way to organize code: named JavaScript objects in the global namespace. Unlike modules they can span multiple files and be concatenated with `outFile`; useful for web applications whose dependencies are included as `<script>` tags. Dependencies can be hard to identify in a large application.
- Pitfall — `/// <reference>`-ing a module: use `import`, not a reference tag, to refer to a module file. The compiler looks for `.ts`, `.tsx`, then `.d.ts` at the import path, then an ambient module declaration (which must be in a `.d.ts` file).

```ts
// In a .d.ts file or .ts file that is not a module:
declare module "SomeModule" {
  export function fn(): string;
}
```

- Pitfall — needless namespacing: a top-level `export namespace Shapes { ... }` wrapping a module's exports forces `shapes.Shapes.Triangle`. Two different modules never contribute names to the same scope; the consumer names the module, so do not wrap exports in a namespace.
- Trade-offs of modules: one-to-one correspondence between module source files and emitted JS files, so you cannot concatenate module source files depending on the module system targeted (e.g. `outFile` with `commonjs` or `umd`; possible with `amd` or `system` since TypeScript 1.8).
- Deprecated (6.0) / Removed (6.0 / 7.0): `outFile` was removed in 6.0 (6.0 release notes). `module: amd`, `umd`, `systemjs` and `none` are deprecated in 6.0 and no longer supported in 7.0 (7.0 announcement). The page's `outFile` remarks therefore apply to 5.x and earlier.

## Related

- [Namespaces](./namespaces.md)
- [Declaration Merging](./declaration-merging.md)
- [Triple-Slash Directives](./triple-slash-directives.md)
