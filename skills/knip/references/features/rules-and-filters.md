# Rules & Filters

Source: https://knip.dev/features/rules-and-filters

## Filters

Include or exclude reported issue types:

```sh
knip --include files --include dependencies
knip --include files,dependencies
knip --include files --exclude enumMembers,duplicates
```

`nsExports` and `nsTypes` are off by default: including only those adds them to the default report instead of narrowing it.

`cycles` is also off by default. `--include cycles` (or `"include": ["cycles"]` in configuration) reports only circular dependencies; use it with the cycles reporter for a tree view.

### Shorthands

| Shorthand | Includes |
|-----------|----------|
| `--dependencies` | dependencies, devDependencies, optionalPeerDependencies, unlisted, binaries, unresolved, catalog, catalogReferences |
| `--exports` | exports, nsExports, types, nsTypes, enumMembers, namespaceMembers, duplicates (per the CLI reference; the Rules & Filters page lists it without `nsExports` / `nsTypes`) |
| `--files` | files |
| `--cycles` | cycles (circular dependencies only) |

Combine shorthands to report the default issue types plus circular dependencies:

```sh
knip --dependencies --exports --files --cycles
```

## Rules

Fine-grained control via configuration:

| Value | Printed | Counted | Description |
|-------|---------|---------|-------------|
| `"error"` | Yes | Yes | Includes the issue type |
| `"warn"` | Yes | No | Faded color, doesn't count |
| `"off"` | No | No | Excludes the issue type |

```json
{
  "rules": {
    "files": "warn",
    "duplicates": "off"
  }
}
```

When `dependencies` is included, `devDependencies` and `optionalPeerDependencies` can be separately configured as `"warn"`.

## Rules vs. Filters

- **Filters**: CLI-focused, shorthand syntax, usable in CLI and config
- **Rules**: Fine-grained `"warn"` option, config-only, modeled after ESLint
