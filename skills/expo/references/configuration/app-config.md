---
source: https://docs.expo.dev/versions/v58.0.0/config/app/
---

# app.json / app.config.js

A reference of available properties in Expo app config. Properties are set under the `"expo"` key in **app.json** or **app.config.json**, or passed to the top-level object of **app.config.js** / **app.config.ts**.

## Signature / Usage

```json
{
  "expo": {
    "platforms": ["ios", "android", "web"],
    "android": {
      "intentFilters": [
        {
          "autoVerify": true,
          "action": "VIEW",
          "data": { "scheme": "https", "host": "*.example.com" },
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

## Options / Props

### Top-level

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | App name shown in Expo Go and on the home screen. |
| `description` | string | Short description of the app. |
| `slug` | string | URL-friendly name, unique across your account. |
| `owner` | string | Expo account that owns the project. Defaults to the current user's username. |
| `currentFullName` | string | Auto generated `@username/slug` for display; not meant to be set. May change when a project is transferred or renamed. |
| `originalFullName` | string | Auto generated `@username/slug` for services like Notifications and AuthSession proxy; not meant to be set. Does not change on transfer or rename. |
| `sdkVersion` | string | Expo SDK version to run the project on; should line up with package.json. |
| `runtimeVersion` | string \| object | Compatibility between a build's native code and an OTA update. String must match `^[a-zA-Z\d][a-zA-Z\d._+()-]{0,254}$` or `^exposdk:((\d+\.\d+\.\d+)\|(UNVERSIONED))$`; or an object `{ policy }` where `policy` is one of `nativeVersion`, `sdkVersion`, `appVersion`, `fingerprint`. |
| `version` | string | App version. Corresponds to `CFBundleShortVersionString` (iOS) and `versionName` (Android). Also use `ios.buildNumber` and `android.versionCode`. |
| `platforms` | array | Supported platforms. Defaults to `["ios", "android"]`; `web` is also included if `react-dom` is installed. |
| `githubUrl` | string | Repository URL linked from the Expo project page. |
| `orientation` | `default` \| `portrait` \| `landscape` | Locks orientation. Defaults to no lock. |
| `userInterfaceStyle` | `light` \| `dark` \| `automatic` | Force or adapt light/dark appearance. Defaults to `light`. Requires `expo-system-ui` on Android. |
| `backgroundColor` | string | Root view background color (6-char hex, default `'#ffffff'`). Requires `expo-system-ui` on iOS. |
| `primaryColor` | string | On Android, the app color in the multitasker (6-char hex). Not used on iOS. |
| `icon` | string | Local path or remote URL; 1024x1024 png recommended. |
| `androidStatusBar` | object | Deprecated: use the `expo-status-bar` plugin configuration instead. Keys: `barStyle` (`light-content` \| `dark-content`, default `dark-content`), `backgroundColor` (`#RRGGBB` or `#RRGGBBAA`), `hidden` (boolean, default `false`), `translucent` (boolean, default `true`). |
| `developmentClient.silentLaunch` | boolean | If true, the app launches in a development client without dialogs or progress indicators. |
| `scheme` | string \| string[] | URL scheme(s) matching `^[a-z][a-z0-9+.-]*$`. Build-time configuration; no effect in Expo Go. |
| `extra` | object | Arbitrary fields, accessible via `Constants.expoConfig.extra`. |
| `locales` | object | Per-locale values for System Dialog prompts (e.g. permissions) and Localizable.strings. Platform-specific strings are nested under `ios` and `android`. |
| `plugins` | array | Config plugins. |
| `buildCacheProvider` | undefined | Enable downloading cached builds from remote. |
| `_internal.pluginHistory` | object | Internal: plugins already run on the config. |

### `updates` (expo-updates)

| Name | Type | Description |
| --- | --- | --- |
| `updates.enabled` | boolean | Whether the updates system runs. Defaults to `true`; if `false`, only bundled code and assets are used. |
| `updates.checkAutomatically` | `ON_LOAD` \| `ON_ERROR_RECOVERY` \| `WIFI_ONLY` \| `NEVER` | When to check for updates. Default `ON_LOAD`. |
| `updates.useEmbeddedUpdate` | boolean | Defaults to `true`. If `false`, an update is fetched at launch; ensure `checkAutomatically` is `ON_LOAD` and `fallbackToCacheTimeout` is large enough. Should not be used in production. |
| `updates.fallbackToCacheTimeout` | number | Milliseconds to wait for a new update on launch before falling back to the cached one. Default 0; between 0 and 300000. |
| `updates.url` | string | URL from which expo-updates fetches manifests. |
| `updates.codeSigningCertificate` | string | Local path of a PEM-formatted X.509 certificate used to verify code-signed updates. When provided, all updates must be signed. |
| `updates.codeSigningMetadata` | object | Metadata for the certificate: `alg` (`rsa-v1_5-sha256`), `keyid` (string). |
| `updates.requestHeaders` | object | Extra HTTP headers for manifest and asset requests; may override preset headers. |
| `updates.assetPatternsToBeBundled` | array | Glob patterns (relative to project root) of files included in updates. When not supplied, all asset files are included. |
| `updates.disableAntiBrickingMeasures` | boolean | Defaults to `false`. Allows overriding configuration from the JS API; may brick the app. Should not be used in production. |
| `updates.useNativeDebug` | boolean | Defaults to `false`. Sets `EX_UPDATES_NATIVE_DEBUG` in Podfile.properties.json and gradle.properties. Should not be used in production. |
| `updates.enableBsdiffPatchSupport` | boolean | Support for bundle diffs using bsdiff. Defaults to `true`. |
| `updates.excludeFromBackup` | boolean | iOS only. Exclude the expo-updates directory from backups (iCloud). Defaults to `false`. |
| `updates.maxUpdatesToKeep` | integer | Number of updates to keep, including the running one. Defaults to 2. |

### `ios`

| Name | Type | Description |
| --- | --- | --- |
| `ios.appleTeamId` | string | Apple development team ID for all native targets. |
| `ios.publishManifestPath` / `ios.publishBundlePath` | string | Paths the manifest / bundle are written to during publish. |
| `ios.bundleIdentifier` | string | Bundle identifier, unique on the App Store (e.g. `host.exp.expo`). Existing RN apps: `CFBundleIdentifier` in info.plist. |
| `ios.buildNumber` | string | Corresponds to `CFBundleVersion`. Transporter takes `Version Number` from `expo.version`, not from `ios.buildNumber`. |
| `ios.deploymentTarget` | string | Minimum iOS version, `MAJOR.MINOR` (e.g. `"18.6"`) or major only (e.g. `"26"`). Existing RN apps: `IPHONEOS_DEPLOYMENT_TARGET`. |
| `ios.backgroundColor` | string | Overrides top-level `backgroundColor`. Requires `expo-system-ui`. |
| `ios.scheme` | string \| string[] | Merged with the top-level `scheme`. |
| `ios.icon` | string \| object | Overrides top-level `icon`. A `.icon` directory path, or an object `{ light, dark, tinted }`. 1024x1024 recommended. |
| `ios.appStoreUrl` | string | App Store URL. |
| `ios.bitcode` | undefined | Enable Bitcode for a named build configuration (e.g. Debug, Release). Not available in Expo Go. |
| `ios.config` | object | Not included in the production manifest. Keys: `usesNonExemptEncryption` (sets `ITSAppUsesNonExemptEncryption`), `googleMapsApiKey`. |
| `ios.googleServicesFile` | string | Location of `GoogleService-Info.plist`. |
| `ios.supportsTablet` | boolean | Defaults to `false`. |
| `ios.isTabletOnly` | boolean | Only supports tablets, not handsets. |
| `ios.requireFullScreen` | boolean | No Slide Over / Split View on iPad. Defaults to `false`. |
| `ios.userInterfaceStyle` | `light` \| `dark` \| `automatic` | Defaults to `light`. |
| `ios.infoPlist` | object | Arbitrary entries for Info.plist, applied before other Expo configuration; no validation. |
| `ios.entitlements` | object | Arbitrary entries for the \*.entitlements plist; no validation. |
| `ios.privacyManifests` | object | Entries for PrivacyInfo.xcprivacy. Keys: `NSPrivacyAccessedAPITypes` (items with `NSPrivacyAccessedAPIType` string and `NSPrivacyAccessedAPITypeReasons` array), `NSPrivacyTrackingDomains` (array), `NSPrivacyTracking` (boolean), `NSPrivacyCollectedDataTypes` (items with `NSPrivacyCollectedDataType` string, `NSPrivacyCollectedDataTypeLinked` boolean, `NSPrivacyCollectedDataTypeTracking` boolean, `NSPrivacyCollectedDataTypePurposes` array). |
| `ios.associatedDomains` | array | Entries formatted `applinks:<fully qualified domain>[:port number]`. |
| `ios.usesIcloudStorage` | boolean | App uses iCloud Storage for `DocumentPicker`. |
| `ios.usesAppleSignIn` | boolean | App uses Apple Sign-In. |
| `ios.usesBroadcastPushNotifications` | boolean | Push Notifications Broadcast option; only effective with EAS CLI capability syncing. |
| `ios.accessesContactNotes` | boolean | May access notes in contacts; requires Apple's permission before submission. |
| `ios.runtimeVersion` | string \| object | Overrides top-level `runtimeVersion` on iOS. |
| `ios.version` | string | Takes precedence over root `version`; corresponds to `CFBundleShortVersionString`. |

### `android`

| Name | Type | Description |
| --- | --- | --- |
| `android.publishManifestPath` / `android.publishBundlePath` | string | Paths the manifest / bundle are written to during publish. |
| `android.package` | string | Reverse DNS Application ID (e.g. `com.example.app`), unique on the Play Store. Existing RN apps: `applicationId` in build.gradle and AndroidManifest.xml. |
| `android.versionCode` | integer | Positive integer required by Google Play; increment per release. |
| `android.backgroundColor` | string | Overrides top-level `backgroundColor`. |
| `android.userInterfaceStyle` | `light` \| `dark` \| `automatic` | Defaults to `light`. Requires `expo-system-ui`. |
| `android.scheme` | string \| string[] | Merged with the top-level `scheme`. |
| `android.icon` | string | Overrides top-level `icon`. |
| `android.adaptiveIcon` | object | Keys: `foregroundImage`, `monochromeImage` (Android 13+ themed icons), `backgroundImage` (same dimensions as `foregroundImage`; overrides `backgroundColor`), `backgroundColor` (default `#FFFFFF`). Background settings have no effect without `foregroundImage`. |
| `android.playStoreUrl` | string | Play Store URL. |
| `android.permissions` | array | Permissions added to AndroidManifest.xml during prebuild, e.g. `['android.permission.SCHEDULE_EXACT_ALARM']`. |
| `android.blockedPermissions` | array | Permissions removed from the final AndroidManifest.xml (uses `tools:node="remove"`). Not available in Expo Go. |
| `android.googleServicesFile` | string | Location of `google-services.json`. Including it automatically enables FCM. |
| `android.config` | object | Not included in the production manifest. `googleMaps.apiKey` (Google Maps Android SDK key). |
| `android.intentFilters` | array | Custom intent filters. Items: `autoVerify` (boolean; configure your server to serve a verification JSON file), `action` (string), `data`, `category`. |
| `android.allowBackup` | boolean | Automatic backup to Google Drive. Defaults to the Android default (`true`). |
| `android.softwareKeyboardLayoutMode` | `resize` \| `pan` | Maps to `android:windowSoftInputMode`. Defaults to `resize`. |
| `android.runtimeVersion` | string \| object | Overrides top-level `runtimeVersion` on Android. |
| `android.version` | string | Takes precedence over root `version`; corresponds to `versionName`. |
| `android.predictiveBackGestureEnabled` | boolean | Predictive back gesture on Android 13+. Defaults to `false`. |

### `web`

| Name | Type | Description |
| --- | --- | --- |
| `web.output` | `single` \| `static` \| `server` | Export method for `expo start` and `expo export`. `static` renders HTML per route in `app/` (Expo Router only); `single` outputs an SPA; `server` renders per request and supports API routes. Defaults to `single`. |
| `web.favicon` | string | Relative path of the favicon image. |
| `web.name` | string | Document title; defaults to the outer `name`. |
| `web.shortName` | string | Up to 12 characters; maps to `short_name` in the PWA manifest.json. |
| `web.lang` | string | Primary language tag for `name` and `short_name`. |
| `web.scope` | string | Navigation scope of the website's context. |
| `web.themeColor` | string | Color of the Android tool bar (6-char hex). |
| `web.description` | string | Description of the pinned website. |
| `web.dir` | `auto` \| `ltr` \| `rtl` | Text direction for `name`, `short_name` and `description`. |
| `web.display` | `fullscreen` \| `standalone` \| `minimal-ui` \| `browser` | Preferred display mode. |
| `web.startUrl` | string | Relative URL that loads on launch. |
| `web.orientation` | `any` \| `natural` \| `landscape` \| `landscape-primary` \| `landscape-secondary` \| `portrait` \| `portrait-primary` \| `portrait-secondary` | Default orientation. |
| `web.backgroundColor` | string | Expected background color (6-char hex). |
| `web.barStyle` | `default` \| `black` \| `black-translucent` | Status bar appearance. |
| `web.preferRelatedApplications` | boolean | Hint that native apps in `expo.ios` / `expo.android` are recommended over the website. |
| `web.dangerous` | object | Experimental features; break without deprecation notice. |
| `web.splash` | object | PWA splash: `backgroundColor`, `resizeMode` (`cover` \| `contain`, default `contain`), `image` (.png). |
| `web.config.firebase` | object | Firebase web configuration: `apiKey`, `authDomain`, `databaseURL`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, `measurementId`. |
| `web.bundler` | `webpack` \| `metro` | Local CLI `npx expo` only. Defaults to `webpack` if `@expo/webpack-config` is installed, otherwise `metro`. |

### `experiments`

Experimental features that may be unstable, unsupported, or removed without deprecation notices.

| Name | Type | Description |
| --- | --- | --- |
| `experiments.outOfTreePlatforms` | boolean | Experimental support for select out-of-tree platforms when their support packages are installed. |
| `experiments.onDemandFilesystem` | boolean | Metro bundling outside of `watchFolders` and with package manager global virtual stores. |
| `experiments.autolinkingModuleResolution` | boolean | Apply Expo Autolinking's search results to Metro module resolution (forces `react`, `react-dom`, `react-native` and autolinked modules). Useful for monorepos. |
| `experiments.baseUrl` | string | Export a website relative to a subpath of a domain (e.g. `'/subpath'`; prefix with `/` recommended). Defaults to `''`. |
| `experiments.buildCacheProvider` | undefined | Deprecated: no longer experimental, use the top-level `buildCacheProvider`. |
| `experiments.supportsTVOnly` | boolean | Only supports Apple TV and Android TV. |
| `experiments.tsconfigPaths` | boolean | tsconfig/jsconfig `compilerOptions.paths` and `baseUrl` aliases in Metro. |
| `experiments.typedRoutes` | boolean | Statically typed links in Expo Router; requires TypeScript. |
| `experiments.turboModules` | boolean | Enable Turbo Modules; disables remote debugging. |
| `experiments.reactCanary` | boolean | Use a vendored canary build of React. |
| `experiments.reactCompiler` | boolean | Experimentally enable React Compiler. |
| `experiments.reactServerComponentRoutes` | boolean | Experimentally enable React Server Components by default in Expo Router and concurrent routing for transitions. |
| `experiments.reactServerFunctions` | boolean | Experimentally enable React Server Functions in Expo CLI and Expo Router. |
| `experiments.inlineModules` | object | Enables inline modules. `watchedDirectories` (array), `xcodeProjectTargets` (array; defaults to main target). |
| `experiments.chunking.mode` | `legacy` \| `granular` | Strategy for splitting JavaScript for async routes; requires `asyncRoutes`. `granular` groups shared dependencies by async route. Defaults to `legacy`. |

## Notes

- `ios.config` and `android.config` are used only in the build process and evaluate to `undefined` in the production manifest.
- Each property has an "Existing React Native app?" note in the source for projects without Prebuild: edit the corresponding native file directly (Xcode, Info.plist, AndroidManifest.xml, build.gradle). Plugins that modify native code can only be used with prebuilding and managed EAS Build.
- `android.permissions`: for existing RN apps, add a permission with `tools:node="remove"` in AndroidManifest.xml to stop it being requested.
- `androidStatusBar.translucent: true` adds `android:windowTranslucentStatus` to styles.xml and may cause keyboard issues with `softwareKeyboardLayoutMode` `resize`; use `KeyboardAvoidingView` in that case.
- Source modificationDate: September 17, 2026 (SDK 58, `/versions/v58.0.0/`).

## Related

- [Configure with app config](./configuration.md)
- [package.json](./package-json.md)
- [metro.config.js](./metro-config.md)
- [Permissions](./permissions.md)
- [Introduction to config plugins](./config-plugins-introduction.md)
