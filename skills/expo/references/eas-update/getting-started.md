---
source: https://docs.expo.dev/eas-update/getting-started/
---

# Get started with EAS Update

Learn how to get started with the setup required to configure and use EAS Update in your project.

## Signature / Usage

```sh
npm install --global eas-cli
eas login
eas update:configure
eas update --channel [channel-name] --message "[message]" --environment [environment-name]
```

## Steps

### Prerequisites

- An Expo account (EAS Update is available regardless of plan; paid subscribers can publish updates to more users and use more bandwidth and storage).
- A React Native project, for example:

```sh
npx create-expo-app@latest my-app --template default@sdk-58
```

- Expo CLI and the Expo Metro Config. If the `expo` package is not installed, run `npx install-expo-modules@latest`.
- Use Expo's `registerRootComponent` instead of React Native's `registerApplication` (not needed when created with `create-expo-app` or when Expo Router handles it). This ensures Expo can configure React Native to load assets included in updates; otherwise assets may not be available in release builds. After the change, update `MainActivity` and `AppDelegate` to use the module name `"main"` instead of your app name.

### Install EAS CLI and log in

EAS CLI is the command-line app for EAS services. `npx eas-cli@latest` may be used instead of `eas`. Check login with `eas whoami`.

### Configure your project

`eas update:configure` updates app.json with `runtimeVersion` and `updates.url`, and adds `extra.eas.projectId` if the project did not use EAS services previously. In a project that does not use CNG, it also changes native projects:

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<meta-data android:name="expo.modules.updates.EXPO_UPDATE_URL" android:value="https://u.expo.dev/your-project-id"/>
<meta-data android:name="expo.modules.updates.EXPO_RUNTIME_VERSION" android:value="@string/expo_runtime_version"/>
```

Android also gets an `expo_runtime_version` string entry in **android/app/src/main/res/values/strings.xml**.

```xml
<!-- ios/project-name/Supporting/Expo.plist -->
<key>EXUpdatesRuntimeVersion</key>
<string>1.0.0</string>
<key>EXUpdatesURL</key>
<string>https://u.expo.dev/your-project-id</string>
```

If you use Xcode to create builds, make sure `Expo.plist` is added to your Xcode project.

### Configure the update channel

With EAS Build, `eas update:configure` sets the `channel` property on the `preview` and `production` profiles in **eas.json** (set manually if you use different profile names):

```json
{
  "build": {
    "preview": {
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  }
}
```

Without EAS Build and with CNG, configure the channel with `updates.requestHeaders` in app.json; it is applied the next time you run `npx expo prebuild`:

```json
{
  "expo": {
    "updates": {
      "requestHeaders": {
        "expo-channel-name": "your-channel-name"
      }
    }
  }
}
```

Without CNG, in an Android native project (**AndroidManifest.xml**):

```xml
<meta-data android:name="expo.modules.updates.UPDATES_CONFIGURATION_REQUEST_HEADERS_KEY" android:value="{"expo-channel-name":"your-channel-name"}"/>
```

and in an iOS native project (**Expo.plist**):

```xml
<key>EXUpdatesRequestHeaders</key>
<dict>
  <key>expo-channel-name</key>
  <string>your-channel-name</string>
</dict>
```

### Create a build, make changes, publish

Create a build for Android or iOS (a `preview` profile build is recommended first). Iterate locally with `npx expo start`, then publish with `eas update`, specifying a channel, a `message`, and the `--environment` flag to select which EAS environment variables to use (required in SDK 55 and later).

Publishing generates a new update bundle and uploads it to EAS servers. The channel name is used to locate the correct branch. For a build pulling from the `preview` channel, `eas update --channel preview` creates a branch (called `preview` by default) on the `preview` channel. Behind the scenes it runs `npx expo export` to generate a **dist** directory and a local update bundle.

### Test the update

- Use the Extensions tab in a development build to load the update.
- Use Expo Orbit to install and launch the update in a development build.
- Implement a custom strategy with the Updates API and app config.
- Manually test by force closing and reopening a release build up to two times. Updates for non-development builds (preview or production) are downloaded in the background at startup and applied after the app restarts.

## Notes

- If you plan to use EAS Update with EAS Build, follow the EAS Build setup guide first; EAS Update can also be used without other EAS services (see [Using EAS Update without other EAS services](./standalone-service.md)).
- The official page's "Set up EAS Update with an AI agent" prompt block is not reproduced.
- Source modificationDate: October 16, 2026 (fetched 2026-10-17).

## Related

- [Debugging](./debug.md)
- [Preview updates](./preview.md)
- [Deploy updates](./deployment.md)
- [Using EAS Update without other EAS services](./standalone-service.md)
