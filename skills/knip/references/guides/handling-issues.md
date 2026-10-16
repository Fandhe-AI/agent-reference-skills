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

### Relative Paths Across Workspaces

Relative paths to import from other workspaces are not special-cased. List the other workspaces as dependencies in `package.json` and import via the package name:

```ts
import { something } from '../../common/file.ts'; // before
import { something } from '@org/common'; // after
```

Knip then also reports unused and unlisted dependencies.

### Integrated Monorepos

Multiple instances of config files like `.eslintrc` and `jest.config.json` may be reported as unused in a (mono)repo with a single `package.json`. Configure plugins to target those files (see Integrated Monorepos).

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

### Unrecognized Reference

A reference to a dependency may be unrecognizable to Knip (false positive). Solution: add or improve a plugin; last resort `ignoreDependencies`. For binaries use `ignoreBinaries` instead (see Unlisted Binaries).

### Type Definition Packages

#### Bundled Types

Modern packages include type definitions. Remove separate `@types/...` packages.

#### Production Types

In strict mode, a dependency used only in type-only source imports can live in `devDependencies`. If it is exposed through the package's built declaration files, it is production usage and must be listed in `dependencies` or required `peerDependencies`. Knip follows existing declaration files exposed through `main`, `types`, `typings`, `exports` and `typesVersions` (pnpm `publishConfig` overrides use their published values). Private workspaces and packages using `publishConfig.directory` are not analyzed.

### Unlisted Dependencies

Transitive dependencies imported directly → install explicitly.

### Unlisted Binaries

Use full package names with `npx` (e.g., `npx @commitlint/cli` not `npx commitlint`).

#### Missing Binaries

An unused dependency and an unlisted binary with the same name indicate `node_modules` not containing the relevant package (package manager install layout, or Knip not run from the repo root). Solution: run Knip from the project root; if needed, lint workspaces individually. Binaries installed on the OS (likely not meant to come from npm) are not reported as unlisted; see also `ignoreGlobalBinaries` in the configuration reference.

## Unresolved Imports

### Template Strings

`import(\`./${value}.ts\`)` cannot be resolved → add to `entry` or `ignoreDependencies`.

### Extensionless Imports

Some non-standard extensions like `.svg` aren't recognized.

### Unrecognized Path Aliases

Knip only recognizes TS config and knip.json paths, not Webpack/Vite aliases → configure in knip.json or `ignoreUnresolved`.

### External Aliased Imports

External libraries may use virtual modules not declared in `tsconfig.json`, `knip.json` or readable from a plugin's config (e.g. unplugin-icons `~icons/*`). Solution: configure `paths`:

```json
{
  "paths": {
    "~icons/*": ["node_modules/unplugin-icons/types/[framework].d.ts"]
  }
}
```

`[framework]` is the name of the framework you're using.

## Unused Exports

### Namespace Enumerations

Namespace used in enumeration patterns → all exports considered used. Enable `nsExports` to disable heuristic.

### External Libraries

Exports consumed through external APIs may not be recognized.

### Custom Elements

A custom element is registered under a tag name rather than imported by its class name. Knip recognizes the registration and considers the class used (see Custom Elements).

### CommonJS Member Access

Named exports consumed via member access on a `require`d variable (`const mod = require('./mod'); mod.fn()`) are not traced and may be reported as unused. Destructuring (`const { fn } = require('./mod')`) is traced (see Working with CommonJS).

### Excluding from Reports

Options: `ignoreExportsUsedInFile`, JSDoc tags, add to `entry`, re-export from entry files.

### Missing Unused Exports

Entry file exports not reported by default. Non-standard extensions need compilers.

Types used only in signatures of used exports are not reported either: TypeScript may need them in declaration files, which Knip cannot rule out for the project or its consumers.

### Enum/Namespace Members

Reported by default. Disable: `--exclude enumMembers` or JSDoc tags.
