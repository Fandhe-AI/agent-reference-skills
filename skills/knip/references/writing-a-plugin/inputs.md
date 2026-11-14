# Inputs

Source: https://knip.dev/writing-a-plugin/inputs

## Overview

Input functions communicate plugin findings to Knip. More precision → better results and performance.

## Functions

### toEntry

Entry points. Accepts absolute/relative paths with glob patterns.

### toProductionEntry

Production entry points. Paths and glob patterns.

### toProject

Project patterns. Supports negated and standard globs.

### toDependency

Dependency in `dependencies` or `devDependencies`. Use it for package names referenced from configuration, such as a plugin or transformer a tool loads at build time. Knip marks the package as referenced and reports it as unlisted if not listed at all. Such a reference is development-only: in production mode the package is still marked as referenced, but an unlisted one is no longer reported.

### toProductionDependency

Production dependency in `dependencies`. Unlike `toDependency`, it's also reported as unlisted in production mode.

### toDeferResolve

Defer specifier resolution. May resolve to dependency or entry file. Reports unresolved imports if unsuccessful. A specifier that is a file path (starting with `./` or `../`, or absolute) is resolved as a file instead: Knip adds it as an entry file, or reports it under unresolved imports if it can't be resolved. For a value that is either a package name or a path, such as an item in Prettier's `plugins` option, prefer `toDeferResolve` for a path (with the directory the tool resolves it from as `dir`) and `toDependency` for anything else. A specifier inside `node_modules`, such as `node_modules/pkg/bin.js`, is the exception: Knip marks the package as referenced, and reports it as an unlisted dependency if it isn't listed.

### toDeferResolveEntry

Like `toDeferResolve` but restricted to entry files only. Ignores unresolved inputs.

### toConfig

Reference config files handled by other plugins. Example: Angular plugin referencing `tsConfig` and `karmaConfig` in `angular.json`:

```ts
toConfig('typescript', 'tsconfig.app.json');
toConfig('karma', 'karma.conf.js');
```

### toBinary

Binary assignments from `package.json` bin declarations. Used by shell script parsers.

### toAlias

Add path aliases to module resolver (same syntax as `compilerOptions.paths`).

## Options

### dir

Tells Knip which directory a relative specifier is resolved from, and which workspace the input belongs to (e.g., GitHub Actions in root). It must be an absolute directory such as `options.cwd`, `options.configFileDir` or `options.rootCwd`: a relative `dir` falls back to the workspace of the file the input came from. Use it when a tool resolves values from its working directory rather than from its config file:

```ts
toDeferResolve(specifier, { dir: options.cwd });
```

Entry patterns resolve from `dir` as well, but `dir` never moves them to another workspace: the workspace whose plugin returned the input globs the pattern. Project patterns ignore `dir`:

| Input type | Relative to | Reads `dir` |
| --- | --- | --- |
| `toEntry`, `toProductionEntry` | `dir`, else the workspace directory | base only |
| `toProject` | the workspace directory | no |
| `toDeferResolve`, `toDeferResolveEntry`, `toConfig` | `dir`, else the config file's directory | yes |
| `toDependency`, `toBinary` | not a path | yes |
| `toAlias` | `dir`, else the workspace directory | yes |

### production

Use the `production` flag for an input that is part of the production code, so it's kept in production mode: a resolved file stays an entry file, and an unlisted dependency or unresolved import is still reported. The production helpers such as `toProductionDependency` set it already:

```ts
toDeferResolve(specifier, { dir: options.cwd, production: true });
```

### alsoReferenceOwner

Use `alsoReferenceOwner` together with `dir` when a shared config file, such as an extended `tsconfig.json` preset, is read for another workspace. The dependency is then referenced in the `dir` workspace and also in the workspace that owns the file, so either one can list it.

### optional

Flag dependency as not required (won't report as unlisted if absent).

### isTypeOnly

Use when only the types of a package are used, such as packages listed in `compilerOptions.types`. A `@types/pkg` dependency then satisfies the reference on its own, without `pkg` installed. Don't use it for packages the tool actually loads, even only at build time.

### allowIncludeExports

Enable reporting entry file exports as unused with `--include-entry-exports`. Use it with `toProductionEntry` for entry patterns or `toDeferResolveProductionEntry` for literal file paths:

```ts
toDeferResolveProductionEntry('./src/[variant]/entry.ts', {
  allowIncludeExports: true,
});
```

## Notes

- Source: https://knip.dev/writing-a-plugin/inputs (knip@6.45.1 docs, retrieved 2026-11-14)
