# Recursive `turbo` invocations

Error raised when Turborepo detects a cycle of `turbo` invocations in a single-package workspace, which would otherwise loop infinitely.

## Signature / Usage

```json
// package.json — causes recursion
{
  "scripts": {
    "build": "turbo run build"
  }
}

// Fix: rename the script so it differs from the turbo task name
{
  "scripts": {
    "build:app": "turbo run build"
  }
}
```

## Notes

- Root cause 1: a `package.json` script has the same name as the Turborepo task it invokes (e.g. `"build": "turbo run build"`), so running the task re-triggers the same script.
- Root cause 2: a workspace that is meant to be multi-package is misconfigured and appears as single-package to Turborepo (missing `workspaces` field in npm/yarn `package.json`, or missing `pnpm-workspace.yaml`), which triggers false recursion detection.
- Fix for root cause 2: ensure the repository follows the package manager's workspace configuration standards.

## Related

- [missing-root-task-in-turbo-json](./missing-root-task-in-turbo-json.md)
- [single-package-workspaces](../guides/single-package-workspaces.md)
