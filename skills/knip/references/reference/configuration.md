# Configuration

Source: https://knip.dev/reference/configuration

## JSON Schema

```json
{ "$schema": "https://unpkg.com/knip@6/schema.json" }
```

JSONC (comments/trailing commas):

```json
{ "$schema": "https://unpkg.com/knip@6/schema-jsonc.json" }
```

## Project Configuration

### `entry`

Array of glob patterns for entry files. Prefix `!` for negation.

```json
{ "entry": ["src/index.ts", "scripts/*.ts", "!scripts/except.ts"] }
```

### `project`

Array of glob patterns for project files.

```json
{ "project": ["src/**/*.ts", "scripts/**/*.ts"] }
```

### `paths`

Import aliases. Automatically includes TypeScript `compilerOptions.paths`.

```json
{
  "paths": {
    "@lib": ["./lib/index.ts"],
    "@lib/*": ["./lib/*"]
  }
}
```

## Workspaces

Individual workspace configs support all options except: `exclude`/`include`, `ignoreExportsUsedInFile`, `ignoreWorkspaces`, `workspaces`.

## Plugins

```json
{
  "mocha": { "config": "config/mocha.config.js", "entry": ["**/*.spec.js"] },
  "playwright": true,
  "webpack": false
}
```

- Override `config`/`entry` location
- `true`: force-enable
- `false`: disable

## Rules & Filters

### `rules`

```json
{ "rules": { "files": "warn", "duplicates": "off" } }
```

### `include` / `exclude`

Filter issue types.

### `tags`

```json
{ "tags": ["-lintignore"] }
```

`+` (include, default) / `-` (exclude). `@` prefix optional.

### `preprocessor`

Preprocess the results before providing them to the reporter(s). Single preprocessor or an array; each value is a path to a local file or an npm package name.

```json
{ "preprocessor": ["./first.ts", "./second.ts"] }
```

### `preprocessorOptions`

Extra options to pass to the preprocessor.

```json
{
  "preprocessor": "./my-preprocessor.ts",
  "preprocessorOptions": { "key": "value" }
}
```

### `treatConfigHintsAsErrors`

```json
{ "treatConfigHintsAsErrors": true }
```

### `treatTagHintsAsErrors`

```json
{ "treatTagHintsAsErrors": true }
```

## Ignore Issues

### `ignore`

Avoid using. Better solutions usually exist.

```json
{ "ignore": ["!src/dir/**"] }
```

### `ignoreFiles`

Exclude from "Unused files" only (still analyzed for other issues).

```json
{ "ignoreFiles": ["src/generated/**", "fixtures/**"] }
```

### `ignoreBinaries`

```json
{ "ignoreBinaries": ["zip", "docker-compose", "pm2-.+"] }
```

### `ignoreGlobalBinaries`

Defaults to `true`, suppressing missing-binary reports for common global commands such as `git` and `docker`. Set to `false` to report them where a project dependency is expected:

```json
{
  "ignoreGlobalBinaries": false,
  "ignoreBinaries": ["git"]
}
```

Dependencies providing a referenced binary still count as used, and `ignoreBinaries` still applies. Workspaces inherit the top-level value unless they override it.

### `ignoreDependencies`

```json
{ "ignoreDependencies": ["hidden-package", "@org/.+"] }
```

### `ignoreMembers`

```json
{ "ignoreMembers": ["render", "on.+"] }
```

### `ignoreUnresolved`

```json
{ "ignoreUnresolved": ["ignore-unresolved", "#virtual/.+"] }
```

### `ignoreWorkspaces`

```json
{ "ignoreWorkspaces": ["packages/go-server", "packages/flat/*"] }
```

### `ignoreIssues`

```json
{
  "ignoreIssues": {
    "src/generated/**": ["exports", "types"],
    "**/*.generated.ts": ["exports", "enumMembers", "namespaceMembers"]
  }
}
```

### `cycles`

Configure circular dependency (`cycles`) detection. `dynamicImports` includes dynamic `import()` edges (excluded by default). `allow` accepts specific cycles by exact path; entries are relative to the project root and omit the closing repeat of the first file.

```json
{
  "cycles": {
    "dynamicImports": true,
    "allow": [["src/i18n/index.ts", "src/i18n/middleware.ts"]]
  }
}
```

## Exports

### `ignoreExportsUsedInFile`

```json
{ "ignoreExportsUsedInFile": true }
```

Fine-grained:

```json
{ "ignoreExportsUsedInFile": { "interface": true, "type": true } }
```

### `includeEntryExports`

```json
{ "includeEntryExports": true }
```

Reports unused exports in entry source files (not config files). Entry files configured by plugins and entry files discovered only through `package.json` scripts are excluded; add the latter to `entry` to include their exports.

### `includeSubpathExports`

By default, the targets of the `exports` field in `package.json` are entry files and its subpaths are not reported, since other packages may import them. When a workspace is only consumed within the repository, include its `exports` when reporting unused subpaths:

```json
{ "includeSubpathExports": true }
```

If enabled, a subpath in `exports` that is not imported anywhere is reported as an unused subpath, and its targets are entry files only when the subpath is imported. An unreferenced `.` subpath means nothing imports the package at all. Subpaths whose targets are not module files, such as `./package.json` or a stylesheet, are not reported.

The `imports` field (subpath imports) is always reported this way, since subpath imports are internal to the package by design.

Dependent workspaces must be part of the analysis to find the references. In strict mode combined with `--workspace` they are not, so `exports` are treated as public in that case.

Set this option at root level to enable it globally, or within workspace configurations individually. A workspace that is private altogether typically also sets `includeEntryExports`.

## Compilers

Only in dynamic config (`.js`/`.ts`), not JSON.

Suffix `!` on ignore patterns enables production-only mode.

## Notes

- Configuration validation was changed from Zod to handwritten validation in 6.45.0 (GitHub release `knip@6.45.0`); the documented options are unchanged
- Source: https://knip.dev/reference/configuration (knip@6.45.1 docs, retrieved 2026-11-14)
