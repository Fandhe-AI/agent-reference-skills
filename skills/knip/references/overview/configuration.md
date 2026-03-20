# Configuration

Source: https://knip.dev/overview/configuration

## Defaults

Knip uses sensible defaults ("zero config"):

- Entry files: `index.{js,ts}` and `src/index.{js,ts}`
- Project files: `**/*.{js,ts}`

Entry files are starting points for dependency and source file discovery.

## Location

Configuration files are searched in order:

1. `knip.json`
2. `knip.jsonc`
3. `.knip.json`
4. `.knip.jsonc`
5. `knip.ts`
6. `knip.js`
7. `knip.config.ts`
8. `knip.config.js`
9. `package.json` (under `"knip"` property)

Custom path: `knip --config path/to/knip.json`

## Customize

```json
{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "entry": ["src/index.ts", "scripts/{build,create}.js"],
  "project": ["src/**/*.ts", "scripts/**/*.js"]
}
```

- Custom values **override** defaults (not merge)
- Be specific with entry files
- Plugins are auto-enabled

## What's Next

- Entry files documentation for deeper understanding
- Monorepos & workspaces for multi-package projects
- Production mode for production-only analysis
