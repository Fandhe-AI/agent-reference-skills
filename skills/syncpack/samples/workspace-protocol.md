# Workspace Protocol

Enforce `workspace:*` for all internal package references across the monorepo.

```json
{
  "versionGroups": [
    {
      "label": "Use workspace:* protocol for local packages",
      "dependencies": ["$LOCAL"],
      "dependencyTypes": ["dev", "prod"],
      "pinVersion": "workspace:*"
    },
    {
      "label": "Ignore everything else",
      "isIgnored": true
    }
  ]
}
```

## Notes

- `$LOCAL` is a built-in placeholder that matches all packages defined within the monorepo
- `pinVersion` can be any specifier supported by the package manager, not only exact versions
- Syncpack flags `RefuseToPinLocal` if a local package is in a version group that cannot apply to it
- Compatible with pnpm, Yarn, and Bun workspace protocols
