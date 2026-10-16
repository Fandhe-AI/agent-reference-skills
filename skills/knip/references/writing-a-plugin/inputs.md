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

Defer specifier resolution. May resolve to dependency or entry file. Reports unresolved imports if unsuccessful.

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

Assign inputs to different workspaces (e.g., GitHub Actions in root).

### optional

Flag dependency as not required (won't report as unlisted if absent).

### isTypeOnly

Use when only the types of a package are used, such as packages listed in `compilerOptions.types`. A `@types/pkg` dependency then satisfies the reference on its own, without `pkg` installed. Don't use it for packages the tool actually loads, even only at build time.

### allowIncludeExports

Enable reporting entry file exports as unused with `--include-entry-exports`. Works with `toProductionEntry`.
