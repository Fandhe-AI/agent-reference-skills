# Publishing Packages

Build and publish versioned packages from a Turborepo monorepo using Changesets.

`packages/ui/package.json` — build script and entry points:

```json
{
  "name": "@acme/ui",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts"
  }
}
```

Root `turbo.json` — cache built output:

```json
{
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

Root `package.json` — publish workflow script:

```json
{
  "scripts": {
    "publish-packages": "turbo run build lint test && changeset version && changeset publish"
  }
}
```

Changeset commands:

```bash
# Create a changeset describing what changed
changeset

# Bump versions based on collected changesets
changeset version

# Build and publish to npm
changeset publish
```

## Notes

- Name the script `publish-packages` rather than `publish` to avoid conflict with the npm built-in `publish` lifecycle hook
- Run `turbo run build lint test` before `changeset publish` to ensure only verified artifacts are released
- Alternative version management tools: `intuit/auto` (PR-label-based) and `microsoft/beachball`
