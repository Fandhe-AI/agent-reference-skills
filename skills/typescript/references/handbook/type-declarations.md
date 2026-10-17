---
source: https://www.typescriptlang.org/docs/handbook/2/type-declarations.html
---

# Type Declarations

How TypeScript provides types for un-typed JavaScript: `.d.ts` declaration files, built-in `lib.*.d.ts`, bundled types, DefinitelyTyped `@types`, and your own declarations.

## Signature / Usage

```sh
npm install --save-dev @types/react
```

```ts
// Quick-declare an untyped module as `any` in a .d.ts file
declare module "some-untyped-module";
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `target` | compiler option | Varies the default built-in `lib` declaration files |
| `lib` | compiler option | Fine-grained control of which built-in declaration files are available |

## Notes

- `.ts` files are implementation files (types and executable code, produce `.js`); `.d.ts` files contain only type information and produce no output.
- Built-in declarations are named `lib.[something].d.ts` and cover standardized JS APIs plus the DOM (`window`, `document`).
- `target` varies which `lib` files are included by default (with an ES5 target, `startsWith` is an error); `lib` gives finer-grained control.
- External types come from: types bundled in an npm package, DefinitelyTyped published as `@types/<package>`, or your own declarations.

- The source states TypeScript automatically finds definitions under `node_modules/@types`. Changed (6.0): `types` now defaults to `[]`, so `@types` packages are no longer all included automatically; list the ones you need (e.g. `"types": ["node", "jest"]`) or use `"types": ["*"]` to restore the old behavior. Source: TypeScript 6.0 announcement, "types now defaults to []".
- Deprecated (6.0) / Removed (7.0): the source's `target: ES5` example is no longer supported (lowest target ES2015).

## Related

- [Modules (handbook chapter)](./modules.md)
- [Basics](./basics.md)
