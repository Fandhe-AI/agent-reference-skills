# FAQ

Source: https://knip.dev/reference/faq

## Why Should I Bother?

Configuring Knip properly gives absolute confidence in your codebase. Delete dead code, remove unused dependencies, refactor with certainty.

## Common Pitfalls

- **Configuration Hints**: Critical for building healthy module graphs
- **Ignore Patterns**: `ignore` suppresses reporting but doesn't exclude from analysis. Use `project` patterns instead
- **Excluding Tests**: Use production mode, not ignore patterns
- **Auto-fix**: Don't run `--fix` before configuration is complete

## Knip vs. ESLint

ESLint analyzes files separately. Knip lints projects as a whole.

## Knip vs. Tree-shaking

Tree-shaking operates at build time on bundles. Knip is a development-phase linter. Complementary tools.

## Plugins

Plugins prevent configuration burden by adding entry files and parsing configuration files intelligently.

## Building the Graphs

### Entry File Sources

- Default locations (`index.js`, `src/index.ts`)
- `package.json` fields: `main`, `bin`, `exports`
- Plugin-configured locations
- Config files and their contents
- Dynamic imports, `require.resolve()`, `import.meta.resolve()`
- Template string scripts (execa, bun, zx)
- `package.json` scripts, CI workflow files

### Source File Analysis

Uses oxc-parser for AST analysis of imports, exports, namespace properties, require.resolve, and template strings.

### Module Resolution

Custom resolver (oxc-resolver) supporting non-standard extensions, path aliases, exports maps, self-references, and source code resolution.

### Non-standard Imports

Strips prefixes/suffixes from specifiers like `"./icon.svg?raw"` and webpack loader syntax.

## TypeScript

- **Workspaces vs Projects**: Workspaces have `package.json`; projects have `tsconfig.json`
- **ts.findReferences**: Not used — heavy, per-symbol, single-program scope
- **Path Aliases for Workspaces**: Use dependencies in `package.json` instead
- **tsconfig.json Location**: `--tsConfig` for root; plugin `config` per-workspace

## Compilers

Knip includes regex-based extractors for Astro, MDX, Svelte, Vue (not actual compilers). Override with real compilers for proper export detection.

## Production Mode Default

Both modes have merits. Production catches dead production code (UX). Default catches more including tooling (DX).
