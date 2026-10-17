---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html
---

# TypeScript 5.9

Minimal `tsc --init`, `import defer`, `--module node20`, expandable hovers (preview), and `lib.d.ts` / inference behavior changes.

## Signature / Usage

```ts
import defer * as feature from "./some-feature.js";

// No side effects have occurred yet

// As soon as `specialConstant` is accessed, the contents of the `feature`
// module are run and side effects have taken place.
console.log(feature.specialConstant); // 42
```

## Options / Props

| Feature | Description |
|---------|-------------|
| `tsc --init` | Generates a minimal `tsconfig.json` with more prescriptive settings: `module: nodenext`, `target: esnext`, `types: []`, `sourceMap`, `declaration`, `declarationMap`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `strict`, `jsx: react-jsx`, `verbatimModuleSyntax`, `isolatedModules`, `noUncheckedSideEffectImports`, `moduleDetection: force`, `skipLibCheck` (other style options commented out) |
| `import defer` | ECMAScript deferred module evaluation; namespace imports only (`import defer * as ns from "..."`); module evaluated when an export is first accessed |
| `--module node20` | Stable option modeling Node.js v20; implies `--target es2023` unless configured (`nodenext` implies floating `esnext`) |
| Expandable hovers (preview) | `+` / `-` buttons on hover tooltips (quick info verbosity) |
| `js/ts.hover.maximumLength` | VS Code setting for maximum hover length; larger default |

## Notes

- `import defer` is not transformed or downleveled by TypeScript; it only works under `--module` `preserve` and `esnext`. Named imports and default imports are not allowed with `import defer`. The module and its dependencies are still fully loaded; only execution is deferred.
- `lib.d.ts` change: `ArrayBuffer` is no longer a supertype of several `TypedArray` types (including Node.js `Buffer`), producing errors such as TS2345 / TS2322 with `ArrayBufferLike`. Check the latest `@types/node`; prefer `Uint8Array<ArrayBuffer>`, or pass `data.buffer`.
- Type-argument inference changes (fixing type-variable "leaks") may introduce new errors; adding explicit type arguments to generic calls usually fixes them.
- Optimizations: cached instantiations on mappers (helps libraries like Zod and tRPC); avoiding closure creation in `fileOrDirectoryExistsUsingSource`.
- See the TypeScript 6.0 page for the later `tsc --init` / default changes (6.0 changes `strict`, `module`, `target`, `types` defaults).

## Related

- [TypeScript 5.8](./typescript-5-8.md)
- [TypeScript 6.0](./typescript-6-0.md)
