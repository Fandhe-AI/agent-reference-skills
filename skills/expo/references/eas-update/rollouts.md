---
source: https://docs.expo.dev/eas-update/rollouts/
---

# Rollouts

Roll out a change to a portion of your users to catch bugs before releasing to all users.

## Signature / Usage

Adapted (not in the official docs): adds `--environment`, which the EAS CLI reference marks as required for Expo SDK 55 or greater.

```sh
eas update --rollout-percentage=10 --environment production
```

In this example the update is only available to 10% of your end users when published. Expo Update provides per-update and branch-based rollout mechanisms.

### Per-update rollouts

Specify a percentage of users that should receive a new update on publish, then increase it gradually.

- **Starting**: add `--rollout-percentage` to `eas update`.
- **Progressing**: `eas update:edit` guides you through selecting the update and entering the new percentage.
- **Ending**: three options:
  - Finish the rollout: use `eas update:edit` to increase the rollout percentage to 100.
  - Revert the rollout: use `eas update:revert-update-rollout` to restore the control update.
  - Replace the rollout: publish a new update or roll back to the update embedded in the build (see "Publishing while a rollout is in progress" below).

```sh
eas update:edit
eas update:revert-update-rollout
```

#### Publishing while a rollout is in progress

You can replace an active rollout if you need to publish a fix or roll back before the rollout finishes. When you publish to the same branch, platform, and runtime version, EAS CLI shows the active rollout and stops without publishing. To end the rollout and publish, add `--force-end-active-rollout`:

```sh
eas update --branch production --environment production --message "Fix a crash" --force-end-active-rollout
```

To roll back to the update embedded in the build instead:

```sh
eas update:roll-back-to-embedded --force-end-active-rollout
```

The flag works with `eas update`, `eas update:republish`, `eas update:roll-back-to-embedded`, and `eas update:rollback`, and requires EAS CLI 24.9.0 or later. The active rollout continues until the new update is ready; with code signing, it ends after EAS CLI signs the new update. When the rollout ends, the new update becomes available to all users on the matching branch, platform, and runtime version, and each app downloads and launches it according to its update behavior (a rollback to embedded returns each app to the update embedded in its build). Replacing a rollout keeps the rollout update group and its dashboard links; reverting with `eas update:revert-update-rollout` deletes the rollout update group.

You cannot replace an active rollout with another rollout. To publish a new update with `--rollout-percentage`, first finish the active rollout with `eas update:edit` or revert it with `eas update:revert-update-rollout`.

Additional notes:

- Only one rollout can be in progress for a given branch, platform, and runtime version.
- Check the state of the rollout with `eas update:list` or `eas update:view`.
- Reverting a rollout created on a branch with an existing update republishes the control update.
- A rollout can be started on a branch with no current update; when reverted, a rollback-to-embedded update is created.

### Branch-based rollouts

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
- During a rollout you can publish to both branches with `eas update --branch [branch] --environment [environment-name]`.
- `eas update --channel [channel] --environment [environment-name]` cannot be used while a rollout is in progress.

## Notes

- The official guide examples for `eas update --rollout-percentage` omit `--environment`; it is required for SDK 55+ (EAS CLI reference). Added here as an adaptation. The `--force-end-active-rollout` example in the official guide already includes `--environment production`.
- Source: https://docs.expo.dev/eas-update/rollouts/ (docs/pages/eas-update/rollouts.mdx at tag expo@58.0.25).

## Related

- [Deploy updates](./deployment.md)
- [Rollbacks](./rollbacks.md)
- [Manage branches and channels with EAS CLI](./branches-channels-cli.md)
