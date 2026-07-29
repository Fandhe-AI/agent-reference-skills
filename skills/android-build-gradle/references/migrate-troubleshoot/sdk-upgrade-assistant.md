# Android SDK Upgrade Assistant

Android Studio tool (**Tools > Android SDK Upgrade Assistant**, Giraffe+) that guides raising `targetSdkVersion` one API level at a time, surfacing the platform behavior changes relevant to your app and pinpointing the code locations that need updates.

## Signature / Usage

```kotlin
// app/build.gradle.kts — the assistant helps you move this up safely, one level at a time
android {
    defaultConfig {
        targetSdk = 34 // e.g. migrating toward 35, then 36
    }
}
```

## Notes

- This is a **different tool** from the AGP Upgrade Assistant: the AGP Upgrade Assistant upgrades the Android Gradle plugin/Gradle version and build-file syntax, while the SDK Upgrade Assistant upgrades `targetSdkVersion` and surfaces the platform behavior changes that come with targeting a newer API level. Do not conflate the two.
- Filters migration steps to the ones likely relevant to the app, though it may surface uncertain cases to be safe; filters are computed once per project session — close/reopen the project or restart the IDE to recompute them after switching versions.
- Recommended workflow is to upgrade one API level at a time rather than jumping directly to the latest.
- Since August 31, 2023, Google Play requires new app submissions and updates to target a recent API level (Android 13 / API 33 or higher, raised each year) to remain discoverable; the assistant is the primary in-IDE tool for keeping up with that requirement while preserving `minSdkVersion` backward compatibility.
- Source: `developer.android.com/build/sdk-upgrade-assistant`.

## Related

- [AGP Upgrade Assistant](./agp-upgrade-assistant.md)
