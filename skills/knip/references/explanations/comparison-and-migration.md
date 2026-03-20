# Comparison & Migration

Source: https://knip.dev/explanations/comparison-and-migration

## Migration Strategy

Delete the previous tool's dependency and configuration file, then get started with Knip.

## Comparison

### depcheck (Archived → recommends Knip)

Analyzes dependencies to find unused and missing packages. Offers plugins and compiler support.

Equivalent: `knip --dependencies`

### unimported (Archived → recommends Knip)

Fast tool for finding unused dependencies. Operates in production mode only.

Equivalent: `knip --production --dependencies --files`

### ts-prune (Archived → recommends Knip)

Finds unused exports in TypeScript projects. Zero configuration.

Equivalent: `knip --include exports,types,nsExports,nsTypes`

### ts-unused-exports

Focuses on unused exported symbols in TypeScript projects. Similar to ts-prune.

### tsr (Archived → recommends Knip)

Removes unused code from TypeScript projects. Works with single `tsconfig.json`.

## Related Projects

deadfile, DepClean, dependency-check, find-unused-exports, next-unused, npm-check, renoma
