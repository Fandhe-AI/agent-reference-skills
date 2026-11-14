---
source: https://docs.expo.dev/eas-update/introduction/
---

# Expo Update

Expo Update is a cloud service that serves updates for projects using the expo-updates library.

## Signature / Usage

Expo Update is a cloud service from Expo Services that serves updates for projects using the `expo-updates` library. It lets an app update its own non-native pieces (such as JS, styling, and images) over-the-air. All apps that include the `expo-updates` library can receive updates. The commands for Expo Update start with `eas` and require EAS CLI.

Install the `expo-updates` library and configure Expo Update:

```sh
npx expo install expo-updates

eas update:configure
```

You need to create a new build for Android or iOS to include the `expo-updates` library in your build. After that, you can push an update to the production channel:

Adapted (not in the official docs): adds `--environment`, which the EAS CLI reference marks as required for Expo SDK 55 or greater.

```sh
eas update --channel production --environment production --message "Fix login button alignment"
```

This command publishes your JavaScript bundle and assets so users receive the new version on their next app launch.

### Key features

- **JS API for update management**: the `expo-updates` JavaScript API includes a React hook `useUpdates()` that provides information about the currently running update and any available or downloaded updates, including errors. Methods such as `checkForUpdateAsync()` and `fetchUpdateAsync()` control when the app checks for and downloads updates.
- **Insight tracking**: a deployments dashboard visualizes which updates are sent to builds. Updates work with Expo Insights to provide adoption data.
- **Republish for reverting mistakes**: republish a previous, stable version on top of the problematic one, much like a new "commit" in version control systems.

### When to use Expo Update

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

For scenarios marked with ✗, use Expo Build to create and submit a new app binary.

### FAQ

- **Publishing guidelines**: updates must follow App Store and Play Store guidelines, including the content of the updates and how you use them.
- **Monthly active users**: 1 monthly active user equals 1 unique installation of an app that downloads at least 1 update during your billing cycle. An app install counts as 1 monthly active user no matter how many updates it downloads during the billing cycle; an install that downloads no new update counts as 0; uninstalling and reinstalling (and downloading updates in each) counts as 2; one device with two apps owned by a single Expo account, both using updates, counts as 2 for the account.
- **Custom update strategy**: by default, `expo-updates` checks for updates every time the app is loaded. Implement a custom strategy with the Updates API and app config.
- **Existing React Native projects**: Expo Update works with projects that use Continuous Native Generation (CNG) and with existing React Native projects that have `expo-updates` installed.
- **Reinstall required?** No. Updates are downloaded inside the app and applied based on your configuration, on the next launch or reload.
- **Native code compatibility**: runtime version policies ensure updates are only sent to builds with compatible native code. If your native code changes, you create a new runtime version.
- **Expo Workflows**: you still need a build; then add an update job:

```yaml
jobs:
  publish_update:
    type: update
    params:
      message: 'Fix login button alignment'
      channel: production
```

- **CodePush**: Expo Update is a native solution that integrates with Expo Build; CodePush uses a slightly different approach.
- **Classic Updates**: the Classic Updates service (available before December 2021) is deprecated. New updates cannot be published via `expo publish`; existing apps continue to receive Classic Updates already published. Transition to Expo Update or a self-hosted update service.

## Notes

- The official guide examples omit `--environment`; it is required for SDK 55+ (EAS CLI reference).
- Source: https://docs.expo.dev/eas-update/introduction/ (docs/pages/eas-update/introduction.mdx at tag expo@58.0.25).
- The `eas-update-insights` agent-skill promotion on the official page is not reproduced.

## Related

- [Get started with Expo Update](./getting-started.md)
- [How Expo Update works](./how-it-works.md)
- [Runtime versions and updates](./runtime-versions.md)
- [Rollouts](./rollouts.md)
- [Updates](./updates.md)
