# Unused Exports

Source: https://knip.dev/typescript/unused-exports

## Why Unused Exports Are Problematic

1. **Bundle Size**: Increase sizes if not eliminated by tree-shaking
2. **Code Clutter**: Make codebases harder to navigate
3. **Developer Confusion**: Mislead about actual code usage
4. **Refactoring Difficulty**: Complicate maintenance
5. **Tool Performance**: Slow down bundlers, linters, type checkers
6. **Dead Code Risk**: May represent abandoned code

## Finding Unused Exports

Knip analyzes the codebase, identifies exports not imported anywhere, and reports them.

## How Knip Identifies

Uses both static and dynamic analysis, examining import statements and code patterns. Supports CommonJS and ES Modules.

## Auto-fix

`--fix` flag automatically removes unused exports from source files.

## Large Codebases

Supports monorepo structures with workspaces.

## Knip vs. ESLint

ESLint finds unused imports/variables within individual files. Knip analyzes the entire project through comprehensive module graph construction.
