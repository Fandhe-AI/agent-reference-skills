# Handling Issues

Source: https://knip.dev/guides/handling-issues

## Overview

Formula: `unused files = project files - (entry files + resolved files)`

## Unused Files

### Missing Generated Files

Compile/generate files before running Knip so imports resolve properly.

### Dynamic Import Specifiers

```javascript
const entry = await import(path.join(baseDir, 'entry.ts'));
```

Fix: Add the file to `entry` patterns.

### Unsupported Script Arguments

Fix: Add files to `entry` patterns.

### Unsupported File Formats

HTML with script references need explicit config or an `.html` compiler.

### Missing Plugin

Tools without Knip plugins have config files reported as unused. Fix: Create a plugin or use `entry` workarounds.

### Incomplete Plugin

Override plugin config or submit PRs.

### TypeScript Path Aliases in Monorepos

Use workspace packages as dependencies instead:

```json
{ "dependencies": { "@org/common": "workspace:*" } }
```

### Auto-Mocking or Auto-Imports

Frameworks with auto-features (Jest, Nuxt) need extended `entry` patterns.

## Unused Dependencies

### Missing/Incomplete Plugins

Improve/create plugins or use `ignoreDependencies`.

### Dependencies Named After Builtins

Packages named `buffer`/`process` → add to `ignoreDependencies`.

### Conditional Dependencies

```typescript
if (process.env.REPORT_PORTAL_ENABLED) {
  reporters.push(['@reportportal/agent-js-playwright', config]);
}
```

Fix: `ignoreDependencies`.

### Bundled Types

Modern packages include type definitions. Remove separate `@types/...` packages.

### Unlisted Dependencies

Transitive dependencies imported directly → install explicitly.

### Unlisted Binaries

Use full package names with `npx` (e.g., `npx @commitlint/cli` not `npx commitlint`).

## Unresolved Imports

### Template Strings

`import(\`./${value}.ts\`)` cannot be resolved → add to `entry` or `ignoreDependencies`.

### Extensionless Imports

Some non-standard extensions like `.svg` aren't recognized.

### Unrecognized Path Aliases

Knip only recognizes TS config and knip.json paths, not Webpack/Vite aliases → configure in knip.json or `ignoreUnresolved`.

## Unused Exports

### Namespace Enumerations

Namespace used in enumeration patterns → all exports considered used. Enable `nsExports` to disable heuristic.

### External Libraries

Exports consumed through external APIs may not be recognized.

### Excluding from Reports

Options: `ignoreExportsUsedInFile`, JSDoc tags, add to `entry`, re-export from entry files.

### Missing Unused Exports

Entry file exports not reported by default. Non-standard extensions need compilers.

### Enum/Namespace Members

Reported by default. Disable: `--exclude enumMembers` or JSDoc tags.
