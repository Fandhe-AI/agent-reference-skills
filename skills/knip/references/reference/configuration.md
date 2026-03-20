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

### `treatConfigHintsAsErrors`

```json
{ "treatConfigHintsAsErrors": true }
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
    "**/*.generated.ts": ["exports", "enumMembers"]
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

Reports unused exports in entry source files (not config files).

## Compilers

Only in dynamic config (`.js`/`.ts`), not JSON.

Suffix `!` on ignore patterns enables production-only mode.
