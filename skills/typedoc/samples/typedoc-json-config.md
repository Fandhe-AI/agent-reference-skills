# typedoc.json Configuration

Configure TypeDoc via a `typedoc.json` file to avoid repeating CLI flags.

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "name": "My Library",
  "readme": "README.md",
  "excludePrivate": true,
  "excludeExternals": true,
  "excludeNotDocumented": true,
  "plugin": ["typedoc-plugin-markdown"],
  "sort": ["alphabetical"],
  "categorizeByGroup": true,
  "navigation": {
    "includeCategories": true,
    "includeGroups": true
  }
}
```

## Notes

- The `$schema` field enables editor autocompletion and validation.
- TypeDoc also reads from `typedocOptions` in `tsconfig.json` or `package.json`; `typedoc.json` takes precedence.
- Use `"exclude"` with glob patterns to filter out test files or internal modules.
- The `extends` key in `typedoc.json` lets you inherit from another config file.
