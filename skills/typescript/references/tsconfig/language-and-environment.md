---
source: https://www.typescriptlang.org/tsconfig/#Language_and_Environment_6254
---

# Language and Environment options

13 compiler options that set the emitted JavaScript language version (`target`), bundled library declarations (`lib`), JSX emit, decorators and module/script detection.

## Signature / Usage

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022", "dom"],
    "jsx": "react-jsx",
    "moduleDetection": "force"
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `emitDecoratorMetadata` | — | — | Emit design-type metadata for decorated declarations in source files. |
| `experimentalDecorators` | — | — | Enable experimental support for TC39 stage 2 draft decorators. |
| `jsx` | — | `preserve`, `react`, `react-native`, `react-jsx`, `react-jsxdev` | Specify what JSX code is generated. |
| `jsxFactory` | `React.createElement` | Any identifier or dotted identifier. | Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. |
| `jsxFragmentFactory` | `React.Fragment` | Any identifier or dotted identifier. | Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. |
| `jsxImportSource` | `react` | — | Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`. |
| `lib` | — | See the High Level libraries table in Notes | Specify a set of bundled library declaration files that describe the target runtime environment. |
| `libReplacement` | — | — | Enable substitution of default `lib` files with custom ones. |
| `moduleDetection` | "auto": Treat files with imports, exports, import.meta, jsx (with jsx: react-jsx), or esm format (with module: node16+) as modules. | `legacy`, `auto`, `force` | Specify what method is used to detect whether a file is a script or a module. |
| `noLib` | — | — | Disable including any library files, including the default lib.d.ts. |
| `reactNamespace` | `React` | — | Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit. |
| `target` | `es2023` if `module` is `node20`; `esnext` if `module` is `nodenext`; `ES5` otherwise. | `es3`, `es5`, `es6`/`es2015`, `es2016`, `es2017`, `es2018`, `es2019`, `es2020`, `es2021`, `es2022`, `es2023`, `es2024`, `es2025`, `esnext` | Set the JavaScript language version for emitted JavaScript and include compatible library declarations. |
| `useDefineForClassFields` | `true` if `target` is `ES2022` or higher, including `ESNext`; `false` otherwise. | — | Emit ECMAScript-standard-compliant class fields. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option.
- Default changed (6.0): `target` defaults to the current-year ES version (a floating target; currently `es2025`) per the 6.0 release notes "Simple Default Changes". The rendered tsconfig page still lists "`ES5` otherwise" (known inconsistency inside the official sources; both are recorded here). `libReplacement` is now `false` by default in 6.0.
- Deprecated (6.0) / Removed (7.0): `target: es5`. TypeScript's lowest target is now ES2015; for ES5 output use an external compiler to compile the source or post-process TypeScript's output. Per the 6.0 release notes, TypeScript 7.0 will not support the deprecated options; in 6.0 they can be silenced with `"ignoreDeprecations": "6.0"`. (`target: ES3` was already deprecated in 5.0.)
- `target`: changes which JS features are downleveled (e.g. an arrow function becomes a `function` expression at ES5 or lower) and also changes the default value of `lib`. `ESNext` refers to the highest version your TypeScript supports and may make upgrades less predictable. Community base configs for common platforms live in `tsconfig/bases`.
- `lib` high level libraries (from the option page): `ES5`, `ES2015` (alias `ES6`), `ES2016` (`ES7`), `ES2017`, `ES2018`, `ES2019`, `ES2020`, `ES2021`, `ES2022`, `ES2023`, `ESNext`, `DOM`, `WebWorker`, `ScriptHost`. Individual components such as `DOM.Iterable`, `ES2015.Promise`, `ES2020.String` also exist. Reasons to change it: no browser (drop `"dom"`), polyfills, or partial support of a newer ECMAScript version. Since TypeScript 4.5 lib files can be overridden by npm modules.
- `libReplacement`: built-in lib files are first resolved from packages named `@typescript/lib-*` (e.g. `"@typescript/lib-dom": "npm:@types/web@0.0.199"`); `--libReplacement false` disables those lookups.
- `noLib`: disables automatic inclusion of any library files and makes `lib` ignored; you must provide your own definitions for `Array`, `Boolean`, `Function`, `IArguments`, `Number`, `Object`, `RegExp`, `String`.
- `jsx`: only affects output of JS files that started in `.tsx` files. `react-jsx` / `react-jsxdev` emit `_jsx` calls (production / development), `preserve` emits `.jsx` unchanged, `react-native` emits `.js` unchanged, `react` emits `React.createElement`. Per-file override via `/* @jsxRuntime classic */` or `/* @jsxRuntime automatic */`.
- `jsxFactory`: used with the classic runtime (e.g. `"h"` or `"preact.h"` for Preact); also determines where the `JSX` namespace is looked up (`React.JSX` for `React.createElement`, `h.JSX` for `h`). Per-file: `/** @jsx h */`. `jsxFragmentFactory`: per-file `/** @jsxFrag Fragment */`; used together with `jsxFactory`.
- `jsxImportSource`: module specifier for the `jsx` / `jsxs` factories under `react-jsx` / `react-jsxdev` (TypeScript 4.1). Per-file: `/** @jsxImportSource preact */`. The `.tsx` file must include an `import` or `export` to be a module.
- `reactNamespace`: use `jsxFactory` instead.
- `experimentalDecorators`: enables decorators that predate the TC39 standardization process (a TC39 stage 2 draft version). `emitDecoratorMetadata` enables experimental emit of type metadata that works with the `reflect-metadata` module.
- `moduleDetection`: `auto` also checks `package.json` `"type": "module"` under `module` `nodenext`/`node16` and JSX files under `jsx: react-jsx`; `legacy` is the 4.6 and prior behavior (import/export statements only); `force` treats every non-declaration file as a module.
- `useDefineForClassFields`: switches to the ECMA runtime behavior for class fields; see the 3.7 release notes.

`jsxImportSource` example from the official page:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "types": ["preact"]
  }
}
```

## Related

- [modules](./modules.md)
- [interop-constraints](./interop-constraints.md)
- [emit](./emit.md)
