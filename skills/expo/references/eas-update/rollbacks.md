---
source: https://docs.expo.dev/eas-update/rollbacks/
---

# Rollbacks

Rollback a branch to a previous update or the embedded update.

## Signature / Usage

```sh
eas update:rollback
```

In the terminal, an interactive guide helps you select the type of rollback and perform it.

### Rollback types

- **Roll back to a previously-published update**: the command re-publishes a previously-published update to functionally roll back clients to that update.
- **Roll back to the update embedded in the build**: the command instructs the client to run the update embedded in the build.

## Notes

- Upon publishing again after a rollback, all clients receive the new update.
- Source modificationDate: March 03, 2025 (fetched 2026-10-17).

## Related

- [Manage branches and channels with EAS CLI](./branches-channels-cli.md)
- [Rollouts](./rollouts.md)
- [Error recovery](./error-recovery.md)
