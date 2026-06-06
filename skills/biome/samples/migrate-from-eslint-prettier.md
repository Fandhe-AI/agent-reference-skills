# Migrate from ESLint and Prettier

Replace ESLint and Prettier with Biome using the built-in migration commands.

```bash
# Migrate ESLint config (reads .eslintrc.* or eslint.config.*)
biome migrate eslint --write

# Include rules "inspired by" ESLint (broader coverage)
biome migrate eslint --write --include-inspired

# Migrate Prettier config (.prettierrc, prettier.config.js, etc.)
biome migrate prettier --write
```

Enable VCS integration first so Biome respects `.gitignore` during migration:

```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  }
}
```

After migration, remove the old tools:

```bash
npm uninstall eslint prettier eslint-config-* @typescript-eslint/*
```

## Notes

- Both legacy (`.eslintrc.*`) and flat (`eslint.config.*`) ESLint formats are supported
- Biome defaults differ from Prettier: tab indent vs. space, double quotes vs. configurable
- JSON5, TOML, and YAML Prettier config formats are not supported — convert to JSON first
- Full behavioral parity is not guaranteed; review and adjust `biome.json` after migration
