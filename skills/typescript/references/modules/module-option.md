---
source: https://www.typescriptlang.org/docs/handbook/modules/reference.html#the-module-compiler-option
---

# The `module` compiler option

Details of each `module` value. Historically `module` only controlled the output module format; the `node16`, `node18`, and `nodenext` values also describe Node.js's module system (supported formats, per-file format detection, interoperability).

## Signature / Usage

```json
{
  "compilerOptions": {
    "module": "nodenext"
  }
}
```

## Options / Props

| Value | Summary |
|-------|---------|
| `node16`, `node18`, `node20`, `nodenext` | Emit CommonJS or ESM per detected file format; the only correct options for apps/libraries running in Node.js v12+ |
| `preserve` | (added in 5.4) Preserves each import/export form; `import x = require()` / `export =` emit as `require` / `module.exports` |
| `es2015`, `es2020`, `es2022`, `esnext` | ES module output; use `esnext` with `moduleResolution: bundler` for bundlers, Bun, tsx; not for Node.js |
| `commonjs` | CommonJS output; "You probably shouldn't use this." Use `node16` / `node18` / `nodenext` for Node.js |
| `system` | Designed for the SystemJS module loader |
| `amd` | AMD loaders like RequireJS; supports `outFile`; use a bundler instead |
| `umd` | AMD or CommonJS loaders; no global variable exposed; use a bundler instead |

Differences between the Node.js modes:

|          | `target` | `moduleResolution` | import assertions | import attributes | JSON imports        | require(esm) |
|----------|----------|--------------------|-------------------|-------------------|---------------------|--------------|
| node16   | `es2022` | `node16`           | no                | no                | no restrictions     | no           |
| node18   | `es2022` | `node16`           | yes               | yes               | needs `type "json"` | no           |
| nodenext | `esnext` | `nodenext`         | no                | yes               | needs `type "json"` | yes          |

## Notes

### `node16`, `node18`, `node20`, `nodenext`

- Misconception: these modes do not only emit ES modules; both ESM and CommonJS emit are supported based on the detected module format of each file.
- Module format detection: `.mts` / `.mjs` / `.d.mts` always ESM; `.cts` / `.cjs` / `.d.cts` always CommonJS; `.ts` / `.tsx` / `.js` / `.jsx` / `.d.ts` are ESM if the nearest ancestor `package.json` has `"type": "module"`, otherwise CommonJS. A project of all `.ts` files emits CommonJS by default under `--module nodenext`; add `"type": "module"` to emit ESM.
- Interoperability: an ES module referencing CommonJS gets `module.exports` as the default import; named imports may or may not be available (Node.js static analysis via cjs-module-lexer; TypeScript optimistically assumes success; see microsoft/TypeScript#54018). A CommonJS module referencing an ES module: in `node16` / `node18` `require` cannot (including `import` statements in files detected as CommonJS); in `nodenext` (Node.js v22.12.0+) `require` can, and an error is thrown at runtime if the ES module or its imports use top-level `await` (TypeScript does not detect this). Dynamic `import()` can always import an ES module.
- Emit: ESM emit is like `esnext` but `import x = require("...")` is transformed via `createRequire`; CommonJS emit is like `commonjs` but dynamic `import()` is not transformed.

```ts
// main.ts
import x = require("mod");
```

```js
// main.js (ESM emit)
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const x = __require("mod");
```

- Implied and enforced: `nodenext` implies and enforces `moduleResolution nodenext`; `node18` / `node16` imply and enforce `moduleResolution node16`; `nodenext` implies `target esnext`; `node18` / `node16` imply `target es2022`; all three imply `esModuleInterop`.

### `preserve`

- Added in TypeScript 5.4. Best reflects most modern bundlers and the Bun runtime. Implies `moduleResolution bundler` and `esModuleInterop` (the latter affects only type checking, since imports never become `require` calls).

```ts
// main.ts
import x, { y, z } from "mod";
import mod = require("mod");
const dynamic = import("mod");

export const e1 = 0;
export default "default export";
```

```js
// main.js
import x, { y, z } from "mod";
const mod = require("mod");
const dynamic = import("mod");

export const e1 = 0;
export default "default export";
```

### `es2015`, `es2020`, `es2022`, `esnext`

- `import mod = require("mod")` is not allowed in non-declaration files. `es2020` adds `import.meta`; `es2022` adds top-level `await`; `esnext` is a moving target that may include Stage 3 proposals. Emitted files are ES modules, dependencies may be any format.

### `commonjs`

- Dynamic `import()` is transformed to a Promise of a `require()` call; `esModuleInterop` affects output for default and namespace imports. Emit shown with `esModuleInterop: false`:

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e1 = void 0;
const mod_1 = require("mod");
const mod = require("mod");
const dynamic = Promise.resolve().then(() => require("mod"));

console.log(mod_1.default, mod_1.y, mod_1.z, mod);
exports.e1 = 0;
exports.default = "default export";
```

### `system`, `amd`, `umd`

- Deprecated (6.0) / Removed (7.0): `--module amd`, `umd`, `systemjs` (and `none`) are deprecated in 6.0 (usable only with `ignoreDeprecations: "6.0"`, https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/); in 7.0 they are hard errors with no-op behavior, recommending `esnext` or `preserve` with bundlers or browser-based module resolution. The `amd-module` directive no longer has any effect (6.0 release notes https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html, TypeScript 7.0 announcement https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
- `amd` emit example: `define(["require", "exports", "mod", "mod"], function (require, exports, mod_1, mod) { ... });`. `umd` emit wraps a factory that checks `module.exports` then `define.amd`. `system` emit uses `System.register(["mod"], function (exports_1, context_1) { ... })`.
- Changed (6.0): `moduleResolution: bundler` can now combine with `module: commonjs` (previously only `esnext` / `preserve`), as an upgrade path from deprecated `node10`; planning a migration to `preserve` + `bundler` or `nodenext` is suggested.

## Related

- [Theory](./theory.md)
- [The moduleResolution compiler option](./module-resolution-option.md)
- [Choosing Compiler Options](./choosing-compiler-options.md)
- [ESM/CJS Interoperability](./esm-cjs-interop.md)
