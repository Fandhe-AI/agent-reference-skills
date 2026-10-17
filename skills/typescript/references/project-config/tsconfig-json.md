---
source: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
---

# What is a tsconfig.json

The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. The file specifies the root files and the compiler options required to compile the project. JavaScript projects can use a `jsconfig.json` file instead, which acts almost the same but has some JavaScript-related compiler flags enabled by default.

## Signature / Usage

A project is compiled in one of the following ways:

- By invoking tsc with no input files, in which case the compiler searches for the `tsconfig.json` file starting in the current directory and continuing up the parent directory chain.
- By invoking tsc with no input files and a `--project` (or just `-p`) command line option that specifies the path of a directory containing a `tsconfig.json` file, or a path to a valid `.json` file containing the configurations.

Example using `include` and `exclude`:

```json
{
  "compilerOptions": {
    "module": "system",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outFile": "../../built/local/tsc.js",
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.spec.ts"]
}
```

Example using `files`:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true
  },
  "files": ["core.ts", "sys.ts", "types.ts", "scanner.ts", "parser.ts"]
}
```

TSConfig Bases: depending on the JavaScript runtime environment, there may be a base configuration at github.com/tsconfig/bases. These are `tsconfig.json` files which your project extends from. For example, with the npm module `@tsconfig/node12`:

```json
{
  "extends": "@tsconfig/node12/tsconfig.json",

  "compilerOptions": {
    "preserveConstEnums": true
  },

  "include": ["src/**/*"],
  "exclude": ["**/*.spec.ts"]
}
```

## Notes

- When input files are specified on the command line, `tsconfig.json` files are ignored.
- The `"compilerOptions"` property can be omitted, in which case the compiler's defaults are used.
- The `tsconfig.json` Schema can be found at the JSON Schema Store (`https://json.schemastore.org/tsconfig`).
- Changed (7.0): command line builds cannot take file paths when the current directory contains a `tsconfig.json` file unless passed an explicit `--ignoreConfig` flag (source: announcing-typescript-7-0 blog, https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
- Default changed (6.0), adopted by 7.0: `strict` is `true`, `module` defaults to `esnext`, `target` defaults to the current stable ECMAScript version preceding `esnext`, `noUncheckedSideEffectImports` is `true`, `libReplacement` is `false`, `rootDir` defaults to `./`, `types` defaults to `[]` (`["*"]` restores the old behavior). Source: 7.0 blog "Updates Since 5.x, and New Behaviors from 6.0".
- Deprecated (6.0) / Removed (7.0): `module: system` (and `amd`, `umd`, `none`) used in the `include`/`exclude` example above; `outFile` is described by the 6.0 release notes as removed from TypeScript 6.0 in favor of external bundlers.
- For 6.0, deprecations can be silenced with `"ignoreDeprecations": "6.0"`, but TypeScript 7.0 will not support those deprecated options (6.0 release notes).

## Related

- [compiler-options-cli.md](./compiler-options-cli.md)
- [project-references.md](./project-references.md)
- [compiler-options-in-msbuild.md](./compiler-options-in-msbuild.md)
- [top-level.md](../tsconfig/top-level.md)
