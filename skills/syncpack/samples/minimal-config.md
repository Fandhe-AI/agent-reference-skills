# Minimal Config

Start with a narrow scope targeting production dependencies, then expand gradually.

```json
{
  "$schema": "./node_modules/syncpack/schema.json",
  "versionGroups": [
    {
      "label": "Sync all production dependencies",
      "dependencyTypes": ["prod"]
    },
    {
      "label": "Ignore everything else",
      "isIgnored": true
    }
  ]
}
```

## Notes

- Place `.syncpackrc` (JSON format) at the monorepo root for fastest performance
- The `$schema` property enables IDE autocompletion
- The final `isIgnored` catch-all prevents unintended linting of unscoped dependencies
- TypeScript and JavaScript config formats (`syncpack.config.ts`, `.syncpackrc.js`) are also supported
