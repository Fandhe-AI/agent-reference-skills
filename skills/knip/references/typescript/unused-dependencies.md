# Unused Dependencies

Source: https://knip.dev/typescript/unused-dependencies

## Why Unused Dependencies Are Problematic

1. **Bundle Impact**: May end up in production bundle, increasing size and load times
2. **Storage Waste**: Consume space in node_modules, extend installation times
3. **Tool Performance**: Slow down linters and bundlers
4. **Code Clarity**: Create confusion in package.json
5. **Maintenance Burden**: Unnecessary upgrade complexity
6. **Version Conflicts**: Can cause compatibility issues
7. **Security Concerns**: Cause false security alerts
8. **Licensing Issues**: May impose restrictive terms
9. **Transitive Dependencies**: Bring additional unwanted packages

## Finding and Removing

Knip locates unused dependencies through code analysis. Use `--fix` to auto-remove from package.json.

## How Knip Works

Analyzes package.json, source code, and configuration files using plugins and compilers.

## Additional Capabilities

- **Missing Dependencies**: Identifies packages used but not listed
- **Monorepo Support**: Handles workspaces and dependency relationships
- **Dependency Type Separation**: Distinguishes dependencies vs devDependencies
- **Production Mode**: Focus on production code only
- **Package Manager Compatibility**: npm, pnpm, Bun, Yarn
