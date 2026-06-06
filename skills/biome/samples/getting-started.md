# Getting Started

Install Biome and initialize configuration in a new project.

```bash
# Install as dev dependency (pinned version recommended)
npm install -D -E @biomejs/biome

# Generate biome.json
npx @biomejs/biome init
```

Generated `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.11/schema.json",
  "formatter": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true }
  }
}
```

## Notes

- `-E` flag pins the exact version to avoid unexpected upgrades
- `biome init` creates `biome.json` in the current directory
- `"recommended": true` enables the recommended rule set out of the box
- Run `biome check --write .` to format, lint, and sort imports in one pass
