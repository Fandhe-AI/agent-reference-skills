---
source: https://docs.expo.dev/eas-update/eas-cli/
---

# Manage branches and channels with EAS CLI

Learn how to link a branch to a channel and publish updates with EAS CLI.

## Signature / Usage

EAS Update links _branches_ to _channels_. Channels are specified at build time and exist inside a build's native code. Branches are an ordered list of updates. Any channel can be linked to any branch.

```sh
eas channel:list
eas channel:view [channel-name]
eas channel:create [channel-name]
eas branch:list
eas branch:view [branch-name]
eas update:view [update-group-id]
```

### Commands

| Command | Description |
| --- | --- |
| `eas channel:list` | View all channels |
| `eas channel:view [channel-name]` | View a specific channel |
| `eas channel:create [channel-name]` | Create a channel |
| `eas branch:list` | See all branches |
| `eas branch:view [branch-name]` | See a branch and a list of its updates |
| `eas update:view [update-group-id]` | View a specific update |
| `eas update --branch [branch-name] --message "..." --environment [environment-name]` | Create a new update and publish it |
| `eas update --auto --environment [environment-name]` | Auto-fill branch name (current Git branch) and message (latest Git commit message) |
| `eas branch:delete [branch-name]` | Delete a branch |
| `eas branch:rename --from [branch-name] --to [branch-name]` | Rename a branch |
| `eas update:republish --group [update-group-id]` / `--branch [branch-name]` | Republish a previous update within a branch |
| `eas channel:pause [channel-name]` | Pause updates on a channel |
| `eas channel:resume [channel-name]` | Resume updates on a channel |
| `eas channel:protect [channel-name]` / `eas channel:unprotect [channel-name]` | Protect or unprotect a channel |

### Details

#### Rename a branch

Renaming does not disconnect channel-branch links. If channel "production" linked to "version-1.0" and the branch is renamed to "version-1.0-new", "production" is linked to "version-1.0-new".

#### Republish a previous update

Takes the previous update and publishes it again so that it becomes the most current update on the branch. Similar to a Git reversion. If you do not know the update group ID, `--branch` shows a list of recent updates on the branch to select from.

```sh
eas update:republish --group dbfd479f-d981-44ce-8774-f2fbcc386aa
eas update:republish --branch version-1.0
```

#### Pause updates on a channel

Pausing stops EAS Update from serving updates to builds that check for updates on that channel. It is reversible; the channel's updates and any rollout in progress resume when unpaused.

```sh
eas channel:pause production
```

Run without a channel name to pick from a list. In CI, pass the channel name with `--non-interactive`, or use `--json` to print the channel as JSON (`--json` implies `--non-interactive`).

While a channel is paused:

- Each client still checks for updates but does not receive new ones. EAS typically responds with a bodyless HTTP 204 response for paused channels.
- Each client keeps running the newest update it already has (possibly the code shipped with the build).
- No client downloads an update, so the number of monthly active users does not increase.
- `eas channel:view` and `eas channel:list` show the status as **Paused**.
- You can keep publishing updates to branches; they become available when you unpause.
- Pausing applies to a single channel only.

Pausing vs rollback: pausing keeps clients on their current update and publishes nothing; `eas update:rollback` and `eas update:republish` publish a previous update again as the newest on the branch. `eas update:rollback` with the embedded option (also `eas update:roll-back-to-embedded`) publishes a directive telling clients to run the update embedded in the build.

#### Resume updates on a channel

```sh
eas channel:resume production
```

The channel starts serving updates from its associated branch again; any rollout on the channel resumes.

#### Protect a channel

```sh
eas channel:protect production
```

Only members with the Release Manager, Admin, or Owner role can publish updates to a protected channel or change it. Remove protection with `eas channel:unprotect [channel-name]`.

## Notes

- The official guide examples omit `--environment`; it is required for SDK 55+ (EAS CLI reference). Added in the command table as an adaptation.
- Source modificationDate: October 13, 2026 (fetched 2026-10-17).

## Related

- [How EAS Update works](./how-it-works.md)
- [Rollbacks](./rollbacks.md)
- [Rollouts](./rollouts.md)
