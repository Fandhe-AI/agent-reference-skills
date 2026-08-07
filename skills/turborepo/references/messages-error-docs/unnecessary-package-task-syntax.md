# Unnecessary package task syntax error

Error raised when a package-level `turbo.json` (used for Workspace Configurations) declares a task using `package#task` syntax instead of the plain task name.

## Signature / Usage

```json
// Before (error in a package-level turbo.json)
{
  "tasks": {
    "web#build": { "dependsOn": ["lint"] }
  }
}

// After
{
  "tasks": {
    "build": { "dependsOn": ["lint"] }
  }
}
```

## Notes

- Turborepo allows an additional `turbo.json` inside a package directory to override the root configuration (Workspace Configurations). Tasks declared there are already scoped to that package.
- Including the package name in the task key (`package#task`) is therefore redundant and errors.

## Related

- [package-task-in-single-package-workspace](./package-task-in-single-package-workspace.md)
- [package-configurations](../configuration/package-configurations.md)
