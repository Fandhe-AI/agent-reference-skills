---
source: https://docs.expo.dev/versions/v58.0.0/sdk/build-properties/
---

# BuildProperties

`expo-build-properties` is a config plugin for customizing native Android and iOS build properties of managed apps.

## Signature / Usage

```sh
npx expo install expo-build-properties
```

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 37,
            "targetSdkVersion": 36,
            "buildToolsVersion": "37.0.0"
          },
          "ios": {
            "deploymentTarget": "16.4"
          }
        }
      ]
    ]
  }
}
```

```ts
BuildProperties.withBuildProperties(config: ExpoConfig, props: PluginConfigType): ExpoConfig
BuildProperties.resolveConfigValue(config: PluginConfigType, platform: 'android' | 'ios', key: K): SharedBuildConfigFields[K]
```

## Options / Props

`PluginConfigType` (top-level shared fields plus `android` / `ios`). Shared fields (`SharedBuildConfigFields`, overridable per platform; platform values win):

| Name | Type | Description |
| --- | --- | --- |
| buildReactNativeFromSource | boolean | Build React Native from source (much longer builds). On iOS controls precompiled `ReactNativeDependencies.xcframework`; from RN 0.81 also precompiled `React.xcframework`. Default `false`. |
| reactNativeReleaseLevel | `'stable' \| 'canary' \| 'experimental'` | Enables different sets of React Native feature flags. Default `'stable'`. |
| useHermesV1 | boolean | Hermes V1 engine; default engine from React Native 0.84. `false` uses legacy Hermes and also requires `buildReactNativeFromSource: true`. Default `true`. |

`android` (`PluginConfigTypeAndroid`):

| Name | Type | Description |
| --- | --- | --- |
| buildArchs | string[] | Override `reactNativeArchitectures` ABIs in **gradle.properties**. Default `["armeabi-v7a", "arm64-v8a", "x86", "x86_64"]`. |
| buildExpoModulesCoreFromSource | boolean | Compile `expo-modules-core` native libs from source. Default `false`. |
| buildFromSource | boolean | Deprecated: use `buildReactNativeFromSource`. |
| buildToolsVersion | string | Override `buildToolsVersion` in **build.gradle**. |
| cmakeVersion | string | Override the CMake version for the app and autolinked modules. |
| compileSdkVersion | number | Override `compileSdkVersion`. |
| enableBundleCompression | boolean | Compress the JS bundle (smaller APK, slower startup). Default `false`. |
| enableMinifyInReleaseBuilds | boolean | Enable R8 in release builds. |
| enablePngCrunchInReleaseBuilds | boolean | `crunchPngs` in release builds. Default `true`. |
| enableShrinkResourcesInReleaseBuilds | boolean | `shrinkResources`; use with `enableMinifyInReleaseBuilds`. |
| exclusiveMavenMirror | string | Single Maven repository used for all dependency resolution; others ignored. |
| extraMavenRepos | (string \| AndroidMavenRepository)[] | Extra Maven repos added to all Gradle projects (strings become `url`). |
| extraProguardRules | string | Appended to **android/app/proguard-rules.pro**. |
| gifEnabled | boolean | GIF support in React Native `<Image>` (not `expo-image`). Default `true`. |
| kotlinVersion | string | Override the Kotlin version. |
| manifestQueries | PluginConfigTypeAndroidQueries | `intent`, `package`, `provider` entries for `<queries>`. |
| minSdkVersion | number | Override `minSdkVersion`. |
| networkInspector | boolean | Network Inspector. Default `true`. |
| packagingOptions | PluginConfigTypeAndroidPackagingOptions | `doNotStrip`, `exclude`, `merge`, `pickFirst` (string[] patterns). |
| targetSdkVersion | number | Override `targetSdkVersion`. |
| useDayNightTheme | boolean | DayNight theme for dark mode. |
| useLegacyPackaging | boolean | Legacy native library compression. Default `false`. |
| usePrecompiledHeaders | boolean | Experimental PCH for native builds; or `EXPO_USE_ANDROID_PRECOMPILED_HEADERS=1`. Default `false`. |
| usesCleartextTraffic | boolean | Cleartext traffic (platform default `true` on Android 8 and below, `false` on 9+). |
| webpAnimated | boolean | Animated WebP in React Native `<Image>`; requires `webpEnabled`. Default `false`. |
| webpEnabled | boolean | WebP in React Native `<Image>`. Default `true`. |

`ios` (`PluginConfigTypeIos`):

| Name | Type | Description |
| --- | --- | --- |
| ccacheEnabled | boolean | C++ compiler cache for iOS builds. |
| deploymentTarget | string | Deprecated: use built-in `ios.deploymentTarget` (SDK 56 and greater). |
| enableSceneSupport | boolean | UIKit scene lifecycle adoption for Expo SDK 57 (requires 57.0.23+). SDK 58 and newer include scene lifecycle support; the property is no longer required and can be removed. |
| extraPods | ExtraIosPodDependency[] | Extra CocoaPods dependencies added to **ios/Podfile** (`name`, `version`, `git`, `branch`, `tag`, `commit`, `path`, `podspec`, `source`, `configurations`, `modular_headers`, `testspecs`). |
| forceStaticLinking | string[] | Pods linked statically when `use_frameworks!` is enabled. |
| networkInspector | boolean | Network Inspector. Default `true`. |
| privacyManifestAggregationEnabled | boolean | Merge `PrivacyInfo.xcprivacy` from CocoaPods resource bundles into one file. |
| useFrameworks | `'static' \| 'dynamic'` | Enable `use_frameworks!` in the Podfile. |
| usePrecompiledModules | boolean | Use precompiled Expo modules (XCFrameworks); sets `EXPO_USE_PRECOMPILED_MODULES=1` during `pod install`. Default `true`. |

`AndroidMavenRepository`: `url` (string), `authentication` (`'basic' | 'digest' | 'header'`), `credentials` (password: `username` / `password`; HTTP header: `name` / `value`; AWS: `accessKey` / `secretKey` / `sessionToken`). Credential values may be `"System.getenv('ENV_VAR_NAME')"`.

## Notes

- Platforms: Android, iOS, tvOS (`withBuildProperties`, `resolveConfigValue`, `PluginConfigType`, `SharedBuildConfigFields`).
- In an existing React Native app, install `expo` first.
- Source: SDK 58 (`/versions/v58.0.0/`).

## Related

- [New Architecture](./new-architecture.md)
- [app.json / app.config.js](./app-config.md)
