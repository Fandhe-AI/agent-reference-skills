---
source: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html
---

# TypeScript 5.7

Never-initialized variable checks, `--rewriteRelativeImportExtensions`, `--target es2024`, ancestor `tsconfig.json` search, validated JSON imports under `nodenext`, and generic `TypedArray`s.

## Signature / Usage

```ts
// Under --rewriteRelativeImportExtensions...

// these will be rewritten.
import * as foo from "./foo.ts";
import * as bar from "../someFolder/bar.mts";

// these will NOT be rewritten in any way.
import * as a from "./foo";
import * as b from "some-package/file.ts";
import * as c from "@some-scope/some-package/file.ts";
import * as d from "#/file.ts";
import * as e from "./file.js";
```

## Options / Props

| Feature | Description |
|---------|-------------|
| Never-initialized variable check | Error when a variable accessed in a nested function is never assigned anywhere ("used before being assigned"); still lenient for possibly-initialized |
| `--rewriteRelativeImportExtensions` | Relative paths (`./`, `../`) ending in `.ts` / `.tsx` / `.mts` / `.cts` (non-declaration) are rewritten to `.js` / `.jsx` / `.mjs` / `.cjs` on emit |
| `--target es2024` / `--lib es2024` | `SharedArrayBuffer` / `ArrayBuffer` features, `Object.groupBy`, `Map.groupBy`, `Promise.withResolvers`; `Atomics.waitAsync` moves from `es2022` to `es2024` |
| Ancestor config search | Editors keep walking up the directory tree to find the owning `tsconfig.json` (e.g. solution-style references) |
| Composite project ownership | For `composite` referenced projects, only the root set of files is checked when probing project ownership |
| JSON imports under `--module nodenext` | Require `with { type: "json" }`; only a default export (no named exports) |
| V8 compile caching | Uses Node.js 22 `module.enableCompileCache()` (about 2.5x faster `tsc --version` in the notes' benchmark) |

## Notes

- Not rewritten: dynamic `import()` paths, `paths` / `baseUrl` aliases, and `package.json` `exports` / `imports` (e.g. `#root/*`). For workspace layouts, use conditional exports with scoped custom conditions such as `@my-package/development` and run `node --conditions=@my-package/development`.
- JSON import example:

```ts
import myConfig from "./myConfig.json" with { type: "json" };
```

- Behavioral changes: all `TypedArray`s are generic (`interface Uint8Array<TArrayBuffer extends ArrayBufferLike = ArrayBufferLike>`); update `@types/node` if `Buffer` errors appear. Methods with non-literal computed names in classes now produce index signatures (e.g. `[x: symbol]: () => number`). More implicit `any` errors (TS7011) for functions returning `null` / `undefined` under `noImplicitAny` without `strictNullChecks`.
- 5.7 notes that `--rewriteRelativeImportExtensions` complements `--allowImportingTsExtensions`.
- 6.0 adds `#/` subpath imports (see the TypeScript 6.0 page).

## Related

- [TypeScript 5.8](./typescript-5-8.md)
- [TypeScript 5.6](./typescript-5-6.md)
