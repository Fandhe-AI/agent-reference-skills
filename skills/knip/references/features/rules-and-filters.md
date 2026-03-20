# Rules & Filters

Source: https://knip.dev/features/rules-and-filters

## Filters

Include or exclude reported issue types:

```sh
knip --include files --include dependencies
knip --include files,dependencies
knip --include files --exclude enumMembers,duplicates
```

### Shorthands

| Shorthand | Includes |
|-----------|----------|
| `--dependencies` | dependencies, devDependencies, optionalPeerDependencies, unlisted, binaries, unresolved, catalog |
| `--exports` | exports, types, enumMembers, namespaceMembers, duplicates |
| `--files` | files |

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
