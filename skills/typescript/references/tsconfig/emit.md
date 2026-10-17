---
source: https://www.typescriptlang.org/tsconfig/#Emit_6246
---

# Emit options

21 compiler options that control what `tsc` writes: JavaScript output location, declaration files, source maps, helpers and emit suppression.

## Signature / Usage

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `declaration` | `true` if `composite`; `false` otherwise. | — | Generate .d.ts files from TypeScript and JavaScript files in your project. |
| `declarationDir` | — | — | Specify the output directory for generated declaration files. |
| `declarationMap` | — | — | Create sourcemaps for d.ts files. |
| `downlevelIteration` | — | — | Emit more compliant, but verbose and less performant JavaScript for iteration. |
| `emitBOM` | — | — | Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. |
| `emitDeclarationOnly` | — | — | Only output d.ts files and not JavaScript files. |
| `importHelpers` | — | — | Allow importing helper functions from tslib once per project, instead of including them per-file. |
| `inlineSourceMap` | — | — | Include sourcemap files inside the emitted JavaScript. |
| `inlineSources` | — | — | Include source code in the sourcemaps inside the emitted JavaScript. |
| `mapRoot` | — | — | Specify the location where debugger should locate map files instead of generated locations. |
| `newLine` | `lf` | `crlf`, `lf` | Set the newline character for emitting files. |
| `noEmit` | — | — | Disable emitting files from a compilation. |
| `noEmitHelpers` | — | — | Disable generating custom helper functions like `__extends` in compiled output. |
| `noEmitOnError` | — | — | Disable emitting files if any type checking errors are reported. |
| `outDir` | — | — | Specify an output folder for all emitted files. |
| `outFile` | — | — | Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output. |
| `preserveConstEnums` | `true` if `isolatedModules`; `false` otherwise. | — | Disable erasing `const enum` declarations in generated code. |
| `removeComments` | — | — | Disable emitting comments. |
| `sourceMap` | — | — | Create source map files for emitted JavaScript files. |
| `sourceRoot` | — | — | Specify the root path for debuggers to find the reference source code. |
| `stripInternal` | — | — | Disable emitting declarations that have `@internal` in their JSDoc comments. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option.
- Deprecated (6.0) / Removed (7.0): `downlevelIteration`. It only affects ES5 emit and `target: es5` is deprecated; in 6.0 setting `--downlevelIteration` at all (even `false`) leads to a deprecation error. Also see `target` in the language-and-environment page.
- Deprecated (6.0) / Removed (7.0): `outFile`. The option was removed in 6.0 per the 6.0 release notes; external bundlers (Webpack, Rollup, esbuild, Vite, Parcel and others) do this job. Per the same notes, TypeScript 7.0 will not support the deprecated options; in 6.0 they can be silenced with `"ignoreDeprecations": "6.0"`. The option page states `outFile` could only be used with `module` `None`, `System` or `AMD`, not to bundle CommonJS or ES6 modules.
- `declaration`: when working with `.d.ts` for JavaScript files you may want `emitDeclarationOnly` or `outDir` so the JavaScript files are not overwritten.
- `declarationDir` places the `.d.ts` output in a separate folder (e.g. `./types`); `declarationMap` should be strongly considered with project references (editors can Go to Definition into the `.ts` source).
- `emitDeclarationOnly`: useful when another transpiler generates JavaScript, or when TypeScript is used only to generate `.d.ts` files for consumers.
- `noEmit`: makes room for Babel or swc to convert TypeScript to JavaScript, while TypeScript serves as editor integration and type-checker. `noEmitOnError` defaults to `false`.
- `importHelpers`: imports downlevel helpers from `tslib` once per project; `tslib` must be importable at runtime; affects modules only. `noEmitHelpers` turns off helper emission entirely when you supply your own global implementations.
- `inlineSourceMap` is mutually exclusive with `sourceMap`; `inlineSources` requires either `sourceMap` or `inlineSourceMap`.
- `mapRoot` / `sourceRoot` strings are written verbatim into the source map.
- `outDir`: preserves the source directory structure; see `rootDir` if the computed root is not what you intended.
- `stripInternal`: internal compiler option, the compiler does not check that the result is valid; for more visibility levels in `.d.ts` files the page points to api-extractor.
- `preserveConstEnums`: keeps the `const enum` declaration at runtime while the enum values are still inlined.
- `emitBOM`: the default of `false` is generally best unless you have a reason to change it.
- Changed (7.0): declaration (`.d.ts`) emit from `.js` input files has substantially changed behavior in the Go-based compiler; matching 6.0 output exactly is a non-goal (typescript-go CHANGES.md "Declaration Emit").

`outDir` example from the official page:

```json
{
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

## Related

- [projects](./projects.md)
- [modules](./modules.md)
- [javascript-support](./javascript-support.md)
