---
source: https://vite.dev/guide/api-javascript#searchforworkspaceroot
---

# searchForWorkspaceRoot

Searches for the root of the potential workspace.

## Signature / Usage

```ts
function searchForWorkspaceRoot(
  current: string,
  root = searchForPackageRoot(current),
): string
```

## Notes

- Returns the workspace root if it meets the following conditions, otherwise falls back to `root`:
  - contains a `workspaces` field in `package.json`
  - contains one of the following files: `lerna.json`, `pnpm-workspace.yaml`
- Related option: `server.fs.allow`.

## Related

- [server.fs](../config-dev/server-fs.md)
