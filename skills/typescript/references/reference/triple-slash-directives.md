---
source: https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html
---

# Triple-Slash Directives

Single-line comments containing a single XML tag, used as compiler directives. Only valid at the top of their containing file (preceded only by single or multi-line comments, including other triple-slash directives); after a statement or declaration they are regular comments.

## Signature / Usage

```ts
/// <reference lib="es2017.string" />

"foo".padStart(4);
```

## Options / Props

| Directive | Description |
| --- | --- |
| `/// <reference path="..." />` | Declares a dependency between files; includes additional files in the compilation and orders output with `out` / `outFile` |
| `/// <reference types="..." />` | Declares a dependency on a package (like an `import` for declaration packages), e.g. `/// <reference types="node" />` for `@types/node/index.d.ts` |
| `/// <reference lib="..." />` | Explicitly includes a built-in lib file, named as in the `lib` compiler option (`lib="es2015"`, not `lib="lib.es2015.d.ts"`) |
| `/// <reference no-default-lib="true"/>` | Marks a file as a default library; like passing `noLib`; with `skipDefaultLibCheck` the compiler skips checking files with this directive |
| `/// <amd-module />` | Passes an optional module name (`name="NamedModule"`) for AMD `define` output |
| `/// <amd-dependency />` | Deprecated; injects a non-TS module dependency (optional `name`) into the require call; use `import "moduleName";` instead |
| `preserve="true"` | Attribute that prevents the compiler from removing the directive from output |

## Notes

- As of TypeScript 5.5, the compiler does not generate reference directives and does not emit handwritten triple-slash directives to output unless marked `preserve="true"`.

```ts
/// <reference path="..." preserve="true" />
/// <reference types="..." preserve="true" />
/// <reference lib="..." preserve="true" />
```

- `reference path`: resolved relative to the containing file; root files (command line or `files`) are preprocessed in order, references depth-first in the order seen. Referencing a non-existent file, or a file referencing itself, is an error. With `noResolve`, references are ignored.
- `reference types`: for a dependency on an `@types` package in a `.ts` file, use `types` in the command line or `tsconfig.json` instead.
- `reference lib`: recommended for declaration file authors relying on built-in types (DOM APIs, `Symbol`, `Iterable`); equivalent to compiling with `--lib es2017.string`.
- `amd-module` example:

```ts
/// <amd-module name="NamedModule"/>
export class C {}
```

- Deprecated (6.0) / Removed (7.0): `/// <reference no-default-lib="true"/>` is no longer supported in 6.0 (use `--noLib` or `--libReplacement`); in 7.0 such directives are no longer respected under `skipDefaultLibCheck` (6.0 release notes, 7.0 announcement).
- Deprecated (6.0) / Removed (7.0): `module: amd`, `umd`, `systemjs` and `none` are deprecated in 6.0, which also drops support for the `amd-module` directive (it will no longer have any effect); 7.0 no longer supports those `module` values (6.0 release notes, 7.0 announcement).
- Deprecated: `/// <amd-dependency />` is deprecated per this page.

## Related

- [Namespaces and Modules](./namespaces-and-modules.md)
- [Namespaces](./namespaces.md)
