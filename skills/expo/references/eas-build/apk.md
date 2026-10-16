---
source: https://docs.expo.dev/build-reference/apk/
---

# Build APKs for Android Emulators and devices

Learn how to configure and install a .apk for Android Emulators and devices when using EAS Build.

## Signature / Usage

The default file format used when building Android apps with EAS Build is an Android App Bundle (AAB/**.aab**). AABs can't be installed directly on a device; build an APK instead. Add one of the following properties to a build profile in **eas.json**:

- `developmentClient` to `true` (**default**)
- `distribution` to `internal`
- `android.buildType` to `apk`
- `android.gradleCommand` to `:app:assembleRelease`, `:app:assembleDebug`, `:app:assembleDebugOptimized` (available for SDK 54 and later), or any other Gradle command that produces an **.apk**

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "preview4": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

```sh
eas build -p android --profile preview
```

## Installing your build

### Emulator (virtual device)

After the build completes, the CLI prompts to download and install it on the Android Emulator (press Y). To pick a specific build at any time:

```sh
eas build:run -p android
```

The command lists available builds (build ID, time elapsed, build number, version number, git commit information; invalid builds are also displayed). If it is a development build, start the dev server with `npx expo start`.

Install the latest build:

```sh
eas build:run -p android --latest
```

### Physical device

- Download directly: copy the APK URL from the build details page (or the link printed when `eas build` is done), open it on the device, install and run.
- Install with `adb`: install adb, connect the device and enable adb debugging, download the APK, then run `adb install path/to/the/file.apk`.

## Notes

- Profile names are arbitrary (`preview`, `local`, `emulator`, ...).
- Production builds are `.aab` by default and recommended for store submission; see build-eas-json.md.
- Source modificationDate: October 08, 2025 (fetched 2026-10-17).

## Related

- [Configure EAS Build with eas.json](./build-eas-json.md)
- [Build for iOS Simulators](./simulators.md)
- [Internal distribution](./internal-distribution.md)
