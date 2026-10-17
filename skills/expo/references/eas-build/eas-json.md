---
source: https://docs.expo.dev/eas/json/
---

# Configuration with eas.json

Learn about available properties for EAS Build and EAS Submit to configure and override their default behavior from within your project.

## Signature / Usage

Build profiles live under the `build` key of **eas.json**; submit profiles under `submit`.

```json
{
  "build": {
    "base": {
      "node": "22.23.3",
      "yarn": "1.22.5",
      "env": { "EXAMPLE_ENV": "example value" },
      "android": { "image": "default", "env": { "PLATFORM": "android" } },
      "ios": { "image": "latest", "env": { "PLATFORM": "ios" } }
    },
    "development": {
      "extends": "base",
      "developmentClient": true,
      "env": { "ENVIRONMENT": "development" },
      "android": { "distribution": "internal", "withoutCredentials": true },
      "ios": { "simulator": true }
    },
    "staging": {
      "extends": "base",
      "env": { "ENVIRONMENT": "staging" },
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "extends": "base",
      "env": { "ENVIRONMENT": "production" }
    }
  }
}
```

Submit profile:

```json
{
  "cli": { "version": ">= 0.34.0" },
  "submit": {
    "production": {
      "android": { "track": "internal" },
      "ios": {
        "appleId": "john@turtle.com",
        "ascAppId": "1234567890",
        "appleTeamId": "AB12XYZ34S"
      }
    }
  }
}
```

## Options / Props

### Build: common properties for native platforms

| Name | Type | Description |
| --- | --- | --- |
| `withoutCredentials` | boolean | EAS CLI won't require credentials. Useful with custom builds. Default `false`. |
| `extends` | string | Name of the build profile to inherit values from. Can't be specified per platform. |
| `credentialsSource` | `local` \| `remote` | `local` uses **credentials.json**; `remote` (default) uses credentials managed by EAS. |
| `releaseChannel` | string | Deprecated. Classic Updates channel (SDK 49 and lower). EAS Update uses `channel`. |
| `channel` | string | EAS Update channel where this build looks for updates. No effect when `developmentClient` is `true`. |
| `distribution` | `store` \| `internal` | `internal` produces shareable build URLs (must produce a .apk or .ipa). `store` produces builds for store uploads. |
| `developmentClient` | boolean | Default `false`. Produces a development build; requires `expo-dev-client`. Sets `gradleCommand` to `:app:assembleDebug` (Android) and `buildConfiguration` to `Debug` (iOS); explicitly provided values take precedence. |
| `resourceClass` | `default` \| `medium` \| `large` | Resource class for the build. `large` is not available on the free plan. |
| `prebuildCommand` | string | Override of the prebuild command (for example `prebuild --template example-template`). `--platform` and `--non-interactive` are added automatically. |
| `buildArtifactPaths` | string[] | Paths (glob patterns) to look for build artifacts; uploaded even if the build fails. |
| `uploadSourceMaps` | boolean | Upload the JS source map to EAS (used by EAS Observe). Default `false`. Not for local builds. |
| `node` | string | Node.js version. |
| `corepack` | boolean | Enable corepack at the start of the build. Default `false`. |
| `yarn` / `pnpm` / `bun` | string | Package manager version. |
| `expoCli` | string | Deprecated. `expo-cli` version; only affects managed projects on SDK 45 and lower. |
| `env` | object | Environment variables for the build. Only for values you would commit to git, not secrets. |
| `autoIncrement` | boolean | Bumps build version. Default `false`. Android bumps `expo.android.versionCode`; iOS bumps the last component of `expo.ios.buildNumber`. |
| `cache` | object | Cache config with `disabled` (boolean, default `false`), `key` (string; change to invalidate), `paths` (array). Not suited to node_modules. |
| `config` | string | Custom workflow file name (for example `"production.yml"` -> `.eas/build/production.yml`). Also available per platform. |
| `environment` | `development` \| `preview` \| `production` | Environment used to apply EAS environment variables. |

### Build: Android-specific

| Name | Type | Description |
| --- | --- | --- |
| `withoutCredentials` | boolean | Skip credentials, e.g. when the debug keystore is checked in. Default `false`. |
| `image` | string | Image with build environment. |
| `resourceClass` | `default` \| `medium` \| `large` | Default `medium`. |
| `ndk` | string | Android NDK version. |
| `autoIncrement` | boolean \| `"version"` \| `"versionCode"` | `"version"` bumps the patch of `expo.version`; `"versionCode"` (or `true`) bumps `expo.android.versionCode`. Values are updated locally or on EAS servers per `cli.appVersionSource`. |
| `buildType` | `app-bundle` \| `apk` | `app-bundle` -> `:app:bundleRelease` (.aab); `apk` -> `:app:assembleRelease` (.apk). Overridden by `gradleCommand` or `developmentClient: true`. |
| `gradleCommand` | string | Gradle task (e.g. `:app:assembleDebug`). Takes priority over `buildType` and `developmentClient`. |
| `applicationArchivePath` | string | Glob for the application archive. Default `android/app/build/outputs/**/*.{apk,aab}`. |
| `config` | string | Custom workflow file for Android builds. |

### Build: iOS-specific

| Name | Type | Description |
| --- | --- | --- |
| `withoutCredentials` | boolean | Skip credentials. Default `false`. |
| `simulator` | boolean | Build for iOS Simulator. Default `false`. |
| `enterpriseProvisioning` | `universal` \| `adhoc` | For `"distribution": "internal"` with an Apple Developer Enterprise Program account; `universal` is recommended. |
| `autoIncrement` | boolean \| `"version"` \| `"buildNumber"` | `"version"` bumps the patch of `expo.version`; `"buildNumber"` (or `true`) bumps the last component of `expo.ios.buildNumber`. |
| `image` | string | Image with build environment. |
| `resourceClass` | `default` \| `medium` \| `large` | Default `medium`. |
| `bundler` / `fastlane` / `cocoapods` | string | Tool versions. |
| `scheme` | string | Xcode scheme. Set when multiple schemes exist; otherwise detected (EAS CLI prompts if unset with multiple). |
| `buildConfiguration` | string | Xcode Build Configuration. Expo projects: `"Release"` (default) or `"Debug"`. Takes priority over `developmentClient`. |
| `applicationArchivePath` | string | Glob for the application archive. Default `ios/build/Build/Products/*-iphonesimulator/*.app` for simulator, `ios/build/*.ipa` otherwise. |
| `config` | string | Custom workflow file for iOS builds. |

### Submit: Android-specific

| Name | Type | Description |
| --- | --- | --- |
| `serviceAccountKeyPath` | string | Path to the Google Service Account Key JSON. May include environment variables such as `$GOOGLE_SERVICE_ACCOUNT_KEY_PATH`. |
| `track` | `production` \| `beta` \| `alpha` \| `internal` | Track of the application. |
| `releaseStatus` | `completed` \| `draft` \| `halted` \| `inProgress` | Status of a release. |
| `rollout` | number | Initial fraction of users (0 to 1); works only with `inProgress`. |
| `changesNotSentForReview` | boolean | Changes will not be reviewed until sent explicitly from Google Play Console. Default `false`. |
| `applicationId` | string | Application ID used when accessing the Service Account Key managed by Expo. |

### Submit: iOS-specific

| Name | Type | Description |
| --- | --- | --- |
| `appleId` | string | Apple ID username (or `EXPO_APPLE_ID`). |
| `ascAppId` | string | App Store Connect application Apple ID number; skips app creation when set. |
| `appleTeamId` | string | Apple Developer Team ID. |
| `sku` | string | Unique app ID not visible on the App Store; generated unless provided. |
| `language` | string | Primary language. Default "en-US". |
| `companyName` | string | Needed only for the first submission of an app. |
| `appName` | string | Name on the App Store. Defaults to `expo.name`. |
| `ascApiKeyPath` | string | Path to the App Store Connect API Key .p8 file; may include environment variables. |
| `ascApiKeyIssuerId` | string | Issuer ID of the API key; may include environment variables. |
| `ascApiKeyId` | string | Key ID of the API key; may include environment variables. |
| `bundleIdentifier` | string | Bundle identifier used when accessing submit credentials managed by Expo. |
| `metadataPath` | string | Path to the store configuration file. |
| `groups` | array | TestFlight internal group names to add the build to. |

## Notes

- Source modificationDate: October 13, 2026 (fetched 2026-10-17).

## Related

- [Configure EAS Build with eas.json](./build-eas-json.md)
- [App version management](./app-versions.md)
- [Internal distribution](./internal-distribution.md)
