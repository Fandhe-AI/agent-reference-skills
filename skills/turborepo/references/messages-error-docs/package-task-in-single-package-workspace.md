# Package task in single-package workspace error

Error raised when a `turbo.json` in a single-package workspace declares a task using package-scoped syntax (`<package>#<task>`).

## Signature / Usage

```json
// Before (error in single-package workspace)
{
  "tasks": {
    "app#build": { "cache": true }
  }
}

// After
{
  "tasks": {
    "build": { "cache": true }
  }
}
```

## Notes

- In single-package mode there is only one package in the repository, so package-scoped task names are meaningless and not permitted.
- If multiple packages are actually needed, configure the repository as a multi-package workspace instead.

## Related

- [single-package-workspaces](../guides/single-package-workspaces.md)
- [unnecessary-package-task-syntax](./unnecessary-package-task-syntax.md)
