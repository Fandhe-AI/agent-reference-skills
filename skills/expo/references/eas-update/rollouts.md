---
source: https://docs.expo.dev/eas-update/rollouts/
---

# Rollouts

Roll out a change to a portion of your users to catch bugs before releasing to all users.

## Signature / Usage

```sh
eas update --rollout-percentage=10
```

In this example the update is only available to 10% of your end users when published. EAS provides per-update and branch-based rollout mechanisms.

## Per-update rollouts

Specify a percentage of users that should receive a new update on publish, then increase it gradually.

- **Starting**: add `--rollout-percentage` to `eas update`.
- **Progressing**: `eas update:edit` guides you through selecting the update and entering the new percentage.
- **Ending**: roll out fully by setting the percentage to 100, or revert with `eas update:revert-update-rollout`.

```sh
eas update:edit
eas update:revert-update-rollout
```

Additional notes:

- Only one update can be rolled out on a branch at one time.
- While a rollout is in progress it must be ended before a new update (with the same runtime version) can be published.
- Check the state of the rollout with `eas update:list` or `eas update:view`.
- Reverting a rollout created on a branch with an existing update republishes the control update.
- A rollout can be started on a branch with no current update; when reverted, a rollback-to-embedded update is created.

## Branch-based rollouts

Incrementally roll out a set of updates on a new branch to a percentage of end users while the rest stay on the current branch.

```sh
eas channel:rollout
```

An interactive guide helps select a channel, choose a branch, and set the percentage. Run it again and choose `Edit` to change the percentage. To end, choose `End`:

- **Republish and revert**: republishes the latest update from the new branch to the old branch and points all users to the old branch.
- **Revert**: disregards the updates on the new branch and returns users to the old branch.

Additional notes:

- Only one branch can be rolled out on a channel at a time.
- View state with `eas channel:rollout`.
- During a rollout you can publish to both branches with `eas update --branch [branch]`.
- `eas update --channel [channel]` cannot be used while a rollout is in progress.

## Notes

- Source modificationDate: July 07, 2025 (fetched 2026-10-17).

## Related

- [Deploy updates](./deployment.md)
- [Rollbacks](./rollbacks.md)
- [Manage branches and channels with EAS CLI](./branches-channels-cli.md)
