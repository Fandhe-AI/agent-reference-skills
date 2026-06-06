# Monorepo Setup

Share a root `biome.json` across packages using `extends`.

Root `biome.json` (project root):

```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.11/schema.json",
  "formatter": { "enabled": true, "indentStyle": "space" },
  "linter": { "enabled": true, "rules": { "recommended": true } }
}
```

Package-level `biome.json` (inherits root, adds overrides):

```json
{
  "root": false,
  "extends": "//",
  "javascript": {
    "formatter": { "quoteStyle": "single" }
  }
}
```

Shared config via npm package:

```json
{
  "extends": ["@org/shared-configs/biome"]
}
```

`@org/shared-configs/package.json`:

```json
{
  "exports": {
    "./biome": "./biome.json"
  }
}
```

## Notes

- `"root": false` tells Biome the file is not the project root; prevents search from stopping here
- `"extends": "//"` is the shorthand for the workspace root `biome.json`
- Omitting `extends` makes a package fully independent from the root config
- Relative file paths (e.g., `"extends": ["../../common.json"]`) also work for local shared configs
