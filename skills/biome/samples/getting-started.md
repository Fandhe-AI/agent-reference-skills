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
  "$schema": "https://biomejs.dev/schemas/2.5.15/schema.json",
  "vcs": {
    "enabled": false,
    "clientKind": "git",
    "useIgnoreFile": false
  },
  "files": { "ignoreUnknown": false },
  "formatter": { "enabled": true, "indentStyle": "tab" },
  "linter": {
    "enabled": true,
    "rules": { "preset": "recommended" }
  },
  "javascript": { "formatter": { "quoteStyle": "double" } },
  "assist": {
    "enabled": true,
    "actions": { "source": { "organizeImports": "on" } }
  }
}
```

## Notes

- `-E` flag pins the exact version to avoid unexpected upgrades
- `biome init` creates `biome.json` in the current directory
- `"preset": "recommended"` enables the recommended rule set out of the box
- Run `biome check --write .` to format, lint, and sort imports in one pass
