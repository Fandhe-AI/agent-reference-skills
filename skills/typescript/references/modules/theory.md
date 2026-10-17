---
source: https://www.typescriptlang.org/docs/handbook/modules/theory.html
---

# Modules - Theory

How TypeScript models JavaScript modules: scripts vs modules, the host, module output format, module resolution, and the role of declaration files.

## Signature / Usage

```ts
import sayHello from "greetings";
sayHello("world");
```

To check this file the compiler must answer: which module system loads the file, what module kind is expected, how the syntax is transformed on emit, where `"greetings"` is looked up, what kind of module is found, whether the kinds may reference each other, and what is bound to `sayHello`. TypeScript's job, in terms of output files: understand the rules of the host enough (1) to compile files into a valid output module format, (2) to ensure imports in those outputs resolve successfully, and (3) to know what type to assign to imported names.

## Options / Props

| `module` value | Description |
|-------|-------------|
| `node16` | Node.js v16+ module system: ES modules and CJS side-by-side with particular interoperability and detection rules |
| `node18` | Node.js v18+; adds support for import attributes |
| `nodenext` | Moving target reflecting latest Node.js. As of TypeScript 5.8 supports `require` of ECMAScript modules |
| `es2015` | ES2015 module spec (first to introduce `import` / `export`) |
| `es2020` | Adds `import.meta` and `export * as ns from "mod"` |
| `es2022` | Adds top-level `await` |
| `esnext` | Currently identical to `es2022`; moving target incl. Stage 3+ module proposals |
| `commonjs`, `system`, `amd`, `umd` | Emit everything in the named module system; no longer recommended for new projects |

| `moduleResolution` value | Description |
|-------|-------------|
| `classic` | Oldest mode; unfortunate default when `module` is not `commonjs` / `node16` / `nodenext`; should not be used for new projects |
| `node10` | Formerly `node`; default when `module` is `commonjs`; models Node.js older than v12; supports `node_modules`, directory `index.js`, omitted `.js` extensions |
| `node16` | Counterpart of `--module node16` / `node18`; ESM imports require extensions, `require` calls may omit them |
| `nodenext` | Currently identical to `node16`; counterpart of `--module nodenext` |
| `bundler` | Base algorithm for bundler-targeted code; supports `package.json` `"exports"` / `"imports"` by default; requires `module` `esnext` |

Declaration file extensions imply the JavaScript file:

| Declaration | JavaScript | TypeScript |
|-------------|------------|------------|
| `.d.ts` | `.js` | `.ts` |
| `.d.ts` | `.js` | `.tsx` |
| `.d.mts` | `.mjs` | `.mts` |
| `.d.cts` | `.cjs` | `.cts` |
| `.d.*.ts` | `.*` | |

## Notes

- Host: the system outside TypeScript that consumes the output (runtime such as Node.js, or bundler such as Webpack). The TypeScript compiler itself is not a host. A transpiler/optimizer/formatter that leaves imports and exports alone is not a host TypeScript cares about.
- Module format detection (`node16` / `node18` / `nodenext`): `.mjs` / `.cjs` are always ESM / CJS; `.js` is ESM only if the nearest `package.json` has `"type": "module"`, else CJS. The same algorithm is applied to input files (`.mts` -> ESM, `.cts` -> CJS, `.ts` -> via `package.json`). As of TypeScript 5.6, other `--module` modes (`esnext`, `commonjs`) also respect `.mts` / `.cts` as a file-level override for emit format.
- Node.js projects: the only correct `module` settings are `node16` and `nodenext` (and `node18`); `esnext` or `commonjs` is incorrect even if emitted files are all ESM / CJS.
- Input module syntax is decoupled from output syntax: an ESM `import` may be emitted as ESM as-is or as `require` depending on `module`. `verbatimModuleSyntax` (TypeScript 5.0) requires input syntax to match emitted form.
- Module specifiers are not transformed by default (emitted as written). `--rewriteRelativeImportExtensions` (TypeScript 5.7) transforms relative `.ts` / `.tsx` / `.mts` / `.cts` specifiers to JS equivalents.
- Module resolution is host-defined; TypeScript imitates the host's resolution between output files, with a remapping to find type information (e.g. `"./math.mjs"` resolves to `math.mts`).
- The compiler always looks for TypeScript and declaration files first; a `.d.ts` implies a sibling JS file with the same name and matching extension. `@arethetypeswrong/cli` can catch mismatches in hand-written declarations.
- Direct `.ts` imports (`allowImportingTsExtensions`) require `noEmit` or `emitDeclarationOnly`; for bundlers and Bun use `moduleResolution: bundler`.
- Libraries: `"module": "node18"` (implying `"moduleResolution": "node16"`) maximizes compatibility; `bundler` "is infectious" (`export * from "./utils"` works in bundlers but fails in Node.js with `ERR_MODULE_NOT_FOUND`; `./utils.js` works in both).
- Deprecated (6.0) / Removed (7.0): `moduleResolution: classic` and `node10` (theory text says `classic` "is scheduled for deprecation in TypeScript 6.0"); `module: amd` / `umd` / `system` (`systemjs`) are no longer supported in 7.0 (6.0 release notes, TypeScript 7.0 announcement).
- "Identical" for `node16` / `nodenext` in the table above refers to the `moduleResolution` algorithm only. Whether CommonJS can `require()` an ES module is set by `--module`: `nodenext` (TS 5.8+, Node.js v22.12+) allows it, `node16` / `node18` do not (see module-option.md; source: Reference.md).
- Original twoslash `// @Filename:` markers were converted to plain file-name comments.

## Related

- [Introduction](./introduction.md)
- [The module compiler option](./module-option.md)
- [The moduleResolution compiler option](./module-resolution-option.md)
- [Choosing Compiler Options](./choosing-compiler-options.md)
- [ESM/CJS Interoperability](./esm-cjs-interop.md)
