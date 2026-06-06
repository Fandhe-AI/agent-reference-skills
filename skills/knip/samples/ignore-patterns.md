# Ignore Patterns

Suppress false positives for generated files, conditional dependencies, and unresolved imports.

```json
{
  "ignoreFiles": ["src/generated/**", "fixtures/**"],
  "ignoreDependencies": ["hidden-package", "@org/.+"],
  "ignoreBinaries": ["zip", "docker-compose", "pm2-.+"],
  "ignoreMembers": ["render", "on.+"],
  "ignoreUnresolved": ["#virtual/.+"],
  "ignoreIssues": {
    "src/generated/**": ["exports", "types"],
    "**/*.generated.ts": ["exports", "enumMembers"]
  }
}
```

Ignore exports used only within the same file:

```json
{
  "ignoreExportsUsedInFile": { "interface": true, "type": true }
}
```

## Notes

- `ignoreFiles` excludes files from "Unused files" reporting only; those files are still analyzed for other issue types
- `ignoreDependencies` and `ignoreBinaries` accept regex patterns (e.g., `"@org/.+"` matches all `@org/*` packages)
- Prefer `ignoreIssues` over `ignoreFiles` when you want to suppress specific issue types per file glob
- Avoid using `ignore` (the generic option) — targeted options like `ignoreFiles` or `ignoreDependencies` are almost always the right solution
