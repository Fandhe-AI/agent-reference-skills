---
source: https://docs.expo.dev/eas-update/introduction/
---

# EAS Update

EAS Update is a cloud service that serves updates for projects using the expo-updates library.

## Signature / Usage

EAS Update is a cloud service from EAS (Expo Application Services) that serves updates for projects using the `expo-updates` library. It lets an app update its own non-native pieces (such as JS, styling, and images) over-the-air. All apps that include the `expo-updates` library can receive updates. The `eas` commands require EAS CLI.

Install the `expo-updates` library and configure EAS Update:

```sh
npx expo install expo-updates

eas update:configure
```

You need to create a new build for Android or iOS to include the `expo-updates` library in your build. After that, you can push an update to the production channel:

```sh
eas update --channel production --message "Fix login button alignment"
```

This command publishes your JavaScript bundle and assets so users receive the new version on their next app launch.

## Key features

- **JS API for update management**: the `expo-updates` JavaScript API includes a React hook `useUpdates()` that provides information about the currently running update and any available or downloaded updates, including errors. Methods such as `checkForUpdateAsync()` and `fetchUpdateAsync()` control when the app checks for and downloads updates.
- **Insight tracking**: a deployments dashboard visualizes which updates are sent to builds. Updates work with EAS Insights to provide adoption data.
- **Republish for reverting mistakes**: republish a previous, stable version on top of the problematic one, much like a new "commit" in version control systems.

## When to use EAS Update

| Scenario | Recommendation |
| --- | --- |
| Fix a bug or crash in JavaScript code and deploy updates in minutes | ✓ |
| Update copy, translations, UI styling, or screen layouts | ✓ |
| Roll out changes to a percentage of users using rollouts | ✓ |
| Publish updates from CI or automated workflows | ✓ |
| Test updates with internal teams before production release | ✓ |
| Change to native code or native dependencies | ✗ |
| Change to app permissions (camera, location, and others) | ✗ |
| Update the Expo SDK version | ✗ |
| Anything that requires a new app binary version | ✗ |

For scenarios marked with ✗, use EAS Build to create and submit a new app binary.

## FAQ

- **Publishing guidelines**: updates must follow App Store and Play Store guidelines, including the content of the updates and how you use them.
- **Monthly active users**: 1 monthly active user equals 1 unique installation of an app that downloads at least 1 update during your billing cycle. An install that downloads no update counts as 0; uninstalling and reinstalling (and downloading updates in each) counts as 2; one device with two apps owned by a single Expo account, both using updates, counts as 2 for the account.
- **Custom update strategy**: by default, `expo-updates` checks for updates every time the app is loaded. Implement a custom strategy with the Updates API and app config.
- **Existing React Native projects**: EAS Update works with projects that use Continuous Native Generation (CNG) and with existing React Native projects that have `expo-updates` installed.
- **Reinstall required?** No. Updates are downloaded inside the app and applied based on your configuration, on the next launch or reload.
- **Native code compatibility**: runtime version policies ensure updates are only sent to builds with compatible native code. If your native code changes, you create a new runtime version.
- **EAS Workflows**: you still need a build; then add an update job:

```yaml
jobs:
  publish_update:
    type: update
    params:
      message: 'Fix login button alignment'
      channel: production
```

- **CodePush**: EAS Update is a native solution that integrates with EAS Build; CodePush uses a slightly different approach.
- **Classic Updates**: the Classic Updates service (available before December 2021) is deprecated. New updates cannot be published via `expo publish`; existing apps continue to receive Classic Updates already published. Transition to EAS Update or a self-hosted update service.

## Notes

- Source modificationDate: July 22, 2026 (fetched 2026-10-17).
- The `eas-update-insights` agent-skill promotion on the official page is not reproduced.

## Related

- [Get started with EAS Update](./getting-started.md)
- [How EAS Update works](./how-it-works.md)
- [Runtime versions and updates](./runtime-versions.md)
- [Rollouts](./rollouts.md)
- [Updates](./updates.md)
