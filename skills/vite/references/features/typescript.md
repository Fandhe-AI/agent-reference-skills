---
source: https://vite.dev/guide/features#typescript
---

# TypeScript

Vite supports importing `.ts` files out of the box. It only transpiles; it does not type check.

## Signature / Usage

Use type-only imports and exports to avoid type-only imports being incorrectly bundled:

```ts
import type { T } from 'only/types'
export type { T }
```

## Options / Props

`tsconfig.json` `compilerOptions` fields that need attention:

| Name | Vite behavior |
|------|---------------|
| `isolatedModules` | Should be set to `true`. The Oxc transformer only transpiles without type information, so it does not support features like const enum and implicit type-only imports. If a dependency does not work with it, `"skipLibCheck": true` can temporarily suppress errors. |
| `useDefineForClassFields` | Defaults to `true` if the TypeScript target is `ES2022` or newer including `ESNext` (consistent with TypeScript 4.3.2+); other targets default to `false`. Set it explicitly to `false` if a library does not support `true`. |
| `target` | Ignored by Vite, following the same behavior as esbuild. In dev use `oxc.target` (defaults to `esnext`); in builds `build.target` takes higher priority over `oxc.target`. |
| `emitDecoratorMetadata` | Only partially supported; full support requires type inference by the TypeScript compiler, which is not supported. |
| `paths` | Set `resolve.tsconfigPaths: true` to make Vite use `paths` to resolve imports. This has a performance cost and is discouraged by the TypeScript team for changing the behavior of external tools. |

Other compiler options affecting the build result: `extends`, `importsNotUsedAsValues`, `preserveValueImports`, `verbatimModuleSyntax`, `jsx`, `jsxFactory`, `jsxFragmentFactory`, `jsxImportSource`, `experimentalDecorators`.

## Notes

- Transpile only: type checking requires knowledge of the whole module graph and would compromise Vite's speed. For production builds run `tsc --noEmit` in addition to the Vite build; during development run `tsc --noEmit --watch` in a separate process, or use `vite-plugin-checker` to report type errors in the browser.
- Vite uses the Oxc Transformer to transpile TypeScript; HMR updates can reflect in the browser in under 50ms.
- By default Vite uses the closest parent `tsconfig.json` matching each file; a config referenced by its `references` field is used when it matches the file (via `files`, `include`, `exclude`).
- When an option is set in both the Vite config and `tsconfig.json`, the Vite config value takes precedence.
- Vite starter templates have `"skipLibCheck": true` by default.

## Related

- [Client Types](./client-types.md)
- [tsconfig option](../config-shared/tsconfig.md)
- [oxc / esbuild options](../config-shared/oxc-esbuild.md)
