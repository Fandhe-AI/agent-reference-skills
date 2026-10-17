---
source: https://vite.dev/guide/migration#advanced
---

# Migration: Advanced (plugin / framework authors)

Breaking changes from v7 expected to affect only a minority of use cases.

## Signature / Usage

Cloning the `bundle` object (passed to `generateBundle` / `writeBundle`, returned by `build`):

```js
// structuredClone(bundle) errors with DataCloneError; clone like this instead
structuredClone({ ...bundle })
```

## Options / Props

| Area | Change |
| --- | --- |
| Extglobs | not supported yet (rolldown-vite#365) |
| TypeScript legacy namespace | only partially supported (see Oxc Transformer docs) |
| `define` | does not share reference for objects; each variable gets a separate copy of the object |
| `bundle[foo] = ...` | assignment not supported; use `this.emitFile()` |
| `bundle` reference | not shared across hooks (rolldown-vite#410) |
| `structuredClone(bundle)` | errors with `DataCloneError`; use `structuredClone({ ...bundle })` (rolldown-vite#128) |
| Parallel hooks | all parallel hooks in Rollup work as sequential hooks |
| `"use strict";` | not injected sometimes |
| plugin-legacy | transforming to ES5 and below is not supported (rolldown-vite#452) |
| `build.target` | same browser with multiple versions now errors (esbuild selected the latest) |
| `build.rollupOptions.output.format: 'system'` | not supported by Rolldown (rolldown#2387) |
| `build.rollupOptions.output.format: 'amd'` | not supported by Rolldown (rolldown#2528) |
| `shouldTransformCachedModule` hook | not supported (rolldown#4389) |
| `resolveImportMeta` hook | not supported (rolldown#1010) |
| `renderDynamicImport` hook | not supported (rolldown#4532) |
| `resolveFileUrl` hook | not supported |
| `parseAst` / `parseAstAsync` | deprecated in favor of `parseSync` / `parse` |
| Comments | removed before the `renderChunk` hook instead of after |
| Comments (other) | comments other than those listed in Rolldown `OutputOptions.comments` are moved, while Rollup only removes comments if the adjacent code is removed |

## Notes

- Rolldown references: sequential hook execution (https://rolldown.rs/apis/plugin-api#sequential-hook-execution), directives (https://rolldown.rs/in-depth/directives).
- Migration (v7 -> v8): see also `plugin-api/rolldown-compatibility.md`.

## Related

- [migration-v7-overview.md](./migration-v7-overview.md)
- [migration-build-api-changes.md](./migration-build-api-changes.md)
- [../plugin-api/rolldown-compatibility.md](../plugin-api/rolldown-compatibility.md)
