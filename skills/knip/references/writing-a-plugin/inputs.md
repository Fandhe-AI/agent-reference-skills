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

Dependency in `dependencies` or `devDependencies`.

### toProductionDependency

Production dependency in `dependencies`.

### toDeferResolve

Defer specifier resolution. May resolve to dependency or entry file. Reports unresolved imports if unsuccessful.

### toDeferResolveEntry

Like `toDeferResolve` but restricted to entry files only. Ignores unresolved inputs.

### toConfig

Reference config files handled by other plugins. Example: Angular plugin referencing `tsConfig` in `angular.json`.

### toBinary

Binary assignments from `package.json` bin declarations. Used by shell script parsers.

### toAlias

Add path aliases to module resolver (same syntax as `compilerOptions.paths`).

## Options

### dir

Assign inputs to different workspaces (e.g., GitHub Actions in root).

### optional

Flag dependency as not required (won't report as unlisted if absent).

### allowIncludeExports

Enable reporting entry file exports as unused with `--include-entry-exports`. Works with `toProductionEntry`.
