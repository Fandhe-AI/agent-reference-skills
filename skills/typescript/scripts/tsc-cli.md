---
source: https://www.typescriptlang.org/docs/handbook/compiler-options.html
---

# tsc CLI

Commands for running `tsc` and the main CLI-only flags.

## Compile based on tsconfig.json

```sh
# Run a compile based on a backwards look through the fs for a tsconfig.json
tsc
```

When files are specified on the command line, `tsconfig.json` is not loaded. Since TypeScript 6.0, running `tsc` with file arguments in a directory that contains a `tsconfig.json` fails with `error TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.` Add `--ignoreConfig` to compile with the defaults (TypeScript 6.0 release notes).

## Compile specific files

```sh
# Emit JS for just the index.ts with the compiler defaults
tsc index.ts

# Emit JS for any .ts files in the folder src, with the default settings
tsc src/*.ts
```

With TypeScript 6.0 and later, add `--ignoreConfig` when the current directory contains a `tsconfig.json`:

```sh
tsc --ignoreConfig foo.ts
```

## Specify another config file

```sh
# Emit files referenced in with the compiler settings from tsconfig.production.json
tsc --project tsconfig.production.json
```

## Emit declaration files only

```sh
# Emit d.ts files for a js file with showing compiler options which are booleans
tsc index.js --declaration --emitDeclarationOnly
```

A `.js` input requires `--allowJs`, and `allowJs` in `tsconfig.json` is not read when files are given on the command line. Runnable form:

```sh
tsc index.js --allowJs --declaration --emitDeclarationOnly
```

## Emit a single file with string-valued options

```sh
# Emit a single .js file from two files via compiler options which take string arguments
tsc app.ts util.ts --target esnext --outfile index.js
```

> **Deprecated / removed**: `--outFile` was removed in TypeScript 6.0 and is not available in TypeScript 7.0. The sample above applies to TypeScript 5.x and earlier only. Per the TypeScript 6.0 announcement, migrate to an external bundler (Webpack, Rollup, esbuild, Vite, Parcel, etc.).

## Generate tsconfig.json

```sh
tsc --init
```

Initializes a TypeScript project and creates a `tsconfig.json` (official description).

## Show the final configuration

```sh
tsc --showConfig
```

Prints the final configuration without building.

## Type-check only

```sh
tsc --noEmit
```

Disables emitting files from the compilation.

## Watch mode

```sh
tsc --watch
```

## Version, help, and all options

```sh
tsc --version
tsc --help
tsc --all
```

`--help` shows the local CLI help; `--all` shows all compiler options.

## Ignore the config file

```sh
tsc --ignoreConfig
```

Ignores a discovered tsconfig and builds with the command-line options and files. Example from the TypeScript 6.0 release notes:

```sh
tsc --ignoreConfig foo.ts
```
