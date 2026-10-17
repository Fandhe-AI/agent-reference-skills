---
source: https://docs.expo.dev/eas-update/how-it-works/
---

# How EAS Update works

A conceptual overview of how EAS Update works.

## Signature / Usage

Builds consist of two layers: a native layer built into the app's binary, and an update layer that is swappable with other compatible updates. Bug fixes can ship to a build as long as the update can run on the native layer inside the build. Re-point a channel to a different branch with:

```sh
eas channel:edit production --branch version-2.0
```

## Conceptual overview

### Distributing builds

`eas build` includes properties inside the build that are important for updates:

- **Channel**: a name given to multiple builds to identify them. Defined in `eas.json`. For example, builds with channel "production" go to public app stores while "staging" builds stay on the Play Store Internal Track and TestFlight. An update can be made available to "staging" first, then "production".
- **Runtime version**: describes the JS-native interface defined by the native code layer that runs the update layer. Defined in the project's app config. Update it whenever native code changes alter the JS-native interface.
- **Platform**: every build has a platform, such as "Android" or "iOS".

### Publishing an update

`eas update --auto` creates a local update bundle inside the **dist** directory, then uploads it to EAS servers into a _branch_. A branch has a name and contains a list of updates, where the most recent update is the active update on the branch. EAS branches are like Git branches: Git branches contain commits, EAS branches contain updates.

### Matching updates and builds

Every update on a branch includes a target runtime version and target platform. EAS' update policy:

- The platform of the build and the target platform of an update must match exactly.
- The runtime version of the build and the target runtime version of an update must match exactly.
- A channel can be linked to any branch. By default, a channel is linked to a branch of the same name.

Every build has a channel, and that channel can be linked to any branch, which makes the branch's most recent compatible update available to the linked channel. Channels are auto-linked to branches of the same name, so builds with channel "production" receive updates from a branch named "production" with no manual linking.

Alternatively, name branches like "version-1.0", "version-2.0", "version-3.0" and link them to channels (for example "production" to "version-1.0", "staging" to "version-2.0"). Once testers verify "version-2.0", run `eas channel:edit production --branch version-2.0`, then link "staging" to the next branch:

```sh
eas channel:edit staging --branch version-3.0
```

## Practical overview

- When an Expo project that includes `expo-updates` is built, the included native Android and iOS code manages, fetches, parses, and validates updates.
- By default, the library checks for an update when it is opened. If a newer update is found, it downloads and runs it. If not, it runs the newest downloaded update, falling back to the update embedded at build time if none have been downloaded. Timing is configurable through app config.
- `expo-updates` downloads in two phases: first the most recent update _manifest_ (information about the update, including a list of assets such as images, JavaScript bundles, and font files), then the assets in the manifest that it has not yet downloaded from prior updates. Keep updates as small as possible.
- If the manifest (phase 1) and all required assets (phase 2) download before the `fallbackToCacheTimeout` setting, the new update runs immediately upon launch. Otherwise the library continues downloading in the background and runs the update on the next launch.

## Notes

- A build's runtime version, platform, and channel together determine which updates it can receive.
- Source modificationDate: February 18, 2025 (fetched 2026-10-17).

## Related

- [Manage branches and channels with EAS CLI](./branches-channels-cli.md)
- [Runtime versions and updates](./runtime-versions.md)
- [Downloading updates](./download-updates.md)
- [Updates](./updates.md)
