---
source: https://docs.expo.dev/eas-update/debug/
---

# EAS Update debugging

Learn how to use basic debugging techniques to fix an update issue.

## Signature / Usage

Verify which updates run on which builds, starting at the EAS website Deployments page (a _deployment_ is a group of builds and their corresponding updates). If you do not use EAS Build, the Deployments page is empty; see "Configuration without EAS Build" below.

Adapted (not in the official docs): adds `--environment`, which the EAS CLI reference marks as required for Expo SDK 55 or greater.

```sh
eas update --environment production
```

After publishing, the output displays the branch and the runtime version.

### Common problems

| Problem | Fix |
| --- | --- |
| Unexpected channel | The build was built with the wrong channel; configure the channel and rebuild |
| Unexpected runtime version | Configure the runtime version and rebuild |
| Unexpected branch | Map the channel to the correct branch |
| Missing updates | Publish an update to the branch; if already published, check the Updates page for a runtime version matching the build |
| Missing branch | Channel is correct but not linked; map it to the branch |
| Missing deployment | Build is not configured for EAS Update; configure channel and runtime version, verify general configuration, and rebuild |

#### Automatic roll back when an update crashes

If everything looks correct but the app shows the previous update or embedded code, the new update may crash before the root component renders. EAS Update automatically rolls back to the previous update when it detects such a crash (see [Error recovery](./error-recovery.md)). Identify the error, then publish a fixing update. A common cause is a missing environment variable.

#### Failed to load all assets

The app downloaded the manifest but not all assets (those not present in the original build). Common reasons: many large assets added, poor connection, or the user is in a country that blocks or throttles Cloudflare IP addresses (used by EAS Update to serve assets). Inspect the asset list, reproduce on your own device and examine `expo-updates` log entries, and check the IP of affected users in error services such as Sentry.

### Solutions

Configure the channel in **eas.json**:

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  }
}
```

Configure the runtime version in app config (default `{ "policy": "appVersion" }`):

```json
{
  "expo": {
    "runtimeVersion": {
      "policy": "appVersion"
    }
  }
}
```

Map a channel to a branch (create a branch with `eas branch:create` if needed), or create a channel on EAS servers:

```sh
eas channel:edit production --branch release-1.0
eas channel:create production
```

### General strategies

- Use `expo-dev-client` to preview published updates inside a problematic build.
- In-app debugging: print `Updates.Constants` to verify configuration, examine log entries with `Updates.readLogEntriesAsync()`, and fetch/load updates manually.

### Configuration issues

Fields expected after `eas update:configure`:

- `runtimeVersion` set (default `{ "policy": "appVersion" }`; set manually when the project has **android** and **ios** directories).
- `updates.url` like `https://u.expo.dev/your-project-id`.
- `updates.enabled` not `false` (default `true`).
- `expo-updates` in **package.json** (`npx expo install expo-updates`).

`eas build` runs `npx expo prebuild` on EAS servers. If your project has no native directories, commit changes and run `npx expo prebuild` to inspect **android/app/src/main/AndroidManifest.xml** and **ios/your-project-name/Supporting/Expo.plist**:

```xml
<meta-data android:name="expo.modules.updates.EXPO_RUNTIME_VERSION" android:value="your-runtime-version-here"/>
<meta-data android:name="expo.modules.updates.EXPO_UPDATE_URL" android:value="https://u.expo.dev/your-project-id-here"/>
```

#### Configuration without EAS Build

Configure the channel and runtime version manually (see [Using EAS Update without other EAS services](./standalone-service.md)). Verify on the website: the Channels page shows channel names and channel-branch mapping; the Branches page lists each branch's updates with runtime versions and platforms. A build and an update are compatible when they share the same runtime version and platform, and the most recent compatible update on the linked branch is served.

### Debugging EAS Update

#### Inspecting a build manually

Create an iOS Simulator build with `"ios": { "simulator": true }` in a build profile, unzip the result, use "Show Package Contents", and open **Expo.plist**:

```xml
<key>EXUpdatesRequestHeaders</key>
<dict>
  <key>expo-channel-name</key>
  <string>your-channel-name</string>
</dict>
<key>EXUpdatesRuntimeVersion</key>
<string>your-runtime-version</string>
<key>EXUpdatesURL</key>
<string>https://u.expo.dev/your-project-id</string>
```

#### Inspecting manifests manually

The `updates.url` (the `https://u.expo.dev` domain plus project ID) shows an error about a missing header when opened directly. Add three query parameters to view a manifest:

```text
https://u.expo.dev/your-project-id?runtime-version=1.0.0&channel-name=production&platform=android
```

#### Viewing network requests

Use a proxy such as Proxyman or Charles Proxy (install their SSL certificate). Watch requests to `https://u.expo.dev` (update manifest) and `https://assets.eascdn.net` (assets). Expected request headers: `Expo-Runtime-Version`, `expo-channel-name`, `Expo-Platform` ("android" or "ios"). Expect `200` responses, or `304` if nothing has changed.

### Runtime issues

#### Debugging native code while loading the app through expo-updates

By default a release build is required for `expo-updates` to be enabled; debug builds behave like normal React Native debug builds. To enable `expo-updates` in a debug build:

- Android local builds: `export EX_UPDATES_NATIVE_DEBUG=1`, ensure the channel is set in **AndroidManifest.xml**, then run a debug build.
- iOS local builds: `export EX_UPDATES_NATIVE_DEBUG=1`, reinstall pods with `npx pod-install`, ensure the channel is set in **Expo.plist**, then force bundling and run a debug build:

```sh
sed -i '' 's/SKIP_BUNDLING/FORCE_BUNDLING/g;' ios/<project name>.xcodeproj/project.pbxproj
```

- EAS Build: set the variable in **eas.json**:

```json
{
  "build": {
    "preview_debug": {
      "env": {
        "EX_UPDATES_NATIVE_DEBUG": "1"
      },
      "android": {
        "distribution": "internal",
        "withoutCredentials": true,
        "gradleCommand": ":app:assembleDebug"
      },
      "ios": {
        "simulator": true,
        "buildConfiguration": "Debug"
      },
      "channel": "preview_debug"
    }
  }
}
```

### Publishing issues

Publishing creates a local **/dist** directory with the uploaded assets. View included assets on the Updates Detail page or locally with `npx expo export`.

### Mitigation steps

Re-publish a known good update to "undo" a bad publish. Given branch "production" with update 2 (id: xyz2, bad) above update 1 (id: abc1, good):

```sh
eas update:republish --group abc1
eas update:republish --branch production
```

This creates "update 3" (a re-publish of update 1) as the most recent update on the branch. Users who already received the bad update run it until they can download the latest update, so a lingering long tail of errors is normal.

## Notes

- Source modificationDate: July 29, 2026 (fetched 2026-10-17).

## Related

- [Error recovery](./error-recovery.md)
- [Manage branches and channels with EAS CLI](./branches-channels-cli.md)
- [Using EAS Update without other EAS services](./standalone-service.md)
- [Updates](./updates.md)
