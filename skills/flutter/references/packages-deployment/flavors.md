---
source: https://docs.flutter.dev/deployment/flavors
---

# Set up Flutter flavors for Android

How to create build flavors specific to different release types or development environments for an Android app. A flavor could determine which icon, app name, API key, feature flag and logging level is associated with a specific version of your app. In Android, a Flutter flavor is a _product flavor_.

## Signature / Usage

```console
$ flutter (run | build <subcommand>) --flavor <flavor_name>
$ flutter build apk --flavor staging
```

`run` runs the app in debug mode; `build` builds either an APK or an appbundle (`<subcommand>`: `apk` or `appbundle`).

Example build variants for two product flavors and two build types:

| Product flavors | Build types | Resulting build variants |
|-----------------|-------------|--------------------------|
| staging | debug | stagingDebug, stagingRelease |
| production | release | productionDebug, productionRelease |

### Configure your product flavors

```console
$ flutter create --android-language kotlin flavors_example
```

In `android/app/build.gradle.kts`, add `flavorDimensions` and `productFlavors` inside the `android {}` block (the default template explicitly defines the `release` build type, while `debug` is implicit):

```kotlin
android {
    ...
    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig = signingConfigs.getByName("debug")
        }
    }
    ...
    flavorDimensions += "default"
    productFlavors {
        create("staging") {
            dimension = "default"
            applicationIdSuffix = ".staging"
        }
        create("production") {
            dimension = "default"
            applicationIdSuffix = ".production"
        }
    }
}
```

Verify with `flutter run --flavor staging` and again for `production`.

### Use flavors in Flutter code

`appFlavor` (from `package:flutter/services.dart`) returns the current flavor name as a `String`, matching the value passed to `--flavor`:

```dart
import 'package:flutter/services.dart';

void main() {
  // appFlavor will match the flavor name from build.gradle.kts
  if (appFlavor == 'production') {
    // Logic for production environment
    Config.apiUrl = 'https://api.flavors_example.com';
  } else if (appFlavor == 'staging') {
    // Logic for staging environment
    Config.apiUrl = 'https://staging.api.flavors_example.com';
  }

  runApp(const MyApp());
}
```

### Customize configurations

Distinct app display name: create `android/app/src/staging/res/values/strings.xml` (and the `production` equivalent with `Flavors production`):

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Flavors staging</string>
</resources>
```

Then set `android:label="@string/app_name"` in `android/app/src/main/AndroidManifest.xml`.

Distinct icons: place PNGs in `android/app/src/<flavor>/res/mipmap-*` folders and name them `ic_launcher.png`; make sure `android:icon` is `@mipmap/ic_launcher`.

| Density folder | Size |
|----------------|------|
| mipmap-mdpi | 48x48 pixels |
| mipmap-hdpi | 72x72 pixels |
| mipmap-xhdpi | 96x96 pixels |
| mipmap-xxhdpi | 144x144 pixels |
| mipmap-xxxhdpi | 192x192 pixels |

Flavor-specific assets: add the `flavors` subfield to the `assets` field in `pubspec.yaml`. Default flavor: add the `default-flavor` field to `pubspec.yaml` (see Flutter pubspec options).

## Notes

- If no flavor is specified during the build, `appFlavor` returns `null`.
- If your project sets `app_name` with `resValue()` in `build.gradle.kts`, builds with Android Gradle Plugin (AGP) 9.0 or later fail by default with an error such as `Product Flavor <flavor_name> contains custom resource values, but the feature is disabled.` Remove those `resValue()` calls and define `app_name` in `strings.xml` files.
- While it is possible to set `abiFilters` in product flavors, it is not recommended; prefer `defaultConfig`. When setting `abiFilters` in product flavors, pass `-Pdisable-abi-filtering=true` when running `flutter build` or `flutter run`.
- For other build settings per product flavor, see Android's Configure build variants. A Flutter flavor here maps onto an Android Gradle product flavor; Gradle itself is covered by the android-build-gradle skill.

## Related

- [Set up Flutter flavors for iOS and macOS](./flavors-ios.md)
- [Set up Flutter flavors for Windows](./flavors-windows.md)
- [Set up Flutter flavors for Linux](./flavors-linux.md)
- [Build and release an Android app](./deploy-android.md)
